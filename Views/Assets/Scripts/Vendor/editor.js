var
  EFEditor,
  DocNode,
  Element,
  ElementType,
  Elements,
  Config,
  Selection;

Selection = (function(){
  function Selection(ed, s, e)
  {
    if (!ed instanceof Editor) {
      ed.get
    }
  };

  return Selection;
})();


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

Config = {
  whiteList: {
    'B':     Elements.B,
    'DIV':   Elements.DIV,
    'I':     Elements.I,
    'IMG':   Elements.IMG,
    'LI':    Elements.LI,
    'OL':    Elements.OL,
    'SPAN':  Elements.SPAN,
    'TABLE': Elements.TABLE,
    'TBODY': Elements.TBODY,
    'TD':    Elements.TD,
    'TH':    Elements.TH,
    'THEAD': Elements.THEAD,
    'TR':    Elements.TR,
    'U':     Elements.U,
    'UL':    Elements.UL
  }
};

