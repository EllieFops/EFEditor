/**
 * Toolbar Button Set
 *
 * @author: Elizabeth Harper <elliefops@gmail.com>
 * @namespace: efe.component
 */
EFEdit.component.ButtonSet =
  (
    function() {
      function ButtonSet() {
        this.buttons = [];
      }

      ButtonSet.prototype.addButton = function(b) {
        if (b instanceof EFEdit.component.ToolbarButton) {
          this.buttons.push(b);
        }
        return this;
      };

      ButtonSet.prototype.getButtons = function() {
        return this.buttons;
      };

      return ButtonSet;
    }
  )();
