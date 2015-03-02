/**
 * Element Edit Control
 *
 * @author: Elizabeth Harper <elliefops@gmail.com>
 * @namespace: EF.c
 */
EF.c.EditControl =
  (
    function() {
      /**
       * Edit Control
       *
       * @param e {EF.c.Element} Element that will be modified by this control.
       *
       * @constructor
       */
      function EditControl(e) {

        EF.c.Element.call(this, 'div');

        this.target = e;
        this.clicked = false;

        this.addClass('posAbs');
        this.addGlobalEventHandler(EF.d.Event.MOUSE_UP, this.handleUnclick);
        this.addSelfEventHandler(EF.d.Event.MOUSE_DOWN, this.handleThisClick);
      }

      EditControl.prototype = Object.create(EF.c.Element.prototype);

      EditControl.prototype.handleThisClick = function() {
        this.clicked = true;
      };

      EditControl.prototype.handleUnclick = function() {
        this.clicked = false;
      };

      EditControl.prototype.handleDrop = function() {
        return false;
      };

      EditControl.prototype.update = function() {
        this.target.offsetTop
      };

      return EditControl
    }
  )();
