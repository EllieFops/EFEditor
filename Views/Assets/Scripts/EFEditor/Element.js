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

EFEditor.Elements = {
  'A':          EFEditor.Element.makeElement('a', 'Anchor', EFEditor.ElementType.INLINE),
  'ABBR':       null,
  'ACRONYM':    null,
  'ADDRESS':    EFEditor.Element.makeElement('address', 'Address Block', EFEditor.ElementType.BLOCK),
  'APPLET':     null,
  'AREA':       null,
  'ARTICLE':    EFEditor.Element.makeElement('article', 'Article Block', EFEditor.ElementType.BLOCK),
  'AUDIO':      null,
  'B':          EFEditor.Element.makeElement('b', 'Bold', EFEditor.ElementType.INLINE)
                  .setAlias({tag: 'SPAN', attributes: {'class': 'bold'}}),
  'BASE':       EFEditor.Element.makeElement('base', 'Base Directory', EFEditor.ElementType.META),
  'BASEFONT':   null,
  'BODY':       EFEditor.Element.makeElement('body', 'Page Body', EFEditor.ElementType.BLOCK),
  'BDI':        null,
  'BDO':        null,
  'BIG':        null,
  'BLINK':      null,
  'BLOCKQUOTE': null,
  'BR':         EFEditor.Element.makeElement('br', 'Line Break', EFEditor.ElementType.SELF_CLOSING),
  'BUTTON':     null,
  'CANVAS':     null,
  'CAPTION':    null,
  'CENTER':     null,
  'CITE':       null,
  'CODE':       null,
  'COL':        null,
  'COLGROUP':   null,
  'CONTENT':    null,
  'DATA':       null,
  'DATALIST':   null,
  'DD':         EFEditor.Element.makeElement('dd', 'Definition Description', EFEditor.ElementType.INLINE_BLOCK)
                  .setRequires(['DL']),
  'DECORATOR':  null,
  'DEL':        null,
  'DETAILS':    null,
  'DFN':        null,
  'DIALOG':     null,
  'DIR':        null,
  'DIV':        EFEditor.Element.makeElement('div', 'Division', EFEditor.ElementType.BLOCK),
  'DL':         null,
  'DT':         EFEditor.Element.makeElement('dt', 'Definition Term', EFEditor.ElementType.INLINE_BLOCK),
  'ELEMENT':    null,
  'EM':         null,
  'EMBED':      null,
  'FIELDSET':   null,
  'FIGCAPTION': EFEditor.Element.makeElement('figcaption', 'Caption for a figure block', EFEditor.ElementType.BLOCK)
                  .setRequires(['FIGURE']),
  'FIGURE':     EFEditor.Element.makeElement('figure', 'Figure', EFEditor.ElementType.BLOCK),
  'FOOTER':     EFEditor.Element.makeElement('footer', 'Content Footer', EFEditor.ElementType.BLOCK),
  'FORM':       null,
  'FRAME':      null,
  'FRAMESET':   null,
  'H1':         EFEditor.Element.makeElement('H1', 'Level 1 Header', EFEditor.ElementType.INLINE_BLOCK),
  'H2':         EFEditor.Element.makeElement('H2', 'Level 2 Header', EFEditor.ElementType.INLINE_BLOCK),
  'H3':         EFEditor.Element.makeElement('H3', 'Level 3 Header', EFEditor.ElementType.INLINE_BLOCK),
  'H4':         EFEditor.Element.makeElement('H4', 'Level 4 Header', EFEditor.ElementType.INLINE_BLOCK),
  'H5':         EFEditor.Element.makeElement('H5', 'Level 5 Header', EFEditor.ElementType.INLINE_BLOCK),
  'H6':         EFEditor.Element.makeElement('H6', 'Level 6 Header', EFEditor.ElementType.INLINE_BLOCK),
  'HEAD':       EFEditor.Element.makeElement('head', 'Body Metadata', EFEditor.ElementType.BLOCK),
  'HEADER':     EFEditor.Element.makeElement('header', 'Content Header', EFEditor.ElementType.BLOCK),
  'HGROUP':     EFEditor.Element.makeElement('hgroup', 'Header Group', EFEditor.ElementType.BLOCK),
  'HR':         EFEditor.Element.makeElement('hr', 'Horizontal Separator', EFEditor.ElementType.SELF_CLOSING),
  'HTML':       null,
  'I':          EFEditor.Element.makeElement('i', 'Italic', EFEditor.ElementType.INLINE)
                  .setAlias({tag: 'SPAN', attributes: {'class': 'italic'}}),
  'IFRAME':     null,
  'IMG':        EFEditor.Element.makeElement('img', 'Image', EFEditor.ElementType.SELF_CLOSING),
  'INPUT':      null,
  'INS':        null,
  'ISINDEX':    null,
  'KBD':        null,
  'KEYGEN':     null,
  'LABEL':      null,
  'LEGEND':     null,
  'LI':         EFEditor.Element.makeElement('li', 'List Item', EFEditor.ElementType.INLINE_BLOCK)
                  .setRequires(['OL', 'UL']),
  'LINK':       EFEditor.Element.makeElement('link', 'Meta Link', EFEditor.ElementType.SELF_CLOSING)
                  .setRequires(['HEAD']),
  'LISTING':    null,
  'MAIN':       null,
  'MAP':        null,
  'MARK':       null,
  'MENU':       null,
  'MENUITEM':   null,
  'META':       EFEditor.Element.makeElement('meta', 'Page Metadata', EFEditor.ElementType.SELF_CLOSING)
                  .setRequires(['HEAD']),
  'METER':      null,
  'NAV':        EFEditor.Element.makeElement('nav', 'Navigation Block', EFEditor.ElementType.BLOCK),
  'NOEMBED':    null,
  'NOSCRIPT':   null,
  'OBJECT':     null,
  'OL':         EFEditor.Element.makeElement('ol', 'Ordered List', EFEditor.ElementType.BLOCK),
  'OPT':        null,
  'OPTGROUP':   null,
  'OPTION':     null,
  'OUTPUT':     null,
  'P':          EFEditor.Element.makeElement('p', 'Paragraph', EFEditor.ElementType.BLOCK),
  'PARAM':      null,
  'PLAINTEXT':  null,
  'PRE':        null,
  'PROGRESS':   null,
  'Q':          null,
  'RP':         null,
  'RT':         null,
  'RUBY':       null,
  'S':          null,
  'SAMP':       null,
  'SCRIPT':     null,
  'SECTION':    EFEditor.Element.makeElement('section', 'Body content section', EFEditor.ElementType.BLOCK),
  'SELECT':     null,
  'SHADOW':     null,
  'SMALL':      null,
  'SOURCE':     null,
  'SPACER':     null,
  'SPAN':       EFEditor.Element.makeElement('span', 'Span', EFEditor.ElementType.INLINE),
  'STRIKE':     null,
  'STRONG':     null,
  'STYLE':      EFEditor.Element.makeElement('style', 'Style Tag', EFEditor.ElementType.BLOCK)
                  .setTagAttributes({'scoped': "scoped"}),
  'SUB':        null,
  'SUMMARY':    null,
  'SUP':        null,
  'TABLE':      EFEditor.Element.makeElement('table', 'Table', EFEditor.ElementType.BLOCK),
  'TBODY':      EFEditor.Element.makeElement('tbody', 'Table Body', EFEditor.ElementType.BLOCK)
                  .setRequires(['TABLE']),
  'TD':         EFEditor.Element.makeElement('td', 'Table Cell', EFEditor.ElementType.INLINE_BLOCK)
                  .setRequires(['TBODY > TR']),
  'TEMPLATE':   null,
  'TEXTAREA':   null,
  'TH':         EFEditor.Element.makeElement('th', 'Table Header Cell', EFEditor.ElementType.INLINE_BLOCK)
                  .setRequires(['THEAD > TR', 'TABLE > TR']),
  'THEAD':      EFEditor.Element.makeElement('thead', 'Table Header', EFEditor.ElementType.BLOCK)
                  .setRequires(['TABLE']),
  'TIME':       null,
  'TITLE':      EFEditor.Element.makeElement('title', 'Page Title', EFEditor.ElementType.INLINE_BLOCK)
                  .setRequires(['HEAD']),
  'TR':         EFEditor.Element.makeElement('tr', 'Table Row', EFEditor.ElementType.BLOCK)
                  .setRequires(['TABLE', 'THEAD', 'TBODY']),
  'TRACK':      null,
  'TT':         null,
  'U':          EFEditor.Element.makeElement('u', 'Underline', EFEditor.ElementType.INLINE)
                  .setAlias({tag: 'SPAN', attributes: {'class': 'underline'}}),
  'UL':         EFEditor.Element.makeElement('ul', 'Unordered List', EFEditor.ElementType.BLOCK),
  'VAR':        null,
  'VIDEO':      null,
  'WBR':        null,
  'XMP':        null
};

EFEditor.ElementType = {
  BLOCK:             0,
  INLINE:            1,
  SELF_CLOSING:      2,
  META:              3,
  INLINE_BLOCK:      4,
  META_SELF_CLOSING: 5
};
