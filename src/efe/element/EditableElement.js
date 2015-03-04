/**
 * Editable Element
 *
 * @class     EditableElement
 * @namespace element
 * @extends   element.UserElement
 *
 * @module  EFEditor
 * @since   0.0.1
 * @version 0.0.1
 *
 * @author Elizabeth Harper <elliefops@gmail.com>
 *
 * @constructor
 * @param element {HTMLElement|String}
 */
EFEdit.element.EditableElement = function(element) {

  var self;

  EFEdit.element.UserElement.call(this, element);
  this.prototype = Object.create(EFEdit.element.UserElement.prototype);

  self = this;

  /**
   * Initialize
   *
   * @method init
   * @private
   */
  function init() {
    self.setAttr('contentEditable', 'true');
  }

  init();
};
