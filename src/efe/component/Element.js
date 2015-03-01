/**
 * HTML Element Wrapper
 *
 * @author: Elizabeth Harper <elliefops@gmail.com>
 * @namespace: efe.component
 */
if (!efe) {var efe = {}}
if (!efe.component) {efe.component = {}}

efe.component.Element =
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

        efe.component.EditorComponent.call(this);

        /**
         * Element Position
         *
         * @type {efe.layout.Position}
         */
        this.position = new efe.layout.Position();

        /**
         * Backing Element
         *
         * @type {HTMLElement}
         */
        this.element = null;

        /**
         * Parent Element
         *
         * @type {efe.component.Element}
         */
        this.parent = null;

        /**
         * Child Elements
         *
         * @type {Array}
         */
        this.children = [];

        init(this, e);
      }

      Element.prototype = Object.create(efe.component.EditorComponent.prototype);

      /**
       * Initialize Element
       *
       * @param a {efe.component.Element}
       * @param b {HTMLElement|string}
       */
      function init(a, b) {
        if (b instanceof HTMLElement) {a.element = b}
        if (typeof b == "string") {a.element = document.create(b)}
      }

      /**
       * Verify that an element is an instance of efe.component.Element
       *
       * @param e {*}
       *
       * @returns {boolean}
       */
      Element.prototype.checkE = function(e) {
        if (!e instanceof efe.component.Element) {
          console.warn('Cannot append element to non-element object.');
          return false;
        }
        return true;
      };

      /**
       * Append this element to a provided element
       *
       * @param e {efe.component.Element} Element to append this element to.
       *
       * @returns {efe.component.Element}
       */
      Element.prototype.appendTo = function(e) {
        if (this.checkE(e)) {e.append(this);}
        return this;
      };

      /**
       * Append an element to this element.
       *
       * @param e
       *
       * @returns {efe.component.Element}
       */
      Element.prototype.append = function(e) {
        if (this.checkE(e)) {
          e.setParent(this);
          a.element.appendChild(b.element);
          a.children.push(b);
        }
        return this;
      };

      /**
       * Move this element
       *
       * @param x
       * @param y
       * @param z
       */
      Element.prototype.move = function(x, y, z) {
        this.position.x += x || 0;
        this.position.y += y || 0;
        this.position.z += z || 0;
      };

      /**
       * Set this elements Parent element
       *
       * @param e {efe.component.Element}
       */
      Element.prototype.setParent = function(e) {this.parent = e};


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
        if (typeof p == "string" && (
          typeof s == "string" || typeof s == "number"
          )) {
          this.element.style.setProperty(p, s, null);
        } else if (typeof p == "object") {
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
        if (typeof c == "string") {
          this.element.classList.add(c)
        } else if (c instanceof Array) {
          a = c.length;
          for (b = 0; b < a; b++) {this.addClass(c[b]);}
        }
        return this;
      };

      /**
       * Remove class from this element.
       *
       * @param c {Array|string}
       */
      Element.prototype.removeClass = function(c) {
        var a,b;
        if (typeof c == "string") {
          this.element.classList.remove(c);
        } else if (c instanceof Array) {
          a = c.length;
          for (b=0;b<a;b++){this.removeClass(c[b])}
        }
      };

      /**
       * Get Element Id
       *
       * @returns {*}
       */
      Element.prototype.getId = function() {return this.element.id};

      /**
       * Set Element Id
       *
       * @param i {string}
       *
       * @returns {efe.component.Element}
       */
      Element.prototype.setId = function(i) {this.element.id=i;return this};

      /**
       * Clone this element.
       *
       * @returns {efe.component.Element}
       */
      Element.prototype.clone = function() {return new efe.component.Element(this.element.cloneNode())};

      Element.prototype.getText = function() {return this.element.innerText};

      Element.prototype.setText = function(t) {this.element.innerText=t; return this};

      return Element;
    }
  )();
