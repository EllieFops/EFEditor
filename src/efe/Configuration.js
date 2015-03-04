/**
 * Application Config
 *
 * @class     Configuration
 *
 * @module  EFEditor
 * @since   0.0.1
 * @version 0.0.1
 *
 * @author Elizabeth Harper <elliefops@gmail.com>
 * @static
 */
EFEdit.Configuration = (function() {

  /**
   * Configuration Object
   *
   * @type {Object}
   */
  var values = {

    /**
     * EFEdit Modules To load
     *
     * @property modules
     *
     * @type {Object}
     */
    modules:    {},

    /**
     * Whitelisted HTML Elements
     *
     * @property whiteList
     *
     * @type {Object}
     */
    whiteList:  {
      'B':     true,
      'DIV':   true,
      'I':     true,
      'IMG':   true,
      'LI':    true,
      'OL':    true,
      'SPAN':  true,
      'TABLE': true,
      'TBODY': true,
      'TD':    true,
      'TH':    true,
      'THEAD': true,
      'TR':    true,
      'U':     true,
      'UL':    true
    },

    /**
     * Decoration Configuration Blocks
     *
     * @property decoration
     *
     * @type {Object}
     */
    decoration: {

      /**
       * Editor Element Decoration
       *
       * @property decoration.elements
       *
       * @type {Object}
       */
      elements:        {
        padding: 5,
        border:  {
          style:  'dotted',
          width:  1,
          color:  'red',
          radius: {
            topLeft:     0,
            topRight:    0,
            bottomLeft:  0,
            bottomRight: 0
          }
        }
      },

      /**
       * Selected Element Decoration
       *
       * @property decoration.selectedElement
       *
       * @type {Object}
       */
      selectedElement: {
        inherits: 'decoration.elements',
        border:   {
          color: 'blue'
        }
      }
    }
  };

  /**
   * Get Configuration data stored at a given key.
   *
   * @method getValue
   *
   * @param key        {string} Path to the value that should be retrieved.
   * @param [def=null] {"mixed"}      Default value to use if the key could not be retrieved.
   *
   * @returns {"mixed"}
   */
  function getValue(key, def) {
    var result;

    if (typeof def === "undefined") {
      def = null;
    }

    function search(key, map) {
      var keyPart,
          newKey,
          newSearch,
          inheritedValues,
          tempInherited,
          tempMerged;

      keyPart = key.split('.').shift();
      newKey  = key.substr(keyPart.length + 1);
      inheritedValues = [];

      if (map.inherits) {
        tempInherited = search(key, search(map.inherits, values));
        if (tempInherited) {
          inheritedValues.push(tempInherited);
        }
      }

      if (keyPart && map && map[keyPart]) {

        if (newKey.length === 0) {
          if (map[keyPart] instanceof Object) {
            if (inheritedValues.length) {
              inheritedValues.push(map[keyPart]);
              tempMerged = EFEdit.utility.JSON.hardMerge(inheritedValues);
            }
            else {
              tempMerged = map[keyPart];
            }
            if (tempMerged.inherits) {
              tempMerged = EFEdit.utility.JSON.hardMerge(search(tempMerged.inherits, values), tempMerged);
            }
            return tempMerged;
          }
          else {
            return map[keyPart];
          }
        }

        if (typeof map[keyPart] === "object") {
          newSearch = search(newKey, map[keyPart]);
        }
        else {
          newSearch = null;
        }

      }

      if (!newSearch && inheritedValues.length) {
        newSearch = inheritedValues.shift();
      }
      return newSearch;
    }

    result = search(key, values);
    return typeof result === "undefined" ? def : result;
  }

  function mergeInUserConfig(conf) {
    values = EFEdit.utility.JSON.hardMerge(values, conf);
  }

  return {getValue: getValue, mergeInUserConfig: mergeInUserConfig};
})();

