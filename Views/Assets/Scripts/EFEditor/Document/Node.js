EFEditor.Document.Node = (function ()
{
  var self;

  /**
   * @param element  {HTMLElement} Backing HTML element for this DocNode.
   * @param parent   {DocNode}     Parent DocNode for this object.
   * @param contents {Array}       Array of child nodes to initialize this DocNode with.
   *
   * @constructor
   */
  function Node(element, parent, contents)
  {
    self = this;

    /**
     * Child DocNodes
     *
     * @type {Array}
     */
    self.children = [];

    /**
     * Parent DocNode
     *
     * @type {DocNode}
     */
    self.parent = null;

    /**
     * Backing HTMLElement of this DocNode
     *
     * @type {HTMLElement}
     */
    self.element = null;

    /**
     * Starting character position of this DocNode
     *
     * @type {number}
     */
    self.startPosition = 0;

    /**
     * Ending character postition of this DocNode
     *
     * @type {number}
     */
    self.endPosition = 0;

    /**
     * Type of this element
     *
     * @type {Element}
     */
    self.elementType = null;

    /**
     * Attributes for this DocNode
     *
     * @type {{}}
     */
    self.attrs = {};

    function init()
    {

      var nn = element.nodeName, i, e, a;

      if (!element instanceof HTMLElement || (nn != '#text' && !Config.whiteList[nn])) {
        throw new Error('Invalid element passed to DocNode.');
      }

      // Fetch attributes from HTML.
      if (element instanceof HTMLElement) {
        a = element.attributes;
        for (e in a) {
          if (a.hasOwnProperty(e) && typeof a[e] == 'object') {
            self.attrs[a[e].name] = a[e].value;
          }
        }
      }

      self.elementType = Elements[nn];

      if (parent instanceof DocNode) {
        self.parent = parent;
      }

      if (Array.isArray(contents)) {
        for (i = 0; i < contents.length; i++) {
          if (contents[i] instanceof DocNode) {
            self.children.push()
          }
        }
      }
    }
  }

  /**
   * Get the total text length of this node including all child nodes.
   *
   * @returns int
   */
  Node.prototype.getTotalLength = function ()
  {
    return (self.element) ? self.element.innerText.length : 0;
  };

  /**
   * Get the character count for just this node, excluding text from child nodes.
   *
   * @returns int
   */
  Node.prototype.getNodeLength = function ()
  {
    if (!self.element) {
      return 0;
    }
    if (self.children.length == 0) {
      return self.getTotalLength();
    }
    var total = 0;
    for (var c in self.children) {
      if (!self.children.hasOwnProperty(c) || !(self.children[c] instanceof DocNode)) {
        continue;
      }
      total += self.children[c].getTotalLength();
    }
    return self.element.innerText.length - total;
  };

  /**
   * Update the character start and end positions for this node.
   *
   * NOTE: The start and end positions do not include HTML tags.
   *
   * @param s (int) Start Position
   * @param e (int) End Position
   *
   * @returns {DocNode}
   */
  Node.prototype.updatePositions = function (s, e)
  {
    self.startPosition = s;
    self.endPosition = e;
    return this;
  };

  /**
   * Check whether or not a DocNode contains a given position.
   *
   * @param p (int) Position to check.
   *
   * @returns {boolean}
   */
  Node.prototype.containsPosition = function (p)
  {
    return (self.startPosition > p && self.endPosition < p);
  };

  /**
   * Get the start position of a given node.  Returns -1 if node was not found.
   *
   * @param n (DocNode) Node to check for.
   *
   * @returns {number}
   */
  Node.prototype.findStartPositionOf = function (n)
  {
    var i;
    if (!n instanceof DocNode) {
      return -1;
    }
    i = self.children.indexOf(n);
    if (i == -1) {
      return i;
    }
    return self.children[i].startPosition;
  };

  /**
   * Check whether or not a DocNode contains a given selection.
   *
   * @param p {number} Start postition of the selection.
   * @param e {number} End position of the selection.
   *
   * @returns {boolean}
   */
  Node.prototype.containsSelection = function (p, e)
  {
    return (self.containsPosition(p) && self.containsPosition(e));
  };

  /**
   * Append a Child DocNode to the end of the children on this node.
   *
   * @param c {DocNode} Child node to add.
   *
   * @returns {boolean}
   */
  Node.prototype.appendChild = function (c)
  {
    if (c instanceof DocNode) {
      self.children.push(c);
      return true;
    }
    return false;
  };


  /**
   * Get node containing given position.
   *
   * @param p (int) Position for which to find the topmost node.
   *
   * @returns DocNode
   */
  Node.prototype.getNodeAt = function (p)
  {
    if (p < self.startPosition || p > self.endPosition) {
      return (self.parent instanceof DocNode) ? self.parent.getNodeAt(p) : null;
    }
    for (var c in self.children) {
      if (!self.children.hasOwnProperty(c) || !self.children[c] instanceof DocNode) {
        continue;
      }
      if (p < self.children[c].startPosition || p > self.children[c].endPosition) {
        continue;
      }
      self.children[c].getNodeAt(p);
    }
    return self;
  };

  /**
   * Get node containing selection.
   *
   * @param s (int) Start position of selection.
   * @param e (int) End position of selection.
   *
   * @return DocNode
   */
  Node.prototype.getNodeContaining = function (s, e)
  {
    var check = function (n, s, e)
    {
      return (n.startPosition < s || n.endPosition < s || n.startPosition > e || n.endPosition > e);
    };
    if (check(self, s, e)) {
      return (self.parent instanceof DocNode) ? self.parent.getNodeContaining(s, e) : null;
    }
    for (var c  in self.children) {
      if (!self.children.hasOwnProperty(c) || !(self.children[c] instanceof DocNode)) {
        continue;
      }
      if (check(self.children[c], s, e)) {
        return self.children[c].getNodeContaining(s, e);
      }
    }
    return self;
  };

  Node.prototype.breakNode = function (node, position, forward)
  {
    if (!node instanceof DocNode || position) {
      return false;
    }
  };

  return Node;
})();
