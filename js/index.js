(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('uikit-util')) :
  typeof define === 'function' && define.amd ? define(['uikit-util'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.GCui = factory());
})(this, (function () { 'use strict';

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
    return target;
  }
  function _regeneratorRuntime() {
    _regeneratorRuntime = function () {
      return exports;
    };
    var exports = {},
      Op = Object.prototype,
      hasOwn = Op.hasOwnProperty,
      defineProperty = Object.defineProperty || function (obj, key, desc) {
        obj[key] = desc.value;
      },
      $Symbol = "function" == typeof Symbol ? Symbol : {},
      iteratorSymbol = $Symbol.iterator || "@@iterator",
      asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
      toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
    function define(obj, key, value) {
      return Object.defineProperty(obj, key, {
        value: value,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }), obj[key];
    }
    try {
      define({}, "");
    } catch (err) {
      define = function (obj, key, value) {
        return obj[key] = value;
      };
    }
    function wrap(innerFn, outerFn, self, tryLocsList) {
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
        generator = Object.create(protoGenerator.prototype),
        context = new Context(tryLocsList || []);
      return defineProperty(generator, "_invoke", {
        value: makeInvokeMethod(innerFn, self, context)
      }), generator;
    }
    function tryCatch(fn, obj, arg) {
      try {
        return {
          type: "normal",
          arg: fn.call(obj, arg)
        };
      } catch (err) {
        return {
          type: "throw",
          arg: err
        };
      }
    }
    exports.wrap = wrap;
    var ContinueSentinel = {};
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    var IteratorPrototype = {};
    define(IteratorPrototype, iteratorSymbol, function () {
      return this;
    });
    var getProto = Object.getPrototypeOf,
      NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function (method) {
        define(prototype, method, function (arg) {
          return this._invoke(method, arg);
        });
      });
    }
    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);
        if ("throw" !== record.type) {
          var result = record.arg,
            value = result.value;
          return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
            invoke("next", value, resolve, reject);
          }, function (err) {
            invoke("throw", err, resolve, reject);
          }) : PromiseImpl.resolve(value).then(function (unwrapped) {
            result.value = unwrapped, resolve(result);
          }, function (error) {
            return invoke("throw", error, resolve, reject);
          });
        }
        reject(record.arg);
      }
      var previousPromise;
      defineProperty(this, "_invoke", {
        value: function (method, arg) {
          function callInvokeWithMethodAndArg() {
            return new PromiseImpl(function (resolve, reject) {
              invoke(method, arg, resolve, reject);
            });
          }
          return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
        }
      });
    }
    function makeInvokeMethod(innerFn, self, context) {
      var state = "suspendedStart";
      return function (method, arg) {
        if ("executing" === state) throw new Error("Generator is already running");
        if ("completed" === state) {
          if ("throw" === method) throw arg;
          return doneResult();
        }
        for (context.method = method, context.arg = arg;;) {
          var delegate = context.delegate;
          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);
            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }
          if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
            if ("suspendedStart" === state) throw state = "completed", context.arg;
            context.dispatchException(context.arg);
          } else "return" === context.method && context.abrupt("return", context.arg);
          state = "executing";
          var record = tryCatch(innerFn, self, context);
          if ("normal" === record.type) {
            if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
            return {
              value: record.arg,
              done: context.done
            };
          }
          "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
        }
      };
    }
    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];
      if (undefined === method) {
        if (context.delegate = null, "throw" === context.method) {
          if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel;
          context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method");
        }
        return ContinueSentinel;
      }
      var record = tryCatch(method, delegate.iterator, context.arg);
      if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
      var info = record.arg;
      return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
    }
    function pushTryEntry(locs) {
      var entry = {
        tryLoc: locs[0]
      };
      1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
    }
    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal", delete record.arg, entry.completion = record;
    }
    function Context(tryLocsList) {
      this.tryEntries = [{
        tryLoc: "root"
      }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
    }
    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];
        if (iteratorMethod) return iteratorMethod.call(iterable);
        if ("function" == typeof iterable.next) return iterable;
        if (!isNaN(iterable.length)) {
          var i = -1,
            next = function next() {
              for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
              return next.value = undefined, next.done = !0, next;
            };
          return next.next = next;
        }
      }
      return {
        next: doneResult
      };
    }
    function doneResult() {
      return {
        value: undefined,
        done: !0
      };
    }
    return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
      value: GeneratorFunctionPrototype,
      configurable: !0
    }), defineProperty(GeneratorFunctionPrototype, "constructor", {
      value: GeneratorFunction,
      configurable: !0
    }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
      var ctor = "function" == typeof genFun && genFun.constructor;
      return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
    }, exports.mark = function (genFun) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
    }, exports.awrap = function (arg) {
      return {
        __await: arg
      };
    }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
      return this;
    }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      void 0 === PromiseImpl && (PromiseImpl = Promise);
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
      return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
        return result.done ? result.value : iter.next();
      });
    }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
      return this;
    }), define(Gp, "toString", function () {
      return "[object Generator]";
    }), exports.keys = function (val) {
      var object = Object(val),
        keys = [];
      for (var key in object) keys.push(key);
      return keys.reverse(), function next() {
        for (; keys.length;) {
          var key = keys.pop();
          if (key in object) return next.value = key, next.done = !1, next;
        }
        return next.done = !0, next;
      };
    }, exports.values = values, Context.prototype = {
      constructor: Context,
      reset: function (skipTempReset) {
        if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
      },
      stop: function () {
        this.done = !0;
        var rootRecord = this.tryEntries[0].completion;
        if ("throw" === rootRecord.type) throw rootRecord.arg;
        return this.rval;
      },
      dispatchException: function (exception) {
        if (this.done) throw exception;
        var context = this;
        function handle(loc, caught) {
          return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
        }
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i],
            record = entry.completion;
          if ("root" === entry.tryLoc) return handle("end");
          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc"),
              hasFinally = hasOwn.call(entry, "finallyLoc");
            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
              if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            } else {
              if (!hasFinally) throw new Error("try statement without catch or finally");
              if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
            }
          }
        }
      },
      abrupt: function (type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }
        finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
        var record = finallyEntry ? finallyEntry.completion : {};
        return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
      },
      complete: function (record, afterLoc) {
        if ("throw" === record.type) throw record.arg;
        return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
      },
      finish: function (finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
        }
      },
      catch: function (tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;
            if ("throw" === record.type) {
              var thrown = record.arg;
              resetTryEntry(entry);
            }
            return thrown;
          }
        }
        throw new Error("illegal catch attempt");
      },
      delegateYield: function (iterable, resultName, nextLoc) {
        return this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
      }
    }, exports;
  }
  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }
  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }
    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }
  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
        args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);
        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }
        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }
        _next(undefined);
      });
    };
  }
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
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _readOnlyError(name) {
    throw new TypeError("\"" + name + "\" is read-only");
  }
  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;
        var F = function () {};
        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true,
      didErr = false,
      err;
    return {
      s: function () {
        it = it.call(o);
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }

  var objPrototype = Object.prototype;
  var hasOwnProperty = objPrototype.hasOwnProperty;

  /**
   * 객체에 key 속성이 존재하는가
   * @param {object} obj 객체
   * @param {string} key 속성 명
   * @returns Boolean
   */
  function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key);
  }
  var hyphenateRe = /\B([A-Z])/g;

  /**
   * 카멜케이스 구분을 하이픈 구분으로 변경
   * @from    'abcdAbcdAbcd' 
   * @to      'abcd-abcd-abcd'
   */
  var hyphenate = memoize(function (str) {
    return str.replace(hyphenateRe, '-$1').toLowerCase();
  });
  var camelizeRe = /-(\w)/g;

  /**
   * 하이픈케이스 구분을 카멜케이스 구분으로 변경
   * @from    'abcd-abcd-abcd' 
   * @to      'abcdAbcdAbcd'
   */
  var camelize = memoize(function (str) {
    return str.replace(camelizeRe, toUpper);
  });

  /**
   * 첫 글자를 대문자로 치환
   * @from    'aaaa' 
   * @to      'Aaaa'
   */
  var ucfirst = memoize(function (str) {
    return str.length ? toUpper(null, str.charAt(0)) + str.slice(1) : '';
  });
  function toUpper(_, c) {
    return c ? c.toUpperCase() : '';
  }
  var strPrototype = String.prototype;
  var startsWithFn = strPrototype.startsWith || function (search) {
    return this.lastIndexOf(search, 0) === 0;
  };

  /**
   * str 의 첫번째 내열된 문자열이 search인가
   * @param {string} str 검색할 문자열
   * @param {string} search 찾을 문자열
   * @returns Boolean
   */
  function startsWith(str, search) {
    return startsWithFn.call(str, search);
  }
  var endsWithFn = strPrototype.endsWith || function (search) {
    return this.substr(-search.length) === search;
  };

  /**
   * str 의 마지막 내열된 문자열이 search인가
   * @param {string} str 검색할 문자열
   * @param {string} search 찾을 문자열
   * @returns Boolean
   */
  function endsWith(str, search) {
    return endsWithFn.call(str, search);
  }
  var arrPrototype = Array.prototype;
  var includesFn = function includesFn(search, i) {
    return !!~this.indexOf(search, i);
  };
  var includesStr = strPrototype.includes || includesFn;
  var includesArray = arrPrototype.includes || includesFn;

  /**
   * obj안에 search가 존재하는가
   * @param {array} obj 검색할 배열
   * @param {*} search 찾을 요소
   * @returns Boolean
   */
  function includes(obj, search) {
    return obj && (isString(obj) ? includesStr : includesArray).call(obj, search);
  }
  var findIndexFn = arrPrototype.findIndex || function (predicate) {
    for (var i = 0; i < this.length; i++) {
      if (predicate.call(arguments[1], this[i], i, this)) {
        return i;
      }
    }
    return -1;
  };

  /**
   * predicate 식에 만족하는 index를 반환, 만족하는 결과가 없으면 -1을 반환함
   * @param {array} array 검색할 배열
   * @param {function} predicate 판별할 함수
   * @returns index
   */
  function findIndex(array, predicate) {
    return findIndexFn.call(array, predicate);
  }
  var isArray = Array.isArray;
  function isFunction(obj) {
    return typeof obj === 'function';
  }
  function isObject(obj) {
    return obj !== null && _typeof(obj) === 'object';
  }
  var toString = objPrototype.toString;
  function isPlainObject(obj) {
    return toString.call(obj) === '[object Object]';
  }
  function isWindow(obj) {
    return isObject(obj) && obj === obj.window;
  }
  function isDocument(obj) {
    return nodeType(obj) === 9;
  }
  function isNode(obj) {
    return nodeType(obj) >= 1;
  }
  function isElement(obj) {
    return nodeType(obj) === 1;
  }
  function nodeType(obj) {
    return !isWindow(obj) && isObject(obj) && obj.nodeType;
  }
  function isBoolean(value) {
    return typeof value === 'boolean';
  }
  function isString(value) {
    return typeof value === 'string';
  }
  function isNumber(value) {
    return typeof value === 'number';
  }
  function isNumeric(value) {
    return isNumber(value) || isString(value) && !isNaN(value - parseFloat(value));
  }
  function typeOf(obj) {
    return toString.call(obj).slice(8, -1).toLowerCase();
  }
  function isDate(value) {
    return typeOf(value) === 'date' && !isNaN(value.getTime());
  }

  /**
   * Add leading zeroes to the given value
   * @param {number} value - The value to add.
   * @param {number} [length=1] - The expected value length.
   * @returns {string} Returns converted value.
   */
  function addLeadingZero(value) {
    var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var str = String(Math.abs(value));
    var i = str.length;
    var result = '';
    if (value < 0) {
      result += '-';
    }
    while (i < length) {
      i += 1;
      result += '0';
    }
    return result + str;
  }
  function isEmpty$1(obj) {
    return !(isArray(obj) ? obj.length : isObject(obj) ? Object.keys(obj).length : false);
  }
  function isUndefined(value) {
    return value === void 0;
  }
  function toBoolean(value) {
    return isBoolean(value) ? value : value === 'true' || value === '1' || value === '' ? true : value === 'false' || value === '0' ? false : value;
  }
  function toNumber(value) {
    var number = Number(value);
    return !isNaN(number) ? number : false;
  }
  function toFloat(value) {
    return parseFloat(value) || 0;
  }
  var toArray$1 = Array.from || function (value) {
    return arrPrototype.slice.call(value);
  };
  function toNode(element) {
    return toNodes(element)[0];
  }
  function toNodes(element) {
    return element && (isNode(element) ? [element] : toArray$1(element).filter(isNode)) || [];
  }
  function toWindow(element) {
    if (isWindow(element)) {
      return element;
    }
    element = toNode(element);
    return element ? (isDocument(element) ? element : element.ownerDocument).defaultView : window;
  }
  function toMs$1(time) {
    return !time ? 0 : endsWith(time, 'ms') ? toFloat(time) : toFloat(time) * 1000;
  }
  function isEqual(value, other) {
    return value === other || isObject(value) && isObject(other) && Object.keys(value).length === Object.keys(other).length && each(value, function (val, key) {
      return val === other[key];
    });
  }
  function swap(value, a, b) {
    return value.replace(new RegExp("".concat(a, "|").concat(b), 'g'), function (match) {
      return match === a ? b : a;
    });
  }
  var assign = Object.assign || function (target) {
    target = Object(target);
    for (var i = 0; i < (arguments.length <= 1 ? 0 : arguments.length - 1); i++) {
      var source = i + 1 < 1 || arguments.length <= i + 1 ? undefined : arguments[i + 1];
      if (source !== null) {
        for (var key in source) {
          if (hasOwn(source, key)) {
            target[key] = source[key];
          }
        }
      }
    }
    return target;
  };
  function last(array) {
    return array[array.length - 1];
  }
  function each(obj, cb) {
    for (var key in obj) {
      if (false === cb(obj[key], key)) {
        return false;
      }
    }
    return true;
  }
  function sortBy(array, prop) {
    return array.slice().sort(function (_ref, _ref2) {
      var _ref$prop = _ref[prop],
        propA = _ref$prop === void 0 ? 0 : _ref$prop;
      var _ref2$prop = _ref2[prop],
        propB = _ref2$prop === void 0 ? 0 : _ref2$prop;
      return propA > propB ? 1 : propB > propA ? -1 : 0;
    });
  }
  function sumBy(array, iteratee) {
    return array.reduce(function (sum, item) {
      return sum + toFloat(isFunction(iteratee) ? iteratee(item) : item[iteratee]);
    }, 0);
  }
  function uniqueBy(array, prop) {
    var seen = new Set();
    return array.filter(function (_ref3) {
      var check = _ref3[prop];
      return seen.has(check) ? false : seen.add(check) || true;
    } // IE 11 does not return the Set object
    );
  }

  function clamp(number) {
    var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    return Math.min(Math.max(toNumber(number) || 0, min), max);
  }
  function noop() {}
  function intersectRect() {
    for (var _len = arguments.length, rects = new Array(_len), _key = 0; _key < _len; _key++) {
      rects[_key] = arguments[_key];
    }
    return [['bottom', 'top'], ['right', 'left']].every(function (_ref4) {
      var _ref5 = _slicedToArray(_ref4, 2),
        minProp = _ref5[0],
        maxProp = _ref5[1];
      return Math.min.apply(Math, _toConsumableArray(rects.map(function (_ref6) {
        var min = _ref6[minProp];
        return min;
      }))) - Math.max.apply(Math, _toConsumableArray(rects.map(function (_ref7) {
        var max = _ref7[maxProp];
        return max;
      }))) > 0;
    });
  }
  function pointInRect(point, rect) {
    return point.x <= rect.right && point.x >= rect.left && point.y <= rect.bottom && point.y >= rect.top;
  }
  var Dimensions = {
    ratio: function ratio(dimensions, prop, value) {
      var _ref8;
      var aProp = prop === 'width' ? 'height' : 'width';
      return _ref8 = {}, _defineProperty(_ref8, aProp, dimensions[prop] ? Math.round(value * dimensions[aProp] / dimensions[prop]) : dimensions[aProp]), _defineProperty(_ref8, prop, value), _ref8;
    },
    contain: function contain(dimensions, maxDimensions) {
      var _this = this;
      dimensions = assign({}, dimensions);
      each(dimensions, function (_, prop) {
        return dimensions = dimensions[prop] > maxDimensions[prop] ? _this.ratio(dimensions, prop, maxDimensions[prop]) : dimensions;
      });
      return dimensions;
    },
    cover: function cover(dimensions, maxDimensions) {
      var _this2 = this;
      dimensions = this.contain(dimensions, maxDimensions);
      each(dimensions, function (_, prop) {
        return dimensions = dimensions[prop] < maxDimensions[prop] ? _this2.ratio(dimensions, prop, maxDimensions[prop]) : dimensions;
      });
      return dimensions;
    }
  };
  function getIndex(i, elements) {
    var current = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var finite = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    elements = toNodes(elements);
    var _elements = elements,
      length = _elements.length;
    i = isNumeric(i) ? toNumber(i) : i === 'next' ? current + 1 : i === 'previous' ? current - 1 : elements.indexOf(toNode(i));
    if (finite) {
      return clamp(i, 0, length - 1);
    }
    i %= length;
    return i < 0 ? i + length : i;
  }
  function memoize(fn) {
    var cache = Object.create(null);
    return function (key) {
      return cache[key] || (cache[key] = fn(key));
    };
  }

  function attr(element, name, value) {
    if (isObject(name)) {
      for (var key in name) {
        attr(element, key, name[key]);
      }
      return;
    }
    if (isUndefined(value)) {
      element = toNode(element);
      return element && element.getAttribute(name);
    } else {
      toNodes(element).forEach(function (element) {
        if (isFunction(value)) {
          value = value.call(element, attr(element, name));
        }
        if (value === null) {
          removeAttr(element, name);
        } else {
          element.setAttribute(name, value);
        }
      });
    }
  }
  function hasAttr(element, name) {
    return toNodes(element).some(function (element) {
      return element.hasAttribute(name);
    });
  }
  function removeAttr(element, name) {
    element = toNodes(element);
    name.split(' ').forEach(function (name) {
      return element.forEach(function (element) {
        return element.hasAttribute(name) && element.removeAttribute(name);
      });
    });
  }
  function data(element, attribute) {
    for (var i = 0, attrs = [attribute, "data-".concat(attribute)]; i < attrs.length; i++) {
      if (hasAttr(element, attrs[i])) {
        return attr(element, attrs[i]);
      }
    }
  }

  /**
   * 엘리먼트에 클래스 추가
   * @param {Object} element 
   * @param  {...any} args 추가 할 클래스 리스트
   */
  function addClass(element) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    apply$1(element, args, 'add');
  }

  /**
   * 엘리먼트에 클래스 제거
   * @param {Object} element 
   * @param  {...any} args 삭제 할 클래스 리스트
   */
  function removeClass(element) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }
    apply$1(element, args, 'remove');
  }

  //확인 필요12231
  function removeClasses(element, cls) {
    attr(element, 'class', function (value) {
      return (value || '').replace(new RegExp("\\b".concat(cls, "\\b"), 'g'), '');
    });
  }

  /**
   * 클래스 치환
   * @param {Object} element 
   * @param  {...any} args ["삭제 할 클래스네임", "추가 할 클래스 네임"]
   */
  function replaceClass(element) {
    (arguments.length <= 1 ? undefined : arguments[1]) && removeClass(element, arguments.length <= 1 ? undefined : arguments[1]);
    (arguments.length <= 2 ? undefined : arguments[2]) && addClass(element, arguments.length <= 2 ? undefined : arguments[2]);
  }

  /**
   * 클래스가 존재하는지 확인
   * @param {Object} element 
   * @param {"string"} cls 확인 할 클래스네임
   * @returns Boolean
   */
  function hasClass(element, cls) {
    return cls && toNodes(element).some(function (element) {
      return element.classList.contains(cls.split(' ')[0]);
    });
  }

  /**
   * 클래스 토글
   * @param {Array} element 
   * @param  {...any} args  
   */
  function toggleClass(element) {
    for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }
    if (!args.length) {
      return;
    }
    args = getArgs$1(args);
    var force = !isString(last(args)) ? args.pop() : []; // in iOS 9.3 force === undefined evaluates to false

    args = args.filter(Boolean);
    toNodes(element).forEach(function (_ref) {
      var classList = _ref.classList;
      for (var i = 0; i < args.length; i++) {
        supports.Force ? classList.toggle.apply(classList, _toConsumableArray([args[i]].concat(force))) : classList[(!isUndefined(force) ? force : !classList.contains(args[i])) ? 'add' : 'remove'](args[i]);
      }
    });
  }
  function test() {
    var aa = {
      bb: 1,
      cc: 2
    };
    console.log(hasOwn(aa, 'dd'));
    // console.log(getArgs(['aab', 'ddddd dsf dsf22', 'ddddd dfffd', 'ddddddfffd']))
  }

  function apply$1(element, args, fn) {
    var args = getArgs$1(args).filter(Boolean); // Array.prototype.filter(), 배열을 검색해서 boolean으로 평가 후 false로 평가되는 값을 제거한다.
    args.length && toNodes(element).forEach(function (_ref2) {
      var classList = _ref2.classList;
      supports.Multiple ? classList[fn].apply(classList, _toConsumableArray(args)) : args.forEach(function (cls) {
        return classList[fn](cls);
      });
    });
  }
  function getArgs$1(args) {
    return args.reduce(function (args, arg) {
      return (
        /**
         * concat을 콜하여 문자열이고 문자열 사이에 공백이 있는지 체크하여 공백이 있으면 공백을 기준으로 배열로 나눠서 합치고.
         * 공백이 없다면 그냥 합쳐서 반환한다.
         * 또한 concat에 잘못된 값이 전달되어 에러가 발생할 경우 (args.concat.call(args)로 하면 뒤의 값을 반환한다.) 빈 배열을 반환한다.
         */
        args.concat.call(args, isString(arg) && includes(arg, ' ') ? arg.trim().split(' ') : arg)
      );
    }, []);
  }

  // IE 11
  var supports = {
    get Multiple1111() {
      return this;
    },
    get Force() {
      return this.get('_force');
    },
    get: function get(key) {
      if (!hasOwn(this, key)) {
        var _document$createEleme = document.createElement('_'),
          classList = _document$createEleme.classList;
        classList.add('a', 'b');
        classList.toggle('c', false);
        this._multiple = classList.contains('b');
        this._force = !classList.contains('c');
      }
      return this[key];
    }
  };

  var inBrowser$1 = typeof window !== 'undefined';
  inBrowser$1 && /msie|trident/i.test(window.navigator.userAgent);
  inBrowser$1 && attr(document.documentElement, 'dir') === 'rtl';
  navigator && /android/i.test(navigator.userAgent);
  var hasTouchEvents$1 = inBrowser$1 && 'ontouchstart' in window;
  inBrowser$1 && (hasTouchEvents$1 || window.DocumentTouch && document instanceof DocumentTouch || navigator.maxTouchPoints); // IE >=11

  var Promise$1 = inBrowser$1 && window.Promise || PromiseFn;
  var Deferred = /*#__PURE__*/_createClass(function Deferred() {
    var _this = this;
    _classCallCheck(this, Deferred);
    this.promise = new Promise$1(function (resolve, reject) {
      _this.reject = reject;
      _this.resolve = resolve;
    });
  });

  /**
   * Promises/A+ polyfill v1.1.4 (https://github.com/bramstein/promis)
   */

  //  var Promise = window.Promise || PromiseFn;
  var RESOLVED = 0;
  var REJECTED = 1;
  var PENDING = 2;
  var async = inBrowser$1 && window.setImmediate || setTimeout;
  function PromiseFn(executor) {
    this.state = PENDING;
    this.value = undefined;
    this.deferred = [];
    var promise = this;
    try {
      executor(function (x) {
        promise.resolve(x);
      }, function (r) {
        promise.reject(r);
      });
    } catch (e) {
      promise.reject(e);
    }
  }
  PromiseFn.reject = function (r) {
    return new PromiseFn(function (resolve, reject) {
      reject(r);
    });
  };
  PromiseFn.resolve = function (x) {
    return new PromiseFn(function (resolve, reject) {
      resolve(x);
    });
  };
  PromiseFn.all = function all(iterable) {
    return new PromiseFn(function (resolve, reject) {
      var result = [];
      var count = 0;
      if (iterable.length === 0) {
        resolve(result);
      }
      function resolver(i) {
        return function (x) {
          result[i] = x;
          count += 1;
          if (count === iterable.length) {
            resolve(result);
          }
        };
      }
      for (var i = 0; i < iterable.length; i += 1) {
        PromiseFn.resolve(iterable[i]).then(resolver(i), reject);
      }
    });
  };
  PromiseFn.race = function race(iterable) {
    return new PromiseFn(function (resolve, reject) {
      for (var i = 0; i < iterable.length; i += 1) {
        PromiseFn.resolve(iterable[i]).then(resolve, reject);
      }
    });
  };
  var p = PromiseFn.prototype;
  p.resolve = function resolve(x) {
    var promise = this;
    if (promise.state === PENDING) {
      if (x === promise) {
        throw new TypeError('Promise settled with itself.');
      }
      var called = false;
      try {
        var then = x && x.then;
        if (x !== null && isObject(x) && isFunction(then)) {
          then.call(x, function (x) {
            if (!called) {
              promise.resolve(x);
            }
            called = true;
          }, function (r) {
            if (!called) {
              promise.reject(r);
            }
            called = true;
          });
          return;
        }
      } catch (e) {
        if (!called) {
          promise.reject(e);
        }
        return;
      }
      promise.state = RESOLVED;
      promise.value = x;
      promise.notify();
    }
  };
  p.reject = function reject(reason) {
    var promise = this;
    if (promise.state === PENDING) {
      if (reason === promise) {
        throw new TypeError('Promise settled with itself.');
      }
      promise.state = REJECTED;
      promise.value = reason;
      promise.notify();
    }
  };
  p.notify = function notify() {
    var _this2 = this;
    async(function () {
      if (_this2.state !== PENDING) {
        while (_this2.deferred.length) {
          var _this2$deferred$shift = _this2.deferred.shift(),
            _this2$deferred$shift2 = _slicedToArray(_this2$deferred$shift, 4),
            onResolved = _this2$deferred$shift2[0],
            onRejected = _this2$deferred$shift2[1],
            resolve = _this2$deferred$shift2[2],
            reject = _this2$deferred$shift2[3];
          try {
            if (_this2.state === RESOLVED) {
              if (isFunction(onResolved)) {
                resolve(onResolved.call(undefined, _this2.value));
              } else {
                resolve(_this2.value);
              }
            } else if (_this2.state === REJECTED) {
              if (isFunction(onRejected)) {
                resolve(onRejected.call(undefined, _this2.value));
              } else {
                reject(_this2.value);
              }
            }
          } catch (e) {
            reject(e);
          }
        }
      }
    });
  };
  p.then = function then(onResolved, onRejected) {
    var _this3 = this;
    return new PromiseFn(function (resolve, reject) {
      _this3.deferred.push([onResolved, onRejected, resolve, reject]);
      _this3.notify();
    });
  };
  p["catch"] = function (onRejected) {
    return this.then(undefined, onRejected);
  };

  /* global DocumentTouch */
  var inBrowser = typeof window !== 'undefined';
  var isIE = inBrowser && /msie|trident/i.test(window.navigator.userAgent);
  var isRtl = inBrowser && attr(document.documentElement, 'dir') === 'rtl';
  var isAndroid = navigator && /android/i.test(navigator.userAgent);
  var hasTouchEvents = inBrowser && 'ontouchstart' in window;
  var hasPointerEvents = inBrowser && window.PointerEvent;
  var hasTouch = inBrowser && (hasTouchEvents || window.DocumentTouch && document instanceof DocumentTouch || navigator.maxTouchPoints); // IE >=11

  var pointerDown$1 = hasPointerEvents ? 'pointerdown' : hasTouchEvents ? 'touchstart' : 'mousedown';
  var pointerMove$1 = hasPointerEvents ? 'pointermove' : hasTouchEvents ? 'touchmove' : 'mousemove';
  var pointerUp$1 = hasPointerEvents ? 'pointerup' : hasTouchEvents ? 'touchend' : 'mouseup';
  var pointerEnter = hasPointerEvents ? 'pointerenter' : hasTouchEvents ? '' : 'mouseenter';
  var pointerLeave = hasPointerEvents ? 'pointerleave' : hasTouchEvents ? '' : 'mouseleave';
  var pointerCancel = hasPointerEvents ? 'pointercancel' : 'touchcancel';

  var voidElements = {
    area: true,
    base: true,
    br: true,
    col: true,
    embed: true,
    hr: true,
    img: true,
    input: true,
    keygen: true,
    link: true,
    menuitem: true,
    meta: true,
    param: true,
    source: true,
    track: true,
    wbr: true
  };

  /**
   * 요소가 다음에 해당되는 태그인지 확인 [area, base, br, col, embed, hr, img, input, keygen, link, menuitem, meta, param, source, track, wbr]
   * @param {element} element 
   * @returns Boolean
   */
  function isVoidElement(element) {
    return toNodes(element).some(function (element) {
      return voidElements[element.tagName.toLowerCase()];
    });
  }

  /**
   * 요소가 화면에  dislplay상태인지 확인
   * @param {element} element 
   * @returns Boolean
   */
  function isVisible(element) {
    return toNodes(element).some(function (element) {
      return element.offsetWidth || element.offsetHeight || element.getClientRects().length;
    });
  }
  var selInput = 'input,select,textarea,button';

  /**
   * 요소가 form [input,select,textarea,button] 중 하나인가
   * @param {element} element 
   * @returns Boolean
   */
  function isInput(element) {
    return toNodes(element).some(function (element) {
      return matches(element, selInput);
    });
  }
  var selFocusable = "".concat(selInput, ",a[href],[tabindex]");

  /**
   * 포커싱이 가능한 요소인가
   * @param {element} element 
   * @returns boolean
   */
  function isFocusable(element) {
    return matches(element, selFocusable);
  }

  /**
   * 부모요소 선택
   * @param {element} element 
   * @returns element의 부모 요소
   */
  function parent$1(element) {
    element = toNode(element);
    return element && isElement(element.parentNode) && element.parentNode;
  }
  function filter(element, selector) {
    return toNodes(element).filter(function (element) {
      return matches(element, selector);
    });
  }
  var elProto = inBrowser ? Element.prototype : {};
  var matchesFn = elProto.matches || elProto.webkitMatchesSelector || elProto.msMatchesSelector || noop;

  /**
   * element가 selector의 셀렉터로 css에서 선언되었는가
   * @param {element} element 
   * @param {string} selector css 셀렉터 문자열
   * @returns Boolean
   */
  function matches(element, selector) {
    return toNodes(element).some(function (element) {
      return matchesFn.call(element, selector);
    });
  }
  elProto.closest || function (selector) {
    var ancestor = this;
    do {
      if (matches(ancestor, selector)) {
        return ancestor;
      }
    } while (ancestor = parent$1(ancestor));
  };

  /**
   * element의 상위 요소 중 selector와 일치되는 엘리먼트 반환
   * @param {element} element 
   * @param {string} selector 검색할 셀렉터 문자열
   * @returns element
   */
  function closest(element, selector) {
    return isElement(element) ? element.closest(startsWith(selector, '>') ? selector.slice(1) : selector) : toNodes(element).map(function (element) {
      return closest(element, selector);
    }).filter(Boolean);
  }
  function within(element, selector) {
    return isString(selector) ? !!closest(element, selector) : toNode(selector).contains(toNode(element));
  }

  /**
   * element의 부모 요소들 중 selector와 매칭되는 요소들 전부 선택
   * @param {element} element 
   * @param {string} selector 셀렉터 문자열
   * @returns 매칭되는 엘리먼드 배열
   */
  function parents(element, selector) {
    var elements = [];
    while (element = parent$1(element)) {
      if (!selector || matches(element, selector)) {
        elements.push(element);
      }
    }
    return elements;
  }

  /**
   * element의 자식요소 중 selector와 매칭되는 엘리먼트를 반환
   * @param {element} element 
   * @param {string} selector 검색할 셀렉터 문자열
   * @returns selector와 매칭되는 엘리먼트
   */
  function children(element, selector) {
    element = toNode(element);
    var children = element ? toNodes(element.children) : [];
    return selector ? filter(children, selector) : children;
  }
  /**
   * array 중 몇번째에 element가 속해있는가
   * @param {array} element node lists
   * @param {element} ref 찾을 엘리먼트
   * @returns index
   */
  function index(element, ref) {
    return ref ? toNodes(element).indexOf(toNode(ref)) : children(parent$1(element)).indexOf(element);
  }

  function query(selector, context) {
    return find(selector, getContext(selector, context));
  }
  function queryAll(selector, context) {
    return findAll(selector, getContext(selector, context));
  }
  function getContext(selector) {
    var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
    return isString(selector) && isContextSelector(selector) || isDocument(context) ? context : context.ownerDocument;
  }
  function find(selector, context) {
    return toNode(_query(selector, context, 'querySelector'));
  }
  function findAll(selector, context) {
    return toNodes(_query(selector, context, 'querySelectorAll'));
  }
  function _query(selector) {
    var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
    var queryFn = arguments.length > 2 ? arguments[2] : undefined;
    if (!selector || !isString(selector)) {
      return selector;
    }
    selector = selector.replace(contextSanitizeRe, '$1 *');
    if (isContextSelector(selector)) {
      selector = splitSelector(selector).map(function (selector) {
        var ctx = context;
        if (selector[0] === '!') {
          var selectors = selector.substr(1).trim().split(' ');
          ctx = closest(parent$1(context), selectors[0]);
          selector = selectors.slice(1).join(' ').trim();
        }
        if (selector[0] === '-') {
          var _selectors = selector.substr(1).trim().split(' ');
          var prev = (ctx || context).previousElementSibling;
          ctx = matches(prev, selector.substr(1)) ? prev : null;
          selector = _selectors.slice(1).join(' ');
        }
        if (!ctx) {
          return null;
        }
        return "".concat(domPath(ctx), " ").concat(selector);
      }).filter(Boolean).join(',');
      context = document;
    }
    try {
      return context[queryFn](selector);
    } catch (e) {
      return null;
    }
  }
  var contextSelectorRe = /(^|[^\\],)\s*[!>+~-]/;
  var contextSanitizeRe = /([!>+~-])(?=\s+[!>+~-]|\s*$)/g;
  var isContextSelector = memoize(function (selector) {
    return selector.match(contextSelectorRe);
  });
  var selectorRe = /.*?[^\\](?:,|$)/g;
  var splitSelector = memoize(function (selector) {
    return selector.match(selectorRe).map(function (selector) {
      return selector.replace(/,$/, '').trim();
    });
  });
  function domPath(element) {
    var names = [];
    while (element.parentNode) {
      if (element.id) {
        names.unshift("#".concat(escape(element.id)));
        break;
      } else {
        var _element = element,
          tagName = _element.tagName;
        if (tagName !== 'HTML') {
          tagName += ":nth-child(".concat(index(element) + 1, ")");
        }
        names.unshift(tagName);
        element = element.parentNode;
      }
    }
    return names.join(' > ');
  }
  var escapeFn = inBrowser && window.CSS && CSS.escape || function (css) {
    return css.replace(/([^\x7f-\uFFFF\w-])/g, function (match) {
      return "\\".concat(match);
    });
  };
  function escape(css) {
    return isString(css) ? escapeFn.call(null, css) : '';
  }

  function on() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    // console.log(args);
    var _getArgs = getArgs(args),
      _getArgs2 = _slicedToArray(_getArgs, 5),
      targets = _getArgs2[0],
      type = _getArgs2[1],
      selector = _getArgs2[2],
      listener = _getArgs2[3],
      useCapture = _getArgs2[4];
    targets = toEventTargets(targets);
    if (listener.length > 1) {
      listener = detail(listener);
    }
    if (useCapture && useCapture.self) {
      listener = selfFilter(listener);
    }
    if (selector) {
      listener = delegate(selector, listener);
    }
    // console.log(...args)

    useCapture = useCaptureFilter(useCapture);
    type.split(' ').forEach(function (type) {
      return targets.forEach(function (target) {
        return target.addEventListener(type, listener, useCapture);
      });
    });
    return function () {
      return off(targets, type, listener, useCapture);
    };
  }
  function off(targets, type, listener) {
    var useCapture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    useCapture = useCaptureFilter(useCapture);
    targets = toEventTargets(targets);
    type.split(' ').forEach(function (type) {
      return targets.forEach(function (target) {
        return target.removeEventListener(type, listener, useCapture);
      });
    });
  }
  function once() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    var _getArgs3 = getArgs(args),
      _getArgs4 = _slicedToArray(_getArgs3, 6),
      element = _getArgs4[0],
      type = _getArgs4[1],
      selector = _getArgs4[2],
      listener = _getArgs4[3],
      useCapture = _getArgs4[4],
      condition = _getArgs4[5];
    var off = on(element, type, selector, function (e) {
      var result = !condition || condition(e);
      if (result) {
        off();
        listener(e, result);
      }
    }, useCapture);
    return off;
  }
  function trigger(targets, event, detail) {
    return toEventTargets(targets).reduce(function (notCanceled, target) {
      return notCanceled && target.dispatchEvent(createEvent(event, true, true, detail));
    }, true);
  }
  function createEvent(e) {
    var bubbles = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var cancelable = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var detail = arguments.length > 3 ? arguments[3] : undefined;
    if (isString(e)) {
      var event = document.createEvent('CustomEvent'); // IE 11
      event.initCustomEvent(e, bubbles, cancelable, detail);
      e = event;
    }
    return e;
  }
  function getArgs(args) {
    if (isFunction(args[2])) {
      args.splice(2, 0, false);
    }
    return args;
  }
  function delegate(selector, listener) {
    var _this = this;
    return function (e) {
      var current = selector[0] === '>' ? findAll(selector, e.currentTarget).reverse().filter(function (element) {
        return within(e.target, element);
      })[0] : closest(e.target, selector);
      if (current) {
        e.current = current;
        listener.call(_this, e);
      }
    };
  }
  function detail(listener) {
    return function (e) {
      return isArray(e.detail) ? listener.apply(void 0, [e].concat(_toConsumableArray(e.detail))) : listener(e);
    };
  }
  function selfFilter(listener) {
    return function (e) {
      if (e.target === e.currentTarget || e.target === e.current) {
        return listener.call(null, e);
      }
    };
  }
  function useCaptureFilter(options) {
    return options && isIE && !isBoolean(options) ? !!options.capture : options;
  }
  function isEventTarget(target) {
    return target && 'addEventListener' in target;
  }
  function toEventTarget(target) {
    return isEventTarget(target) ? target : toNode(target);
  }
  function toEventTargets(target) {
    return isArray(target) ? target.map(toEventTarget).filter(Boolean) : isString(target) ? findAll(target) : isEventTarget(target) ? [target] : toNodes(target);
  }
  function isTouch(e) {
    return e.pointerType === 'touch' || !!e.touches;
  }
  function getEventPos(e) {
    var touches = e.touches,
      changedTouches = e.changedTouches;
    var _ref = touches && touches[0] || changedTouches && changedTouches[0] || e,
      x = _ref.clientX,
      y = _ref.clientY;
    return {
      x: x,
      y: y
    };
  }

  /**
   * readyState 이후 실행
   * @param {function} fn readyState 이후 실행할 함수 내용
   */
  function ready(fn) {
    if (document.readyState !== 'loading') {
      fn();
      return;
    }
    var unbind = on(document, 'DOMContentLoaded', function () {
      unbind();
      fn();
    });
  }
  function isTag(element, tagName) {
    var _element$tagName;
    return (element === null || element === void 0 ? void 0 : (_element$tagName = element.tagName) === null || _element$tagName === void 0 ? void 0 : _element$tagName.toLowerCase()) === tagName.toLowerCase();
  }

  /**
   * element 자식노드의 내용을 모두 비움
   * @param {element} element 
   * @returns element
   */
  function empty(element) {
    element = $$1(element);
    element.innerHTML = '';
    return element;
  }
  function html(parent, html) {
    parent = $$1(parent);
    return isUndefined(html) ? parent.innerHTML : append(parent.hasChildNodes() ? empty(parent) : parent, html);
  }

  /**
   * parent 자식 첫번째로 element 를 추가
   * @param {element} parent 타겟 엘리먼트
   * @param {element} element 추가 할 엘리먼드
   * @returns 추가된 엘리먼트
   */
  function prepend(parent, element) {
    parent = $$1(parent);
    if (!parent.hasChildNodes()) {
      return append(parent, element);
    } else {
      return insertNodes(element, function (element) {
        return parent.insertBefore(element, parent.firstChild);
      });
    }
  }

  /**
   * parent 자식 마지막으로 element 를 추가
   * @param {element} parent 타겟 엘리먼트
   * @param {element} element 추가 할 엘리먼드
   * @returns 추가된 엘리먼트
   */
  function append(parent, element) {
    parent = $$1(parent);
    return insertNodes(element, function (element) {
      return parent.appendChild(element);
    });
  }

  /**
   * ref의 이전 노드에 element를 추가
   * @param {element} ref 타겟 요소
   * @param {element} element 추가 할 엘리면트
   * @returns 추가된 엘리먼트
   */
  function before(ref, element) {
    ref = $$1(ref);
    return insertNodes(element, function (element) {
      return ref.parentNode.insertBefore(element, ref);
    });
  }

  /**
   * ref의 다음 노드에 element를 추가
   * @param {element} ref 타겟 요소
   * @param {element} element 추가 할 엘리면트
   * @returns 추가된 엘리먼트
   */
  function after(ref, element) {
    ref = $$1(ref);
    return insertNodes(element, function (element) {
      return ref.nextSibling ? before(ref.nextSibling, element) : append(ref.parentNode, element);
    });
  }
  function insertNodes(element, fn) {
    element = isString(element) ? fragment(element) : element;
    return element ? 'length' in element ? toNodes(element).map(fn) : fn(element) : null;
  }

  /**
   * element를 삭제
   * @param {element} element 
   */
  function remove$1(element) {
    toNodes(element).forEach(function (element) {
      return element.parentNode && element.parentNode.removeChild(element);
    });
  }

  /**
   * element를 structure로 랩핑
   * @param {element} element 
   * @param {string} structure  랩핑할 엘리먼트 문자열 ex) `<div>`
   * @returns structure element
   */
  function wrapAll(element, structure) {
    structure = toNode(before(element, structure));
    while (structure.firstChild) {
      structure = structure.firstChild;
    }
    append(structure, element);
    return structure;
  }

  /**
   * element하위요소 전부를 structure로 랩핑
   * @param {element} element 
   * @param {string} structure  랩핑할 엘리먼트 문자열 ex) `<div>`
   * @returns structure element
   */
  function wrapInner(element, structure) {
    return toNodes(toNodes(element).map(function (element) {
      return element.hasChildNodes ? wrapAll(toNodes(element.childNodes), structure) : append(element, structure);
    }));
  }

  /**
   * element요소의 하위 요소를 제외하고 제거 
   * @param {element} element 
   */
  function unwrap(element) {
    toNodes(element).map(parent$1).filter(function (value, index, self) {
      return self.indexOf(value) === index;
    }).forEach(function (parent) {
      before(parent, parent.childNodes);
      remove$1(parent);
    });
  }
  var fragmentRe = /^\s*<(\w+|!)[^>]*>/;
  var singleTagRe = /^<(\w+)\s*\/?>(?:<\/\1>)?$/;

  /**
   * 전달된 문자열 형식의 html을 실제 엘리먼트러 전환
   * @param {string} html 엘리먼트로 전환될 문자열 형식의 html
   * @returns element
   */
  function fragment(html) {
    var matches = singleTagRe.exec(html);
    if (matches) {
      return document.createElement(matches[1]);
    }
    var container = document.createElement('div');
    if (fragmentRe.test(html)) {
      container.insertAdjacentHTML('beforeend', html.trim());
    } else {
      container.textContent = html;
    }
    return container.childNodes.length > 1 ? toNodes(container.childNodes) : container.firstChild;
  }

  /**
   * node 하위요소를 전부 탐색하여 fn으로 전달된 함수를 살행
   * @param {element} node 탐색할 node element
   * @param {function} fn 실행할 함수 
   */
  function apply(node, fn) {
    if (!isElement(node)) {
      return;
    }
    fn(node);
    node = node.firstElementChild;
    while (node) {
      var next = node.nextElementSibling;
      apply(node, fn);
      node = next;
    }
  }

  /**
   * selector와 매칭되는 단일 엘리먼트
   * @param {String} selector css 선택자 형식의 문자열
   * @param {element} context context
   * @returns element
   */
  function $$1(selector, context) {
    return isHtml(selector) ? toNode(fragment(selector)) : find(selector, context);
  }

  /**
   * selector와 매칭되는 하나이상의 엘리먼트
   * @param {String} selector css 선택자 형식의 문자열
   * @param {element} context context
   * @returns element
   */
  function $$(selector, context) {
    return isHtml(selector) ? toNodes(fragment(selector)) : findAll(selector, context);
  }
  function isHtml(str) {
    return isString(str) && (str[0] === '<' || str.match(/^\s*</));
  }

  var cssNumber = {
    'animation-iteration-count': true,
    'column-count': true,
    'fill-opacity': true,
    'flex-grow': true,
    'flex-shrink': true,
    'font-weight': true,
    'line-height': true,
    'opacity': true,
    'order': true,
    'orphans': true,
    'stroke-dasharray': true,
    'stroke-dashoffset': true,
    'widows': true,
    'z-index': true,
    'zoom': true
  };
  function css(element, property, value) {
    var priority = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
    return toNodes(element).map(function (element) {
      if (isString(property)) {
        property = propName(property);
        if (isUndefined(value)) {
          return getStyle(element, property);
        } else if (!value && !isNumber(value)) {
          element.style.removeProperty(property);
        } else {
          element.style.setProperty(property, isNumeric(value) && !cssNumber[property] ? "".concat(value, "px") : value, priority);
        }
      } else if (isArray(property)) {
        var styles = getStyles(element);
        return property.reduce(function (props, property) {
          props[property] = styles[propName(property)];
          return props;
        }, {});
      } else if (isObject(property)) {
        priority = value;
        each(property, function (value, property) {
          return css(element, property, value, priority);
        });
      }
      return element;
    })[0];
  }
  function getStyles(element, pseudoElt) {
    return toWindow(element).getComputedStyle(element, pseudoElt);
  }
  function getStyle(element, property, pseudoElt) {
    return getStyles(element, pseudoElt)[property];
  }
  var parseCssVar = memoize(function (name) {
    /* usage in css: .uk-name:before { content:"xyz" } */

    var element = append(document.documentElement, document.createElement('div'));
    addClass(element, "uk-".concat(name));
    name = getStyle(element, 'content', ':before').replace(/^["'](.*)["']$/, '$1');
    remove$1(element);
    return name;
  });
  function getCssVar(name) {
    return !isIE ? getStyles(document.documentElement).getPropertyValue("--uk-".concat(name)) : parseCssVar(name);
  }

  // https://drafts.csswg.org/cssom/#dom-cssstyledeclaration-setproperty
  var propName = memoize(function (name) {
    return vendorPropName(name);
  });
  var cssPrefixes = ['webkit', 'moz', 'ms'];
  function vendorPropName(name) {
    name = hyphenate(name);
    var style = document.documentElement.style;
    if (name in style) {
      return name;
    }
    var i = cssPrefixes.length,
      prefixedName;
    while (i--) {
      prefixedName = "-".concat(cssPrefixes[i], "-").concat(name);
      if (prefixedName in style) {
        return prefixedName;
      }
    }
  }

  function transition(element, props) {
    var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 400;
    var timing = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'linear';
    return Promise$1.all(toNodes(element).map(function (element) {
      return new Promise$1(function (resolve, reject) {
        for (var name in props) {
          var value = css(element, name);
          if (value === '') {
            css(element, name, value);
          }
        }
        var timer = setTimeout(function () {
          return trigger(element, 'transitionend');
        }, duration);
        once(element, 'transitionend transitioncanceled', function (_ref) {
          var type = _ref.type;
          clearTimeout(timer);
          removeClass(element, 'uk-transition');
          css(element, {
            transitionProperty: '',
            transitionDuration: '',
            transitionTimingFunction: ''
          });
          type === 'transitioncanceled' ? reject() : resolve(element);
        }, {
          self: true
        });
        addClass(element, 'uk-transition');
        css(element, assign({
          transitionProperty: Object.keys(props).map(propName).join(','),
          transitionDuration: "".concat(duration, "ms"),
          transitionTimingFunction: timing
        }, props));
      });
    }));
  }
  var Transition = {
    start: transition,
    stop: function stop(element) {
      trigger(element, 'transitionend');
      return Promise$1.resolve();
    },
    cancel: function cancel(element) {
      trigger(element, 'transitioncanceled');
    },
    inProgress: function inProgress(element) {
      return hasClass(element, 'uk-transition');
    }
  };
  var animationPrefix = 'uk-animation-';
  function animate$1(element, animation) {
    var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 200;
    var origin = arguments.length > 3 ? arguments[3] : undefined;
    var out = arguments.length > 4 ? arguments[4] : undefined;
    return Promise$1.all(toNodes(element).map(function (element) {
      return new Promise$1(function (resolve, reject) {
        trigger(element, 'animationcanceled');
        var timer = setTimeout(function () {
          return trigger(element, 'animationend');
        }, duration);
        once(element, 'animationend animationcanceled', function (_ref2) {
          var type = _ref2.type;
          clearTimeout(timer);
          type === 'animationcanceled' ? reject() : resolve(element);
          css(element, 'animationDuration', '');
          removeClasses(element, "".concat(animationPrefix, "\\S*"));
        }, {
          self: true
        });
        css(element, 'animationDuration', "".concat(duration, "ms"));
        addClass(element, animation, animationPrefix + (out ? 'leave' : 'enter'));
        if (startsWith(animation, animationPrefix)) {
          origin && addClass(element, "uk-transform-origin-".concat(origin));
          out && addClass(element, "".concat(animationPrefix, "reverse"));
        }
      });
    }));
  }
  var _inProgress = new RegExp("".concat(animationPrefix, "(enter|leave)"));
  var Animation = {
    "in": animate$1,
    out: function out(element, animation, duration, origin) {
      return animate$1(element, animation, duration, origin, true);
    },
    inProgress: function inProgress(element) {
      return _inProgress.test(attr(element, 'class'));
    },
    cancel: function cancel(element) {
      trigger(element, 'animationcanceled');
    }
  };

  var dirs = {
    width: ['left', 'right'],
    height: ['top', 'bottom']
  };

  /**
   * 크기 및 위치값 정보
   * @param {element} element 
   * @returns {
   *  height,
   *  height
   *  width
   *  top
   *  left
   *  bottom
   *  right
   * }
   */
  function dimensions(element) {
    var rect = isElement(element) ? toNode(element).getBoundingClientRect() : {
      height: height(element),
      width: width(element),
      top: 0,
      left: 0
    };
    return {
      height: rect.height,
      width: rect.width,
      top: rect.top,
      left: rect.left,
      bottom: rect.top + rect.height,
      right: rect.left + rect.width
    };
  }
  function offset(element, coordinates) {
    var currentOffset = dimensions(element);
    var _toWindow = toWindow(element),
      pageYOffset = _toWindow.pageYOffset,
      pageXOffset = _toWindow.pageXOffset;
    var offsetBy = {
      height: pageYOffset,
      width: pageXOffset
    };
    for (var dir in dirs) {
      for (var i in dirs[dir]) {
        currentOffset[dirs[dir][i]] += offsetBy[dir];
      }
    }
    if (!coordinates) {
      return currentOffset;
    }
    var pos = css(element, 'position');
    each(css(element, ['left', 'top']), function (value, prop) {
      return css(element, prop, coordinates[prop] - currentOffset[prop] + toFloat(pos === 'absolute' && value === 'auto' ? position(element)[prop] : value));
    });
  }

  /**
   * 
   * @param {element} element 
   * @returns {
   * top,
   * left
   * }
   */
  function position(element) {
    var _offset = offset(element),
      top = _offset.top,
      left = _offset.left;
    var _toNode = toNode(element),
      _toNode$ownerDocument = _toNode.ownerDocument,
      body = _toNode$ownerDocument.body,
      documentElement = _toNode$ownerDocument.documentElement,
      offsetParent = _toNode.offsetParent;
    var parent = offsetParent || documentElement;
    while (parent && (parent === body || parent === documentElement) && css(parent, 'position') === 'static') {
      parent = parent.parentNode;
    }
    if (isElement(parent)) {
      var parentOffset = offset(parent);
      top -= parentOffset.top + toFloat(css(parent, 'borderTopWidth'));
      left -= parentOffset.left + toFloat(css(parent, 'borderLeftWidth'));
    }
    return {
      top: top - toFloat(css(element, 'marginTop')),
      left: left - toFloat(css(element, 'marginLeft'))
    };
  }
  function offsetPosition(element) {
    var offset = [0, 0];
    element = toNode(element);
    do {
      offset[0] += element.offsetTop;
      offset[1] += element.offsetLeft;
      if (css(element, 'position') === 'fixed') {
        var win = toWindow(element);
        offset[0] += win.pageYOffset;
        offset[1] += win.pageXOffset;
        return offset;
      }
    } while (element = element.offsetParent);
    return offset;
  }

  /**
   * height 값 반환
   */
  var height = dimension('height');

  /**
   * width 값 반환
   */
  var width = dimension('width');
  function dimension(prop) {
    var propName = ucfirst(prop);
    return function (element, value) {
      if (isUndefined(value)) {
        if (isWindow(element)) {
          return element["inner".concat(propName)];
        }
        if (isDocument(element)) {
          var doc = element.documentElement;
          return Math.max(doc["offset".concat(propName)], doc["scroll".concat(propName)]);
        }
        element = toNode(element);
        value = css(element, prop);
        value = value === 'auto' ? element["offset".concat(propName)] : toFloat(value) || 0;
        return value - boxModelAdjust(element, prop);
      } else {
        return css(element, prop, !value && value !== 0 ? '' : +value + boxModelAdjust(element, prop) + 'px');
      }
    };
  }
  function boxModelAdjust(element, prop) {
    var sizing = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'border-box';
    return css(element, 'boxSizing') === sizing ? dirs[prop].map(ucfirst).reduce(function (value, prop) {
      return value + toFloat(css(element, "padding".concat(prop))) + toFloat(css(element, "border".concat(prop, "Width")));
    }, 0) : 0;
  }
  function flipPosition(pos) {
    for (var dir in dirs) {
      for (var i in dirs[dir]) {
        if (dirs[dir][i] === pos) {
          return dirs[dir][1 - i];
        }
      }
    }
    return pos;
  }
  function toPx(value) {
    var property = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'width';
    var element = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : window;
    return isNumeric(value) ? +value : endsWith(value, 'vh') ? percent(height(toWindow(element)), value) : endsWith(value, 'vw') ? percent(width(toWindow(element)), value) : endsWith(value, '%') ? percent(dimensions(element)[property], value) : toFloat(value);
  }
  function percent(base, value) {
    return base * toFloat(value) / 100;
  }

  var strats = {};
  strats.events = strats.created = strats.beforeConnect = strats.connected = strats.beforeDisconnect = strats.disconnected = strats.destroy = concatStrat;

  // args strategy
  strats.args = function (parentVal, childVal) {
    return childVal !== false && concatStrat(childVal || parentVal);
  };

  // update strategy
  strats.update = function (parentVal, childVal) {
    return sortBy(concatStrat(parentVal, isFunction(childVal) ? {
      read: childVal
    } : childVal), 'order');
  };

  // property strategy
  strats.props = function (parentVal, childVal) {
    if (isArray(childVal)) {
      childVal = childVal.reduce(function (value, key) {
        value[key] = String;
        return value;
      }, {});
    }
    return strats.methods(parentVal, childVal);
  };

  // extend strategy
  strats.computed = strats.methods = function (parentVal, childVal) {
    return childVal ? parentVal ? assign({}, parentVal, childVal) : childVal : parentVal;
  };

  // data strategy
  strats.data = function (parentVal, childVal, vm) {
    if (!vm) {
      if (!childVal) {
        return parentVal;
      }
      if (!parentVal) {
        return childVal;
      }
      return function (vm) {
        return mergeFnData(parentVal, childVal, vm);
      };
    }
    return mergeFnData(parentVal, childVal, vm);
  };
  function mergeFnData(parentVal, childVal, vm) {
    return strats.computed(isFunction(parentVal) ? parentVal.call(vm, vm) : parentVal, isFunction(childVal) ? childVal.call(vm, vm) : childVal);
  }

  // concat strategy
  function concatStrat(parentVal, childVal) {
    parentVal = parentVal && !isArray(parentVal) ? [parentVal] : parentVal;
    return childVal ? parentVal ? parentVal.concat(childVal) : isArray(childVal) ? childVal : [childVal] : parentVal;
  }

  // default strategy
  function defaultStrat(parentVal, childVal) {
    return isUndefined(childVal) ? parentVal : childVal;
  }
  function mergeOptions(parent, child, vm) {
    var options = {};
    if (isFunction(child)) {
      child = child.options;
    }
    if (child["extends"]) {
      parent = mergeOptions(parent, child["extends"], vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
    for (var key in parent) {
      mergeKey(key);
    }
    for (var _key in child) {
      if (!hasOwn(parent, _key)) {
        mergeKey(_key);
      }
    }
    function mergeKey(key) {
      options[key] = (strats[key] || defaultStrat)(parent[key], child[key], vm);
    }
    return options;
  }
  function parseOptions(options) {
    var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    try {
      return !options ? {} : startsWith(options, '{') ? JSON.parse(options) : args.length && !includes(options, ':') ? _defineProperty({}, args[0], options) : options.split(';').reduce(function (options, option) {
        var _option$split = option.split(/:(.*)/),
          _option$split2 = _slicedToArray(_option$split, 2),
          key = _option$split2[0],
          value = _option$split2[1];
        if (key && !isUndefined(value)) {
          options[key.trim()] = value.trim();
        }
        return options;
      }, {});
    } catch (e) {
      return {};
    }
  }

  /*
      Based on:
      Copyright (c) 2016 Wilson Page wilsonpage@me.com
      https://github.com/wilsonpage/fastdom
  */

  var fastdom = {
    reads: [],
    writes: [],
    read: function read(task) {
      this.reads.push(task);
      scheduleFlush();
      return task;
    },
    write: function write(task) {
      this.writes.push(task);
      scheduleFlush();
      return task;
    },
    clear: function clear(task) {
      remove(this.reads, task);
      remove(this.writes, task);
    },
    flush: flush
  };
  function flush() {
    var recursion = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    runTasks(fastdom.reads);
    runTasks(fastdom.writes.splice(0));
    fastdom.scheduled = false;
    if (fastdom.reads.length || fastdom.writes.length) {
      scheduleFlush(recursion + 1);
    }
  }
  var RECURSION_LIMIT = 4;
  function scheduleFlush(recursion) {
    if (fastdom.scheduled) {
      return;
    }
    fastdom.scheduled = true;
    if (recursion && recursion < RECURSION_LIMIT) {
      Promise$1.resolve().then(function () {
        return flush(recursion);
      });
    } else {
      requestAnimationFrame(function () {
        return flush();
      });
    }
  }
  function runTasks(tasks) {
    var task;
    while (task = tasks.shift()) {
      try {
        task();
      } catch (e) {
        console.error(e);
      }
    }
  }
  function remove(array, item) {
    var index = array.indexOf(item);
    return ~index && array.splice(index, 1);
  }

  function isInView(element) {
    var offsetTop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var offsetLeft = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    if (!isVisible(element)) {
      return false;
    }
    return intersectRect.apply(void 0, _toConsumableArray(scrollParents(element).map(function (parent) {
      var _offset = offset(getViewport(parent)),
        top = _offset.top,
        left = _offset.left,
        bottom = _offset.bottom,
        right = _offset.right;
      return {
        top: top - offsetTop,
        left: left - offsetLeft,
        bottom: bottom + offsetTop,
        right: right + offsetLeft
      };
    }).concat(offset(element))));
  }
  function scrollTop(element, top) {
    if (isWindow(element) || isDocument(element)) {
      element = getScrollingElement(element);
    } else {
      element = toNode(element);
    }
    element.scrollTop = top;
  }
  function scrollIntoView(element) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$offset = _ref.offset,
      offsetBy = _ref$offset === void 0 ? 0 : _ref$offset;
    var parents = isVisible(element) ? scrollParents(element) : [];
    var diff = 0;
    return parents.reduce(function (fn, scrollElement, i) {
      var scrollTop = scrollElement.scrollTop,
        scrollHeight = scrollElement.scrollHeight;
      var maxScroll = scrollHeight - getViewportClientHeight(scrollElement);
      var top = Math.ceil(offset(parents[i - 1] || element).top - offset(getViewport(scrollElement)).top - offsetBy + diff + scrollTop);
      if (top > maxScroll) {
        diff = top - maxScroll;
        top = maxScroll;
      } else {
        diff = 0;
      }
      return function () {
        return scrollTo(scrollElement, top - scrollTop).then(fn);
      };
    }, function () {
      return Promise$1.resolve();
    })();
    function scrollTo(element, top) {
      return new Promise$1(function (resolve) {
        var scroll = element.scrollTop;
        var duration = getDuration(Math.abs(top));
        var start = Date.now();
        (function step() {
          var percent = ease(clamp((Date.now() - start) / duration));
          scrollTop(element, scroll + top * percent);

          // scroll more if we have not reached our destination
          if (percent !== 1) {
            requestAnimationFrame(step);
          } else {
            resolve();
          }
        })();
      });
    }
    function getDuration(dist) {
      return 40 * Math.pow(dist, .375);
    }
    function ease(k) {
      return 0.5 * (1 - Math.cos(Math.PI * k));
    }
  }
  function scrolledOver(element) {
    var heightOffset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    if (!isVisible(element)) {
      return 0;
    }
    var _scrollParents = scrollParents(element, /auto|scroll/, true),
      _scrollParents2 = _slicedToArray(_scrollParents, 1),
      scrollElement = _scrollParents2[0];
    var scrollHeight = scrollElement.scrollHeight,
      scrollTop = scrollElement.scrollTop;
    var clientHeight = getViewportClientHeight(scrollElement);
    var viewportTop = offsetPosition(element)[0] - scrollTop - offsetPosition(scrollElement)[0];
    var viewportDist = Math.min(clientHeight, viewportTop + scrollTop);
    var top = viewportTop - viewportDist;
    var dist = Math.min(element.offsetHeight + heightOffset + viewportDist, scrollHeight - (viewportTop + scrollTop), scrollHeight - clientHeight);
    return clamp(-1 * top / dist);
  }
  function scrollParents(element) {
    var overflowRe = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : /auto|scroll|hidden/;
    var scrollable = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var scrollEl = getScrollingElement(element);
    var ancestors = parents(element).reverse();
    ancestors = ancestors.slice(ancestors.indexOf(scrollEl) + 1);
    var fixedIndex = findIndex(ancestors, function (el) {
      return css(el, 'position') === 'fixed';
    });
    if (~fixedIndex) {
      ancestors = ancestors.slice(fixedIndex);
    }
    return [scrollEl].concat(ancestors.filter(function (parent) {
      return overflowRe.test(css(parent, 'overflow')) && (!scrollable || parent.scrollHeight > getViewportClientHeight(parent));
    })).reverse();
  }
  function getViewport(scrollElement) {
    return scrollElement === getScrollingElement(scrollElement) ? window : scrollElement;
  }

  // iOS 12 returns <body> as scrollingElement
  function getViewportClientHeight(scrollElement) {
    return (scrollElement === getScrollingElement(scrollElement) ? document.documentElement : scrollElement).clientHeight;
  }
  function getScrollingElement(element) {
    var _toWindow = toWindow(element),
      document = _toWindow.document;
    return document.scrollingElement || document.documentElement;
  }

  function toNumeric(el) {}

  /**
   * length 길이만큼 str길이를 잘라서 반환
   * @param {string} str 입력값
   * @param {number} length maxlength 길이
   * @returns str 길이 중 length길이만큼 자른 값
   */
  function headStr(str, length) {
    return str.slice(0, length);
  }
  function numberOnly(val) {
    return val.replace(/[A-Za-z]/g, '').replace(/[^\dM-]/g, '').replace(/\-/g, '');
  }
  function dateFormat(value, pattern, blocks) {
    var valArr;
    var newVal = '';
    value = numberOnly(value);
    valArr = value.split("");
    for (var i = 0; i < blocks.length; i++) {
      var str = valArr.splice(0, blocks[i]).join("");
      switch (pattern[i]) {
        case "yyyy":
          {
            break;
          }
        case "yy":
          {
            break;
          }
        case "mm":
          {
            if (str === '00') {
              str = '01';
            } else if (toNumber(str.slice(0, 1)) > 1) {
              str = "0".concat(toNumber(str));
            } else if (toNumber(str) > 12) {
              str = '12';
            }
            break;
          }
        case "dd":
          {
            if (str === '00') {
              str = '01';
            } else if (toNumber(str.slice(0, 1)) > 3) {
              str = "0".concat(toNumber(str));
            } else if (toNumber(str) > 31) {
              str = '31';
            }
            break;
          }
      }
      newVal += str;
    }
    return newVal;
  }
  function numerFormat(value, delimiter) {
    return numberOnly(value).replace(/(\d)(?=(\d{3})+$)/g, "$1".concat(delimiter));
  }
  function getMaxlength(blocks) {
    return blocks.reduce(function (previous, current) {
      return previous + current;
    }, 0);
  }
  function uppercaseFormat(value) {
    return value.toUpperCase();
  }
  function lowercaseFormat(value) {
    return value.toLowerCase();
  }
  /**
   * [ . ? * + ^ $ [ \ ] \ \ ( ) { } | - ] 
   * 구분자를 받아 구분자를 검색하는 정규식문자를 만들어 반환
   * @param {string} delimiter 구분자
   * @returns 구분자를 찾는 정규식
   */
  function getDelimiterREByDelimiter(delimiter) {
    return new RegExp(delimiter.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1'), 'g');
  }

  /**
   * 입력값 중 delimiter, delimiters 와 일치하는 문자가 있으면 삭제 후 반환
   * @param {String} value 입력 값
   * @param {string} delimiter 구분자 문자열
   * @param {array} delimiters 구분자 배열
   * @returns 구분자를 삭제한 값
   */
  function getRawValue(value, delimiter, delimiters, maxlength) {
    // single delimiter
    if (delimiters.length === 0) {
      var delimiterRE = delimiter ? getDelimiterREByDelimiter(delimiter) : '';
      value = value.replace(delimiterRE, '');
    } else {
      // multiple delimiters
      delimiters.forEach(function (current) {
        current.split('').forEach(function (letter) {
          value = value.replace(getDelimiterREByDelimiter(letter), '');
        });
      });
    }
    return maxlength !== 0 ? headStr(value, maxlength) : value;
  }

  /**
   * value 에서 re를 검사하여 제거한 후 반환
   * @param {string} value 검사할 값
   * @param {RegExp} re 정규식
   * @returns 치횐된 값
   */
  function strip(value, re) {
    return value.replace(re, '');
  }

  /**
   * 입력값을 받아 가공하여 반환
   * @param {string} value 입력값
   * @param {array} blocks 구분 배열
   * @param {number} blocksLength 구분배열 길이
   * @param {string} delimiter 구분자
   * @param {array} delimiters 구분자 배열
   * @param {boolean} delimiterLazyShow 값이 입력된 후에 구분자를 붙일 것인가?
   * @returns 가공된 값
   */
  function getFormattedValue(value, blocks, delimiter, delimiters, delimiterLazyShow) {
    var result = '',
      multipleDelimiters = delimiters.length > 0,
      currentDelimiter = '';

    // no options, normal input
    if (blocks.length === 0) {
      return value;
    }
    blocks.forEach(function (length, index) {
      if (value.length > 0) {
        var sub = value.slice(0, length),
          rest = value.slice(length);
        if (multipleDelimiters) {
          currentDelimiter = delimiters[index] || currentDelimiter;
        } else {
          currentDelimiter = delimiter;
        }
        if (delimiterLazyShow) {
          if (index > 0) {
            result += currentDelimiter;
          }
          result += sub;
        } else {
          result += sub;
          if (sub.length === length && index < blocks.length - 1) {
            result += currentDelimiter;
          }
        }

        // update remaining string
        value = rest;
      }
    });
    return result;
  }

  /**
   * 커서가 값의 끝에 위치할 경우 새 값의 길이 반환,
   * 
   * @param {number} prevPos 입력박스 커서 위치 값 selectionEnd
   * @param {string} oldValue 입력박스 값
   * @param {string} newValue pps.result 값
   * @param {string} delimiter 구분자
   * @param {array} delimiters 구분자 배열
   * @returns 계산된 커서 인덱스
   */
  function getNextCursorPosition(prevPos, oldValue, newValue, delimiter, delimiters) {
    // If cursor was at the end of value, just place it back.
    // Because new value could contain additional chars.
    if (oldValue.length === prevPos) {
      return newValue.length;
    }
    return prevPos + getPositionOffset(prevPos, oldValue, newValue, delimiter, delimiters);
  }
  function getPositionOffset(prevPos, oldValue, newValue, delimiter, delimiters) {
    var oldRawValue, newRawValue, lengthOffset;
    oldRawValue = getRawValue(oldValue.slice(0, prevPos), delimiter, delimiters);
    newRawValue = getRawValue(newValue.slice(0, prevPos), delimiter, delimiters);
    lengthOffset = oldRawValue.length - newRawValue.length;
    return lengthOffset !== 0 ? lengthOffset / Math.abs(lengthOffset) : 0;
  }

  /**
   * 입력박스 내 값의 선택영역을 설정한다. 
   * start, end 두 값으로 지정하는데 시작과 끝의 값은 같다.
   * @param {element} element 엘리먼트
   * @param {number} position 커서 마지막 위치
   * @param {document} doc 	
   */
  function setSelection(element, position, doc) {
    if (element !== getActiveElement(doc)) {
      return;
    }

    // cursor is already in the end
    if (element && element.value.length <= position) {
      return;
    }
    if (element.createTextRange) {
      var range = element.createTextRange();
      range.move('character', position);
      range.select();
    } else {
      try {
        element.setSelectionRange(position, position);
      } catch (e) {
        // eslint-disable-next-line
        console.warn('The input element type does not support selection');
      }
    }
  }

  /**
   * document.actoveElement 반환
   * shadowRoot가 랜더랑 되었다면 shadowRoot에서 포커싱된 엘리먼드 재 검사
   * @param {element} parent 엘리먼트
   * @returns 포커싱 된 엘리먼트 반환
   */
  function getActiveElement(parent) {
    var activeElement = parent.activeElement;
    if (activeElement && activeElement.shadowRoot) {
      return getActiveElement(activeElement.shadowRoot);
    }
    return activeElement;
  }

  /**
   * 입력값의 마지막 문자가 delimiter 와 일치하는가? delimiter : ""
   * @param {string} value 입력 값
   * @param {string} delimiter 구분자 문자열
   * @param {attay} delimiters 구분자 배열
   * @returns 구분자 또는 빈 문자열
   */
  function getPostDelimiter(value, delimiter, delimiters) {
    // single delimiter
    if (delimiters.length === 0) {
      return value.slice(-delimiter.length) === delimiter ? delimiter : '';
    }

    // multiple delimiters
    var matchedDelimiter = '';
    delimiters.forEach(function (current) {
      if (value.slice(-current.length) === current) {
        matchedDelimiter = current;
      }
    });
    return matchedDelimiter;
  }

  function observeIntersection(targets, cb, options) {
    var intersecting = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    var observer = new IntersectionObserver(intersecting ? function (entries, observer) {
      if (entries.some(function (entry) {
        return entry.isIntersecting;
      })) {
        cb(entries, observer);
      }
    } : cb, options);
    var _iterator = _createForOfIteratorHelper(toNodes(targets)),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var el = _step.value;
        observer.observe(el);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return observer;
  }
  var hasResizeObserver = inBrowser && window.ResizeObserver;
  function observeResize(targets, cb) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
      box: 'border-box'
    };
    if (hasResizeObserver) {
      return observe(ResizeObserver, targets, cb, options);
    }

    // Fallback Safari < 13.1
    initResizeListener();
    listeners.add(cb);
    return {
      disconnect: function disconnect() {
        listeners["delete"](cb);
      }
    };
  }
  var listeners;
  function initResizeListener() {
    if (listeners) {
      return;
    }
    listeners = new Set();

    // throttle 'resize'
    var pendingResize;
    var handleResize = function handleResize() {
      if (pendingResize) {
        return;
      }
      pendingResize = true;
      requestAnimationFrame(function () {
        return pendingResize = false;
      });
      var _iterator2 = _createForOfIteratorHelper(listeners),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var listener = _step2.value;
          listener();
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    };
    on(window, 'load resize', handleResize);
    on(document, 'loadedmetadata load', handleResize, true);
  }
  function observeMutation(targets, cb, options) {
    return observe(MutationObserver, targets, cb, options);
  }
  function observe(Observer, targets, cb, options) {
    var observer = new Observer(cb);
    var _iterator3 = _createForOfIteratorHelper(toNodes(targets)),
      _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var el = _step3.value;
        observer.observe(el, options);
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
    return observer;
  }

  var util = /*#__PURE__*/Object.freeze({
    __proto__: null,
    addClass: addClass,
    removeClass: removeClass,
    removeClasses: removeClasses,
    replaceClass: replaceClass,
    hasClass: hasClass,
    toggleClass: toggleClass,
    test: test,
    transition: transition,
    Transition: Transition,
    animate: animate$1,
    Animation: Animation,
    attr: attr,
    hasAttr: hasAttr,
    removeAttr: removeAttr,
    data: data,
    dimensions: dimensions,
    offset: offset,
    position: position,
    offsetPosition: offsetPosition,
    height: height,
    width: width,
    boxModelAdjust: boxModelAdjust,
    flipPosition: flipPosition,
    toPx: toPx,
    query: query,
    queryAll: queryAll,
    find: find,
    findAll: findAll,
    escape: escape,
    Promise: Promise$1,
    Deferred: Deferred,
    isVoidElement: isVoidElement,
    isVisible: isVisible,
    selInput: selInput,
    isInput: isInput,
    selFocusable: selFocusable,
    isFocusable: isFocusable,
    parent: parent$1,
    filter: filter,
    matches: matches,
    closest: closest,
    within: within,
    parents: parents,
    children: children,
    index: index,
    on: on,
    off: off,
    once: once,
    trigger: trigger,
    createEvent: createEvent,
    toEventTargets: toEventTargets,
    isTouch: isTouch,
    getEventPos: getEventPos,
    hasOwn: hasOwn,
    hyphenate: hyphenate,
    camelize: camelize,
    ucfirst: ucfirst,
    startsWith: startsWith,
    endsWith: endsWith,
    includes: includes,
    findIndex: findIndex,
    isArray: isArray,
    isFunction: isFunction,
    isObject: isObject,
    isPlainObject: isPlainObject,
    isWindow: isWindow,
    isDocument: isDocument,
    isNode: isNode,
    isElement: isElement,
    isBoolean: isBoolean,
    isString: isString,
    isNumber: isNumber,
    isNumeric: isNumeric,
    typeOf: typeOf,
    isDate: isDate,
    addLeadingZero: addLeadingZero,
    isEmpty: isEmpty$1,
    isUndefined: isUndefined,
    toBoolean: toBoolean,
    toNumber: toNumber,
    toFloat: toFloat,
    toArray: toArray$1,
    toNode: toNode,
    toNodes: toNodes,
    toWindow: toWindow,
    toMs: toMs$1,
    isEqual: isEqual,
    swap: swap,
    assign: assign,
    last: last,
    each: each,
    sortBy: sortBy,
    sumBy: sumBy,
    uniqueBy: uniqueBy,
    clamp: clamp,
    noop: noop,
    intersectRect: intersectRect,
    pointInRect: pointInRect,
    Dimensions: Dimensions,
    getIndex: getIndex,
    memoize: memoize,
    mergeOptions: mergeOptions,
    parseOptions: parseOptions,
    ready: ready,
    isTag: isTag,
    empty: empty,
    html: html,
    prepend: prepend,
    append: append,
    before: before,
    after: after,
    remove: remove$1,
    wrapAll: wrapAll,
    wrapInner: wrapInner,
    unwrap: unwrap,
    fragment: fragment,
    apply: apply,
    $: $$1,
    $$: $$,
    fastdom: fastdom,
    css: css,
    getCssVar: getCssVar,
    propName: propName,
    inBrowser: inBrowser,
    isIE: isIE,
    isRtl: isRtl,
    isAndroid: isAndroid,
    hasTouch: hasTouch,
    pointerDown: pointerDown$1,
    pointerMove: pointerMove$1,
    pointerUp: pointerUp$1,
    pointerEnter: pointerEnter,
    pointerLeave: pointerLeave,
    pointerCancel: pointerCancel,
    isInView: isInView,
    scrollTop: scrollTop,
    scrollIntoView: scrollIntoView,
    scrolledOver: scrolledOver,
    scrollParents: scrollParents,
    getViewport: getViewport,
    getViewportClientHeight: getViewportClientHeight,
    toNumeric: toNumeric,
    headStr: headStr,
    numberOnly: numberOnly,
    dateFormat: dateFormat,
    numerFormat: numerFormat,
    getMaxlength: getMaxlength,
    uppercaseFormat: uppercaseFormat,
    lowercaseFormat: lowercaseFormat,
    getDelimiterREByDelimiter: getDelimiterREByDelimiter,
    getRawValue: getRawValue,
    strip: strip,
    getFormattedValue: getFormattedValue,
    getNextCursorPosition: getNextCursorPosition,
    getPositionOffset: getPositionOffset,
    setSelection: setSelection,
    getActiveElement: getActiveElement,
    getPostDelimiter: getPostDelimiter,
    observeIntersection: observeIntersection,
    observeResize: observeResize,
    observeMutation: observeMutation
  });

  var prefixStr = 'mui';
  var jsPrefix = prefixStr;
  var cssPrefix = "".concat(prefixStr, "_");

  function globalApi (UICommon) {
    var DATA = UICommon.data;
    /**
     * 전달된 함수를 1회 실행
     * @param {function} plugin 전달된 함수를 1회 실행
     * @returns this
     */
    UICommon.use = function (plugin) {
      if (plugin.installed) return;
      plugin.call(null, this);
      plugin.installed = true;
      return this;
    };

    /**
     * 객체 형태의 컴포넌트를 Class 형태로 변환
     * @param {object} opts 컴포넌트 객체
     * @returns Class
     */
    UICommon.extend = function (opts) {
      var options = opts || {};
      var Super = this;
      var Sub = function G(options) {
        this._init(options);
      };
      Sub.prototype = Object.create(Super.prototype);
      Sub.prototype.constructor = Sub;
      Sub.options = mergeOptions(Super.options, options);
      Sub["super"] = Super;
      Sub.extend = Super.extend;
      return Sub;
    };
    /**
     * event 발생 시 update 실행
     * @param {element} element 
     * @param {event} e 이벤트
     */
    UICommon.update = function (element, e) {
      element = element ? toNode(element) : document.body;
      parents(element).reverse().forEach(function (element) {
        return update(element[DATA], e);
      });
      apply(element, function (element) {
        return update(element[DATA], e);
      });
    };
    Object.defineProperty(UICommon, 'container', {
      get: function get() {
        return typeof container !== 'undefined' ? container : document.body;
      },
      set: function set(element) {
        container = $(element);
      }
    });
  }
  function update(data, e) {
    if (!data) {
      return;
    }
    for (var name in data) {
      if (data[name]._connected) {
        data[name]._callUpdate(e);
      }
    }
  }

  function initializeApi (UICommon) {
    var uid = 0;
    UICommon.prefix;
    UICommon.prototype._init = function (opts) {
      var options = opts || {};
      options.data = normalizeData(options, this.constructor.options);
      this.$options = mergeOptions(this.constructor.options, options, this);
      this.$el = null;
      this.$props = {};
      this._uid = uid++;
      this._initData();
      this._initMethods();
      this._initComputeds();
      this._callHook('created');
      if (options.el) {
        this.$mount(options.el);
      }
    };
    UICommon.prototype._initData = function () {
      var _ = this;
      var _this$$options$data = this.$options.data,
        data = _this$$options$data === void 0 ? {} : _this$$options$data;
      for (var key in data) {
        _.$props[key] = _[key] = data[key];
      }
    };
    UICommon.prototype._initMethods = function () {
      var _ = this;
      var methods = this.$options.methods;
      if (methods) {
        for (var key in methods) {
          _[key] = methods[key].bind(_);
        }
      }
    };
    UICommon.prototype._initComputeds = function () {
      var _ = this;
      var computed = this.$options.computed;
      _._computeds = {};
      if (computed) {
        for (var key in computed) {
          registerComputed(_, key, computed[key]);
        }
      }
    };
    UICommon.prototype._initProps = function (props) {
      var key;
      props = props || getProps(this.$options, this.$name);
      for (key in props) {
        if (!isUndefined(props[key])) {
          this.$props[key] = props[key];
        }
      }
      var exclude = [this.$options.computed, this.$options.methods];
      for (key in this.$props) {
        if (key in props && notIn(exclude, key)) {
          this[key] = this.$props[key];
        }
      }
    };
    UICommon.prototype._initEvents = function () {
      this._events = [];
      var _ = this;
      var events = _.$options.events;
      if (events) {
        events.forEach(function (event) {
          if (!hasOwn(event, 'handler')) {
            for (var key in event) {
              registerEvent(_, event[key], key);
            }
          } else {
            registerEvent(_, event);
          }
        });
      }
    };
    UICommon.prototype._unbindEvents = function () {
      this._events.forEach(function (unbind) {
        return unbind();
      });
      delete this._events;
    };
    UICommon.prototype._initObservers = function () {
      this._observers = [initChildListObserver(this), initPropsObserver(this)];
    };
    UICommon.prototype.registerObserver = function () {
      var _this$_observers;
      (_this$_observers = this._observers).push.apply(_this$_observers, arguments);
    };
    UICommon.prototype._disconnectObservers = function () {
      this._observers.forEach(function (observer) {
        return observer && observer.disconnect();
      });
    };
    UICommon.prototype._callHook = function (hook) {
      var _this = this;
      var handlers = this.$options[hook];
      if (handlers) handlers.forEach(function (handlers) {
        return handlers.call(_this);
      });
    };
    UICommon.prototype._callConnected = function () {
      if (this._connected) return;
      this._data = {};
      this._computeds = {};
      this._frames = {
        reads: {},
        writes: {}
      };
      this._initProps();
      this._callHook('beforeConnect');
      this._connected = true;
      this._initEvents();
      if (window.MutationObserver) this._initObservers();
      this._callHook('connected');
      this._callUpdate();
    };
    UICommon.prototype._callDisconnected = function () {
      if (!this._connected) return;
      this._callHook('beforeDisconnect');
      if (this._observer) {
        this._observer.disconnect();
        this._observer = null;
      }
      this._unbindEvents();
      this._callHook('disconnected');
      this._connected = false;
    };
    UICommon.prototype._callUpdate = function () {
      var _this2 = this;
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'update';
      var type = e.type || e;
      if (type === 'update' || type === 'resize') {
        this._callWatches();
      }
      var updates = this.$options.update;
      var _this$_frames = this._frames;
        _this$_frames.reads;
        var writes = _this$_frames.writes;
      if (!updates) return;
      updates.forEach(function (_ref, i) {
        var read = _ref.read,
          write = _ref.write,
          events = _ref.events;
        if (type !== 'update' && !includes(events, type)) return;
        if (read && !includes(fastdom.reads, read[i])) {
          read[i] = fastdom.read(function () {
            var result = _this2._connected && read.call(_this2, _this2._data, type);
            if (result === false && write) {
              fastdom.clear(writes[i]);
            } else if (isPlainObject(result)) {
              assign(_this2._data, result);
            }
          });
        }
        if (write && !includes(fastdom.writes, writes[i])) {
          writes[i] = fastdom.write(function () {
            return _this2._connected && write.call(_this2, _this2._data, type);
          });
        }
      });
    };
    UICommon.prototype._callWatches = function () {
      var _this3 = this;
      var _frames = this._frames;
      if (_frames._watch) {
        return;
      }
      var initital = !hasOwn(_frames, '_watch');
      _frames._watch = fastdom.read(function () {
        if (!_this3._connected) {
          return;
        }
        var computed = _this3.$options.computed,
          _computeds = _this3._computeds;
        for (var key in computed) {
          var hasPrev = hasOwn(_computeds, key);
          var prev = _computeds[key];
          delete _computeds[key];
          var _computed$key = computed[key],
            watch = _computed$key.watch,
            immediate = _computed$key.immediate;
          if (watch && (initital && immediate || hasPrev && !isEqual(prev, _this3[key]))) {
            watch.call(_this3, _this3[key], prev);
          }
        }
        _frames._watch = null;
      });
    };
  }
  function getProps(opts, name) {
    var data$1 = {};
    var _opts$args = opts.args,
      args = _opts$args === void 0 ? [] : _opts$args,
      _opts$props = opts.props,
      props = _opts$props === void 0 ? {} : _opts$props,
      el = opts.el;
    if (!props) {
      return data$1;
    }
    for (var key in props) {
      var prop = hyphenate(key);
      var value = data(el, prop);
      if (isUndefined(value)) {
        continue;
      }
      value = props[key] === Boolean && value === '' ? true : coerce(props[key], value);
      if (prop === 'target' && (!value || startsWith(value, '_'))) {
        continue;
      }
      data$1[key] = value;
    }
    var options = parseOptions(data(el, name), args);
    for (var _key in options) {
      var _prop = camelize(_key);
      if (props[_prop] !== undefined) {
        data$1[_prop] = coerce(props[_prop], options[_key]);
      }
    }
    return data$1;
  }
  function notIn(options, key) {
    return options.every(function (arr) {
      return !arr || !hasOwn(arr, key);
    });
  }
  function coerce(type, value) {
    if (type === Boolean) {
      return toBoolean(value);
    } else if (type === Number) {
      return toNumber(value);
    } else if (type === 'list') {
      return toList(value);
    }
    return type ? type(value) : value;
  }
  function toList(value) {
    return isArray(value) ? value : isString(value) ? value.split(/,(?![^(]*\))/).map(function (value) {
      return isNumeric(value) ? toNumber(value) : toBoolean(value.trim());
    }) : [value];
  }
  function registerEvent(component, event, key) {
    if (!isPlainObject(event)) {
      event = {
        name: key,
        handler: event
      };
    }
    var _event = event,
      name = _event.name,
      el = _event.el,
      handler = _event.handler,
      capture = _event.capture,
      passive = _event.passive,
      delegate = _event.delegate,
      filter = _event.filter,
      self = _event.self;
    el = isFunction(el) ? el.call(component) : el || component.$el;
    if (isArray(el)) {
      el.forEach(function (el) {
        return registerEvent(component, _objectSpread2(_objectSpread2({}, event), {}, {
          el: el
        }), key);
      });
      return;
    }
    if (!el || filter && !filter.call(component)) {
      return;
    }
    component._events.push(on(el, name, delegate ? isString(delegate) ? delegate : delegate.call(component) : null, isString(handler) ? component[handler] : handler.bind(component), {
      passive: passive,
      capture: capture,
      self: self
    }));
  }
  function normalizeData(_ref2, _ref3) {
    var data = _ref2.data;
      _ref2.el;
    var args = _ref3.args,
      _ref3$props = _ref3.props,
      props = _ref3$props === void 0 ? {} : _ref3$props;
    data = isArray(data) ? !isEmpty(args) ? data.slice(0, args.length).reduce(function (data, value, index) {
      if (isPlainObject(value)) {
        assign(data, value);
      } else {
        data[args[index]] = value;
      }
      return data;
    }, {}) : undefined : data;
    if (data) {
      for (var key in data) {
        if (isUndefined(data[key])) {
          delete data[key];
        } else {
          data[key] = props[key] ? coerce(props[key], data[key]) : data[key];
        }
      }
    }
    return data;
  }
  function registerComputed(component, key, cb) {
    Object.defineProperty(component, key, {
      enumerable: true,
      get: function get() {
        var _computeds = component._computeds,
          $props = component.$props,
          $el = component.$el;
        if (!hasOwn(_computeds, key)) {
          _computeds[key] = (cb.get || cb).call(component, $props, $el);
        }
        return _computeds[key];
      },
      set: function set(value) {
        var _computeds = component._computeds;
        _computeds[key] = cb.set ? cb.set.call(component, value) : value;
        if (isUndefined(_computeds[key])) {
          delete _computeds[key];
        }
      }
    });
  }
  function initChildListObserver(component) {
    var el = component.$options.el;
    var observer = new MutationObserver(function () {
      console.log('el');
      return component.$emit();
    });
    observer.observe(el, {
      childList: true,
      subtree: true
    });
    return observer;
  }
  function initPropsObserver(component) {
    var $name = component.$name,
      $options = component.$options,
      $props = component.$props;
    var attrs = $options.attrs,
      props = $options.props,
      el = $options.el;
    if (!props || attrs === false) {
      return;
    }
    var attributes = isArray(attrs) ? attrs : Object.keys(props);
    var filter = attributes.map(function (key) {
      return hyphenate(key);
    }).concat($name);
    var observer = new MutationObserver(function (records) {
      var data = getProps($options, $name);
      if (records.some(function (_ref4) {
        var attributeName = _ref4.attributeName;
        var prop = attributeName.replace('data-', '');
        return (prop === $name ? attributes : [camelize(prop), camelize(attributeName)]).some(function (prop) {
          return !isUndefined(data[prop]) && data[prop] !== $props[prop];
        });
      })) {
        component.$reset();
      }
    });
    observer.observe(el, {
      attributes: true,
      attributeFilter: filter.concat(filter.map(function (key) {
        return "data-".concat(key);
      })).concat(filter.map(function (key) {
        return "".concat(key);
      }))
    });
    return observer;
  }

  function instanceApi (UICommon) {
    var DATA = UICommon.data;
    UICommon.prototype.$create = function (component, element, data) {
      return UICommon[component](element, data);
    };
    UICommon.prototype.$mount = function (el) {
      var name = this.$options.name;
      if (!el[DATA]) {
        el[DATA] = {};
      }
      if (el[DATA][name]) return;
      el[DATA][name] = this;
      this.$el = this.$options.el = this.$options.el || el;
      if (within(el, document)) {
        this._callConnected();
      }
    };
    UICommon.prototype.$reset = function () {
      this._callDisconnected();
      this._callConnected();
    };
    UICommon.prototype.$destroy = function () {
      var removeEl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var _this$$options = this.$options,
        el = _this$$options.el,
        name = _this$$options.name;
      if (el) this._callDisconnected();
      this._callHook('destory');
      if (!el || !el[DATA]) return;
      delete el[DATA][name];
      if (!isEmpty$1(el[DATA])) delete el[DATA];
      if (removeEl) remove$1(this.$el);
    };
    UICommon.prototype.$emit = function (e) {
      this._callUpdate(e);
    };
    UICommon.prototype.$update = function () {
      var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.$el;
      var e = arguments.length > 1 ? arguments[1] : undefined;
      UICommon.update(element, e);
    };
    UICommon.prototype.$getComponent = UICommon.getComponent;
    var names = {};
    Object.defineProperties(UICommon.prototype, {
      $container: Object.getOwnPropertyDescriptor(UICommon, 'container'),
      $name: {
        get: function get() {
          var name = this.$options.name;
          if (!names[name]) {
            names[name] = UICommon.prefix + hyphenate(name);
          }
          return names[name];
        }
      }
    });
  }

  var Class = {
    connected: function connected() {
      !hasClass(this.$el, this.$name) && addClass(this.$el, this.$name);
    }
  };

  var Togglable = {
    props: {
      cls: Boolean,
      animation: 'list',
      duration: Number,
      origin: String,
      transition: String
    },
    data: {
      cls: false,
      animation: [false],
      duration: 300,
      origin: false,
      transition: 'linear',
      clsEnter: "".concat(cssPrefix, "togglabe-enter"),
      clsLeave: "".concat(cssPrefix, "togglabe-leave"),
      initProps: {
        overflow: '',
        height: '',
        paddingTop: '',
        paddingBottom: '',
        marginTop: '',
        marginBottom: ''
      },
      hideProps: {
        overflow: 'hidden',
        height: 0,
        paddingTop: 0,
        paddingBottom: 0,
        marginTop: 0,
        marginBottom: 0
      }
    },
    computed: {
      hasAnimation: function hasAnimation(_ref) {
        var animation = _ref.animation;
        return !!animation[0];
      },
      hasTransition: function hasTransition(_ref2) {
        var animation = _ref2.animation;
        return this.hasAnimation && animation[0] === true;
      }
    },
    methods: {
      toggleElement: function toggleElement(targets, toggle, animate) {
        var _this = this;
        return new Promise$1(function (resolve) {
          return Promise$1.all(toNodes(targets).map(function (el) {
            var show = isBoolean(toggle) ? toggle : !_this.isToggled(el);
            if (!trigger(el, "before".concat(show ? 'show' : 'hide'), [_this])) {
              return Promise$1.reject();
            }
            var promise = (isFunction(animate) ? animate : animate === false || !_this.hasAnimation ? _this._toggle : _this.hasTransition ? toggleHeight(_this) : toggleAnimation(_this))(el, show, _this) || Promise$1.resolve();
            var cls = show ? _this.clsEnter : _this.clsLeave;
            addClass(el, cls);
            trigger(el, show ? 'show' : 'hide', [_this]);
            var done = function done() {
              removeClass(el, cls);
              trigger(el, show ? 'shown' : 'hidden', [_this]);
              _this.$update(el);
            };
            return promise ? promise.then(done, function () {
              removeClass(el, cls);
              return Promise$1.reject();
            }) : done();
          })).then(resolve, noop);
        });
      },
      isToggled: function isToggled() {
        var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.$el;
        var _toNodes = toNodes(el);
        var _toNodes2 = _slicedToArray(_toNodes, 1);
        el = _toNodes2[0];
        return hasClass(el, this.clsEnter) ? true : hasClass(el, this.clsLeave) ? false : this.cls ? hasClass(el, this.cls.split(' ')[0]) : isVisible(el);
      },
      _toggle: function _toggle(el, toggled) {
        if (!el) {
          return;
        }
        toggled = Boolean(toggled);
        var changed;
        if (this.cls) {
          changed = includes(this.cls, ' ') || toggled !== hasClass(el, this.cls);
          changed && toggleClass(el, this.cls, includes(this.cls, ' ') ? undefined : toggled);
        } else {
          changed = toggled === el.hidden;
          changed && (el.hidden = !toggled);
        }
        $$('[autofocus]', el).some(function (el) {
          return isVisible(el) ? el.focus() || true : el.blur();
        });
        if (changed) {
          trigger(el, 'toggled', [toggled, this]);
          // this.$update(el);
        }
      }
    }
  };

  function toggleHeight(_ref3) {
    var isToggled = _ref3.isToggled,
      duration = _ref3.duration,
      initProps = _ref3.initProps,
      hideProps = _ref3.hideProps,
      transition = _ref3.transition,
      _toggle = _ref3._toggle;
    return function (el, show) {
      var inProgress = Transition.inProgress(el);
      var inner = el.hasChildNodes ? toFloat(css(el.firstElementChild, 'marginTop')) + toFloat(css(el.lastElementChild, 'marginBottom')) : 0;
      var currentHeight = isVisible(el) ? height(el) + (inProgress ? 0 : inner) : 0;
      Transition.cancel(el);
      if (!isToggled(el)) {
        _toggle(el, true);
      }
      height(el, '');

      // Update child components first
      fastdom.flush();
      var endHeight = height(el) + (inProgress ? 0 : inner);
      height(el, currentHeight);
      return (show ? Transition.start(el, assign({}, initProps, {
        overflow: 'hidden',
        height: endHeight
      }), Math.round(duration * (1 - currentHeight / endHeight)), transition) : Transition.start(el, hideProps, Math.round(duration * (currentHeight / endHeight)), transition).then(function () {
        return _toggle(el, false);
      })).then(function () {
        return css(el, initProps);
      });
    };
  }
  function toggleAnimation(cmp) {
    return function (el, show) {
      Animation.cancel(el);
      var animation = cmp.animation,
        duration = cmp.duration,
        _toggle = cmp._toggle;
      if (show) {
        _toggle(el, true);
        return Animation["in"](el, animation[0], duration, cmp.origin);
      }
      return Animation.out(el, animation[1] || animation[0], duration, cmp.origin).then(function () {
        return _toggle(el, false);
      });
    };
  }

  var accordion = {
    mixins: [Class, Togglable],
    props: {
      targets: String,
      active: null,
      openText: String,
      closeText: String,
      collapsible: Boolean,
      multiple: Boolean,
      toggle: String,
      content: String,
      transition: String,
      offset: Number
    },
    data: {
      targets: '> *',
      active: false,
      animation: [true],
      collapsible: true,
      multiple: false,
      openText: "열기",
      closeText: "닫기",
      clsOpen: 'mui_open',
      toggle: ' .mui_acc_button',
      content: '> .mui_acc_content',
      transition: 'ease',
      duration: 100,
      offset: 0
    },
    computed: {
      items: {
        get: function get(_ref, $el) {
          var targets = _ref.targets;
          return $$(targets, $el);
        },
        watch: function watch(items, prev) {
          var _this = this;
          items.forEach(function (el) {
            return hide($$1(_this.content, el), !hasClass(el, _this.clsOpen));
          });
          if (prev || hasClass(items, this.clsOpen)) {
            return;
          }
          var active = this.active !== false && items[Number(this.active)] || !this.collapsible && items[0];
          if (active) {
            this.toggle(active, false);
          }
        },
        immediate: true
      },
      toggles: function toggles(_ref2) {
        var toggle = _ref2.toggle;
        return this.items.map(function (item) {
          return $$1(toggle, item);
        });
      }
    },
    events: [{
      name: 'click',
      delegate: function delegate() {
        return "".concat(this.targets, " ").concat(this.$props.toggle);
      },
      handler: function handler(e) {
        e.preventDefault();
        this.toggle(index(this.toggles, e.current));
      }
    }],
    methods: {
      toggle: function toggle(item, animate) {
        var _this2 = this;
        var items = [this.items[getIndex(item, this.items)]];
        var activeItems = filter(this.items, ".".concat(this.clsOpen));
        if (!this.multiple && !includes(activeItems, items[0])) {
          items = items.concat(activeItems);
        }
        if (!this.collapsible && activeItems.length < 2 && !filter(items, ":not(.".concat(this.clsOpen, ")")).length) {
          return;
        }
        items.forEach(function (el) {
          return _this2.toggleElement(el, !hasClass(el, _this2.clsOpen), function (el, show) {
            toggleClass(el, _this2.clsOpen, show);
            $$1(_this2.$props.toggle, el).innerHTML = show ? _this2.closeText : _this2.openText;
            attr($$1(_this2.$props.toggle, el), 'aria-expanded', show);
            var content = $$1("".concat(el._wrapper ? '> * ' : '').concat(_this2.content), el);
            if (animate === false || !_this2.hasTransition) {
              hide(content, !show);
              return;
            }
            if (!el._wrapper) {
              el._wrapper = wrapAll(content, "<div".concat(show ? ' hidden' : '', ">"));
            }
            hide(content, false);
            return toggleHeight(_this2)(el._wrapper, show).then(function () {
              hide(content, !show);
              delete el._wrapper;
              unwrap(content);
              if (show) {
                var toggle = $$1(_this2.$props.toggle, el);
                if (!isInView(toggle)) {
                  scrollIntoView(toggle, {
                    offset: _this2.offset
                  });
                }
              }
            });
          });
        });
      }
    }
  };
  function hide(el, hide) {
    el && (el.hidden = hide);
  }

  var alert$1 = {
    mixins: [Class, Togglable],
    args: 'animation',
    props: {
      close: String
    },
    data: {
      animation: [true],
      selClose: '.uk-alert-close',
      duration: 150,
      hideProps: assign({
        opacity: 0
      }, Togglable.data.hideProps)
    },
    events: [{
      name: 'click',
      delegate: function delegate() {
        return this.selClose;
      },
      handler: function handler(e) {
        e.preventDefault();
        this.close();
      }
    }],
    methods: {
      close: function close() {
        var _this = this;
        this.toggleElement(this.$el).then(function () {
          return _this.$destroy(true);
        });
      }
    }
  };

  var Button = {
    mixins: [Togglable],
    props: {
      target: String,
      clsContainer: String,
      multiple: Boolean,
      isContainer: Boolean
    },
    data: {
      target: ".".concat(cssPrefix, "item"),
      clsActive: "".concat(cssPrefix, "active"),
      clsContainer: ".".concat(cssPrefix, "box"),
      isContainer: false,
      multiple: false
    },
    computed: {
      connects: {
        get: function get(_ref, $el) {
          var target = _ref.target,
            clsContainer = _ref.clsContainer,
            isContainer = _ref.isContainer;
          var el = isContainer ? clsContainer : target;
          return $$(el, $el);
        },
        watch: function watch(connects) {
          var n = this.index() < 0 ? 0 : this.index();
          this.toggle(connects[n]);
        },
        immediate: true
      }
    },
    events: [{
      name: 'click',
      delegate: function delegate() {
        return this.target;
      },
      handler: function handler(e) {
        e.preventDefault();
        this.toggle(e.current);
      }
    }],
    methods: {
      index: function index() {
        var _this = this;
        return findIndex(this.connects, function (el) {
          return hasClass(el, _this.clsActive);
        });
      },
      toggle: function toggle(target) {
        var _this2 = this;
        var item = this.isContainer ? closest(target, this.clsContainer) : target;
        var lists = [this.connects[getIndex(item, this.connects)]];
        var activeItem = filter(this.connects, ".".concat(this.clsActive));
        if (!this.multiple) {
          if (hasClass(item, this.clsActive)) return false;
          lists = lists.concat(activeItem);
        }
        lists.forEach(function (el) {
          return _this2.toggleElement(el, !hasClass(el, _this2.clsActive), function (el, show) {
            return toggleClass(el, _this2.clsActive, show);
          });
        });
      }
    }
  };

  var calendar = {
    functional: true,
    props: {
      pickerButton: Boolean,
      value: String
    },
    data: {
      target: '> * input',
      pcikerBtn: '>.mui_picker_btn',
      dateBtn: '.mui_days button',
      testValue: '',
      testBtn: '>.testbtn',
      pickerButton: false,
      value: '',
      initialValue: '',
      initialDate: null,
      viewDate: null,
      isActivePicker: false,
      days: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
      daysMin: ['일', '월', '화', '수', '목', '금', '토'],
      months: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
      weekStart: 0,
      //시작 요일
      weeks: null,
      bodys: null,
      prevBtn: '.picker_header>.prev_btn',
      nextBtn: '.picker_header>.next_btn',
      $year: '.picker_header>.year_month>.current_year',
      $month: '.picker_header>.year_month>.current_month',
      format: 'yyyy-mm-dd',
      // The start view date
      startDate: null,
      // The end view date
      endDate: null,
      // The initial date
      date: null,
      // Filter each date item (return `false` to disable a date item)
      filter: null,
      pickerHeader: '.picker_contents>.mui_calendar>.head',
      pickerBody: '.picker_contents>.mui_calendar>.body',
      activeClassName: 'mui_active',
      disabledClassName: 'mui_disabled',
      weeksClassName: 'mui_weeks',
      daysClassName: 'mui_days',
      templateID: '#muiDatepicker',
      template: "<div class=\"mui_datepicker_layer\" id=\"muiDatepicker\">\n                <div class=\"picker_header\">\n                  <button type=\"button\" class=\"prev_btn\"><span class=\"text\">\uC774\uC804 \uB2EC \uBCF4\uAE30</span></button>\n                  <span class=\"year_month\">\n                    <span class=\"current_year\"></span>\n                    <span class=\"current_month\"></span>\n                  </span>                  \n                  <button type=\"button\" class=\"next_btn\"><span class=\"text\">\uB2E4\uC74C \uB2EC \uBCF4\uAE30</span></button>\n                </div>\n                <div class=\"picker_contents\">\n                  <table class=\"mui_calendar\">\n                    <thead class=\"head\"></thead>\n                    <tbody class=\"body\"></tbody>\n                  </table>\n                </div>\n              </div>"
    },
    created: function created() {
      this.$el = fragment(this.template);
      this.$mount(this.$el);
    },
    computed: {
      prevBtn: function prevBtn(_ref) {
        var prevBtn = _ref.prevBtn;
        return $$1(prevBtn, this.calendar);
      },
      nextBtn: function nextBtn(_ref2) {
        var nextBtn = _ref2.nextBtn;
        return $$1(nextBtn, this.calendar);
      },
      $year: function $year(_ref3) {
        var $year = _ref3.$year;
        return $$1($year, this.calendar);
      },
      $month: function $month(_ref4) {
        var $month = _ref4.$month;
        return $$1($month, this.calendar);
      },
      target: function target(_ref5, $el) {
        var target = _ref5.target;
        return $$1(target, $el);
      },
      targetValue: function targetValue(_ref6) {
        var test = _ref6.test,
          value = _ref6.value;
        return "".concat(test, "234234233444").concat(value);
      } // testBtn: {
      //   get({testBtn}, $el) {
      //     console.log('testBtnGet')
      //     return $$(testBtn, $el);
      //   },
      //   watch(testBtn) {
      //     console.log('바뀌고 있나??')
      //     testBtn.forEach(el => addClass(el, "testtttttttttttttt"));
      //   },
      //   immediate: true
      // },
      // currentDate: {
      //   get({target}, $el) {
      //     return $(target, $el);
      //   },
      //   watch(target, testValue) {
      //     testValue = target.value
      //     this.testUpdate()
      //   },
      //   immediate: true
      // }
      // pickerButton({pickerButton}, $el) {
      //   // console.log(toNode(pickerButton))
      //   if (!pickerButton) {
      //     return null;
      //   }
      //   console.log($el)
      //   return append($el, '<span class="mui_picker_btn"><button type="button">캘린더 열기</button></span>')
      // }
    },
    // created() {
    //   this.picker = 'dfdsfsfaasfasfs'
    // },
    // beforeConnect() {
    //   console.log(`beforeConnect ${this.$el}`)
    // },
    connected: function connected() {
      var pickerButton = this.pickerButton,
        startDate = this.startDate,
        endDate = this.endDate,
        $el = this.$el;
      var initialValue = this.initialValue,
        date = this.date;
      this.pickerButton = !pickerButton || append($el, '<span class="mui_picker_btn"><button type="button">캘린더 열기</button></span>');
      this.format = parseFormat$1(this.format);
      // console.log(this.format)

      this.initialValue = this.getValue();
      date = this.parseDate(date || initialValue);
      this.date = date;
      this.viewDate = new Date(date);
      this.initialDate = new Date(this.date);
      this.weeks = find(this.pickerHeader, this.calendar);
      this.bodys = find(this.pickerBody, this.calendar);

      // append(this.weeks, this.renderWeek())
      this.weeks.innerHTML = this.renderWeek();
      // append(this.$el, this.calendar)

      // console.log(find(this.pickerHeader, this.calendar))

      // console.log()
      // console.log($(this.pickerHeader, this.calendar))
      // startDate, endDate  = range 형태의 켈린더일 경우 사용
      if (startDate) {
        this.parseDate(startDate), _readOnlyError("startDate");
        if (date.getTime() < startDate.getTime()) {
          date = new Date(startDate);
        }
        this.startDate = startDate;
      }
      if (endDate) {
        this.parseDate(endDate), _readOnlyError("endDate");
        if (startDate && endDate.getTime() < startDate.getTime()) {
          _readOnlyError("endDate");
        }
        if (date.getTime() > endDate.getTime()) {
          date = new Date(endDate);
        }
        this.endDate = endDate;
      }
    },
    // beforeDisconnect() {
    //   console.log('disconnected');
    // },
    // disconnected() {
    //   console.log('disconnected');
    // },
    destory: function destory() {
      console.log('destory');
    },
    events: [{
      name: 'click',
      delegate: function delegate() {
        return this.$props.target;
      },
      handler: function handler(e) {
        e.preventDefault();
        if (!this.isActivePicker) this.renderPickerDate();
      }
    }, {
      name: 'click',
      el: document,
      filter: function filter() {
        return this.isActivePicker;
      },
      handler: function handler(e) {
        var target = e.target;
        var hidden = true;
        var $el = this.$el,
          calendar = this.calendar;
        while (target !== document) {
          if (target === $el || target === calendar) {
            hidden = false;
            break;
          }
          target = target.parentNode;
        }
        console.log(hidden);
      }
    }, {
      name: 'click',
      el: function el() {
        return this.calendar;
      },
      delegate: function delegate() {
        return this.$props.prevBtn;
      },
      handler: function handler(e) {
        e.preventDefault();
        console.log('이전');
        var year = this.viewDate.getFullYear();
        var month = this.viewDate.getMonth() - 1;
        var day = this.viewDate.getDate();
        this.viewDate = new Date(year, month, day);
        this.renderPickerDate();
      }
    }, {
      name: 'click',
      el: function el() {
        return this.calendar;
      },
      delegate: function delegate() {
        return this.$props.nextBtn;
      },
      handler: function handler(e) {
        e.preventDefault();
        console.log('다음');
        var year = this.viewDate.getFullYear();
        var month = this.viewDate.getMonth() + 1;
        var day = this.viewDate.getDate();
        this.viewDate = new Date(year, month, day);
        this.renderPickerDate();
      }
    }, {
      name: 'click',
      el: function el() {
        return this.calendar;
      },
      delegate: function delegate() {
        return "".concat(this.pickerBody, " ").concat(this.dateBtn);
      },
      handler: function handler(e) {
        e.preventDefault();
        console.log('날짜');
        var date = this.parseDate(data(e.current, 'date'));
        console.log(date);
        this.viewDate = date;
        this.setValue();
      }
    },
    // 
    {
      name: 'keyup',
      delegate: function delegate() {
        return this.$props.target;
      },
      handler: function handler(e) {
        // e.preventDefault();
        console.log(this.getValue());
        // this.target.value = this.value+=e.key;
        // console.log(this.testValue)
      }
    }, {
      name: 'click',
      delegate: function delegate() {
        return this.pcikerBtn;
      },
      handler: function handler(e) {
        e.preventDefault();
        this.setValue();
      }
    }],
    // events: {
    //   click(e) {
    //     console.log(e)
    //   },
    // },

    methods: {
      renderPickerDate: function renderPickerDate() {
        var viewDate = this.viewDate,
          $year = this.$year,
          $month = this.$month,
          months = this.months,
          calendar = this.calendar;
        var yearText = viewDate.getFullYear();
        var montText = months[viewDate.getMonth()];
        this.isActivePicker = true;
        console.log(this.isActivePicker);
        $year.innerHTML = yearText;
        $month.innerHTML = montText;
        calendar.connected = this.$el;
        addClass(calendar, 'mui_active');
        return this.renderDays();
      },
      testUpdate: function testUpdate() {
        console.log(this.$el);
      },
      getValue: function getValue() {
        return this.target.value;
      },
      setValue: function setValue() {
        this.target.value = this.formatDate(this.viewDate);
      },
      createItem: function createItem(data, type) {
        var activeClassName = this.activeClassName,
          disabledClassName = this.disabledClassName,
          weeksClassName = this.weeksClassName,
          daysClassName = this.daysClassName;
        var itemDefault = {
          text: '',
          view: '',
          prev: false,
          next: false,
          active: false,
          disabled: false,
          classes: type === 'title' ? [weeksClassName] : [daysClassName],
          tag: type === 'title' ? 'th' : 'td'
        };
        var item = mergeOptions(itemDefault, data);
        if (item.active) item.classes.push(activeClassName);

        // 이전 달이거나 다음 달일 경우
        if (item.prev || item.next) item.classes.push(disabledClassName);
        if (type !== 'title') {
          item.text = "<button type=\"button\" data-date=\"".concat(item.data, "\">").concat(item.text, "</button>");
        }
        return "<".concat(item.tag, " class=\"").concat(item.classes.join(' '), "\">").concat(item.text, "</").concat(item.tag, ">");
      },
      renderWeek: function renderWeek() {
        var _this = this;
        var items = ['<tr>'];
        var weekStart = this.weekStart,
          days = this.days,
          daysMin = this.daysMin;
        weekStart = parseInt(weekStart, 10) % 7;
        days = days.slice(weekStart).concat(days.slice(0, weekStart));
        daysMin = daysMin.slice(weekStart).concat(daysMin.slice(0, weekStart));
        each(daysMin, function (day, i) {
          items.push(_this.createItem({
            text: day,
            title: daysMin[i]
          }, 'title'));
        });
        items.push('</tr>');
        // console.log(items)
        return items.join('');
        // this.$week.html(items.join(''));
      },
      renderYears: function renderYears() {
        var options = this.options,
          startDate = this.startDate,
          endDate = this.endDate;
        var disabledClass = options.disabledClass,
          filter = options.filter,
          yearSuffix = options.yearSuffix;
        var viewYear = this.viewDate.getFullYear();
        var now = new Date();
        var thisYear = now.getFullYear();
        var year = this.date.getFullYear();
        var start = -5;
        var end = 6;
        var items = [];
        var prevDisabled = false;
        var nextDisabled = false;
        var i;
        for (i = start; i <= end; i += 1) {
          var date = new Date(viewYear + i, 1, 1);
          var disabled = false;
          if (startDate) {
            disabled = date.getFullYear() < startDate.getFullYear();
            if (i === start) {
              prevDisabled = disabled;
            }
          }
          if (!disabled && endDate) {
            disabled = date.getFullYear() > endDate.getFullYear();
            if (i === end) {
              nextDisabled = disabled;
            }
          }
          if (!disabled && filter) {
            disabled = filter.call(this.$element, date, 'year') === false;
          }
          var picked = viewYear + i === year;
          var view = picked ? 'year picked' : 'year';
          items.push(this.createItem({
            picked: picked,
            disabled: disabled,
            text: viewYear + i,
            view: disabled ? 'year disabled' : view,
            highlighted: date.getFullYear() === thisYear
          }));
        }
        this.$yearsPrev.toggleClass(disabledClass, prevDisabled);
        this.$yearsNext.toggleClass(disabledClass, nextDisabled);
        this.$yearsCurrent.toggleClass(disabledClass, true).html("".concat(viewYear + start + yearSuffix, " - ").concat(viewYear + end).concat(yearSuffix));
        this.$years.html(items.join(''));
      },
      renderMonths: function renderMonths() {
        var options = this.options,
          startDate = this.startDate,
          endDate = this.endDate,
          viewDate = this.viewDate;
        var disabledClass = options.disabledClass || '';
        var months = options.monthsShort;
        var filter = $$1.isFunction(options.filter) && options.filter;
        var viewYear = viewDate.getFullYear();
        var now = new Date();
        var thisYear = now.getFullYear();
        var thisMonth = now.getMonth();
        var year = this.date.getFullYear();
        var month = this.date.getMonth();
        var items = [];
        var prevDisabled = false;
        var nextDisabled = false;
        var i;
        for (i = 0; i <= 11; i += 1) {
          var date = new Date(viewYear, i, 1);
          var disabled = false;
          if (startDate) {
            prevDisabled = date.getFullYear() === startDate.getFullYear();
            disabled = prevDisabled && date.getMonth() < startDate.getMonth();
          }
          if (!disabled && endDate) {
            nextDisabled = date.getFullYear() === endDate.getFullYear();
            disabled = nextDisabled && date.getMonth() > endDate.getMonth();
          }
          if (!disabled && filter) {
            disabled = filter.call(this.$element, date, 'month') === false;
          }
          var picked = viewYear === year && i === month;
          var view = picked ? 'month picked' : 'month';
          items.push(this.createItem({
            disabled: disabled,
            picked: picked,
            highlighted: viewYear === thisYear && date.getMonth() === thisMonth,
            index: i,
            text: months[i],
            view: disabled ? 'month disabled' : view
          }));
        }
        this.$yearPrev.toggleClass(disabledClass, prevDisabled);
        this.$yearNext.toggleClass(disabledClass, nextDisabled);
        this.$yearCurrent.toggleClass(disabledClass, prevDisabled && nextDisabled).html(viewYear + options.yearSuffix || '');
        this.$months.html(items.join(''));
      },
      renderDays: function renderDays() {
        this.$el;
          var startDate = this.startDate,
          endDate = this.endDate,
          viewDate = this.viewDate,
          currentDate = this.date;
        // const viewDate = new Date(2024, 8, 13)
        var weekStart = this.weekStart,
          filter = this.filter;
        // const {
        //   disabledClass,
        //   filter,
        //   months,
        //   weekStart,
        //   yearSuffix,
        // } = options;
        var viewYear = viewDate.getFullYear();
        var viewMonth = viewDate.getMonth();
        var now = new Date();
        var thisYear = now.getFullYear();
        var thisMonth = now.getMonth();
        var thisDay = now.getDate();
        var year = currentDate.getFullYear();
        var month = currentDate.getMonth();
        var day = currentDate.getDate();
        var length;
        var i;
        var n;

        // Days of prev month
        // -----------------------------------------------------------------------
        var prevItems = [];
        var prevViewYear = viewYear;
        var prevViewMonth = viewMonth;
        if (viewMonth === 0) {
          prevViewYear -= 1;
          prevViewMonth = 11;
        } else {
          prevViewMonth -= 1;
        }

        // The length of the days of prev month
        // 이전달의 마지막 날 또는 이전달의 길이
        length = getDaysInMonth$1(prevViewYear, prevViewMonth);

        // The first day of current month
        // 이번달의 첫 날
        var firstDay = new Date(viewYear, viewMonth, 1);
        // console.log(this.formatDate(firstDay))

        // The visible length of the days of prev month
        // 이전 달 중 보이는 날의 길이
        // [0,1,2,3,4,5,6] - [0,1,2,3,4,5,6] => [-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6]
        n = firstDay.getDay() - parseInt(weekStart, 10) % 7;
        // [-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6] => [1,2,3,4,5,6,7]

        if (n <= 0) {
          n += 7;
        }
        if (startDate) {
          firstDay.getTime() <= startDate.getTime();
        }
        for (i = length - (n - 1); i <= length; i += 1) {
          var prevViewDate = new Date(prevViewYear, prevViewMonth, i);
          var disabled = false;
          if (startDate) {
            disabled = prevViewDate.getTime() < startDate.getTime();
          }
          if (!disabled && filter) {
            disabled = filter.call($element, prevViewDate, 'day') === false;
          }
          prevItems.push(this.createItem({
            disabled: disabled,
            active: prevViewYear === thisYear && prevViewMonth === thisMonth && prevViewDate.getDate() === thisDay,
            prev: true,
            picked: prevViewYear === year && prevViewMonth === month && i === day,
            text: i,
            view: 'day prev',
            data: this.formatDate(prevViewDate)
          }));
        }

        // Days of next month
        // -----------------------------------------------------------------------

        var nextItems = [];
        var nextViewYear = viewYear;
        var nextViewMonth = viewMonth;
        if (viewMonth === 11) {
          nextViewYear += 1;
          nextViewMonth = 0;
        } else {
          nextViewMonth += 1;
        }

        // The length of the days of current month
        // 이번달의 마지막 날
        length = getDaysInMonth$1(viewYear, viewMonth);

        // The visible length of next month (42 means 6 rows and 7 columns)
        // 켈린더 개수 42칸 유지 (이번달 게수에서 이전 달 개수를 뺀 값)
        n = 42 - (prevItems.length + length);

        // The last day of current month
        var lastDate = new Date(viewYear, viewMonth, length);

        // endDate가 있을 경우
        if (endDate) {
          lastDate.getTime() >= endDate.getTime();
        }
        for (i = 1; i <= n; i += 1) {
          var date = new Date(nextViewYear, nextViewMonth, i);
          var picked = nextViewYear === year && nextViewMonth === month && i === day;
          var _disabled = false;
          if (endDate) {
            _disabled = date.getTime() > endDate.getTime();
          }
          if (!_disabled && filter) {
            _disabled = filter.call($element, date, 'day') === false;
          }
          nextItems.push(this.createItem({
            disabled: _disabled,
            picked: picked,
            active: nextViewYear === thisYear && nextViewMonth === thisMonth && date.getDate() === thisDay,
            next: true,
            text: i,
            view: 'day next',
            data: this.formatDate(date)
          }));
        }

        // Days of current month
        // -----------------------------------------------------------------------

        var items = [];
        for (i = 1; i <= length; i += 1) {
          var _date = new Date(viewYear, viewMonth, i);
          var _disabled2 = false;
          if (startDate) {
            _disabled2 = _date.getTime() < startDate.getTime();
          }
          if (!_disabled2 && endDate) {
            _disabled2 = _date.getTime() > endDate.getTime();
          }
          if (!_disabled2 && filter) {
            _disabled2 = filter.call($element, _date, 'day') === false;
          }
          var _picked = viewYear === year && viewMonth === month && i === day;
          var view = _picked ? 'day picked' : 'day';
          items.push(this.createItem({
            disabled: _disabled2,
            picked: _picked,
            highlighted: viewYear === thisYear && viewMonth === thisMonth && _date.getDate() === thisDay,
            text: i,
            view: _disabled2 ? 'day disabled' : view,
            data: this.formatDate(_date)
          }));
        }

        // , items, nextItems
        var currItems = [].concat(prevItems, items, nextItems);
        var itemes = [];
        // console.log(currItems)
        var column = 7;
        for (var _i = 0; _i < currItems.length; _i++) {
          var num = _i % column;
          if (num === 0) {
            itemes.push('<tr>');
            itemes.push(currItems[_i]);
          } else if (num === column - 1) {
            itemes.push(currItems[_i]);
            itemes.push('</tr>');
          } else {
            itemes.push(currItems[_i]);
          }
        }

        // Render days picker
        // -----------------------------------------------------------------------
        empty(this.bodys);
        this.bodys.innerHTML = itemes.join('');
        // this.$monthPrev.toggleClass(disabledClass, prevDisabled);
        // this.$monthNext.toggleClass(disabledClass, nextDisabled);
        // this.$monthCurrent
        //   .toggleClass(disabledClass, prevDisabled && nextDisabled)
        //   .html(options.yearFirst
        //     ? `${viewYear + yearSuffix} ${months[viewMonth]}`
        //     : `${months[viewMonth]} ${viewYear}${yearSuffix}`);
        // this.$days.html(prevItems.join('') + items.join('') + nextItems.join(''));
      },
      formatDate: function formatDate(date) {
        var format = this.format;
        var formatted = '';
        if (isDate(date)) {
          var year = date.getFullYear();
          var month = date.getMonth();
          var day = date.getDate();
          var values = {
            d: day,
            dd: addLeadingZero(day, 2),
            m: month + 1,
            mm: addLeadingZero(month + 1, 2),
            yy: String(year).substring(2),
            yyyy: addLeadingZero(year, 4)
          };
          formatted = format.source;
          each(format.parts, function (part) {
            formatted = formatted.replace(part, values[part]);
          });
        }
        return formatted;
      },
      parseDate: function parseDate(date) {
        var format = this.format;
        var parts = [];
        if (!isDate(date)) {
          if (isString(date)) {
            parts = date.match(/\d+/g) || [];
          }
          date = date ? new Date(date) : new Date();
          if (!isDate(date)) {
            date = new Date();
          }
          if (parts.length === format.parts.length) {
            // Set year and month first
            each(parts, function (i, part) {
              var value = parseInt(part, 10);
              switch (format.parts[i]) {
                case 'yy':
                  date.setFullYear(2000 + value);
                  break;
                case 'yyyy':
                  // Converts 2-digit year to 2000+
                  date.setFullYear(part.length === 2 ? 2000 + value : value);
                  break;
                case 'mm':
                case 'm':
                  date.setMonth(value - 1);
                  break;
              }
            });

            // Set day in the last to avoid converting `31/10/2019` to `01/10/2019`
            each(parts, function (i, part) {
              var value = parseInt(part, 10);
              switch (format.parts[i]) {
                case 'dd':
                case 'd':
                  date.setDate(value);
                  break;
              }
            });
          }
        }

        // Ignore hours, minutes, seconds and milliseconds to avoid side effect (#192)
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
      }
    },
    update: function update() {
      this.target.value = this.value;
      // console.log('update')
    }
  };

  function parseFormat$1(format) {
    var source = String(format).toLowerCase();
    var parts = source.match(/(y|m|d)+/g);
    if (!parts || parts.length === 0) {
      throw new Error('Invalid date format.');
    }
    format = {
      source: source,
      parts: parts
    };
    each(parts, function (part) {
      switch (part) {
        case 'dd':
        case 'd':
          format.hasDay = true;
          break;
        case 'mm':
        case 'm':
          format.hasMonth = true;
          break;
        case 'yyyy':
        case 'yy':
          format.hasYear = true;
          break;
      }
    });
    return format;
  }
  function getDaysInMonth$1(year, month) {
    return [31, isLeapYear$1(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
  }
  function isLeapYear$1(year) {
    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
  }

  var tab = {
    "extends": Button,
    props: {
      media: Boolean,
      boundary: Boolean,
      tabContents: String
    },
    data: {
      target: ">ul.".concat(cssPrefix, "tab_nav>*>:first-child"),
      clsContainer: ">ul.".concat(cssPrefix, "tab_nav>*"),
      tabContents: ">.tab_contents>div",
      clsOpen: "".concat(cssPrefix, "active"),
      isContainer: true
    },
    computed: {
      tabContents: {
        get: function get(_ref, $el) {
          var tabContents = _ref.tabContents;
          return $$(tabContents, $el);
        },
        watch: function watch(tabContents) {
          var n = this.index() < 0 ? 0 : this.index();
          this.activeTab(tabContents[n]);
        },
        immediate: true
      }
    },
    events: [{
      name: 'click',
      delegate: function delegate() {
        return this.target;
      },
      handler: function handler(e) {
        var n = this.index();
        this.activeTab(this.tabContents[n]);
      }
    }],
    methods: {
      activeTab: function activeTab(item) {
        var _this = this;
        this.tabContents.map(function (el) {
          return toggleClass(el, _this.clsOpen, el === item);
        });
      }
    }
  };

  var Lazyload = {
    data: {
      preload: 5
    },
    methods: {
      lazyload: function lazyload() {
        var _this = this;
        var observeTargets = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.$el;
        var targets = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.$el;
        this.registerObserver(observeIntersection(observeTargets, function (entries, observer) {
          var _iterator = _createForOfIteratorHelper(toNodes(isFunction(targets) ? targets() : targets)),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var el = _step.value;
              $$('[loading="lazy"]', el).slice(0, _this.preload - 1).forEach(function (el) {
                return removeAttr(el, 'loading');
              });
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
          var _iterator2 = _createForOfIteratorHelper(entries.filter(function (_ref) {
              var isIntersecting = _ref.isIntersecting;
              return isIntersecting;
            }).map(function (_ref2) {
              var target = _ref2.target;
              return target;
            })),
            _step2;
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var _el = _step2.value;
              observer.unobserve(_el);
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }));
      }
    }
  };

  var toggle = {
    mixins: [Lazyload, Togglable],
    props: {
      href: String,
      target: null,
      mode: 'list',
      queued: Boolean
    },
    data: {
      target: false,
      href: false,
      mode: 'click',
      queued: false,
      cont: ".".concat(cssPrefix, "toggle-cont"),
      activeClass: "".concat(cssPrefix, "active")
    },
    computed: {
      target: {
        get: function get(_ref, $el) {
          var href = _ref.href,
            target = _ref.target;
          target = queryAll(target || href, $el);
          return target.length && target || [$el];
        },
        watch: function watch() {
          this.updateAria();
          this.lazyload(this.$el, this.target);
        },
        document: true,
        immediate: true
      }
    },
    connected: function connected() {
      if (!includes(this.mode, 'media') && !isFocusable(this.$el)) {
        attr(this.$el, 'tabindex', '0');
      }
    },
    events: [{
      name: 'click',
      filter: function filter() {
        var _this = this;
        return ['click', 'hover'].some(function (mode) {
          return includes(_this.mode, mode);
        });
      },
      handler: function handler(e) {
        e.preventDefault();
        this.toggle();
      }
    }, {
      name: 'hide show',
      self: true,
      el: function el() {
        return this.target;
      },
      handler: function handler(_ref2) {
        var type = _ref2.type;
        this.updateAria(type === 'show');
      }
    }],
    methods: {
      toggle: function toggle(type) {
        var _this2 = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          var leaving, _iterator, _step, el, isLeaving, toggled;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (trigger(_this2.target, type || 'toggle', [_this2])) {
                    _context.next = 2;
                    break;
                  }
                  return _context.abrupt("return");
                case 2:
                  if (_this2.queued) {
                    _context.next = 4;
                    break;
                  }
                  return _context.abrupt("return", _this2.toggleElement(_this2.target));
                case 4:
                  leaving = _this2.target.filter(function (el) {
                    return hasClass(el, _this2.clsLeave);
                  });
                  if (!leaving.length) {
                    _context.next = 9;
                    break;
                  }
                  _iterator = _createForOfIteratorHelper(_this2.target);
                  try {
                    for (_iterator.s(); !(_step = _iterator.n()).done;) {
                      el = _step.value;
                      isLeaving = includes(leaving, el);
                      _this2.toggleElement(el, isLeaving, isLeaving);
                    }
                  } catch (err) {
                    _iterator.e(err);
                  } finally {
                    _iterator.f();
                  }
                  return _context.abrupt("return");
                case 9:
                  toggled = _this2.target.filter(_this2.isToggled);
                  _context.next = 12;
                  return _this2.toggleElement(toggled, false);
                case 12:
                  _context.next = 14;
                  return _this2.toggleElement(_this2.target.filter(function (el) {
                    return !includes(toggled, el);
                  }), true);
                case 14:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }))();
      },
      updateAria: function updateAria(toggled) {
        var $el = this.$el,
          isToggled = this.isToggled,
          activeClass = this.activeClass,
          target = this.target;
        attr($el, 'aria-expanded', isBoolean(toggled) ? toggled : isToggled(target));
        toggleClass($el, activeClass, isToggled(target));
      }
    }
  };

  var Media = {
    props: {
      media: Boolean
    },
    data: {
      media: false
    },
    compute: {
      mathMedia: function mathMedia() {
        toMedia(this.media);
      }
    }
  };
  function toMedia(value) {
    if (isString(value)) {
      var name = "breakepoint-".concat(value.substr(1));
      value = toFloat(getCssVar(name));
    } else if (isNaN(value)) {
      return value;
    }
    return value && !isNaN(value) ? "(min-width: ".concat(value, "px)") : false;
  }

  var sticky = {
    mixins: [Media],
    props: {
      start: null,
      end: null,
      offset: String,
      position: String,
      clsActive: String
    },
    data: {
      /**
       * sticky 적용 시작점 위치
       * 
       * @property +-숫자, 셀렉터(#abcd), (px, vh, % 단위)
       * @default 0
       */
      start: 0,
      /**
       * sticky 적용 끝 점 위치
       * 
       * @property +-숫자, 셀렉터(#abcd), (px, vh, % 단위)
       * @default 0
       */
      end: 0,
      offset: 0,
      position: 'top',
      clsActive: "".concat(cssPrefix, "active"),
      clsInactive: "",
      clsFixed: "".concat(cssPrefix, "fixed"),
      clsBelow: "".concat(cssPrefix, "below"),
      clsPlaceholder: "".concat(cssPrefix, "placeholder")
    },
    computed: {},
    connected: function connected() {
      this.placeholder = $$1("+ .".concat(this.clsPlaceholder), this.$el) || $$1("<div>class=\"".concat(this.clsPlaceholder, "\"</div>"));
      this.isActive = false, this.inactive = true;
    },
    disconnected: function disconnected() {
      if (this.isActive) {
        this.hide();
        removeClass(this.selTarget, this.clsInactive);
      }
      remove$1(this.placeholder);
      this.placeholder = null;
      this.widthElement = null;
    },
    events: [{
      name: 'load hashchange popstate',
      el: window,
      handler: function handler() {
        console.log('hahahaha');
      }
    }],
    update: [{
      read: function read(_ref, types) {
        var _ref$height = _ref.height,
          height = _ref$height === void 0 ? 0 : _ref$height;
          _ref.margin;
        this.inactive = !this.matchMedia || isVisible(this.$el);
        // 비활성화 되었거나 미디어쿼리 범위에 벗어나면 실행 취소
        if (this.inactive) return false;
        if (this.isActive && types.has('resize')) {
          this.hide();
          height = this.$el.offsetHeight;
          console.log(this.$el);
        }
        height = this.isActive ? height : this.$el.offsetHeight;
        var referenceElement = this.isActive ? this.placeholder : this.$el;
        this.topOffset = offset(referenceElement).top;
        var start = !!!this.start || parseProp(this.start, this.$el);
        this.width = dimensions(isVisible(this.widthElement) ? this.widthElement : this.$el).width;

        // this._data로 들어감
        return {
          height: height,
          start: start,
          margins: css(this.$el, ['marginTop', 'marginBottom', 'marginLeft', 'marginRight'])
        };
      },
      write: function write(data) {
        var height = data.height,
          margins = data.margins,
          start = data.start;
        var $el = this.$el,
          placeholder = this.placeholder;
        console.log(start);
        css(placeholder, assign({
          height: height
        }, margins));
        if (!within(placeholder, document)) {
          after($el, placeholder);
          placeholder.hidden = true;
        }
      },
      events: ['resize']
    }, {
      read: function read(_ref2) {
        var _ref2$scroll = _ref2.scroll,
          scroll = _ref2$scroll === void 0 ? 0 : _ref2$scroll;
        this.scroll = window.pageYOffset;
        console.log(this.$el);
        return {
          dir: scroll <= this.scroll ? 'down' : 'up',
          scroll: this.scroll,
          visible: isVisible(this.$el),
          top: offsetPosition(this.placeholder)[0]
        };
      },
      write: function write(data, type) {
        data.initTimestamp;
          data.dir;
          data.lastDir;
          data.lastScroll;
          data.start;
          data.visible;
        performance.now();
        data.lastScroll = scroll;
        if (this.topOffset - this.offset <= this.scroll) {
          this.show();
        } else {
          this.hide();
        }
      },
      events: ['scroll', 'resize']
    }],
    methods: {
      show: function show() {
        this.isActive = true;
        this.update();
        attr(this.placeholder, 'hidden', null);
      },
      hide: function hide() {
        this.isActive = false;
        removeClass(this.$el, this.clsFixed, this.clsBelow);
        css(this.$el, {
          position: '',
          top: '',
          width: ''
        });
        attr(this.placeholder, 'hidden', '');
      },
      update: function update() {
        this.top !== 0 || this.scroll > this.top;
        this._data.start;
        var top = Math.max(0, this.offset);
        var position = 'fixed';
        if (isNumeric(this.bottom) && this.scroll > this.bottom - this.offset) {
          top = this.bottom - this.offsetParentTop;
          position = 'absolute';
        }
        css(this.$el, {
          position: position,
          top: "".concat(top, "px"),
          width: this.width
        });
      },
      setActive: function setActive(active) {
        var prev = this.active;
        this.active = active;
        if (active) {
          replaceClass(this.selTarget, this.clsInactive, this.clsActive);
          prev !== active && trigger(this.$el, 'active');
        } else {
          replaceClass(this.selTarget, this.clsActive, this.clsInactive);
          prev !== active && trigger(this.$el, 'inactive');
        }
      }
    }
  };
  function parseProp(value, el) {
    var propsOffset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var padding = arguments.length > 3 ? arguments[3] : undefined;
    if (!value) return 0;
    if (isNumeric(value) || isString(value) && value.match(/^-?\d/)) {
      return propsOffset + toPx(value, 'height', el, true);
    } else {
      var refElement = value === true ? parent(el) : query(value, el);
      return offset(refElement).bottom - (padding && refElement && within(el, refElement) ? toFloat(css(refElement, 'paddingBottom')) : 0);
    }
  }

  var datepicker = {
    props: {
      pickerButton: Boolean,
      value: String
    },
    data: {
      target: '> * input',
      pcikerBtn: '>.mui_picker_btn',
      dateBtn: '.mui_days button',
      testValue: '',
      testBtn: '>.testbtn',
      pickerButton: false,
      value: '',
      initialValue: '',
      initialDate: null,
      viewDate: null,
      isActivePicker: false,
      days: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
      daysMin: ['일', '월', '화', '수', '목', '금', '토'],
      months: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
      weekStart: 0,
      //시작 요일
      weeks: null,
      bodys: null,
      prevBtn: '.picker_header>.prev_btn',
      nextBtn: '.picker_header>.next_btn',
      $year: '.picker_header>.year_month>.current_year',
      $month: '.picker_header>.year_month>.current_month',
      format: 'yyyy-mm-dd',
      // The start view date
      startDate: null,
      // The end view date
      endDate: null,
      // The initial date
      date: null,
      // Filter each date item (return `false` to disable a date item)
      filter: null,
      pickerHeader: '.picker_contents>.mui_calendar>.head',
      pickerBody: '.picker_contents>.mui_calendar>.body',
      activeClassName: 'mui_active',
      disabledClassName: 'mui_disabled',
      weeksClassName: 'mui_weeks',
      daysClassName: 'mui_days',
      todayClassName: 'mui_today',
      selectedClassName: 'mui_selected',
      template: "<div class=\"mui_datepicker_layer\">\n                <div class=\"picker_header\">\n                  <button type=\"button\" class=\"prev_btn\"><span class=\"text\">\uC774\uC804 \uB2EC \uBCF4\uAE30</span></button>\n                  <span class=\"year_month\">\n                    <span class=\"current_year\"></span>\n                    <span class=\"current_month\"></span>\n                  </span>                  \n                  <button type=\"button\" class=\"next_btn\"><span class=\"text\">\uB2E4\uC74C \uB2EC \uBCF4\uAE30</span></button>\n                </div>\n                <div class=\"picker_contents\">\n                  <table class=\"mui_calendar\">\n                    <thead class=\"head\"></thead>\n                    <tbody class=\"body\"></tbody>\n                  </table>\n                </div>\n              </div>"
    },
    created: function created() {
      this.calendar = append(document.body, this.template);
    },
    computed: {
      prevBtn: function prevBtn(_ref) {
        var prevBtn = _ref.prevBtn;
        return $$1(prevBtn, this.calendar);
      },
      nextBtn: function nextBtn(_ref2) {
        var nextBtn = _ref2.nextBtn;
        return $$1(nextBtn, this.calendar);
      },
      $year: function $year(_ref3) {
        var $year = _ref3.$year;
        return $$1($year, this.calendar);
      },
      $month: function $month(_ref4) {
        var $month = _ref4.$month;
        return $$1($month, this.calendar);
      },
      target: function target(_ref5, $el) {
        var target = _ref5.target;
        return $$1(target, $el);
      },
      targetValue: function targetValue(_ref6) {
        var test = _ref6.test,
          value = _ref6.value;
        return "".concat(test, "234234233444").concat(value);
      }
    },
    connected: function connected() {
      var pickerButton = this.pickerButton,
        startDate = this.startDate,
        endDate = this.endDate,
        $el = this.$el;
      var initialValue = this.initialValue,
        date = this.date;
      this.pickerButton = !pickerButton || append($el, '<span class="mui_picker_btn"><button type="button">캘린더 열기</button></span>');
      this.format = parseFormat(this.format);
      initialValue = this.getValue();
      date = this.parseDate(date || initialValue);
      this.date = date;
      this.viewDate = new Date(date);
      this.initialDate = new Date(this.date);

      // startDate, endDate  = range 형태의 켈린더일 경우 사용
      if (startDate) {
        this.parseDate(startDate), _readOnlyError("startDate");
        if (date.getTime() < startDate.getTime()) {
          date = new Date(startDate);
        }
        this.startDate = startDate;
      }
      if (endDate) {
        this.parseDate(endDate), _readOnlyError("endDate");
        if (startDate && endDate.getTime() < startDate.getTime()) {
          _readOnlyError("endDate");
        }
        if (date.getTime() > endDate.getTime()) {
          date = new Date(endDate);
        }
        this.endDate = endDate;
      }
    },
    destory: function destory() {
      console.log('destory');
    },
    events: [{
      name: 'click',
      delegate: function delegate() {
        return this.$props.target;
      },
      handler: function handler(e) {
        e.preventDefault();
        this.renderPickerDate();
      }
    }, {
      name: 'click',
      el: document,
      handler: function handler(e) {
        var target = e.target;
        var hidden = true;
        var $el = this.$el,
          calendar = this.calendar;
        if (this.isActivePicker) {
          while (target !== document) {
            if (target === $el || target === calendar) {
              hidden = false;
              break;
            }
            target = target.parentNode;
          }
          if (hidden) {
            this.closePickerDate();
          }
        }
      }
    }, {
      name: 'click',
      el: function el() {
        return this.calendar;
      },
      delegate: function delegate() {
        return this.$props.prevBtn;
      },
      handler: function handler(e) {
        e.preventDefault();
        console.log('이전');
        var year = this.viewDate.getFullYear();
        var month = this.viewDate.getMonth() - 1;
        var day = this.viewDate.getDate();
        this.viewDate = new Date(year, month, day);
        this.renderPickerDate();
      }
    }, {
      name: 'click',
      el: function el() {
        return this.calendar;
      },
      delegate: function delegate() {
        return this.$props.nextBtn;
      },
      handler: function handler(e) {
        e.preventDefault();
        console.log('다음');
        var year = this.viewDate.getFullYear();
        var month = this.viewDate.getMonth() + 1;
        var day = this.viewDate.getDate();
        this.viewDate = new Date(year, month, day);
        this.renderPickerDate();
      }
    }, {
      name: 'click',
      el: function el() {
        return this.calendar;
      },
      delegate: function delegate() {
        return "".concat(this.pickerBody, " ").concat(this.dateBtn);
      },
      handler: function handler(e) {
        e.preventDefault();
        var val = this.parseDate(data(e.current, 'date'));
        this.setDate(val);
        this.closePickerDate();
      }
    },
    // 
    {
      name: 'keyup',
      delegate: function delegate() {
        return this.$props.target;
      },
      handler: function handler(e) {
        var self = e.target;
        // const val = this.parseDate(this.parseDate(this.getValue()));
        // this.viewDate = val
        // this.date = val
        // this.renderPickerDate();
        console.log(self.value);
      }
    }, {
      name: 'click',
      delegate: function delegate() {
        return this.pcikerBtn;
      },
      handler: function handler(e) {
        e.preventDefault();
        this.setValue();
      }
    }],
    methods: {
      renderPickerDate: function renderPickerDate() {
        var viewDate = this.viewDate,
          $year = this.$year,
          $month = this.$month,
          months = this.months,
          calendar = this.calendar;
        var yearText = viewDate.getFullYear();
        var montText = months[viewDate.getMonth()];
        this.weeks = find(this.pickerHeader, this.calendar);
        this.bodys = find(this.pickerBody, this.calendar);
        this.weeks.innerHTML = this.renderWeek();
        this.isActivePicker = true;
        $year.innerHTML = yearText;
        $month.innerHTML = montText;
        addClass(calendar, 'mui_active');
        css(calendar, 'top', "".concat(dimensions(this.$el).top + dimensions(this.$el).height, "px"));
        css(calendar, 'left', "".concat(dimensions(this.$el).left, "px"));
        return this.renderDays();
      },
      closePickerDate: function closePickerDate() {
        var weeks = this.weeks,
          bodys = this.bodys,
          calendar = this.calendar;
        weeks.innerHTML = '';
        bodys.innerHTML = '';
        this.isActivePicker = false;
        removeClass(calendar, 'mui_active');
      },
      getValue: function getValue() {
        return this.target.value;
      },
      setValue: function setValue() {
        this.target.value = this.formatDate(this.date);
      },
      createItem: function createItem(data, type) {
        var selectedClassName = this.selectedClassName,
          disabledClassName = this.disabledClassName,
          weeksClassName = this.weeksClassName,
          daysClassName = this.daysClassName,
          todayClassName = this.todayClassName;
        var itemDefault = {
          text: '',
          view: '',
          prev: false,
          next: false,
          active: false,
          disabled: false,
          picked: false,
          classes: type === 'title' ? [weeksClassName] : [daysClassName],
          tag: type === 'title' ? 'th' : 'td'
        };
        var item = mergeOptions(itemDefault, data);
        if (item.active) item.classes.push(todayClassName);
        if (item.picked) item.classes.push(selectedClassName);

        // 이전 달이거나 다음 달일 경우
        if (item.prev || item.next) item.classes.push(disabledClassName);
        if (type !== 'title') {
          item.text = "<button type=\"button\" data-date=\"".concat(item.data, "\">").concat(item.text, "</button>");
        }
        return "<".concat(item.tag, " class=\"").concat(item.classes.join(' '), "\">").concat(item.text, "</").concat(item.tag, ">");
      },
      renderWeek: function renderWeek() {
        var _this = this;
        var items = ['<tr>'];
        var weekStart = this.weekStart,
          days = this.days,
          daysMin = this.daysMin;
        weekStart = parseInt(weekStart, 10) % 7;
        days = days.slice(weekStart).concat(days.slice(0, weekStart));
        daysMin = daysMin.slice(weekStart).concat(daysMin.slice(0, weekStart));
        each(daysMin, function (day, i) {
          items.push(_this.createItem({
            text: day,
            title: daysMin[i]
          }, 'title'));
        });
        items.push('</tr>');
        // console.log(items)
        return items.join('');
        // this.$week.html(items.join(''));
      },
      renderYears: function renderYears() {
        var options = this.options,
          startDate = this.startDate,
          endDate = this.endDate;
        var disabledClass = options.disabledClass,
          filter = options.filter,
          yearSuffix = options.yearSuffix;
        var viewYear = this.viewDate.getFullYear();
        var now = new Date();
        var thisYear = now.getFullYear();
        var year = this.date.getFullYear();
        var start = -5;
        var end = 6;
        var items = [];
        var prevDisabled = false;
        var nextDisabled = false;
        var i;
        for (i = start; i <= end; i += 1) {
          var date = new Date(viewYear + i, 1, 1);
          var disabled = false;
          if (startDate) {
            disabled = date.getFullYear() < startDate.getFullYear();
            if (i === start) {
              prevDisabled = disabled;
            }
          }
          if (!disabled && endDate) {
            disabled = date.getFullYear() > endDate.getFullYear();
            if (i === end) {
              nextDisabled = disabled;
            }
          }
          if (!disabled && filter) {
            disabled = filter.call(this.$element, date, 'year') === false;
          }
          var picked = viewYear + i === year;
          var view = picked ? 'year picked' : 'year';
          items.push(this.createItem({
            picked: picked,
            disabled: disabled,
            text: viewYear + i,
            view: disabled ? 'year disabled' : view,
            highlighted: date.getFullYear() === thisYear
          }));
        }
        this.$yearsPrev.toggleClass(disabledClass, prevDisabled);
        this.$yearsNext.toggleClass(disabledClass, nextDisabled);
        this.$yearsCurrent.toggleClass(disabledClass, true).html("".concat(viewYear + start + yearSuffix, " - ").concat(viewYear + end).concat(yearSuffix));
        this.$years.html(items.join(''));
      },
      renderMonths: function renderMonths() {
        var options = this.options,
          startDate = this.startDate,
          endDate = this.endDate,
          viewDate = this.viewDate;
        var disabledClass = options.disabledClass || '';
        var months = options.monthsShort;
        var filter = $$1.isFunction(options.filter) && options.filter;
        var viewYear = viewDate.getFullYear();
        var now = new Date();
        var thisYear = now.getFullYear();
        var thisMonth = now.getMonth();
        var year = this.date.getFullYear();
        var month = this.date.getMonth();
        var items = [];
        var prevDisabled = false;
        var nextDisabled = false;
        var i;
        for (i = 0; i <= 11; i += 1) {
          var date = new Date(viewYear, i, 1);
          var disabled = false;
          if (startDate) {
            prevDisabled = date.getFullYear() === startDate.getFullYear();
            disabled = prevDisabled && date.getMonth() < startDate.getMonth();
          }
          if (!disabled && endDate) {
            nextDisabled = date.getFullYear() === endDate.getFullYear();
            disabled = nextDisabled && date.getMonth() > endDate.getMonth();
          }
          if (!disabled && filter) {
            disabled = filter.call(this.$element, date, 'month') === false;
          }
          var picked = viewYear === year && i === month;
          var view = picked ? 'month picked' : 'month';
          items.push(this.createItem({
            disabled: disabled,
            picked: picked,
            highlighted: viewYear === thisYear && date.getMonth() === thisMonth,
            index: i,
            text: months[i],
            view: disabled ? 'month disabled' : view
          }));
        }
        this.$yearPrev.toggleClass(disabledClass, prevDisabled);
        this.$yearNext.toggleClass(disabledClass, nextDisabled);
        this.$yearCurrent.toggleClass(disabledClass, prevDisabled && nextDisabled).html(viewYear + options.yearSuffix || '');
        this.$months.html(items.join(''));
      },
      renderDays: function renderDays() {
        this.$el;
          var startDate = this.startDate,
          endDate = this.endDate,
          viewDate = this.viewDate,
          currentDate = this.date;
        var weekStart = this.weekStart,
          filter = this.filter;
        var viewYear = viewDate.getFullYear();
        var viewMonth = viewDate.getMonth();
        var now = new Date();
        var thisYear = now.getFullYear();
        var thisMonth = now.getMonth();
        var thisDay = now.getDate();
        var year = currentDate.getFullYear();
        var month = currentDate.getMonth();
        var day = currentDate.getDate();
        var length;
        var i;
        var n;

        // Days of prev month
        // -----------------------------------------------------------------------
        var prevItems = [];
        var prevViewYear = viewYear;
        var prevViewMonth = viewMonth;
        if (viewMonth === 0) {
          prevViewYear -= 1;
          prevViewMonth = 11;
        } else {
          prevViewMonth -= 1;
        }

        // 이전달의 마지막 날 또는 이전달의 길이
        length = getDaysInMonth(prevViewYear, prevViewMonth);

        // 이번달의 첫 날
        var firstDay = new Date(viewYear, viewMonth, 1);
        // console.log(this.formatDate(firstDay))

        // 이전 달 중 보이는 날의 길이
        // [0,1,2,3,4,5,6] - [0,1,2,3,4,5,6] => [-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6]
        n = firstDay.getDay() - parseInt(weekStart, 10) % 7;
        // [-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6] => [1,2,3,4,5,6,7]

        if (n <= 0) {
          n += 7;
        }
        if (startDate) {
          firstDay.getTime() <= startDate.getTime();
        }
        for (i = length - (n - 1); i <= length; i += 1) {
          var prevViewDate = new Date(prevViewYear, prevViewMonth, i);
          var disabled = false;
          if (startDate) {
            disabled = prevViewDate.getTime() < startDate.getTime();
          }
          if (!disabled && filter) {
            disabled = filter.call($element, prevViewDate, 'day') === false;
          }
          prevItems.push(this.createItem({
            disabled: disabled,
            active: prevViewYear === thisYear && prevViewMonth === thisMonth && prevViewDate.getDate() === thisDay,
            prev: true,
            picked: prevViewYear === year && prevViewMonth === month && i === day,
            text: i,
            view: 'day prev',
            data: this.formatDate(prevViewDate)
          }));
        }

        // Days of next month
        // -----------------------------------------------------------------------

        var nextItems = [];
        var nextViewYear = viewYear;
        var nextViewMonth = viewMonth;
        if (viewMonth === 11) {
          nextViewYear += 1;
          nextViewMonth = 0;
        } else {
          nextViewMonth += 1;
        }

        // 이번달의 마지막 날
        length = getDaysInMonth(viewYear, viewMonth);

        // 켈린더 개수 42칸 유지 (이번달 게수에서 이전 달 개수를 뺀 값) (42 means 6 rows and 7 columns)
        n = 42 - (prevItems.length + length);

        // 이번달의 마지막 날
        var lastDate = new Date(viewYear, viewMonth, length);

        // endDate가 있을 경우
        if (endDate) {
          lastDate.getTime() >= endDate.getTime();
        }
        for (i = 1; i <= n; i += 1) {
          var date = new Date(nextViewYear, nextViewMonth, i);
          var picked = nextViewYear === year && nextViewMonth === month && i === day;
          var _disabled = false;
          if (endDate) {
            _disabled = date.getTime() > endDate.getTime();
          }
          if (!_disabled && filter) {
            _disabled = filter.call($element, date, 'day') === false;
          }
          nextItems.push(this.createItem({
            disabled: _disabled,
            picked: picked,
            active: nextViewYear === thisYear && nextViewMonth === thisMonth && date.getDate() === thisDay,
            next: true,
            text: i,
            view: 'day next',
            data: this.formatDate(date)
          }));
        }

        // Days of current month
        // -----------------------------------------------------------------------

        var items = [];
        for (i = 1; i <= length; i += 1) {
          var _date = new Date(viewYear, viewMonth, i);
          var _disabled2 = false;
          if (startDate) {
            _disabled2 = _date.getTime() < startDate.getTime();
          }
          if (!_disabled2 && endDate) {
            _disabled2 = _date.getTime() > endDate.getTime();
          }
          if (!_disabled2 && filter) {
            _disabled2 = filter.call($element, _date, 'day') === false;
          }
          var _picked = viewYear === year && viewMonth === month && i === day;
          var view = _picked ? 'day picked' : 'day';
          items.push(this.createItem({
            disabled: _disabled2,
            picked: _picked,
            active: viewYear === thisYear && viewMonth === thisMonth && _date.getDate() === thisDay,
            text: i,
            view: _disabled2 ? 'day disabled' : view,
            data: this.formatDate(_date)
          }));
        }

        // , items, nextItems
        var currItems = [].concat(prevItems, items, nextItems);
        var itemes = [];
        // console.log(currItems)
        var column = 7;
        for (var _i = 0; _i < currItems.length; _i++) {
          var num = _i % column;
          if (num === 0) {
            itemes.push('<tr>');
            itemes.push(currItems[_i]);
          } else if (num === column - 1) {
            itemes.push(currItems[_i]);
            itemes.push('</tr>');
          } else {
            itemes.push(currItems[_i]);
          }
        }

        // Render days picker
        // -----------------------------------------------------------------------
        empty(this.bodys);
        this.bodys.innerHTML = itemes.join('');
        // this.$monthPrev.toggleClass(disabledClass, prevDisabled);
        // this.$monthNext.toggleClass(disabledClass, nextDisabled);
        // this.$monthCurrent
        //   .toggleClass(disabledClass, prevDisabled && nextDisabled)
        //   .html(options.yearFirst
        //     ? `${viewYear + yearSuffix} ${months[viewMonth]}`
        //     : `${months[viewMonth]} ${viewYear}${yearSuffix}`);
        // this.$days.html(prevItems.join('') + items.join('') + nextItems.join(''));
      },
      formatDate: function formatDate(date) {
        var format = this.format;
        var formatted = '';
        if (isDate(date)) {
          var year = date.getFullYear();
          var month = date.getMonth();
          var day = date.getDate();
          var values = {
            d: day,
            dd: addLeadingZero(day, 2),
            m: month + 1,
            mm: addLeadingZero(month + 1, 2),
            yy: String(year).substring(2),
            yyyy: addLeadingZero(year, 4)
          };
          formatted = format.source;
          each(format.parts, function (part) {
            formatted = formatted.replace(part, values[part]);
          });
        }
        return formatted;
      },
      parseDate: function parseDate(date) {
        var format = this.format;
        var parts = [];
        if (!isDate(date)) {
          if (isString(date)) {
            parts = date.match(/\d+/g) || [];
          }
          date = date ? new Date(date) : new Date();
          if (!isDate(date)) {
            date = new Date();
          }
          if (parts.length === format.parts.length) {
            // Set year and month first
            each(parts, function (i, part) {
              var value = parseInt(part, 10);
              switch (format.parts[i]) {
                case 'yy':
                  date.setFullYear(2000 + value);
                  break;
                case 'yyyy':
                  // Converts 2-digit year to 2000+
                  date.setFullYear(part.length === 2 ? 2000 + value : value);
                  break;
                case 'mm':
                case 'm':
                  date.setMonth(value - 1);
                  break;
              }
            });

            // Set day in the last to avoid converting `31/10/2019` to `01/10/2019`
            each(parts, function (i, part) {
              var value = parseInt(part, 10);
              switch (format.parts[i]) {
                case 'dd':
                case 'd':
                  date.setDate(value);
                  break;
              }
            });
          }
        }

        // Ignore hours, minutes, seconds and milliseconds to avoid side effect (#192)
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
      },
      setDate: function setDate(val) {
        this.viewDate = val;
        this.date = val;
        this.setValue();
      }
    },
    update: {
      write: function write() {
        console.log('resize');
        if (this.isActivePicker) this.closePickerDate();
      },
      events: ['scroll', 'resize']
    }
  };
  function parseFormat(format) {
    var source = String(format).toLowerCase();
    var parts = source.match(/(y|m|d)+/g);
    if (!parts || parts.length === 0) {
      throw new Error('Invalid date format.');
    }
    format = {
      source: source,
      parts: parts
    };
    each(parts, function (part) {
      switch (part) {
        case 'dd':
        case 'd':
          format.hasDay = true;
          break;
        case 'mm':
        case 'm':
          format.hasMonth = true;
          break;
        case 'yyyy':
        case 'yy':
          format.hasYear = true;
          break;
      }
    });
    return format;
  }
  function getDaysInMonth(year, month) {
    return [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
  }
  function isLeapYear(year) {
    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
  }

  var formatter = {
    props: {
      numeric: Boolean,
      prefix: String,
      uppercase: Boolean,
      lowercase: Boolean,
      tailPrefix: Boolean,
      delimiter: String,
      blocks: String,
      dateForm: Boolean,
      viewMaxLength: Boolean
    },
    data: {
      numeric: false,
      numericOnly: false,
      dateForm: false,
      prefix: "",
      uppercase: false,
      lowercase: false,
      tailPrefix: false,
      viewMaxLength: false,
      delimiter: "",
      delimiters: [],
      datePattern: ['yyyy', 'mm', 'dd'],
      delimiterLazyShow: false,
      isBackward: null,
      lastInputValue: "",
      postDelimiterBackspace: false,
      blocks: [],
      template: "<span class=\"mui_maxlength\">\n      <span class=\"current\"></span>\n      <span class=\"maximun\"></span>\n    </span>"
    },
    computed: {
      blocks: function blocks(_ref) {
        var dateForm = _ref.dateForm,
          datePattern = _ref.datePattern,
          blocks = _ref.blocks;
        if (dateForm && datePattern) {
          return datePattern.reduce(function (block, len) {
            block.push(len.length);
            return block;
          }, []);
        }
        return isString(blocks) ? toArray(blocks, "|") : blocks;
      }
    },
    connected: function connected() {
      var $el = this.$el,
        numeric = this.numeric,
        dateForm = this.dateForm,
        datePattern = this.datePattern,
        blocks = this.blocks;
      $el.rawValue = $el.value;
      this.lastValue = "";
      if (dateForm || numeric) this.numericOnly = true;
      if (dateForm && datePattern) {
        this.delimiter = '-';
      }
      if (numeric && this.delimiter === "") {
        this.delimiter = ",";
      }
      if (this.viewMaxLength) {
        this.Maxlengthel = after(this.$el, this.template);
        this.MaxlengthCurrent = $$1('.current', this.Maxlengthel);
        this.MaxlengthCurrent.innerHTML = $el.value.length;
        this.MaxlengthMaximun = $$1('.maximun', this.Maxlengthel);
        this.MaxlengthMaximun.innerHTML = $el.maxLength;
      }
      this.maxlength = getMaxlength(blocks);
      this.formatter(this.$el.rawValue);
    },
    destory: function destory() {
      console.log('destory');
    },
    events: [{
      name: 'input',
      handler: function handler(e) {
        this.isBackward = this.isBackward || e.inputType === 'deleteContentBackward';
        var postDelimiter = getPostDelimiter(this.lastInputValue, this.delimiter, this.delimiters);
        if (this.isBackward && postDelimiter) {
          this.postDelimiterBackspace = postDelimiter;
        } else {
          this.postDelimiterBackspace = false;
        }
        this.formatter(e);
      }
    }, {
      name: 'keydown',
      handler: function handler(e) {
        this.lastInputValue = this.$el.value;
        this.isBackward = e.keyCode === 8;
      }
    }],
    methods: {
      formatter: function formatter() {
        var $el = this.$el,
          numeric = this.numeric,
          uppercase = this.uppercase,
          lowercase = this.lowercase,
          dateForm = this.dateForm,
          isBackward = this.isBackward,
          datePattern = this.datePattern,
          blocks = this.blocks,
          delimiter = this.delimiter,
          maxlength = this.maxlength,
          delimiters = this.delimiters,
          delimiterLazyShow = this.delimiterLazyShow,
          numericOnly = this.numericOnly,
          postDelimiterBackspace = this.postDelimiterBackspace,
          viewMaxLength = this.viewMaxLength;
        var value = $el.value;
        if (isBackward && postDelimiterBackspace) {
          value = headStr(value, value.length - postDelimiterBackspace.length);
        }
        if (numericOnly) value = numberOnly(value);
        $el.rawValue = getRawValue(value, delimiter, delimiters, maxlength);
        if (!numeric && !uppercase && !lowercase && !dateForm && !!!blocks.length && !viewMaxLength) return;
        if (numeric) {
          $el.rawValue = numerFormat($el.rawValue, delimiter);
        }
        if (dateForm) {
          $el.rawValue = dateFormat($el.rawValue, datePattern, blocks);
        }
        if (uppercase) {
          $el.rawValue = uppercaseFormat($el.rawValue);
        }
        if (lowercase) {
          $el.rawValue = lowercaseFormat($el.rawValue);
        }
        this.lastValue = getFormattedValue($el.rawValue, blocks, delimiter, delimiters, delimiterLazyShow);
        this.updateValueState();
      },
      updateValueState: function updateValueState() {
        var $el = this.$el,
          lastValue = this.lastValue,
          delimiter = this.delimiter,
          delimiters = this.delimiters,
          viewMaxLength = this.viewMaxLength;
        var cursorPos = $el.selectionEnd;
        cursorPos = getNextCursorPosition(cursorPos, $el.value, lastValue, delimiter, delimiters);
        if (isAndroid) {
          window.setTimeout(function () {
            $el.value = lastValue;
            setSelection($el, cursorPos, document);
          }, 1);
          return;
        }
        $el.value = lastValue;
        if (viewMaxLength) {
          this.MaxlengthCurrent.innerHTML = lastValue.length;
        }
        setSelection($el, cursorPos, document);
      }
    }
  };
  function toArray(str, dvd) {
    var result = [];
    str.split(dvd).forEach(function (n) {
      result.push(toNumber(n));
    });
    return result;
  }

  var Container = {
    props: {
      container: Boolean
    },
    data: {
      container: true
    },
    computed: {
      container: function container(_ref) {
        var container = _ref.container;
        return container === true && this.$container || container && $$1(container);
      }
    }
  };

  var prevented;
  function preventBackgroundScroll(el) {
    // 'overscroll-behavior: contain' only works consistently if el overflows (Safari)
    var off = on(el, 'touchmove', function (e) {
      if (e.targetTouches.length !== 1) {
        return;
      }
      var _scrollParents = scrollParents(e.target),
        _scrollParents2 = _slicedToArray(_scrollParents, 1),
        _scrollParents2$ = _scrollParents2[0],
        scrollHeight = _scrollParents2$.scrollHeight,
        clientHeight = _scrollParents2$.clientHeight;
      if (clientHeight >= scrollHeight && e.cancelable) {
        e.preventDefault();
      }
    }, {
      passive: false
    });
    if (prevented) {
      return off;
    }
    prevented = true;
    var _document = document,
      scrollingElement = _document.scrollingElement;
    css(scrollingElement, {
      overflowY: CSS.supports('overflow', 'clip') ? 'clip' : 'hidden',
      touchAction: 'none',
      paddingRight: width(window) - scrollingElement.clientWidth || ''
    });
    return function () {
      prevented = false;
      off();
      css(scrollingElement, {
        overflowY: '',
        touchAction: '',
        paddingRight: ''
      });
    };
  }
  function isSameSiteAnchor(el) {
    return ['origin', 'pathname', 'search'].every(function (part) {
      return el[part] === location[part];
    });
  }

  var active = [];
  var Modal = {
    mixins: [Class, Container, Togglable],
    props: {
      selPanel: String,
      selClose: String,
      escClose: Boolean,
      bgClose: Boolean,
      stack: Boolean,
      role: String
    },
    data: {
      cls: 'mui_open',
      escClose: true,
      bgClose: true,
      overlay: true,
      stack: false,
      role: 'dialog',
      returnFocusTarget: null
    },
    computed: {
      panel: function panel(_ref, $el) {
        var selPanel = _ref.selPanel;
        return $$1(selPanel, $el);
      },
      transitionElement: function transitionElement() {
        return this.panel;
      },
      bgClose: function bgClose(_ref2) {
        var bgClose = _ref2.bgClose;
        return bgClose && this.panel;
      }
    },
    connected: function connected() {
      attr(this.panel || this.$el, 'role', this.role);
      if (this.overlay) {
        attr(this.panel || this.$el, 'aria-modal', true);
      }
    },
    beforeDisconnect: function beforeDisconnect() {
      if (includes(active, this)) {
        this.toggleElement(this.$el, false, false);
      }
    },
    events: [{
      name: 'click',
      delegate: function delegate() {
        return "".concat(this.selClose, ",a[href*=\"#\"]");
      },
      handler: function handler(e) {
        var current = e.current,
          defaultPrevented = e.defaultPrevented;
        var hash = current.hash;
        if (!defaultPrevented && hash && isSameSiteAnchor(current) && !within(hash, this.$el) && $$1(hash, document.body)) {
          this.hide();
        } else if (matches(current, this.selClose)) {
          e.preventDefault();
          this.hide();
        }
      }
    }, {
      name: 'toggle',
      self: true,
      handler: function handler(e) {
        if (e.defaultPrevented) {
          return;
        }
        e.preventDefault();
        if (this.isToggled() === includes(active, this)) {
          this.returnFocusTarget = e.detail[0].$el;
          this.toggle();
        }
      }
    }, {
      name: 'beforeshow',
      self: true,
      handler: function handler(e) {
        if (includes(active, this)) {
          return false;
        }
        if (!this.stack && active.length) {
          Promise.all(active.map(function (modal) {
            return modal.hide();
          })).then(this.show);
          e.preventDefault();
        } else {
          active.push(this);
        }
      }
    }, {
      name: 'show',
      self: true,
      handler: function handler() {
        if (this.stack) {
          css(this.$el, 'zIndex', toFloat(css(this.$el, 'zIndex')) + active.length);
        }
        var handlers = [this.overlay && preventBackgroundFocus(this), this.overlay && preventBackgroundScroll(this.$el), this.bgClose && listenForBackgroundClose(this), this.escClose && listenForEscClose(this)];
        once(this.$el, 'hidden', function () {
          return handlers.forEach(function (handler) {
            return handler && handler();
          });
        }, {
          self: true
        });
        addClass(document.documentElement, this.clsPage);
      }
    }, {
      name: 'shown',
      self: true,
      handler: function handler() {
        if (!isFocusable(this.$el)) {
          attr(this.$el, 'tabindex', '-1');
        }
        if (!matches(this.$el, ':focus-within')) {
          this.$el.focus();
        }
      }
    }, {
      name: 'hidden',
      self: true,
      handler: function handler() {
        var _this = this;
        if (includes(active, this)) {
          active.splice(active.indexOf(this), 1);
        }
        css(this.$el, 'zIndex', '');
        if (!active.some(function (modal) {
          return modal.clsPage === _this.clsPage;
        })) {
          removeClass(document.documentElement, this.clsPage);
        }
      }
    }],
    methods: {
      toggle: function toggle() {
        return this.isToggled() ? this.hide() : this.show();
      },
      show: function show() {
        var _this2 = this;
        if (this.container && parent$1(this.$el) !== this.container) {
          append(this.container, this.$el);
          return new Promise(function (resolve) {
            return requestAnimationFrame(function () {
              return _this2.show().then(resolve);
            });
          });
        }
        return this.toggleElement(this.$el, true, animate);
      },
      hide: function hide() {
        return this.toggleElement(this.$el, false, animate);
      }
    }
  };
  function animate(el, show, self) {
    var transitionElement = self.transitionElement,
      _toggle = self._toggle;
    return new Promise(function (resolve, reject) {
      return once(el, 'show hide', function () {
        var _el$_reject;
        (_el$_reject = el._reject) === null || _el$_reject === void 0 ? void 0 : _el$_reject.call(el);
        el._reject = reject;
        _toggle(el, show);
        var off = once(transitionElement, 'transitionstart', function () {
          once(transitionElement, 'transitionend transitioncancel', resolve, {
            self: true
          });
          clearTimeout(timer);
        }, {
          self: true
        });
        var timer = setTimeout(function () {
          off();
          resolve();
        }, toMs(css(transitionElement, 'transitionDuration')));
      });
    }).then(function () {
      if (!show && !!self.returnFocusTarget) {
        setTimeout(function () {
          self.returnFocusTarget.focus();
        }, 0);
      }
      return delete el._reject;
    });
  }
  function toMs(time) {
    return time ? endsWith(time, 'ms') ? toFloat(time) : toFloat(time) * 1000 : 0;
  }
  function preventBackgroundFocus(modal) {
    return on(document, 'focusin', function (e) {
      if (last(active) === modal && !within(e.target, modal.$el)) {
        modal.$el.focus();
      }
    });
  }
  function listenForBackgroundClose(modal) {
    return on(document, pointerDown$1, function (_ref3) {
      var target = _ref3.target;
      if (last(active) !== modal || modal.overlay && !within(target, modal.$el) || within(target, modal.panel)) {
        return;
      }
      once(document, "".concat(pointerUp$1, " ").concat(pointerCancel, " scroll"), function (_ref4) {
        var defaultPrevented = _ref4.defaultPrevented,
          type = _ref4.type,
          newTarget = _ref4.target;
        if (!defaultPrevented && type === pointerUp$1 && target === newTarget) {
          modal.hide();
        }
      }, true);
    });
  }
  function listenForEscClose(modal) {
    return on(document, 'keydown', function (e) {
      if (e.keyCode === 27 && last(active) === modal) {
        modal.hide();
      }
    });
  }

  var modal = {
    install: install,
    mixins: [Modal],
    data: {
      clsPage: 'mui_modal_page',
      selPanel: '.mui_modal_dialog',
      selClose: '.mui_modal_close, .mui_modal_close_default, .mui_modal_close_outside, .mui_modal_close_full'
    },
    events: [{
      name: 'show',
      self: true,
      handler: function handler() {
        console.log(this.panel);
        if (hasClass(this.panel, 'mui_auto_vertical')) {
          addClass(this.$el, 'mui_flex');
        } else {
          css(this.$el, 'display', 'block');
        }
        height(this.$el); // force reflow
      }
    }, {
      name: 'hidden',
      self: true,
      handler: function handler() {
        css(this.$el, 'display', '');
        removeClass(this.$el, 'mui_flex');
      }
    }]
  };
  function install(_ref) {
    var modal = _ref.modal;
    modal.dialog = function (content, options) {
      var dialog = modal("<div class=\"mui_modal system_pop\">\n                <div class=\"mui_modal_dialog\">\n                    <div class=\"mui_modal_body\">".concat(content, "</div>\n                </div>\n             </div>"), options);
      dialog.show();
      on(dialog.$el, 'hidden', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return Promise.resolve();
              case 2:
                dialog.$destroy(true);
              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      })), {
        self: true
      });
      return dialog;
    };
    modal.alert = function (message, options) {
      return openDialog(function (_ref3) {
        var i18n = _ref3.i18n;
        return "<div class=\"mui_modal_body\">".concat(isString(message) ? message : html(message), "</div>\n            <div class=\"mui_modal_footer\">\n                <button class=\"mui_button mui_modal_close\" autofocus><span>").concat(i18n.ok, "</span></button>\n            </div>");
      }, options, function (deferred) {
        return deferred.resolve();
      });
    };
    modal.confirm = function (message, options) {
      return openDialog(function (_ref4) {
        var i18n = _ref4.i18n;
        return "<form>\n                <div class=\"mui_modal_body\">".concat(isString(message) ? message : html(message), "</div>\n                <div class=\"mui_modal_footer\">\n                    <button class=\"mui_button\" autofocus><span>").concat(i18n.ok, "</span></button>\n                    <button class=\"mui_button mui_modal_close\" type=\"button\"><span>").concat(i18n.cancel, "</span></button>\n                </div>\n            </form>");
      }, options, function (deferred) {
        return deferred.reject();
      });
    };
    modal.i18n = {
      ok: '확인',
      cancel: '취소'
    };
    function openDialog(tmpl, options, hideFn, submitFn) {
      options = _objectSpread2({
        bgClose: true,
        escClose: true,
        role: 'alertdialog',
        i18n: modal.i18n
      }, options);
      var dialog = modal.dialog(tmpl(options), options);
      var deferred = new Deferred();
      var resolved = false;
      on(dialog.$el, 'submit', 'form', function (e) {
        e.preventDefault();
        deferred.resolve(submitFn === null || submitFn === void 0 ? void 0 : submitFn(dialog));
        resolved = true;
        dialog.hide();
      });
      on(dialog.$el, 'hide', function () {
        return !resolved && hideFn(deferred);
      });
      deferred.promise.dialog = dialog;
      return deferred.promise;
    }
  }

  var pointerOptions = {
    passive: false,
    capture: true
  };
  var pointerDown = 'touchstart mousedown';
  var pointerMove = 'touchmove mousemove';
  var pointerUp = 'touchend touchcancel mouseup click input';
  ({
    props: {
      draggable: Boolean
    },
    data: {
      draggable: true,
      threshold: 10
    },
    created: function created() {
      var _this = this;
      var _loop = function _loop() {
        var key = _arr[_i];
        var fn = _this[key];
        _this[key] = function (e) {
          var pos = getEventPos(e).x * (isRtl ? -1 : 1);
          _this.prevPos = pos === _this.pos ? _this.prevPos : _this.pos;
          _this.pos = pos;
          fn(e);
        };
      };
      for (var _i = 0, _arr = ['start', 'move', 'end']; _i < _arr.length; _i++) {
        _loop();
      }
    },
    events: [{
      name: pointerDown,
      delegate: function delegate() {
        return this.selSlides;
      },
      handler: function handler(e) {
        if (!this.draggable || !isTouch(e) && hasTextNodesOnly(e.target) || closest(e.target, selInput) || e.button > 0 || this.length < 2) {
          return;
        }
        console.log('dsfsdf');
        this.start(e);
      }
    }, {
      name: 'dragstart',
      handler: function handler(e) {
        e.preventDefault();
      }
    }, _objectSpread2({
      // iOS workaround for slider stopping if swiping fast
      name: "".concat(pointerMove, " ").concat(pointerUp),
      el: function el() {
        return this.list;
      },
      handler: noop
    }, pointerOptions)],
    methods: {
      start: function start() {
        this.drag = this.pos;
        if (this._transitioner) {
          console.log('sdfs');
          this.percent = this._transitioner.percent();
          this.drag += this._transitioner.getDistance() * this.percent * this.dir;
          this._transitioner.cancel();
          this._transitioner.translate(this.percent);
          this.dragging = true;
          this.stack = [];
        } else {
          this.prevIndex = this.index;
        }
        on(document, pointerMove, this.move, pointerOptions);

        // 'input' event is triggered by video controls
        on(document, pointerUp, this.end, pointerOptions);
        css(this.list, 'userSelect', 'none');
        console.log('start');
      },
      move: function move(e) {
        var _this2 = this;
        var distance = this.pos - this.drag;
        if (distance === 0 || this.prevPos === this.pos || !this.dragging && Math.abs(distance) < this.threshold) {
          return;
        }

        // prevent click event
        css(this.list, 'pointerEvents', 'none');
        e.cancelable && e.preventDefault();
        this.dragging = true;
        this.dir = distance < 0 ? 1 : -1;
        var slides = this.slides;
        var prevIndex = this.prevIndex;
        var dis = Math.abs(distance);
        var nextIndex = this.getIndex(prevIndex + this.dir, prevIndex);
        var width = this._getDistance(prevIndex, nextIndex) || slides[prevIndex].offsetWidth;
        while (nextIndex !== prevIndex && dis > width) {
          this.drag -= width * this.dir;
          prevIndex = nextIndex;
          dis -= width;
          nextIndex = this.getIndex(prevIndex + this.dir, prevIndex);
          width = this._getDistance(prevIndex, nextIndex) || slides[prevIndex].offsetWidth;
        }
        this.percent = dis / width;
        var prev = slides[prevIndex];
        var next = slides[nextIndex];
        var changed = this.index !== nextIndex;
        var edge = prevIndex === nextIndex;
        var itemShown;
        [this.index, this.prevIndex].filter(function (i) {
          return !includes([nextIndex, prevIndex], i);
        }).forEach(function (i) {
          trigger(slides[i], 'itemhidden', [_this2]);
          if (edge) {
            itemShown = true;
            _this2.prevIndex = prevIndex;
          }
        });
        if (this.index === prevIndex && this.prevIndex !== prevIndex || itemShown) {
          trigger(slides[this.index], 'itemshown', [this]);
        }
        if (changed) {
          this.prevIndex = prevIndex;
          this.index = nextIndex;
          !edge && trigger(prev, 'beforeitemhide', [this]);
          trigger(next, 'beforeitemshow', [this]);
        }
        this._transitioner = this._translate(Math.abs(this.percent), prev, !edge && next);
        if (changed) {
          !edge && trigger(prev, 'itemhide', [this]);
          trigger(next, 'itemshow', [this]);
        }
        console.log('move');
      },
      end: function end() {
        off(document, pointerMove, this.move, pointerOptions);
        off(document, pointerUp, this.end, pointerOptions);
        if (this.dragging) {
          this.dragging = null;
          if (this.index === this.prevIndex) {
            this.percent = 1 - this.percent;
            this.dir *= -1;
            this._show(false, this.index, true);
            this._transitioner = null;
          } else {
            var dirChange = (isRtl ? this.dir * (isRtl ? 1 : -1) : this.dir) < 0 === this.prevPos > this.pos;
            this.index = dirChange ? this.index : this.prevIndex;
            if (dirChange) {
              this.percent = 1 - this.percent;
            }
            this.show(this.dir > 0 && !dirChange || this.dir < 0 && dirChange ? 'next' : 'previous', true);
          }
        }
        console.log('end');
        css(this.list, {
          userSelect: '',
          pointerEvents: ''
        });
        this.drag = this.percent = null;
      }
    }
  });
  function hasTextNodesOnly(el) {
    return !el.children.length && el.childNodes.length;
  }

  function _translate() {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '%';
    value += value ? unit : '';
    return "translate3d(".concat(value, ", 0, 0)");
  }

  function Transitioner (prev, next, dir, _ref) {
    var center = _ref.center,
      easing = _ref.easing,
      list = _ref.list;
    var deferred = new Deferred();
    var from = prev ? getLeft(prev, list, center) : getLeft(next, list, center) + dimensions(next).width * dir;
    var to = next ? getLeft(next, list, center) : from + dimensions(prev).width * dir * (isRtl ? -1 : 1);
    return {
      dir: dir,
      show: function show(duration) {
        var percent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var linear = arguments.length > 2 ? arguments[2] : undefined;
        var timing = linear ? 'linear' : easing;
        duration -= Math.round(duration * clamp(percent, -1, 1));
        this.translate(percent);
        percent = prev ? percent : clamp(percent, 0, 1);
        triggerUpdate(this.getItemIn(), 'itemin', {
          percent: percent,
          duration: duration,
          timing: timing,
          dir: dir
        });
        prev && triggerUpdate(this.getItemIn(true), 'itemout', {
          percent: 1 - percent,
          duration: duration,
          timing: timing,
          dir: dir
        });
        Transition.start(list, {
          transform: _translate(-to * (isRtl ? -1 : 1), 'px')
        }, duration, timing).then(deferred.resolve, noop);
        return deferred.promise;
      },
      cancel: function cancel() {
        Transition.cancel(list);
      },
      reset: function reset() {
        css(list, 'transform', '');
      },
      forward: function forward(duration) {
        var percent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.percent();
        Transition.cancel(list);
        return this.show(duration, percent, true);
      },
      translate: function translate(percent) {
        var distance = this.getDistance() * dir * (isRtl ? -1 : 1);
        css(list, 'transform', _translate(clamp(-to + (distance - distance * percent), -getWidth(list), dimensions(list).width) * (isRtl ? -1 : 1), 'px'));
        var actives = this.getActives();
        var itemIn = this.getItemIn();
        var itemOut = this.getItemIn(true);
        percent = prev ? clamp(percent, -1, 1) : 0;
        var _iterator = _createForOfIteratorHelper(children(list)),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var slide = _step.value;
            var isActive = includes(actives, slide);
            var isIn = slide === itemIn;
            var isOut = slide === itemOut;
            var translateIn = isIn || !isOut && (isActive || dir * (isRtl ? -1 : 1) === -1 ^ getElLeft(slide, list) > getElLeft(prev || next));
            triggerUpdate(slide, "itemtranslate".concat(translateIn ? 'in' : 'out'), {
              dir: dir,
              percent: isOut ? 1 - percent : isIn ? percent : isActive ? 1 : 0
            });
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      },
      percent: function percent() {
        return Math.abs((css(list, 'transform').split(',')[4] * (isRtl ? -1 : 1) + from) / (to - from));
      },
      getDistance: function getDistance() {
        return Math.abs(to - from);
      },
      getItemIn: function getItemIn() {
        var out = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        var actives = this.getActives();
        var nextActives = inView(list, getLeft(next || prev, list, center));
        if (out) {
          var temp = actives;
          actives = nextActives;
          nextActives = temp;
        }
        return nextActives[findIndex(nextActives, function (el) {
          return !includes(actives, el);
        })];
      },
      getActives: function getActives() {
        return inView(list, getLeft(prev || next, list, center));
      }
    };
  }
  function getLeft(el, list, center) {
    var left = getElLeft(el, list);
    return center ? left - centerEl(el, list) : Math.min(left, getMax(list));
  }
  function getMax(list) {
    return Math.max(0, getWidth(list) - dimensions(list).width);
  }
  function getWidth(list) {
    return children(list).reduce(function (right, el) {
      return dimensions(el).width + right;
    }, 0);
  }
  function centerEl(el, list) {
    return dimensions(list).width / 2 - dimensions(el).width / 2;
  }
  function getElLeft(el, list) {
    return el && (position(el).left + (isRtl ? dimensions(el).width - dimensions(list).width : 0)) * (isRtl ? -1 : 1) || 0;
  }
  function inView(list, listLeft) {
    listLeft -= 1;
    var listWidth = dimensions(list).width;
    var listRight = listLeft + listWidth + 2;
    return children(list).filter(function (slide) {
      var slideLeft = getElLeft(slide, list);
      var slideRight = slideLeft + Math.min(dimensions(slide).width, listWidth);
      return slideLeft >= listLeft && slideRight <= listRight;
    });
  }
  function triggerUpdate(el, type, data) {
    trigger(el, createEvent(type, false, false, data));
  }

  var slider = {
    mixins: [Class],
    props: {
      index: Number,
      autoplay: Number,
      arrows: Boolean,
      dots: Boolean,
      infinite: Boolean,
      centered: Boolean,
      verticl: Boolean
    },
    data: {
      index: 0,
      slContainer: '.mui_slide_container',
      slLists: '.mui_slide_list',
      slItems: '.mui_slide_items',
      slNav: '.mui_slider_nav',
      clsActive: '.mui_active',
      autoplay: 0,
      arrows: true,
      arrowsHTML: "<div class=\"mui_slider_controls\">\n            <button type=\"button\" class=\"mui_arrows mui_prev\" mui-action=\"prev\"><span>\uC774\uC804</span></button>\n            <button type=\"button\" class=\"mui_arrows mui_next\" mui-action=\"next\"><span>\uB2E4\uC74C</span></button>\n        </div>",
      dotsHTML: "<div class=\"mui_slider_dots\">\n            <div class=\"mui_slider_inner\"></div>\n        </div>",
      dots: false,
      infinite: false,
      centered: false,
      Transitioner: Transitioner
      // <button type="button" class="mui_dot" mui-item="1"></button>
    },
    beforeConnect: function beforeConnect() {
      var arrowsHTML = this.arrowsHTML;
      this.arrows = !!this.arrows && append(this.$el, arrowsHTML);
    },
    computed: {
      slides: function slides(_ref, $el) {
        var slLists = _ref.slLists;
        console.log(slLists);
        return $$(slLists, $el);
      },
      maxLength: function maxLength() {
        return this.slides.length;
      },
      wrapper: function wrapper(_ref2, $el) {
        var slContainer = _ref2.slContainer;
        return $$1(slContainer, $el);
      }
    },
    events: [{
      name: 'click',
      delegate: function delegate() {
        return '.mui_arrows';
      },
      handler: function handler(e) {
        var action = attr(e.current, 'mui-action');
        this.show(action);
        console.log(this.wrapper);
      }
    }],
    methods: {
      show: function show(action) {
        console.log(action);
      }
    }
  };

  var worklists = {
    mixins: [Class, Togglable],
    props: {
      selector: String
    },
    data: {
      mainPath: '/pages/index.html',
      sidePath: '#pageLists',
      selector: " .tree-title",
      topNav: '#topNav a',
      sideTabLists: '#pages > div',
      clsOpen: "tree-open",
      clsClose: "tree-close",
      treeLists: ".lists button",
      contentframe: "#content_frame"
    },
    computed: {
      contentframe: function contentframe(_ref) {
        var contentframe = _ref.contentframe;
        return $$1(contentframe);
      },
      mainPath: function mainPath(_ref2) {
        var mainPath = _ref2.mainPath;
        return !!localStorage.getItem('url') ? localStorage.getItem('url') : mainPath;
      },
      sidePath: function sidePath(_ref3) {
        var sidePath = _ref3.sidePath;
        return !!localStorage.getItem('sideNav') ? localStorage.getItem('sideNav') : sidePath;
      }
    },
    events: [{
      name: "readystatechange load hashchange popstate",
      el: inBrowser && window,
      handler: function handler(e) {
        this.viewMainFrame(this.mainPath);
        this.viewsideNavigation(this.sidePath);
      }
    }, {
      name: "click",
      delegate: function delegate() {
        return "".concat(this.selector);
      },
      handler: function handler(e) {
        e.preventDefault();
        console.log(this.path);
      }
    }, {
      name: "click",
      delegate: function delegate() {
        return "".concat(this.topNav);
      },
      handler: function handler(e) {
        e.preventDefault();
        console.log(e.current.hash);
        this.viewsideNavigation(e.current.hash);
      }
    }, {
      name: "click",
      delegate: function delegate() {
        return "".concat(this.treeLists);
      },
      handler: function handler(e) {
        e.preventDefault();
        var path = attr(e.current, 'data-href');
        this.viewMainFrame(path);
      }
    }, {
      name: "scroll",
      el: window,
      handler: function handler() {
        // this.$emit('resize');
      }
    }],
    methods: {
      test: function test() {
        alert("dddddd");
      },
      setMainContent: function setMainContent() {
        console.log('sdfsdf');
      },
      viewMainFrame: function viewMainFrame(path) {
        localStorage.setItem('url', path);
        attr(this.contentframe, 'src', path);
      },
      viewsideNavigation: function viewsideNavigation(id) {
        localStorage.setItem('sideNav', id);
        $$(this.sideTabLists).forEach(function (el) {
          return css(el, 'display', "#".concat(el.id) === id ? 'block' : 'none');
        });
      }
    }
  };

  var components = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Accordion: accordion,
    Alert: alert$1,
    Button: Button,
    Calendar: calendar,
    Tab: tab,
    Toggle: toggle,
    Sticky: sticky,
    Datepicker: datepicker,
    Formatter: formatter,
    Modal: modal,
    Slider: slider,
    Worklists: worklists
  });

  function componentCore (GCui) {
    var DATA = GCui.data;
    var components = {};
    GCui.component = function (name, options) {
      name = hyphenate(name);
      if (!options) {
        if (isPlainObject(components[name])) {
          components[name] = GCui.extend(components[name]);
        }
        return components[name];
      }
      GCui[name] = function (element, data) {
        var component = GCui.component(name);
        return component.options.functional ? new component({
          data: isPlainObject(element) ? element : Array.prototype.slice.call(arguments)
        }) : !element ? init(element) : $$(element).map(init)[0];
        function init(element) {
          var instance = GCui.getComponent(element, name);
          // console.log(instance)
          // console.log(new component({el: element, data}));

          if (instance) {
            if (!data) {
              return instance;
            } else {
              instance.$destroy();
            }
          }
          return new component({
            el: element,
            data: data
          });
        }
      };
      var opt = isPlainObject(options) ? assign({}, options) : options.options;
      opt.name = name;
      if (opt.install) {
        opt.install(GCui, opt, name);
      }
      if (GCui._initialized && !opt.functional) {
        fastdom.read(function () {
          return GCui[name]("[".concat(GCui.prefixName, "-").concat(id, "],[data-").concat(GCui.prefixName, "-").concat(id, "]"));
        });
      }
      return components[name] = isPlainObject(options) ? opt : options;
    };
    GCui.getComponents = function (element) {
      return element && element[DATA] || {};
    };
    GCui.getComponent = function (element, name) {
      return GCui.getComponents(element)[name];
    };
    GCui.connect = function (node) {
      if (node[DATA]) {
        for (var name in node[DATA]) {
          node[DATA][name]._callConnected();
        }
      }
      for (var i = 0; i < node.attributes.length; i++) {
        var _name = getComponentName(node.attributes[i].name);
        if (_name && _name in components) {
          GCui[_name](node);
        }
      }
    };
    GCui.disconnect = function (node) {
      for (var name in node[DATA]) {
        node[DATA][name]._callDisconnected();
      }
    };
  }
  function getComponentName(attribute) {
    var prefix = 'mui';
    return startsWith(attribute, "".concat(prefix, "-")) || startsWith(attribute, "data-".concat(prefix, "-")) ? camelize(attribute.replace("data-".concat(prefix, "-"), '').replace("".concat(prefix, "-"), '')) : false;
  }

  function setFramewrok (UICommon) {
    var connect = UICommon.connect,
      disconnect = UICommon.disconnect;
    if (!window.MutationObserver) {
      console.log('not support MutationObserver');
      return;
    }
    fastdom.read(function () {
      if (document.body) {
        apply(document.body, connect);
      }
      new MutationObserver(function (mutations) {
        var updates = [];
        mutations.forEach(function (mutation) {
          applyMutation(mutation, updates);
        });
        updates.forEach(function (el) {
          UICommon.update(el);
        });
      }).observe(document, {
        childList: true,
        subtree: true,
        characterData: true
        // attributes: true
      });

      UICommon._initialized = true;
    });
    function applyMutation(mutation, updates) {
      var target = mutation.target,
        type = mutation.type;
      // console.log(mutation);
      var update = type !== 'attributes' ? applyChildList(mutation) : applyAttribute(mutation);
      if (update && !updates.some(function (element) {
        return element.contains(target);
      })) {
        updates.push(target.contains ? target : target.parentNode); // IE 11 text node does not implement contains
      }
    }

    function applyAttribute(_ref) {
      var target = _ref.target,
        attributeName = _ref.attributeName;
      if (attributeName === 'href') {
        return true;
      }
      var name = getComponentName(attributeName);
      if (!name || !(name in UICommon)) {
        return;
      }
      if (hasAttr(target, attributeName)) {
        UICommon[name](target);
        return true;
      }
      var component = UICommon.getComponent(target, name);
      if (component) {
        component.$destroy();
        return true;
      }
    }
    function applyChildList(_ref2) {
      var addedNodes = _ref2.addedNodes,
        removedNodes = _ref2.removedNodes;
      for (var i = 0; i < addedNodes.length; i++) {
        apply(addedNodes[i], connect);
      }
      for (var _i = 0; _i < removedNodes.length; _i++) {
        apply(removedNodes[_i], disconnect);
      }
      return true;
    }
  }

  var GCui = function GCui(options) {
    this._init(options);
  };
  GCui.util = util;
  GCui.data = 'uiComponents';
  GCui.prefixName = jsPrefix;
  GCui.prefix = "".concat(jsPrefix, "-");
  GCui.options = {};
  GCui.version = 1.0;

  // globalAPI Start
  globalApi(GCui);
  // globalAPI End

  // hooksAPI, stateAPI Start
  initializeApi(GCui);
  // hooksAPI End

  // componentAPI Start
  componentCore(GCui);
  // componentAPI End

  // instanceAPI Start
  instanceApi(GCui);
  // instanceAPI End

  // boot Start
  setFramewrok(GCui);
  // boot End

  each(components, function (component, name) {
    return GCui.component(name, component);
  });
  GCui.use(function (GCui) {
    inBrowser && ready(function () {
      GCui.update();
      // on(window, 'load resize', () => GCui.update(null, 'resize'))

      var pending;
      on(window, 'scroll', function (e) {
        if (pending) {
          return;
        }
        pending = true;
        fastdom.write(function () {
          return pending = false;
        });
        GCui.update(null, e.type);
      }, {
        passive: true,
        capture: true
      });
    });
  });

  return GCui;

}));
//# sourceMappingURL=index.js.map
