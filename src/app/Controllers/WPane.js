var WPane = (function() {

  var self;


  function WPane()
  {
    self = this;
    self.prototype = new Controller();
    self.prototype.handles = [
      {event: DomEvents.CLICK,     method: self.prototype.handleClick},
      {event: DomEvents.DBLCLICK,  method: self.prototype.handleDblClick},
      {event: DomEvents.MOUSE_UP,  method: self.prototype.handleMouseUp},
      {event: DomEvents.FOCUS_IN,  method: self.prototype.handleFocusIn},
      {event: DomEvents.INPUT,     method: self.prototype.handleInput},
      {event: DomEvents.KEY_UP,    method: self.prototype.handleKeyUp},
      {event: DomEvents.KEY_PRESS, method: self.prototype.handleKeyPress},
      {event: EFEvents.SEL_CHANGE, method: self.prototype.handleSelChange}
    ];
  }

  WPane.prototype.handleClick = function(e, s){};
  WPane.prototype.handleMouseUp = function(e, s){};
  WPane.prototype.handleFocusIn = function(e, s){};
  WPane.prototype.handleDblClick = function(e, s){};
  WPane.prototype.handleInput = function(e, s){};
  WPane.prototype.handleKeyPress = function(e, s){};
  WPane.prototype.handleKeyUp = function(e, s){};
  WPane.prototype.handleSelChange = function(e, s){};
})();
