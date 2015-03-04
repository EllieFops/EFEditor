/**
 * EFEditor Editor Pane
 *
 * @class     Editor
 * @namespace component
 * @extends   component.AppElement
 *
 * @module  EFEditor
 * @since   0.0.1
 * @version 0.0.1
 *
 * @author Elizabeth Harper <elliefops@gmail.com>
 *
 * @constructor
 */
EFEdit.component.Editor = function() {

  var self;

  EFEdit.component.AppElement.call(this, 'div');
  this.prototype = Object.create(EFEdit.component.AppElement.prototype);

  self = this;

  /**
   * Register App Element
   *
   * @param element {UserElement}
   */
  self.registerAppElement = function(element) {
    if (element instanceof EFEdit.element.UserElement) {
      self.
    }
    return self;
  };
};
