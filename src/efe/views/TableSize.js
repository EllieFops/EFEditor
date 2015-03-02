/**
 * Table Size Picker View
 *
 * @author: Elizabeth Harper <elliefops@gmail.com>
 * @namespace: efe.view
 */
EF.v.TableSize =
  (
    function() {

      function TableSize() {
        EF.v.Pane.call(this, new EF.c.Element('div'));

        this.table  = null;
        this.span   = null;
        this.counts = {};

        this.events[EF.d.Event.CLICK] = this.handleClick;
        this.events[EF.d.Event.MOUSE_MOVE] = this.handleMouseMove;
        this.events[EF.d.Event.MOUSE_OVER] = this.handleMouseOver;

        this.init();
      }

      TableSize.prototype = Object.create(EF.v.Pane.prototype);

      TableSize.prototype.init = function() {
        this.table = initTable();
        this.element.setId('tableSelectionPane').append(initTable());
        this.span = new EF.c.Element('span');
        this.span.setText('1 x 1');
      };

      function initTable() {

        var td, tr, table;

        table = new EF.c.Element('table');
        tr    = new EF.c.Element('tr');
        td    = new EF.c.Element('td');

        td.addClass('selCell');

        tr.append(td.clone());
        tr.append(td);

        table.addClass('selTable');
        table.append(tr.clone);
        table.append(tr);
      }

      function TableSelection()
      {
        if (counts) {
          resetAll();
        } else {
          init();
        }
      }

      /**
       * Handle Click
       *
       * @param e {MouseEvent}
       */
      TableSize.prototype.handleClick = function(e) {

      };

      /**
       * Handle Mouse Over
       *
       * @param e {MouseEvent}
       */
      TableSize.prototype.handleMouseOver = function(e) {
        var a, t;
        t = e.target;
        if (e.target.nodeName === EF.d.Element.TR && e.target.EFElement) {
          a = e.target.parentElement;
          if (e.target === a.lastChild || e.target === a.lastChild.previousSibling) {
            this.table.append(a.lastChild.EFElement.clone(true));
          }
        }
      };

      /**
       * Handle Mouse Over
       *
       * @param e {MouseEvent}
       */
      TableSize.prototype.handleMouseOver = function(e) {

      };

      function init() {mouse = {x: 0, y: 0}; counts  = {cols: 2, rows: 2}; create();}
      function resetAll() {element.remove(); init();}
      function resetElement() {element.remove(); create();}

      function create() {

        var $tr, $td;

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
