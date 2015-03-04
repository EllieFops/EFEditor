/**
 * Toolbar Button
 *
 * @author: Elizabeth Harper <elliefops@gmail.com>
 * @namespace: EF.c
 */

EFEditor.component.ToolbarButton =
  (
    function() {
      /**
       * @param v {string} Text Value
       * @param t {string} Title Value
       *
       * @constructor
       */
      function ToolbarButton(v,t) {
        EFEditor.component.Element.call(this, 'a');

        this.setText(v);
        this.setAttr('title', t);
      }

      ToolbarButton.prototype = Object.create(EFEditor.component.Element.prototype);

      return ToolbarButton;
    }
  )();
