/**
 * User Element
 *
 * @class     UserElement
 * @namespace element
 * @extends   element.EditorElement
 *
 * @module  EFEditor
 * @since   0.0.1
 * @version 0.0.1
 *
 * @author Elizabeth Harper <elliefops@gmail.com>
 *
 * @constructor
 * @param element {HTMLElement|String}
 */
EFEditor.element.UserElement = function(element) {

  var self;

  EFEditor.element.EditorElement.call(this, element);
  this.prototype = Object.create(EFEditor.element.EditorElement.prototype);

  self = this;

  self.startPosition = 0;
  self.endPosition   = 0;


  /**
   * Break Element
   *
   * Break this element into two elements at a given position.  This allows elements with overlapping start or end tags
   * to be created without creating invalid html.
   *
   * @method breakElement
   *
   * @param pos {Number} Position to break this element at.
   */
  self.breakElement = function(pos)
  {
    return pos;
    // TODO
  };

  /**
   * Get Element Length
   *
   * Get the length of this element excluding any child elements.
   *
   * @method getElementLength
   *
   * @returns {Number}
   */
  self.getElementLength = function ()
  {
    var a, b, c, i;
    a = self.htmlElement.innerText.length;
    b = self.children;
    c = b.length;
    for (i = 0; i < c; i++) {
      a -= b[i].getInnerLength();
    }
    return a;
  };

  /**
   * Get Total Length
   *
   * Gets the total text length of this element including all child elements.
   *
   * @method getTotalLength
   *
   * @returns {number}
   */
  self.getInnerLength = function ()
  {
    return self.htmlElement.innerText.length;
  };

  /**
   * Get element containing selection.
   *
   * @method getElementContaining
   *
   * @param start {int} Start position of selection.
   * @param end {int} End position of selection.
   *
   * @return {UserElement}
   */
  self.getElementContaining = function (start, end)
  {
    var check = function (n, s, e)
    {
      return (n.startPosition < s || n.endPosition < s || n.startPosition > e || n.endPosition > e);
    };
    if (check(self, start, end)) {
      return (self.parent instanceof EFEditor.element.UserElement) ? self.parent.getElementContaining(start, end) : null;
    }
    for (var c  in self.children) {
      if (!self.children.hasOwnProperty(c)) {continue;}
      if(!(self.children[c] instanceof EFEditor.element.UserElement)) {continue;}

      if (check(self.children[c], start, end)) {
        return self.children[c].getElementContaining(start, end);
      }
    }
    return self;
  };


  /**
   * Get element containing given position.
   *
   * @method getElementAt
   *
   * @param pos {int} Position for which to find the topmost element.
   *
   * @returns {UserElement}
   */
  self.getElementAt = function (pos)
  {
    var c;
    if (pos < self.startPosition || pos > self.endPosition) {
      return (self.parent instanceof EFEditor.element.UserElement) ? self.parent.getElementAt(pos) : null;
    }
    for (c in self.children) {

      if (!self.children.hasOwnProperty(c)) {continue;}
      if (!self.children[c] instanceof EFEditor.element.UserElement) {continue;}

      if (pos < self.children[c].startPosition || pos > self.children[c].endPosition) {
        continue;
      }
      self.children[c].getElementAt(pos);
    }
    return self;
  };


  /**
   * Update the character start and end positions for this element.
   *
   * NOTE: The start and end positions do not include HTML tags.
   *
   * @method updatePositions
   *
   * @param s {int} Start Position
   * @param e {int} End Position
   *
   * @chainable
   * @returns {UserElement}
   */
  self.updatePositions = function (s, e)
  {
    self.startPosition = s;
    self.endPosition = e;
    return self;
  };

  /**
   * Check whether or not a element contains a given position.
   *
   * @method containsPosition
   *
   * @param pos {int} Position to check.
   *
   * @returns {boolean}
   */
  self.containsPosition = function (pos)
  {
    return (self.startPosition > pos && self.endPosition < pos);
  };

  /**
   * Get the start position of a given element.  Returns -1 if element was not found.
   *
   * @method findStartPositionOf
   *
   * @param element {UserElement} Node to check for.
   *
   * @returns {number}
   */
  self.findStartPositionOf = function (element)
  {
    var i;
    if (!element instanceof EFEditor.element.UserElement) {
      return -1;
    }
    i = this.children.indexOf(element);
    if (i === -1) {
      return i;
    }
    return self.children[i].startPosition;
  };

  /**
   * Check whether or not a Node contains a given selection.
   *
   * @method containsSelection
   *
   * @param p {number} Start position of the selection.
   * @param e {number} End position of the selection.
   *
   * @returns {boolean}
   */
  self.containsSelection = function (p, e)
  {
    return (self.containsPosition(p) && self.containsPosition(e));
  };
};
