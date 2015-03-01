var Events = (function() {
  var self;
  var handlers = {};

  /**
   *
   * @constructor
   */
  function Events()
  {
    self = this;
  }

  /**
   *
   * @param type
   * @param editor
   */
  Events.prototype.emitEvent = function(type, editor)
  {};

  /**
   *
   * @param type
   */
  Events.prototype.registerEvent = function(type)
  {};

  /**
   *
   * @param a {Array}
   */
  Events.prototype.registerHandlers = function(a)
  {
    var i, c;
    c = a.length;
    for (i = 0; i < c; i++) {

      if (!handlers[a[i].event]) {
        handlers[a[i].event] = {all:[], wPane:[], sPane:[], rPane: [], tPane:[]};
      }

      handlers[a[i].event].push(a[i].method);
    }
  };

  Events.prototype.handleEvent = function(e, s)
  {
    var i, c;
    if (handlers[e.type] instanceof Array) {
      c = handlers[e.type].length;
      for (i = 0; i < c; i++) {
        handlers[e.type][i]();
      }
    }
  };
})();
