(function ()
{
  var App, Controllers, Services, Models;

  Services = {
    Factory:   {
      Element: {
        /**
         * Create Anchor Element
         *
         * @returns {Models.Element}
         */
        'A': function ()
        {
          return new Models.Element('a', 'Anchor', Models.BlockType.INLINE);
        },

        'ABBR':    null,
        'ACRONYM': null,

        /**
         * Create Address Element
         *
         * @returns {Models.Element}
         */
        'ADDRESS': function ()
        {
          return new Models.Element('address', 'Address Block', Models.BlockType.BLOCK);
        },

        'APPLET': null,
        'AREA':   null,

        /**
         * Create Article Element
         *
         * @returns {Models.Element}
         */
        'ARTICLE': function ()
        {
          return new Models.Element('article', 'Article Block', Models.BlockType.BLOCK);
        },

        'AUDIO': null,

        /**
         * Make Bold Element
         *
         * @returns {Models.Element}
         */
        'B': function ()
        {
          var a = new Models.Element('b', 'Bold', Models.BlockType.INLINE);
          a.setAlias({tag: 'SPAN', attributes: {'class': 'bold'}});
          return a;
        },

        /**
         * Make Base Element
         *
         * @returns {Models.Element}
         */
        'BASE': function ()
        {
          return new Models.Element('base', 'Base Directory', Models.BlockType.META);
        },

        'BASEFONT': null,

        /**
         * Make Body Element
         *
         * @returns {Models.Element}
         */
        'BODY': function ()
        {
          return new Models.Element('body', 'Page Body', Models.BlockType.BLOCK);
        },

        'BDI':        null,
        'BDO':        null,
        'BIG':        null,
        'BLINK':      null,
        'BLOCKQUOTE': null,

        /**
         * Make Line Break Element
         *
         * @returns {Models.Element}
         */
        'BR': function ()
        {
          return new Models.Element('br', 'Line Break', Models.BlockType.SELF_CLOSING);
        },

        'BUTTON':   null,
        'CANVAS':   null,
        'CAPTION':  null,
        'CENTER':   null,
        'CITE':     null,
        'CODE':     null,
        'COL':      null,
        'COLGROUP': null,
        'CONTENT':  null,
        'DATA':     null,
        'DATALIST': null,

        /**
         * Create Definition Description
         *
         * @returns {Models.Element}
         */
        'DD': function ()
        {
          var a = new Models.Element('dd', 'Definition Description', Models.BlockType.INLINE_BLOCK);
          a.setRequires(['DL']);
          return a;
        },

        'DECORATOR': null,
        'DEL':       null,
        'DETAILS':   null,
        'DFN':       null,
        'DIALOG':    null,
        'DIR':       null,

        /**
         * Create Page Division
         *
         * @returns {Models.Element}
         */
        'DIV': function ()
        {
          return new Models.Element('div', 'Division', Models.BlockType.BLOCK);
        },

        'DL': function ()
        {
          return new Models.Element('dl', 'Definition List', Models.BlockType.BLOCK);
        },

        'DT':         function ()
        {
          return new Models.Element('dt', 'Definition Term', Models.BlockType.INLINE_BLOCK);
        },
        'ELEMENT':    null,
        'EM':         null,
        'EMBED':      null,
        'FIELDSET':   null,
        'FIGCAPTION': function ()
        {
          var a = new Models.Element('figcaption', 'Caption for a figure block', Models.BlockType.BLOCK);
          a.setRequires(['FIGURE']);
          return a;
        },
        'FIGURE':     function ()
        {
          return new Models.Element('figure', 'Figure', Models.BlockType.BLOCK);
        },
        'FOOTER':     function ()
        {
          return new Models.Element('footer', 'Content Footer', Models.BlockType.BLOCK);
        },
        'FORM':       null,
        'FRAME':      null,
        'FRAMESET':   null,
        'H1':         function ()
        {
          return new Models.Element('H1', 'Level 1 Header', Models.BlockType.INLINE_BLOCK);
        },
        'H2':         function ()
        {
          return new Models.Element('H2', 'Level 2 Header', Models.BlockType.INLINE_BLOCK);
        },
        'H3':         function ()
        {
          return new Models.Element('H3', 'Level 3 Header', Models.BlockType.INLINE_BLOCK);
        },
        'H4':         function ()
        {
          return new Models.Element('H4', 'Level 4 Header', Models.BlockType.INLINE_BLOCK);
        },
        'H5':         function ()
        {
          return new Models.Element('H5', 'Level 5 Header', Models.BlockType.INLINE_BLOCK);
        },
        'H6':         function ()
        {
          return new Models.Element('H6', 'Level 6 Header', Models.BlockType.INLINE_BLOCK);
        },
        'HEAD':       function ()
        {
          return new Models.Element('head', 'Body Metadata', Models.BlockType.BLOCK);
        },
        'HEADER':     function ()
        {
          return new Models.Element('header', 'Content Header', Models.BlockType.BLOCK);
        },
        'HGROUP':     function ()
        {
          return new Models.Element('hgroup', 'Header Group', Models.BlockType.BLOCK);
        },
        'HR':         function ()
        {
          return new Models.Element('hr', 'Horizontal Separator', Models.BlockType.SELF_CLOSING);
        },
        'HTML':       null,
        'I':          function ()
        {
          var a = new Models.Element('i', 'Italic', Models.BlockType.INLINE);
          a.setAlias({tag: 'SPAN', attributes: {'class': 'italic'}});
          return a;
        },
        'IFRAME':     null,
        'IMG':        function ()
        {
          return new Models.Element('img', 'Image', Models.BlockType.SELF_CLOSING);
        },
        'INPUT':      null,
        'INS':        null,
        'ISINDEX':    null,
        'KBD':        null,
        'KEYGEN':     null,
        'LABEL':      null,
        'LEGEND':     null,
        'LI':         function ()
        {
          return new Models.Element('li', 'List Item', Models.BlockType.INLINE_BLOCK).setRequires(['OL', 'UL']);
        },
        'LINK':       function ()
        {
          return new Models.Element('link', 'Meta Link', Models.BlockType.SELF_CLOSING).setRequires(['HEAD']);
        },
        'LISTING':    null,
        'MAIN':       null,
        'MAP':        null,
        'MARK':       null,
        'MENU':       null,
        'MENUITEM':   null,
        'META':       function ()
        {
          var a = new Models.Element('meta', 'Page Metadata', Models.BlockType.SELF_CLOSING);
          a.setRequires(['HEAD']);
          return a;
        },
        'METER':      null,
        'NAV':        function ()
        {
          return new Models.Element('nav', 'Navigation Block', Models.BlockType.BLOCK);
        },
        'NOEMBED':    null,
        'NOSCRIPT':   null,
        'OBJECT':     null,
        'OL':         function ()
        {
          return new Models.Element('ol', 'Ordered List', Models.BlockType.BLOCK);
        },
        'OPT':        null,
        'OPTGROUP':   function ()
        {
          var a = new Models.Element('optgroup', 'Option Group', Models.BlockType.INLINE_BLOCK);
          a.setRequires(['SELECT']);
          return a;
        },
        'OPTION':     function ()
        {
          var a = new Models.Element('option', 'Option', Models.BlockType.INLINE_BLOCK);
          a.setRequires(['SELECT']);
          return a;
        },
        'OUTPUT':     null,
        'P':          function ()
        {
          return new Models.Element('p', 'Paragraph', Models.BlockType.BLOCK);
        },
        'PARAM':      null,
        'PLAINTEXT':  null,
        'PRE':        null,
        'PROGRESS':   null,
        'Q':          null,
        'RP':         null,
        'RT':         null,
        'RUBY':       null,
        'S':          null,
        'SAMP':       null,
        'SCRIPT':     null,
        'SECTION':    function ()
        {
          return new Models.Element('section', 'Body content section', Models.BlockType.BLOCK);
        },
        'SELECT':     function ()
        {
          return new Models.Element('select', 'Select', Models.BlockType.BLOCK);
        },
        'SHADOW':     null,
        'SMALL':      null,
        'SOURCE':     null,
        'SPACER':     null,
        'SPAN':       function ()
        {
          return new Models.Element('span', 'Span', Models.BlockType.INLINE);
        },
        'STRIKE':     null,
        'STRONG':     null,
        'STYLE':      function ()
        {
          var a = new Models.Element('style', 'Style Tag', Models.BlockType.BLOCK);
          a.setTagAttributes({'scoped': "scoped"});
          return a;
        },
        'SUB':        null,
        'SUMMARY':    null,
        'SUP':        null,
        'TABLE':      function ()
        {
          return new Models.Element('table', 'Table', Models.BlockType.BLOCK);
        },
        'TBODY':      function ()
        {
          return new Models.Element('tbody', 'Table Body', Models.BlockType.BLOCK).setRequires(['TABLE']);
        },
        'TD':         function ()
        {
          return new Models.Element('td', 'Table Cell', Models.BlockType.INLINE_BLOCK).setRequires(['TBODY > TR']);
        },
        'TEMPLATE':   null,
        'TEXTAREA':   null,
        'TH':         function ()
        {
          var a = new Models.Element('th', 'Table Header Cell', Models.BlockType.INLINE_BLOCK);
          a.setRequires(['THEAD > TR', 'TABLE > TR']);
          return a;
        },
        'THEAD':      function ()
        {
          return new Models.Element('thead', 'Table Header', Models.BlockType.BLOCK).setRequires(['TABLE']);
        },
        'TIME':       null,
        'TITLE':      function ()
        {
          return new Models.Element('title', 'Page Title', Models.BlockType.INLINE_BLOCK).setRequires(['HEAD']);
        },
        'TR':         function ()
        {
          var a = new Models.Element('tr', 'Table Row', Models.BlockType.BLOCK);
          a.setRequires(['TABLE', 'THEAD', 'TBODY']);
          return a;
        },
        'TRACK':      null,
        'TT':         null,
        'U':          function ()
        {
          var a = new Models.Element('u', 'Underline', Models.BlockType.INLINE);
          a.setAlias({tag: 'SPAN', attributes: {'class': 'underline'}});
          return a;
        },
        'UL':         function ()
        {
          return new Models.Element('ul', 'Unordered List', Models.BlockType.BLOCK);
        },
        'VAR':        null,
        'VIDEO':      null,
        'WBR':        null,
        'XMP':        null
      }
    },

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
       * Recursive overwriting merge of 2 JSON objects.
       *
       * @param j1  {object} Original object.
       * @param j2  {object} Object to merge in.
       * @param max {int}    Max Merge Depth
       *
       * @return {null}
       */
      hardMergeJSON: function (j1, j2, max)
      {
        function merge(j1, j2, max, cur)
        {
          var a;
          if (!cur) {
            cur = 0;
          }
          for (a in j2) {
            if (j2.hasOwnProperty(a)) {
              if (typeof j2[a] == 'object' && j1[a] && typeof j1[a] == 'object' && (max <= 0 || (max > 0 && cur < max))) {
                j1[a] = merge(j1[a], j2[a], max, (cur + 1));
              } else {
                j1[a] = j2[a];
              }
            }
          }
        }
        merge(j1, j2, max, 0);
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
