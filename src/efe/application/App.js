/**
 * Application
 *
 * @author: Elizabeth Harper <elliefops@gmail.com>
 * @namespace: efe.a
 */
EFEditor.app.App = (
  function()
  {
    var appRunning = false;

    var App = function()
    {
      this.elements = [];
    };

    App.prototype = Object.create(Object.prototype);

    /**
     * Register Application level element.
     *
     * @param e {AppElement}
     *
     * @returns {boolean}
     */
    App.prototype.registerElement = function(e)
    {
      if (!e instanceof EFEditor.component.AppElement) {
        // console.log('[WARNING] Invalid element passed to App.registerElement().  Element ignored.');
        return false;
      }

      this.elements.push(e);
      return true;
    };

    /**
     * Start the Application
     */
    App.prototype.run =   function ()
    {
      var current,
          last,
          speed,
          time;

      appRunning = true;
      current    = new Date().getTime();
      last       = current;
      upd();

      function upd()
      {
        var i;
        speed = 1 / EFEditor.app.Configuration.getValue('fps', 30);
        last = current;
        current = new Date().getTime();

        if (appRunning) {
          for (i = 0; this.elements.length; i++) {
            this.elements[i].update();
          }

          time = speed - (current - last);
          setTimeout(upd, time);
        }
      }
    };

    /**
     * Stop the Application
     */
    App.prototype.stop = function()
    {
      appRunning = false;
    };

    return App;
  }
)();
