var JSONHelper = (function() {

  function jsonHardMerge()
  {
    var i, c, first, depth, args;

    if (arguments[0] instanceof Array) {
      args  = arguments[0];
      depth = (typeof arguments[1] == "number") ? arguments[1] : 0;
    } else {
      args  = arguments;
      depth = (typeof args[args.length - 1] == "number") ? args[args.length - 1] : 0;
    }
    c     = args.length;
    first = JSON.parse(JSON.stringify(args[0]));

    for (i = 1; i < c; i++) {
      if (typeof args[i] == "object") {
        merge(first, args[i], depth);
      }
    }

    function merge(j1, j2, max, cur)
    {
      var a;
      if (!cur) {cur = 0;}
      for (a in j2) {
        if (j2.hasOwnProperty(a)) {
          if (typeof j2[a] == 'object' && j1[a] && typeof j1[a] == 'object' && (max <= 0 || (max > 0 && cur < max))) {
            merge(j1[a], j2[a], max, (cur + 1));
          } else {
            j1[a] = j2[a];
          }
        }
      }
    }
    return first;
  }

  return {
    hardMerge: jsonHardMerge
  };
})();
