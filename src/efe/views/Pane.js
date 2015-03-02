/**
 * View Pane
 *
 * @author: Elizabeth Harper <elliefops@gmail.com>
 * @namespace: EF.v
 */
EF.v.Pane =
  (
    function() {
      function Pane(e)
      {
        EF.c.AppElement.call(this, e);

        this.modal    = false;
        this.position = new EF.lay.Position();
      }

      Pane.prototype = Object.create(EF.c.AppElement.prototype);

      Pane.prototype.update = function() {};
      return Pane;
    }
  )();
