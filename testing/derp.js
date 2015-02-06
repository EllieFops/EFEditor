var colorSpeed    = 4;
var rotationSpeed = 8;

var squares = {
  size: 10,
  border: 10,
  count: 6
};

var a = EFEditor.Utils.Keyboard;
var b ={};
var c;
var d = document.getElementById('report');

var groups = {
  1:{invertX:false, invertY: false},
  2:{invertX:true, invertY: false},
  3:{invertX:false, invertY: true},
  4:{invertX:true, invertY: true}
};

var body = document.getElementsByTagName('body')[0];
var s = window.getComputedStyle(d);
var k = {};
var bx = 0, by = 0, tx, ty;
var rot = 0;
tx = window.innerWidth;
ty = window.innerHeight;

function init() {
  groups[1].elements = spawn(6);
  groups[2].elements = spawn(6);
  groups[3].elements = spawn(6);
  groups[4].elements = spawn(6);
} init();
function spawn(num) {
  var i, t, rm, rp, rt;
  rt = [];
  rp = 90/num;
  rm = 1/num;
  t  = d.cloneNode(false);
  body.appendChild(t);
  for (i = 0; i < num; i++) {
    t.style.setProperty('display', 'block');
    t.style.setProperty('transform', 'rotation(' + rp + 'deg)');
    rt.push({
      el: t,
      rp: rp,
      rm: rm
    });
  }
  return rt
}
function isMovingForward() {
  var n=k[a.KEY_W],s=k[a.KEY_S],e=k[a.KEY_D],w=k[a.KEY_A],se=(s&&e&&!w),sw=(s&&w),ne=(n&&e&&!s&&!w),nw=(n&&w&&!s);
  n=(n&&!e&&!s&&!w), e=(e&&!n&&!s&&!w), s=(s&&!e&&!w), w=(w&&!s&&!n);
  return((n || e || se));
}
function isWASD() {return (k[a.KEY_W]||k[a.KEY_A]||k[a.KEY_S]||k[a.KEY_D]);}
function loop() {
  rotateSpaz();
  colorSpaz();
  move();
  if (c) {
    setTimeout(loop, 16);
  }
}
function start(){if(!c&&isWASD()){c=true;loop();}}
function stop(){c=isWASD()}
function colorSpaz() {
  var w = s.borderColor.match(/^rgb\((\d+), (\d+), (\d+)\)/);
  var x, y, z, rgb, c;
  x = parseInt(w[1]);
  y = parseInt(w[2]);
  z = parseInt(w[3]);
  if (z < 255 && colorSpeed > 0 || z > 0 && colorSpeed < 0) {
    z += colorSpeed;
    z = (z < 0) ? 0 : z;
    z = (z > 255) ? 255 : z;
  } else if(y < 255 && colorSpeed > 0 || y > 0 && colorSpeed < 0) {
    y += colorSpeed;
    y = (y < 0) ? 0 : y;
    y = (y > 255) ? 255 : y;
  } else if(x < 255 && colorSpeed > 0 || x > 0 && colorSpeed < 0) {
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
  x=Math.abs(x-255); y=Math.abs(y-255);z=Math.abs(z-255);
  body.style.backgroundColor = 'rgb(' + x + ', ' + y + ', ' + z + ')';
}
function rotateSpaz() {
  var a, b, i, c;
  rot += (isMovingForward()) ? rotationSpeed : -rotationSpeed;
  if (rot > 360) {rot-=360;}
  for (var g in groups) {
    if (!groups.hasOwnProperty(g)) {
      continue;
    }
    g = groups[g].elements;
    c = g.length;
    for (i = 0; i < c; i++) {
      b = g[i];
      a = rot * b.rm + b.rp;
      g[i].el.style.setProperty('transorm', 'rotate(' + a + 'deg)');
    }
  }
}

function move() {
  var u, d, r, l, i, c, ix, iy, q;
  u = k[a.KEY_W];
  d = k[a.KEY_S];
  r = k[a.KEY_D];
  l = k[a.KEY_A];

  var x;
  var v = 8;
  var t = Number(s.top.split('px')[0]);
  q = Number(s.left.split('px')[0]);

  for (var g in groups) {
    if (!groups.hasOwnProperty(g)) {
      continue;
    }
    ix = groups[g].invertX;
    iy = groups[g].invertY;

    if (u || d) {
      if (d&&!iy||u&&iy) {
        x = t + v;
        if (x > ty) {
          x = by;
        }
      }

      if (u&&!iy||d&&iy) {
        x = t - v;
        if (x < by){
          x = ty;
        }
      }

      c = groups[g].elements.length;
      x = x.toString() + 'px';
      for (i = 0; i < c; i++) {
        groups[g].elements[i].el.style.setProperty('top', x);
      }
    }

    if (r || l) {
      if (r && !ix || l && ix) {
        x = q + v;
        if (x > tx) {
          x = bx;
        }
      }
      if (l && !ix || r && ix) {
        x = q - v;
        if (x < bx) {
          x = tx;
        }
      }
      console.log(x, q, v);
      c = groups[g].elements.length;
      x = x.toString() + 'px';
      for (i = 0; i < c; i++) {
        groups[g].elements[i].el.style.setProperty('left', x);
      }
    }
  }
}
