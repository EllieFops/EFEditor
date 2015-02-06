EFEditor.Controllers.Base = (function () {
  var self;
  function Base()
  {
    self = this;
    self.eventTypes = {};

    self.initMouseEvents = function()
    {
      self.eventTypes.Mouse = {
        CLICK: 'onclick',
        UP: 'onmouseup',
        DOWN: 'onmousedown',
        ENTER: 'onmouseenter',
        OVER: 'onmouseover',
        LEAVE: 'onmouseleave',
        MOVE: 'onmousemove',
        CONTEXT_MENU: 'oncontextmenu',
        DOUBLE_CLICK: 'ondblclick'
      };
    };

    self.initKeyboardEvents = function()
    {
      self.eventTypes.Keyboard = {
        KEY_DOWN: 'onkeydown',
        KEY_UP: 'onkeyup',
        KEY_PRESS: 'onkeypress'
      };
    }
  }
})();
