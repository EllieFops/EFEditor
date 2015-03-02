/**
 * Plain Table
 *
 * @author: Elizabeth Harper <elliefops@gmail.com>
 * @namespace: EF.m.plainTable
 */
if (!EF.m.plainTable) {EF.m.plainTable = {};}
EF.m.plainTable.PlainTable =
  (
    function() {
      function PlainTable() {
        EF.m.Module.call(this);
      }

      PlainTable.prototype = Object.create(EF.m.Module.prototype);

      return PlainTable;
    }
  )();
