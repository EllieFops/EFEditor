var EFElement = (function ()
{

  /**
   *
   * @param element {HTMLElement}
   *
   * @constructor
   */
  function EFElement(element)
  {
    if (!element instanceof HTMLElement) {
      throw Error('EFElement Constructor requires valid HTMLElement.');
    }
    this.e = element;
    this.childElements = [];
    this.parent = null;
    this.startPosition = 0;
    this.endPosition = 0;
  }

  /**
   *
   * @returns {string|nodeName}
   */
  EFElement.prototype.getType = function ()
  {
    return this.e.nodeName;
  };

  /**
   *
   * @returns {string|n._newInst.id|*|id|ui.selectmenu._drawMenu.id|._drawMenu.id}
   */
  EFElement.prototype.getId = function ()
  {
    return this.e.id;
  };

  /**
   *
   * @param n
   * @returns {EFElement}
   */
  EFElement.prototype.setId = function (n)
  {
    this.e.id = n;
    return this;
  };

  /**
   *
   * @returns {DOMTokenList}
   */
  EFElement.prototype.getClasses = function ()
  {
    return this.e.classList;
  };

  /**
   *
   * @param a
   * @returns {EFElement}
   */
  EFElement.prototype.addClass = function (a)
  {
    this.e.classList.add(a);
    return this;
  };

  /**
   *
   * @param a
   * @returns {EFElement}
   */
  EFElement.prototype.dropClass = function (a)
  {
    this.e.classList.remove(a);
    return this;
  };

  /**
   *
   * @param a
   * @returns {boolean}
   */
  EFElement.prototype.hasClass = function (a)
  {
    return this.e.classList.contains(a);
  };

  /**
   *
   * @param a
   * @returns {*|string}
   */
  EFElement.prototype.getAttribute = function (a)
  {
    return this.e.getAttribute(a);
  };

  /**
   *
   * @param a
   * @param v
   * @returns {EFElement}
   */
  EFElement.prototype.setAttribute = function (a, v)
  {
    this.e.setAttribute(a, v);
    return this;
  };

  /**
   * Set Collection of Attributes
   *
   * @param a {{}}
   *
   * @returns {EFElement}
   */
  EFElement.prototype.setAttributes = function (a)
  {
    for (var i in a) {
      if (a.hasOwnProperty(i)) {
        this.e.setAttribute(i, a[i]);
      }
    }
    return this;
  };

  /**
   *
   * @returns {number}
   */
  EFElement.prototype.getInnerLength = function ()
  {
    return this.e.innerText.length;
  };

  /**
   *
   * @returns {number}
   */
  EFElement.prototype.getNodeLength = function ()
  {
    var a, b, i;
    a = this.e.innerText.length;
    b = this.children;
    for (i = 0; i < b.length; i++) {
      a -= b[i].getInnerLength();
    }
    return a;
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
    this.startPosition = s;
    this.endPosition = e;
    return this;
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
    return (this.startPosition > p && this.endPosition < p);
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
    i = this.children.indexOf(n);
    if (i === -1) {
      return i;
    }
    return this.children[i].startPosition;
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
    return (this.containsPosition(p) && this.containsPosition(e));
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
      this.childElements.push(c);
      this.e.appendChild(c.getElement());
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
    var c;
    if (p < this.startPosition || p > this.endPosition) {
      return (this.parent instanceof EFElement) ? this.parent.getNodeAt(p) : null;
    }
    for (c in this.children) {

      if (!this.children.hasOwnProperty(c)) {continue;}
      if (!this.children[c] instanceof EFElement) {continue;}

      if (p < this.children[c].startPosition || p > this.children[c].endPosition) {
        continue;
      }
      this.children[c].getNodeAt(p);
    }
    return this;
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
    if (check(this, s, e)) {
      return (this.parent instanceof EFElement) ? this.parent.getNodeContaining(s, e) : null;
    }
    for (var c  in this.children) {
      if (!this.children.hasOwnProperty(c)) {continue;}
      if(!(this.children[c] instanceof EFElement)) {continue;}

      if (check(this.children[c], s, e)) {
        return this.children[c].getNodeContaining(s, e);
      }
    }
    return this;
  };

  /**
   *
   * @param node
   * @param position
   * @param forward
   * @returns {boolean}
   */
  EFElement.prototype.breakNode = function (node, position, forward)
  {
    if (!node instanceof EFElement || position) {
      return false; // TODO
    }
  };

  /**
   *
   * @param z
   * @returns {EFElement}
   */
  EFElement.prototype.setElement = function (z)
  {
    this.e = z;
    return this;
  };

  /**
   *
   * @returns {HTMLElement}
   */
  EFElement.prototype.getElement = function ()
  {
    return this.e;
  };

  /**
   *
   * @returns {Array}
   */
  EFElement.prototype.getChildren = function()
  {
    return this.childElements;
  };

  return EFElement;
})();
