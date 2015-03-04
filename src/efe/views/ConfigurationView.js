/**
 * Configuration View
 *
 * @author: Elizabeth Harper <elliefops@gmail.com>
 */
EFEdit.v.ConfigurationView =
  (
    function() {
      function ConfigurationView() {
        EFEdit.v.Pane.call(this);

      }

      ConfigurationView.prototype = Object.create(EFEdit.v.Pane.prototype);

      return ConfigurationView;
    }
  )();
