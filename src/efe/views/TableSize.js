/**
 * Table Size Picker View
 *
 * @author: Elizabeth Harper <elliefops@gmail.com>
 */
EFEdit.v.TableSize =
  (
    function() {

      function TableSize() {
        EFEdit.v.Pane.call(this, new EFEdit.component.Element('div'));

        this.table  = null;
        this.span   = null;
        this.counts = {};

        this.addSelfEventHandler(EFEdit.dom.Event.CLICK, this.handleClick);
        this.addSelfEventHandler(EFEdit.dom.Event.MOUSE_MOVE, this.handleMouseMove);
        this.addSelfEventHandler(EFEdit.dom.Event.MOUSE_OVER, this.handleMouseOver);

        this.init();
      }

      TableSize.prototype = Object.create(EFEdit.v.Pane.prototype);

      TableSize.prototype.init = function() {
        this.table = initTable();
        this.element.setId('tableSelectionPane').append(initTable());
        this.span = new EFEdit.component.Element('span');
        this.span.setText('1 x 1');
      };

      function initTable() {

        var td, tr, table;

        table = new EFEdit.component.Element('table');
        tr    = new EFEdit.component.Element('tr');
        td    = new EFEdit.component.Element('td');

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
      TableSize.prototype.handleClick = function() {

      };

      /**
       * Handle Mouse Over
       *
       * @param e {MouseEvent}
       */
      TableSize.prototype.handleMouseOver = function(e) {
        var a, r, t, i, c;
        t = e.target;
        if (t.nodeName === EFEdit.dom.Element.TD && t.EFElement) {

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
      TableSize.prototype.handleMouseMove = function() {
        var a, c;
        a = document.querySelectorAll('#tableSelectionPane tr').length;
        this.table.getChildren()[0].setId('tempIddd');
        c = document.querySelectorAll('#tempIddd td').length;
        this.table.getChildren()[0].setId('');
      };

      return TableSize;
    }
  )();
