requirejs.config({
  baseUrl: 'src/libs',
  paths: {
    app: 'src/app',
    util: 'src/app/Util',
    blocks: 'src/app/Document',
    serv: 'src/app/Services',
    doc: 'src/app/Document'
  }
});

var EFEditor = requirejs(
  [
    'app/Controllers/WPane',
    'util/Keyboard'
  ],
  function(pane, keyboard) {
    var self = this;

    function EFEditor(configuration)
    {
      self.Keys = keyboard;
      self.config = {
        modules: {},
        whiteList: {
          'B':     true,
          'DIV':   true,
          'I':     true,
          'IMG':   true,
          'LI':    true,
          'OL':    true,
          'SPAN':  true,
          'TABLE': true,
          'TBODY': true,
          'TD':    true,
          'TH':    true,
          'THEAD': true,
          'TR':    true,
          'U':     true,
          'UL':    true
        }
      };

      function init()
      {
        var a;
        for (a in configuration) {
          if (configuration.hasOwnProperty(a)) {
            self.config[a] = configuration[a];
          }
        }
      } init();

      self.initPane = function(domEl, configuration)
      {
        if (typeof domEl == 'string') {
          domEl = document.getElementById(domEl);
        }

        if (!domEl instanceof HTMLElement) {
          throw Error('Invalid Element or ID passed to EFEditor init.');
        }

        return new pane(domEl, configuration);
      };
    }
    return EFEditor;
  }
);
var
  DocNode,
  Element,
  ElementType,
  Elements,
  Config,
  Selection;


Editor = (function ()
{
  function Editor(element, configuration)
  {
    var self = this;
    self.rootElement     = new DocNode(element);
    self.configuration   = configuration;
    self.currentNode     = self.rootElement;
    self.currentPosition = 0;
    self.nodeQueue       = [];

    self.getNode = function ()
    {

    };

    self.queueInsert = function (nodeType)
    {

    };

    self.clearQueue = function()
    {

    }
  }

  /**
   * Initialize an HTMLElement or tree of elements into DocNodes for use.
   *
   * @param element (HTMLElement) Element to be initialized.
   * @param parent  (HTMLElement) Parent element or null if this is an editors top level element.
   *
   * @returns {DocNode}
   */
  Editor.prototype.initElement = function(element, parent)
  {
    var i = 0, e, n, nn, c = [];

    n = new DocNode(element, parent);

    if (element.children.length == 0) {

      n.addChild(element.innerText);

    } else {
      e = element.childNodes;

      for (; i < e.length; i++) {
        nn = e[i].nodeName;
        if (nn == '#text' || Config.whiteList[nn]) {
          c.push(Editor.initElement(e[i], n));
        }
      }
    }
    return n;
  };
  return Editor;
})();
