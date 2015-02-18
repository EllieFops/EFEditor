define(
  [
    './Controller',
    'util/Misc',
    'serv/Selection'
  ],
  function(controller, util, sel) {
    var self;

    function WPane(node, config)
    {
      self = this;
      self.prototype = controller;
      self.node      = null;

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
        self.initKeyboardEvents();
        self.initMouseEvents();
        self.initFrameEvents();

        if (config.modules && typeof config.modules == 'object') {
          if (config.modules.forms || config.modules.all) {
            self.initFormEvents();
          }
          if (config.modules.clipboard || config.modules.all) {
            self.initClipboardEvents();
          }
          if (config.modules.drag || config.modules.all) {
            self.initDragEvents();
          }
          if (config.modules.print || config.modules.all) {
            self.initPrintEvents();
          }
          if (config.modules.touch || config.modules.all) {
            self.initTouchEvents();
          }
        }

        self.attachListeners(node.getElement());

        // Init Event handlers
        self.addHandler('mouseup keyup', function(){sel.updateSelection()});

        self.dispatchEvent(self.dispatchEvents.postinit);
      }
      init();
    }

    WPane.prototype.setSelection = function(selection)
    {
      if (!selection instanceof Selection && selection !== null) {
        throw Error('Invalid Selection Argument Passed.');
      }
      this.selection = selection;
      return this;
    };

    WPane.prototype.getSelection = function()
    {
      return this.selection;
    };

    return WPane;
  }
);
