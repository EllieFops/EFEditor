/**
 * HTML Element Wrapper
 *
 * @author: Elizabeth Harper <elliefops@gmail.com>
 * @namespace: EF.c.Element
 */
EF.c.Element =
  (
    function() {

      /**
       * HTML element Wrapper
       *
       * @param e {HTMLElement|string} HTML Element or name of element to wrap.
       *
       * @constructor
       */
      function Element(e) {

        EF.c.EditorComponent.call(this);

        /**
         * Element Position
         *
         * @type {EF.lay.Position}
         */
        this.position = new EF.lay.Position();

        /**
         * Backing Element
         *
         * @type {HTMLElement}
         */
        this.element = null;

        /**
         * Parent Element
         *
         * @type {EF.c.Element}
         */
        this.par = null;

        /**
         * Child Elements
         *
         * @type {Array}
         */
        this.children = [];

        /**
         * Editor Parent Element
         *
         * @type {EF.c.Element}
         */
        this.editor = null;

        init(this, e);
      }

      Element.prototype = Object.create(EF.c.EditorComponent.prototype);

      /**
       * Initialize EF Element
       *
       * @param a {EF.c.Element}
       * @param b {HTMLElement|string}
       */
      function init(a, b) {
        if (b instanceof HTMLElement) {
          a.setElement(b);
          convertTree(a);
        }
        if (typeof b === "string") {
          a.setElement(document.createElement(b));
        }
        a.getElement().EFElement = a;
      }

      /**
       * Convert HTML tree to EF Element Tree
       *
       * NOTE: This will be called recursively each time a new EF Element calls init();
       *
       * @param e {EF.c.Element} Element who's child elements need to be converted.
       *
       * @returns {HTMLElement}
       */
      function convertTree(e) {
        var a, v, c;
        v = e.getElement();
        for (a = 0; a < v.children.length; a++) {
          c = new EF.c.Element(v.children[a]);
          a.append(c);
        }
      }

      /**
       * Verify that an element is an instance of EF.c.Element
       *
       * @param e {*}
       *
       * @returns {boolean}
       */
      Element.prototype.checkE = function(e) {
        return e instanceof EF.c.Element;
      };

      /**
       * Append this element to a provided element
       *
       * @param e {EF.c.Element} Element to append this element to.
       *
       * @returns {EF.c.Element}
       */
      Element.prototype.appendTo = function(e) {
        if (this.checkE(e)) {
          e.append(this);
        }
        return this;
      };

      /**
       * Append an element to this element.
       *
       * @param e {EF.c.Element}
       *
       * @returns {EF.c.Element}
       */
      Element.prototype.append = function(e) {
        if (this.checkE(e)) {
          e.setParent(this);
          this.element.appendChild(e.element);
          this.children.push(e);
        }
        return this;
      };

      /**
       * Move this element
       *
       * @param x {Number}
       * @param y {Number}
       * @param z {Number}
       */
      Element.prototype.move = function(x, y, z) {
        this.position.x += x || 0;
        this.position.y += y || 0;
        this.position.z += z || 0;
      };

      /**
       * Set this elements Parent element
       *
       * @param e {EF.c.Element}
       */
      Element.prototype.setParent = function(e) {
        this.par = e;
      };


      /**
       * Update this element's status
       *
       * @override
       */
      Element.prototype.update = function() {
        var s = this.element.style;
        if (this.position.fromTop) {
          s.top = this.position.y + 'px';
        } else {
          s.bottom = this.position.y + 'px';
        }
        if (this.position.fromLeft) {
          s.left = this.position.x + 'px';
        } else {
          s.right = this.position.x + 'px';
        }
        s.zIndex = this.position.z;
      };

      /**
       * Set CSS properties on this element
       *
       * These can be set either as a property: value pair or as an object of property: value pairs.
       *
       * @param p {string|Object}
       * @param s {string|number}
       */
      Element.prototype.css = function(p, s) {
        if (typeof p === "string" && (
          typeof s === "string" || typeof s === "number"
          )) {
          this.element.style.setProperty(p, s, null);
        } else if (typeof p === "object") {
          for (var i in p) {
            if (p.hasOwnProperty(i)) {
              this.css(i, p[i]);
            }
          }
        }
        return this;
      };

      /**
       * Add a class to this element.
       *
       * @param c {Array|string}
       */
      Element.prototype.addClass = function(c) {
        var a, b;
        if (typeof c === "string") {
          this.element.classList.add(c);
        } else if (c instanceof Array) {
          a = c.length;
          for (b = 0; b < a; b++) {
            this.addClass(c[b]);
          }
        }
        return this;
      };

      /**
       * Remove class from this element.
       *
       * @param c {Array|string}
       */
      Element.prototype.removeClass = function(c) {
        var a, b;
        if (typeof c === "string") {
          this.element.classList.remove(c);
        } else if (c instanceof Array) {
          a = c.length;
          for (b = 0; b < a; b++) {
            this.removeClass(c[b]);
          }
        }
      };

      /**
       * Get Element Id
       *
       * @returns {*}
       */
      Element.prototype.getId = function() {
        return this.element.id;
      };

      /**
       * Set Element Id
       *
       * @param i {string}
       *
       * @returns {EF.c.Element}
       */
      Element.prototype.setId = function(i) {
        if (i === '' || i === false || i === null) {
          this.element.removeAttribute('id');
        } else {
          this.element.id = i;
        }
        return this;
      };

      /**
       * Clone this element.
       *
       * @returns {EF.c.Element}
       */
      Element.prototype.clone = function(t) {
        return new EF.c.Element(this.element.cloneNode(t));
      };

      /**
       * Get Element Text
       *
       * @returns {string|*|innerText}
       */
      Element.prototype.getText = function() {
        return this.element.innerText;
      };

      /**
       * Set Element Text
       *
       * @param t {string} Text to set
       *
       * @returns {EF.c.Element}
       */
      Element.prototype.setText = function(t) {
        this.element.innerText = t;
        return this;
      };

      /**
       * Set Element Attribute
       *
       * @param k {string} Attribute Name
       * @param v {string} Attribute Value
       *
       * @returns {EF.c.Element}
       */
      Element.prototype.setAttr = function(k, v) {
        this.element.setAttribute(k, v);
        return this;
      };

      /**
       * Get Element Attribute Value
       *
       * @param k {string} Key to get value for.
       *
       * @returns {*|string|string|*}
       */
      Element.prototype.getAttr = function(k) {
        return this.element.getAttribute(k);
      };

      /**
       * Get Backing Element
       *
       * @returns {HTMLElement}
       */
      Element.prototype.getElement = function() {
        return this.element;
      };

      /**
       * Set Backing Element.
       *
       * NOTE: Once this has been set once it cannot be set again, attempts to do so will be ignored.
       *
       * @param e {HTMLElement}
       *
       * @returns {EF.c.Element}
       */
      Element.prototype.setElement = function(e) {
        if (!this.element) {
          this.element = e;
        }
        return this;
      };

      /**
       * Get position of this element relative to the client
       *
       * @returns {{top: Number, bottom: Number, right: Number, left: Number}}
       */
      Element.prototype.getClientPosition = function() {
        var a = this.element.getBoundingClientRect();
        return {top: a.top, bottom: a.bottom, right: a.right, left: a.left};
      };

      /**
       * Get y position of the top of this element relative to the top of the client
       *
       * @returns {Number}
       */
      Element.prototype.clientTop = function() {
        return this.element.getBoundingClientRect().top;
      };

      /**
       * Get x position of the left of this element relative to the left side of the client
       *
       * @returns {Number}
       */
      Element.prototype.clientLeft = function() {
        return this.element.getBoundingClientRect().left;
      };

      /**
       * Get x position of the right side of this element relative to the right side of the client.
       *
       * @returns {Number}
       */
      Element.prototype.clientRight = function() {
        return this.element.getBoundingClientRect().right;
      };

      /**
       * Get y position of the bottom of this element relative to the bottom of the client
       *
       * @returns {Number}
       */
      Element.prototype.clientBottom = function() {
        return this.element.getBoundingClientRect().bottom;
      };

      /**
       * Get y position of the top of this element relative to it's parent element.
       *
       * @returns {Number}
       */
      Element.prototype.offsetTop = function() {
        if (!this.par) {
          return this.clientTop();
        }
        return this.clientTop() - this.par.clientTop();
      };

      /**
       * Get x position of the left side of this element relative to the left side of it's parent.
       *
       * @returns {Number}
       */
      Element.prototype.offsetLeft = function() {
        if (!this.par) {
          return this.clientLeft();
        }
        return this.this.clientLeft() - this.par.clientLeft();
      };

      /**
       * Get x position of the right side of this element relative to the right side of it's parent.
       *
       * @returns {Number}
       */
      Element.prototype.offsetRight = function() {
        if (!this.par) {
          return this.clientRight();
        }
        return this.this.clientRight() - this.par.clientRight();
      };

      /**
       * Get y position of the bottom of this element relative to the bottom of it's parent;
       *
       * @returns {Number}
       */
      Element.prototype.offsetBottom = function() {
        if (!this.par) {
          return this.clientBottom();
        }
        return this.this.clientBottom() - this.par.clientBottom();
      };

      /**
       * Get This Element's parent element.
       *
       * @returns {EF.c.Element|*}
       */
      Element.prototype.getParent = function() {
        return this.par;
      };

      /**
       * Delete this element.
       */
      Element.prototype.remove = function() {
        this.par.element.removeChild(this.element);
        this.par.children.splice(this.par.children.indexOf(this), 1);
      };

      return Element;
    }
  )();
