/**
 *
 * @param x
 * @param y
 * @param z
 * @constructor
 */
var Position = function(x, y, z)
{
  var self, xPos, yPos, zPos;
  self = this;
  xPos = x;
  yPos = y;
  zPos = z;

  Position.prototype.getXPos = function() {return xPos};
  Position.prototype.getYPos = function() {return yPos};
  Position.prototype.getZPos = function() {return zPos};

  Position.prototype.setXPos = function(x) {xPos = x; return self};
  Position.prototype.setYPos = function(y) {yPos = y; return self};
  Position.prototype.setZPos = function(z) {zPos = z; return self};
};
