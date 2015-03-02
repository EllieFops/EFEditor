/**
 * Toolbar
 *
 * @author: Elizabeth Harper <elliefops@gmail.com>
 * @namespace: EF.v
 */
EF.v.Toolbar =
  (
    function() {
      function Toolbar() {
        EF.v.Pane.call(this);

        this.buttonSets = [];
      }

      Toolbar.prototype = Object.create(EF.v.Pane.prototype);

      return Toolbar;
    }
  )();
