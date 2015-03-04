/**
 * EFEdit Application
 *
 * @class App
 *
 * @module  EFEditor
 * @since   0.0.1
 * @version 0.0.1
 *
 * @author Elizabeth Harper <elliefops@gmail.com>
 *
 * @constructor
 * @param [config] {Object} Optional User Configuration to override the default config values.
 */
EFEdit.App = function(config) {

  var self = this;

  /**
   * Application Level Elements
   *
   * @property appElements
   * @private
   *
   * @type {{}}
   */
  var appElements = {};

  /**
   * Mouse Widget Elements
   *
   * @property mouseWidgets
   * @private
   *
   * @type {{}}
   */
  var mouseWidgets = {};

  /**
   * Whether or not this application is running
   *
   * @property appRunning
   * @private
   *
   * @type {boolean}
   */
  var appRunning = false;

  /**
   * Local cache of the required Configuration Options
   *
   * @property cacheConf
   * @private
   *
   * @type {{}}
   */
  var cacheConf = {};

  /**
   * Initialize Application
   *
   * @method init
   * @private
   */
  function init() {
    updateConfig();
    cacheConfig();
  }

  /**
   * Start Application
   *
   * @method start
   *
   * @chainable
   * @return {App}
   */
  self.start = function() {
    appRunning = true;
    run();
    return self;
  };

  /**
   * Stop Application
   *
   * @method stop
   *
   * @chainable
   * @returns {App}
   */
  self.stop = function() {
    appRunning = false;
    return self;
  };

  /**
   * Run Application
   *
   * @method run
   * @private
   */
  function run() {
    var lastTime,
      currentTime,
      lastReCache;

    lastReCache = lastTime = currentTime = new Date().getTime();

    function loop() {
      var dif;
      if (!appRunning) {
        return;
      }
      lastTime = currentTime;
      currentTime = new Date().getTime();

      if (currentTime - lastReCache > 1000) {
        cacheConfig();
        lastReCache = currentTime;
      }

      update();

      dif = (1000/cacheConf.fps) - (currentTime - lastTime);
      dif = (dif < 5) ? 5 : dif;
      setTimeout(run, dif);
    }
    setTimeout(loop, cacheConf.fps);
  }

  /**
   * Update
   *
   * Calls the update method on all elements active in the app.
   *
   * @method update
   * @private
   */
  function update() {
    var a, b;
    for (a in mouseWidgets) {
      if (!mouseWidgets.hasOwnProperty(a)) {continue;}
      a.update();
    }
    for (b in appElements) {
      if (!appElements.hasOwnProperty(b)) {continue;}
      b.update();
    }
  }

  /**
   * Cache the needed configuration values.
   *
   * @method cacheConfig
   * @private
   */
  function cacheConfig() {
    var a = EFEdit.core.Configuration;
    cacheConf.fps = a.getValue('fps', 30);
  }

  /**
   * Update Configuration
   *
   * @method updateConfig
   * @private
   */
  function updateConfig() {
    if (config && typeof config == "object") {
      EFEdit.Configuration.mergeInUserConfig(config);
    }
  }

  /**
   * Register a new Mouse Widget
   *
   * @method registerMouseWidget
   *
   * @param key    {string}
   * @param widget {EFEdit.component.MouseWidget}
   *
   * @chainable
   * @return {App}
   */
  self.registerMouseWidget = function(key, widget) {
    if (widget instanceof EFEdit.component.MouseWidget) {
      mouseWidgets[key] = widget;
    }
    return self;
  };

  /**
   * Register a new App Element
   *
   * @param key     {string}
   * @param element {EFEdit.component.AppElement}
   *
   * @chainable
   * @return {EFEdit.component.AppElement}
   */
  self.registerAppElement = function(key, element) {
    if (element instanceof EFEdit.component.AppElement) {
      appElements[key] = element;
    }
    return self;
  };

  init();
};
