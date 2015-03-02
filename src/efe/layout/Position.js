/**
 * Coordinate Position
 *
 * @author: Elizabeth Harper <elliefops@gmail.com>
 * @namespace: efe.components
 */
EF.lay.Position = (
  function() {

    /**
     * Coordinate Position
     *
     * @param x
     * @param y
     * @param z
     *
     * @constructor
     */
    function Position(x, y, z)
    {
      this.fromTop = true;
      this.fromLeft = true;

      this.xPos = x || 0;
      this.yPos = y || 0;
      this.zPos = z || 0;
    }

    Position.prototype.getXPos = function() {return this.xPos};
    Position.prototype.getYPos = function() {return this.yPos};
    Position.prototype.getZPos = function() {return this.zPos};

    Position.prototype.setXPos = function(x) {this.xPos = x; return self};
    Position.prototype.setYPos = function(y) {this.yPos = y; return self};
    Position.prototype.setZPos = function(z) {this.zPos = z; return self};

    return Position;
  }
)();
