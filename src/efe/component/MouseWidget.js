/**
 * Mouse Helper Widget
 *
 * A small "tooltip" like element that follows the mouse in certain contexts.
 *
 * @class     MouseWidget
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
EFEdit.component.MouseWidget = function() {

  EFEdit.component.EditControl.call(this);
  this.prototype = Object.create(EFEdit.component.EditControl.prototype);

  var self = this;

  var bufferDistance = 10;

  function init() {
    self.addClass('mouseFollower').css('position', 'absolute').update();
  }

  /**
   * Update this element.
   *
   * @method update
   */
  self.update = function() {
    var M = EFEdit.input.Mouse.getPosition();
    self.css({'left': M.getXPos() + 'px', 'top': M.getYPos() + 'px'});
  }
};
