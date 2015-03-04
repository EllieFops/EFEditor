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
 * @param target {EFEdit.element.EditorElement}
 */
EFEdit.component.EditControl = function(target) {

  var self;

  EFEdit.element.EditorElement.call(this, 'div');
  this.prototype = Object.create(EFEdit.element.EditorElement.prototype);

  self         = this;

  /**
   * Edit Control Target
   *
   * @property target
   *
   * @type {EFEdit.element.EditorElement}
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

  /**
   * Initialize
   *
   * @method init
   * @private
   */
  function init() {
    var e = EFEdit.dom.Event;
    self.addGlobalEventHandler(e.MOUSE_UP, handleUnclick);
    self.addSelfEventHandler(e.MOUSE_DOWN, handleSelfClick);
    self.css('position', 'absolute');
  }

  /**
   * Return whether or not this element is currently 'clicked'
   *
   * @method isClicked
   *
   * @returns {boolean}
   */
  self.isClicked = function() {
    return self.clicked;
  };

  /**
   * Handle Clicks on this element.
   *
   * @method handleSelfClick
   * @private
   */
  function handleSelfClick() {
    self.clicked = true;
  }

  /**
   * Handle Global MouseUp event.
   *
   * @method handleUnclick
   * @private
   */
  function handleUnclick() {
    self.clicked = false;
  }

  init();
};
