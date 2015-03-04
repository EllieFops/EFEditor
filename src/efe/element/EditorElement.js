/**
 * Editor Element
 *
 * @class     EditorElement
 * @namespace element
 * @extends   element.BlockElement
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
EFEdit.element.EditorElement = function(element) {

  EFEdit.element.BlockElement.call(this, element);
  this.prototype = Object.create(EFEdit.element.BlockElement.prototype);

  var self = this;

  /**
   * Element Position
   *
   * @property position
   *
   * @type {EFEdit.layout.Position}
   */
  self.position = null;

  /**
   * Global Events
   *
   * @property globEvents
   * @private
   *
   * @type {{}}
   */
  var globEvents = {};

  /**
   * Events on this element
   *
   * @property selfEvents
   * @private
   *
   * @type {{}}
   */
  var selfEvents = {};

  function init() {
    var a = self.htmlElement.getBoundingClientRect();
    self.position = new EFEdit.layout.Position(a.left, a.top);
  }

  /**
   * Add Handler for Global Events
   *
   * @method addGlobalEventHandler
   *
   * @param e {string}   Event to listen for.
   * @param h {function} Handler for the listened Event
   *
   * @chainable
   * @returns {EditorElement}
   */
  self.addGlobalEventHandler = function(e, h) {
    globEvents[e] = h;
    return self;
  };

  /**
   * Add Handler for events targeted at this
   *
   * @method addSelfEventHandler
   *
   * @param e {string}   Event to listen for.
   * @param h {function} Handler for the listened event.
   *
   * @chainable
   * @returns {EditorElement}
   */
  self.addSelfEventHandler = function(e, h) {
    selfEvents[e] = h;
    return self;
  };

  /**
   * Move this element
   *
   * NOTE: x & y distances are in pixels, negative numbers move backwards, positive forwards relative to the client's
   *       top left point (0, 0).
   *
   * @method move
   *
   * @param [x=0] {Number} Distance in pixels to move this element on the x axis.
   * @param [y=0] {Number} Distance in pixels to move this element on the y axis.
   * @param [z=0] {Number} Amount to shift this element's z-index value.
   *
   * @chainable
   * @return {EditorElement}
   */
  self.move = function(x, y, z) {
    x = (x) ? self.position.getXPos() + x : 0;
    y = (y) ? self.position.getYPos() + y : 0;
    z = (z) ? self.position.getZPos() + z : 0;
    self.position.setXPos(x);
    self.position.setYPos(y);
    self.position.z += z || 0;
    return self;
  };


  /**
   * Update this element's status
   *
   * @method update
   */
  self.update = function() {
    var s = self.element.style;
    if (self.position.fromTop) {
      s.top = self.position.y + 'px';
    }
    else {
      s.bottom = self.position.y + 'px';
    }
    if (self.position.fromLeft) {
      s.left = self.position.x + 'px';
    }
    else {
      s.right = self.position.x + 'px';
    }
    s.zIndex = self.position.z;
  };

  /**
   * Get a non-live copy of this element's Position
   *
   * @method getPosition
   *
   * @returns {EFEdit.layout.Position}
   */
  self.getPosition = function() {
    return new EFEdit.layout.Position(self.position);
  };

  init();
};
