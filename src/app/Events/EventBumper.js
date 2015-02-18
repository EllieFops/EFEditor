EFEditor.EventBumper = (function(){

  var self;

  function EventBumper()
  {
    self = this;
    self.handlers={};
  }

  EventBumper.prototype.registerHandler = function(event, method)
  {
    if (!self.handlers[event]) {
      self.handlers[event] = [];
    }
    self.handlers[event].push(method);
    return true;
  };

  EventBumper.prototype.deregisterHandler = function(event, method)
  {
    var b,a = self.handlers;
    if (!a[event]|| !a[event] instanceof Array) {
      return false;
    }
    a = a[event];
    b = a.indexOf(method);
    if (b == -1) {
      return false;
    }
   a.splice(b, 1);
    return true;
  }

  EventBumper.prototype.runHandlers = function(event)
  {
    var a,i;
    a = this.handlers[event];
    if (a instanceof Array) {
      for (i = 0; i < a.length; i++) {
        if (a[i]() == false) {
          return false;
        }
      }
    }
    return true;
  }
})();
