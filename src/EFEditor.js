(function ()
{
  var App, Controllers, Services, Models;

  Services = {

    Initialize: {

      /**
       * Initilize wPane Routes
       * @param app   {Application}
       * @param wPane {WPane}
       */
      initWPaneRoutes: function(app, wPane)
      {
        app.addRoute(Models.DomEvents.FOCUS_IN, wPane.handleFocus);
        app.addRoute(Models.DomEvents.MOUSE_UP, wPane.handleClick);
      }
    },

    Utility:   {
      getListenerTypes: function()
      {

      },

      getBrowserType: function()
      {
        var browser;
        if (!!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0) {
          browser = Models.BrowserType.OPERA;
        } else if (typeof InstallTrigger !== 'undefined') {
          browser = Models.BrowserType.FIREFOX;
        } else if(Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0) {
          browser = Models.BrowserType.SAFARI;
        } else if(!!window.chrome) {
          browser = Models.BrowserType.CHROME;
        } else if (/*@cc_on!@*/false || !!document.documentMode) {
          browser = Models.BrowserType.IE;
        }
        return browser;
      },

      /**
       * HTML Element To EFElement Object
       *
       * @param element  {HTMLElement}
       * @param parent   {Models.Element}
       * @param children {[]}
       *
       * @return {object}
       */
      HTMLtoEFElement: function (element, parent, children)
      {
        var nn = element.nodeName, el, i, e, a;

        if (!element instanceof HTMLElement || (nn != '#text' && !Models.Configuration.whiteList[nn])) {
          throw new Error('Invalid element passed to Node.');
        }

        if (Services.Factory.Element[nn]) {
          el = Services.Factory.Element[nn];
        } else {
          return null;
        }

        el.setElement(element);

        // Fetch attributes from HTML.
        if (element instanceof HTMLElement) {
          a = element.attributes;
          for (e in a) {
            if (a.hasOwnProperty(e) && typeof a[e] == 'object') {
              el.attributes[a[e].name] = a[e].value;
            }
          }
        }

        if (parent instanceof Models.Element) {
          el.parent = parent;
        }

        if (Array.isArray(children)) {
          for (i = 0; i < children.length; i++) {
            if (children[i] instanceof Models.Element) {
              el.children.push()
            }
          }
        }
        return el;
      },

      /**
       * Get the key code for the current browser.
       *
       * @param cr {int} Key Code for Chrome
       * @param ff {int} Key code for FireFox
       * @param ie {int} Key code for IE
       * @param op {int} Key code for Opera
       * @param sa {int} Key code for Safari
       * @returns {int}
       */
      keyCodeForBrowser: function (cr, ff, ie, op, sa)
      {
        var a = Models.BrowserType;
        switch (Services.Utility.getBrowserType()) {
          case a.CHROME:
            return cr;
          case a.IE:
            return ie;
          case a.FIREFOX:
            return ff;
          case a.SAFARI:
            return sa;
          case a.OPERA:
            return op;
        }
      },

      registerEvent: function(name)
      {
        var event; // The custom event that will be created

        if (document.createEvent) {
          event = document.createEvent("HTMLEvents");
          event.initEvent(name, true, true);
        } else {
          event = document.createEventObject();
          event.eventType = name;
        }

        return event;
      }
    },

    Selection: {
      getFullPosition: function (node)
      {
        var a, b, c, sel;

        function fa(element, child, offset, selection)
        {
          var e;
          e = document.createRange();
          e.selectNodeContents(element);
          e.setEnd(child, offset);
          selection.removeAllRanges();
          selection.addRange(e);
          return selection.toString().length;
        }

        sel = document.getSelection();
        a = sel.getRangeAt(sel.rangeCount - 1);
        b = fa(node, a.startContainer, a.startOffset, sel);
        c = fa(node, a.endContainer, a.endOffset, sel);
        sel.removeAllRanges();
        sel.addRange(a);
        return {start: b, end: c};
      },

      updateSelection: function (node, app)
      {
        var a;
        a = Services.Selection.getFullPosition(node);
        if (a.start != app.selection.getStartPosition() || a.end != app.selection.getEndPosition()) {
          app.selection = new Models.Selection(node, a.start, a.end);
        }
      },

      restoreSelection: function (sel)
      {
        var a = document.createRange();
        a.setStart(sel.getElement(), sel.offsetStart);
        a.setEnd(sel.getElement(), sel.offsetEnd);
      }
    }
  };

  Controllers = {
    Base:  (function ()
    {
      var self;

      /**
       * Base Controller
       *
       * @constructor
       */
      function Base()
      {
        self = this;
        self.listenEvents = {};
        self.dispatchEvents = {};
      }

      Base.prototype.fireEFEvent = function (name, element)
      {
        if (document.createEvent) {
          element.dispatchEvent(name);
        } else {
          element.fireEvent("on" + name, event);
        }
      };

      Base.prototype.handleEvent = function (event)
      {
        var a;
        if (self.listenEvents[event.type]) {
          for (a = 0; a < self.listenEvents[event.type]; a++) {
            self.listenEvents[event.type][a](event);
          }
        }
      };

      Base.prototype.addHandler = function (type, fun)
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

      Base.prototype.attachListeners = function (element)
      {
        var a;
        for (a in self.listenEvents) {
          if (self.listenEvents.hasOwnProperty(a)) {
            element.removeEventListener('on' + a, self.handleEvent);
            element.addEventListener('on' + a, self.handleEvent);
          }
        }
      };

      return Base;
    })(),
    WPane: (function ()
    {
      var self,
        focusClick;

      function WPane(node, app)
      {
        self = this;
        self.prototype = new Controllers.BASE();
        self.listenEvents = self.prototype.listenEvents;
        self.dispatchEvents = self.prototype.dispatchEvents;
        self.node = null;
        self.app = app;

        self.node = node;

        function init()
        {
          // Initialize Custom Events
          self.listenEvents['postinit'] = [];
          self.listenEvents['parse'] = [];
          self.listenEvents['postparse'] = [];
          self.listenEvents['wpaneready'] = [];

          self.dispatchEvents['postinit'] = util.registerEvent('postinit');
          self.dispatchEvents['parse'] = util.registerEvent('parse');
          self.dispatchEvents['postparse'] = util.registerEvent('postparse');
          self.dispatchEvents['wpaneready'] = util.registerEvent('wpaneready');

          // Initialize Regular Events
          self.prototype.initKeyboardEvents();
          self.prototype.initMouseEvents();
          self.prototype.initFrameEvents();

          if (config.modules && typeof config.modules == 'object') {
            if (config.modules.forms || config.modules.all) {
              self.prototype.initFormEvents();
            }
            if (config.modules.clipboard || config.modules.all) {
              self.prototype.initClipboardEvents();
            }
            if (config.modules.drag || config.modules.all) {
              self.prototype.initDragEvents();
            }
            if (config.modules.print || config.modules.all) {
              self.prototype.initPrintEvents();
            }
            if (config.modules.touch || config.modules.all) {
              self.prototype.initTouchEvents();
            }
          }

          self.prototype.attachListeners(node.getElement());

          // Init Event handlers
          self.prototype.addHandler('mouseup keyup', function ()
          {
            sel.updateSelection()
          });

          self.prototype.dispatchEvent(self.dispatchEvents.postinit);
        }

        init();
      }

      WPane.prototype.handleMouseUp = function(e)
      {
        if (focusClick) {
          focusClick = false;
        } else {
          Services.Selection.updateSelection(self.node, app);
        }
      };

      WPane.prototype.handleFocus = function(e)
      {
        focusClick = true;
        Services.Selection.restoreSelection(app.selection);
      };

      WPane.prototype.setSelection = function (selection)
      {
        if (!selection instanceof Selection && selection !== null) {
          throw Error('Invalid Selection Argument Passed.');
        }
        this.selection = selection;
        return this;
      };

      WPane.prototype.getSelection = function ()
      {
        return this.selection;
      };

      return WPane;
    })(),
    Selection: (function() {

    })()
  };

  App = (function() {
    var self;

    function Application(root)
    {
      self = this;
      self.root = root;
      self.listeners = {};
      self.emitters  = {};
      self.controllers = {};
      self.selection = {};
    }

    function handle(event)
    {}

    Application.prototype.addRoute = function(event, handler)
    {
      if (!self.listeners[event]) {
        self.listeners[event] = [];
      }
      self.listeners[event].push(handler);
      self.root.addEventListener(event, handle)
    };

    Application.prototype.route = function(event)
    {};

    Application.prototype.dropRoute = function(event)
    {};

    Application.prototype.registerController = function(key, controller)
    {
      self.controllers[key] = controller;
    }

  })();

  window.EFEditor = (function(){
    var self;

    function EFEditor(configuration)
    {
      self = this;
      self.browserType = Services.Utility.getBrowserType();

      (function() {
        if (configuration && typeof configuration == 'object') {
          Services.Utility.hardMergeJSON(Models.Configuration, configuration, 5);
        }
        Models.Keyboard.init();
      })();
    }

    function setup(p1)
    {
      var a;

      // Pane Setup
      a = new Controllers.WPane(p1);
      self.app.registerController('wPane', a);
    }

    EFEditor.prototype.initWYSIWYG = function(element)
    {
      var a;

      if (typeof element == 'string') {
        element = document.getElementById(element);
      }

      if (!element instanceof HTMLElement) {
        throw Error('Invalid root element given.');
      }

      a = Services.Utility.HTMLtoEFElement(element);
      self.app = new App(a);
    };

    return EFEditor;
  })();
})();
