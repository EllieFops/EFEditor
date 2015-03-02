/**
 * Element Rotation Control
 *
 * @author: Elizabeth Harper <elliefops@gmail.com>
 * @namespace: efe.component
 */
EF.c.MoveControl =
  (
    function() {
      function MoveControl() {
        EF.c.EditControl.call(this);


        this.addClass('rotControl');
      }

      MoveControl.prototype = Object.create(EF.c.EditControl.prototype);

      MoveControl.prototype.handleDrag = function(e) {};

      return MoveControl;
    }
  )();
