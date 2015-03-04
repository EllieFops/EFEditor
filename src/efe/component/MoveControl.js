/**
 * Editor Component Movement Control
 *
 * @class     MoveControl
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
 */
EFEdit.component.MoveControl = function() {

  var self;

  EFEdit.component.EditControl.call(this);
  this.prototype = Object.create(EFEdit.component.EditControl.prototype);

  self = this;

  function init() {
    self.addClass('moveControl');
    self.css('cursor', 'move');

    self.addGlobalEventHandler(EFEdit.dom.Event.MOUSE_MOVE, self.handleMouseMove);
  }

  self.update = function() {
    var a, b;
    a = self.target.getHTMLElement().getBoundingClientRect();
    b = self.htmlElement.getBoundingClientRect();

    self.css({
      'top': a.top - b.height - self.distance,
      'left': a.left + (a.width/2) - (b.width/2)
    });
  };

  /**
   * Handle Mouse Movements
   *
   * @method handleMouseMove
   *
   * @param e {MouseEvent}
   */
  self.handleMouseMove = function(e) {

    if (!self.clicked) {
      return;
    }

    this.target.move(e.movementX, e.movementY);
  };

  init();
};

