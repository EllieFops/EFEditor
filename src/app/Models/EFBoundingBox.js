var EFBoundingBox = (function() {

  var boundingBuffer = 5;

  function EFBoundingBox(element)
  {
    EFElement.call(this, element);
  }

  EFBoundingBox.prototype = Object.create(EFElement.prototype);

  EFBoundingBox.prototype.isInBufferRange = function(x, y)
  {
    var o, x1, x2, y1, y2;
    if (x instanceof Position) {y = x.getYPos(); x = x.getXPos();}
    o  = this.e.getBoundingClientRect();
    x1 = o.left   - boundingBuffer;
    y1 = o.top    - boundingBuffer;
    x2 = o.right  + boundingBuffer;
    y2 = o.bottom + boundingBuffer;

    return ((x >= x1 && x <= x2) || (y >= y1 && y <= y2));
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
    o = this.e.getBoundingClientRect();

    x1 = o.left   + b;
    y1 = o.top    + b;
    x2 = o.right  - b;
    y2 = o.bottom - b;

    r.left   = x <= x1;
    r.right  = x >= x2;
    r.rop    = y <= y1;
    r.bottom = y >= y2;
    return r;
  };

  return EFBoundingBox;
})();
