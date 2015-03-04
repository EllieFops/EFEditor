/**
 * Element Rotation Control
 *
 * @author: Elizabeth Harper <elliefops@gmail.com>
 * @namespace: efe.component
 */
EFEditor.component.MoveControl =
  (
    function() {
      function MoveControl() {
        EFEditor.component.EditControl.call(this);


        this.addClass('rotControl');
      }

      MoveControl.prototype = Object.create(EFEditor.component.EditControl.prototype);

      MoveControl.prototype.handleDrag = function(e) {
        return e;
      };

      return MoveControl;
    }
  )();
