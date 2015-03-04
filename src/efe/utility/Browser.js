/**
 * Browser Utilities
 *
 * @author: Elizabeth Harper <elliefops@gmail.com>
 * @namespace: efe.util
 */
EFEditor.u.Browser =
  (
    function() {
      function Browser() {}

      Browser.prototype.getType = function() {
        var browser;
        if (!!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0) {
          browser = EFEditor.dom.Browser.OPERA;
        } else if (typeof InstallTrigger !== 'undefined') {
          browser = EFEditor.dom.Browser.FIREFOX;
        } else if(Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0) {
          browser = EFEditor.dom.Browser.SAFARI;
        } else if(!!window.chrome) {
          browser = EFEditor.dom.Browser.CHROME;
        } else if (/*@cc_on!@*/false || !!document.documentMode) {
          browser = EFEditor.dom.Browser.IE;
        }
        return browser;
      };
      return Browser;
    }
  )();
