var WEditor = (function(){
  var self;
  function WEditor(element)
  {
    self = this;
    self.element = element;
    self.selection = null;
  }

  WEditor.prototype.getSelection = function()
  {};

  WEditor.prototype.setSelection = function (s)
  {
    self.selection = s;
    App.emitter.emitEvent(EFEvents.SEL_CHANGE, self);
  };
})();
