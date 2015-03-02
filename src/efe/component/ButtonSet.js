/**
 * Toolbar Button Set
 *
 * @author: Elizabeth Harper <elliefops@gmail.com>
 * @namespace: efe.component
 */
EF.c.ButtonSet =
  (
    function() {
      function ButtonSet() {
        this.buttons = [];
      }

      ButtonSet.prototype.addButton = function(b) {
        if (b instanceof EF.c.ToolbarButton) {
          this.buttons.push(b);
        }
        return this
      };

      ButtonSet.prototype.getButtons = function() {return this.buttons};

      return ButtonSet;
    }
  )();
