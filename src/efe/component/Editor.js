/**
 * EFEditor Editor Pane
 *
 * @class     Editor
 * @namespace component
 * @extends   Element
 *
 * @module  EFEditor
 * @since   0.0.1
 * @version 0.0.1
 *
 * @author Elizabeth Harper <elliefops@gmail.com>
 *
 * @constructor
 */
EFEditor.component.Editor = function() {

  var self;

  EFEditor.component.Element.call(this, 'div');
  this.prototype = Object.create(EFEditor.component.Element.prototype);

  self = this;

};
