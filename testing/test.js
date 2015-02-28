var Application = (function() {

  var escapable;

  function Application()
  {
    escapable     = [];

  }

  Application.prototype.getMousePosition = function() {return mousePosition;};

  return Application;
})();

var DroppableElements = {
  'DIV': true,
  'P':   true,
  'TD':  true,
  'TH':  true
};

var DragObject = (function() {
  var self;

  function DragObject(x, y, obj)
  {
    self = this;
    self.x = x;
    self.y = y;
    self.obj = obj;
  }

  return DragObject;
})();

var Container = (function() {
  var self;

  function Container(el)
  {
    self = this;
    self.element = $(el);
  }

  Container.prototype.addObject = function(o)
  {
    var el;
    if (!o instanceof DragObject) {return false;}
    $el = $('<span class="dropElement dataField" draggable="true">');
    $el.data('source', o.obj.source)
      .data('type', o.obj.type)
      .css({
        'position': 'absolute',
        'top': o.y,
        'left': o.x
      })
      .text(o.obj.text);

    self.element.append($el);
  };

  return Container;
})();

var Drag = (function() {

  var self,
    startPosition,
    mousePosition,
    dragElement;

  function Drag(startPos, mousePos, targetEl)
  {
    self = this;
    startPosition = startPos;
    mousePosition = mousePos;
    dragElement   = $(targetEl);
  }

  Drag.prototype.getStartPosition = function() {return startPosition};

  Drag.prototype.getMousePosition = function() {return mousePosition};

  Drag.prototype.getDragElement   = function() {return dragElement};

  Drag.prototype.drop = function(p, e)
  {
    var c, i, n, x, y, z;

    n = 0;
    x = p.getXPos() - mousePosition.getXPos();
    y = p.getYPos() - mousePosition.getYPos();
    z = p.getZPos();

    if (z) {
      c = e.childNodes.length;

      for (i = 0; i < c; i++) {
        if ((' ' + e.childNodes[i].className + ' ').indexOf(' edDropped ') > -1) {
          n++;
        }
      }
    }

    dragElement.style.top      = y;
    dragElement.style.left     = x;
    dragElement.style.position = 'absolute';
    dragElement.style.zIndex   = z | 1001+n;

    e.appendChild(dragElement)
  };

  Drag.prototype.getPositionInParent = function(e, p)
  {
    var a, b;
    a = e.offset();
    b = p.offset();
    return {
      x: a.left - b.left,
      y: a.top - b.top
    };
  };

  Drag.prototype.getElementBuffers = function($e)
  {
    return {
      x: parseInt(parseInt($e.css('margin-left'))+parseInt($e.css('padding-left'))+parseInt($e.css('border-left-width'))),
      y: parseInt(parseInt($e.css('margin-top'))+parseInt($e.css('padding-top'))+parseInt($e.css('border-top-width')))
    }
  };

  return Drag;
})();

var NewDrag = (function() {

  var self;

  function NewDrag(start, mouse, target)
  {
    self            = this;
    self.prototype = new Drag(start, mouse, target);
  }

  NewDrag.prototype.drop = function(event)
  {
    var newElement,
        originalEvent,
        originalElement,
        mousePosition,
        dropElement,
        tempElement,
        tempPosition,
        nodeCount,
        indexCount,
        buffers,
        i,
        position;

    position        = new Position();
    originalElement = self.prototype.getDragElement();
    newElement      = originalElement.clone();
    originalEvent   = event.originalEvent;
    mousePosition   = self.prototype.getMousePosition();
    dropElement     = $(originalEvent.target);
    buffers         = NewDrag.prototype.getElementBuffers(originalElement);

    if (DroppableElements[originalEvent.target.nodeName]) {

      position.setXPos((originalEvent.layerX - mousePosition.getXPos()) + buffers.x);
      position.setYPos((originalEvent.layerY - mousePosition.getYPos()) + buffers.y);

    } else {

      dropElement.parentsUntil('#editorContent').each(function(k,v){
        if (DroppableElements[v.nodeName]) {
          tempElement = $(v);
          return false;
        }
      });

      if (!tempElement) {
        tempElement = $('#editorContent');
      }

      tempPosition = NewDrag.prototype.getPositionInParent(dropElement, tempElement);
      dropElement  = tempElement;

      position.setXPos((tempPosition.x - mousePosition.getXPos()) + buffers.x);
      position.setYPos((tempPosition.y - mousePosition.getYPos()) + buffers.y);

    }

    nodeCount = dropElement.children().length;
    indexCount = 0;

    for (i = 0; i < nodeCount; i++) {
      if ((' ' + dropElement.children()[i].className + ' ').indexOf(' edDropped ') > -1) {
        indexCount++;
      }
    }

    position.setZPos(1001+indexCount);
    newElement.addClass('edDropped');

    buffers = NewDrag.prototype.getElementBuffers(newElement);

    newElement.css({
      'top':       position.getYPos() - buffers.y,
      'left':      position.getYPos() - buffers.x,
      'z-index':   position.getZPos(),
      'position': 'absolute'
    });
    dropElement.append(newElement);
  };

  return NewDrag;
})();

var TableSelection = (function(){

  var element;
  var table;
  var span;
  var callback;
  var mouse;
  var counts;

  function TableSelection()
  {
    if (counts) {
      resetAll();
    } else {
      init();
    }
  }

  function init() {mouse = {x: 0, y: 0}; counts  = {cols: 2, rows: 2}; create();}
  function resetAll() {element.remove(); init();}
  function resetElement() {element.remove(); create();}

  function create() {

    var $tr, $td;

    element = $('<div id="tableSizeSelector">');
    span    = $('<span>1x1</span>');
    table   = $('<table class="selTable">');
    $tr     = $('<tr>');
    $td     = $('<td class="selCell">');
    $tr.append($td.clone()).append($td);
    table.append($tr.clone()).append($tr);
    span.css({'display': 'block', 'text-align': 'center'});
    element.append(table);
    element.append(span);

    element
      .on('mouseover', function(e) {
        var a, rc;
        a = element.offset();
        mouse.x = e.originalEvent.clientX - a.x;
        mouse.y = e.originalEvent.clientY - a.y;
      })
      .on('mouseover', 'tr:last-child', function(e) {
        var a;
        a = $(this).clone();
        table.append(a);
      })
      .on('mouseover', 'td:last-child', function(e) {
        table.find('tr').each(function(k, v) {
          $(v).append('<td class="selCell"></td>');
        });
      })
      .on('mousemove', 'td', function(e) {
        updateCounts();
      })
      .on('mouseover', 'td:not(:nth-last-child(2)):not(:last-child)', function(e) {
        table.find('tr').each(function(k, v) {
          $(v).children().last().remove();
        });
      })
      .on('mouseover', 'tr:not(:nth-last-child(2)):not(:last-child)' , function() {
        table.find('tr').last().remove();
      })
      .on('click', function(){new TablePlacer(counts); element.hide(); resetElement();})
      .css({
      'position': 'absolute',
      'display': 'none',
      'z-index': 10000
    });
    $('body').append(element);
  }

  function updateCounts()
  {
    counts.rows = table.find('tr').length - 1;
    counts.cols = table.find('tr').first().children().length - 1;
    span.text(counts.cols + ' x ' + counts.rows);
  }

  TableSelection.prototype.setCallback = function(c) {callback = c};
  TableSelection.prototype.setXPos =     function(x) {element.css('left', x + 'px');};
  TableSelection.prototype.setYPos =     function(y) {element.css('top', y + 'px');};
  TableSelection.prototype.show =        function() {element.show();};
  TableSelection.prototype.hide =        function() {element.hide();};
  TableSelection.prototype.getColCount = function() {return counts.cols};
  TableSelection.prototype.getRowCount = function() {return counts.rows};
  TableSelection.prototype.getCounts =   function() {return counts};

  return TableSelection;
})();

var TablePlacer = function(s) {

  var self, element, counts;

  self   = this;
  counts = s;

  buildElement();
  init();

  function init()
  {
    var f, t;
    f = new MouseFollower(element);
    f.registerCallback(DomEvents.CLICK, function(e) {
      var t, o;
      t = $(e.target);
      o = t.offset();
      Mouse.removeFollower(f);
      wEditor.insertElement(createTable(), new Position(e.clientX - o.left, e.clientY - o.top));
    });
    Mouse.setFollower(f);
  }

  function createTable()
  {
    var $t, $tb, $td, $tr, i;
    $t = $('<table class="edDropped">');
    $tb = $('<tbody>');
    $tr = $('<tr>');
    $td = $('<td contenteditable="true">&nbsp;</td>');

    for (i = 0; i < counts.cols; i++) {
      $tr.append($td.clone());
    }
    for (i = 0; i < counts.rows; i++) {
      $tb.append($tr.clone());
    }
    $t.append($tb);

    return $t[0];
  }

  function buildElement()
  {
    element = $('<div id="tableFollower">')
    element
      .css({
        'position':      'absolute',
        'z-index':       '10000',
        'opacity':       '.6',
        'padding':       '8px',
        'border':        '1px solid #444',
        'border-radius': '5px'
      })
      .append('<span class="icon-table2"></span>');
    $('body').append(element);
  }

  function destruct()
  {
    element.remove();
    element = null;
  }

  self.getElement = function() {return element}
};

var MouseFollower = function(e, b) {

  var self, element, buffer, editor, callbacks;

  callbacks = {
    'click': [],
    'mousemove': []
  };
  editor = $('#editorContent');
  self = this;
  element = e;
  buffer = (typeof b == 'object' && b.x && b.y) ? b :{x: 0, y: 20};

  self.update = function(position, e)
  {
    if (e.target == editor[0] || (DroppableElements[e.target.nodeName] && editor.find($(e.target)).length > 0)) {
      element.show();
    } else {
      element.hide();
    }
    element.css({left: (position.getXPos() + buffer.x) + 'px', top: (position.getYPos() + buffer.y) + 'px'});
  };

  self.handleClick = function(e)
  {
    var i, c;
    if(e.target == editor[0]) {
      c = callbacks.click.length;
      for(i = 0; i < c; i++) {
        callbacks.click[i](e);
      }
      element.remove();
    }
  };

  self.registerCallback = function(e, f)
  {
    var a;
    if (callbacks[e]) {
      callbacks[e].push(f);
      return;
    }
    a = e.substr(2);
    if (callbacks[a]) {
      callbacks[a].push(f);
    }
  }
};

var Mouse = (function() {

  var position;
  var follower;

  function init()
  {
    position = new Position();
    document.addEventListener('mousemove', follow);
    document.addEventListener('click', click);
  }

  function follow(e)
  {
    position.setXPos(e.x);
    position.setYPos(e.y);
    if (follower) {
      follower.update(position, e);
    }
  }

  function click(e)
  {
    if (follower) {
      follower.handleClick(e);
    }
  }

  init();

  return {
    getPosition:    function() {return position},
    getFollower:    function() {return follower},
    setFollower:    function(f) {if (f instanceof MouseFollower) {follower = f;}},
    removeFollower: function(f) {if(f) {if(f != follower) {return}} follower = null}
  };
})();

