(function ()
{
  var self;

  /**
   *
   * @param tag      {string}
   * @param title    {string}
   * @param type     {int}
   * @param parent   {EFElement}
   * @param children {Array}
   * @constructor
   */
  function EFElement(tag, title, type, parent, children)
  {
    self = this;

    /**
     * HTML Tag String
     *
     * @type {string}
     */
    self.tag = '';

    /**
     * Tag Title String
     *
     * @type {string}
     */
    self.title = '';

    /**
     * Element Type
     *
     * @type {int}
     */
    self.type = null;

    /**
     *
     * @type {Array}
     */
    self.requires = [];

    /**
     * Alias Data
     * @type {Object}
     */
    self.alias = null;

    /**
     * Child Elements
     *
     * @type {Array}
     */
    self.children = [];

    /**
     * Parent Node
     *
     * @type {EFElement}
     */
    self.parent = null;

    /**
     * Starting character position of this Node
     *
     * @type {number}
     */
    self.startPosition = 0;

    /**
     * Ending character position of this Node
     *
     * @type {number}
     */
    self.endPosition = 0;

    /**
     * Element Attributes
     *
     * @type {{}}
     */
    self.attributes = {};

    function init()
    {
      self.tag = (tag && typeof tag == 'string') ? tag : '#text';
      self.title = (title && typeof title == 'string') ? title : 'Text Element';
      self.type = (type && typeof type == 'number') ? type : BlockType.INLINE;
      self.parent = (parent && parent instanceof EFElement) ? parent : null;
      self.children = (children && children instanceof Array) ? children : [];
    }

    init();
  }

  /**
   * Get Element Title
   *
   * @returns {string}
   */
  EFElement.prototype.getTitle = function ()
  {
    return self.title;
  };

  /**
   * Set Element Title
   *
   * @param title {string}
   *
   * @returns {EFElement}
   */
  EFElement.prototype.setTitle = function (title)
  {
    EFElement.prototype.title = title;
    return self;
  };

  /**
   * Get Element Type
   *
   * @returns {int}
   */
  EFElement.prototype.getType = function ()
  {
    return self.type;
  };

  /**
   * Set Element Type
   *
   * @param type {int}
   *
   * @returns {EFElement}
   */
  EFElement.prototype.setType = function (type)
  {
    EFElement.prototype.type = type;
    return self;
  };

  /**
   * Get Element Tag Text
   *
   * @returns {string}
   */
  EFElement.prototype.getTag = function ()
  {
    return self.tag;
  };

  /**
   * Get Required Parent Elements
   *
   * @returns {Array}
   */
  EFElement.prototype.getRequires = function ()
  {
    return self.requires;
  };

  /**
   * Set Required Parent Elements
   *
   * @param requires {[]}
   * @returns {EFElement}
   */
  EFElement.prototype.setRequires = function (requires)
  {
    EFElement.prototype.requires = requires;
    return self;
  };

  /**
   * Check if this element has a preferred Alias
   *
   * @returns {boolean}
   */
  EFElement.prototype.hasAlias = function ()
  {
    return (EFElement.prototype.alias == null);
  };

  /**
   * Get this element's preferred alias.
   *
   * @returns {object}
   */
  EFElement.prototype.getAlias = function ()
  {
    return self.alias;
  };

  /**
   * Set this element's preferred alias.
   *
   * @param alias
   * @returns {EFElement}
   */
  EFElement.prototype.setAlias = function (alias)
  {
    EFElement.prototype.alias = alias;
    return self;
  };

  /**
   * Set Tag Attribute
   *
   * @param key   {string} Attribute name
   * @param value {string} Attribute value
   *
   * @returns {*}
   */
  EFElement.prototype.setTagAttribute = function (key, value)
  {
    self.attributes[key] = value;
    return self;
  };

  /**
   * Get the total text length of this node including all child nodes.
   *
   * @returns {int}
   */
  EFElement.prototype.getTotalLength = function ()
  {
    return (self.element) ? self.element.innerText.length : 0;
  };

  /**
   * Get the character count for just this node, excluding text from child nodes.
   *
   * @returns {int}
   */
  EFElement.prototype.getNodeLength = function ()
  {
    if (!self.element) {
      return 0;
    }
    if (self.children.length == 0) {
      return self.getTotalLength();
    }
    var total = 0;
    for (var c in self.children) {
      if (!self.children.hasOwnProperty(c) || !(self.children[c] instanceof Element)) {
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
   * @param s {int} Start Position
   * @param e {int} End Position
   *
   * @returns {EFElement}
   */
  EFElement.prototype.updatePositions = function (s, e)
  {
    self.startPosition = s;
    self.endPosition = e;
    return self;
  };

  /**
   * Check whether or not a Node contains a given position.
   *
   * @param p {int} Position to check.
   *
   * @returns {boolean}
   */
  EFElement.prototype.containsPosition = function (p)
  {
    return (self.startPosition > p && self.endPosition < p);
  };

  /**
   * Get the start position of a given node.  Returns -1 if node was not found.
   *
   * @param n {EFElement} Node to check for.
   *
   * @returns {number}
   */
  EFElement.prototype.findStartPositionOf = function (n)
  {
    var i;
    if (!n instanceof Node) {
      return -1;
    }
    i = self.children.indexOf(n);
    if (i == -1) {
      return i;
    }
    return self.children[i].startPosition;
  };

  /**
   * Check whether or not a Node contains a given selection.
   *
   * @param p {number} Start position of the selection.
   * @param e {number} End position of the selection.
   *
   * @returns {boolean}
   */
  EFElement.prototype.containsSelection = function (p, e)
  {
    return (self.containsPosition(p) && self.containsPosition(e));
  };

  /**
   * Append a Child Node to the end of the children on this node.
   *
   * @param c {EFElement} Child node to add.
   *
   * @returns {boolean}
   */
  EFElement.prototype.appendChild = function (c)
  {
    if (c instanceof EFElement) {
      self.children.push(c);
      return true;
    }
    return false;
  };


  /**
   * Get node containing given position.
   *
   * @param p {int} Position for which to find the topmost node.
   *
   * @returns {EFElement}
   */
  EFElement.prototype.getNodeAt = function (p)
  {
    if (p < self.startPosition || p > self.endPosition) {
      return (self.parent instanceof EFElement) ? self.parent.getNodeAt(p) : null;
    }
    for (var c in self.children) {
      if (!self.children.hasOwnProperty(c) || !self.children[c] instanceof EFElement) {
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
   * @param s {int} Start position of selection.
   * @param e {int} End position of selection.
   *
   * @return {EFElement}
   */
  EFElement.prototype.getNodeContaining = function (s, e)
  {
    var check = function (n, s, e)
    {
      return (n.startPosition < s || n.endPosition < s || n.startPosition > e || n.endPosition > e);
    };
    if (check(self, s, e)) {
      return (self.parent instanceof EFElement) ? self.parent.getNodeContaining(s, e) : null;
    }
    for (var c  in self.children) {
      if (!self.children.hasOwnProperty(c) || !(self.children[c] instanceof EFElement)) {
        continue;
      }
      if (check(self.children[c], s, e)) {
        return self.children[c].getNodeContaining(s, e);
      }
    }
    return self;
  };

  EFElement.prototype.breakNode = function (node, position, forward)
  {
    console.log(forward);
    if (!node instanceof EFElement || position) {
      return false; // TODO
    }
  };

  EFElement.prototype.setElement = function(element)
  {
    self.element = element;
  };

  return EFElement;
})();
