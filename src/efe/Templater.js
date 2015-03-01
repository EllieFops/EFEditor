define(
  [
    './Controllers/WPane',
    'util/Keyboard',
    'util/Misc'
  ],
  function(pane, keyboard, util) {
    var self;

    function Templater(configuration)
    {
      self = this;
      self.Keys = keyboard;

      function init()
      {
        util.hardMergeJSON(self.config, configuration);
      } init();

      self.initPane = function(domEl)
      {
        if (typeof domEl == 'string') {
          domEl = document.getElementById(domEl);
        }

        if (!domEl instanceof HTMLElement) {
          throw Error('Invalid Element or ID passed to EFEditor init.');
        }

        return new pane(domEl, self.config);
      };
    }
    return Templater;
  }
);
//var
//  DocNode,
//  Element,
//  ElementType,
//  Elements,
//  Config,
//  Selection;
//
//
//Editor = (function ()
//{
//  function Editor(element, configuration)
//  {
//    var self = this;
//    self.rootElement     = new DocNode(element);
//    self.configuration   = configuration;
//    self.currentNode     = self.rootElement;
//    self.currentPosition = 0;
//    self.nodeQueue       = [];
//
//    self.getNode = function ()
//    {
//
//    };
//
//    self.queueInsert = function (nodeType)
//    {
//
//    };
//
//    self.clearQueue = function()
//    {
//
//    }
//  }
//
//  /**
//   * Initialize an HTMLElement or tree of elements into DocNodes for use.
//   *
//   * @param element (HTMLElement) Element to be initialized.
//   * @param parent  (HTMLElement) Parent element or null if this is an editors top level element.
//   *
//   * @returns {DocNode}
//   */
//  Editor.prototype.initElement = function(element, parent)
//  {
//    var i = 0, e, n, nn, c = [];
//
//    n = new DocNode(element, parent);
//
//    if (element.children.length == 0) {
//
//      n.addChild(element.innerText);
//
//    } else {
//      e = element.childNodes;
//
//      for (; i < e.length; i++) {
//        nn = e[i].nodeName;
//        if (nn == '#text' || Config.whiteList[nn]) {
//          c.push(Editor.initElement(e[i], n));
//        }
//      }
//    }
//    return n;
//  };
//  return Editor;
//})();
