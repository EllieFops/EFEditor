EFEditor.Element = (function ()
{
  function EFElement(tag, title, type)
  {
    var self = this;

    /**
     * HTML Tag String
     *
     * @type {string}
     */
    self.tag = '';

    /**
     * Tag Title String
     *
     * @type {string}
     */
    self.title = '';

    /**
     * Element Type
     *
     * @type {ElementType}
     */
    self.type = null;

    /**
     *
     * @type {Array}
     */
    self.requires = [];

    /**
     * Alias Data
     * @type {Object}
     */
    self.alias = null;

    /**
     * Initialize EF Element
     */
    function init()
    {
      self.tag = (tag && typeof tag == 'string') ? tag : '#text';
      self.title = (title && typeof title == 'string') ? title : 'Text Element';
      self.type = (type && typeof type == 'number') ? type : ElementType.INLINE;
    }

    /**
     * Get Element Title
     *
     * @returns {string}
     */
    self.getTitle = function () {
      return self.title;
    };

    /**
     * Set Element Title
     *
     * @param title
     * @returns {EFElement}
     */
    self.setTitle = function (title)
    {
      self.title = title;
      return self;
    };

    /**
     * Get Element Type
     *
     * @returns {ElementType}
     */
    self.getType = function ()
    {
      return self.type;
    };

    /**
     * Set Element Type
     *
     * @param type
     * @returns {EFElement}
     */
    self.setType = function (type)
    {
      self.type = type;
      return self;
    };

    /**
     * Get Element Tag Text
     *
     * @returns {string}
     */
    self.getTag = function ()
    {
      return self.tag;
    };

    /**
     * Get Required Parent Elements
     *
     * @returns {Array}
     */
    self.getRequires = function ()
    {
      return self.requires;
    };

    /**
     * Set Required Parent Elements
     *
     * @param requires
     * @returns {EFElement}
     */
    self.setRequires = function (requires)
    {
      self.requires = requires;
      return self;
    };

    /**
     * Check if this element has a preferred Alias
     *
     * @returns {boolean}
     */
    self.hasAlias = function ()
    {
      return (self.alias == null);
    };

    /**
     * Get this element's preferred alias.
     *
     * @returns {Object}
     */
    self.getAlias = function ()
    {
      return self.alias;
    };

    /**
     * Set this element's preferred alias.
     *
     * @param alias
     * @returns {EFElement}
     */
    self.setAlias = function (alias)
    {
      self.alias = alias;
      return self;
    };

    init();
  }

  /**
   * Create a new Element instance.
   *
   * @param tag
   * @param title
   * @param type
   * @returns {EFElement}
   */
  EFElement.prototype.makeElement = function (tag, title, type)
  {
    return new EFElement(tag, title, type);
  };

  return EFElement;
})();
EFEditor.ElementType = {
  BLOCK:             0,
  INLINE:            1,
  SELF_CLOSING:      2,
  META:              3,
  INLINE_BLOCK:      4,
  META_SELF_CLOSING: 5
};
