/**
 * Element
 *
 * @class     BasicElement
 * @namespace element
 *
 * @module  EFEditor
 * @since   0.0.1
 * @version 0.0.1
 *
 * @author Elizabeth Harper <elliefops@gmail.com>
 *
 * @constructor
 * @param element {HTMLElement|String}
 */
EFEditor.element.BasicElement = function(element) {

  var self;

  /**
   * Local Access Var
   *
   * @type {BasicElement}
   */
  self = this;

  /**
   * Backing HTML Element
   *
   * @property htmlElement
   *
   * @type {HTMLElement}
   */
  self.htmlElement = null;

  /**
   * Parent Element
   *
   * @property parent
   *
   * @type {BasicElement}
   */
  self.parent  = null;

  /**
   * Child Elements
   *
   * @property children
   *
   * @type {BasicElement[]}
   */
  self.children = [];


  function init() {

    if (element instanceof HTMLElement) {
      setElement(element);
      convertTree(element);
    } else if (typeof element === "string") {
      setElement(document.createElement(element));
    } else {
      throw Error("Invalid argument type! Expected HTMLElement or string.");
    }

    self.htmlElement.EFElement = self;
  } init();

  /**
   * Set Backing Element
   *
   * @private
   * @method setElement
   *
   * @param  {HTMLElement|string} element
   *
   * @chainable
   * @return {BasicElement}
   */
  function setElement(element) {
    self.htmlElement = element;
    return self;
  }

  /**
   * Convert HTML tree to EF Element Tree
   *
   * NOTE: This will be called recursively each time a new EF Element calls init();
   *
   * @private
   * @method convertTree
   *
   * @param e {HTMLElement} Element who's child elements need to be converted.
   */
  function convertTree(e) {
    var a, v, c;
    v = e.getElement();
    for (a = 0; a < v.children.length; a++) {
      c = new EFEditor.element.BasicElement(v.children[a]);
      a.append(c);
    }
  }

  /**
   * Get Backing HTML Element
   *
   * @method getHTMLElement
   *
   * @returns {null|*|HTMLElement}
   */
  self.getHTMLElement = function() {
    return self.htmlElement;
  };

  /**
   * Get Parent Element
   *
   * @method getParentElement
   *
   * @returns {BasicElement}
   */
  self.getParentElement = function() {
    return self.parent;
  };

  /**
   * Get a non-live array of all the children in this Element.
   *
   * @method getChildren
   *
   * @returns {BasicElement[]}
   */
  self.getChildren = function() {
    return self.children.slice();
  };

  /**
   * Get backing element's ID
   *
   * @method getId
   *
   * @returns {string}
   */
  self.getId = function() {
    return self.htmlElement.id;
  };

  /**
   * Set Backing element's ID
   *
   * @method setId
   *
   * @param [i] {string} Optional ID to set on the backing element, if none is specified the attribute will be removed.
   *
   * @chainable
   * @returns {BasicElement}
   */
  self.setId = function(i) {
    self.setAttr('id', i);
    return self;
  };

  /**
   * Get backing element attribute
   *
   * @method getAttr
   *
   * @param key {string}
   *
   * @returns {string}
   */
  self.getAttr = function(key) {
    return self.htmlElement.getAttribute(key);
  };

  /**
   * Set attribute on backing HTMLElement
   *
   * @method setAttr
   *
   * @param key     {string} Key to set.
   * @param [value] {string} Optional value to set, if none is specified the attribute will be removed.
   *
   * @chainable
   * @returns {BasicElement}
   */
  self.setAttr = function(key, value) {
    if (!value) {
      self.htmlElement.removeAttribute(key);
    } else {
      self.htmlElement.setAttribute(key, value);
    }
    return self;
  };

  /**
   * Delete this element.
   *
   * @method remove
   */
  self.remove = function() {
    this.parent.element.removeChild(this.element);
    this.parent.children.splice(this.parent.children.indexOf(this), 1);
  };

  /**
   * Clone this element.
   *
   * @method clone
   *
   * @returns {EFEditor.Element}
   */
  self.clone = function(t) {
    return new EFEditor.Element(this.element.cloneNode(t));
  };

  /**
   * Set CSS properties on this element
   *
   * These can be set either as a property: value pair or as an object of property: value pairs.
   *
   * @method css
   *
   * @param p   {string|Object}
   * @param [s] {string|number}
   *
   * @chainable
   * @return {BasicElement}
   */
  self.css = function(p, s) {
    if (typeof p === "string" && (
      typeof s === "string" || typeof s === "number"
      )) {
      self.element.style.setProperty(p, s, null);
    }
    else if (typeof p === "object") {
      for (var i in p) {
        if (p.hasOwnProperty(i)) {
          self.css(i, p[i]);
        }
      }
    }
    return self;
  };

  /**
   * Append this element to a provided element
   *
   * @method appendTo
   *
   * @param element {BasicElement} Element to append this element to.
   *
   * @chainable
   * @returns {BasicElement}
   */
  self.appendTo = function(element) {
    element.append(self);
    return self;
  };

  /**
   * Append an element to this element.
   *
   * @method append
   *
   * @param element {BasicElement}
   *
   * @chainable
   * @returns {BasicElement}
   */
  self.append = function(element) {
    if (element instanceof EFEditor.element.BasicElement) {
      self.parent = element;
      self.parent.children.push(self);
      self.parent.element.appendChild(self.element);
    }
    return self;
  };


  /**
   * Add a class to this element.
   *
   * @method addClass
   *
   * @param className {Array|string}
   *
   * @chainable
   * @return {BasicElement}
   */
  self.addClass = function(className) {
    var a, b;
    if (typeof className === "string") {
      self.element.classList.add(className);
    }
    else if (className instanceof Array) {
      a = className.length;
      for (b = 0; b < a; b++) {
        self.addClass(className[b]);
      }
    }
    return self;
  };

  /**
   * Remove class from this element.
   *
   * @method removeClass
   *
   * @param className {Array|string}
   *
   * @chainable
   * @return {BasicElement}
   */
  self.removeClass = function(className) {
    var a, b;
    if (typeof className === "string") {

      self.element.classList.remove(className);

    }
    else if (className instanceof Array) {

      a = className.length;
      for (b = 0; b < a; b++) {
        self.removeClass(className[b]);
      }

    }

    return self;
  };

  /**
   * Check whether or not this element has a given class
   *
   * @method hasClass
   *
   * @param className {string} Class name to check for.
   *
   * @returns {boolean}
   */
  self.hasClass = function (className)
  {
    return self.htmlElement.classList.contains(className);
  };

  /**
   * Get Element Text
   *
   * @method getText
   *
   * @returns {string|*|innerText}
   */
  self.getText = function() {
    return self.element.innerText;
  };

  /**
   * Set Element Text
   *
   * @method setText
   *
   * @param text {string} Text to set
   *
   * @chainable
   * @returns {BasicElement}
   */
  self.setText = function(text) {
    self.element.innerText = text;
    return self;
  };
};
