/**
 * Configuration View
 *
 * @author: Elizabeth Harper <elliefops@gmail.com>
 * @namespace: EF.v
 */
EF.v.ConfigurationView =
  (
    function() {
      function ConfigurationView() {
        EF.v.Pane.call(this);

      }

      ConfigurationView.prototype = Object.create(EF.v.Pane.prototype);

      return ConfigurationView;
    }
  )();
