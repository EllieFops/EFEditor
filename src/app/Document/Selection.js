define(
  [],
  function() {
    var self;

    /**
     * Editor Selection Object
     *
     * @param editor {WPane} Editor Node object
     * @param start  {int}  Start Position.
     * @param end    {int}  End Position.
     *
     * @constructor
     */
    function Selection(editor, start, end)
    {
      self = this;

      function init() {
        if (!editor instanceof EFEditor) {
          throw Error('Invalid EFEditor Object passed to selection.');
        }

        self.efEditor = editor;
        self.startPosition = start;
        self.endPosition = end;
        self.element = editor.node.getNodeContaining(start, end);

      } init();

      self.getStartPosition = function()
      {
        return self.startPosition;
      };

      self.getEndPosition = function()
      {
        return self.endPosition;
      };

      self.getElement = function ()
      {
        return self.element;
      };

      self.getEditor = function ()
      {
        return self.efEditor;
      };

      /**
       * Set new start position for this selection.
       *
       * @param sPos {int} updated start position.
       * @returns {Selection}
       */
      self.setStartPosition = function(sPos)
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
      self.setEndPosition =  function(ePos)
      {
        this.endPosition = ePos;
        if (!self.element.containsPosition(ePos)) {
          self.element = self.element.getNodeContaining(self.startPosition, ePos)
        }
        return this;
      };
    }

    return Selection;
  }
);
