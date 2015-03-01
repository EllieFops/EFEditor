/**
 * Table Size Picker View
 *
 * @author: Elizabeth Harper <elliefops@gmail.com>
 * @namespace: efe.view
 */
if (!efe) {var efe = {}}
if (!efe.view) {efe.view = {}}

efe.view.TableSize =
  (
    function() {

      function TableSize() {
        efe.view.Pane.call(this, new efe.component.Element('div'));

        this.table  = null;
        this.span   = null;
        this.counts = {};

        this.init();
      }

      TableSize.prototype = Object.create(efe.view.Pane.prototype);

      TableSize.prototype.init = function() {
        this.table = initTable();
        this.element
          .setId('tableSelectionPane')
          .css({padding: '8px', border: '1px solid #444', 'border-radius': '5px', 'position': 'absolute'})
          .append(initTable());
        this.span = new efe.component.Element('span');
        this.span
          .setText('1 x 1')
          .css({display: 'block', 'text-align': 'center'});
      };

      function initTable() {
        var td, tr, table;

        table = new efe.component.Element('table');
        tr    = new efe.component.Element('tr');
        td    = new efe.component.Element('td');

        td.addClass('selCell')
          .css({'width':'1em','height':'1em',border:'1px solid #444'});

        tr.append(td.clone());
        tr.append(td);

        table.addClass('selTable');
        table.append(tr.clone);
        table.append(tr);




      }



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
      return TableSize;
    }
  )();
