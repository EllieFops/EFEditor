/**
 * Application Level Element
 *
 * @class     AppElement
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
 * @param element {HTMLElement|String}
 */
EFEdit.component.AppElement = function(element) {

  EFEdit.element.EditorElement.call(this, element);
  this.prototype = Object.create(EFEdit.element.EditorElement.prototype);

  var self = this;

  /**
   * Sub Elements in this App Element
   *
   * @property subElements
   *
   * @type {Array}
   */
  self.subElements = [];

  /**
   * Add Element
   *
   * @method addElement
   *
   * @param element {EFEdit.element.EditorElement}
   *
   * @chainable
   * @return AppElement
   */
  self.addElement = function(element) {
    if (element instanceof EFEdit.element.EditorElement) {
      self.subElements.push(element);
    }
    return self;
  };

  /**
   * Update
   *
   * @method update
   */
  self.update = function() {
    var a;
    for (a = 0; self.subElements.length; a++) {
      self.subElements[a].update();
    }
  };
};
