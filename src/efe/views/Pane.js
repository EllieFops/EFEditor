/**
 * View Pane
 *
 * @author: Elizabeth Harper <elliefops@gmail.com>
 */
EFEdit.v.Pane =
  (
    function() {
      function Pane(e)
      {
        EFEdit.component.AppElement.call(this, e);

        this.modal    = false;
        this.position = new EFEdit.layout.Position();
      }

      Pane.prototype = Object.create(EFEdit.component.AppElement.prototype);

      Pane.prototype.update = function() {};
      return Pane;
    }
  )();
