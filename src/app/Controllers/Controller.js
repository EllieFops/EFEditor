var Controller = (function(){
  var self;
  /**
   * Basic Controller
   *
   * @constructor
   */
  function Controller()
  {
    self = this;
    self.handles = [];
  }

  Controller.prototype.getHandles = function()
  {
    return self.handles;
  };

  Controller.prototype.handle = function(event, source)
  {};

})();
