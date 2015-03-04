/**
 * Toolbar Button Set
 *
 * @author: Elizabeth Harper <elliefops@gmail.com>
 * @namespace: efe.component
 */
EFEditor.component.ButtonSet =
  (
    function() {
      function ButtonSet() {
        this.buttons = [];
      }

      ButtonSet.prototype.addButton = function(b) {
        if (b instanceof EFEditor.component.ToolbarButton) {
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
