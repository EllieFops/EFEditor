/**
 * Toolbar Button
 *
 * @author: Elizabeth Harper <elliefops@gmail.com>
 * @namespace: EF.c
 */

EF.c.ToolbarButton =
  (
    function() {
      /**
       * @param v {string} Text Value
       * @param t {string} Title Value
       *
       * @constructor
       */
      function ToolbarButton(v,t) {
        EF.c.Element.call(this, 'a');

        this.setText(v);
        this.setAttr('title', t);
      }

      ToolbarButton.prototype = Object.create(EF.c.Element.prototype);

      return ToolbarButton;
    }
  )();
