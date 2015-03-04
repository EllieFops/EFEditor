/**
 * Configuration View
 *
 * @author: Elizabeth Harper <elliefops@gmail.com>
 * @namespace: EF.v
 */
EFEditor.v.ConfigurationView =
  (
    function() {
      function ConfigurationView() {
        EFEditor.v.Pane.call(this);

      }

      ConfigurationView.prototype = Object.create(EFEditor.v.Pane.prototype);

      return ConfigurationView;
    }
  )();
