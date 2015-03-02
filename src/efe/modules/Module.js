/**
 * Base Module
 *
 * @author: Elizabeth Harper <elliefops@gmail.com>
 * @namespace: EF.m
 */
EF.m.Module =
  (
    function() {
      function Module() {
        this.events = [];
        this.handlers = {};
        this.requires = [];
      }

      /**
       * Initialize Module
       *
       * @param a {EF.a.App} Application attempting to load this module.
       */
      Module.prototype.initialize = function(a) {};

      /**
       * Get Events this Module should listen for.
       *
       * @returns {Array}
       */
      Module.prototype.getEvents = function() {return this.events;};

      /**
       * Get this Modules event handlers, optionally for a specific event.
       *
       * @param d {string|undefined} Optional event type to get handlers for.
       *
       * @returns {*}
       */
      Module.prototype.getHandlers = function(d) {if (d) {return this.handlers[d];} else {return this.handlers;}};

      /**
       * Get Required Modules
       *
       * @returns {Array}
       */
      Module.prototype.getRequirements = function() {return this.requires;};

      return Module;
    }
  )();
