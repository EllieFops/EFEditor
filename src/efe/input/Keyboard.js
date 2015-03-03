/**
 * Keyboard Information
 *
 * @author: Elizabeth Harper <elliefops@gmail.com>
 * @namespace: efe.i
 */
EF.i.Keyboard =
  (
    function() {

      /**
       * Cached BrowserType
       *
       * @type {number}
       */
      var bT;

      var Keys = {


        /**
         * KEY_TAB
         *
         * @returns {number}
         */
        get KEY_ESC() {return 27;},

        /**
         * KEY_TAB
         *
         * @returns {number}
         */
        get KEY_BACKSPACE() {return 8;},

        /**
         * KEY_TAB
         *
         * @returns {number}
         */
        get KEY_TAB() {return 9;},

        /**
         * KEY_INSERT
         *
         * @returns {number}
         */
        get KEY_INSERT() {return 45;},

        /**
         * KEY_DELETE
         *
         * @returns {number}
         */
        get KEY_DELETE() {return 46;},

        /**
         * KEY_PAGE_UP
         *
         * @returns {number}
         */
        get KEY_PAGE_UP() {return 33;},

        /**
         * KEY_PAGE_DOWN
         *
         * @returns {number}
         */
        get KEY_PAGE_DOWN() {return 34;},

        /**
         * KEY_HOME
         *
         * @returns {number}
         */
        get KEY_HOME() {return 36;},

        /**
         * KEY_END
         * @returns {number}
         */
        get KEY_END() {return 35;},

        /**
         * KEY_PRINT_SCREEN
         * @returns {number}
         */
        get KEY_PRINT_SCREEN() {return 0;},

        /**
         * KEY_PAUSE
         * @returns {number}
         */
        get KEY_PAUSE() {return 19;},

        /**
         * KEY_ENTER
         * @returns {number}
         */
        get KEY_ENTER() {return 13;},

        /**
         * KEY_NUM_CENTER
         * @returns {number}
         */
        get KEY_NUM_CENTER() {return 12;},

        /**
         * KEY_CAPS_LOCK
         * @returns {number}
         */
        get KEY_CAPS_LOCK() {return 20;},

        /**
         * KEY_NUM_LOCK
         * @returns {number}
         */
        get KEY_NUM_LOCK() {return 144;},

        /**
         * KEY_SCROLL_LOCK
         * @returns {number}
         */
        get KEY_SCROLL_LOCK() {return 145;},

        /**
         * KEY_DASH
         * @returns {number}
         */
        get KEY_DASH() {
          switch (EF.App.getBrowserType()) {
            case EF.d.Browser.FIREFOX:
              return 173;
            case EF.d.Browser.OPERA:
              return 45;
            default:
              return 189;
          }
        },

        /**
         * KEY_COMMA
         *
         * @returns {number}
         */
        get KEY_COMMA() {
          switch (EF.App.getBrowserType()) {
            case EF.d.Browser.OPERA:
              return 44;
            default:
              return 188;
          }
        },

        /**
         * KEY_PERIOD
         *
         * @returns {number}
         */
        get KEY_PERIOD() {
          switch (EF.App.getBrowserType()) {
            case EF.d.Browser.OPERA:
              return 46;
            default:
              return 190;
          }
        },


        /**
         * KEY_OPEN_BRACKET
         *
         * @returns {number}
         */
        get KEY_OPEN_BRACKET() {
          switch (EF.App.getBrowserType()) {
            case EF.d.Browser.OPERA:
              return 91;
            default:
              return 219;
          }
        },

        /**
         * KEY_CLOSE_BRACKET
         *
         * @returns {number}
         */
        get KEY_CLOSE_BRACKET() {return 221;},

        /**
         * KEY_EQUALS_SIGN
         *
         * @returns {number}
         */
        get KEY_EQUALS_SIGN() {
          switch (bT) {
            case EF.d.Browser.FIREFOX:
            case EF.d.Browser.OPERA:
              return 61;
            default:
              return 187;
          }
        },

        /**
         * KEY_FORWARD_SLASH
         *
         * @returns {number}
         */
        get KEY_FORWARD_SLASH() {
          switch (bT) {
            case EF.d.Browser.OPERA:
              return 47;
            default:
              return 191;
          }
        },

        /**
         * KEY_BACK_SLASH
         * @returns {number}
         */
        get KEY_BACK_SLASH() {return 220;},
        /**
         * KEY_APOSTROPHE
         * @returns {number}
         */
        get KEY_APOSTROPHE() {return 222;},
        /**
         * KEY_GRAVE_ACCENT
         * @returns {number}
         */
        get KEY_GRAVE_ACCENT() {return 192;},

        /**
         * KEY_SEMICOLON
         *
         * @returns {number}
         */
        get KEY_SEMICOLON() {
          switch (bT) {
            case EF.d.Browser.FIREFOX:
              return 59;
            case EF.d.Browser.OPERA:
              return 59;
            default:
              return 186;
          }
        },

        // F# Keys
        /**
         * KEY_F1
         * @returns {number}
         */
        get KEY_F1() {return 112;},
        /**
         * KEY_F2
         * @returns {number}
         */
        get KEY_F2() {return 113;},
        /**
         * KEY_F3
         * @returns {number}
         */
        get KEY_F3() {return 114;},
        /**
         * KEY_F4
         * @returns {number}
         */
        get KEY_F4() {return 115;},
        /**
         * KEY_F5
         * @returns {number}
         */
        get KEY_F5() {return 116;},
        /**
         * KEY_F6
         * @returns {number}
         */
        get KEY_F6() {return 117;},
        /**
         * KEY_F7
         * @returns {number}
         */
        get KEY_F7() {return 118;},
        /**
         * KEY_F8
         * @returns {number}
         */
        get KEY_F8() {return 119;},
        /**
         * KEY_F9
         * @returns {number}
         */
        get KEY_F9() {return 120;},
        /**
         * KEY_F10
         * @returns {number}
         */
        get KEY_F10() {return 121;},
        /**
         * KEY_F11
         * @returns {number}
         */
        get KEY_F11() {return 122;},
        /**
         * KEY_F12
         * @returns {number}
         */
        get KEY_F12() {return 123;},

        // DIGITS
        /**
         * KEY_0
         * @returns {number}
         */
        get KEY_0() {return 48;},
        /**
         * KEY_1
         * @returns {number}
         */
        get KEY_1() {return 49;},
        /**
         * KEY_2
         * @returns {number}
         */
        get KEY_2() {return 50;},
        /**
         * KEY_3
         * @returns {number}
         */
        get KEY_3() {return 51;},
        /**
         * KEY_4
         * @returns {number}
         */
        get KEY_4() {return 52;},
        /**
         * KEY_5
         * @returns {number}
         */
        get KEY_5() {return 53;},
        /**
         * KEY_6
         * @returns {number}
         */
        get KEY_6() {return 54;},
        /**
         * KEY_7
         * @returns {number}
         */
        get KEY_7() {return 55;},
        /**
         * KEY_8
         * @returns {number}
         */
        get KEY_8() {return 56;},
        /**
         * KEY_9
         * @returns {number}
         */
        get KEY_9() {return 57;},

        // NumPad Digits
        /**
         * KEY_NUM_0
         * @returns {number}
         */
        get KEY_NUM_0() {return 96;},
        /**
         * KEY_NUM_1
         * @returns {number}
         */
        get KEY_NUM_1() {return 97;},
        /**
         * KEY_NUM_2
         * @returns {number}
         */
        get KEY_NUM_2() {return 98;},
        /**
         * KEY_NUM_3
         * @returns {number}
         */
        get KEY_NUM_3() {return 99;},
        /**
         * KEY_NUM_4
         * @returns {number}
         */
        get KEY_NUM_4() {return 100;},
        /**
         * KEY_NUM_5
         * @returns {number}
         */
        get KEY_NUM_5() {return 101;},
        /**
         * KEY_NUM_6
         * @returns {number}
         */
        get KEY_NUM_6() {return 102;},
        /**
         * KEY_NUM_7
         * @returns {number}
         */
        get KEY_NUM_7() {return 103;},
        /**
         * KEY_NUM_8
         * @returns {number}
         */
        get KEY_NUM_8() {return 104;},
        /**
         * KEY_NUM_9
         * @returns {number}
         */
        get KEY_NUM_9() {return 105;},

        /**

         * KEY_MULTIPLY

         * @returns {number}

         */

        get KEY_MULTIPLY() {return 106;},
        /**
         * KEY_DIVIDE
         * @returns {number}
         */
        get KEY_DIVIDE() {return 111;},
        /**
         * KEY_ADD
         * @returns {number}
         */
        get KEY_ADD() {return 107;},
        /**
         * KEY_SUBTRACT
         * @returns {number}
         */
        get KEY_SUBTRACT() {return 109;},
        /**
         * KEY_DECIMAL
         * @returns {number}
         */
        get KEY_DECIMAL() {return 110;},

        // Arrow Keys
        /**
         * KEY_ARROW_LEFT
         * @returns {number}
         */
        get KEY_ARROW_LEFT() {return 37;},
        /**
         * KEY_ARROW_RIGHT
         * @returns {number}
         */
        get KEY_ARROW_RIGHT() {return 39;},
        /**
         * KEY_ARROW_UP
         * @returns {number}
         */
        get KEY_ARROW_UP() {return 38;},
        /**
         * KEY_ARROW_DOWN
         * @returns {number}
         */
        get KEY_ARROW_DOWN() {return 40;},

        // Modifiers
        /**
         * KEY_SHIFT
         * @returns {number}
         */
        get KEY_SHIFT() {return 16;},
        /**
         * KEY_CTRL
         * @returns {number}
         */
        get KEY_CTRL() {return 17;},
        /**
         * KEY_ALT
         * @returns {number}
         */
        get KEY_ALT() {return 18;},

        /**
         * KEY_SPACE
         * @returns {number}
         */
        get KEY_SPACE() {return 32;},

        // Letters
        /**
         * KEY_A
         * @returns {number}
         */
        get KEY_A() {return 65;},
        /**
         * KEY_B
         * @returns {number}
         */
        get KEY_B() {return 66;},
        /**
         * KEY_C
         * @returns {number}
         */
        get KEY_C() {return 67;},
        /**
         * KEY_D
         * @returns {number}
         */
        get KEY_D() {return 68;},
        /**
         * KEY_E
         * @returns {number}
         */
        get KEY_E() {return 69;},
        /**
         * KEY_F
         * @returns {number}
         */
        get KEY_F() {return 70;},
        /**
         * KEY_G
         * @returns {number}
         */
        get KEY_G() {return 71;},
        /**
         * KEY_H
         * @returns {number}
         */
        get KEY_H() {return 72;},
        /**
         * KEY_I
         * @returns {number}
         */
        get KEY_I() {return 73;},
        /**
         * KEY_J
         * @returns {number}
         */
        get KEY_J() {return 74;},
        /**
         * KEY_K
         * @returns {number}
         */
        get KEY_K() {return 75;},
        /**
         * KEY_L
         * @returns {number}
         */
        get KEY_L() {return 76;},
        /**
         * KEY_M
         * @returns {number}
         */
        get KEY_M() {return 77;},
        /**
         * KEY_N
         * @returns {number}
         */
        get KEY_N() {return 78;},
        /**
         * KEY_O
         * @returns {number}
         */
        get KEY_O() {return 79;},
        /**
         * KEY_P
         * @returns {number}
         */
        get KEY_P() {return 80;},
        /**
         * KEY_Q
         * @returns {number}
         */
        get KEY_Q() {return 81;},
        /**
         * KEY_R
         * @returns {number}
         */
        get KEY_R() {return 82;},
        /**
         * KEY_S
         * @returns {number}
         */
        get KEY_S() {return 83;},
        /**
         * KEY_T
         * @returns {number}
         */
        get KEY_T() {return 84;},
        /**
         * KEY_U
         * @returns {number}
         */
        get KEY_U() {return 85;},
        /**
         * KEY_V
         * @returns {number}
         */
        get KEY_V() {return 86;},
        /**
         * KEY_W
         * @returns {number}
         */
        get KEY_W() {return 87;},
        /**
         * KEY_X
         * @returns {number}
         */
        get KEY_X() {return 88;},
        /**
         * KEY_Y
         * @returns {number}
         */
        get KEY_Y() {return 89;},
        /**
         * KEY_Z
         * @returns {number}
         */
        get KEY_Z() {return 90;}
      };

      var pressedKeys = {};

      function constructor() {
        bT = EF.App.getBrowserType();
      }

      Keys.isKeyPressed = function(key) {
        return (
          pressedKeys[key]
        ) ? true : false;
      };

      constructor();
      return {
        Keys:         Keys,
        isKeyPressed: 0
      };
    }
  )();
