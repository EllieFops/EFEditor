var Configuration = (function() {

  var values = {
    modules: {},
    whiteList: {
      'B':     true,
      'DIV':   true,
      'I':     true,
      'IMG':   true,
      'LI':    true,
      'OL':    true,
      'SPAN':  true,
      'TABLE': true,
      'TBODY': true,
      'TD':    true,
      'TH':    true,
      'THEAD': true,
      'TR':    true,
      'U':     true,
      'UL':    true
    },
    decoration: {
      elements: {
        padding: 5,
        border: {
          style: 'dotted',
          width: 1,
          color: 'red',
          radius: {
            topLeft: 0,
            topRight: 0,
            bottomLeft: 0,
            bottomRight: 0
          }
        }
      },
      selectedElement: {
        inherits: 'decoration.elements',
        border: {
          color: 'blue'
        }
      }
    }
  };

  /**
   *
   * @param key {string} Path to the value that should be retrieved.
   * @param def {*}      Default value to use if the key could not be retrieved.
   * @returns {*}
   */
  function getValue(key, def)
  {
    var a;
    if (typeof def == "undefined") {def = null;}
    function search(key, m)
    {
      var k, nk, nm, he, th, ts;

      k  = key.split('.').shift();
      nk = key.substr(k.length+1);
      he = [];

      if (m.inherits) {
        th = search(key, search(m.inherits, values));
        if (th) {
          he.push(th);
        }
      }

      if (k && m && m[k]) {

        if (nk.length == 0) {
          if (m[k] instanceof Object) {
            if (he.length) {
              he.push(m[k]);
              ts = JSONHelper.hardMerge(he);
            } else {
              ts = m[k];
            }
            if (ts.inherits) {
              ts = JSONHelper.hardMerge(search(ts.inherits, values), ts);
            }
            return ts;
          } else {
            return m[k];
          }
        }

        if (typeof m[k] == 'object') {
          nm = search(nk, m[k]);
        } else {
          nm = null;
        }

      }

      if (!nm && he.length) {
        nm = he.shift();
      }
      return nm
    }

    a = search(key, values);
    return (typeof a == "undefined" || a == null) ? def : a;
  }

  return {
    getValue: getValue
  }
})();
