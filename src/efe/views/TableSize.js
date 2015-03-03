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

        this.addSelfEventHandler(EF.d.Event.CLICK, this.handleClick);
        this.addSelfEventHandler(EF.d.Event.MOUSE_MOVE, this.handleMouseMove);
        this.addSelfEventHandler(EF.d.Event.MOUSE_OVER, this.handleMouseOver);

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
        var a, r, t, i, c;
        t = e.target;
        if (t.nodeName === EF.d.Element.TD && t.EFElement) {

          /** @type {HTMLElement} */
          r = t.parentNode;
          /** @type {HTMLElement} */
          a = r.parentNode;

          // Handle TD duplication
          if (t === r.lastChild || t === r.lastChild.previousSibling) {
            c = a.children.length;
            for (i = 0; i < c; i++) {
              r.EFElement.append(t.EFElement.clone());
            }
          }

          // Handle TR Duplication
          if (r === a.lastChild || r === a.lastChild.previousSibling) {
            this.table.append(a.lastChild.EFElement.clone(true));
          } else {
            this.table.getChildren()[0].remove();
          }

          // Check TR
        }
      };

      /**
       * Handle Mouse Movement
       *
       * @param e {MouseEvent}
       */
      TableSize.prototype.handleMouseMove = function(e) {
        var a, c;
        a = document.querySelectorAll('#tableSelectionPane tr').length;
        this.table.getChildren()[0].setId('tempIddd');
        c = document.querySelectorAll('#tempIddd td').length;
        this.table.getChildren()[0].setId('');
      };

      return TableSize;
    }
  )();
