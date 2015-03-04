/**
 * Block Element
 *
 * @class     BlockElement
 * @namespace element
 * @extends   element.BasicElement
 *
 * @module  EFEditor
 * @since   0.0.1
 * @version 0.0.1
 *
 * @author Elizabeth Harper <elliefops@gmail.com>
 *
 * @constructor
 * @param e {HTMLElement|String}
 */
EFEditor.element.BlockElement = function(e) {

  var self;

  EFEditor.element.Element.call(this, e);

  self = this;


  /**
   * Get position of this element relative to the client
   *
   * @method getClientPosition
   *
   * @returns {{top: Number, bottom: Number, right: Number, left: Number}}
   */
  self.getClientPosition = function() {
    var a = this.element.getBoundingClientRect();
    return {top: a.top, bottom: a.bottom, right: a.right, left: a.left};
  };

  /**
   * Get y position of the top of this element relative to it's parent element.
   *
   * @method offsetTop
   *
   * @returns {Number}
   */
  self.offsetTop = function() {
    if (!this.parent) {
      return self.clientTop();
    }
    return self.clientTop() - self.parent.clientTop();
  };

  /**
   * Get x position of the left side of this element relative to the left side of it's parent.
   *
   * @method offsetLeft
   *
   * @returns {Number}
   */
  self.offsetLeft = function() {
    if (!self.parent) {
      return self.clientLeft();
    }
    return self.clientLeft() - self.parent.clientLeft();
  };

  /**
   * Get x position of the right side of this element relative to the right side of it's parent.
   *
   * @method offsetRight
   *
   * @returns {Number}
   */
  self.offsetRight = function() {
    if (!self.parent) {
      return self.clientRight();
    }
    return self.clientRight() - self.parent.clientRight();
  };

  /**
   * Get y position of the bottom of this element relative to the bottom of it's parent;
   *
   * @method offsetBottom
   *
   * @returns {Number}
   */
  self.offsetBottom = function() {
    if (!self.parent) {
      return self.clientBottom();
    }
    return self.clientBottom() - self.parent.clientBottom();
  };

  /**
   * Get y position of the top of this element relative to the top of the client
   *
   * @method clientTop
   *
   * @returns {Number}
   */
  self.clientTop = function() {
    return self.element.getBoundingClientRect().top;
  };

  /**
   * Get x position of the left of this element relative to the left side of the client
   *
   * @method clientLeft
   *
   * @returns {Number}
   */
  self.clientLeft = function() {
    return self.element.getBoundingClientRect().left;
  };

  /**
   * Get x position of the right side of this element relative to the right side of the client.
   *
   * @method clientRight
   *
   * @returns {Number}
   */
  self.clientRight = function() {
    return self.element.getBoundingClientRect().right;
  };

  /**
   * Get y position of the bottom of this element relative to the bottom of the client
   *
   * @method clientBottom
   *
   * @returns {Number}
   */
  self.clientBottom = function() {
    return self.element.getBoundingClientRect().bottom;
  };
};
