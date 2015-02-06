EFEditor.Controllers.WPane = (function(){
  var self;
  function WPane(node)
  {
    self = this;
    self.prototype = EFEditor.Controllers.Base;

    function init()
    {
      self.eventTypes.INIT_BEFORE  = 'Pre-Initialization';
      self.eventTypes.INIT_AFTER   = 'Post Initialization';
      self.eventTypes.PARSE_BEFORE = 'Pre-Parse';
      self.eventTypes.PARSE_AFTER  = 'Post Parse';
      self.eventTypes.WPANE_READY  = 'WPane Ready';
    }
    init();
  }


})();
