/**
 * Element Rotation Control
 *
 * @class     EditorElement
 * @namespace component
 * @extends   component.EditControl
 *
 * @module  EFEditor
 * @since   0.0.1
 * @version 0.0.1
 *
 * @author Elizabeth Harper <elliefops@gmail.com>
 *
 * @constructor
 * @param target {EFEdit.element.BasicElement}
 */
EFEdit.component.MoveControl = function(target) {

  var self;

  EFEdit.component.EditControl.call(this, target);
  this.prototype = Object.create(EFEdit.component.EditControl.prototype);

  self = this;

  function init() {
    var e = EFEdit.dom.Event;
    self
      .addClass('rotControl')
      .css('cursor', 'pointer')
      .setAttr('title', 'Rotate Element')
      .addGlobalEventHandler(e.MOUSE_MOVE, handleMouseMove);
  }

  /**
   * Handle Global Mouse Movements
   *
   * If this element is clicked, then this method will translate the mouse movements passed to it into rotation on the
   * element targetted by this control.
   *
   * @method handleMouseMove
   * @private
   *
   * @param e {MouseEvent}
   */
  function handleMouseMove(e) {
    var a, h, r;

    if (!self.clicked) {
      return;
    }

    a = self.css('transform');
    a = parseInt(a.split('(')[1]);

    a += (a < 0) ? 360 : 0;
    a -= (a > 360) ? 360 : 0;

    h = (a < 45 || (a > 135 && a < 225) || a > 315) ? e.movmentX : e.movementY;

    r = Math.round((a+(h/3)*100)) / 100;

    self.css('transform', 'rotate(' + r + 'deg)');
  }

  function handleMouseDown() {
    EFEdit.App.registerMouseWidget('rotate', new EFEdit.component.MouseWidget());
  }


  init();
};

