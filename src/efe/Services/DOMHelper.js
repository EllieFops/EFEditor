var DOMHelper = (function() {

  /**
   *
   * @param p {HTMLElement}
   */
  function fA(p)
  {
    var a, b, c, d, e, f, g, h, i, j, k, l;
    a = p.nodeName;
    b = p.className;
    c = p.children;
    d = p.children.length;
    e = p.id;
    f = p.attributes;
    g = new Array(d);
    h = p.length;
    j = {};
    b = (b.indexOf(' ') > -1) ? b.split(' ') : b;
    for (i = 0; i < h; i++) {k = f[i].name; if(k!="id"&&k!="class"){j[k]=f[i].value}}
    for (i = 0; i < d; i++) {g[i] = fA(c[i])}
    l = new EFElement(a, b, e, j, g);
    l.setElement(p);
    return l;
  }

  return {
    convertDomToEF: fA
  };
})();
