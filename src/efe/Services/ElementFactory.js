var ElementFactory = {
  /**
   * Create Anchor Element
   *
   * @returns {Models.Element}
   */
  'A': function ()
  {
    return new Models.Element('a', 'Anchor', Models.BlockType.INLINE);
  },

  'ABBR':    null,
    'ACRONYM': null,

  /**
   * Create Address Element
   *
   * @returns {Models.Element}
   */
    'ADDRESS': function ()
  {
    return new Models.Element('address', 'Address Block', Models.BlockType.BLOCK);
  },

  'APPLET': null,
    'AREA':   null,

  /**
   * Create Article Element
   *
   * @returns {Models.Element}
   */
    'ARTICLE': function ()
  {
    return new Models.Element('article', 'Article Block', Models.BlockType.BLOCK);
  },

  'AUDIO': null,

  /**
   * Make Bold Element
   *
   * @returns {Models.Element}
   */
    'B': function ()
  {
    var a = new Models.Element('b', 'Bold', Models.BlockType.INLINE);
    a.setAlias({tag: 'SPAN', attributes: {'class': 'bold'}});
    return a;
  },

  /**
   * Make Base Element
   *
   * @returns {Models.Element}
   */
  'BASE': function ()
  {
    return new Models.Element('base', 'Base Directory', Models.BlockType.META);
  },

  'BASEFONT': null,

  /**
   * Make Body Element
   *
   * @returns {Models.Element}
   */
    'BODY': function ()
  {
    return new Models.Element('body', 'Page Body', Models.BlockType.BLOCK);
  },

  'BDI':        null,
    'BDO':        null,
    'BIG':        null,
    'BLINK':      null,
    'BLOCKQUOTE': null,

  /**
   * Make Line Break Element
   *
   * @returns {Models.Element}
   */
    'BR': function ()
  {
    return new Models.Element('br', 'Line Break', Models.BlockType.SELF_CLOSING);
  },

  'BUTTON':   null,
    'CANVAS':   null,
    'CAPTION':  null,
    'CENTER':   null,
    'CITE':     null,
    'CODE':     null,
    'COL':      null,
    'COLGROUP': null,
    'CONTENT':  null,
    'DATA':     null,
    'DATALIST': null,

  /**
   * Create Definition Description
   *
   * @returns {Models.Element}
   */
    'DD': function ()
  {
    var a = new Models.Element('dd', 'Definition Description', Models.BlockType.INLINE_BLOCK);
    a.setRequires(['DL']);
    return a;
  },

  'DECORATOR':  null,
  'DEL':        null,
  'DETAILS':    null,
  'DFN':        null,
  'DIALOG':     null,
  'DIR':        null,
  'DIV':        function(){return document.createElement('div')},
  'DL':         function(){return document.createElement('dl')},
  'DT':         function(){return document.createElement('dt')},
  'ELEMENT':    null,
  'EM':         null,
  'EMBED':      null,
  'FIELDSET':   null,
  'FIGCAPTION': function(){return new EFElement(document.createElement('figcaption'))},
  'FIGURE':     function ()
  {
    return new Models.Element('figure', 'Figure', Models.BlockType.BLOCK);
  },
  'FOOTER':     function ()
  {
    return new Models.Element('footer', 'Content Footer', Models.BlockType.BLOCK);
  },
  'FORM':       null,
    'FRAME':      null,
    'FRAMESET':   null,
    'H1':         function ()
  {
    return new Models.Element('H1', 'Level 1 Header', Models.BlockType.INLINE_BLOCK);
  },
  'H2':         function ()
  {
    return new Models.Element('H2', 'Level 2 Header', Models.BlockType.INLINE_BLOCK);
  },
  'H3':         function ()
  {
    return new Models.Element('H3', 'Level 3 Header', Models.BlockType.INLINE_BLOCK);
  },
  'H4':         function ()
  {
    return new Models.Element('H4', 'Level 4 Header', Models.BlockType.INLINE_BLOCK);
  },
  'H5':         function ()
  {
    return new Models.Element('H5', 'Level 5 Header', Models.BlockType.INLINE_BLOCK);
  },
  'H6':         function ()
  {
    return new Models.Element('H6', 'Level 6 Header', Models.BlockType.INLINE_BLOCK);
  },
  'HEAD':       function ()
  {
    return new Models.Element('head', 'Body Metadata', Models.BlockType.BLOCK);
  },
  'HEADER':     function ()
  {
    return new Models.Element('header', 'Content Header', Models.BlockType.BLOCK);
  },
  'HGROUP':     function ()
  {
    return new Models.Element('hgroup', 'Header Group', Models.BlockType.BLOCK);
  },
  'HR':         function ()
  {
    return new Models.Element('hr', 'Horizontal Separator', Models.BlockType.SELF_CLOSING);
  },
  'HTML':       null,
    'I':          function ()
  {
    var a = new Models.Element('i', 'Italic', Models.BlockType.INLINE);
    a.setAlias({tag: 'SPAN', attributes: {'class': 'italic'}});
    return a;
  },
  'IFRAME':     null,
    'IMG':        function ()
  {
    return new Models.Element('img', 'Image', Models.BlockType.SELF_CLOSING);
  },
  'INPUT':      null,
    'INS':        null,
    'ISINDEX':    null,
    'KBD':        null,
    'KEYGEN':     null,
    'LABEL':      null,
    'LEGEND':     null,
    'LI':         function ()
  {
    return new Models.Element('li', 'List Item', Models.BlockType.INLINE_BLOCK).setRequires(['OL', 'UL']);
  },
  'LINK':       function ()
  {
    return new Models.Element('link', 'Meta Link', Models.BlockType.SELF_CLOSING).setRequires(['HEAD']);
  },
  'LISTING':    null,
    'MAIN':       null,
    'MAP':        null,
    'MARK':       null,
    'MENU':       null,
    'MENUITEM':   null,
    'META':       function ()
  {
    var a = new Models.Element('meta', 'Page Metadata', Models.BlockType.SELF_CLOSING);
    a.setRequires(['HEAD']);
    return a;
  },
  'METER':      null,
    'NAV':        function ()
  {
    return new Models.Element('nav', 'Navigation Block', Models.BlockType.BLOCK);
  },
  'NOEMBED':    null,
    'NOSCRIPT':   null,
    'OBJECT':     null,
    'OL':         function ()
  {
    return new Models.Element('ol', 'Ordered List', Models.BlockType.BLOCK);
  },
  'OPT':        null,
    'OPTGROUP':   function ()
  {
    var a = new Models.Element('optgroup', 'Option Group', Models.BlockType.INLINE_BLOCK);
    a.setRequires(['SELECT']);
    return a;
  },
  'OPTION':     function ()
  {
    var a = new Models.Element('option', 'Option', Models.BlockType.INLINE_BLOCK);
    a.setRequires(['SELECT']);
    return a;
  },
  'OUTPUT':     null,
    'P':          function ()
  {
    return new Models.Element('p', 'Paragraph', Models.BlockType.BLOCK);
  },
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
    'SECTION':    function ()
  {
    return new Models.Element('section', 'Body content section', Models.BlockType.BLOCK);
  },
  'SELECT':     function ()
  {
    return new Models.Element('select', 'Select', Models.BlockType.BLOCK);
  },
  'SHADOW':     null,
    'SMALL':      null,
    'SOURCE':     null,
    'SPACER':     null,
    'SPAN':       function ()
  {
    return new Models.Element('span', 'Span', Models.BlockType.INLINE);
  },
  'STRIKE':     null,
    'STRONG':     null,
    'STYLE':      function ()
  {
    var a = new Models.Element('style', 'Style Tag', Models.BlockType.BLOCK);
    a.setTagAttributes({'scoped': "scoped"});
    return a;
  },
  'SUB':        null,
    'SUMMARY':    null,
    'SUP':        null,
    'TABLE':      function ()
  {
    return new Models.Element('table', 'Table', Models.BlockType.BLOCK);
  },
  'TBODY':      function ()
  {
    return new Models.Element('tbody', 'Table Body', Models.BlockType.BLOCK).setRequires(['TABLE']);
  },
  'TD':         function ()
  {
    return new Models.Element('td', 'Table Cell', Models.BlockType.INLINE_BLOCK).setRequires(['TBODY > TR']);
  },
  'TEMPLATE':   null,
    'TEXTAREA':   null,
    'TH':         function ()
  {
    var a = new Models.Element('th', 'Table Header Cell', Models.BlockType.INLINE_BLOCK);
    a.setRequires(['THEAD > TR', 'TABLE > TR']);
    return a;
  },
  'THEAD':      function ()
  {
    return new Models.Element('thead', 'Table Header', Models.BlockType.BLOCK).setRequires(['TABLE']);
  },
  'TIME':       null,
    'TITLE':      function ()
  {
    return new Models.Element('title', 'Page Title', Models.BlockType.INLINE_BLOCK).setRequires(['HEAD']);
  },
  'TR':         function ()
  {
    var a = new Models.Element('tr', 'Table Row', Models.BlockType.BLOCK);
    a.setRequires(['TABLE', 'THEAD', 'TBODY']);
    return a;
  },
  'TRACK':      null,
    'TT':         null,
    'U':          function ()
  {
    var a = new Models.Element('u', 'Underline', Models.BlockType.INLINE);
    a.setAlias({tag: 'SPAN', attributes: {'class': 'underline'}});
    return a;
  },
  'UL':         function ()
  {
    return new Models.Element('ul', 'Unordered List', Models.BlockType.BLOCK);
  },
  'VAR':        null,
    'VIDEO':      null,
    'WBR':        null,
    'XMP':        null
};
