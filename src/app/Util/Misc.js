EFEditor.Utils.Misc = (function(){
  var self;
  function Misc()
  {
    self = this;
    self.currentBrowser = -1;

    function init()
    {
      if (!!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0) {
        self.currentBrowser = self.Browsers.OPERA;
      } else if (typeof InstallTrigger !== 'undefined') {
        self.currentBrowser = self.Browsers.FIREFOX;
      } else if(Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0) {
        self.currentBrowser = self.Browsers.SAFARI;
      } else if(!!window.chrome) {
        self.currentBrowser = self.Browsers.CHROME;
      } else if (/*@cc_on!@*/false || !!document.documentMode) {
        self.currentBrowser = self.Browsers.IE;
      }
    }

    init();
  }

  Misc.prototype.Browsers = {
    IE: 0,
    SAFARI: 1,
    OPERA: 2,
    CHROME: 3,
    FIREFOX: 4
  };

  Misc.prototype.registerEvent = function(name)
  {
    var event; // The custom event that will be created

    if (document.createEvent) {
      event = document.createEvent("HTMLEvents");
      event.initEvent(name, true, true);
    } else {
      event = document.createEventObject();
      event.eventType = name;
    }

    return event;
  };

  Misc.prototype.hardMergeJSON = function(j1, j2, max, cur)
  {
    var a;
    if (!cur) {cur = 0;}
    for (a in j2) {
      if (j2.hasOwnProperty(a)) {
        if (typeof j2[a] == 'object' && j1[a] && typeof j1[a] == 'object' && (max <= 0 || (max > 0 && cur < max))) {
          j1[a] = Misc.hardMergeJSON(j1[a], j2[a], max, (cur+1));
        } else {
          j1[a] = j2[a];
        }
      }
    }
  };

  return Misc;
})();
