// Namespace: efe.interface
if(typeof efe == "undefined") {
  efe = {interface:{}};
} else if(typeof efe.interface == "undefined") {
  efe.interface = {};
}

efe.interface.WEditor = (function() {

  var bbCount = 0;
  var bBoxes = {};

  var sizeClicked = false;
  var clickedBB   = null;
  var element     = null;

  var currentlyOver;
  var d;


  function WEditor(e)
  {
    element = e;
    this.selection = null;

    e.getElement().addEventListener(DOMEvents.MOUSE_MOVE, bbMouseMoveEvent);
    e.getElement().addEventListener(DOMEvents.MOUSE_OUT,  bbMouseOutEvent);
    e.getElement().addEventListener(DOMEvents.MOUSE_DOWN, bbMouseDownEvent);
    e.getElement().addEventListener(DOMEvents.MOUSE_UP,   bbMouseUpEvent);
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
    var b, c, z, a;

    if (sizeClicked) {
      sizeClicked = efe.input.EFMouse.isLeftButton();
    }

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

      currentlyOver = b;
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

    if (efe.input.EFMouse.isLeftButton()) {bbResizeEvent(e)}
  }

  function bbResizeEvent(e)
  {
    var el, controlStyle, ie, x, y, elementRect, elementStyle, controlRect, editorRect;

    if (!clickedBB) {return}
    el = clickedBB.getElement();
    ie = clickedBB.getChildren()[0].getElement();
    editorRect  = element.getElement().getBoundingClientRect();
    elementRect = ie.getBoundingClientRect();
    controlRect = el.getBoundingClientRect();
    controlStyle = el.style;
    elementStyle = ie.style;
    x = e.movementX || e.mozMovementX;
    y = e.movementY || e.mozMovementY;

    if (d.top && controlRect.top >= editorRect.top) {
      if ((controlRect.top + y) < editorRect.top) {
        y = 0 - ((controlRect.top - editorRect.top));
      }
      elementStyle.height = (elementRect.height - y) + 'px';
      if (controlStyle.top != "auto") {
        controlStyle.bottom = (editorRect.height - (controlRect.bottom - editorRect.top)) + 'px';
        controlStyle.top    = 'auto';
      }
    } else if ((d.bottom && controlRect.bottom <= editorRect.bottom)) {
      if ((controlRect.bottom + y) > editorRect.bottom) {
        y = ((controlRect.bottom - editorRect.bottom));
      }
      elementStyle.height = (elementRect.height + y) + 'px';
      if (controlStyle.bottom != "auto") {
        controlStyle.bottom = 'auto';
        controlStyle.top    = (controlRect.top - editorRect.top) + 'px';
      }
    }

    if (d.left) {
      if ((controlRect.left + x) < editorRect.left) {
        x = 0 - ((controlRect.left - editorRect.left));
      }
      elementStyle.width = (elementRect.width - x) + 'px';
      if (controlStyle.left != "auto") {
        controlStyle.right = (editorRect.width - (controlRect.right - editorRect.left)) + 'px';
        controlStyle.left    = 'auto';
      }
    } else if (d.right) {
      if ((controlRect.right + x) > editorRect.right) {
        x = ((controlRect.right - editorRect.right));
      }
      elementStyle.width = (elementRect.width + x) + 'px';
      if (controlStyle.right != "auto") {
        controlStyle.right = 'auto';
        controlStyle.left    = (controlRect.left - editorRect.left) + 'px';
      }
    }

  }

  /**
   *
   * @param e {MouseEvent}
   */
  function bbMouseOutEvent(e)
  {
    var x;
    x = e.fromElement || e.originalTarget;
    if (!bBoxes[x.id]) {return}
    element.getElement().style.cursor = 'default';
  }

  function bbMouseDownEvent(e)
  {
    clickedBB   = currentlyOver;
    sizeClicked = true;
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
        edement,
        elStyle;

    // Convert to EFElement if not already.
    if (e instanceof HTMLElement) {
      e = DOMHelper.convertDomToEF(e);
    }

    if (!e instanceof EFElement || !p instanceof Position) {
      throw Error('Invalid parameter passed to WEditor.insertElement().');
    }

    boundingBox = new EFBoundingBox(ElementFactory.DIV());
    edement = boundingBox.getElement();
    edement.classList.add('EFBoundingBox');

    bbCount++;
    edement.id = 'bBox_' + bbCount;

    bBoxes[edement.id] = boundingBox;

    // noinspection JSCheckFunctionSignatures
    config  = Configuration.getValue('decoration.selectedElement');
    elStyle = edement.style;

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
