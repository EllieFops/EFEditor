var WPane = (function() {

  var self;


  function WPane()
  {
    self = this;
    self.prototype = new Controller();
    self.prototype.handles = [
      {event: DOMEvents.CLICK,     method: self.prototype.handleClick},
      {event: DOMEvents.DBLCLICK,  method: self.prototype.handleDblClick},
      {event: DOMEvents.MOUSE_UP,  method: self.prototype.handleMouseUp},
      {event: DOMEvents.FOCUS_IN,  method: self.prototype.handleFocusIn},
      {event: DOMEvents.INPUT,     method: self.prototype.handleInput},
      {event: DOMEvents.KEY_UP,    method: self.prototype.handleKeyUp},
      {event: DOMEvents.KEY_PRESS, method: self.prototype.handleKeyPress},
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
