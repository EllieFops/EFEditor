/**
 * Element Edit Control
 *
 * @class     EditControl
 * @namespace component
 * @extends   element.EditorElement
 *
 * @module  EFEditor
 * @since   0.0.1
 * @version 0.0.1
 *
 * @author Elizabeth Harper <elliefops@gmail.com>
 *
 * @constructor
 * @param target {HTMLElement|String}
 */
EFEditor.component.EditControl = function(target) {

  var self;

  EFEditor.element.EditorElement.call(this, 'div');
  this.prototype = Object.create(EFEditor.element.EditorElement.prototype);

  self         = this;
  self.target  = target;
  self.clicked = false;

  self.addClass('posAbs');
  self.addGlobalEventHandler(EFEditor.d.Event.MOUSE_UP, self.handleUnclick);
  self.addSelfEventHandler(EFEditor.d.Event.MOUSE_DOWN, self.handleThisClick);


  self.handleThisClick = function() {
    self.clicked = true;
  };

  self.handleUnclick = function() {
    self.clicked = false;
  };

  self.handleDrop = function() {
    return false;
  };

  self.update = function() {
    // this.target.offsetTop //TODO
  };
};
