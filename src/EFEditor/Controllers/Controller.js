EFEditor.Controllers.Base = (function ()
{
  var self;

  function Base()
  {
    self = this;
    self.eventTypes = {};

    self.initMouseEvents = function ()
    {
      self.eventTypes.Mouse = {
        CLICK:        'onclick',
        UP:           'onmouseup',
        DOWN:         'onmousedown',
        ENTER:        'onmouseenter',
        OVER:         'onmouseover',
        LEAVE:        'onmouseleave',
        MOVE:         'onmousemove',
        CONTEXT_MENU: 'oncontextmenu',
        DOUBLE_CLICK: 'ondblclick',
        WHEEL:        'onwheel'
      };
    };

    self.initKeyboardEvents = function ()
    {
      self.eventTypes.Keyboard = {
        KEY_DOWN:  'onkeydown',
        KEY_UP:    'onkeyup',
        KEY_PRESS: 'onkeypress'
      };
    };

    self.initFormEvents = function ()
    {
      self.eventTypes.Form = {
        BLUR:      'onblur',
        CHANGE:    'onchange',
        FOCUS:     'onfocus',
        FOCUS_IN:  'onfocusin',
        FOCUS_OUT: 'onfocusout',
        INPUT:     'oninput',
        INVALID:   'oninput',
        RESET:     'onreset',
        SEARCH:    'onsearch',
        SELECT:    'onselect',
        SUBMIT:    'onsubmit'
      }
    };

    self.initDragEvents = function ()
    {
      self.eventTypes.Drag = {
        DRAG:       'ondrag',
        DRAG_END:   'ondragend',
        DRAG_ENTER: 'ondragenter',
        DRAG_LEAVE: 'ondragleave',
        DRAG_OVER:  'ondragover',
        DRAG_START: 'ondragstart',
        DROP:       'ondrop'
      }
    };

    self.initClipboardEvents = function ()
    {
      self.eventTypes.Clipboard = {
        COPY:  'oncopy',
        CUT:   'oncut',
        PASTE: 'onpaste'
      }
    };

    self.initPrintEvents = function ()
    {
      self.eventTypes.Print = {
        AFTER_PRINT:  'onafterprint',
        BEFORE_PRINT: 'onbeforeprint'
      }
    };

    self.initTouchEvents = function ()
    {
      self.eventTypes.Touch = {
        TOUCH_CANCEL: 'ontouchcancel',
        TOUCH_END:    'ontouchend',
        TOUCH_MOVE:   'ontouchmove',
        TOUCH_START:  'ontouchstart'
      }
    };

    self.initFrameEvents = function ()
    {
      self.eventTypes.Frame = {
        HASHCHANGE: 'onhashchange',
        PAGE_SHOW: 'onpageshow',
        PAGE_HIDE: 'onpagehide',
        SCROLL: 'onpagescroll',
        BEFORE_UNLOAD: 'onbeforeunload',
        UNLOAD: 'onunload',
        LOAD: 'onload',
        RESIZE: 'onresize'
      }
    };
  }

  return Base;
})();
