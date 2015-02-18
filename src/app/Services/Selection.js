define(
  [
    'app/Document/Selection'
  ],
  function (selBase)
  {
    var curSelection, SelectionService = {};
    SelectionService.getFullPosition = function (node)
    {
      var a, b, c, sel;

      function fa(element, child, offset, selection)
      {
        var e;
        e = document.createRange();
        e.selectNodeContents(element);
        e.setEnd(child, offset);
        selection.removeAllRanges();
        selection.addRange(e);
        return selection.toString().length;
      }

      sel = document.getSelection();
      a = sel.getRangeAt(a.rangeCount - 1);
      b = fa(node, a.startContainer, a.startOffset, sel);
      c = fa(node, a.endContainer, a.endOffset, sel);
      sel.removeAllRanges();
      sel.addRange(a);
      return {start: b, end: c};
    };

    SelectionService.updateSelection = function (node)
    {
      var a;
      a = SelectionService.getFullPosition(node);
      if (a.start != curSelection.getStartPosition() || a.end != curSelection.getEndPosition()) {
        curSelection = new selBase(node, a.start, a.end);
      }
    };

    return SelectionService;
  }
);
