define(
  ['util/Misc'],
  function (misc)
  {
    function codeForBrowser(cr, ff, ie, op, sa)
    {
      var b = new misc();
      var a = b.Browsers;
      switch (b.currentBrowser) {
        case a.CHROME:
          return cr;
        case a.IE:
          return ie;
        case a.FIREFOX:
          return ff;
        case a.SAFARI:
          return sa;
        case a.OPERA:
          return op;
      }
    }

    var Keyboard = {

      // Misc
      KEY_ESC:          27,
      KEY_BACKSPACE:    8,
      KEY_TAB:          9,
      KEY_INSERT:       45,
      KEY_DELETE:       46,
      KEY_PAGE_UP:      33,
      KEY_PAGE_DOWN:    34,
      KEY_HOME:         36,
      KEY_END:          35,
      KEY_PRINT_SCREEN: 0,
      KEY_PAUSE:        19,
      KEY_ENTER:        13,

      // ?
      KEY_NUM_CENTER:   12,

      KEY_CAPS_LOCK:     20,
      KEY_NUM_LOCK:      144,
      KEY_SCROLL_LOCK:   145,

      // Symbols
      KEY_DASH:          codeForBrowser(189, 173, 189, 45, 189),
      KEY_COMMA:         codeForBrowser(188, 188, 188, 44, 188),
      KEY_PERIOD:        codeForBrowser(190, 190, 190, 46, 190),
      KEY_OPEN_BRACKET:  codeForBrowser(219, 219, 219, 91, 219),
      KEY_CLOSE_BRACKET: 221,
      KEY_EQUALS_SIGN:   codeForBrowser(187, 61, 187, 61, 187),
      KEY_FORWARD_SLASH: codeForBrowser(191, 191, 191, 47, 191),
      KEY_BACK_SLASH:    220,
      KEY_APOSTROPHE:    222,
      KEY_GRAVE_ACCENT:  192,
      KEY_SEMICOLON:     codeForBrowser(186, 59, 186, 59, 186),

      // F# Keys
      KEY_F1:            112,
      KEY_F2:            113,
      KEY_F3:            114,
      KEY_F4:            115,
      KEY_F5:            116,
      KEY_F6:            117,
      KEY_F7:            118,
      KEY_F8:            119,
      KEY_F9:            120,
      KEY_F10:           121,
      KEY_F11:           122,
      KEY_F12:           123,

      // DIGITS
      KEY_0:             48,
      KEY_1:             49,
      KEY_2:             50,
      KEY_3:             51,
      KEY_4:             52,
      KEY_5:             53,
      KEY_6:             54,
      KEY_7:             55,
      KEY_8:             56,
      KEY_9:             57,

      // NumPad Digits
      KEY_NUM_0:         96,
      KEY_NUM_1:         97,
      KEY_NUM_2:         98,
      KEY_NUM_3:         99,
      KEY_NUM_4:         100,
      KEY_NUM_5:         101,
      KEY_NUM_6:         102,
      KEY_NUM_7:         103,
      KEY_NUM_8:         104,
      KEY_NUM_9:         105,

      KEY_MULTIPLY:    106,
      KEY_DIVIDE:      111,
      KEY_ADD:         107,
      KEY_SUBTRACT:    109,
      KEY_DECIMAL:     110,

      // Arrow Keys
      KEY_ARROW_LEFT:  37,
      KEY_ARROW_RIGHT: 39,
      KEY_ARROW_UP:    38,
      KEY_ARROW_DOWN:  40,

      // Modifiers
      KEY_SHIFT:       16,
      KEY_CTRL:        17,
      KEY_ALT:         18,

      KEY_SPACE: 32,

      // Letters
      KEY_A:     65,
      KEY_B:     66,
      KEY_C:     67,
      KEY_D:     68,
      KEY_E:     69,
      KEY_F:     70,
      KEY_G:     71,
      KEY_H:     72,
      KEY_I:     73,
      KEY_J:     74,
      KEY_K:     75,
      KEY_L:     76,
      KEY_M:     77,
      KEY_N:     78,
      KEY_O:     79,
      KEY_P:     80,
      KEY_Q:     81,
      KEY_R:     82,
      KEY_S:     83,
      KEY_T:     84,
      KEY_U:     85,
      KEY_V:     86,
      KEY_W:     87,
      KEY_X:     88,
      KEY_Y:     89,
      KEY_Z:     90
    };

    return Keyboard;
  }
);
