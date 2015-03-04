/**
 * Toolbar
 *
 * @author: Elizabeth Harper <elliefops@gmail.com>
 * @namespace: EF.v
 */
EFEditor.v.Toolbar =
  (
    function() {
      function Toolbar() {
        EFEditor.v.Pane.call(this);

        this.buttonSets = [];
      }

      Toolbar.prototype = Object.create(EFEditor.v.Pane.prototype);

      return Toolbar;
    }
  )();
