/**
 * Mouse Information Object
 *
 * @author: Elizabeth Harper <elliefops@gmail.com>
 * @namespace: efe.i
 */
EF.i.Mouse = (function(){

  var mouse = {
    PRIMARY: 0,
    MIDDLE: 1,
    SECONDARY: 2
  };

  /**
   * Mouse Position
   *
   * @type {EF.lay.Position}
   */
  var pos = new EF.lay.Position(0, 0, 0);

  /**
   * Mouse Button States
   *
   * @type {{l: boolean, r: boolean, m: boolean}}
   */
  var but = {
    l: false,
    r: false,
    m: false
  };

  function constructor()
  {
    document.addEventListener(EF.dom.Events.MOUSE_MOVE, uP);
    document.addEventListener(EF.dom.Events.MOUSE_UP,   bU);
    document.addEventListener(EF.dom.Events.MOUSE_DOWN, bD);
  }

  /**
   * Update Mouse Position
   *
   * @param e {MouseEvent}
   */
  function uP(e)
  {
    pos.setXPos(e.clientX);
    pos.setYPos(e.clientY);
  }

  /**
   * Handle Mouse Button Up
   *
   * @param e {MouseEvent}
   */
  function bU(e)
  {
    switch(e.button) {
      case 0:
        but.l = false;
        break;
      case 1:
        but.m = false;
        break;
      case 2:
        but.r = false;
        break;
    }
  }

  /**
   * Handle Mouse Button Down
   *
   * @param e {MouseEvent}
   */
  function bD(e)
  {
    switch(e.button) {
      case 0:
        but.l = true;
        break;
      case 1:
        but.m = true;
        break;
      case 2:
        but.r = true;
        break;
    }
  }

  /**
   * Get Mouse Position
   *
   * @returns {EF.lay.Position}
   */
  mouse.getPosition = function()
  {
    return pos;
  };

  /**
   * Get whether or not any mouse buttons are pressed.
   *
   * @returns {boolean}
   */
  mouse.isButtonPressed = function()
  {
    return (but.l || but.r || but.m);
  };

  /**
   * Get whether or not the primary mouse button is pressed.
   *
   * @returns {boolean}
   */
  mouse.isLeftButton = function()
  {
    return but.l;
  }

  /**
   * Get whether or no the secondary mouse button is pressed.
   *
   * @returns {boolean}
   */
  mouse.isRightButton = function()
  {
    return but.r;
  };

  /**
   * Get whether or not the m mouse button is pressed.
   *
   * @returns {boolean}
   */
  mouse.isMiddleButton = function()
  {
    return but.m;
  };

  constructor();
  return mouse;
})();
