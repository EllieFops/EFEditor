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
 * @param target {EFEditor.element.EditorElement}
 */
EFEditor.component.EditControl = function(target) {

  var self;

  EFEditor.element.EditorElement.call(this, 'div');
  this.prototype = Object.create(EFEditor.element.EditorElement.prototype);

  self         = this;

  /**
   * Edit Control Target
   *
   * @property target
   *
   * @type {EFEditor.element.EditorElement}
   */
  self.target  = target;

  /**
   * Is this element clicked
   *
   * @property clicked
   *
   * @type {boolean}
   */
  self.clicked = false;

  /**
   * Distance to keep from target element
   *
   * @property distance
   *
   * @type {number}
   */
  self.distance = 5;

  self.addGlobalEventHandler(EFEditor.d.Event.MOUSE_UP, self.handleUnclick);
  self.addSelfEventHandler(EFEditor.d.Event.MOUSE_DOWN, self.handleSelfClick);

  /**
   * Initialize
   *
   * @method init
   * @private
   */
  function init() {
    self.css('position', 'absolute');
  }

  /**
   * Handle Clicks on this element.
   *
   * @method handleSelfClick
   */
  self.handleSelfClick = function() {
    self.clicked = true;
  };

  /**
   * Handle Global MouseUp event.
   *
   * @method handleUnclick
   */
  self.handleUnclick = function() {
    self.clicked = false;
  };

  init();
};
