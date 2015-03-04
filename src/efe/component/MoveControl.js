/**
 * Editor Component Movement Control
 *
 * @class     MoveControl
 * @namespace component
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
  EFEditor.component.EditControl.call(this);

  this.addClass('moveControl');
  this.prototype = Object.create(EFEditor.component.EditControl.prototype);

};

