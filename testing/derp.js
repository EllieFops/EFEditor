/**
 * Good god, don't look here, this was not actually meant to be a game when i started it and has devolved into a silly
 * mess of horrifying garbage.
 */

(function () {

  var colorSpeed = 4;
  var rotationSpeed = 12;

  var squares = {
    size: 10,
    border: 10,
    count: 3
  };

  var a = EFEditor.Utils.Keyboard;
  var b = {};
  var running;
  var intervalProc;
  var d = document.getElementById('report');

  var groups = {
    1: {invertX: false, invertY: false},
    2: {invertX: true, invertY: false},
    3: {invertX: false, invertY: true},
    4: {invertX: true, invertY: true}
  };

  var body = document.getElementsByTagName('body')[0];

  var k = {};
  var bx = 0, by = 0, tx, ty;
  var rot = 0;
  tx = window.innerWidth;
  ty = window.innerHeight;

  function init() {
    groups[1].elements = spawn(squares.count);
    groups[2].elements = spawn(squares.count);
    groups[3].elements = spawn(squares.count);
    groups[4].elements = spawn(squares.count);
  }

  init();

  function spawn(num) {
    var i, t, rm, rp, rt;
    rt = [];
    rp = Math.floor(90 / num);
    rm = 1 / (num * 1.5);
    for (i = 0; i < num; i++) {
      t = d.cloneNode(false);
      body.appendChild(t);
      t.style.setProperty('display', 'block');
      t.style.setProperty('transform', 'rotate(' + (rp * i) + 'deg)');
      rt.push(
        {
          el: t,
          rp: rp * (i + 1),
          rm: rm * (i + 1),
          cs: window.getComputedStyle(t)
        }
      );
    }
    return rt
  }

  function isMovingForward() {
    var n = k[a.KEY_W], s = k[a.KEY_S], e = k[a.KEY_D], w = k[a.KEY_A], se = (s && e && !w), sw = (s && w), ne = (n && e && !s && !w), nw = (n && w && !s);
    n = (n && !e && !s && !w), e = (e && !n && !s && !w), s = (s && !e && !w), w = (w && !s && !n);
    return ((n || e || se));
  }

  function isWASD() {
    return (k[a.KEY_W] || k[a.KEY_A] || k[a.KEY_S] || k[a.KEY_D]);
  }

  function loop() {
    if (k[a.KEY_ESC]) {
      running = false;
    }
    rotateSpaz();
    colorSpaz();
    move();
    if (!running) {
      clearInterval(intervalProc);
    }
  }

  function start() {
    if (!running && isWASD()) {
      running = true;
      intervalProc = setInterval(loop, 16);
    }
  }

  function colorSpaz() {
    var w = groups['1'].elements[0].cs.borderColor.match(/^rgb\((\d+), (\d+), (\d+)\)/);
    var x, y, z, rgb, c;
    x = parseInt(w[1]);
    y = parseInt(w[2]);
    z = parseInt(w[3]);
    if (z < 255 && colorSpeed > 0 || z > 0 && colorSpeed < 0) {
      z += colorSpeed;
      z = (z < 0) ? 0 : z;
      z = (z > 255) ? 255 : z;
    } else if (y < 255 && colorSpeed > 0 || y > 0 && colorSpeed < 0) {
      y += colorSpeed;
      y = (y < 0) ? 0 : y;
      y = (y > 255) ? 255 : y;
    } else if (x < 255 && colorSpeed > 0 || x > 0 && colorSpeed < 0) {
      x += colorSpeed;
      x = (x < 0) ? 0 : x;
      x = (x > 255) ? 255 : x;
    } else {
      colorSpeed = -colorSpeed;
    }
    rgb = 'rgb(' + x + ', ' + y + ', ' + z + ')';
    for (var g in groups) {
      if (!groups.hasOwnProperty(g)) {
        continue;
      }
      g = groups[g].elements;
      c = g.length;
      for (var i = 0; i < c; i++) {
        g[i].el.style.setProperty('border-color', rgb);
      }
    }
    x = Math.abs(x - 255);
    y = Math.abs(y - 255);
    z = Math.abs(z - 255);
    body.style.backgroundColor = 'rgb(' + x + ', ' + y + ', ' + z + ')';
  }

  function rotateSpaz() {
    var a, b, i, c;
    rot += (isMovingForward()) ? rotationSpeed : -rotationSpeed;
    if (rot > 360) {
      rot -= 360;
    }
    for (var g in groups) {
      if (!groups.hasOwnProperty(g)) {
        continue;
      }
      g = groups[g].elements;
      c = g.length;
      for (i = 0; i < c; i++) {
        a = rot * g[i].rm + g[i].rp;
        g[i].el.style.setProperty('transform', 'rotate(' + a + 'deg)');
      }
    }
  }

  function move() {
    var u, d, r, l, i, c, ix, iy, q, t, s;
    u = k[a.KEY_W];
    d = k[a.KEY_S];
    r = k[a.KEY_D];
    l = k[a.KEY_A];

    var x;
    var v = 8;
    for (var g in groups) {

      if (!groups.hasOwnProperty(g)) {
        continue;
      }

      s = window.getComputedStyle(groups[g].elements[0].el);
      t = (s.top == '50%') ? ty / 2 : parseInt(s.top);
      q = (s.left == '50%') ? tx / 2 : parseInt(s.left);

      ix = groups[g].invertX;
      iy = groups[g].invertY;

      if (u || d) {
        if (u && !iy || d && iy) {
          x = t - v;
          if (x < by) {
            x = ty;
          }
        } else if (d && !iy || u && iy) {
          x = t + v;
          if (x > ty) {
            x = by;
          }
        }

        c = groups[g].elements.length;
        x = x.toString() + 'px';
        for (i = 0; i < c; i++) {
          groups[g].elements[i].el.style.setProperty('top', x);
        }
      }

      if (r || l) {
        if (l && !ix || r && ix) {
          x = q - v;
          if (x < bx) {
            x = tx;
          }
        } else if (r && !ix || l && ix) {
          x = q + v;
          if (x > tx) {
            x = bx;
          }
        }
        c = groups[g].elements.length;
        x = x.toString() + 'px';
        for (i = 0; i < c; i++) {
          groups[g].elements[i].el.style.setProperty('left', x);
        }
      }
    }
  }
})();

