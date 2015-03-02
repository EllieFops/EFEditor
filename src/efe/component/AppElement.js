/**
 * Application Element
 *
 * @author: Elizabeth Harper <elliefops@gmail.com>
 * @namespace: efe.component
 */
EF.c.AppElement =
  (
    function() {

      function AppElement(e) {
        EF.c.Element.call(this, e);
      }

      AppElement.prototype = Object.create(EF.c.Element.prototype);

      return AppElement;
    }
  )();
