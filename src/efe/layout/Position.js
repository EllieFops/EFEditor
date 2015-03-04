/**
 * Position
 *
 * @class     Position
 * @namespace layout
 *
 * @module  EFEditor
 * @since   0.0.1
 * @version 0.0.1
 *
 * @author Elizabeth Harper <elliefops@gmail.com>
 *
 * @constructor
 * @param [x=0] {int|Position}
 * @param [y=0] {int}
 * @param [z=0] {int}
 */
EFEdit.layout.Position = function(x, y, z) {
  var self = this;

  /**
   * Is this element positioned relative to the top of the client
   *
   * @property fromTop
   *
   * @type {boolean}
   */
  self.fromTop = true;

  /**
   * From Left
   *
   * Whether or not this element is positioned relative to the left side of the client.
   *
   * @property fromLeft
   *
   * @type {boolean}
   */
  self.fromLeft = true;

  /**
   * X Position
   *
   * @property xPos
   * @private
   *
   * @type {int}
   */
  var xPos;

  /**
   * Y Position
   *
   * @property yPos
   * @private
   *
   * @type {int}
   */
  var yPos;

  /**
   * Z Position
   *
   * @property zPos
   * @private
   *
   * @type {int}
   */
  var zPos;

  /**
   * Initialize Position
   *
   * @method init
   * @private
   */
  function init() {

    if (x instanceof EFEdit.layout.Position) {
      xPos = x.getXPos();
      yPos = x.getYPos();
      zPos = x.getZPos();
    } else {
      xPos = x || 0;
      yPos = y || 0;
      zPos = z || 0;
    }
  }

  init();


  /**
   * Get X Position
   *
   * @method getXPos
   *
   * @returns {int}
   */
  self.getXPos = function() {
    return xPos;
  };

  /**
   * Get Y Position
   *
   * @method getYPos
   *
   * @returns {int}
   */
  self.getYPos = function() {
    return yPos;
  };

  /**
   * Get Z Position
   *
   * @method getZPos
   *
   * @returns {int}
   */
  self.getZPos = function() {
    return zPos;
  };

  /**
   * Set X Position
   *
   * @method setXPos
   *
   * @chainable
   * @return {Position}
   */
  self.setXPos = function(x) {
    xPos = x;
    return self;
  };

  /**
   * Set Y Position
   *
   * @method setYPos
   *
   * @chainable
   * @return {Position}
   */
  self.setYPos = function(y) {
    yPos = y;
    return self;
  };

  /**
   * Set Z Position
   *
   * @method setZPos
   *
   * @chainable
   * @return {Position}
   */
  self.setZPos = function(z) {
    zPos = z;
    return self;
  };
};
