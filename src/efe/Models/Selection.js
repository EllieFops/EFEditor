(function ()
{
  var self;

  /**
   * Editor Selection Object
   *
   * @param root {EFElement} Editor Node object
   * @param start  {int}     Start Position.
   * @param end    {int}     End Position.
   *
   * @constructor
   */
  function Selection(root, start, end)
  {
    self = this;

    if (!root instanceof EFElement) {
      throw Error('Invalid EFEditor Object passed to selection.');
    }

    /**
     * Root Element
     *
     * @type {EFElement}
     */
    self.efEditor = root;

    /**
     * Start position of this selection relative to the start of the root element.
     *
     * @type {Number}
     */
    self.startPosition = start;

    /**
     * End Position of this selection relative to the start of the root element.
     *
     * @type {Number}
     */
    self.endPosition = end;

    /**
     * Highest element in the element chain that contains the entire selection.
     *
     * @type {EFElement}
     */
    self.element = root.getNodeContaining(start, end);
  }


  Selection.prototype.getStartPosition = function ()
  {
    return self.startPosition;
  };

  Selection.prototype.getEndPosition = function ()
  {
    return self.endPosition;
  };

  Selection.prototype.getElement = function ()
  {
    return self.element;
  };

  Selection.prototype.getEditor = function ()
  {
    return self.efEditor;
  };

  /**
   * Set new start position for this selection.
   *
   * @param sPos {int} updated start position.
   * @returns {Selection}
   */
  Selection.prototype.setStartPosition = function (sPos)
  {
    this.startPosition = sPos;
    if (!self.element.containsPosition(sPos)) {
      self.element = self.element.getNodeContaining(sPos, self.endPosition);
    }
    return this;
  };

  /**
   * Set new end position for this selection.
   *
   * @param ePos {int} updated end position.
   * @returns {Selection}
   */
  Selection.prototype.setEndPosition = function (ePos)
  {
    this.endPosition = ePos;
    if (!self.element.containsPosition(ePos)) {
      self.element = self.element.getNodeContaining(self.startPosition, ePos)
    }
    return this;
  };

  return Selection;
})();
