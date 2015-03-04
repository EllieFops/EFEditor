/**
 * Application Element
 *
 * @author: Elizabeth Harper <elliefops@gmail.com>
 * @namespace: efe.component
 */
EFEditor.component.AppElement =
  (
    function() {

      function AppElement(e) {
        EFEditor.component.Element.call(this, e);
      }

      AppElement.prototype = Object.create(EFEditor.component.Element.prototype);

      return AppElement;
    }
  )();
