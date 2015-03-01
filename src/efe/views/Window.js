/**
 * View Pane
 *
 * @author: Elizabeth Harper <elliefops@gmail.com>
 * @namespace: efe.view
 */
if (!efe) {var efe = {};}
if (!efe.view) {efe.view = {};}

efe.view.Pane =
  (
    function() {
      function Pane(e)
      {
        this.modal    = false;
        this.position = new efe.layout.Position();
        this.element  = e;
      }

      Pane.prototype.update = function() {};
      return Pane;
    }
  )();
