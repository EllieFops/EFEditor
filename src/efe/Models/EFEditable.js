var EFElementManipulator = (function(){

  var element;
  var moveControl;
  var rotateControl;
  var resizeControls;

  function init()
  {
    initControls();
  }

  function initControls()
  {
    var a = document.createElement('span');
    a.style.setProperty('border', '1px solid #444');
    a.style.setProperty('position', 'absolute');
    a.style.setProperty('display', 'block');

    moveControl    = new EFElement(a.cloneNode());
    rotateControl  = new EFElement(a.cloneNode());
  }

  function selectElement(e)
  {
    var ed, el, br;
    if (!e instanceof EFElement) {throw Error('Cannot select non editor elements!')}
    element = e;
    ed = e.getEditor();
    el = e.getElement();

    positionControls();
    el.getElement().addEventListener('mousemove', resizeHandlesEvent);
    ed.registerSelected(e);
  }

  function deselectElement(e)
  {
    if (!e instanceof EFElement) {throw Error('Cannot deselect non editor elements!')}
  }

  function positionControls()
  {
    var mbr, ebr, edi;
    ebr = element.getElement().getBoundingClientRect();
    edi = element.getEditor();
    mbr = moveControl.getElement().getBoundingClientRect();

    moveControl.getElement().style.top  = (ebr.top - mbr.height - 15) + 'px';
    moveControl.getElement().style.left = (ebr.left + ebr.width / 2 - mbr.width - 2) + 'px';
    edi.getElement().appendChild(moveControl);
  }

  function positionMoveControl()
  {
    var mbr, ebr, edi;
    ebr = element.getElement().getBoundingClientRect();
    edi = element.getEditor();
    mbr = moveControl.getElement().getBoundingClientRect();

    moveControl.getElement().style.top  = (ebr.top - mbr.height - 15) + 'px';
    moveControl.getElement().style.left = (ebr.left + ebr.width / 2 - mbr.width - 2) + 'px';
    edi.getElement().appendChild(moveControl);
  }

  function positionRotateControl()
  {
    var mbr, ebr, edi;
    ebr = element.getElement().getBoundingClientRect();
    edi = element.getEditor();
    mbr = rotateControl.getElement().getBoundingClientRect();

    rotateControl.getElement().style.top  = (ebr.bottom + 15) + 'px';
    rotateControl.getElement().style.left = (ebr.left + ebr.width / 2 - mbr.width - 2) + 'px';
    edi.getElement().appendChild(rotateControl);
  }

  function EFElementManipulator(element)
  {
    EFElement.call(this, element);

    this.config = {
      moveBuffer: 5
    };
  }

  EFElementManipulator.prototype = Object.create(EFElement.prototype);
  EFElementManipulator.prototype.constructor = constructor;

  function setStyle()
  {

  }

  function f01(e)
  {
    var bb = element.getBoundingClientRect();
    var t, b, l, r;
    t = (e.y > bb.top && e.y < bb.top + this.config.moveBuffer);
    b = (e.y < bb.bottom && e.y > bb.bottom - this.config.moveBuffer);
    l = (e.x > bb.left && e.x < bb.left + this.config.moveBuffer);
    r = (e.x < bb.right && e.x > bb.right - this.config.moveBuffer);

    if (t||b||l||r) {
      element.style.cursor = 'pointer';
    } else {
      element.style.cursor = 'default';
    }
  }

  EFElementManipulator.prototype.showControls = function()
  {
    showMoveControl()
  };

  function showMoveControl()
  {
    var x, y, b, c, s;
    s = 4;
    b = this.getElement().getBoundingClientRect();
    x = b.left + b.width / 2 - s / 2;
    y = b.top  + 15;
    c = document.createElement('span');

    c.style.border   = '1px solid #444';
    c.style.display  = 'block';
    c.style.position = 'absolute';
    c.style.top      = y + 'px';
    c.style.left     = x + 'px';
    c.style.width    = s + 'px';
    c.style.height   = s + 'px';

    // TODO tie me in!
    wEditor.element.getElement().appendChild(b);
  }

  return EFElementManipulator;
})();
