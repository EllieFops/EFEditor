/**
 * Element Movement Control
 *
 * @author: Elizabeth Harper <elliefops@gmail.com>
 * @namespace: EF.c
 */
EF.c.MoveControl =
  (
    function() {
      function MoveControl() {
        EF.c.EditControl.call(this);

        this.addClass('moveControl');
      }

      MoveControl.prototype = Object.create(EF.c.EditControl.prototype);
      return MoveControl;
    }
  )();
