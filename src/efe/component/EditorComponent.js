/**
 * Coordinate Position
 *
 * @author: Elizabeth Harper <elliefops@gmail.com>
 * @namespace: efe.components
 */
EF.c.EditorComponent =
  (
    function() {

      function EditorComponent() {

        /**
         * Global Events
         *
         * @type {{}}
         */
        this.events = {};

        /**
         * Events on this element
         *
         * @type {{}}
         */
        this.selfEvents = {};
      }

      EditorComponent.prototype.update = function(){};

      /**
       * Add Handler for Global Events
       *
       * @param e {string}   Event to listen for.
       * @param h {function} Handler for the listened Event
       *
       * @returns {EF.c.EditorComponent}
       */
      EditorComponent.prototype.addGlobalEventHandler = function(e, h) {
        this.events[e] = h;
        return this;
      };

      /**
       * Add Handler for events targeted at this component.
       *
       * @param e {string}   Event to listen for.
       * @param h {function} Handler for the listened event.
       *
       * @returns {EF.c.EditorComponent}
       */
      EditorComponent.prototype.addSelfEventHandler = function(e, h) {
        this.selfEvents[e] = h;
        return this;
      };

      return EditorComponent;
    }
  )();
