// Namespace: efe.input
efe = efe || {}; efe.input = efe.input || {};

/**
 * Mouse Information Object
 */
efe.input.EFMouse = (function(){

  /**
   * Mouse Position
   *
   * @type {Position}
   */
  var position = new Position(0, 0, 0);

  /**
   * Mouse Button States
   *
   * @type {{left: boolean, right: boolean, middle: boolean}}
   */
  var button = {
    left: false,
    right: false,
    middle: false
  };

  function constructor()
  {
    document.addEventListener(DOMEvents.MOUSE_MOVE, updatePosition);
    document.addEventListener(DOMEvents.MOUSE_UP,   buttonUp);
    document.addEventListener(DOMEvents.MOUSE_DOWN, buttonDown);
  }

  /**
   * Update Mouse Position
   *
   * @param e {MouseEvent}
   */
  function updatePosition(e)
  {
    position.setXPos(e.x);
    position.setYPos(e.y);
  }

  /**
   * Handle Mouse Button Up
   *
   * @param e {MouseEvent}
   */
  function buttonUp(e)
  {
    switch(e.button) {
      case 0:
        button.left = false;
        break;
      case 1:
        button.middle = false;
        break;
      case 2:
        button.right = false;
        break;
    }
  }

  /**
   * Handle Mouse Button Down
   *
   * @param e {MouseEvent}
   */
  function buttonDown(e)
  {
    switch(e.button) {
      case 0:
        button.left = true;
        break;
      case 1:
        button.middle = true;
        break;
      case 2:
        button.right = true;
        break;
    }
  }

  /**
   * Get Mouse Position
   *
   * @returns {Position}
   */
  function getPosition()
  {
    return position;
  }

  /**
   * Get whether or not any mouse buttons are pressed.
   *
   * @returns {boolean}
   */
  function isButtonPressed()
  {
    return (button.left || button.right || button.middle);
  }

  /**
   * Get whether or not the primary mouse button is pressed.
   *
   * @returns {boolean}
   */
  function isLeftButton()
  {
    return button.left;
  }

  /**
   * Get whether or no the secondary mouse button is pressed.
   *
   * @returns {boolean}
   */
  function isRightButton()
  {
    return button.right;
  }

  /**
   * Get whether or not the middle mouse button is pressed.
   *
   * @returns {boolean}
   */
  function isMiddleButton()
  {
    return button.middle;
  }

  constructor();
  return {
    getPosition: getPosition,
    isButtonPressed: isButtonPressed,
    isLeftButton: isLeftButton,
    isRightButton: isRightButton,
    isMiddleButton: isMiddleButton
  };
})();
