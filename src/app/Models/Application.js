var App = (function() {
  var self;
  function Application()
  {
    self = this;

    self.emitter = new Events();

    self.wPane = null;
    self.sPane = null;
    self.rPane = null;
  }

  Application.prototype.getEmitter = function()
  {
    return self.emitter;
  };

  Application.prototype.getWPane = function()
  {
    return self.wPane;
  };

  Application.prototype.getSPane = function()
  {
    return self.sPane;
  };

  Application.prototype.getRPane = function()
  {
    return self.rPane;
  };

  Application.prototype.route = function(e)
  {
    self.emitter.handleEvent()
  };
})();
