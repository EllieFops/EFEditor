var
  Editor,
  Node;

Node = (function(){

  function Node(name, parent, contents)
  {
    var self = this;

    self.children = [];
    self.parent   = null;
    self.name     = name;

    function init()
    {
      if (Array.isArray(contents)) {
        self.children = contents;
      }

      if (parent instanceof Node) {
        self.parent = parent;
      }
    }

    Node.prototype.getTotalLength = function()
    {

    };

    Node.prototype.updatePositions()

    init();
  }
})();

Editor = (function(){

  function Editor(element, configuration)
  {
    var my = this;
    my.rootElement   = element;
    my.configuration = configuration;
  }

  Editor.prototype.findNode = function()
  {

  };

  return Editor;
})();

