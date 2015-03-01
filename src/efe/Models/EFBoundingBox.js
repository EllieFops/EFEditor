var EFBoundingBox = (function() {

  var boundingBuffer = 5;

  function EFBoundingBox(element, editor)
  {
    if (!element instanceof EFElement || !editor instanceof efe.interface.WEditor) {
      throw new Error('Invalid element or editor passed to EFBoundingBox');
    }

    this.editor  = editor;
    this.element = element;
    this.self    = document.create('div');

    this.update();
  }

  EFBoundingBox.prototype.update = function()
  {
    var a, b, c, d, f, s;
    c = efe.application.Configuration.getValue('decoration.element');
    if (!c) {
      throw new Error('Configuration for element style not reachable.');
    }
    s = this.self.style;
    a = this.element.getElement();
    d = a.style;
    f = this.editor.getHTMLElement().getBoundingClientRect();
    b = a.getBoundingClientRect();

    // Dimensions
    s.width  = (b.width + c.padding) + 'px';
    s.height = (b.height + c.padding) + 'px';

    // Position
    s.top  = ((b.top - f.top) - c.padding) + 'px';
    s.left = ((b.left - f.left) - c.padding) + 'px';

    // Border Style
    s.borderWidth = c.border.width + 'px';
    s.borderColor = c.border.color;
    s.borderStyle = c.border.style;

    if (c.border.radius.topLeft) {
      s.borderTopLeftRadius = c.border.radius.topLeft + 'px';
    }
    if (c.border.radius.topRight) {
      s.borderTopRightRadius = c.border.radius.topRight + 'px';
    }
    if (c.border.radius.bottomLeft) {
      s.borderBottomLeftRadius = c.border.radius.bottomLeft + 'px';
    }
    if (c.border.radius.bottomRight) {
      s.borderBottomRightRadius = c.border.radius.bottomRight + 'px';
    }
  };

  EFBoundingBox.prototype.isInBufferRange = function(x, y)
  {
    var o, x1, x2, y1, y2;
    if (x instanceof Position) {y = x.getYPos(); x = x.getXPos();}
    o  = this.element.getElement().getBoundingClientRect();
    x1 = o.left   - boundingBuffer;
    y1 = o.top    - boundingBuffer;
    x2 = o.right  + boundingBuffer;
    y2 = o.bottom + boundingBuffer;

    return (x >= x1 && x <= x2 && y >= y1 && y <= y2);
  };

  /**
   *
   * @param x
   * @param y
   * @returns {{top: boolean, bottom: boolean, left: boolean, right: boolean}}
   */
  EFBoundingBox.prototype.isInResizeRange = function(x, y)
  {
    var o, x1, x2, y1, y2, b, r;

    if (x instanceof Position) {y = x.getYPos(); x = x.getXPos();}

    r = {top: false, bottom: false, left: false, right: false};

    if (!this.isInBufferRange(x, y)) {
      return r;
    }

    b = Configuration.getValue('decoration.element.padding', 5);
    o = this.element.getElement().getBoundingClientRect();

    x1 = o.left   + b;
    y1 = o.top    + b;
    x2 = o.right  - b;
    y2 = o.bottom - b;

    r.left   = x <= x1;
    r.right  = x >= x2;
    r.top    = y <= y1;
    r.bottom = y >= y2;
    return r;
  };

  return EFBoundingBox;
})();
