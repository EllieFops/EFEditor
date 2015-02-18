define([], function ()
{
  var self;

  function Base()
  {
    self = this;
    self.listenEvents = {};
    self.dispatchEvents = {};

    self.initMouseEvents = function ()
    {
      self.listenEvents.click = [];
      self.listenEvents.mouseup = [];
      self.listenEvents.mousedown = [];
      self.listenEvents.mouseenter = [];
      self.listenEvents.mouseover = [];
      self.listenEvents.mouseleave = [];
      self.listenEvents.mousemove = [];
      self.listenEvents.contextmenu = [];
      self.listenEvents.dblclick = [];
      self.listenEvents.wheel = [];
    };

    self.initKeyboardEvents = function ()
    {
      self.listenEvents.keydown = [];
      self.listenEvents.keyup = [];
      self.listenEvents.keypress = [];
    };

    self.initFormEvents = function ()
    {
      self.listenEvents.blur = [];
      self.listenEvents.change = [];
      self.listenEvents.focus = [];
      self.listenEvents.focusin = [];
      self.listenEvents.focusout = [];
      self.listenEvents.input = [];
      self.listenEvents.reset = [];
      self.listenEvents.search = [];
      self.listenEvents.select = [];
      self.listenEvents.submit = [];
    };

    self.initDragEvents = function ()
    {
      self.listenEvents.drag = [];
      self.listenEvents.dragend = [];
      self.listenEvents.dragenter = [];
      self.listenEvents.dragleave = [];
      self.listenEvents.dragover = [];
      self.listenEvents.dragstart = [];
      self.listenEvents.drop = [];
    };

    self.initClipboardEvents = function ()
    {
      self.listenEvents.copy = [];
      self.listenEvents.cut = [];
      self.listenEvents.paste = [];
    };

    self.initPrintEvents = function ()
    {
      self.listenEvents.afterprint = [];
      self.listenEvents.beforeprint = [];
    };

    self.initTouchEvents = function ()
    {
      self.listenEvents.touchcancel = [];
      self.listenEvents.touchend = [];
      self.listenEvents.touchmove = [];
      self.listenEvents.touchstart = [];
    };

    self.initFrameEvents = function ()
    {
      self.listenEvents.hashchange = [];
      self.listenEvents.pageshow = [];
      self.listenEvents.pagehide = [];
      self.listenEvents.pagescroll = [];
      self.listenEvents.beforeunload = [];
      self.listenEvents.unload = [];
      self.listenEvents.load = [];
      self.listenEvents.resize = [];
    };

    self.fireEFEvent = function (name, element)
    {
      if (document.createEvent) {
        element.dispatchEvent(name);
      } else {
        element.fireEvent("on" + name, event);
      }
    };

    self.handleEvent = function(event)
    {
      var a;
      if (self.listenEvents[event.type]) {
        for (a = 0; a < self.listenEvents[event.type]; a++) {
          self.listenEvents[event.type][a](event);
        }
      }
    };

    self.addHandler = function(type, fun)
    {
      var a;
      type = type.split(' ');
      for (a = 0; a < type.length; a++) {
        if (type.indexOf('on') == 0) {
          type = type.substring(2);
        }
        if (!self.listenEvents[type]) {
          self.listenEvents[type] = [];
        }

        self.listenEvents[type].push(fun);
      }
    };

    self.attachListeners = function (element)
    {
      var a;
      for (a in self.listenEvents) {
        if (self.listenEvents.hasOwnProperty(a)) {
          element.removeEventListener('on' + a, self.handleEvent);
          element.addEventListener('on' + a, self.handleEvent);
        }
      }
    };
  }

  return Base;
})();
