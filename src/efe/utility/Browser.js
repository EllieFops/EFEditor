/**
 * Browser Utilities
 *
 * @author: Elizabeth Harper <elliefops@gmail.com>
 * @namespace: efe.util
 */
EFEdit.utility.Browser =
  (
    function() {
      function Browser() {}

      Browser.prototype.getType = function() {
        var browser;
        if (!!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0) {
          browser = EFEdit.dom.Browser.OPERA;
        } else if (typeof InstallTrigger !== 'undefined') {
          browser = EFEdit.dom.Browser.FIREFOX;
        } else if(Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0) {
          browser = EFEdit.dom.Browser.SAFARI;
        } else if(!!window.chrome) {
          browser = EFEdit.dom.Browser.CHROME;
        } else if (/*@cc_on!@*/false || !!document.documentMode) {
          browser = EFEdit.dom.Browser.IE;
        }
        return browser;
      };
      return Browser;
    }
  )();
