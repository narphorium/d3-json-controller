(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-selection')) :
  typeof define === 'function' && define.amd ? define(['exports', 'd3-selection'], factory) :
  (global = global || self, factory(global.d3 = global.d3 || {}, global.d3));
}(this, function (exports, d3Selection) { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck$1(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }

  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !_isNativeFunction(Class)) return Class;

      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }

      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);

        _cache.set(Class, Wrapper);
      }

      function Wrapper() {
        return _construct(Class, arguments, _getPrototypeOf(this).constructor);
      }

      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf(Wrapper, Class);
    };

    return _wrapNativeSuper(Class);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  /* eslint-disable no-eval, jsdoc/check-types */
  // Todo: Reenable jsdoc/check-types once PR merged: https://github.com/gajus/eslint-plugin-jsdoc/pull/270
  var globalEval = eval; // eslint-disable-next-line import/no-commonjs

  var supportsNodeVM = typeof module !== 'undefined' && Boolean(module.exports) && !(typeof navigator !== 'undefined' && navigator.product === 'ReactNative');
  var allowedResultTypes = ['value', 'path', 'pointer', 'parent', 'parentProperty', 'all'];
  var hasOwnProp = Object.prototype.hasOwnProperty;
  /**
  * @typedef {null|boolean|number|string|PlainObject|GenericArray} JSONObject
  */

  /**
  * @callback ConditionCallback
  * @param item
  * @returns {boolean}
  */

  /**
   * Copy items out of one array into another.
   * @param {Array} source Array with items to copy
   * @param {Array} target Array to which to copy
   * @param {ConditionCallback} conditionCb Callback passed the current item; will move
   *     item if evaluates to `true`
   * @returns {undefined}
   */

  var moveToAnotherArray = function moveToAnotherArray(source, target, conditionCb) {
    var il = source.length;

    for (var i = 0; i < il; i++) {
      var item = source[i];

      if (conditionCb(item)) {
        target.push(source.splice(i--, 1)[0]);
      }
    }
  };

  var vm = supportsNodeVM ? require('vm') : {
    /**
     * @param {string} expr Expression to evaluate
     * @param {PlainObject} context Object whose items will be added to evaluation
     * @returns {Any} Result of evaluated code
     */
    runInNewContext: function runInNewContext(expr, context) {
      var keys = Object.keys(context);
      var funcs = [];
      moveToAnotherArray(keys, funcs, function (key) {
        return typeof context[key] === 'function';
      });
      var code = funcs.reduce(function (s, func) {
        var fString = context[func].toString();

        if (!/function/.exec(fString)) {
          fString = 'function ' + fString;
        }

        return 'var ' + func + '=' + fString + ';' + s;
      }, '') + keys.reduce(function (s, vr) {
        return 'var ' + vr + '=' + JSON.stringify(context[vr]).replace( // http://www.thespanner.co.uk/2011/07/25/the-json-specification-is-now-wrong/
        /\u2028|\u2029/g, function (m) {
          return "\\u202" + (m === "\u2028" ? '8' : '9');
        }) + ';' + s;
      }, expr);
      return globalEval(code);
    }
  };
  /**
   * Copies array and then pushes item into it.
   * @param {Array} arr Array to copy and into which to push
   * @param {Any} item Array item to add (to end)
   * @returns {Array} Copy of the original array
   */

  function push(arr, item) {
    arr = arr.slice();
    arr.push(item);
    return arr;
  }
  /**
   * Copies array and then unshifts item into it.
   * @param {Any} item Array item to add (to beginning)
   * @param {Array} arr Array to copy and into which to unshift
   * @returns {Array} Copy of the original array
   */


  function unshift(item, arr) {
    arr = arr.slice();
    arr.unshift(item);
    return arr;
  }
  /**
   * Caught when JSONPath is used without `new` but rethrown if with `new`
   * @extends Error
   */


  var NewError =
  /*#__PURE__*/
  function (_Error) {
    _inherits(NewError, _Error);

    /**
     * @param {Any} value The evaluated scalar value
     */
    function NewError(value) {
      var _this;

      _classCallCheck$1(this, NewError);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(NewError).call(this, 'JSONPath should not be called with "new" (it prevents return of (unwrapped) scalar values)'));
      _this.avoidNew = true;
      _this.value = value;
      _this.name = 'NewError';
      return _this;
    }

    return NewError;
  }(_wrapNativeSuper(Error));
  /**
  * @typedef {PlainObject} ReturnObject
  * @property {string} path
  * @property {JSONObject} value
  * @property {PlainObject|GenericArray} parent
  * @property {string} parentProperty
  */

  /**
  * @callback JSONPathCallback
  * @param {string|PlainObject} preferredOutput
  * @param {"value"|"property"} type
  * @param {ReturnObject} fullRetObj
  */

  /**
  * @callback OtherTypeCallback
  * @param {JSONObject} val
  * @param {string} path
  * @param {PlainObject|GenericArray} parent
  * @param {string} parentPropName
  */

  /**
   * @param {PlainObject} [opts] If present, must be an object
   * @param {string} expr JSON path to evaluate
   * @param {JSON} obj JSON object to evaluate against
   * @param {JSONPathCallback} callback Passed 3 arguments: 1) desired payload per `resultType`,
   *     2) `"value"|"property"`, 3) Full returned object with all payloads
   * @param {OtherTypeCallback} otherTypeCallback If `@other()` is at the end of one's query, this
   *  will be invoked with the value of the item, its path, its parent, and its parent's
   *  property name, and it should return a boolean indicating whether the supplied value
   *  belongs to the "other" type or not (or it may handle transformations and return `false`).
   * @returns {JSONPath}
   * @class
   */


  function JSONPath(opts, expr, obj, callback, otherTypeCallback) {
    // eslint-disable-next-line no-restricted-syntax
    if (!(this instanceof JSONPath)) {
      try {
        return new JSONPath(opts, expr, obj, callback, otherTypeCallback);
      } catch (e) {
        if (!e.avoidNew) {
          throw e;
        }

        return e.value;
      }
    }

    if (typeof opts === 'string') {
      otherTypeCallback = callback;
      callback = obj;
      obj = expr;
      expr = opts;
      opts = {};
    }

    opts = opts || {};
    var objArgs = hasOwnProp.call(opts, 'json') && hasOwnProp.call(opts, 'path');
    this.json = opts.json || obj;
    this.path = opts.path || expr;
    this.resultType = opts.resultType && opts.resultType.toLowerCase() || 'value';
    this.flatten = opts.flatten || false;
    this.wrap = hasOwnProp.call(opts, 'wrap') ? opts.wrap : true;
    this.sandbox = opts.sandbox || {};
    this.preventEval = opts.preventEval || false;
    this.parent = opts.parent || null;
    this.parentProperty = opts.parentProperty || null;
    this.callback = opts.callback || callback || null;

    this.otherTypeCallback = opts.otherTypeCallback || otherTypeCallback || function () {
      throw new Error('You must supply an otherTypeCallback callback option with the @other() operator.');
    };

    if (opts.autostart !== false) {
      var ret = this.evaluate({
        path: objArgs ? opts.path : expr,
        json: objArgs ? opts.json : obj
      });

      if (!ret || _typeof(ret) !== 'object') {
        throw new NewError(ret);
      }

      return ret;
    }
  } // PUBLIC METHODS


  JSONPath.prototype.evaluate = function (expr, json, callback, otherTypeCallback) {
    var that = this;
    var currParent = this.parent,
        currParentProperty = this.parentProperty;
    var flatten = this.flatten,
        wrap = this.wrap;
    this.currResultType = this.resultType;
    this.currPreventEval = this.preventEval;
    this.currSandbox = this.sandbox;
    callback = callback || this.callback;
    this.currOtherTypeCallback = otherTypeCallback || this.otherTypeCallback;
    json = json || this.json;
    expr = expr || this.path;

    if (expr && _typeof(expr) === 'object') {
      if (!expr.path) {
        throw new Error('You must supply a "path" property when providing an object argument to JSONPath.evaluate().');
      }

      json = hasOwnProp.call(expr, 'json') ? expr.json : json;
      flatten = hasOwnProp.call(expr, 'flatten') ? expr.flatten : flatten;
      this.currResultType = hasOwnProp.call(expr, 'resultType') ? expr.resultType : this.currResultType;
      this.currSandbox = hasOwnProp.call(expr, 'sandbox') ? expr.sandbox : this.currSandbox;
      wrap = hasOwnProp.call(expr, 'wrap') ? expr.wrap : wrap;
      this.currPreventEval = hasOwnProp.call(expr, 'preventEval') ? expr.preventEval : this.currPreventEval;
      callback = hasOwnProp.call(expr, 'callback') ? expr.callback : callback;
      this.currOtherTypeCallback = hasOwnProp.call(expr, 'otherTypeCallback') ? expr.otherTypeCallback : this.currOtherTypeCallback;
      currParent = hasOwnProp.call(expr, 'parent') ? expr.parent : currParent;
      currParentProperty = hasOwnProp.call(expr, 'parentProperty') ? expr.parentProperty : currParentProperty;
      expr = expr.path;
    }

    currParent = currParent || null;
    currParentProperty = currParentProperty || null;

    if (Array.isArray(expr)) {
      expr = JSONPath.toPathString(expr);
    }

    if (!expr || !json || !allowedResultTypes.includes(this.currResultType)) {
      return undefined;
    }

    this._obj = json;
    var exprList = JSONPath.toPathArray(expr);

    if (exprList[0] === '$' && exprList.length > 1) {
      exprList.shift();
    }

    this._hasParentSelector = null;

    var result = this._trace(exprList, json, ['$'], currParent, currParentProperty, callback).filter(function (ea) {
      return ea && !ea.isParentSelector;
    });

    if (!result.length) {
      return wrap ? [] : undefined;
    }

    if (result.length === 1 && !wrap && !Array.isArray(result[0].value)) {
      return this._getPreferredOutput(result[0]);
    }

    return result.reduce(function (rslt, ea) {
      var valOrPath = that._getPreferredOutput(ea);

      if (flatten && Array.isArray(valOrPath)) {
        rslt = rslt.concat(valOrPath);
      } else {
        rslt.push(valOrPath);
      }

      return rslt;
    }, []);
  }; // PRIVATE METHODS


  JSONPath.prototype._getPreferredOutput = function (ea) {
    var resultType = this.currResultType;

    switch (resultType) {
      default:
        throw new TypeError('Unknown result type');

      case 'all':
        ea.pointer = JSONPath.toPointer(ea.path);
        ea.path = typeof ea.path === 'string' ? ea.path : JSONPath.toPathString(ea.path);
        return ea;

      case 'value':
      case 'parent':
      case 'parentProperty':
        return ea[resultType];

      case 'path':
        return JSONPath.toPathString(ea[resultType]);

      case 'pointer':
        return JSONPath.toPointer(ea.path);
    }
  };

  JSONPath.prototype._handleCallback = function (fullRetObj, callback, type) {
    if (callback) {
      var preferredOutput = this._getPreferredOutput(fullRetObj);

      fullRetObj.path = typeof fullRetObj.path === 'string' ? fullRetObj.path : JSONPath.toPathString(fullRetObj.path); // eslint-disable-next-line callback-return

      callback(preferredOutput, type, fullRetObj);
    }
  };
  /**
   *
   * @param {string} expr
   * @param {JSONObject} val
   * @param {string} path
   * @param {PlainObject|GenericArray} parent
   * @param {string} parentPropName
   * @param {JSONPathCallback} callback
   * @param {boolean} literalPriority
   * @returns {ReturnObject|ReturnObject[]}
   */


  JSONPath.prototype._trace = function (expr, val, path, parent, parentPropName, callback, literalPriority) {
    // No expr to follow? return path and value as the result of this trace branch
    var retObj;
    var that = this;

    if (!expr.length) {
      retObj = {
        path: path,
        value: val,
        parent: parent,
        parentProperty: parentPropName
      };

      this._handleCallback(retObj, callback, 'value');

      return retObj;
    }

    var loc = expr[0],
        x = expr.slice(1); // We need to gather the return value of recursive trace calls in order to
    // do the parent sel computation.

    var ret = [];
    /**
     *
     * @param {ReturnObject|ReturnObject[]} elems
     * @returns {void}
     */

    function addRet(elems) {
      if (Array.isArray(elems)) {
        // This was causing excessive stack size in Node (with or without Babel) against our performance test: `ret.push(...elems);`
        elems.forEach(function (t) {
          ret.push(t);
        });
      } else {
        ret.push(elems);
      }
    }

    if ((typeof loc !== 'string' || literalPriority) && val && hasOwnProp.call(val, loc)) {
      // simple case--directly follow property
      addRet(this._trace(x, val[loc], push(path, loc), val, loc, callback));
    } else if (loc === '*') {
      // all child properties
      // eslint-disable-next-line no-shadow
      this._walk(loc, x, val, path, parent, parentPropName, callback, function (m, l, x, v, p, par, pr, cb) {
        addRet(that._trace(unshift(m, x), v, p, par, pr, cb, true));
      });
    } else if (loc === '..') {
      // all descendent parent properties
      addRet(this._trace(x, val, path, parent, parentPropName, callback)); // Check remaining expression with val's immediate children
      // eslint-disable-next-line no-shadow

      this._walk(loc, x, val, path, parent, parentPropName, callback, function (m, l, x, v, p, par, pr, cb) {
        // We don't join m and x here because we only want parents, not scalar values
        if (_typeof(v[m]) === 'object') {
          // Keep going with recursive descent on val's object children
          addRet(that._trace(unshift(l, x), v[m], push(p, m), v, m, cb));
        }
      }); // The parent sel computation is handled in the frame above using the
      // ancestor object of val

    } else if (loc === '^') {
      // This is not a final endpoint, so we do not invoke the callback here
      this._hasParentSelector = true;
      return path.length ? {
        path: path.slice(0, -1),
        expr: x,
        isParentSelector: true
      } : [];
    } else if (loc === '~') {
      // property name
      retObj = {
        path: push(path, loc),
        value: parentPropName,
        parent: parent,
        parentProperty: null
      };

      this._handleCallback(retObj, callback, 'property');

      return retObj;
    } else if (loc === '$') {
      // root only
      addRet(this._trace(x, val, path, null, null, callback));
    } else if (/^(-?\d*):(-?\d*):?(\d*)$/.test(loc)) {
      // [start:end:step]  Python slice syntax
      addRet(this._slice(loc, x, val, path, parent, parentPropName, callback));
    } else if (loc.indexOf('?(') === 0) {
      // [?(expr)] (filtering)
      if (this.currPreventEval) {
        throw new Error('Eval [?(expr)] prevented in JSONPath expression.');
      } // eslint-disable-next-line no-shadow


      this._walk(loc, x, val, path, parent, parentPropName, callback, function (m, l, x, v, p, par, pr, cb) {
        if (that._eval(l.replace(/^\?\((.*?)\)$/, '$1'), v[m], m, p, par, pr)) {
          addRet(that._trace(unshift(m, x), v, p, par, pr, cb));
        }
      });
    } else if (loc[0] === '(') {
      // [(expr)] (dynamic property/index)
      if (this.currPreventEval) {
        throw new Error('Eval [(expr)] prevented in JSONPath expression.');
      } // As this will resolve to a property name (but we don't know it yet), property and parent information is relative to the parent of the property to which this expression will resolve


      addRet(this._trace(unshift(this._eval(loc, val, path[path.length - 1], path.slice(0, -1), parent, parentPropName), x), val, path, parent, parentPropName, callback));
    } else if (loc[0] === '@') {
      // value type: @boolean(), etc.
      var addType = false;
      var valueType = loc.slice(1, -2);

      switch (valueType) {
        default:
          throw new TypeError('Unknown value type ' + valueType);

        case 'scalar':
          if (!val || !['object', 'function'].includes(_typeof(val))) {
            addType = true;
          }

          break;

        case 'boolean':
        case 'string':
        case 'undefined':
        case 'function':
          if (_typeof(val) === valueType) {
            // eslint-disable-line valid-typeof
            addType = true;
          }

          break;

        case 'number':
          if (_typeof(val) === valueType && isFinite(val)) {
            // eslint-disable-line valid-typeof
            addType = true;
          }

          break;

        case 'nonFinite':
          if (typeof val === 'number' && !isFinite(val)) {
            addType = true;
          }

          break;

        case 'object':
          if (val && _typeof(val) === valueType) {
            // eslint-disable-line valid-typeof
            addType = true;
          }

          break;

        case 'array':
          if (Array.isArray(val)) {
            addType = true;
          }

          break;

        case 'other':
          addType = this.currOtherTypeCallback(val, path, parent, parentPropName);
          break;

        case 'integer':
          if (val === Number(val) && isFinite(val) && !(val % 1)) {
            addType = true;
          }

          break;

        case 'null':
          if (val === null) {
            addType = true;
          }

          break;
      }

      if (addType) {
        retObj = {
          path: path,
          value: val,
          parent: parent,
          parentProperty: parentPropName
        };

        this._handleCallback(retObj, callback, 'value');

        return retObj;
      }
    } else if (loc[0] === '`' && val && hasOwnProp.call(val, loc.slice(1))) {
      // `-escaped property
      var locProp = loc.slice(1);
      addRet(this._trace(x, val[locProp], push(path, locProp), val, locProp, callback, true));
    } else if (loc.includes(',')) {
      // [name1,name2,...]
      var parts = loc.split(',');
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = parts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var part = _step.value;
          addRet(this._trace(unshift(part, x), val, path, parent, parentPropName, callback));
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    } else if (!literalPriority && val && hasOwnProp.call(val, loc)) {
      // simple case--directly follow property
      addRet(this._trace(x, val[loc], push(path, loc), val, loc, callback, true));
    } // We check the resulting values for parent selections. For parent
    // selections we discard the value object and continue the trace with the
    // current val object


    if (this._hasParentSelector) {
      for (var t = 0; t < ret.length; t++) {
        var rett = ret[t];

        if (rett.isParentSelector) {
          var tmp = that._trace(rett.expr, val, rett.path, parent, parentPropName, callback);

          if (Array.isArray(tmp)) {
            ret[t] = tmp[0];
            var tl = tmp.length;

            for (var tt = 1; tt < tl; tt++) {
              t++;
              ret.splice(t, 0, tmp[tt]);
            }
          } else {
            ret[t] = tmp;
          }
        }
      }
    }

    return ret;
  };

  JSONPath.prototype._walk = function (loc, expr, val, path, parent, parentPropName, callback, f) {
    if (Array.isArray(val)) {
      var n = val.length;

      for (var i = 0; i < n; i++) {
        f(i, loc, expr, val, path, parent, parentPropName, callback);
      }
    } else if (_typeof(val) === 'object') {
      for (var m in val) {
        if (hasOwnProp.call(val, m)) {
          f(m, loc, expr, val, path, parent, parentPropName, callback);
        }
      }
    }
  };

  JSONPath.prototype._slice = function (loc, expr, val, path, parent, parentPropName, callback) {
    if (!Array.isArray(val)) {
      return undefined;
    }

    var len = val.length,
        parts = loc.split(':'),
        step = parts[2] && parseInt(parts[2]) || 1;
    var start = parts[0] && parseInt(parts[0]) || 0,
        end = parts[1] && parseInt(parts[1]) || len;
    start = start < 0 ? Math.max(0, start + len) : Math.min(len, start);
    end = end < 0 ? Math.max(0, end + len) : Math.min(len, end);
    var ret = [];

    for (var i = start; i < end; i += step) {
      var tmp = this._trace(unshift(i, expr), val, path, parent, parentPropName, callback);

      if (Array.isArray(tmp)) {
        // This was causing excessive stack size in Node (with or without Babel) against our performance test: `ret.push(...tmp);`
        tmp.forEach(function (t) {
          ret.push(t);
        });
      } else {
        ret.push(tmp);
      }
    }

    return ret;
  };

  JSONPath.prototype._eval = function (code, _v, _vname, path, parent, parentPropName) {
    if (!this._obj || !_v) {
      return false;
    }

    if (code.includes('@parentProperty')) {
      this.currSandbox._$_parentProperty = parentPropName;
      code = code.replace(/@parentProperty/g, '_$_parentProperty');
    }

    if (code.includes('@parent')) {
      this.currSandbox._$_parent = parent;
      code = code.replace(/@parent/g, '_$_parent');
    }

    if (code.includes('@property')) {
      this.currSandbox._$_property = _vname;
      code = code.replace(/@property/g, '_$_property');
    }

    if (code.includes('@path')) {
      this.currSandbox._$_path = JSONPath.toPathString(path.concat([_vname]));
      code = code.replace(/@path/g, '_$_path');
    }

    if (code.match(/@([.\s)[])/)) {
      this.currSandbox._$_v = _v;
      code = code.replace(/@([.\s)[])/g, '_$_v$1');
    }

    try {
      return vm.runInNewContext(code, this.currSandbox);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
      throw new Error('jsonPath: ' + e.message + ': ' + code);
    }
  }; // PUBLIC CLASS PROPERTIES AND METHODS
  // Could store the cache object itself


  JSONPath.cache = {};
  /**
   * @param {string[]} pathArr Array to convert
   * @returns {string} The path string
   */

  JSONPath.toPathString = function (pathArr) {
    var x = pathArr,
        n = x.length;
    var p = '$';

    for (var i = 1; i < n; i++) {
      if (!/^(~|\^|@.*?\(\))$/.test(x[i])) {
        p += /^[0-9*]+$/.test(x[i]) ? '[' + x[i] + ']' : "['" + x[i] + "']";
      }
    }

    return p;
  };
  /**
   * @param {string} pointer JSON Path
   * @returns {string} JSON Pointer
   */


  JSONPath.toPointer = function (pointer) {
    var x = pointer,
        n = x.length;
    var p = '';

    for (var i = 1; i < n; i++) {
      if (!/^(~|\^|@.*?\(\))$/.test(x[i])) {
        p += '/' + x[i].toString().replace(/~/g, '~0').replace(/\//g, '~1');
      }
    }

    return p;
  };
  /**
   * @param {string} expr Expression to convert
   * @returns {string[]}
   */


  JSONPath.toPathArray = function (expr) {
    var cache = JSONPath.cache;

    if (cache[expr]) {
      return cache[expr].concat();
    }

    var subx = [];
    var normalized = expr // Properties
    .replace(/@(?:null|boolean|number|string|integer|undefined|nonFinite|scalar|array|object|function|other)\(\)/g, ';$&;') // Parenthetical evaluations (filtering and otherwise), directly
    //   within brackets or single quotes
    .replace(/[['](\??\(.*?\))[\]']/g, function ($0, $1) {
      return '[#' + (subx.push($1) - 1) + ']';
    }) // Escape periods and tildes within properties
    .replace(/\['([^'\]]*)'\]/g, function ($0, prop) {
      return "['" + prop.replace(/\./g, '%@%').replace(/~/g, '%%@@%%') + "']";
    }) // Properties operator
    .replace(/~/g, ';~;') // Split by property boundaries
    .replace(/'?\.'?(?![^[]*\])|\['?/g, ';') // Reinsert periods within properties
    .replace(/%@%/g, '.') // Reinsert tildes within properties
    .replace(/%%@@%%/g, '~') // Parent
    .replace(/(?:;)?(\^+)(?:;)?/g, function ($0, ups) {
      return ';' + ups.split('').join(';') + ';';
    }) // Descendents
    .replace(/;;;|;;/g, ';..;') // Remove trailing
    .replace(/;$|'?\]|'$/g, '');
    var exprList = normalized.split(';').map(function (exp) {
      var match = exp.match(/#(\d+)/);
      return !match || !match[1] ? exp : subx[match[1]];
    });
    cache[expr] = exprList;
    return cache[expr];
  };

  var JSONControllerCaption =
  /*#__PURE__*/
  function () {
    function JSONControllerCaption(element) {
      _classCallCheck(this, JSONControllerCaption);

      this._element = element;
    }

    _createClass(JSONControllerCaption, [{
      key: "update",
      value: function update(data, duration, path) {
        this._element.html(data);
      }
    }]);

    return JSONControllerCaption;
  }();

  var PREV_BUTTON_SVG = 'M170.711,170.711a100,100,0,1,1,0-141.422A100,100,0,0,1,170.711,170.711ZM121.945,63.426a6.9,6.9,0,0,0-9.754-9.753L70.74,95.123a6.9,6.9,0,0,0,0,9.754l41.451,41.451a6.9,6.9,0,1,0,9.754-9.754L85.37,100Z';
  var NEXT_BUTTON_SVG = 'M29.289,29.289a100,100,0,1,1,0,141.422A100,100,0,0,1,29.289,29.289ZM78.055,136.574a6.9,6.9,0,1,0,9.753,9.754l41.451-41.451a6.9,6.9,0,0,0,0-9.754L87.809,53.672a6.9,6.9,0,0,0-9.753,9.753L114.63,100Z';
  /** The JSONControllerControls class defines a UI widget which can be used to
    * click back and forth between different slices of data at a given path.
    */

  var JSONControllerControls =
  /*#__PURE__*/
  function () {
    function JSONControllerControls(controller, element, level) {
      _classCallCheck(this, JSONControllerControls);

      this._controller = controller;
      this._element = element;
      this._level = level;

      this._controller.registerListener(this.update.bind(this), '$.*');

      this.draw();
    }
    /**
      * Draws the forwards and backwards buttons and a text input which lets users
      * jump directly to a specific index. Also, adds mouse handlers.
      */


    _createClass(JSONControllerControls, [{
      key: "draw",
      value: function draw() {
        this.playback_container = this._element.append('div').attr('class', 'json-controller-controls');
        this.prevButton = this.playback_container.append('button').on('mousedown', function (c) {
          return function () {
            c._controller.previous(c._level);
          };
        }(this));
        var prevButtonIcon = this.prevButton.append('svg').attr('viewBox', '0 0 200 200').attr('width', 20).attr('height', 20);
        prevButtonIcon.append('path').attr('fill', '#b0b0b0').attr('d', PREV_BUTTON_SVG);
        var jump = this.playback_container.append('span').attr('class', 'jump');
        this._jump_input = jump.append('input').attr('value', 0).on('change', function (c) {
          return function () {
            c._controller["goto"](c._level, c._jump_input.node().value);
          };
        }(this));
        this.next_button = this.playback_container.append('button').on('mousedown', function (c) {
          return function () {
            c._controller.next(c._level);
          };
        }(this));
        var nextButtonIcon = this.next_button.append('svg').attr('viewBox', '0 0 200 200').attr('width', 20).attr('height', 20);
        nextButtonIcon.append('path').attr('fill', '#b0b0b0').attr('d', NEXT_BUTTON_SVG);
      }
    }, {
      key: "update",
      value: function update(path, data) {
        if (this._controller.isStart(this._level)) {
          this.prevButton.attr('disabled', '');
        } else {
          this.prevButton.attr('disabled', null);
        }

        var currentIndex = this._controller.currentIndex(this._level);

        this._jump_input.node().value = currentIndex;

        if (this._controller.isEnd(this._level)) {
          this.next_button.attr('disabled', '');
        } else {
          this.next_button.attr('disabled', null);
        }
      }
    }]);

    return JSONControllerControls;
  }();

  var HierarchicalSelection =
  /*#__PURE__*/
  function () {
    function HierarchicalSelection(element, selector) {
      _classCallCheck(this, HierarchicalSelection);

      this._elements_by_path = {};
      var nodes = [];
      element.selectAll(selector).each(function () {
        nodes.push({
          'node': this,
          'children': []
        });
      });
      var nodeHierarchy = [];
      nodes.forEach(function (h, nodes) {
        return function (node, i) {
          var parent = findParent(node['node'], nodes);

          if (parent) {
            node['path'] = parent['path'].concat([parent['children'].length]);
            parent['children'].push(node);
          } else {
            node['path'] = [nodeHierarchy.length];
            nodeHierarchy.push(node);
          }

          h._elements_by_path[node['path']] = d3Selection.select(node['node']);
        };
      }(this, nodes));
    }

    _createClass(HierarchicalSelection, [{
      key: "forEach",
      value: function forEach(callback) {
        for (var _i = 0, _Object$keys = Object.keys(this._elements_by_path); _i < _Object$keys.length; _i++) {
          var path = _Object$keys[_i];
          path = path.split(',').map(function (x) {
            return parseInt(x);
          });
          callback(path, this._elements_by_path[path]);
        }
      }
    }, {
      key: "elementByPath",
      value: function elementByPath(path) {
        return this._elements_by_path[path];
      }
    }]);

    return HierarchicalSelection;
  }();

  function findParent(child, nodes) {
    if (child.parentNode == null) {
      return null;
    }

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = nodes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var n = _step.value;

        if (n['node'] === child.parentNode) {
          return n;
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return findParent(child.parentNode, nodes);
  }

  function selectHierarchy(rootSelector, childSelector) {
    return new HierarchicalSelection(rootSelector, childSelector);
  }

  var JSONControllerHighlight =
  /*#__PURE__*/
  function () {
    function JSONControllerHighlight(element, selector, mapping) {
      _classCallCheck(this, JSONControllerHighlight);

      this._hierarchicalSelection = selectHierarchy(element, selector);
      this._mapping = mapping;
      this._reverseMapping = null;

      if (this._mapping) {
        this._reverseMapping = {};

        for (var _i = 0, _Object$keys = Object.keys(this._mapping); _i < _Object$keys.length; _i++) {
          var k = _Object$keys[_i];
          var p = k.split(',').filter(function (x) {
            return x.length > 0;
          }).map(function (x) {
            return parseInt(x);
          });
          this._reverseMapping[this._mapping[k]] = p;
        }
      }
    }

    _createClass(JSONControllerHighlight, [{
      key: "update",
      value: function update(data, duration, dataPath) {
        var highlightPath = dataPath;

        if (this._mapping) {
          highlightPath = this._mapping[String(dataPath)];
        }

        this._hierarchicalSelection.forEach(function (path, element) {
          element.classed('d3-json-controller-selected', function (d, i) {
            return path && highlightPath && path.toString() === highlightPath.toString();
          });
        });
      }
    }, {
      key: "reverseMapping",
      value: function reverseMapping() {
        return this._reverseMapping;
      }
    }]);

    return JSONControllerHighlight;
  }();

  var JSONControllerHint =
  /*#__PURE__*/
  function () {
    function JSONControllerHint(element) {
      _classCallCheck(this, JSONControllerHint);

      this._element = element;

      this._element.classed('d3-json-controller-hint', true);
    }

    _createClass(JSONControllerHint, [{
      key: "update",
      value: function update(data, duration, path) {
        if (path) {
          this._element.style('display', 'none');
        } else {
          this._element.style('display', null);
        }
      }
    }]);

    return JSONControllerHint;
  }();

  /** The JSONController class defines a data model which can be indexed into
    * using JSON paths.
    *
    * The controller maintains a current path which indicates the slice of data
    * which is currently being displayed. There are various methods for updating
    * the current path.
    *
    * UI widgets register themselves as listeners for a given subpath within the
    * dataset and anytime the path is changed, they get an update with a slice
    * of the data at their registered subpath.
    */

  var JSONController =
  /*#__PURE__*/
  function () {
    function JSONController(data, config) {
      _classCallCheck(this, JSONController);

      this._data = data;
      this._config = config;
      if (this._config === undefined) this._config = {};
      this.transitionDuration = 400;
      this._listeners = [];
      this._listener_paths = [];
      this._current_path = [];
      this._current_length = [];
      this.updateLengths();
    }

    _createClass(JSONController, [{
      key: "registerListener",
      value: function registerListener(listener, path) {
        this._listeners.push(listener);

        this._listener_paths.push(path);
      }
    }, {
      key: "updateListeners",
      value: function updateListeners(duration) {
        if (duration === undefined) duration = this.transitionDuration;

        for (var i = 0; i < this._listeners.length; i++) {
          this._listeners[i](this.getPath(this._listener_paths[i]), duration, this.getCurrentMatchingPath(this._listener_paths[i]));
        }
      }
    }, {
      key: "updateLengths",
      value: function updateLengths() {
        var d = this._data;

        for (var i = 0; i < this._current_path.length; i++) {
          this._current_length[i] = d.length;

          if (this._current_path[i] === -1) {
            d = [];
          } else {
            d = d[this._current_path[i]];
          }
        }
      }
    }, {
      key: "validateIndex",
      value: function validateIndex(index) {
        // TODO: Validate that level exists
        var d = this._data;

        for (var i = 0; i < index.length; i++) {
          if (!(d instanceof Object)) return false;
          if (typeof index[i] === 'string' && d[index[i]] === 'undefined') return false;
          if (typeof index[i] === 'number' && (index[i] < 0 || index[i] >= d.length)) return false;
          d = d[index[i]];
        }

        return true;
      }
    }, {
      key: "moveIndexInBounds",
      value: function moveIndexInBounds(index) {
        console.log('moveIndexInBounds: ' + index);
        var newIndex = index.slice(0);
        var d = this._data;

        for (var i = 0; i < index.length; i++) {
          if (typeof index[i] === 'number') {
            if (!newIndex[i] || newIndex[i] < 0) {
              newIndex[i] = 0;
            } else if (newIndex[i] >= d.length) {
              newIndex[i] = d.length - 1;
            }
          }

          d = d[newIndex[i]];
        }

        return newIndex;
      }
    }, {
      key: "goto",
      value: function goto(level, step) {
        var newIndex = this._current_path.slice();

        newIndex[level] = step;

        if (this.validateIndex(newIndex)) {
          this._current_path = newIndex;
          this.updateLengths();
          this.updateListeners();
        } else {
          newIndex = this.moveIndexInBounds(newIndex);

          if (this.validateIndex(newIndex)) {
            this._current_path = newIndex;
            this.updateLengths();
            this.updateListeners();
          } else {
            console.log('Cannot set goto index' + step + ' at level ' + level + 'in data with ' + this._current_path.length + ' levels');
          }
        }
      }
    }, {
      key: "gotoLevel",
      value: function gotoLevel(level) {
        var newIndex = this._current_path.slice(0, Math.max(0, level + 1));

        if (this.validateIndex(newIndex)) {
          this._current_path = newIndex;
          this.updateLengths();
          this.updateListeners();
        }
      }
    }, {
      key: "gotoPath",
      value: function gotoPath(path) {
        if (this.validateIndex(path)) {
          this._current_path = path;
          this.updateLengths();
          this.updateListeners();
        } else {
          console.log(path);
          console.error('Invalid path: ' + path);
        }
      }
    }, {
      key: "data",
      value: function data(sliceName) {
        var d = this.get(this._current_path);

        if (sliceName) {
          return d[sliceName];
        }

        return d;
      }
    }, {
      key: "get",
      value: function get(index) {
        var d = this._data;

        if (this.validateIndex(index)) {
          for (var i = 0; i < index.length; i++) {
            if (index[i] === -1) break;
            d = d[index[i]];
          }
        }

        return d;
      }
    }, {
      key: "matchCurrentPath",
      value: function matchCurrentPath(query) {
        if (query === '$') {
          return [[], []];
        }

        if (this._current_path.length === 0) {
          return [null, null];
        }

        var paths = JSONPath({
          'resultType': 'path',
          'path': query,
          'json': this._data
        });

        for (var i = 0; i < paths.length; i++) {
          var path = JSONPath.toPathArray(paths[i]).map(function (x) {
            var v = parseInt(x);

            if (!Object.is(NaN, v)) {
              return v;
            }

            return x;
          });
          var match = true;

          for (var j = 0; j < this._current_path.length; j++) {
            if (path[j + 1] !== this._current_path[j]) {
              match = false;
              break;
            }
          }

          if (match) {
            return [path.slice(1), this._current_path.slice(path.length - 1)];
          }
        }

        return [null, null];
      }
    }, {
      key: "getCurrentMatchingPath",
      value: function getCurrentMatchingPath(query) {
        return this.matchCurrentPath(query)[0];
      }
    }, {
      key: "getCurrentTrailingPath",
      value: function getCurrentTrailingPath(query) {
        return this.matchCurrentPath(query)[1];
      }
    }, {
      key: "getPath",
      value: function getPath(query) {
        var path = this.getCurrentMatchingPath(query);

        if (path) {
          return this.get(path);
        }
      }
    }, {
      key: "currentPath",
      value: function currentPath() {
        return this._current_path;
      }
    }, {
      key: "currentIndex",
      value: function currentIndex(level) {
        return this._current_path[level];
      }
    }, {
      key: "maxIndex",
      value: function maxIndex(level) {
        return this._current_length[level] - 1;
      }
    }, {
      key: "isStart",
      value: function isStart(level) {
        return this._current_path[level] === 0;
      }
    }, {
      key: "isEnd",
      value: function isEnd(level) {
        return this._current_path[level] === this.maxIndex(level);
      }
    }, {
      key: "start",
      value: function start(level) {
        this["goto"](level, 0);
      }
    }, {
      key: "previous",
      value: function previous(level) {
        this["goto"](level, this._current_path[level] - 1);
      }
    }, {
      key: "next",
      value: function next(level) {
        this["goto"](level, this._current_path[level] + 1);
      }
    }, {
      key: "end",
      value: function end(level) {
        this["goto"](level, this.maxIndex(level));
      }
    }, {
      key: "registerHover",
      value: function registerHover(element, path) {
        element.on('mouseenter', function (c) {
          return function () {
            c.gotoPath(path);
            return false;
          };
        }(this));
        element.on('mouseleave', function (c) {
          return function () {
            c.gotoLevel(path.length - 2);
            return false;
          };
        }(this));
      }
    }, {
      key: "registerHoverHierarchy",
      value: function registerHoverHierarchy(element, selector, mapping) {
        selectHierarchy(element, selector).forEach(function (c) {
          return function (path, element) {
            var dataPath = path;

            if (mapping) {
              dataPath = mapping[String(path)];
            }

            c.registerHover(element, dataPath);
          };
        }(this));
      }
    }, {
      key: "controls",
      value: function controls(element, level) {
        return new JSONControllerControls(this, element, level);
      }
    }, {
      key: "caption",
      value: function caption(element) {
        return new JSONControllerCaption(element);
      }
    }, {
      key: "highlight",
      value: function highlight(element, selector, mapping) {
        return new JSONControllerHighlight(element, selector, mapping);
      }
    }, {
      key: "hint",
      value: function hint(element) {
        var h = new JSONControllerHint(element);
        this.registerListener(h.update.bind(h), '$..*');
        return h;
      }
    }]);

    return JSONController;
  }();

  function controller (data) {
    return new JSONController(data);
  }

  exports.JSONController = controller;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
