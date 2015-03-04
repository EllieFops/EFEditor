/**
 * Toolbar
 *
 * @author: Elizabeth Harper <elliefops@gmail.com>
 */
EFEdit.v.Toolbar =
  (
    function() {
      function Toolbar() {
        EFEdit.v.Pane.call(this);

        this.buttonSets = [];
      }

      Toolbar.prototype = Object.create(EFEdit.v.Pane.prototype);

      return Toolbar;
    }
  )();
