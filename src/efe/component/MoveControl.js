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
EFEditor.component.MoveControl = function() {

  var self;

  EFEditor.component.EditControl.call(this);
  this.prototype = Object.create(EFEditor.component.EditControl.prototype);

  self = this;

  function init() {
    self.addClass('moveControl');
    self.css('cursor', 'move');

    self.addGlobalEventHandler(EFEditor.d.Event.MOUSE_MOVE, self.handleMouseMove);
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
    self.position.set
  };

  init();
};

