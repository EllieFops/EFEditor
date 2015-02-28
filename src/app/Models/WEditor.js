// Namespace: efe.interface
efe=efe||{};efe.interface=efe.interface||{};

efe.interface.WEditor = (function() {

  var bbCount = 0;
  var bBoxes = {};

  var sizeClicked = false;
  var clickedBB   = null;
  var element     = null;


  function WEditor(e)
  {
    element = e;
    this.selection = null;

    e.getElement().addEventListener(DomEvents.MOUSE_MOVE, bbMouseMoveEvent);
    e.getElement().addEventListener(DomEvents.MOUSE_OUT,  bbMouseOutEvent);
    e.getElement().addEventListener(DomEvents.MOUSE_DOWN, bbMouseDownEvent);
    e.getElement().addEventListener(DomEvents.MOUSE_UP,   bbMouseUpEvent);
  }

  WEditor.prototype.initEvents = function(e)
  {
    var a;
    a = e.getElement();
  };

  /**
   *
   * @param e {MouseEvent}
   */
  function bbMouseMoveEvent(e)
  {
    var b, c, z, a, d;

    if (!sizeClicked) {
      for (a in bBoxes) {
        if (!bBoxes.hasOwnProperty(a)) {continue}
        a = bBoxes[a];
        //noinspection JSCheckFunctionSignatures
        c = a.isInResizeRange(efe.input.EFMouse.getPosition());
        if (c.top || c.bottom || c.left || c.right) {
          b = (b && b.getElement().style.zIndex > a.getElement().style.zIndex) ? b : a;
          d = c;
        }
      }

      if (!b || !d) {
        element.getElement().style.cursor = 'default';
        return;
      }

      z = element.getElement().style;

      if ((d.top && d.left) || (d.bottom && d.right)) {
        z.cursor = "nwse-resize";
      } else if ((d.top && d.right) || (d.bottom && d.left)) {
        z.cursor = "nesw-resize";
      } else if (d.top || d.bottom) {
        z.cursor = 'ns-resize';
      } else if (d.left || d.right) {
        z.cursor = 'ew-resize';
      }
    }

    if (efe.input.EFMouse.isLeftButton()) {bbResizeEvent(e, b)}
  }

  function bbResizeEvent(e, b)
  {
    var el, controlStyle, ie, x, y, elementRect, elementStyle, t;
    if (!clickedBB) {return}
    el = clickedBB.getElement();
    ie = clickedBB.getChildren()[0].getElement();
    elementRect = ie.getBoundingClientRect();
    controlStyle = el.style;
    elementStyle = ie.style;
    x = e.movementX;
    y = e.movementY;

    if (b.t) {
      t = elementRect.height;
      elementStyle.height = (elementRect.height - y) + 'px';
      if (elementRect.height != t) {
        controlStyle.top = (el.offsetTop + y) + 'px';
      }
    } else if ((b.b)) {
      elementStyle.height = (elementRect.height - y) + 'px';
      controlStyle.top    = (el.offsetTop + y) + 'px';
    } else if ((b.t&&b.l)||(b.b&&b.r)) {
      elementStyle.height = (elementRect.height - y) + 'px';
      controlStyle.top    = (el.offsetTop + y) + 'px';
    } else if ((b.t&&b.r)||(b.b&&b.l)) {
      elementStyle.height = (elementRect.height - y) + 'px';
      controlStyle.top    = (el.offsetTop + y) + 'px';
    }
  }

  /**
   *
   * @param e {MouseEvent}
   */
  function bbMouseOutEvent(e)
  {
    var x;
    x = e.fromElement;
    if (!bBoxes[x.id]) {return}
    element.getElement().style.cursor = 'default';
  }

  function bbMouseDownEvent(e)
  {
    if (bBoxes[e.target.id]) {
      clickedBB   = bBoxes[e.target.id];
      sizeClicked = true;
    }
  }

  function bbMouseUpEvent()
  {
    if (sizeClicked) {
      element.getElement().style.cursor = 'default';
    }
    sizeClicked = false;
  }

  WEditor.prototype.getSelection = function()
  {};

  WEditor.prototype.setSelection = function (s)
  {
    this.selection = s;
    App.emitter.emitEvent(EFEvents.SEL_CHANGE, self);
  };

  /**
   *
   * @param e {EFElement}
   * @param p {Position}
   */
  WEditor.prototype.insertElement = function(e, p)
  {
    var boundingBox,
        config,
        element,
        elStyle;

    // Convert to EFElement if not already.
    if (e instanceof HTMLElement) {
      e = DOMHelper.convertDomToEF(e);
    }

    if (!e instanceof EFElement || !p instanceof Position) {
      throw Error('Invalid parameter passed to WEditor.insertElement().');
    }

    boundingBox = new EFBoundingBox(ElementFactory.DIV());
    element = boundingBox.getElement();
    element.classList.add('EFBoundingBox');

    bbCount++;
    element.id = 'bBox_' + bbCount;

    bBoxes[element.id] = boundingBox;

    // noinspection JSCheckFunctionSignatures
    config  = Configuration.getValue('decoration.selectedElement');
    elStyle = element.style;

    elStyle.padding     = (config.padding      || 3) + 'px';
    elStyle.borderWidth = (config.border.width || 1) + 'px';
    elStyle.borderStyle = (config.border.style || 'dotted');
    elStyle.borderColor = (config.border.color || 'red');

    config = config.border.radius;

    if (config.topLeft) {
      elStyle.borderTopLeftRadius = config.topLeft
    }
    if (config.topRight) {
      elStyle.borderTopRightRadius = config.topRight
    }
    if (config.bottomLeft) {
      elStyle.borderBottomLeftRadius = config.bottomLeft
    }
    if (config.bottomRight) {
      elStyle.borderBottomRightRadius = config.bottomRight
    }

    elStyle.position = 'absolute';
    elStyle.left = p.getXPos() + 'px';
    elStyle.top = p.getYPos() + 'px';

    boundingBox.appendChild(e);
    element.appendChild(boundingBox);
  };

  return WEditor;
})();
