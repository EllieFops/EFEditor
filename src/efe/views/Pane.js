/**
 * View Pane
 *
 * @author: Elizabeth Harper <elliefops@gmail.com>
 * @namespace: EF.v
 */
EFEditor.v.Pane =
  (
    function() {
      function Pane(e)
      {
        EFEditor.component.AppElement.call(this, e);

        this.modal    = false;
        this.position = new EFEditor.lay.Position();
      }

      Pane.prototype = Object.create(EFEditor.component.AppElement.prototype);

      Pane.prototype.update = function() {};
      return Pane;
    }
  )();
