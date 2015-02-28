var effectDuration = 200;

// ShiftList
(function() {
  var $shiftLists = $('.shiftList').first();
  var $editor = $('#editorContent');
  var con = new Container($editor[0]);
  var dragContent = null;
  //$shiftLists.find('li').each(shiftListAttach);

  function init()
  {
    initFirstStyle();
    initHandlers();
  }

  function initFirstStyle()
  {
    $shiftLists.find('ul ul').hide().each(function(k, v) {
      var $this, a, b, c;
      $this = $(v);
      b = $this.parents('.shiftList').first().innerWidth();
      a = $this.parentsUntil('.shiftList', 'ul').length;
      c = b-(31*a);
      $this.width(c + 'px');
    });
  }

  function initHandlers()
  {
    $shiftLists.on('click', '.group', function() {
      var $this, $par, c;
      $this = $(this);
      c = $this.hasClass('selled');
      $par  = $this.parents('ul').first();
      $par.find('.group.selled')
        .toggleClass('icon-circle-left')
        .toggleClass('icon-circle-right')
        .removeClass('selled')
        .siblings('ul')
        .hide('slide', {direction: 'right'}, effectDuration);
      if (!c) {
        $this
          .toggleClass('icon-circle-left')
          .toggleClass('icon-circle-right')
          .toggleClass('selled')
          .siblings('ul')
          .show('slide', {direction: 'right'}, effectDuration);
      }
    });

    $shiftLists
      .find('.insert')
      .on('dragstart', function(e) {
        var oe, of;
        oe = e.originalEvent;
        of = $(this).offset();
        dragContent = new NewDrag(new Position(of.x, of.y), new Position(oe.offsetX, oe.offsetY), this);
      });

    $editor
      .on('dragover', function(e) {return false;})
      .on('drop', function(e) {
        dragContent.drop(e);
        dragContent = null;
      });
  }

  function reset($ul)
  {}

  function toggle()
  {
    var $this = $(this);
    var $par  = $this.parent();
    $par.toggleClass('subbed', 300);
    $this.toggleClass('selled');
    $this.children('ul').first().toggle();
  }

  function shiftListAttach(k, v)
  {
    var $v = $(v);
    k = $v.children('ul');
    var c = k.length;
    if (c > 0) {
      $v.on('click', toggle);
      k.each(function(k, v) {
        var $v = $(v);
        $v.hide();
        $v.children('li').each(shiftListAttach);
      });
    }
  }
  init();
})();

var wEditor;
(function() {
  var app      = new Application();
  var $toolbar = $('#toolbar');
  var $wPane   = $('#wPane');
  var $sPane   = $('#sPane');
  var $pPane   = $('#pPane');
  var $paneSet = $('#paneSet');
  var $tPane   = $('#tPane');
  var $window  = $(window);
  var $tabs    = $('#paneTabs').find('span');
  wEditor  = new WEditor(
    new EFElement(
      document.getElementById('editorContent')
    )
  );

  $(document).on('mouseup', function(e) {
    if ($(e.target).closest($toolbar).length < 1) {
      $toolbar.find('.open.group-title').click()
    }
  });
  $toolbar.on('selectstart', function(e) {e.stopPropagation(); return false;});
  $toolbar.on('click', '.icon-table2', function(e) {
    var tab;
    tab = new TableSelection();
    tab.setXPos(e.originalEvent.x);
    tab.setYPos(e.originalEvent.y);
    tab.show();
  });

  // Setup Screen
  (function() {
    var $paneTabs = $('paneTabs');
    $sPane.hide();
    $pPane.hide();

    setSizes();
    $window.resize(setSizes);

    $tabs.each(function(i, e){
      e = $(e);
      e.on('click', paneTabClick);
      if(e.data('tab') == 'wPane') {
        e.addClass('selTab')
      }
    });

    function setSizes()
    {
      var bodyHeight = $window.height() - $toolbar.outerHeight();
      var paneHeight = bodyHeight - $paneTabs.outerHeight();

      $('#editorBody').height(bodyHeight);
      $wPane.height(paneHeight);
      $sPane.height(paneHeight);
      $pPane.height(paneHeight);
    }
  })();

  function paneTabClick() {
    var $this = $(this);
    $tabs.removeClass('selTab');
    $this.addClass('selTab');
    $wPane.hide();
    $sPane.hide();
    $pPane.hide();
    $('#' + $this.data('tab')).show();
  }
  $('.group-title')
    .on('click', slideMenu)
    .siblings()
    .css('display', 'none');
  //$toolbar.on('click', 'ul ul li', function(){$(this).parents('ul').siblings('.group-title').click()});

  function slideMenu()
  {
    var a, b, c, $this;
    $this = $(this);
    c = ($this.parents('.shiftList').length < 1);
    a = (c) ? 'icon-circle-down' : 'icon-circle-right';
    b = (c) ? 'icon-circle-up' : 'icon-circle-left';
    $this.toggleClass(a).toggleClass(b).siblings().slideToggle(200);
    if (!$this.hasClass('open')) {
      $this.closest('ul').find('.open.group-title').click();
    }
    $this.toggleClass('open');
  }
})();
