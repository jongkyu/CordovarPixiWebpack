/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/ansi-html/index.js":
/*!*****************************************!*\
  !*** ./node_modules/ansi-html/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = ansiHTML

// Reference to https://github.com/sindresorhus/ansi-regex
var _regANSI = /(?:(?:\u001b\[)|\u009b)(?:(?:[0-9]{1,3})?(?:(?:;[0-9]{0,3})*)?[A-M|f-m])|\u001b[A-M]/

var _defColors = {
  reset: ['fff', '000'], // [FOREGROUD_COLOR, BACKGROUND_COLOR]
  black: '000',
  red: 'ff0000',
  green: '209805',
  yellow: 'e8bf03',
  blue: '0000ff',
  magenta: 'ff00ff',
  cyan: '00ffee',
  lightgrey: 'f0f0f0',
  darkgrey: '888'
}
var _styles = {
  30: 'black',
  31: 'red',
  32: 'green',
  33: 'yellow',
  34: 'blue',
  35: 'magenta',
  36: 'cyan',
  37: 'lightgrey'
}
var _openTags = {
  '1': 'font-weight:bold', // bold
  '2': 'opacity:0.5', // dim
  '3': '<i>', // italic
  '4': '<u>', // underscore
  '8': 'display:none', // hidden
  '9': '<del>' // delete
}
var _closeTags = {
  '23': '</i>', // reset italic
  '24': '</u>', // reset underscore
  '29': '</del>' // reset delete
}

;[0, 21, 22, 27, 28, 39, 49].forEach(function (n) {
  _closeTags[n] = '</span>'
})

/**
 * Converts text with ANSI color codes to HTML markup.
 * @param {String} text
 * @returns {*}
 */
function ansiHTML (text) {
  // Returns the text if the string has no ANSI escape code.
  if (!_regANSI.test(text)) {
    return text
  }

  // Cache opened sequence.
  var ansiCodes = []
  // Replace with markup.
  var ret = text.replace(/\033\[(\d+)*m/g, function (match, seq) {
    var ot = _openTags[seq]
    if (ot) {
      // If current sequence has been opened, close it.
      if (!!~ansiCodes.indexOf(seq)) { // eslint-disable-line no-extra-boolean-cast
        ansiCodes.pop()
        return '</span>'
      }
      // Open tag.
      ansiCodes.push(seq)
      return ot[0] === '<' ? ot : '<span style="' + ot + ';">'
    }

    var ct = _closeTags[seq]
    if (ct) {
      // Pop sequence
      ansiCodes.pop()
      return ct
    }
    return ''
  })

  // Make sure tags are closed.
  var l = ansiCodes.length
  ;(l > 0) && (ret += Array(l + 1).join('</span>'))

  return ret
}

/**
 * Customize colors.
 * @param {Object} colors reference to _defColors
 */
ansiHTML.setColors = function (colors) {
  if (typeof colors !== 'object') {
    throw new Error('`colors` parameter must be an Object.')
  }

  var _finalColors = {}
  for (var key in _defColors) {
    var hex = colors.hasOwnProperty(key) ? colors[key] : null
    if (!hex) {
      _finalColors[key] = _defColors[key]
      continue
    }
    if ('reset' === key) {
      if (typeof hex === 'string') {
        hex = [hex]
      }
      if (!Array.isArray(hex) || hex.length === 0 || hex.some(function (h) {
        return typeof h !== 'string'
      })) {
        throw new Error('The value of `' + key + '` property must be an Array and each item could only be a hex string, e.g.: FF0000')
      }
      var defHexColor = _defColors[key]
      if (!hex[0]) {
        hex[0] = defHexColor[0]
      }
      if (hex.length === 1 || !hex[1]) {
        hex = [hex[0]]
        hex.push(defHexColor[1])
      }

      hex = hex.slice(0, 2)
    } else if (typeof hex !== 'string') {
      throw new Error('The value of `' + key + '` property must be a hex string, e.g.: FF0000')
    }
    _finalColors[key] = hex
  }
  _setTags(_finalColors)
}

/**
 * Reset colors.
 */
ansiHTML.reset = function () {
  _setTags(_defColors)
}

/**
 * Expose tags, including open and close.
 * @type {Object}
 */
ansiHTML.tags = {}

if (Object.defineProperty) {
  Object.defineProperty(ansiHTML.tags, 'open', {
    get: function () { return _openTags }
  })
  Object.defineProperty(ansiHTML.tags, 'close', {
    get: function () { return _closeTags }
  })
} else {
  ansiHTML.tags.open = _openTags
  ansiHTML.tags.close = _closeTags
}

function _setTags (colors) {
  // reset all
  _openTags['0'] = 'font-weight:normal;opacity:1;color:#' + colors.reset[0] + ';background:#' + colors.reset[1]
  // inverse
  _openTags['7'] = 'color:#' + colors.reset[1] + ';background:#' + colors.reset[0]
  // dark grey
  _openTags['90'] = 'color:#' + colors.darkgrey

  for (var code in _styles) {
    var color = _styles[code]
    var oriColor = colors[color] || '000'
    _openTags[code] = 'color:#' + oriColor
    code = parseInt(code)
    _openTags[(code + 10).toString()] = 'background:#' + oriColor
  }
}

ansiHTML.reset()


/***/ }),

/***/ "./node_modules/ansi-regex/index.js":
/*!******************************************!*\
  !*** ./node_modules/ansi-regex/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function () {
	return /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-PRZcf-nqry=><]/g;
};


/***/ }),

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function $getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return $getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = $getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  var args = [];
  for (var i = 0; i < arguments.length; i++) args.push(arguments[i]);
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    ReflectApply(this.listener, this.target, args);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      if (typeof listener !== 'function') {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
      }
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      if (typeof listener !== 'function') {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
      }

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}


/***/ }),

/***/ "./node_modules/html-entities/index.js":
/*!*********************************************!*\
  !*** ./node_modules/html-entities/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  XmlEntities: __webpack_require__(/*! ./lib/xml-entities.js */ "./node_modules/html-entities/lib/xml-entities.js"),
  Html4Entities: __webpack_require__(/*! ./lib/html4-entities.js */ "./node_modules/html-entities/lib/html4-entities.js"),
  Html5Entities: __webpack_require__(/*! ./lib/html5-entities.js */ "./node_modules/html-entities/lib/html5-entities.js"),
  AllHtmlEntities: __webpack_require__(/*! ./lib/html5-entities.js */ "./node_modules/html-entities/lib/html5-entities.js")
};


/***/ }),

/***/ "./node_modules/html-entities/lib/html4-entities.js":
/*!**********************************************************!*\
  !*** ./node_modules/html-entities/lib/html4-entities.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var HTML_ALPHA = ['apos', 'nbsp', 'iexcl', 'cent', 'pound', 'curren', 'yen', 'brvbar', 'sect', 'uml', 'copy', 'ordf', 'laquo', 'not', 'shy', 'reg', 'macr', 'deg', 'plusmn', 'sup2', 'sup3', 'acute', 'micro', 'para', 'middot', 'cedil', 'sup1', 'ordm', 'raquo', 'frac14', 'frac12', 'frac34', 'iquest', 'Agrave', 'Aacute', 'Acirc', 'Atilde', 'Auml', 'Aring', 'Aelig', 'Ccedil', 'Egrave', 'Eacute', 'Ecirc', 'Euml', 'Igrave', 'Iacute', 'Icirc', 'Iuml', 'ETH', 'Ntilde', 'Ograve', 'Oacute', 'Ocirc', 'Otilde', 'Ouml', 'times', 'Oslash', 'Ugrave', 'Uacute', 'Ucirc', 'Uuml', 'Yacute', 'THORN', 'szlig', 'agrave', 'aacute', 'acirc', 'atilde', 'auml', 'aring', 'aelig', 'ccedil', 'egrave', 'eacute', 'ecirc', 'euml', 'igrave', 'iacute', 'icirc', 'iuml', 'eth', 'ntilde', 'ograve', 'oacute', 'ocirc', 'otilde', 'ouml', 'divide', 'oslash', 'ugrave', 'uacute', 'ucirc', 'uuml', 'yacute', 'thorn', 'yuml', 'quot', 'amp', 'lt', 'gt', 'OElig', 'oelig', 'Scaron', 'scaron', 'Yuml', 'circ', 'tilde', 'ensp', 'emsp', 'thinsp', 'zwnj', 'zwj', 'lrm', 'rlm', 'ndash', 'mdash', 'lsquo', 'rsquo', 'sbquo', 'ldquo', 'rdquo', 'bdquo', 'dagger', 'Dagger', 'permil', 'lsaquo', 'rsaquo', 'euro', 'fnof', 'Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta', 'Iota', 'Kappa', 'Lambda', 'Mu', 'Nu', 'Xi', 'Omicron', 'Pi', 'Rho', 'Sigma', 'Tau', 'Upsilon', 'Phi', 'Chi', 'Psi', 'Omega', 'alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta', 'iota', 'kappa', 'lambda', 'mu', 'nu', 'xi', 'omicron', 'pi', 'rho', 'sigmaf', 'sigma', 'tau', 'upsilon', 'phi', 'chi', 'psi', 'omega', 'thetasym', 'upsih', 'piv', 'bull', 'hellip', 'prime', 'Prime', 'oline', 'frasl', 'weierp', 'image', 'real', 'trade', 'alefsym', 'larr', 'uarr', 'rarr', 'darr', 'harr', 'crarr', 'lArr', 'uArr', 'rArr', 'dArr', 'hArr', 'forall', 'part', 'exist', 'empty', 'nabla', 'isin', 'notin', 'ni', 'prod', 'sum', 'minus', 'lowast', 'radic', 'prop', 'infin', 'ang', 'and', 'or', 'cap', 'cup', 'int', 'there4', 'sim', 'cong', 'asymp', 'ne', 'equiv', 'le', 'ge', 'sub', 'sup', 'nsub', 'sube', 'supe', 'oplus', 'otimes', 'perp', 'sdot', 'lceil', 'rceil', 'lfloor', 'rfloor', 'lang', 'rang', 'loz', 'spades', 'clubs', 'hearts', 'diams'];
var HTML_CODES = [39, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 34, 38, 60, 62, 338, 339, 352, 353, 376, 710, 732, 8194, 8195, 8201, 8204, 8205, 8206, 8207, 8211, 8212, 8216, 8217, 8218, 8220, 8221, 8222, 8224, 8225, 8240, 8249, 8250, 8364, 402, 913, 914, 915, 916, 917, 918, 919, 920, 921, 922, 923, 924, 925, 926, 927, 928, 929, 931, 932, 933, 934, 935, 936, 937, 945, 946, 947, 948, 949, 950, 951, 952, 953, 954, 955, 956, 957, 958, 959, 960, 961, 962, 963, 964, 965, 966, 967, 968, 969, 977, 978, 982, 8226, 8230, 8242, 8243, 8254, 8260, 8472, 8465, 8476, 8482, 8501, 8592, 8593, 8594, 8595, 8596, 8629, 8656, 8657, 8658, 8659, 8660, 8704, 8706, 8707, 8709, 8711, 8712, 8713, 8715, 8719, 8721, 8722, 8727, 8730, 8733, 8734, 8736, 8743, 8744, 8745, 8746, 8747, 8756, 8764, 8773, 8776, 8800, 8801, 8804, 8805, 8834, 8835, 8836, 8838, 8839, 8853, 8855, 8869, 8901, 8968, 8969, 8970, 8971, 9001, 9002, 9674, 9824, 9827, 9829, 9830];

var alphaIndex = {};
var numIndex = {};

var i = 0;
var length = HTML_ALPHA.length;
while (i < length) {
    var a = HTML_ALPHA[i];
    var c = HTML_CODES[i];
    alphaIndex[a] = String.fromCharCode(c);
    numIndex[c] = a;
    i++;
}

/**
 * @constructor
 */
function Html4Entities() {}

/**
 * @param {String} str
 * @returns {String}
 */
Html4Entities.prototype.decode = function(str) {
    if (!str || !str.length) {
        return '';
    }
    return str.replace(/&(#?[\w\d]+);?/g, function(s, entity) {
        var chr;
        if (entity.charAt(0) === "#") {
            var code = entity.charAt(1).toLowerCase() === 'x' ?
                parseInt(entity.substr(2), 16) :
                parseInt(entity.substr(1));

            if (!(isNaN(code) || code < -32768 || code > 65535)) {
                chr = String.fromCharCode(code);
            }
        } else {
            chr = alphaIndex[entity];
        }
        return chr || s;
    });
};

/**
 * @param {String} str
 * @returns {String}
 */
Html4Entities.decode = function(str) {
    return new Html4Entities().decode(str);
};

/**
 * @param {String} str
 * @returns {String}
 */
Html4Entities.prototype.encode = function(str) {
    if (!str || !str.length) {
        return '';
    }
    var strLength = str.length;
    var result = '';
    var i = 0;
    while (i < strLength) {
        var alpha = numIndex[str.charCodeAt(i)];
        result += alpha ? "&" + alpha + ";" : str.charAt(i);
        i++;
    }
    return result;
};

/**
 * @param {String} str
 * @returns {String}
 */
Html4Entities.encode = function(str) {
    return new Html4Entities().encode(str);
};

/**
 * @param {String} str
 * @returns {String}
 */
Html4Entities.prototype.encodeNonUTF = function(str) {
    if (!str || !str.length) {
        return '';
    }
    var strLength = str.length;
    var result = '';
    var i = 0;
    while (i < strLength) {
        var cc = str.charCodeAt(i);
        var alpha = numIndex[cc];
        if (alpha) {
            result += "&" + alpha + ";";
        } else if (cc < 32 || cc > 126) {
            result += "&#" + cc + ";";
        } else {
            result += str.charAt(i);
        }
        i++;
    }
    return result;
};

/**
 * @param {String} str
 * @returns {String}
 */
Html4Entities.encodeNonUTF = function(str) {
    return new Html4Entities().encodeNonUTF(str);
};

/**
 * @param {String} str
 * @returns {String}
 */
Html4Entities.prototype.encodeNonASCII = function(str) {
    if (!str || !str.length) {
        return '';
    }
    var strLength = str.length;
    var result = '';
    var i = 0;
    while (i < strLength) {
        var c = str.charCodeAt(i);
        if (c <= 255) {
            result += str[i++];
            continue;
        }
        result += '&#' + c + ';';
        i++;
    }
    return result;
};

/**
 * @param {String} str
 * @returns {String}
 */
Html4Entities.encodeNonASCII = function(str) {
    return new Html4Entities().encodeNonASCII(str);
};

module.exports = Html4Entities;


/***/ }),

/***/ "./node_modules/html-entities/lib/html5-entities.js":
/*!**********************************************************!*\
  !*** ./node_modules/html-entities/lib/html5-entities.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var ENTITIES = [['Aacute', [193]], ['aacute', [225]], ['Abreve', [258]], ['abreve', [259]], ['ac', [8766]], ['acd', [8767]], ['acE', [8766, 819]], ['Acirc', [194]], ['acirc', [226]], ['acute', [180]], ['Acy', [1040]], ['acy', [1072]], ['AElig', [198]], ['aelig', [230]], ['af', [8289]], ['Afr', [120068]], ['afr', [120094]], ['Agrave', [192]], ['agrave', [224]], ['alefsym', [8501]], ['aleph', [8501]], ['Alpha', [913]], ['alpha', [945]], ['Amacr', [256]], ['amacr', [257]], ['amalg', [10815]], ['amp', [38]], ['AMP', [38]], ['andand', [10837]], ['And', [10835]], ['and', [8743]], ['andd', [10844]], ['andslope', [10840]], ['andv', [10842]], ['ang', [8736]], ['ange', [10660]], ['angle', [8736]], ['angmsdaa', [10664]], ['angmsdab', [10665]], ['angmsdac', [10666]], ['angmsdad', [10667]], ['angmsdae', [10668]], ['angmsdaf', [10669]], ['angmsdag', [10670]], ['angmsdah', [10671]], ['angmsd', [8737]], ['angrt', [8735]], ['angrtvb', [8894]], ['angrtvbd', [10653]], ['angsph', [8738]], ['angst', [197]], ['angzarr', [9084]], ['Aogon', [260]], ['aogon', [261]], ['Aopf', [120120]], ['aopf', [120146]], ['apacir', [10863]], ['ap', [8776]], ['apE', [10864]], ['ape', [8778]], ['apid', [8779]], ['apos', [39]], ['ApplyFunction', [8289]], ['approx', [8776]], ['approxeq', [8778]], ['Aring', [197]], ['aring', [229]], ['Ascr', [119964]], ['ascr', [119990]], ['Assign', [8788]], ['ast', [42]], ['asymp', [8776]], ['asympeq', [8781]], ['Atilde', [195]], ['atilde', [227]], ['Auml', [196]], ['auml', [228]], ['awconint', [8755]], ['awint', [10769]], ['backcong', [8780]], ['backepsilon', [1014]], ['backprime', [8245]], ['backsim', [8765]], ['backsimeq', [8909]], ['Backslash', [8726]], ['Barv', [10983]], ['barvee', [8893]], ['barwed', [8965]], ['Barwed', [8966]], ['barwedge', [8965]], ['bbrk', [9141]], ['bbrktbrk', [9142]], ['bcong', [8780]], ['Bcy', [1041]], ['bcy', [1073]], ['bdquo', [8222]], ['becaus', [8757]], ['because', [8757]], ['Because', [8757]], ['bemptyv', [10672]], ['bepsi', [1014]], ['bernou', [8492]], ['Bernoullis', [8492]], ['Beta', [914]], ['beta', [946]], ['beth', [8502]], ['between', [8812]], ['Bfr', [120069]], ['bfr', [120095]], ['bigcap', [8898]], ['bigcirc', [9711]], ['bigcup', [8899]], ['bigodot', [10752]], ['bigoplus', [10753]], ['bigotimes', [10754]], ['bigsqcup', [10758]], ['bigstar', [9733]], ['bigtriangledown', [9661]], ['bigtriangleup', [9651]], ['biguplus', [10756]], ['bigvee', [8897]], ['bigwedge', [8896]], ['bkarow', [10509]], ['blacklozenge', [10731]], ['blacksquare', [9642]], ['blacktriangle', [9652]], ['blacktriangledown', [9662]], ['blacktriangleleft', [9666]], ['blacktriangleright', [9656]], ['blank', [9251]], ['blk12', [9618]], ['blk14', [9617]], ['blk34', [9619]], ['block', [9608]], ['bne', [61, 8421]], ['bnequiv', [8801, 8421]], ['bNot', [10989]], ['bnot', [8976]], ['Bopf', [120121]], ['bopf', [120147]], ['bot', [8869]], ['bottom', [8869]], ['bowtie', [8904]], ['boxbox', [10697]], ['boxdl', [9488]], ['boxdL', [9557]], ['boxDl', [9558]], ['boxDL', [9559]], ['boxdr', [9484]], ['boxdR', [9554]], ['boxDr', [9555]], ['boxDR', [9556]], ['boxh', [9472]], ['boxH', [9552]], ['boxhd', [9516]], ['boxHd', [9572]], ['boxhD', [9573]], ['boxHD', [9574]], ['boxhu', [9524]], ['boxHu', [9575]], ['boxhU', [9576]], ['boxHU', [9577]], ['boxminus', [8863]], ['boxplus', [8862]], ['boxtimes', [8864]], ['boxul', [9496]], ['boxuL', [9563]], ['boxUl', [9564]], ['boxUL', [9565]], ['boxur', [9492]], ['boxuR', [9560]], ['boxUr', [9561]], ['boxUR', [9562]], ['boxv', [9474]], ['boxV', [9553]], ['boxvh', [9532]], ['boxvH', [9578]], ['boxVh', [9579]], ['boxVH', [9580]], ['boxvl', [9508]], ['boxvL', [9569]], ['boxVl', [9570]], ['boxVL', [9571]], ['boxvr', [9500]], ['boxvR', [9566]], ['boxVr', [9567]], ['boxVR', [9568]], ['bprime', [8245]], ['breve', [728]], ['Breve', [728]], ['brvbar', [166]], ['bscr', [119991]], ['Bscr', [8492]], ['bsemi', [8271]], ['bsim', [8765]], ['bsime', [8909]], ['bsolb', [10693]], ['bsol', [92]], ['bsolhsub', [10184]], ['bull', [8226]], ['bullet', [8226]], ['bump', [8782]], ['bumpE', [10926]], ['bumpe', [8783]], ['Bumpeq', [8782]], ['bumpeq', [8783]], ['Cacute', [262]], ['cacute', [263]], ['capand', [10820]], ['capbrcup', [10825]], ['capcap', [10827]], ['cap', [8745]], ['Cap', [8914]], ['capcup', [10823]], ['capdot', [10816]], ['CapitalDifferentialD', [8517]], ['caps', [8745, 65024]], ['caret', [8257]], ['caron', [711]], ['Cayleys', [8493]], ['ccaps', [10829]], ['Ccaron', [268]], ['ccaron', [269]], ['Ccedil', [199]], ['ccedil', [231]], ['Ccirc', [264]], ['ccirc', [265]], ['Cconint', [8752]], ['ccups', [10828]], ['ccupssm', [10832]], ['Cdot', [266]], ['cdot', [267]], ['cedil', [184]], ['Cedilla', [184]], ['cemptyv', [10674]], ['cent', [162]], ['centerdot', [183]], ['CenterDot', [183]], ['cfr', [120096]], ['Cfr', [8493]], ['CHcy', [1063]], ['chcy', [1095]], ['check', [10003]], ['checkmark', [10003]], ['Chi', [935]], ['chi', [967]], ['circ', [710]], ['circeq', [8791]], ['circlearrowleft', [8634]], ['circlearrowright', [8635]], ['circledast', [8859]], ['circledcirc', [8858]], ['circleddash', [8861]], ['CircleDot', [8857]], ['circledR', [174]], ['circledS', [9416]], ['CircleMinus', [8854]], ['CirclePlus', [8853]], ['CircleTimes', [8855]], ['cir', [9675]], ['cirE', [10691]], ['cire', [8791]], ['cirfnint', [10768]], ['cirmid', [10991]], ['cirscir', [10690]], ['ClockwiseContourIntegral', [8754]], ['clubs', [9827]], ['clubsuit', [9827]], ['colon', [58]], ['Colon', [8759]], ['Colone', [10868]], ['colone', [8788]], ['coloneq', [8788]], ['comma', [44]], ['commat', [64]], ['comp', [8705]], ['compfn', [8728]], ['complement', [8705]], ['complexes', [8450]], ['cong', [8773]], ['congdot', [10861]], ['Congruent', [8801]], ['conint', [8750]], ['Conint', [8751]], ['ContourIntegral', [8750]], ['copf', [120148]], ['Copf', [8450]], ['coprod', [8720]], ['Coproduct', [8720]], ['copy', [169]], ['COPY', [169]], ['copysr', [8471]], ['CounterClockwiseContourIntegral', [8755]], ['crarr', [8629]], ['cross', [10007]], ['Cross', [10799]], ['Cscr', [119966]], ['cscr', [119992]], ['csub', [10959]], ['csube', [10961]], ['csup', [10960]], ['csupe', [10962]], ['ctdot', [8943]], ['cudarrl', [10552]], ['cudarrr', [10549]], ['cuepr', [8926]], ['cuesc', [8927]], ['cularr', [8630]], ['cularrp', [10557]], ['cupbrcap', [10824]], ['cupcap', [10822]], ['CupCap', [8781]], ['cup', [8746]], ['Cup', [8915]], ['cupcup', [10826]], ['cupdot', [8845]], ['cupor', [10821]], ['cups', [8746, 65024]], ['curarr', [8631]], ['curarrm', [10556]], ['curlyeqprec', [8926]], ['curlyeqsucc', [8927]], ['curlyvee', [8910]], ['curlywedge', [8911]], ['curren', [164]], ['curvearrowleft', [8630]], ['curvearrowright', [8631]], ['cuvee', [8910]], ['cuwed', [8911]], ['cwconint', [8754]], ['cwint', [8753]], ['cylcty', [9005]], ['dagger', [8224]], ['Dagger', [8225]], ['daleth', [8504]], ['darr', [8595]], ['Darr', [8609]], ['dArr', [8659]], ['dash', [8208]], ['Dashv', [10980]], ['dashv', [8867]], ['dbkarow', [10511]], ['dblac', [733]], ['Dcaron', [270]], ['dcaron', [271]], ['Dcy', [1044]], ['dcy', [1076]], ['ddagger', [8225]], ['ddarr', [8650]], ['DD', [8517]], ['dd', [8518]], ['DDotrahd', [10513]], ['ddotseq', [10871]], ['deg', [176]], ['Del', [8711]], ['Delta', [916]], ['delta', [948]], ['demptyv', [10673]], ['dfisht', [10623]], ['Dfr', [120071]], ['dfr', [120097]], ['dHar', [10597]], ['dharl', [8643]], ['dharr', [8642]], ['DiacriticalAcute', [180]], ['DiacriticalDot', [729]], ['DiacriticalDoubleAcute', [733]], ['DiacriticalGrave', [96]], ['DiacriticalTilde', [732]], ['diam', [8900]], ['diamond', [8900]], ['Diamond', [8900]], ['diamondsuit', [9830]], ['diams', [9830]], ['die', [168]], ['DifferentialD', [8518]], ['digamma', [989]], ['disin', [8946]], ['div', [247]], ['divide', [247]], ['divideontimes', [8903]], ['divonx', [8903]], ['DJcy', [1026]], ['djcy', [1106]], ['dlcorn', [8990]], ['dlcrop', [8973]], ['dollar', [36]], ['Dopf', [120123]], ['dopf', [120149]], ['Dot', [168]], ['dot', [729]], ['DotDot', [8412]], ['doteq', [8784]], ['doteqdot', [8785]], ['DotEqual', [8784]], ['dotminus', [8760]], ['dotplus', [8724]], ['dotsquare', [8865]], ['doublebarwedge', [8966]], ['DoubleContourIntegral', [8751]], ['DoubleDot', [168]], ['DoubleDownArrow', [8659]], ['DoubleLeftArrow', [8656]], ['DoubleLeftRightArrow', [8660]], ['DoubleLeftTee', [10980]], ['DoubleLongLeftArrow', [10232]], ['DoubleLongLeftRightArrow', [10234]], ['DoubleLongRightArrow', [10233]], ['DoubleRightArrow', [8658]], ['DoubleRightTee', [8872]], ['DoubleUpArrow', [8657]], ['DoubleUpDownArrow', [8661]], ['DoubleVerticalBar', [8741]], ['DownArrowBar', [10515]], ['downarrow', [8595]], ['DownArrow', [8595]], ['Downarrow', [8659]], ['DownArrowUpArrow', [8693]], ['DownBreve', [785]], ['downdownarrows', [8650]], ['downharpoonleft', [8643]], ['downharpoonright', [8642]], ['DownLeftRightVector', [10576]], ['DownLeftTeeVector', [10590]], ['DownLeftVectorBar', [10582]], ['DownLeftVector', [8637]], ['DownRightTeeVector', [10591]], ['DownRightVectorBar', [10583]], ['DownRightVector', [8641]], ['DownTeeArrow', [8615]], ['DownTee', [8868]], ['drbkarow', [10512]], ['drcorn', [8991]], ['drcrop', [8972]], ['Dscr', [119967]], ['dscr', [119993]], ['DScy', [1029]], ['dscy', [1109]], ['dsol', [10742]], ['Dstrok', [272]], ['dstrok', [273]], ['dtdot', [8945]], ['dtri', [9663]], ['dtrif', [9662]], ['duarr', [8693]], ['duhar', [10607]], ['dwangle', [10662]], ['DZcy', [1039]], ['dzcy', [1119]], ['dzigrarr', [10239]], ['Eacute', [201]], ['eacute', [233]], ['easter', [10862]], ['Ecaron', [282]], ['ecaron', [283]], ['Ecirc', [202]], ['ecirc', [234]], ['ecir', [8790]], ['ecolon', [8789]], ['Ecy', [1069]], ['ecy', [1101]], ['eDDot', [10871]], ['Edot', [278]], ['edot', [279]], ['eDot', [8785]], ['ee', [8519]], ['efDot', [8786]], ['Efr', [120072]], ['efr', [120098]], ['eg', [10906]], ['Egrave', [200]], ['egrave', [232]], ['egs', [10902]], ['egsdot', [10904]], ['el', [10905]], ['Element', [8712]], ['elinters', [9191]], ['ell', [8467]], ['els', [10901]], ['elsdot', [10903]], ['Emacr', [274]], ['emacr', [275]], ['empty', [8709]], ['emptyset', [8709]], ['EmptySmallSquare', [9723]], ['emptyv', [8709]], ['EmptyVerySmallSquare', [9643]], ['emsp13', [8196]], ['emsp14', [8197]], ['emsp', [8195]], ['ENG', [330]], ['eng', [331]], ['ensp', [8194]], ['Eogon', [280]], ['eogon', [281]], ['Eopf', [120124]], ['eopf', [120150]], ['epar', [8917]], ['eparsl', [10723]], ['eplus', [10865]], ['epsi', [949]], ['Epsilon', [917]], ['epsilon', [949]], ['epsiv', [1013]], ['eqcirc', [8790]], ['eqcolon', [8789]], ['eqsim', [8770]], ['eqslantgtr', [10902]], ['eqslantless', [10901]], ['Equal', [10869]], ['equals', [61]], ['EqualTilde', [8770]], ['equest', [8799]], ['Equilibrium', [8652]], ['equiv', [8801]], ['equivDD', [10872]], ['eqvparsl', [10725]], ['erarr', [10609]], ['erDot', [8787]], ['escr', [8495]], ['Escr', [8496]], ['esdot', [8784]], ['Esim', [10867]], ['esim', [8770]], ['Eta', [919]], ['eta', [951]], ['ETH', [208]], ['eth', [240]], ['Euml', [203]], ['euml', [235]], ['euro', [8364]], ['excl', [33]], ['exist', [8707]], ['Exists', [8707]], ['expectation', [8496]], ['exponentiale', [8519]], ['ExponentialE', [8519]], ['fallingdotseq', [8786]], ['Fcy', [1060]], ['fcy', [1092]], ['female', [9792]], ['ffilig', [64259]], ['fflig', [64256]], ['ffllig', [64260]], ['Ffr', [120073]], ['ffr', [120099]], ['filig', [64257]], ['FilledSmallSquare', [9724]], ['FilledVerySmallSquare', [9642]], ['fjlig', [102, 106]], ['flat', [9837]], ['fllig', [64258]], ['fltns', [9649]], ['fnof', [402]], ['Fopf', [120125]], ['fopf', [120151]], ['forall', [8704]], ['ForAll', [8704]], ['fork', [8916]], ['forkv', [10969]], ['Fouriertrf', [8497]], ['fpartint', [10765]], ['frac12', [189]], ['frac13', [8531]], ['frac14', [188]], ['frac15', [8533]], ['frac16', [8537]], ['frac18', [8539]], ['frac23', [8532]], ['frac25', [8534]], ['frac34', [190]], ['frac35', [8535]], ['frac38', [8540]], ['frac45', [8536]], ['frac56', [8538]], ['frac58', [8541]], ['frac78', [8542]], ['frasl', [8260]], ['frown', [8994]], ['fscr', [119995]], ['Fscr', [8497]], ['gacute', [501]], ['Gamma', [915]], ['gamma', [947]], ['Gammad', [988]], ['gammad', [989]], ['gap', [10886]], ['Gbreve', [286]], ['gbreve', [287]], ['Gcedil', [290]], ['Gcirc', [284]], ['gcirc', [285]], ['Gcy', [1043]], ['gcy', [1075]], ['Gdot', [288]], ['gdot', [289]], ['ge', [8805]], ['gE', [8807]], ['gEl', [10892]], ['gel', [8923]], ['geq', [8805]], ['geqq', [8807]], ['geqslant', [10878]], ['gescc', [10921]], ['ges', [10878]], ['gesdot', [10880]], ['gesdoto', [10882]], ['gesdotol', [10884]], ['gesl', [8923, 65024]], ['gesles', [10900]], ['Gfr', [120074]], ['gfr', [120100]], ['gg', [8811]], ['Gg', [8921]], ['ggg', [8921]], ['gimel', [8503]], ['GJcy', [1027]], ['gjcy', [1107]], ['gla', [10917]], ['gl', [8823]], ['glE', [10898]], ['glj', [10916]], ['gnap', [10890]], ['gnapprox', [10890]], ['gne', [10888]], ['gnE', [8809]], ['gneq', [10888]], ['gneqq', [8809]], ['gnsim', [8935]], ['Gopf', [120126]], ['gopf', [120152]], ['grave', [96]], ['GreaterEqual', [8805]], ['GreaterEqualLess', [8923]], ['GreaterFullEqual', [8807]], ['GreaterGreater', [10914]], ['GreaterLess', [8823]], ['GreaterSlantEqual', [10878]], ['GreaterTilde', [8819]], ['Gscr', [119970]], ['gscr', [8458]], ['gsim', [8819]], ['gsime', [10894]], ['gsiml', [10896]], ['gtcc', [10919]], ['gtcir', [10874]], ['gt', [62]], ['GT', [62]], ['Gt', [8811]], ['gtdot', [8919]], ['gtlPar', [10645]], ['gtquest', [10876]], ['gtrapprox', [10886]], ['gtrarr', [10616]], ['gtrdot', [8919]], ['gtreqless', [8923]], ['gtreqqless', [10892]], ['gtrless', [8823]], ['gtrsim', [8819]], ['gvertneqq', [8809, 65024]], ['gvnE', [8809, 65024]], ['Hacek', [711]], ['hairsp', [8202]], ['half', [189]], ['hamilt', [8459]], ['HARDcy', [1066]], ['hardcy', [1098]], ['harrcir', [10568]], ['harr', [8596]], ['hArr', [8660]], ['harrw', [8621]], ['Hat', [94]], ['hbar', [8463]], ['Hcirc', [292]], ['hcirc', [293]], ['hearts', [9829]], ['heartsuit', [9829]], ['hellip', [8230]], ['hercon', [8889]], ['hfr', [120101]], ['Hfr', [8460]], ['HilbertSpace', [8459]], ['hksearow', [10533]], ['hkswarow', [10534]], ['hoarr', [8703]], ['homtht', [8763]], ['hookleftarrow', [8617]], ['hookrightarrow', [8618]], ['hopf', [120153]], ['Hopf', [8461]], ['horbar', [8213]], ['HorizontalLine', [9472]], ['hscr', [119997]], ['Hscr', [8459]], ['hslash', [8463]], ['Hstrok', [294]], ['hstrok', [295]], ['HumpDownHump', [8782]], ['HumpEqual', [8783]], ['hybull', [8259]], ['hyphen', [8208]], ['Iacute', [205]], ['iacute', [237]], ['ic', [8291]], ['Icirc', [206]], ['icirc', [238]], ['Icy', [1048]], ['icy', [1080]], ['Idot', [304]], ['IEcy', [1045]], ['iecy', [1077]], ['iexcl', [161]], ['iff', [8660]], ['ifr', [120102]], ['Ifr', [8465]], ['Igrave', [204]], ['igrave', [236]], ['ii', [8520]], ['iiiint', [10764]], ['iiint', [8749]], ['iinfin', [10716]], ['iiota', [8489]], ['IJlig', [306]], ['ijlig', [307]], ['Imacr', [298]], ['imacr', [299]], ['image', [8465]], ['ImaginaryI', [8520]], ['imagline', [8464]], ['imagpart', [8465]], ['imath', [305]], ['Im', [8465]], ['imof', [8887]], ['imped', [437]], ['Implies', [8658]], ['incare', [8453]], ['in', [8712]], ['infin', [8734]], ['infintie', [10717]], ['inodot', [305]], ['intcal', [8890]], ['int', [8747]], ['Int', [8748]], ['integers', [8484]], ['Integral', [8747]], ['intercal', [8890]], ['Intersection', [8898]], ['intlarhk', [10775]], ['intprod', [10812]], ['InvisibleComma', [8291]], ['InvisibleTimes', [8290]], ['IOcy', [1025]], ['iocy', [1105]], ['Iogon', [302]], ['iogon', [303]], ['Iopf', [120128]], ['iopf', [120154]], ['Iota', [921]], ['iota', [953]], ['iprod', [10812]], ['iquest', [191]], ['iscr', [119998]], ['Iscr', [8464]], ['isin', [8712]], ['isindot', [8949]], ['isinE', [8953]], ['isins', [8948]], ['isinsv', [8947]], ['isinv', [8712]], ['it', [8290]], ['Itilde', [296]], ['itilde', [297]], ['Iukcy', [1030]], ['iukcy', [1110]], ['Iuml', [207]], ['iuml', [239]], ['Jcirc', [308]], ['jcirc', [309]], ['Jcy', [1049]], ['jcy', [1081]], ['Jfr', [120077]], ['jfr', [120103]], ['jmath', [567]], ['Jopf', [120129]], ['jopf', [120155]], ['Jscr', [119973]], ['jscr', [119999]], ['Jsercy', [1032]], ['jsercy', [1112]], ['Jukcy', [1028]], ['jukcy', [1108]], ['Kappa', [922]], ['kappa', [954]], ['kappav', [1008]], ['Kcedil', [310]], ['kcedil', [311]], ['Kcy', [1050]], ['kcy', [1082]], ['Kfr', [120078]], ['kfr', [120104]], ['kgreen', [312]], ['KHcy', [1061]], ['khcy', [1093]], ['KJcy', [1036]], ['kjcy', [1116]], ['Kopf', [120130]], ['kopf', [120156]], ['Kscr', [119974]], ['kscr', [120000]], ['lAarr', [8666]], ['Lacute', [313]], ['lacute', [314]], ['laemptyv', [10676]], ['lagran', [8466]], ['Lambda', [923]], ['lambda', [955]], ['lang', [10216]], ['Lang', [10218]], ['langd', [10641]], ['langle', [10216]], ['lap', [10885]], ['Laplacetrf', [8466]], ['laquo', [171]], ['larrb', [8676]], ['larrbfs', [10527]], ['larr', [8592]], ['Larr', [8606]], ['lArr', [8656]], ['larrfs', [10525]], ['larrhk', [8617]], ['larrlp', [8619]], ['larrpl', [10553]], ['larrsim', [10611]], ['larrtl', [8610]], ['latail', [10521]], ['lAtail', [10523]], ['lat', [10923]], ['late', [10925]], ['lates', [10925, 65024]], ['lbarr', [10508]], ['lBarr', [10510]], ['lbbrk', [10098]], ['lbrace', [123]], ['lbrack', [91]], ['lbrke', [10635]], ['lbrksld', [10639]], ['lbrkslu', [10637]], ['Lcaron', [317]], ['lcaron', [318]], ['Lcedil', [315]], ['lcedil', [316]], ['lceil', [8968]], ['lcub', [123]], ['Lcy', [1051]], ['lcy', [1083]], ['ldca', [10550]], ['ldquo', [8220]], ['ldquor', [8222]], ['ldrdhar', [10599]], ['ldrushar', [10571]], ['ldsh', [8626]], ['le', [8804]], ['lE', [8806]], ['LeftAngleBracket', [10216]], ['LeftArrowBar', [8676]], ['leftarrow', [8592]], ['LeftArrow', [8592]], ['Leftarrow', [8656]], ['LeftArrowRightArrow', [8646]], ['leftarrowtail', [8610]], ['LeftCeiling', [8968]], ['LeftDoubleBracket', [10214]], ['LeftDownTeeVector', [10593]], ['LeftDownVectorBar', [10585]], ['LeftDownVector', [8643]], ['LeftFloor', [8970]], ['leftharpoondown', [8637]], ['leftharpoonup', [8636]], ['leftleftarrows', [8647]], ['leftrightarrow', [8596]], ['LeftRightArrow', [8596]], ['Leftrightarrow', [8660]], ['leftrightarrows', [8646]], ['leftrightharpoons', [8651]], ['leftrightsquigarrow', [8621]], ['LeftRightVector', [10574]], ['LeftTeeArrow', [8612]], ['LeftTee', [8867]], ['LeftTeeVector', [10586]], ['leftthreetimes', [8907]], ['LeftTriangleBar', [10703]], ['LeftTriangle', [8882]], ['LeftTriangleEqual', [8884]], ['LeftUpDownVector', [10577]], ['LeftUpTeeVector', [10592]], ['LeftUpVectorBar', [10584]], ['LeftUpVector', [8639]], ['LeftVectorBar', [10578]], ['LeftVector', [8636]], ['lEg', [10891]], ['leg', [8922]], ['leq', [8804]], ['leqq', [8806]], ['leqslant', [10877]], ['lescc', [10920]], ['les', [10877]], ['lesdot', [10879]], ['lesdoto', [10881]], ['lesdotor', [10883]], ['lesg', [8922, 65024]], ['lesges', [10899]], ['lessapprox', [10885]], ['lessdot', [8918]], ['lesseqgtr', [8922]], ['lesseqqgtr', [10891]], ['LessEqualGreater', [8922]], ['LessFullEqual', [8806]], ['LessGreater', [8822]], ['lessgtr', [8822]], ['LessLess', [10913]], ['lesssim', [8818]], ['LessSlantEqual', [10877]], ['LessTilde', [8818]], ['lfisht', [10620]], ['lfloor', [8970]], ['Lfr', [120079]], ['lfr', [120105]], ['lg', [8822]], ['lgE', [10897]], ['lHar', [10594]], ['lhard', [8637]], ['lharu', [8636]], ['lharul', [10602]], ['lhblk', [9604]], ['LJcy', [1033]], ['ljcy', [1113]], ['llarr', [8647]], ['ll', [8810]], ['Ll', [8920]], ['llcorner', [8990]], ['Lleftarrow', [8666]], ['llhard', [10603]], ['lltri', [9722]], ['Lmidot', [319]], ['lmidot', [320]], ['lmoustache', [9136]], ['lmoust', [9136]], ['lnap', [10889]], ['lnapprox', [10889]], ['lne', [10887]], ['lnE', [8808]], ['lneq', [10887]], ['lneqq', [8808]], ['lnsim', [8934]], ['loang', [10220]], ['loarr', [8701]], ['lobrk', [10214]], ['longleftarrow', [10229]], ['LongLeftArrow', [10229]], ['Longleftarrow', [10232]], ['longleftrightarrow', [10231]], ['LongLeftRightArrow', [10231]], ['Longleftrightarrow', [10234]], ['longmapsto', [10236]], ['longrightarrow', [10230]], ['LongRightArrow', [10230]], ['Longrightarrow', [10233]], ['looparrowleft', [8619]], ['looparrowright', [8620]], ['lopar', [10629]], ['Lopf', [120131]], ['lopf', [120157]], ['loplus', [10797]], ['lotimes', [10804]], ['lowast', [8727]], ['lowbar', [95]], ['LowerLeftArrow', [8601]], ['LowerRightArrow', [8600]], ['loz', [9674]], ['lozenge', [9674]], ['lozf', [10731]], ['lpar', [40]], ['lparlt', [10643]], ['lrarr', [8646]], ['lrcorner', [8991]], ['lrhar', [8651]], ['lrhard', [10605]], ['lrm', [8206]], ['lrtri', [8895]], ['lsaquo', [8249]], ['lscr', [120001]], ['Lscr', [8466]], ['lsh', [8624]], ['Lsh', [8624]], ['lsim', [8818]], ['lsime', [10893]], ['lsimg', [10895]], ['lsqb', [91]], ['lsquo', [8216]], ['lsquor', [8218]], ['Lstrok', [321]], ['lstrok', [322]], ['ltcc', [10918]], ['ltcir', [10873]], ['lt', [60]], ['LT', [60]], ['Lt', [8810]], ['ltdot', [8918]], ['lthree', [8907]], ['ltimes', [8905]], ['ltlarr', [10614]], ['ltquest', [10875]], ['ltri', [9667]], ['ltrie', [8884]], ['ltrif', [9666]], ['ltrPar', [10646]], ['lurdshar', [10570]], ['luruhar', [10598]], ['lvertneqq', [8808, 65024]], ['lvnE', [8808, 65024]], ['macr', [175]], ['male', [9794]], ['malt', [10016]], ['maltese', [10016]], ['Map', [10501]], ['map', [8614]], ['mapsto', [8614]], ['mapstodown', [8615]], ['mapstoleft', [8612]], ['mapstoup', [8613]], ['marker', [9646]], ['mcomma', [10793]], ['Mcy', [1052]], ['mcy', [1084]], ['mdash', [8212]], ['mDDot', [8762]], ['measuredangle', [8737]], ['MediumSpace', [8287]], ['Mellintrf', [8499]], ['Mfr', [120080]], ['mfr', [120106]], ['mho', [8487]], ['micro', [181]], ['midast', [42]], ['midcir', [10992]], ['mid', [8739]], ['middot', [183]], ['minusb', [8863]], ['minus', [8722]], ['minusd', [8760]], ['minusdu', [10794]], ['MinusPlus', [8723]], ['mlcp', [10971]], ['mldr', [8230]], ['mnplus', [8723]], ['models', [8871]], ['Mopf', [120132]], ['mopf', [120158]], ['mp', [8723]], ['mscr', [120002]], ['Mscr', [8499]], ['mstpos', [8766]], ['Mu', [924]], ['mu', [956]], ['multimap', [8888]], ['mumap', [8888]], ['nabla', [8711]], ['Nacute', [323]], ['nacute', [324]], ['nang', [8736, 8402]], ['nap', [8777]], ['napE', [10864, 824]], ['napid', [8779, 824]], ['napos', [329]], ['napprox', [8777]], ['natural', [9838]], ['naturals', [8469]], ['natur', [9838]], ['nbsp', [160]], ['nbump', [8782, 824]], ['nbumpe', [8783, 824]], ['ncap', [10819]], ['Ncaron', [327]], ['ncaron', [328]], ['Ncedil', [325]], ['ncedil', [326]], ['ncong', [8775]], ['ncongdot', [10861, 824]], ['ncup', [10818]], ['Ncy', [1053]], ['ncy', [1085]], ['ndash', [8211]], ['nearhk', [10532]], ['nearr', [8599]], ['neArr', [8663]], ['nearrow', [8599]], ['ne', [8800]], ['nedot', [8784, 824]], ['NegativeMediumSpace', [8203]], ['NegativeThickSpace', [8203]], ['NegativeThinSpace', [8203]], ['NegativeVeryThinSpace', [8203]], ['nequiv', [8802]], ['nesear', [10536]], ['nesim', [8770, 824]], ['NestedGreaterGreater', [8811]], ['NestedLessLess', [8810]], ['nexist', [8708]], ['nexists', [8708]], ['Nfr', [120081]], ['nfr', [120107]], ['ngE', [8807, 824]], ['nge', [8817]], ['ngeq', [8817]], ['ngeqq', [8807, 824]], ['ngeqslant', [10878, 824]], ['nges', [10878, 824]], ['nGg', [8921, 824]], ['ngsim', [8821]], ['nGt', [8811, 8402]], ['ngt', [8815]], ['ngtr', [8815]], ['nGtv', [8811, 824]], ['nharr', [8622]], ['nhArr', [8654]], ['nhpar', [10994]], ['ni', [8715]], ['nis', [8956]], ['nisd', [8954]], ['niv', [8715]], ['NJcy', [1034]], ['njcy', [1114]], ['nlarr', [8602]], ['nlArr', [8653]], ['nldr', [8229]], ['nlE', [8806, 824]], ['nle', [8816]], ['nleftarrow', [8602]], ['nLeftarrow', [8653]], ['nleftrightarrow', [8622]], ['nLeftrightarrow', [8654]], ['nleq', [8816]], ['nleqq', [8806, 824]], ['nleqslant', [10877, 824]], ['nles', [10877, 824]], ['nless', [8814]], ['nLl', [8920, 824]], ['nlsim', [8820]], ['nLt', [8810, 8402]], ['nlt', [8814]], ['nltri', [8938]], ['nltrie', [8940]], ['nLtv', [8810, 824]], ['nmid', [8740]], ['NoBreak', [8288]], ['NonBreakingSpace', [160]], ['nopf', [120159]], ['Nopf', [8469]], ['Not', [10988]], ['not', [172]], ['NotCongruent', [8802]], ['NotCupCap', [8813]], ['NotDoubleVerticalBar', [8742]], ['NotElement', [8713]], ['NotEqual', [8800]], ['NotEqualTilde', [8770, 824]], ['NotExists', [8708]], ['NotGreater', [8815]], ['NotGreaterEqual', [8817]], ['NotGreaterFullEqual', [8807, 824]], ['NotGreaterGreater', [8811, 824]], ['NotGreaterLess', [8825]], ['NotGreaterSlantEqual', [10878, 824]], ['NotGreaterTilde', [8821]], ['NotHumpDownHump', [8782, 824]], ['NotHumpEqual', [8783, 824]], ['notin', [8713]], ['notindot', [8949, 824]], ['notinE', [8953, 824]], ['notinva', [8713]], ['notinvb', [8951]], ['notinvc', [8950]], ['NotLeftTriangleBar', [10703, 824]], ['NotLeftTriangle', [8938]], ['NotLeftTriangleEqual', [8940]], ['NotLess', [8814]], ['NotLessEqual', [8816]], ['NotLessGreater', [8824]], ['NotLessLess', [8810, 824]], ['NotLessSlantEqual', [10877, 824]], ['NotLessTilde', [8820]], ['NotNestedGreaterGreater', [10914, 824]], ['NotNestedLessLess', [10913, 824]], ['notni', [8716]], ['notniva', [8716]], ['notnivb', [8958]], ['notnivc', [8957]], ['NotPrecedes', [8832]], ['NotPrecedesEqual', [10927, 824]], ['NotPrecedesSlantEqual', [8928]], ['NotReverseElement', [8716]], ['NotRightTriangleBar', [10704, 824]], ['NotRightTriangle', [8939]], ['NotRightTriangleEqual', [8941]], ['NotSquareSubset', [8847, 824]], ['NotSquareSubsetEqual', [8930]], ['NotSquareSuperset', [8848, 824]], ['NotSquareSupersetEqual', [8931]], ['NotSubset', [8834, 8402]], ['NotSubsetEqual', [8840]], ['NotSucceeds', [8833]], ['NotSucceedsEqual', [10928, 824]], ['NotSucceedsSlantEqual', [8929]], ['NotSucceedsTilde', [8831, 824]], ['NotSuperset', [8835, 8402]], ['NotSupersetEqual', [8841]], ['NotTilde', [8769]], ['NotTildeEqual', [8772]], ['NotTildeFullEqual', [8775]], ['NotTildeTilde', [8777]], ['NotVerticalBar', [8740]], ['nparallel', [8742]], ['npar', [8742]], ['nparsl', [11005, 8421]], ['npart', [8706, 824]], ['npolint', [10772]], ['npr', [8832]], ['nprcue', [8928]], ['nprec', [8832]], ['npreceq', [10927, 824]], ['npre', [10927, 824]], ['nrarrc', [10547, 824]], ['nrarr', [8603]], ['nrArr', [8655]], ['nrarrw', [8605, 824]], ['nrightarrow', [8603]], ['nRightarrow', [8655]], ['nrtri', [8939]], ['nrtrie', [8941]], ['nsc', [8833]], ['nsccue', [8929]], ['nsce', [10928, 824]], ['Nscr', [119977]], ['nscr', [120003]], ['nshortmid', [8740]], ['nshortparallel', [8742]], ['nsim', [8769]], ['nsime', [8772]], ['nsimeq', [8772]], ['nsmid', [8740]], ['nspar', [8742]], ['nsqsube', [8930]], ['nsqsupe', [8931]], ['nsub', [8836]], ['nsubE', [10949, 824]], ['nsube', [8840]], ['nsubset', [8834, 8402]], ['nsubseteq', [8840]], ['nsubseteqq', [10949, 824]], ['nsucc', [8833]], ['nsucceq', [10928, 824]], ['nsup', [8837]], ['nsupE', [10950, 824]], ['nsupe', [8841]], ['nsupset', [8835, 8402]], ['nsupseteq', [8841]], ['nsupseteqq', [10950, 824]], ['ntgl', [8825]], ['Ntilde', [209]], ['ntilde', [241]], ['ntlg', [8824]], ['ntriangleleft', [8938]], ['ntrianglelefteq', [8940]], ['ntriangleright', [8939]], ['ntrianglerighteq', [8941]], ['Nu', [925]], ['nu', [957]], ['num', [35]], ['numero', [8470]], ['numsp', [8199]], ['nvap', [8781, 8402]], ['nvdash', [8876]], ['nvDash', [8877]], ['nVdash', [8878]], ['nVDash', [8879]], ['nvge', [8805, 8402]], ['nvgt', [62, 8402]], ['nvHarr', [10500]], ['nvinfin', [10718]], ['nvlArr', [10498]], ['nvle', [8804, 8402]], ['nvlt', [60, 8402]], ['nvltrie', [8884, 8402]], ['nvrArr', [10499]], ['nvrtrie', [8885, 8402]], ['nvsim', [8764, 8402]], ['nwarhk', [10531]], ['nwarr', [8598]], ['nwArr', [8662]], ['nwarrow', [8598]], ['nwnear', [10535]], ['Oacute', [211]], ['oacute', [243]], ['oast', [8859]], ['Ocirc', [212]], ['ocirc', [244]], ['ocir', [8858]], ['Ocy', [1054]], ['ocy', [1086]], ['odash', [8861]], ['Odblac', [336]], ['odblac', [337]], ['odiv', [10808]], ['odot', [8857]], ['odsold', [10684]], ['OElig', [338]], ['oelig', [339]], ['ofcir', [10687]], ['Ofr', [120082]], ['ofr', [120108]], ['ogon', [731]], ['Ograve', [210]], ['ograve', [242]], ['ogt', [10689]], ['ohbar', [10677]], ['ohm', [937]], ['oint', [8750]], ['olarr', [8634]], ['olcir', [10686]], ['olcross', [10683]], ['oline', [8254]], ['olt', [10688]], ['Omacr', [332]], ['omacr', [333]], ['Omega', [937]], ['omega', [969]], ['Omicron', [927]], ['omicron', [959]], ['omid', [10678]], ['ominus', [8854]], ['Oopf', [120134]], ['oopf', [120160]], ['opar', [10679]], ['OpenCurlyDoubleQuote', [8220]], ['OpenCurlyQuote', [8216]], ['operp', [10681]], ['oplus', [8853]], ['orarr', [8635]], ['Or', [10836]], ['or', [8744]], ['ord', [10845]], ['order', [8500]], ['orderof', [8500]], ['ordf', [170]], ['ordm', [186]], ['origof', [8886]], ['oror', [10838]], ['orslope', [10839]], ['orv', [10843]], ['oS', [9416]], ['Oscr', [119978]], ['oscr', [8500]], ['Oslash', [216]], ['oslash', [248]], ['osol', [8856]], ['Otilde', [213]], ['otilde', [245]], ['otimesas', [10806]], ['Otimes', [10807]], ['otimes', [8855]], ['Ouml', [214]], ['ouml', [246]], ['ovbar', [9021]], ['OverBar', [8254]], ['OverBrace', [9182]], ['OverBracket', [9140]], ['OverParenthesis', [9180]], ['para', [182]], ['parallel', [8741]], ['par', [8741]], ['parsim', [10995]], ['parsl', [11005]], ['part', [8706]], ['PartialD', [8706]], ['Pcy', [1055]], ['pcy', [1087]], ['percnt', [37]], ['period', [46]], ['permil', [8240]], ['perp', [8869]], ['pertenk', [8241]], ['Pfr', [120083]], ['pfr', [120109]], ['Phi', [934]], ['phi', [966]], ['phiv', [981]], ['phmmat', [8499]], ['phone', [9742]], ['Pi', [928]], ['pi', [960]], ['pitchfork', [8916]], ['piv', [982]], ['planck', [8463]], ['planckh', [8462]], ['plankv', [8463]], ['plusacir', [10787]], ['plusb', [8862]], ['pluscir', [10786]], ['plus', [43]], ['plusdo', [8724]], ['plusdu', [10789]], ['pluse', [10866]], ['PlusMinus', [177]], ['plusmn', [177]], ['plussim', [10790]], ['plustwo', [10791]], ['pm', [177]], ['Poincareplane', [8460]], ['pointint', [10773]], ['popf', [120161]], ['Popf', [8473]], ['pound', [163]], ['prap', [10935]], ['Pr', [10939]], ['pr', [8826]], ['prcue', [8828]], ['precapprox', [10935]], ['prec', [8826]], ['preccurlyeq', [8828]], ['Precedes', [8826]], ['PrecedesEqual', [10927]], ['PrecedesSlantEqual', [8828]], ['PrecedesTilde', [8830]], ['preceq', [10927]], ['precnapprox', [10937]], ['precneqq', [10933]], ['precnsim', [8936]], ['pre', [10927]], ['prE', [10931]], ['precsim', [8830]], ['prime', [8242]], ['Prime', [8243]], ['primes', [8473]], ['prnap', [10937]], ['prnE', [10933]], ['prnsim', [8936]], ['prod', [8719]], ['Product', [8719]], ['profalar', [9006]], ['profline', [8978]], ['profsurf', [8979]], ['prop', [8733]], ['Proportional', [8733]], ['Proportion', [8759]], ['propto', [8733]], ['prsim', [8830]], ['prurel', [8880]], ['Pscr', [119979]], ['pscr', [120005]], ['Psi', [936]], ['psi', [968]], ['puncsp', [8200]], ['Qfr', [120084]], ['qfr', [120110]], ['qint', [10764]], ['qopf', [120162]], ['Qopf', [8474]], ['qprime', [8279]], ['Qscr', [119980]], ['qscr', [120006]], ['quaternions', [8461]], ['quatint', [10774]], ['quest', [63]], ['questeq', [8799]], ['quot', [34]], ['QUOT', [34]], ['rAarr', [8667]], ['race', [8765, 817]], ['Racute', [340]], ['racute', [341]], ['radic', [8730]], ['raemptyv', [10675]], ['rang', [10217]], ['Rang', [10219]], ['rangd', [10642]], ['range', [10661]], ['rangle', [10217]], ['raquo', [187]], ['rarrap', [10613]], ['rarrb', [8677]], ['rarrbfs', [10528]], ['rarrc', [10547]], ['rarr', [8594]], ['Rarr', [8608]], ['rArr', [8658]], ['rarrfs', [10526]], ['rarrhk', [8618]], ['rarrlp', [8620]], ['rarrpl', [10565]], ['rarrsim', [10612]], ['Rarrtl', [10518]], ['rarrtl', [8611]], ['rarrw', [8605]], ['ratail', [10522]], ['rAtail', [10524]], ['ratio', [8758]], ['rationals', [8474]], ['rbarr', [10509]], ['rBarr', [10511]], ['RBarr', [10512]], ['rbbrk', [10099]], ['rbrace', [125]], ['rbrack', [93]], ['rbrke', [10636]], ['rbrksld', [10638]], ['rbrkslu', [10640]], ['Rcaron', [344]], ['rcaron', [345]], ['Rcedil', [342]], ['rcedil', [343]], ['rceil', [8969]], ['rcub', [125]], ['Rcy', [1056]], ['rcy', [1088]], ['rdca', [10551]], ['rdldhar', [10601]], ['rdquo', [8221]], ['rdquor', [8221]], ['CloseCurlyDoubleQuote', [8221]], ['rdsh', [8627]], ['real', [8476]], ['realine', [8475]], ['realpart', [8476]], ['reals', [8477]], ['Re', [8476]], ['rect', [9645]], ['reg', [174]], ['REG', [174]], ['ReverseElement', [8715]], ['ReverseEquilibrium', [8651]], ['ReverseUpEquilibrium', [10607]], ['rfisht', [10621]], ['rfloor', [8971]], ['rfr', [120111]], ['Rfr', [8476]], ['rHar', [10596]], ['rhard', [8641]], ['rharu', [8640]], ['rharul', [10604]], ['Rho', [929]], ['rho', [961]], ['rhov', [1009]], ['RightAngleBracket', [10217]], ['RightArrowBar', [8677]], ['rightarrow', [8594]], ['RightArrow', [8594]], ['Rightarrow', [8658]], ['RightArrowLeftArrow', [8644]], ['rightarrowtail', [8611]], ['RightCeiling', [8969]], ['RightDoubleBracket', [10215]], ['RightDownTeeVector', [10589]], ['RightDownVectorBar', [10581]], ['RightDownVector', [8642]], ['RightFloor', [8971]], ['rightharpoondown', [8641]], ['rightharpoonup', [8640]], ['rightleftarrows', [8644]], ['rightleftharpoons', [8652]], ['rightrightarrows', [8649]], ['rightsquigarrow', [8605]], ['RightTeeArrow', [8614]], ['RightTee', [8866]], ['RightTeeVector', [10587]], ['rightthreetimes', [8908]], ['RightTriangleBar', [10704]], ['RightTriangle', [8883]], ['RightTriangleEqual', [8885]], ['RightUpDownVector', [10575]], ['RightUpTeeVector', [10588]], ['RightUpVectorBar', [10580]], ['RightUpVector', [8638]], ['RightVectorBar', [10579]], ['RightVector', [8640]], ['ring', [730]], ['risingdotseq', [8787]], ['rlarr', [8644]], ['rlhar', [8652]], ['rlm', [8207]], ['rmoustache', [9137]], ['rmoust', [9137]], ['rnmid', [10990]], ['roang', [10221]], ['roarr', [8702]], ['robrk', [10215]], ['ropar', [10630]], ['ropf', [120163]], ['Ropf', [8477]], ['roplus', [10798]], ['rotimes', [10805]], ['RoundImplies', [10608]], ['rpar', [41]], ['rpargt', [10644]], ['rppolint', [10770]], ['rrarr', [8649]], ['Rrightarrow', [8667]], ['rsaquo', [8250]], ['rscr', [120007]], ['Rscr', [8475]], ['rsh', [8625]], ['Rsh', [8625]], ['rsqb', [93]], ['rsquo', [8217]], ['rsquor', [8217]], ['CloseCurlyQuote', [8217]], ['rthree', [8908]], ['rtimes', [8906]], ['rtri', [9657]], ['rtrie', [8885]], ['rtrif', [9656]], ['rtriltri', [10702]], ['RuleDelayed', [10740]], ['ruluhar', [10600]], ['rx', [8478]], ['Sacute', [346]], ['sacute', [347]], ['sbquo', [8218]], ['scap', [10936]], ['Scaron', [352]], ['scaron', [353]], ['Sc', [10940]], ['sc', [8827]], ['sccue', [8829]], ['sce', [10928]], ['scE', [10932]], ['Scedil', [350]], ['scedil', [351]], ['Scirc', [348]], ['scirc', [349]], ['scnap', [10938]], ['scnE', [10934]], ['scnsim', [8937]], ['scpolint', [10771]], ['scsim', [8831]], ['Scy', [1057]], ['scy', [1089]], ['sdotb', [8865]], ['sdot', [8901]], ['sdote', [10854]], ['searhk', [10533]], ['searr', [8600]], ['seArr', [8664]], ['searrow', [8600]], ['sect', [167]], ['semi', [59]], ['seswar', [10537]], ['setminus', [8726]], ['setmn', [8726]], ['sext', [10038]], ['Sfr', [120086]], ['sfr', [120112]], ['sfrown', [8994]], ['sharp', [9839]], ['SHCHcy', [1065]], ['shchcy', [1097]], ['SHcy', [1064]], ['shcy', [1096]], ['ShortDownArrow', [8595]], ['ShortLeftArrow', [8592]], ['shortmid', [8739]], ['shortparallel', [8741]], ['ShortRightArrow', [8594]], ['ShortUpArrow', [8593]], ['shy', [173]], ['Sigma', [931]], ['sigma', [963]], ['sigmaf', [962]], ['sigmav', [962]], ['sim', [8764]], ['simdot', [10858]], ['sime', [8771]], ['simeq', [8771]], ['simg', [10910]], ['simgE', [10912]], ['siml', [10909]], ['simlE', [10911]], ['simne', [8774]], ['simplus', [10788]], ['simrarr', [10610]], ['slarr', [8592]], ['SmallCircle', [8728]], ['smallsetminus', [8726]], ['smashp', [10803]], ['smeparsl', [10724]], ['smid', [8739]], ['smile', [8995]], ['smt', [10922]], ['smte', [10924]], ['smtes', [10924, 65024]], ['SOFTcy', [1068]], ['softcy', [1100]], ['solbar', [9023]], ['solb', [10692]], ['sol', [47]], ['Sopf', [120138]], ['sopf', [120164]], ['spades', [9824]], ['spadesuit', [9824]], ['spar', [8741]], ['sqcap', [8851]], ['sqcaps', [8851, 65024]], ['sqcup', [8852]], ['sqcups', [8852, 65024]], ['Sqrt', [8730]], ['sqsub', [8847]], ['sqsube', [8849]], ['sqsubset', [8847]], ['sqsubseteq', [8849]], ['sqsup', [8848]], ['sqsupe', [8850]], ['sqsupset', [8848]], ['sqsupseteq', [8850]], ['square', [9633]], ['Square', [9633]], ['SquareIntersection', [8851]], ['SquareSubset', [8847]], ['SquareSubsetEqual', [8849]], ['SquareSuperset', [8848]], ['SquareSupersetEqual', [8850]], ['SquareUnion', [8852]], ['squarf', [9642]], ['squ', [9633]], ['squf', [9642]], ['srarr', [8594]], ['Sscr', [119982]], ['sscr', [120008]], ['ssetmn', [8726]], ['ssmile', [8995]], ['sstarf', [8902]], ['Star', [8902]], ['star', [9734]], ['starf', [9733]], ['straightepsilon', [1013]], ['straightphi', [981]], ['strns', [175]], ['sub', [8834]], ['Sub', [8912]], ['subdot', [10941]], ['subE', [10949]], ['sube', [8838]], ['subedot', [10947]], ['submult', [10945]], ['subnE', [10955]], ['subne', [8842]], ['subplus', [10943]], ['subrarr', [10617]], ['subset', [8834]], ['Subset', [8912]], ['subseteq', [8838]], ['subseteqq', [10949]], ['SubsetEqual', [8838]], ['subsetneq', [8842]], ['subsetneqq', [10955]], ['subsim', [10951]], ['subsub', [10965]], ['subsup', [10963]], ['succapprox', [10936]], ['succ', [8827]], ['succcurlyeq', [8829]], ['Succeeds', [8827]], ['SucceedsEqual', [10928]], ['SucceedsSlantEqual', [8829]], ['SucceedsTilde', [8831]], ['succeq', [10928]], ['succnapprox', [10938]], ['succneqq', [10934]], ['succnsim', [8937]], ['succsim', [8831]], ['SuchThat', [8715]], ['sum', [8721]], ['Sum', [8721]], ['sung', [9834]], ['sup1', [185]], ['sup2', [178]], ['sup3', [179]], ['sup', [8835]], ['Sup', [8913]], ['supdot', [10942]], ['supdsub', [10968]], ['supE', [10950]], ['supe', [8839]], ['supedot', [10948]], ['Superset', [8835]], ['SupersetEqual', [8839]], ['suphsol', [10185]], ['suphsub', [10967]], ['suplarr', [10619]], ['supmult', [10946]], ['supnE', [10956]], ['supne', [8843]], ['supplus', [10944]], ['supset', [8835]], ['Supset', [8913]], ['supseteq', [8839]], ['supseteqq', [10950]], ['supsetneq', [8843]], ['supsetneqq', [10956]], ['supsim', [10952]], ['supsub', [10964]], ['supsup', [10966]], ['swarhk', [10534]], ['swarr', [8601]], ['swArr', [8665]], ['swarrow', [8601]], ['swnwar', [10538]], ['szlig', [223]], ['Tab', [9]], ['target', [8982]], ['Tau', [932]], ['tau', [964]], ['tbrk', [9140]], ['Tcaron', [356]], ['tcaron', [357]], ['Tcedil', [354]], ['tcedil', [355]], ['Tcy', [1058]], ['tcy', [1090]], ['tdot', [8411]], ['telrec', [8981]], ['Tfr', [120087]], ['tfr', [120113]], ['there4', [8756]], ['therefore', [8756]], ['Therefore', [8756]], ['Theta', [920]], ['theta', [952]], ['thetasym', [977]], ['thetav', [977]], ['thickapprox', [8776]], ['thicksim', [8764]], ['ThickSpace', [8287, 8202]], ['ThinSpace', [8201]], ['thinsp', [8201]], ['thkap', [8776]], ['thksim', [8764]], ['THORN', [222]], ['thorn', [254]], ['tilde', [732]], ['Tilde', [8764]], ['TildeEqual', [8771]], ['TildeFullEqual', [8773]], ['TildeTilde', [8776]], ['timesbar', [10801]], ['timesb', [8864]], ['times', [215]], ['timesd', [10800]], ['tint', [8749]], ['toea', [10536]], ['topbot', [9014]], ['topcir', [10993]], ['top', [8868]], ['Topf', [120139]], ['topf', [120165]], ['topfork', [10970]], ['tosa', [10537]], ['tprime', [8244]], ['trade', [8482]], ['TRADE', [8482]], ['triangle', [9653]], ['triangledown', [9663]], ['triangleleft', [9667]], ['trianglelefteq', [8884]], ['triangleq', [8796]], ['triangleright', [9657]], ['trianglerighteq', [8885]], ['tridot', [9708]], ['trie', [8796]], ['triminus', [10810]], ['TripleDot', [8411]], ['triplus', [10809]], ['trisb', [10701]], ['tritime', [10811]], ['trpezium', [9186]], ['Tscr', [119983]], ['tscr', [120009]], ['TScy', [1062]], ['tscy', [1094]], ['TSHcy', [1035]], ['tshcy', [1115]], ['Tstrok', [358]], ['tstrok', [359]], ['twixt', [8812]], ['twoheadleftarrow', [8606]], ['twoheadrightarrow', [8608]], ['Uacute', [218]], ['uacute', [250]], ['uarr', [8593]], ['Uarr', [8607]], ['uArr', [8657]], ['Uarrocir', [10569]], ['Ubrcy', [1038]], ['ubrcy', [1118]], ['Ubreve', [364]], ['ubreve', [365]], ['Ucirc', [219]], ['ucirc', [251]], ['Ucy', [1059]], ['ucy', [1091]], ['udarr', [8645]], ['Udblac', [368]], ['udblac', [369]], ['udhar', [10606]], ['ufisht', [10622]], ['Ufr', [120088]], ['ufr', [120114]], ['Ugrave', [217]], ['ugrave', [249]], ['uHar', [10595]], ['uharl', [8639]], ['uharr', [8638]], ['uhblk', [9600]], ['ulcorn', [8988]], ['ulcorner', [8988]], ['ulcrop', [8975]], ['ultri', [9720]], ['Umacr', [362]], ['umacr', [363]], ['uml', [168]], ['UnderBar', [95]], ['UnderBrace', [9183]], ['UnderBracket', [9141]], ['UnderParenthesis', [9181]], ['Union', [8899]], ['UnionPlus', [8846]], ['Uogon', [370]], ['uogon', [371]], ['Uopf', [120140]], ['uopf', [120166]], ['UpArrowBar', [10514]], ['uparrow', [8593]], ['UpArrow', [8593]], ['Uparrow', [8657]], ['UpArrowDownArrow', [8645]], ['updownarrow', [8597]], ['UpDownArrow', [8597]], ['Updownarrow', [8661]], ['UpEquilibrium', [10606]], ['upharpoonleft', [8639]], ['upharpoonright', [8638]], ['uplus', [8846]], ['UpperLeftArrow', [8598]], ['UpperRightArrow', [8599]], ['upsi', [965]], ['Upsi', [978]], ['upsih', [978]], ['Upsilon', [933]], ['upsilon', [965]], ['UpTeeArrow', [8613]], ['UpTee', [8869]], ['upuparrows', [8648]], ['urcorn', [8989]], ['urcorner', [8989]], ['urcrop', [8974]], ['Uring', [366]], ['uring', [367]], ['urtri', [9721]], ['Uscr', [119984]], ['uscr', [120010]], ['utdot', [8944]], ['Utilde', [360]], ['utilde', [361]], ['utri', [9653]], ['utrif', [9652]], ['uuarr', [8648]], ['Uuml', [220]], ['uuml', [252]], ['uwangle', [10663]], ['vangrt', [10652]], ['varepsilon', [1013]], ['varkappa', [1008]], ['varnothing', [8709]], ['varphi', [981]], ['varpi', [982]], ['varpropto', [8733]], ['varr', [8597]], ['vArr', [8661]], ['varrho', [1009]], ['varsigma', [962]], ['varsubsetneq', [8842, 65024]], ['varsubsetneqq', [10955, 65024]], ['varsupsetneq', [8843, 65024]], ['varsupsetneqq', [10956, 65024]], ['vartheta', [977]], ['vartriangleleft', [8882]], ['vartriangleright', [8883]], ['vBar', [10984]], ['Vbar', [10987]], ['vBarv', [10985]], ['Vcy', [1042]], ['vcy', [1074]], ['vdash', [8866]], ['vDash', [8872]], ['Vdash', [8873]], ['VDash', [8875]], ['Vdashl', [10982]], ['veebar', [8891]], ['vee', [8744]], ['Vee', [8897]], ['veeeq', [8794]], ['vellip', [8942]], ['verbar', [124]], ['Verbar', [8214]], ['vert', [124]], ['Vert', [8214]], ['VerticalBar', [8739]], ['VerticalLine', [124]], ['VerticalSeparator', [10072]], ['VerticalTilde', [8768]], ['VeryThinSpace', [8202]], ['Vfr', [120089]], ['vfr', [120115]], ['vltri', [8882]], ['vnsub', [8834, 8402]], ['vnsup', [8835, 8402]], ['Vopf', [120141]], ['vopf', [120167]], ['vprop', [8733]], ['vrtri', [8883]], ['Vscr', [119985]], ['vscr', [120011]], ['vsubnE', [10955, 65024]], ['vsubne', [8842, 65024]], ['vsupnE', [10956, 65024]], ['vsupne', [8843, 65024]], ['Vvdash', [8874]], ['vzigzag', [10650]], ['Wcirc', [372]], ['wcirc', [373]], ['wedbar', [10847]], ['wedge', [8743]], ['Wedge', [8896]], ['wedgeq', [8793]], ['weierp', [8472]], ['Wfr', [120090]], ['wfr', [120116]], ['Wopf', [120142]], ['wopf', [120168]], ['wp', [8472]], ['wr', [8768]], ['wreath', [8768]], ['Wscr', [119986]], ['wscr', [120012]], ['xcap', [8898]], ['xcirc', [9711]], ['xcup', [8899]], ['xdtri', [9661]], ['Xfr', [120091]], ['xfr', [120117]], ['xharr', [10231]], ['xhArr', [10234]], ['Xi', [926]], ['xi', [958]], ['xlarr', [10229]], ['xlArr', [10232]], ['xmap', [10236]], ['xnis', [8955]], ['xodot', [10752]], ['Xopf', [120143]], ['xopf', [120169]], ['xoplus', [10753]], ['xotime', [10754]], ['xrarr', [10230]], ['xrArr', [10233]], ['Xscr', [119987]], ['xscr', [120013]], ['xsqcup', [10758]], ['xuplus', [10756]], ['xutri', [9651]], ['xvee', [8897]], ['xwedge', [8896]], ['Yacute', [221]], ['yacute', [253]], ['YAcy', [1071]], ['yacy', [1103]], ['Ycirc', [374]], ['ycirc', [375]], ['Ycy', [1067]], ['ycy', [1099]], ['yen', [165]], ['Yfr', [120092]], ['yfr', [120118]], ['YIcy', [1031]], ['yicy', [1111]], ['Yopf', [120144]], ['yopf', [120170]], ['Yscr', [119988]], ['yscr', [120014]], ['YUcy', [1070]], ['yucy', [1102]], ['yuml', [255]], ['Yuml', [376]], ['Zacute', [377]], ['zacute', [378]], ['Zcaron', [381]], ['zcaron', [382]], ['Zcy', [1047]], ['zcy', [1079]], ['Zdot', [379]], ['zdot', [380]], ['zeetrf', [8488]], ['ZeroWidthSpace', [8203]], ['Zeta', [918]], ['zeta', [950]], ['zfr', [120119]], ['Zfr', [8488]], ['ZHcy', [1046]], ['zhcy', [1078]], ['zigrarr', [8669]], ['zopf', [120171]], ['Zopf', [8484]], ['Zscr', [119989]], ['zscr', [120015]], ['zwj', [8205]], ['zwnj', [8204]]];

var alphaIndex = {};
var charIndex = {};

createIndexes(alphaIndex, charIndex);

/**
 * @constructor
 */
function Html5Entities() {}

/**
 * @param {String} str
 * @returns {String}
 */
Html5Entities.prototype.decode = function(str) {
    if (!str || !str.length) {
        return '';
    }
    return str.replace(/&(#?[\w\d]+);?/g, function(s, entity) {
        var chr;
        if (entity.charAt(0) === "#") {
            var code = entity.charAt(1) === 'x' ?
                parseInt(entity.substr(2).toLowerCase(), 16) :
                parseInt(entity.substr(1));

            if (!(isNaN(code) || code < -32768 || code > 65535)) {
                chr = String.fromCharCode(code);
            }
        } else {
            chr = alphaIndex[entity];
        }
        return chr || s;
    });
};

/**
 * @param {String} str
 * @returns {String}
 */
 Html5Entities.decode = function(str) {
    return new Html5Entities().decode(str);
 };

/**
 * @param {String} str
 * @returns {String}
 */
Html5Entities.prototype.encode = function(str) {
    if (!str || !str.length) {
        return '';
    }
    var strLength = str.length;
    var result = '';
    var i = 0;
    while (i < strLength) {
        var charInfo = charIndex[str.charCodeAt(i)];
        if (charInfo) {
            var alpha = charInfo[str.charCodeAt(i + 1)];
            if (alpha) {
                i++;
            } else {
                alpha = charInfo[''];
            }
            if (alpha) {
                result += "&" + alpha + ";";
                i++;
                continue;
            }
        }
        result += str.charAt(i);
        i++;
    }
    return result;
};

/**
 * @param {String} str
 * @returns {String}
 */
 Html5Entities.encode = function(str) {
    return new Html5Entities().encode(str);
 };

/**
 * @param {String} str
 * @returns {String}
 */
Html5Entities.prototype.encodeNonUTF = function(str) {
    if (!str || !str.length) {
        return '';
    }
    var strLength = str.length;
    var result = '';
    var i = 0;
    while (i < strLength) {
        var c = str.charCodeAt(i);
        var charInfo = charIndex[c];
        if (charInfo) {
            var alpha = charInfo[str.charCodeAt(i + 1)];
            if (alpha) {
                i++;
            } else {
                alpha = charInfo[''];
            }
            if (alpha) {
                result += "&" + alpha + ";";
                i++;
                continue;
            }
        }
        if (c < 32 || c > 126) {
            result += '&#' + c + ';';
        } else {
            result += str.charAt(i);
        }
        i++;
    }
    return result;
};

/**
 * @param {String} str
 * @returns {String}
 */
 Html5Entities.encodeNonUTF = function(str) {
    return new Html5Entities().encodeNonUTF(str);
 };

/**
 * @param {String} str
 * @returns {String}
 */
Html5Entities.prototype.encodeNonASCII = function(str) {
    if (!str || !str.length) {
        return '';
    }
    var strLength = str.length;
    var result = '';
    var i = 0;
    while (i < strLength) {
        var c = str.charCodeAt(i);
        if (c <= 255) {
            result += str[i++];
            continue;
        }
        result += '&#' + c + ';';
        i++
    }
    return result;
};

/**
 * @param {String} str
 * @returns {String}
 */
 Html5Entities.encodeNonASCII = function(str) {
    return new Html5Entities().encodeNonASCII(str);
 };

/**
 * @param {Object} alphaIndex Passed by reference.
 * @param {Object} charIndex Passed by reference.
 */
function createIndexes(alphaIndex, charIndex) {
    var i = ENTITIES.length;
    var _results = [];
    while (i--) {
        var e = ENTITIES[i];
        var alpha = e[0];
        var chars = e[1];
        var chr = chars[0];
        var addChar = (chr < 32 || chr > 126) || chr === 62 || chr === 60 || chr === 38 || chr === 34 || chr === 39;
        var charInfo;
        if (addChar) {
            charInfo = charIndex[chr] = charIndex[chr] || {};
        }
        if (chars[1]) {
            var chr2 = chars[1];
            alphaIndex[alpha] = String.fromCharCode(chr) + String.fromCharCode(chr2);
            _results.push(addChar && (charInfo[chr2] = alpha));
        } else {
            alphaIndex[alpha] = String.fromCharCode(chr);
            _results.push(addChar && (charInfo[''] = alpha));
        }
    }
}

module.exports = Html5Entities;


/***/ }),

/***/ "./node_modules/html-entities/lib/xml-entities.js":
/*!********************************************************!*\
  !*** ./node_modules/html-entities/lib/xml-entities.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var ALPHA_INDEX = {
    '&lt': '<',
    '&gt': '>',
    '&quot': '"',
    '&apos': '\'',
    '&amp': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&apos;': '\'',
    '&amp;': '&'
};

var CHAR_INDEX = {
    60: 'lt',
    62: 'gt',
    34: 'quot',
    39: 'apos',
    38: 'amp'
};

var CHAR_S_INDEX = {
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&apos;',
    '&': '&amp;'
};

/**
 * @constructor
 */
function XmlEntities() {}

/**
 * @param {String} str
 * @returns {String}
 */
XmlEntities.prototype.encode = function(str) {
    if (!str || !str.length) {
        return '';
    }
    return str.replace(/<|>|"|'|&/g, function(s) {
        return CHAR_S_INDEX[s];
    });
};

/**
 * @param {String} str
 * @returns {String}
 */
 XmlEntities.encode = function(str) {
    return new XmlEntities().encode(str);
 };

/**
 * @param {String} str
 * @returns {String}
 */
XmlEntities.prototype.decode = function(str) {
    if (!str || !str.length) {
        return '';
    }
    return str.replace(/&#?[0-9a-zA-Z]+;?/g, function(s) {
        if (s.charAt(1) === '#') {
            var code = s.charAt(2).toLowerCase() === 'x' ?
                parseInt(s.substr(3), 16) :
                parseInt(s.substr(2));

            if (isNaN(code) || code < -32768 || code > 65535) {
                return '';
            }
            return String.fromCharCode(code);
        }
        return ALPHA_INDEX[s] || s;
    });
};

/**
 * @param {String} str
 * @returns {String}
 */
 XmlEntities.decode = function(str) {
    return new XmlEntities().decode(str);
 };

/**
 * @param {String} str
 * @returns {String}
 */
XmlEntities.prototype.encodeNonUTF = function(str) {
    if (!str || !str.length) {
        return '';
    }
    var strLength = str.length;
    var result = '';
    var i = 0;
    while (i < strLength) {
        var c = str.charCodeAt(i);
        var alpha = CHAR_INDEX[c];
        if (alpha) {
            result += "&" + alpha + ";";
            i++;
            continue;
        }
        if (c < 32 || c > 126) {
            result += '&#' + c + ';';
        } else {
            result += str.charAt(i);
        }
        i++;
    }
    return result;
};

/**
 * @param {String} str
 * @returns {String}
 */
 XmlEntities.encodeNonUTF = function(str) {
    return new XmlEntities().encodeNonUTF(str);
 };

/**
 * @param {String} str
 * @returns {String}
 */
XmlEntities.prototype.encodeNonASCII = function(str) {
    if (!str || !str.length) {
        return '';
    }
    var strLenght = str.length;
    var result = '';
    var i = 0;
    while (i < strLenght) {
        var c = str.charCodeAt(i);
        if (c <= 255) {
            result += str[i++];
            continue;
        }
        result += '&#' + c + ';';
        i++;
    }
    return result;
};

/**
 * @param {String} str
 * @returns {String}
 */
 XmlEntities.encodeNonASCII = function(str) {
    return new XmlEntities().encodeNonASCII(str);
 };

module.exports = XmlEntities;


/***/ }),

/***/ "./node_modules/loglevel/lib/loglevel.js":
/*!***********************************************!*\
  !*** ./node_modules/loglevel/lib/loglevel.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
* loglevel - https://github.com/pimterry/loglevel
*
* Copyright (c) 2013 Tim Perry
* Licensed under the MIT license.
*/
(function (root, definition) {
    "use strict";
    if (true) {
        !(__WEBPACK_AMD_DEFINE_FACTORY__ = (definition),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
}(this, function () {
    "use strict";

    // Slightly dubious tricks to cut down minimized file size
    var noop = function() {};
    var undefinedType = "undefined";

    var logMethods = [
        "trace",
        "debug",
        "info",
        "warn",
        "error"
    ];

    // Cross-browser bind equivalent that works at least back to IE6
    function bindMethod(obj, methodName) {
        var method = obj[methodName];
        if (typeof method.bind === 'function') {
            return method.bind(obj);
        } else {
            try {
                return Function.prototype.bind.call(method, obj);
            } catch (e) {
                // Missing bind shim or IE8 + Modernizr, fallback to wrapping
                return function() {
                    return Function.prototype.apply.apply(method, [obj, arguments]);
                };
            }
        }
    }

    // Build the best logging method possible for this env
    // Wherever possible we want to bind, not wrap, to preserve stack traces
    function realMethod(methodName) {
        if (methodName === 'debug') {
            methodName = 'log';
        }

        if (typeof console === undefinedType) {
            return false; // No method possible, for now - fixed later by enableLoggingWhenConsoleArrives
        } else if (console[methodName] !== undefined) {
            return bindMethod(console, methodName);
        } else if (console.log !== undefined) {
            return bindMethod(console, 'log');
        } else {
            return noop;
        }
    }

    // These private functions always need `this` to be set properly

    function replaceLoggingMethods(level, loggerName) {
        /*jshint validthis:true */
        for (var i = 0; i < logMethods.length; i++) {
            var methodName = logMethods[i];
            this[methodName] = (i < level) ?
                noop :
                this.methodFactory(methodName, level, loggerName);
        }

        // Define log.log as an alias for log.debug
        this.log = this.debug;
    }

    // In old IE versions, the console isn't present until you first open it.
    // We build realMethod() replacements here that regenerate logging methods
    function enableLoggingWhenConsoleArrives(methodName, level, loggerName) {
        return function () {
            if (typeof console !== undefinedType) {
                replaceLoggingMethods.call(this, level, loggerName);
                this[methodName].apply(this, arguments);
            }
        };
    }

    // By default, we use closely bound real methods wherever possible, and
    // otherwise we wait for a console to appear, and then try again.
    function defaultMethodFactory(methodName, level, loggerName) {
        /*jshint validthis:true */
        return realMethod(methodName) ||
               enableLoggingWhenConsoleArrives.apply(this, arguments);
    }

    function Logger(name, defaultLevel, factory) {
      var self = this;
      var currentLevel;
      var storageKey = "loglevel";
      if (name) {
        storageKey += ":" + name;
      }

      function persistLevelIfPossible(levelNum) {
          var levelName = (logMethods[levelNum] || 'silent').toUpperCase();

          if (typeof window === undefinedType) return;

          // Use localStorage if available
          try {
              window.localStorage[storageKey] = levelName;
              return;
          } catch (ignore) {}

          // Use session cookie as fallback
          try {
              window.document.cookie =
                encodeURIComponent(storageKey) + "=" + levelName + ";";
          } catch (ignore) {}
      }

      function getPersistedLevel() {
          var storedLevel;

          if (typeof window === undefinedType) return;

          try {
              storedLevel = window.localStorage[storageKey];
          } catch (ignore) {}

          // Fallback to cookies if local storage gives us nothing
          if (typeof storedLevel === undefinedType) {
              try {
                  var cookie = window.document.cookie;
                  var location = cookie.indexOf(
                      encodeURIComponent(storageKey) + "=");
                  if (location !== -1) {
                      storedLevel = /^([^;]+)/.exec(cookie.slice(location))[1];
                  }
              } catch (ignore) {}
          }

          // If the stored level is not valid, treat it as if nothing was stored.
          if (self.levels[storedLevel] === undefined) {
              storedLevel = undefined;
          }

          return storedLevel;
      }

      /*
       *
       * Public logger API - see https://github.com/pimterry/loglevel for details
       *
       */

      self.name = name;

      self.levels = { "TRACE": 0, "DEBUG": 1, "INFO": 2, "WARN": 3,
          "ERROR": 4, "SILENT": 5};

      self.methodFactory = factory || defaultMethodFactory;

      self.getLevel = function () {
          return currentLevel;
      };

      self.setLevel = function (level, persist) {
          if (typeof level === "string" && self.levels[level.toUpperCase()] !== undefined) {
              level = self.levels[level.toUpperCase()];
          }
          if (typeof level === "number" && level >= 0 && level <= self.levels.SILENT) {
              currentLevel = level;
              if (persist !== false) {  // defaults to true
                  persistLevelIfPossible(level);
              }
              replaceLoggingMethods.call(self, level, name);
              if (typeof console === undefinedType && level < self.levels.SILENT) {
                  return "No console available for logging";
              }
          } else {
              throw "log.setLevel() called with invalid level: " + level;
          }
      };

      self.setDefaultLevel = function (level) {
          if (!getPersistedLevel()) {
              self.setLevel(level, false);
          }
      };

      self.enableAll = function(persist) {
          self.setLevel(self.levels.TRACE, persist);
      };

      self.disableAll = function(persist) {
          self.setLevel(self.levels.SILENT, persist);
      };

      // Initialize with the right level
      var initialLevel = getPersistedLevel();
      if (initialLevel == null) {
          initialLevel = defaultLevel == null ? "WARN" : defaultLevel;
      }
      self.setLevel(initialLevel, false);
    }

    /*
     *
     * Top-level API
     *
     */

    var defaultLogger = new Logger();

    var _loggersByName = {};
    defaultLogger.getLogger = function getLogger(name) {
        if (typeof name !== "string" || name === "") {
          throw new TypeError("You must supply a name when creating a logger.");
        }

        var logger = _loggersByName[name];
        if (!logger) {
          logger = _loggersByName[name] = new Logger(
            name, defaultLogger.getLevel(), defaultLogger.methodFactory);
        }
        return logger;
    };

    // Grab the current global log variable in case of overwrite
    var _log = (typeof window !== undefinedType) ? window.log : undefined;
    defaultLogger.noConflict = function() {
        if (typeof window !== undefinedType &&
               window.log === defaultLogger) {
            window.log = _log;
        }

        return defaultLogger;
    };

    defaultLogger.getLoggers = function getLoggers() {
        return _loggersByName;
    };

    return defaultLogger;
}));


/***/ }),

/***/ "./node_modules/node-libs-browser/node_modules/punycode/punycode.js":
/*!**************************************************************************!*\
  !*** ./node_modules/node-libs-browser/node_modules/punycode/punycode.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/punycode v1.4.1 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports =  true && exports &&
		!exports.nodeType && exports;
	var freeModule =  true && module &&
		!module.nodeType && module;
	var freeGlobal = typeof global == 'object' && global;
	if (
		freeGlobal.global === freeGlobal ||
		freeGlobal.window === freeGlobal ||
		freeGlobal.self === freeGlobal
	) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw new RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		var result = [];
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		var parts = string.split('@');
		var result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		var labels = string.split('.');
		var encoded = map(labels, fn).join('.');
		return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(input) {
		return mapDomain(input, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	function toASCII(input) {
		return mapDomain(input, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.4.1',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		true
	) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
			return punycode;
		}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}

}(this));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module), __webpack_require__(/*! ./../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/pixi-spine/bin/pixi-spine.js":
/*!***************************************************!*\
  !*** ./node_modules/pixi-spine/bin/pixi-spine.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var Animation = (function () {
            function Animation(name, timelines, duration) {
                if (name == null)
                    throw new Error("name cannot be null.");
                if (timelines == null)
                    throw new Error("timelines cannot be null.");
                this.name = name;
                this.timelines = timelines;
                this.duration = duration;
            }
            Animation.prototype.apply = function (skeleton, lastTime, time, loop, events, alpha, pose, direction) {
                if (skeleton == null)
                    throw new Error("skeleton cannot be null.");
                if (loop && this.duration != 0) {
                    time %= this.duration;
                    if (lastTime > 0)
                        lastTime %= this.duration;
                }
                var timelines = this.timelines;
                for (var i = 0, n = timelines.length; i < n; i++)
                    timelines[i].apply(skeleton, lastTime, time, events, alpha, pose, direction);
            };
            Animation.binarySearch = function (values, target, step) {
                if (step === void 0) { step = 1; }
                var low = 0;
                var high = values.length / step - 2;
                if (high == 0)
                    return step;
                var current = high >>> 1;
                while (true) {
                    if (values[(current + 1) * step] <= target)
                        low = current + 1;
                    else
                        high = current;
                    if (low == high)
                        return (low + 1) * step;
                    current = (low + high) >>> 1;
                }
            };
            Animation.linearSearch = function (values, target, step) {
                for (var i = 0, last = values.length - step; i <= last; i += step)
                    if (values[i] > target)
                        return i;
                return -1;
            };
            return Animation;
        }());
        core.Animation = Animation;
        var MixPose;
        (function (MixPose) {
            MixPose[MixPose["setup"] = 0] = "setup";
            MixPose[MixPose["current"] = 1] = "current";
            MixPose[MixPose["currentLayered"] = 2] = "currentLayered";
        })(MixPose = core.MixPose || (core.MixPose = {}));
        var MixDirection;
        (function (MixDirection) {
            MixDirection[MixDirection["in"] = 0] = "in";
            MixDirection[MixDirection["out"] = 1] = "out";
        })(MixDirection = core.MixDirection || (core.MixDirection = {}));
        var TimelineType;
        (function (TimelineType) {
            TimelineType[TimelineType["rotate"] = 0] = "rotate";
            TimelineType[TimelineType["translate"] = 1] = "translate";
            TimelineType[TimelineType["scale"] = 2] = "scale";
            TimelineType[TimelineType["shear"] = 3] = "shear";
            TimelineType[TimelineType["attachment"] = 4] = "attachment";
            TimelineType[TimelineType["color"] = 5] = "color";
            TimelineType[TimelineType["deform"] = 6] = "deform";
            TimelineType[TimelineType["event"] = 7] = "event";
            TimelineType[TimelineType["drawOrder"] = 8] = "drawOrder";
            TimelineType[TimelineType["ikConstraint"] = 9] = "ikConstraint";
            TimelineType[TimelineType["transformConstraint"] = 10] = "transformConstraint";
            TimelineType[TimelineType["pathConstraintPosition"] = 11] = "pathConstraintPosition";
            TimelineType[TimelineType["pathConstraintSpacing"] = 12] = "pathConstraintSpacing";
            TimelineType[TimelineType["pathConstraintMix"] = 13] = "pathConstraintMix";
            TimelineType[TimelineType["twoColor"] = 14] = "twoColor";
        })(TimelineType = core.TimelineType || (core.TimelineType = {}));
        var CurveTimeline = (function () {
            function CurveTimeline(frameCount) {
                if (frameCount <= 0)
                    throw new Error("frameCount must be > 0: " + frameCount);
                this.curves = core.Utils.newFloatArray((frameCount - 1) * CurveTimeline.BEZIER_SIZE);
            }
            CurveTimeline.prototype.getFrameCount = function () {
                return this.curves.length / CurveTimeline.BEZIER_SIZE + 1;
            };
            CurveTimeline.prototype.setLinear = function (frameIndex) {
                this.curves[frameIndex * CurveTimeline.BEZIER_SIZE] = CurveTimeline.LINEAR;
            };
            CurveTimeline.prototype.setStepped = function (frameIndex) {
                this.curves[frameIndex * CurveTimeline.BEZIER_SIZE] = CurveTimeline.STEPPED;
            };
            CurveTimeline.prototype.getCurveType = function (frameIndex) {
                var index = frameIndex * CurveTimeline.BEZIER_SIZE;
                if (index == this.curves.length)
                    return CurveTimeline.LINEAR;
                var type = this.curves[index];
                if (type == CurveTimeline.LINEAR)
                    return CurveTimeline.LINEAR;
                if (type == CurveTimeline.STEPPED)
                    return CurveTimeline.STEPPED;
                return CurveTimeline.BEZIER;
            };
            CurveTimeline.prototype.setCurve = function (frameIndex, cx1, cy1, cx2, cy2) {
                var tmpx = (-cx1 * 2 + cx2) * 0.03, tmpy = (-cy1 * 2 + cy2) * 0.03;
                var dddfx = ((cx1 - cx2) * 3 + 1) * 0.006, dddfy = ((cy1 - cy2) * 3 + 1) * 0.006;
                var ddfx = tmpx * 2 + dddfx, ddfy = tmpy * 2 + dddfy;
                var dfx = cx1 * 0.3 + tmpx + dddfx * 0.16666667, dfy = cy1 * 0.3 + tmpy + dddfy * 0.16666667;
                var i = frameIndex * CurveTimeline.BEZIER_SIZE;
                var curves = this.curves;
                curves[i++] = CurveTimeline.BEZIER;
                var x = dfx, y = dfy;
                for (var n = i + CurveTimeline.BEZIER_SIZE - 1; i < n; i += 2) {
                    curves[i] = x;
                    curves[i + 1] = y;
                    dfx += ddfx;
                    dfy += ddfy;
                    ddfx += dddfx;
                    ddfy += dddfy;
                    x += dfx;
                    y += dfy;
                }
            };
            CurveTimeline.prototype.getCurvePercent = function (frameIndex, percent) {
                percent = core.MathUtils.clamp(percent, 0, 1);
                var curves = this.curves;
                var i = frameIndex * CurveTimeline.BEZIER_SIZE;
                var type = curves[i];
                if (type == CurveTimeline.LINEAR)
                    return percent;
                if (type == CurveTimeline.STEPPED)
                    return 0;
                i++;
                var x = 0;
                for (var start = i, n = i + CurveTimeline.BEZIER_SIZE - 1; i < n; i += 2) {
                    x = curves[i];
                    if (x >= percent) {
                        var prevX = void 0, prevY = void 0;
                        if (i == start) {
                            prevX = 0;
                            prevY = 0;
                        }
                        else {
                            prevX = curves[i - 2];
                            prevY = curves[i - 1];
                        }
                        return prevY + (curves[i + 1] - prevY) * (percent - prevX) / (x - prevX);
                    }
                }
                var y = curves[i - 1];
                return y + (1 - y) * (percent - x) / (1 - x);
            };
            CurveTimeline.LINEAR = 0;
            CurveTimeline.STEPPED = 1;
            CurveTimeline.BEZIER = 2;
            CurveTimeline.BEZIER_SIZE = 10 * 2 - 1;
            return CurveTimeline;
        }());
        core.CurveTimeline = CurveTimeline;
        var RotateTimeline = (function (_super) {
            __extends(RotateTimeline, _super);
            function RotateTimeline(frameCount) {
                var _this = _super.call(this, frameCount) || this;
                _this.frames = core.Utils.newFloatArray(frameCount << 1);
                return _this;
            }
            RotateTimeline.prototype.getPropertyId = function () {
                return (TimelineType.rotate << 24) + this.boneIndex;
            };
            RotateTimeline.prototype.setFrame = function (frameIndex, time, degrees) {
                frameIndex <<= 1;
                this.frames[frameIndex] = time;
                this.frames[frameIndex + RotateTimeline.ROTATION] = degrees;
            };
            RotateTimeline.prototype.apply = function (skeleton, lastTime, time, events, alpha, pose, direction) {
                var frames = this.frames;
                var bone = skeleton.bones[this.boneIndex];
                if (time < frames[0]) {
                    switch (pose) {
                        case MixPose.setup:
                            bone.rotation = bone.data.rotation;
                            return;
                        case MixPose.current:
                            var r_1 = bone.data.rotation - bone.rotation;
                            r_1 -= (16384 - ((16384.499999999996 - r_1 / 360) | 0)) * 360;
                            bone.rotation += r_1 * alpha;
                    }
                    return;
                }
                if (time >= frames[frames.length - RotateTimeline.ENTRIES]) {
                    if (pose == MixPose.setup)
                        bone.rotation = bone.data.rotation + frames[frames.length + RotateTimeline.PREV_ROTATION] * alpha;
                    else {
                        var r_2 = bone.data.rotation + frames[frames.length + RotateTimeline.PREV_ROTATION] - bone.rotation;
                        r_2 -= (16384 - ((16384.499999999996 - r_2 / 360) | 0)) * 360;
                        bone.rotation += r_2 * alpha;
                    }
                    return;
                }
                var frame = Animation.binarySearch(frames, time, RotateTimeline.ENTRIES);
                var prevRotation = frames[frame + RotateTimeline.PREV_ROTATION];
                var frameTime = frames[frame];
                var percent = this.getCurvePercent((frame >> 1) - 1, 1 - (time - frameTime) / (frames[frame + RotateTimeline.PREV_TIME] - frameTime));
                var r = frames[frame + RotateTimeline.ROTATION] - prevRotation;
                r -= (16384 - ((16384.499999999996 - r / 360) | 0)) * 360;
                r = prevRotation + r * percent;
                if (pose == MixPose.setup) {
                    r -= (16384 - ((16384.499999999996 - r / 360) | 0)) * 360;
                    bone.rotation = bone.data.rotation + r * alpha;
                }
                else {
                    r = bone.data.rotation + r - bone.rotation;
                    r -= (16384 - ((16384.499999999996 - r / 360) | 0)) * 360;
                    bone.rotation += r * alpha;
                }
            };
            RotateTimeline.ENTRIES = 2;
            RotateTimeline.PREV_TIME = -2;
            RotateTimeline.PREV_ROTATION = -1;
            RotateTimeline.ROTATION = 1;
            return RotateTimeline;
        }(CurveTimeline));
        core.RotateTimeline = RotateTimeline;
        var TranslateTimeline = (function (_super) {
            __extends(TranslateTimeline, _super);
            function TranslateTimeline(frameCount) {
                var _this = _super.call(this, frameCount) || this;
                _this.frames = core.Utils.newFloatArray(frameCount * TranslateTimeline.ENTRIES);
                return _this;
            }
            TranslateTimeline.prototype.getPropertyId = function () {
                return (TimelineType.translate << 24) + this.boneIndex;
            };
            TranslateTimeline.prototype.setFrame = function (frameIndex, time, x, y) {
                frameIndex *= TranslateTimeline.ENTRIES;
                this.frames[frameIndex] = time;
                this.frames[frameIndex + TranslateTimeline.X] = x;
                this.frames[frameIndex + TranslateTimeline.Y] = y;
            };
            TranslateTimeline.prototype.apply = function (skeleton, lastTime, time, events, alpha, pose, direction) {
                var frames = this.frames;
                var bone = skeleton.bones[this.boneIndex];
                if (time < frames[0]) {
                    switch (pose) {
                        case MixPose.setup:
                            bone.x = bone.data.x;
                            bone.y = bone.data.y;
                            return;
                        case MixPose.current:
                            bone.x += (bone.data.x - bone.x) * alpha;
                            bone.y += (bone.data.y - bone.y) * alpha;
                    }
                    return;
                }
                var x = 0, y = 0;
                if (time >= frames[frames.length - TranslateTimeline.ENTRIES]) {
                    x = frames[frames.length + TranslateTimeline.PREV_X];
                    y = frames[frames.length + TranslateTimeline.PREV_Y];
                }
                else {
                    var frame = Animation.binarySearch(frames, time, TranslateTimeline.ENTRIES);
                    x = frames[frame + TranslateTimeline.PREV_X];
                    y = frames[frame + TranslateTimeline.PREV_Y];
                    var frameTime = frames[frame];
                    var percent = this.getCurvePercent(frame / TranslateTimeline.ENTRIES - 1, 1 - (time - frameTime) / (frames[frame + TranslateTimeline.PREV_TIME] - frameTime));
                    x += (frames[frame + TranslateTimeline.X] - x) * percent;
                    y += (frames[frame + TranslateTimeline.Y] - y) * percent;
                }
                if (pose == MixPose.setup) {
                    bone.x = bone.data.x + x * alpha;
                    bone.y = bone.data.y + y * alpha;
                }
                else {
                    bone.x += (bone.data.x + x - bone.x) * alpha;
                    bone.y += (bone.data.y + y - bone.y) * alpha;
                }
            };
            TranslateTimeline.ENTRIES = 3;
            TranslateTimeline.PREV_TIME = -3;
            TranslateTimeline.PREV_X = -2;
            TranslateTimeline.PREV_Y = -1;
            TranslateTimeline.X = 1;
            TranslateTimeline.Y = 2;
            return TranslateTimeline;
        }(CurveTimeline));
        core.TranslateTimeline = TranslateTimeline;
        var ScaleTimeline = (function (_super) {
            __extends(ScaleTimeline, _super);
            function ScaleTimeline(frameCount) {
                return _super.call(this, frameCount) || this;
            }
            ScaleTimeline.prototype.getPropertyId = function () {
                return (TimelineType.scale << 24) + this.boneIndex;
            };
            ScaleTimeline.prototype.apply = function (skeleton, lastTime, time, events, alpha, pose, direction) {
                var frames = this.frames;
                var bone = skeleton.bones[this.boneIndex];
                if (time < frames[0]) {
                    switch (pose) {
                        case MixPose.setup:
                            bone.scaleX = bone.data.scaleX;
                            bone.scaleY = bone.data.scaleY;
                            return;
                        case MixPose.current:
                            bone.scaleX += (bone.data.scaleX - bone.scaleX) * alpha;
                            bone.scaleY += (bone.data.scaleY - bone.scaleY) * alpha;
                    }
                    return;
                }
                var x = 0, y = 0;
                if (time >= frames[frames.length - ScaleTimeline.ENTRIES]) {
                    x = frames[frames.length + ScaleTimeline.PREV_X] * bone.data.scaleX;
                    y = frames[frames.length + ScaleTimeline.PREV_Y] * bone.data.scaleY;
                }
                else {
                    var frame = Animation.binarySearch(frames, time, ScaleTimeline.ENTRIES);
                    x = frames[frame + ScaleTimeline.PREV_X];
                    y = frames[frame + ScaleTimeline.PREV_Y];
                    var frameTime = frames[frame];
                    var percent = this.getCurvePercent(frame / ScaleTimeline.ENTRIES - 1, 1 - (time - frameTime) / (frames[frame + ScaleTimeline.PREV_TIME] - frameTime));
                    x = (x + (frames[frame + ScaleTimeline.X] - x) * percent) * bone.data.scaleX;
                    y = (y + (frames[frame + ScaleTimeline.Y] - y) * percent) * bone.data.scaleY;
                }
                if (alpha == 1) {
                    bone.scaleX = x;
                    bone.scaleY = y;
                }
                else {
                    var bx = 0, by = 0;
                    if (pose == MixPose.setup) {
                        bx = bone.data.scaleX;
                        by = bone.data.scaleY;
                    }
                    else {
                        bx = bone.scaleX;
                        by = bone.scaleY;
                    }
                    if (direction == MixDirection.out) {
                        x = Math.abs(x) * core.MathUtils.signum(bx);
                        y = Math.abs(y) * core.MathUtils.signum(by);
                    }
                    else {
                        bx = Math.abs(bx) * core.MathUtils.signum(x);
                        by = Math.abs(by) * core.MathUtils.signum(y);
                    }
                    bone.scaleX = bx + (x - bx) * alpha;
                    bone.scaleY = by + (y - by) * alpha;
                }
            };
            return ScaleTimeline;
        }(TranslateTimeline));
        core.ScaleTimeline = ScaleTimeline;
        var ShearTimeline = (function (_super) {
            __extends(ShearTimeline, _super);
            function ShearTimeline(frameCount) {
                return _super.call(this, frameCount) || this;
            }
            ShearTimeline.prototype.getPropertyId = function () {
                return (TimelineType.shear << 24) + this.boneIndex;
            };
            ShearTimeline.prototype.apply = function (skeleton, lastTime, time, events, alpha, pose, direction) {
                var frames = this.frames;
                var bone = skeleton.bones[this.boneIndex];
                if (time < frames[0]) {
                    switch (pose) {
                        case MixPose.setup:
                            bone.shearX = bone.data.shearX;
                            bone.shearY = bone.data.shearY;
                            return;
                        case MixPose.current:
                            bone.shearX += (bone.data.shearX - bone.shearX) * alpha;
                            bone.shearY += (bone.data.shearY - bone.shearY) * alpha;
                    }
                    return;
                }
                var x = 0, y = 0;
                if (time >= frames[frames.length - ShearTimeline.ENTRIES]) {
                    x = frames[frames.length + ShearTimeline.PREV_X];
                    y = frames[frames.length + ShearTimeline.PREV_Y];
                }
                else {
                    var frame = Animation.binarySearch(frames, time, ShearTimeline.ENTRIES);
                    x = frames[frame + ShearTimeline.PREV_X];
                    y = frames[frame + ShearTimeline.PREV_Y];
                    var frameTime = frames[frame];
                    var percent = this.getCurvePercent(frame / ShearTimeline.ENTRIES - 1, 1 - (time - frameTime) / (frames[frame + ShearTimeline.PREV_TIME] - frameTime));
                    x = x + (frames[frame + ShearTimeline.X] - x) * percent;
                    y = y + (frames[frame + ShearTimeline.Y] - y) * percent;
                }
                if (pose == MixPose.setup) {
                    bone.shearX = bone.data.shearX + x * alpha;
                    bone.shearY = bone.data.shearY + y * alpha;
                }
                else {
                    bone.shearX += (bone.data.shearX + x - bone.shearX) * alpha;
                    bone.shearY += (bone.data.shearY + y - bone.shearY) * alpha;
                }
            };
            return ShearTimeline;
        }(TranslateTimeline));
        core.ShearTimeline = ShearTimeline;
        var ColorTimeline = (function (_super) {
            __extends(ColorTimeline, _super);
            function ColorTimeline(frameCount) {
                var _this = _super.call(this, frameCount) || this;
                _this.frames = core.Utils.newFloatArray(frameCount * ColorTimeline.ENTRIES);
                return _this;
            }
            ColorTimeline.prototype.getPropertyId = function () {
                return (TimelineType.color << 24) + this.slotIndex;
            };
            ColorTimeline.prototype.setFrame = function (frameIndex, time, r, g, b, a) {
                frameIndex *= ColorTimeline.ENTRIES;
                this.frames[frameIndex] = time;
                this.frames[frameIndex + ColorTimeline.R] = r;
                this.frames[frameIndex + ColorTimeline.G] = g;
                this.frames[frameIndex + ColorTimeline.B] = b;
                this.frames[frameIndex + ColorTimeline.A] = a;
            };
            ColorTimeline.prototype.apply = function (skeleton, lastTime, time, events, alpha, pose, direction) {
                var slot = skeleton.slots[this.slotIndex];
                var frames = this.frames;
                if (time < frames[0]) {
                    switch (pose) {
                        case MixPose.setup:
                            slot.color.setFromColor(slot.data.color);
                            return;
                        case MixPose.current:
                            var color = slot.color, setup = slot.data.color;
                            color.add((setup.r - color.r) * alpha, (setup.g - color.g) * alpha, (setup.b - color.b) * alpha, (setup.a - color.a) * alpha);
                    }
                    return;
                }
                var r = 0, g = 0, b = 0, a = 0;
                if (time >= frames[frames.length - ColorTimeline.ENTRIES]) {
                    var i = frames.length;
                    r = frames[i + ColorTimeline.PREV_R];
                    g = frames[i + ColorTimeline.PREV_G];
                    b = frames[i + ColorTimeline.PREV_B];
                    a = frames[i + ColorTimeline.PREV_A];
                }
                else {
                    var frame = Animation.binarySearch(frames, time, ColorTimeline.ENTRIES);
                    r = frames[frame + ColorTimeline.PREV_R];
                    g = frames[frame + ColorTimeline.PREV_G];
                    b = frames[frame + ColorTimeline.PREV_B];
                    a = frames[frame + ColorTimeline.PREV_A];
                    var frameTime = frames[frame];
                    var percent = this.getCurvePercent(frame / ColorTimeline.ENTRIES - 1, 1 - (time - frameTime) / (frames[frame + ColorTimeline.PREV_TIME] - frameTime));
                    r += (frames[frame + ColorTimeline.R] - r) * percent;
                    g += (frames[frame + ColorTimeline.G] - g) * percent;
                    b += (frames[frame + ColorTimeline.B] - b) * percent;
                    a += (frames[frame + ColorTimeline.A] - a) * percent;
                }
                if (alpha == 1)
                    slot.color.set(r, g, b, a);
                else {
                    var color = slot.color;
                    if (pose == MixPose.setup)
                        color.setFromColor(slot.data.color);
                    color.add((r - color.r) * alpha, (g - color.g) * alpha, (b - color.b) * alpha, (a - color.a) * alpha);
                }
            };
            ColorTimeline.ENTRIES = 5;
            ColorTimeline.PREV_TIME = -5;
            ColorTimeline.PREV_R = -4;
            ColorTimeline.PREV_G = -3;
            ColorTimeline.PREV_B = -2;
            ColorTimeline.PREV_A = -1;
            ColorTimeline.R = 1;
            ColorTimeline.G = 2;
            ColorTimeline.B = 3;
            ColorTimeline.A = 4;
            return ColorTimeline;
        }(CurveTimeline));
        core.ColorTimeline = ColorTimeline;
        var TwoColorTimeline = (function (_super) {
            __extends(TwoColorTimeline, _super);
            function TwoColorTimeline(frameCount) {
                var _this = _super.call(this, frameCount) || this;
                _this.frames = core.Utils.newFloatArray(frameCount * TwoColorTimeline.ENTRIES);
                return _this;
            }
            TwoColorTimeline.prototype.getPropertyId = function () {
                return (TimelineType.twoColor << 24) + this.slotIndex;
            };
            TwoColorTimeline.prototype.setFrame = function (frameIndex, time, r, g, b, a, r2, g2, b2) {
                frameIndex *= TwoColorTimeline.ENTRIES;
                this.frames[frameIndex] = time;
                this.frames[frameIndex + TwoColorTimeline.R] = r;
                this.frames[frameIndex + TwoColorTimeline.G] = g;
                this.frames[frameIndex + TwoColorTimeline.B] = b;
                this.frames[frameIndex + TwoColorTimeline.A] = a;
                this.frames[frameIndex + TwoColorTimeline.R2] = r2;
                this.frames[frameIndex + TwoColorTimeline.G2] = g2;
                this.frames[frameIndex + TwoColorTimeline.B2] = b2;
            };
            TwoColorTimeline.prototype.apply = function (skeleton, lastTime, time, events, alpha, pose, direction) {
                var slot = skeleton.slots[this.slotIndex];
                var frames = this.frames;
                if (time < frames[0]) {
                    switch (pose) {
                        case MixPose.setup:
                            slot.color.setFromColor(slot.data.color);
                            slot.darkColor.setFromColor(slot.data.darkColor);
                            return;
                        case MixPose.current:
                            var light = slot.color, dark = slot.darkColor, setupLight = slot.data.color, setupDark = slot.data.darkColor;
                            light.add((setupLight.r - light.r) * alpha, (setupLight.g - light.g) * alpha, (setupLight.b - light.b) * alpha, (setupLight.a - light.a) * alpha);
                            dark.add((setupDark.r - dark.r) * alpha, (setupDark.g - dark.g) * alpha, (setupDark.b - dark.b) * alpha, 0);
                    }
                    return;
                }
                var r = 0, g = 0, b = 0, a = 0, r2 = 0, g2 = 0, b2 = 0;
                if (time >= frames[frames.length - TwoColorTimeline.ENTRIES]) {
                    var i = frames.length;
                    r = frames[i + TwoColorTimeline.PREV_R];
                    g = frames[i + TwoColorTimeline.PREV_G];
                    b = frames[i + TwoColorTimeline.PREV_B];
                    a = frames[i + TwoColorTimeline.PREV_A];
                    r2 = frames[i + TwoColorTimeline.PREV_R2];
                    g2 = frames[i + TwoColorTimeline.PREV_G2];
                    b2 = frames[i + TwoColorTimeline.PREV_B2];
                }
                else {
                    var frame = Animation.binarySearch(frames, time, TwoColorTimeline.ENTRIES);
                    r = frames[frame + TwoColorTimeline.PREV_R];
                    g = frames[frame + TwoColorTimeline.PREV_G];
                    b = frames[frame + TwoColorTimeline.PREV_B];
                    a = frames[frame + TwoColorTimeline.PREV_A];
                    r2 = frames[frame + TwoColorTimeline.PREV_R2];
                    g2 = frames[frame + TwoColorTimeline.PREV_G2];
                    b2 = frames[frame + TwoColorTimeline.PREV_B2];
                    var frameTime = frames[frame];
                    var percent = this.getCurvePercent(frame / TwoColorTimeline.ENTRIES - 1, 1 - (time - frameTime) / (frames[frame + TwoColorTimeline.PREV_TIME] - frameTime));
                    r += (frames[frame + TwoColorTimeline.R] - r) * percent;
                    g += (frames[frame + TwoColorTimeline.G] - g) * percent;
                    b += (frames[frame + TwoColorTimeline.B] - b) * percent;
                    a += (frames[frame + TwoColorTimeline.A] - a) * percent;
                    r2 += (frames[frame + TwoColorTimeline.R2] - r2) * percent;
                    g2 += (frames[frame + TwoColorTimeline.G2] - g2) * percent;
                    b2 += (frames[frame + TwoColorTimeline.B2] - b2) * percent;
                }
                if (alpha == 1) {
                    slot.color.set(r, g, b, a);
                    slot.darkColor.set(r2, g2, b2, 1);
                }
                else {
                    var light = slot.color, dark = slot.darkColor;
                    if (pose == MixPose.setup) {
                        light.setFromColor(slot.data.color);
                        dark.setFromColor(slot.data.darkColor);
                    }
                    light.add((r - light.r) * alpha, (g - light.g) * alpha, (b - light.b) * alpha, (a - light.a) * alpha);
                    dark.add((r2 - dark.r) * alpha, (g2 - dark.g) * alpha, (b2 - dark.b) * alpha, 0);
                }
            };
            TwoColorTimeline.ENTRIES = 8;
            TwoColorTimeline.PREV_TIME = -8;
            TwoColorTimeline.PREV_R = -7;
            TwoColorTimeline.PREV_G = -6;
            TwoColorTimeline.PREV_B = -5;
            TwoColorTimeline.PREV_A = -4;
            TwoColorTimeline.PREV_R2 = -3;
            TwoColorTimeline.PREV_G2 = -2;
            TwoColorTimeline.PREV_B2 = -1;
            TwoColorTimeline.R = 1;
            TwoColorTimeline.G = 2;
            TwoColorTimeline.B = 3;
            TwoColorTimeline.A = 4;
            TwoColorTimeline.R2 = 5;
            TwoColorTimeline.G2 = 6;
            TwoColorTimeline.B2 = 7;
            return TwoColorTimeline;
        }(CurveTimeline));
        core.TwoColorTimeline = TwoColorTimeline;
        var AttachmentTimeline = (function () {
            function AttachmentTimeline(frameCount) {
                this.frames = core.Utils.newFloatArray(frameCount);
                this.attachmentNames = new Array(frameCount);
            }
            AttachmentTimeline.prototype.getPropertyId = function () {
                return (TimelineType.attachment << 24) + this.slotIndex;
            };
            AttachmentTimeline.prototype.getFrameCount = function () {
                return this.frames.length;
            };
            AttachmentTimeline.prototype.setFrame = function (frameIndex, time, attachmentName) {
                this.frames[frameIndex] = time;
                this.attachmentNames[frameIndex] = attachmentName;
            };
            AttachmentTimeline.prototype.apply = function (skeleton, lastTime, time, events, alpha, pose, direction) {
                var slot = skeleton.slots[this.slotIndex];
                if (direction == MixDirection.out && pose == MixPose.setup) {
                    var attachmentName_1 = slot.data.attachmentName;
                    slot.setAttachment(attachmentName_1 == null ? null : skeleton.getAttachment(this.slotIndex, attachmentName_1));
                    return;
                }
                var frames = this.frames;
                if (time < frames[0]) {
                    if (pose == MixPose.setup) {
                        var attachmentName_2 = slot.data.attachmentName;
                        slot.setAttachment(attachmentName_2 == null ? null : skeleton.getAttachment(this.slotIndex, attachmentName_2));
                    }
                    return;
                }
                var frameIndex = 0;
                if (time >= frames[frames.length - 1])
                    frameIndex = frames.length - 1;
                else
                    frameIndex = Animation.binarySearch(frames, time, 1) - 1;
                var attachmentName = this.attachmentNames[frameIndex];
                skeleton.slots[this.slotIndex]
                    .setAttachment(attachmentName == null ? null : skeleton.getAttachment(this.slotIndex, attachmentName));
            };
            return AttachmentTimeline;
        }());
        core.AttachmentTimeline = AttachmentTimeline;
        var zeros = null;
        var DeformTimeline = (function (_super) {
            __extends(DeformTimeline, _super);
            function DeformTimeline(frameCount) {
                var _this = _super.call(this, frameCount) || this;
                _this.frames = core.Utils.newFloatArray(frameCount);
                _this.frameVertices = new Array(frameCount);
                if (zeros == null)
                    zeros = core.Utils.newFloatArray(64);
                return _this;
            }
            DeformTimeline.prototype.getPropertyId = function () {
                return (TimelineType.deform << 27) + +this.attachment.id + this.slotIndex;
            };
            DeformTimeline.prototype.setFrame = function (frameIndex, time, vertices) {
                this.frames[frameIndex] = time;
                this.frameVertices[frameIndex] = vertices;
            };
            DeformTimeline.prototype.apply = function (skeleton, lastTime, time, firedEvents, alpha, pose, direction) {
                var slot = skeleton.slots[this.slotIndex];
                var slotAttachment = slot.getAttachment();
                if (!(slotAttachment instanceof core.VertexAttachment) || !slotAttachment.applyDeform(this.attachment))
                    return;
                var verticesArray = slot.attachmentVertices;
                if (verticesArray.length == 0)
                    alpha = 1;
                var frameVertices = this.frameVertices;
                var vertexCount = frameVertices[0].length;
                var frames = this.frames;
                if (time < frames[0]) {
                    var vertexAttachment = slotAttachment;
                    switch (pose) {
                        case MixPose.setup:
                            verticesArray.length = 0;
                            return;
                        case MixPose.current:
                            if (alpha == 1) {
                                verticesArray.length = 0;
                                break;
                            }
                            var vertices_1 = core.Utils.setArraySize(verticesArray, vertexCount);
                            if (vertexAttachment.bones == null) {
                                var setupVertices = vertexAttachment.vertices;
                                for (var i = 0; i < vertexCount; i++)
                                    vertices_1[i] += (setupVertices[i] - vertices_1[i]) * alpha;
                            }
                            else {
                                alpha = 1 - alpha;
                                for (var i = 0; i < vertexCount; i++)
                                    vertices_1[i] *= alpha;
                            }
                    }
                    return;
                }
                var vertices = core.Utils.setArraySize(verticesArray, vertexCount);
                if (time >= frames[frames.length - 1]) {
                    var lastVertices = frameVertices[frames.length - 1];
                    if (alpha == 1) {
                        core.Utils.arrayCopy(lastVertices, 0, vertices, 0, vertexCount);
                    }
                    else if (pose == MixPose.setup) {
                        var vertexAttachment = slotAttachment;
                        if (vertexAttachment.bones == null) {
                            var setupVertices = vertexAttachment.vertices;
                            for (var i = 0; i < vertexCount; i++) {
                                var setup = setupVertices[i];
                                vertices[i] = setup + (lastVertices[i] - setup) * alpha;
                            }
                        }
                        else {
                            for (var i = 0; i < vertexCount; i++)
                                vertices[i] = lastVertices[i] * alpha;
                        }
                    }
                    else {
                        for (var i = 0; i < vertexCount; i++)
                            vertices[i] += (lastVertices[i] - vertices[i]) * alpha;
                    }
                    return;
                }
                var frame = Animation.binarySearch(frames, time);
                var prevVertices = frameVertices[frame - 1];
                var nextVertices = frameVertices[frame];
                var frameTime = frames[frame];
                var percent = this.getCurvePercent(frame - 1, 1 - (time - frameTime) / (frames[frame - 1] - frameTime));
                if (alpha == 1) {
                    for (var i = 0; i < vertexCount; i++) {
                        var prev = prevVertices[i];
                        vertices[i] = prev + (nextVertices[i] - prev) * percent;
                    }
                }
                else if (pose == MixPose.setup) {
                    var vertexAttachment = slotAttachment;
                    if (vertexAttachment.bones == null) {
                        var setupVertices = vertexAttachment.vertices;
                        for (var i = 0; i < vertexCount; i++) {
                            var prev = prevVertices[i], setup = setupVertices[i];
                            vertices[i] = setup + (prev + (nextVertices[i] - prev) * percent - setup) * alpha;
                        }
                    }
                    else {
                        for (var i = 0; i < vertexCount; i++) {
                            var prev = prevVertices[i];
                            vertices[i] = (prev + (nextVertices[i] - prev) * percent) * alpha;
                        }
                    }
                }
                else {
                    for (var i = 0; i < vertexCount; i++) {
                        var prev = prevVertices[i];
                        vertices[i] += (prev + (nextVertices[i] - prev) * percent - vertices[i]) * alpha;
                    }
                }
            };
            return DeformTimeline;
        }(CurveTimeline));
        core.DeformTimeline = DeformTimeline;
        var EventTimeline = (function () {
            function EventTimeline(frameCount) {
                this.frames = core.Utils.newFloatArray(frameCount);
                this.events = new Array(frameCount);
            }
            EventTimeline.prototype.getPropertyId = function () {
                return TimelineType.event << 24;
            };
            EventTimeline.prototype.getFrameCount = function () {
                return this.frames.length;
            };
            EventTimeline.prototype.setFrame = function (frameIndex, event) {
                this.frames[frameIndex] = event.time;
                this.events[frameIndex] = event;
            };
            EventTimeline.prototype.apply = function (skeleton, lastTime, time, firedEvents, alpha, pose, direction) {
                if (firedEvents == null)
                    return;
                var frames = this.frames;
                var frameCount = this.frames.length;
                if (lastTime > time) {
                    this.apply(skeleton, lastTime, Number.MAX_VALUE, firedEvents, alpha, pose, direction);
                    lastTime = -1;
                }
                else if (lastTime >= frames[frameCount - 1])
                    return;
                if (time < frames[0])
                    return;
                var frame = 0;
                if (lastTime < frames[0])
                    frame = 0;
                else {
                    frame = Animation.binarySearch(frames, lastTime);
                    var frameTime = frames[frame];
                    while (frame > 0) {
                        if (frames[frame - 1] != frameTime)
                            break;
                        frame--;
                    }
                }
                for (; frame < frameCount && time >= frames[frame]; frame++)
                    firedEvents.push(this.events[frame]);
            };
            return EventTimeline;
        }());
        core.EventTimeline = EventTimeline;
        var DrawOrderTimeline = (function () {
            function DrawOrderTimeline(frameCount) {
                this.frames = core.Utils.newFloatArray(frameCount);
                this.drawOrders = new Array(frameCount);
            }
            DrawOrderTimeline.prototype.getPropertyId = function () {
                return TimelineType.drawOrder << 24;
            };
            DrawOrderTimeline.prototype.getFrameCount = function () {
                return this.frames.length;
            };
            DrawOrderTimeline.prototype.setFrame = function (frameIndex, time, drawOrder) {
                this.frames[frameIndex] = time;
                this.drawOrders[frameIndex] = drawOrder;
            };
            DrawOrderTimeline.prototype.apply = function (skeleton, lastTime, time, firedEvents, alpha, pose, direction) {
                var drawOrder = skeleton.drawOrder;
                var slots = skeleton.slots;
                if (direction == MixDirection.out && pose == MixPose.setup) {
                    core.Utils.arrayCopy(skeleton.slots, 0, skeleton.drawOrder, 0, skeleton.slots.length);
                    return;
                }
                var frames = this.frames;
                if (time < frames[0]) {
                    if (pose == MixPose.setup)
                        core.Utils.arrayCopy(skeleton.slots, 0, skeleton.drawOrder, 0, skeleton.slots.length);
                    return;
                }
                var frame = 0;
                if (time >= frames[frames.length - 1])
                    frame = frames.length - 1;
                else
                    frame = Animation.binarySearch(frames, time) - 1;
                var drawOrderToSetupIndex = this.drawOrders[frame];
                if (drawOrderToSetupIndex == null)
                    core.Utils.arrayCopy(slots, 0, drawOrder, 0, slots.length);
                else {
                    for (var i = 0, n = drawOrderToSetupIndex.length; i < n; i++)
                        drawOrder[i] = slots[drawOrderToSetupIndex[i]];
                }
            };
            return DrawOrderTimeline;
        }());
        core.DrawOrderTimeline = DrawOrderTimeline;
        var IkConstraintTimeline = (function (_super) {
            __extends(IkConstraintTimeline, _super);
            function IkConstraintTimeline(frameCount) {
                var _this = _super.call(this, frameCount) || this;
                _this.frames = core.Utils.newFloatArray(frameCount * IkConstraintTimeline.ENTRIES);
                return _this;
            }
            IkConstraintTimeline.prototype.getPropertyId = function () {
                return (TimelineType.ikConstraint << 24) + this.ikConstraintIndex;
            };
            IkConstraintTimeline.prototype.setFrame = function (frameIndex, time, mix, bendDirection) {
                frameIndex *= IkConstraintTimeline.ENTRIES;
                this.frames[frameIndex] = time;
                this.frames[frameIndex + IkConstraintTimeline.MIX] = mix;
                this.frames[frameIndex + IkConstraintTimeline.BEND_DIRECTION] = bendDirection;
            };
            IkConstraintTimeline.prototype.apply = function (skeleton, lastTime, time, firedEvents, alpha, pose, direction) {
                var frames = this.frames;
                var constraint = skeleton.ikConstraints[this.ikConstraintIndex];
                if (time < frames[0]) {
                    switch (pose) {
                        case MixPose.setup:
                            constraint.mix = constraint.data.mix;
                            constraint.bendDirection = constraint.data.bendDirection;
                            return;
                        case MixPose.current:
                            constraint.mix += (constraint.data.mix - constraint.mix) * alpha;
                            constraint.bendDirection = constraint.data.bendDirection;
                    }
                    return;
                }
                if (time >= frames[frames.length - IkConstraintTimeline.ENTRIES]) {
                    if (pose == MixPose.setup) {
                        constraint.mix = constraint.data.mix + (frames[frames.length + IkConstraintTimeline.PREV_MIX] - constraint.data.mix) * alpha;
                        constraint.bendDirection = direction == MixDirection.out ? constraint.data.bendDirection
                            : frames[frames.length + IkConstraintTimeline.PREV_BEND_DIRECTION];
                    }
                    else {
                        constraint.mix += (frames[frames.length + IkConstraintTimeline.PREV_MIX] - constraint.mix) * alpha;
                        if (direction == MixDirection.in)
                            constraint.bendDirection = frames[frames.length + IkConstraintTimeline.PREV_BEND_DIRECTION];
                    }
                    return;
                }
                var frame = Animation.binarySearch(frames, time, IkConstraintTimeline.ENTRIES);
                var mix = frames[frame + IkConstraintTimeline.PREV_MIX];
                var frameTime = frames[frame];
                var percent = this.getCurvePercent(frame / IkConstraintTimeline.ENTRIES - 1, 1 - (time - frameTime) / (frames[frame + IkConstraintTimeline.PREV_TIME] - frameTime));
                if (pose == MixPose.setup) {
                    constraint.mix = constraint.data.mix + (mix + (frames[frame + IkConstraintTimeline.MIX] - mix) * percent - constraint.data.mix) * alpha;
                    constraint.bendDirection = direction == MixDirection.out ? constraint.data.bendDirection : frames[frame + IkConstraintTimeline.PREV_BEND_DIRECTION];
                }
                else {
                    constraint.mix += (mix + (frames[frame + IkConstraintTimeline.MIX] - mix) * percent - constraint.mix) * alpha;
                    if (direction == MixDirection.in)
                        constraint.bendDirection = frames[frame + IkConstraintTimeline.PREV_BEND_DIRECTION];
                }
            };
            IkConstraintTimeline.ENTRIES = 3;
            IkConstraintTimeline.PREV_TIME = -3;
            IkConstraintTimeline.PREV_MIX = -2;
            IkConstraintTimeline.PREV_BEND_DIRECTION = -1;
            IkConstraintTimeline.MIX = 1;
            IkConstraintTimeline.BEND_DIRECTION = 2;
            return IkConstraintTimeline;
        }(CurveTimeline));
        core.IkConstraintTimeline = IkConstraintTimeline;
        var TransformConstraintTimeline = (function (_super) {
            __extends(TransformConstraintTimeline, _super);
            function TransformConstraintTimeline(frameCount) {
                var _this = _super.call(this, frameCount) || this;
                _this.frames = core.Utils.newFloatArray(frameCount * TransformConstraintTimeline.ENTRIES);
                return _this;
            }
            TransformConstraintTimeline.prototype.getPropertyId = function () {
                return (TimelineType.transformConstraint << 24) + this.transformConstraintIndex;
            };
            TransformConstraintTimeline.prototype.setFrame = function (frameIndex, time, rotateMix, translateMix, scaleMix, shearMix) {
                frameIndex *= TransformConstraintTimeline.ENTRIES;
                this.frames[frameIndex] = time;
                this.frames[frameIndex + TransformConstraintTimeline.ROTATE] = rotateMix;
                this.frames[frameIndex + TransformConstraintTimeline.TRANSLATE] = translateMix;
                this.frames[frameIndex + TransformConstraintTimeline.SCALE] = scaleMix;
                this.frames[frameIndex + TransformConstraintTimeline.SHEAR] = shearMix;
            };
            TransformConstraintTimeline.prototype.apply = function (skeleton, lastTime, time, firedEvents, alpha, pose, direction) {
                var frames = this.frames;
                var constraint = skeleton.transformConstraints[this.transformConstraintIndex];
                if (time < frames[0]) {
                    var data = constraint.data;
                    switch (pose) {
                        case MixPose.setup:
                            constraint.rotateMix = data.rotateMix;
                            constraint.translateMix = data.translateMix;
                            constraint.scaleMix = data.scaleMix;
                            constraint.shearMix = data.shearMix;
                            return;
                        case MixPose.current:
                            constraint.rotateMix += (data.rotateMix - constraint.rotateMix) * alpha;
                            constraint.translateMix += (data.translateMix - constraint.translateMix) * alpha;
                            constraint.scaleMix += (data.scaleMix - constraint.scaleMix) * alpha;
                            constraint.shearMix += (data.shearMix - constraint.shearMix) * alpha;
                    }
                    return;
                }
                var rotate = 0, translate = 0, scale = 0, shear = 0;
                if (time >= frames[frames.length - TransformConstraintTimeline.ENTRIES]) {
                    var i = frames.length;
                    rotate = frames[i + TransformConstraintTimeline.PREV_ROTATE];
                    translate = frames[i + TransformConstraintTimeline.PREV_TRANSLATE];
                    scale = frames[i + TransformConstraintTimeline.PREV_SCALE];
                    shear = frames[i + TransformConstraintTimeline.PREV_SHEAR];
                }
                else {
                    var frame = Animation.binarySearch(frames, time, TransformConstraintTimeline.ENTRIES);
                    rotate = frames[frame + TransformConstraintTimeline.PREV_ROTATE];
                    translate = frames[frame + TransformConstraintTimeline.PREV_TRANSLATE];
                    scale = frames[frame + TransformConstraintTimeline.PREV_SCALE];
                    shear = frames[frame + TransformConstraintTimeline.PREV_SHEAR];
                    var frameTime = frames[frame];
                    var percent = this.getCurvePercent(frame / TransformConstraintTimeline.ENTRIES - 1, 1 - (time - frameTime) / (frames[frame + TransformConstraintTimeline.PREV_TIME] - frameTime));
                    rotate += (frames[frame + TransformConstraintTimeline.ROTATE] - rotate) * percent;
                    translate += (frames[frame + TransformConstraintTimeline.TRANSLATE] - translate) * percent;
                    scale += (frames[frame + TransformConstraintTimeline.SCALE] - scale) * percent;
                    shear += (frames[frame + TransformConstraintTimeline.SHEAR] - shear) * percent;
                }
                if (pose == MixPose.setup) {
                    var data = constraint.data;
                    constraint.rotateMix = data.rotateMix + (rotate - data.rotateMix) * alpha;
                    constraint.translateMix = data.translateMix + (translate - data.translateMix) * alpha;
                    constraint.scaleMix = data.scaleMix + (scale - data.scaleMix) * alpha;
                    constraint.shearMix = data.shearMix + (shear - data.shearMix) * alpha;
                }
                else {
                    constraint.rotateMix += (rotate - constraint.rotateMix) * alpha;
                    constraint.translateMix += (translate - constraint.translateMix) * alpha;
                    constraint.scaleMix += (scale - constraint.scaleMix) * alpha;
                    constraint.shearMix += (shear - constraint.shearMix) * alpha;
                }
            };
            TransformConstraintTimeline.ENTRIES = 5;
            TransformConstraintTimeline.PREV_TIME = -5;
            TransformConstraintTimeline.PREV_ROTATE = -4;
            TransformConstraintTimeline.PREV_TRANSLATE = -3;
            TransformConstraintTimeline.PREV_SCALE = -2;
            TransformConstraintTimeline.PREV_SHEAR = -1;
            TransformConstraintTimeline.ROTATE = 1;
            TransformConstraintTimeline.TRANSLATE = 2;
            TransformConstraintTimeline.SCALE = 3;
            TransformConstraintTimeline.SHEAR = 4;
            return TransformConstraintTimeline;
        }(CurveTimeline));
        core.TransformConstraintTimeline = TransformConstraintTimeline;
        var PathConstraintPositionTimeline = (function (_super) {
            __extends(PathConstraintPositionTimeline, _super);
            function PathConstraintPositionTimeline(frameCount) {
                var _this = _super.call(this, frameCount) || this;
                _this.frames = core.Utils.newFloatArray(frameCount * PathConstraintPositionTimeline.ENTRIES);
                return _this;
            }
            PathConstraintPositionTimeline.prototype.getPropertyId = function () {
                return (TimelineType.pathConstraintPosition << 24) + this.pathConstraintIndex;
            };
            PathConstraintPositionTimeline.prototype.setFrame = function (frameIndex, time, value) {
                frameIndex *= PathConstraintPositionTimeline.ENTRIES;
                this.frames[frameIndex] = time;
                this.frames[frameIndex + PathConstraintPositionTimeline.VALUE] = value;
            };
            PathConstraintPositionTimeline.prototype.apply = function (skeleton, lastTime, time, firedEvents, alpha, pose, direction) {
                var frames = this.frames;
                var constraint = skeleton.pathConstraints[this.pathConstraintIndex];
                if (time < frames[0]) {
                    switch (pose) {
                        case MixPose.setup:
                            constraint.position = constraint.data.position;
                            return;
                        case MixPose.current:
                            constraint.position += (constraint.data.position - constraint.position) * alpha;
                    }
                    return;
                }
                var position = 0;
                if (time >= frames[frames.length - PathConstraintPositionTimeline.ENTRIES])
                    position = frames[frames.length + PathConstraintPositionTimeline.PREV_VALUE];
                else {
                    var frame = Animation.binarySearch(frames, time, PathConstraintPositionTimeline.ENTRIES);
                    position = frames[frame + PathConstraintPositionTimeline.PREV_VALUE];
                    var frameTime = frames[frame];
                    var percent = this.getCurvePercent(frame / PathConstraintPositionTimeline.ENTRIES - 1, 1 - (time - frameTime) / (frames[frame + PathConstraintPositionTimeline.PREV_TIME] - frameTime));
                    position += (frames[frame + PathConstraintPositionTimeline.VALUE] - position) * percent;
                }
                if (pose == MixPose.setup)
                    constraint.position = constraint.data.position + (position - constraint.data.position) * alpha;
                else
                    constraint.position += (position - constraint.position) * alpha;
            };
            PathConstraintPositionTimeline.ENTRIES = 2;
            PathConstraintPositionTimeline.PREV_TIME = -2;
            PathConstraintPositionTimeline.PREV_VALUE = -1;
            PathConstraintPositionTimeline.VALUE = 1;
            return PathConstraintPositionTimeline;
        }(CurveTimeline));
        core.PathConstraintPositionTimeline = PathConstraintPositionTimeline;
        var PathConstraintSpacingTimeline = (function (_super) {
            __extends(PathConstraintSpacingTimeline, _super);
            function PathConstraintSpacingTimeline(frameCount) {
                return _super.call(this, frameCount) || this;
            }
            PathConstraintSpacingTimeline.prototype.getPropertyId = function () {
                return (TimelineType.pathConstraintSpacing << 24) + this.pathConstraintIndex;
            };
            PathConstraintSpacingTimeline.prototype.apply = function (skeleton, lastTime, time, firedEvents, alpha, pose, direction) {
                var frames = this.frames;
                var constraint = skeleton.pathConstraints[this.pathConstraintIndex];
                if (time < frames[0]) {
                    switch (pose) {
                        case MixPose.setup:
                            constraint.spacing = constraint.data.spacing;
                            return;
                        case MixPose.current:
                            constraint.spacing += (constraint.data.spacing - constraint.spacing) * alpha;
                    }
                    return;
                }
                var spacing = 0;
                if (time >= frames[frames.length - PathConstraintSpacingTimeline.ENTRIES])
                    spacing = frames[frames.length + PathConstraintSpacingTimeline.PREV_VALUE];
                else {
                    var frame = Animation.binarySearch(frames, time, PathConstraintSpacingTimeline.ENTRIES);
                    spacing = frames[frame + PathConstraintSpacingTimeline.PREV_VALUE];
                    var frameTime = frames[frame];
                    var percent = this.getCurvePercent(frame / PathConstraintSpacingTimeline.ENTRIES - 1, 1 - (time - frameTime) / (frames[frame + PathConstraintSpacingTimeline.PREV_TIME] - frameTime));
                    spacing += (frames[frame + PathConstraintSpacingTimeline.VALUE] - spacing) * percent;
                }
                if (pose == MixPose.setup)
                    constraint.spacing = constraint.data.spacing + (spacing - constraint.data.spacing) * alpha;
                else
                    constraint.spacing += (spacing - constraint.spacing) * alpha;
            };
            return PathConstraintSpacingTimeline;
        }(PathConstraintPositionTimeline));
        core.PathConstraintSpacingTimeline = PathConstraintSpacingTimeline;
        var PathConstraintMixTimeline = (function (_super) {
            __extends(PathConstraintMixTimeline, _super);
            function PathConstraintMixTimeline(frameCount) {
                var _this = _super.call(this, frameCount) || this;
                _this.frames = core.Utils.newFloatArray(frameCount * PathConstraintMixTimeline.ENTRIES);
                return _this;
            }
            PathConstraintMixTimeline.prototype.getPropertyId = function () {
                return (TimelineType.pathConstraintMix << 24) + this.pathConstraintIndex;
            };
            PathConstraintMixTimeline.prototype.setFrame = function (frameIndex, time, rotateMix, translateMix) {
                frameIndex *= PathConstraintMixTimeline.ENTRIES;
                this.frames[frameIndex] = time;
                this.frames[frameIndex + PathConstraintMixTimeline.ROTATE] = rotateMix;
                this.frames[frameIndex + PathConstraintMixTimeline.TRANSLATE] = translateMix;
            };
            PathConstraintMixTimeline.prototype.apply = function (skeleton, lastTime, time, firedEvents, alpha, pose, direction) {
                var frames = this.frames;
                var constraint = skeleton.pathConstraints[this.pathConstraintIndex];
                if (time < frames[0]) {
                    switch (pose) {
                        case MixPose.setup:
                            constraint.rotateMix = constraint.data.rotateMix;
                            constraint.translateMix = constraint.data.translateMix;
                            return;
                        case MixPose.current:
                            constraint.rotateMix += (constraint.data.rotateMix - constraint.rotateMix) * alpha;
                            constraint.translateMix += (constraint.data.translateMix - constraint.translateMix) * alpha;
                    }
                    return;
                }
                var rotate = 0, translate = 0;
                if (time >= frames[frames.length - PathConstraintMixTimeline.ENTRIES]) {
                    rotate = frames[frames.length + PathConstraintMixTimeline.PREV_ROTATE];
                    translate = frames[frames.length + PathConstraintMixTimeline.PREV_TRANSLATE];
                }
                else {
                    var frame = Animation.binarySearch(frames, time, PathConstraintMixTimeline.ENTRIES);
                    rotate = frames[frame + PathConstraintMixTimeline.PREV_ROTATE];
                    translate = frames[frame + PathConstraintMixTimeline.PREV_TRANSLATE];
                    var frameTime = frames[frame];
                    var percent = this.getCurvePercent(frame / PathConstraintMixTimeline.ENTRIES - 1, 1 - (time - frameTime) / (frames[frame + PathConstraintMixTimeline.PREV_TIME] - frameTime));
                    rotate += (frames[frame + PathConstraintMixTimeline.ROTATE] - rotate) * percent;
                    translate += (frames[frame + PathConstraintMixTimeline.TRANSLATE] - translate) * percent;
                }
                if (pose == MixPose.setup) {
                    constraint.rotateMix = constraint.data.rotateMix + (rotate - constraint.data.rotateMix) * alpha;
                    constraint.translateMix = constraint.data.translateMix + (translate - constraint.data.translateMix) * alpha;
                }
                else {
                    constraint.rotateMix += (rotate - constraint.rotateMix) * alpha;
                    constraint.translateMix += (translate - constraint.translateMix) * alpha;
                }
            };
            PathConstraintMixTimeline.ENTRIES = 3;
            PathConstraintMixTimeline.PREV_TIME = -3;
            PathConstraintMixTimeline.PREV_ROTATE = -2;
            PathConstraintMixTimeline.PREV_TRANSLATE = -1;
            PathConstraintMixTimeline.ROTATE = 1;
            PathConstraintMixTimeline.TRANSLATE = 2;
            return PathConstraintMixTimeline;
        }(CurveTimeline));
        core.PathConstraintMixTimeline = PathConstraintMixTimeline;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var AnimationState = (function () {
            function AnimationState(data) {
                this.tracks = new Array();
                this.events = new Array();
                this.listeners = new Array();
                this.queue = new EventQueue(this);
                this.propertyIDs = new core.IntSet();
                this.mixingTo = new Array();
                this.animationsChanged = false;
                this.timeScale = 1;
                this.trackEntryPool = new core.Pool(function () { return new TrackEntry(); });
                this.data = data;
            }
            AnimationState.prototype.update = function (delta) {
                delta *= this.timeScale;
                var tracks = this.tracks;
                for (var i = 0, n = tracks.length; i < n; i++) {
                    var current = tracks[i];
                    if (current == null)
                        continue;
                    current.animationLast = current.nextAnimationLast;
                    current.trackLast = current.nextTrackLast;
                    var currentDelta = delta * current.timeScale;
                    if (current.delay > 0) {
                        current.delay -= currentDelta;
                        if (current.delay > 0)
                            continue;
                        currentDelta = -current.delay;
                        current.delay = 0;
                    }
                    var next = current.next;
                    if (next != null) {
                        var nextTime = current.trackLast - next.delay;
                        if (nextTime >= 0) {
                            next.delay = 0;
                            next.trackTime = nextTime + delta * next.timeScale;
                            current.trackTime += currentDelta;
                            this.setCurrent(i, next, true);
                            while (next.mixingFrom != null) {
                                next.mixTime += currentDelta;
                                next = next.mixingFrom;
                            }
                            continue;
                        }
                    }
                    else if (current.trackLast >= current.trackEnd && current.mixingFrom == null) {
                        tracks[i] = null;
                        this.queue.end(current);
                        this.disposeNext(current);
                        continue;
                    }
                    if (current.mixingFrom != null && this.updateMixingFrom(current, delta)) {
                        var from = current.mixingFrom;
                        current.mixingFrom = null;
                        while (from != null) {
                            this.queue.end(from);
                            from = from.mixingFrom;
                        }
                    }
                    current.trackTime += currentDelta;
                }
                this.queue.drain();
            };
            AnimationState.prototype.updateMixingFrom = function (to, delta) {
                var from = to.mixingFrom;
                if (from == null)
                    return true;
                var finished = this.updateMixingFrom(from, delta);
                from.animationLast = from.nextAnimationLast;
                from.trackLast = from.nextTrackLast;
                if (to.mixTime > 0 && (to.mixTime >= to.mixDuration || to.timeScale == 0)) {
                    if (from.totalAlpha == 0) {
                        to.mixingFrom = from.mixingFrom;
                        to.interruptAlpha = from.interruptAlpha;
                        this.queue.end(from);
                    }
                    return finished;
                }
                from.trackTime += delta * from.timeScale;
                to.mixTime += delta * to.timeScale;
                return false;
            };
            AnimationState.prototype.apply = function (skeleton) {
                if (skeleton == null)
                    throw new Error("skeleton cannot be null.");
                if (this.animationsChanged)
                    this._animationsChanged();
                var events = this.events;
                var tracks = this.tracks;
                var applied = false;
                for (var i = 0, n = tracks.length; i < n; i++) {
                    var current = tracks[i];
                    if (current == null || current.delay > 0)
                        continue;
                    applied = true;
                    var currentPose = i == 0 ? core.MixPose.current : core.MixPose.currentLayered;
                    var mix = current.alpha;
                    if (current.mixingFrom != null)
                        mix *= this.applyMixingFrom(current, skeleton, currentPose);
                    else if (current.trackTime >= current.trackEnd && current.next == null)
                        mix = 0;
                    var animationLast = current.animationLast, animationTime = current.getAnimationTime();
                    var timelineCount = current.animation.timelines.length;
                    var timelines = current.animation.timelines;
                    if (mix == 1) {
                        for (var ii = 0; ii < timelineCount; ii++)
                            timelines[ii].apply(skeleton, animationLast, animationTime, events, 1, core.MixPose.setup, core.MixDirection.in);
                    }
                    else {
                        var timelineData = current.timelineData;
                        var firstFrame = current.timelinesRotation.length == 0;
                        if (firstFrame)
                            core.Utils.setArraySize(current.timelinesRotation, timelineCount << 1, null);
                        var timelinesRotation = current.timelinesRotation;
                        for (var ii = 0; ii < timelineCount; ii++) {
                            var timeline = timelines[ii];
                            var pose = timelineData[ii] >= AnimationState.FIRST ? core.MixPose.setup : currentPose;
                            if (timeline instanceof core.RotateTimeline) {
                                this.applyRotateTimeline(timeline, skeleton, animationTime, mix, pose, timelinesRotation, ii << 1, firstFrame);
                            }
                            else {
                                core.Utils.webkit602BugfixHelper(mix, pose);
                                timeline.apply(skeleton, animationLast, animationTime, events, mix, pose, core.MixDirection.in);
                            }
                        }
                    }
                    this.queueEvents(current, animationTime);
                    events.length = 0;
                    current.nextAnimationLast = animationTime;
                    current.nextTrackLast = current.trackTime;
                }
                this.queue.drain();
                return applied;
            };
            AnimationState.prototype.applyMixingFrom = function (to, skeleton, currentPose) {
                var from = to.mixingFrom;
                if (from.mixingFrom != null)
                    this.applyMixingFrom(from, skeleton, currentPose);
                var mix = 0;
                if (to.mixDuration == 0) {
                    mix = 1;
                    currentPose = core.MixPose.setup;
                }
                else {
                    mix = to.mixTime / to.mixDuration;
                    if (mix > 1)
                        mix = 1;
                }
                var events = mix < from.eventThreshold ? this.events : null;
                var attachments = mix < from.attachmentThreshold, drawOrder = mix < from.drawOrderThreshold;
                var animationLast = from.animationLast, animationTime = from.getAnimationTime();
                var timelineCount = from.animation.timelines.length;
                var timelines = from.animation.timelines;
                var timelineData = from.timelineData;
                var timelineDipMix = from.timelineDipMix;
                var firstFrame = from.timelinesRotation.length == 0;
                if (firstFrame)
                    core.Utils.setArraySize(from.timelinesRotation, timelineCount << 1, null);
                var timelinesRotation = from.timelinesRotation;
                var pose;
                var alphaDip = from.alpha * to.interruptAlpha, alphaMix = alphaDip * (1 - mix), alpha = 0;
                from.totalAlpha = 0;
                for (var i = 0; i < timelineCount; i++) {
                    var timeline = timelines[i];
                    switch (timelineData[i]) {
                        case AnimationState.SUBSEQUENT:
                            if (!attachments && timeline instanceof core.AttachmentTimeline)
                                continue;
                            if (!drawOrder && timeline instanceof core.DrawOrderTimeline)
                                continue;
                            pose = currentPose;
                            alpha = alphaMix;
                            break;
                        case AnimationState.FIRST:
                            pose = core.MixPose.setup;
                            alpha = alphaMix;
                            break;
                        case AnimationState.DIP:
                            pose = core.MixPose.setup;
                            alpha = alphaDip;
                            break;
                        default:
                            pose = core.MixPose.setup;
                            alpha = alphaDip;
                            var dipMix = timelineDipMix[i];
                            alpha *= Math.max(0, 1 - dipMix.mixTime / dipMix.mixDuration);
                            break;
                    }
                    from.totalAlpha += alpha;
                    if (timeline instanceof core.RotateTimeline)
                        this.applyRotateTimeline(timeline, skeleton, animationTime, alpha, pose, timelinesRotation, i << 1, firstFrame);
                    else {
                        timeline.apply(skeleton, animationLast, animationTime, events, alpha, pose, core.MixDirection.out);
                    }
                }
                if (to.mixDuration > 0)
                    this.queueEvents(from, animationTime);
                this.events.length = 0;
                from.nextAnimationLast = animationTime;
                from.nextTrackLast = from.trackTime;
                return mix;
            };
            AnimationState.prototype.applyRotateTimeline = function (timeline, skeleton, time, alpha, pose, timelinesRotation, i, firstFrame) {
                if (firstFrame)
                    timelinesRotation[i] = 0;
                if (alpha == 1) {
                    timeline.apply(skeleton, 0, time, null, 1, pose, core.MixDirection.in);
                    return;
                }
                var rotateTimeline = timeline;
                var frames = rotateTimeline.frames;
                var bone = skeleton.bones[rotateTimeline.boneIndex];
                if (time < frames[0]) {
                    if (pose == core.MixPose.setup)
                        bone.rotation = bone.data.rotation;
                    return;
                }
                var r2 = 0;
                if (time >= frames[frames.length - core.RotateTimeline.ENTRIES])
                    r2 = bone.data.rotation + frames[frames.length + core.RotateTimeline.PREV_ROTATION];
                else {
                    var frame = core.Animation.binarySearch(frames, time, core.RotateTimeline.ENTRIES);
                    var prevRotation = frames[frame + core.RotateTimeline.PREV_ROTATION];
                    var frameTime = frames[frame];
                    var percent = rotateTimeline.getCurvePercent((frame >> 1) - 1, 1 - (time - frameTime) / (frames[frame + core.RotateTimeline.PREV_TIME] - frameTime));
                    r2 = frames[frame + core.RotateTimeline.ROTATION] - prevRotation;
                    r2 -= (16384 - ((16384.499999999996 - r2 / 360) | 0)) * 360;
                    r2 = prevRotation + r2 * percent + bone.data.rotation;
                    r2 -= (16384 - ((16384.499999999996 - r2 / 360) | 0)) * 360;
                }
                var r1 = pose == core.MixPose.setup ? bone.data.rotation : bone.rotation;
                var total = 0, diff = r2 - r1;
                if (diff == 0) {
                    total = timelinesRotation[i];
                }
                else {
                    diff -= (16384 - ((16384.499999999996 - diff / 360) | 0)) * 360;
                    var lastTotal = 0, lastDiff = 0;
                    if (firstFrame) {
                        lastTotal = 0;
                        lastDiff = diff;
                    }
                    else {
                        lastTotal = timelinesRotation[i];
                        lastDiff = timelinesRotation[i + 1];
                    }
                    var current = diff > 0, dir = lastTotal >= 0;
                    if (core.MathUtils.signum(lastDiff) != core.MathUtils.signum(diff) && Math.abs(lastDiff) <= 90) {
                        if (Math.abs(lastTotal) > 180)
                            lastTotal += 360 * core.MathUtils.signum(lastTotal);
                        dir = current;
                    }
                    total = diff + lastTotal - lastTotal % 360;
                    if (dir != current)
                        total += 360 * core.MathUtils.signum(lastTotal);
                    timelinesRotation[i] = total;
                }
                timelinesRotation[i + 1] = diff;
                r1 += total * alpha;
                bone.rotation = r1 - (16384 - ((16384.499999999996 - r1 / 360) | 0)) * 360;
            };
            AnimationState.prototype.queueEvents = function (entry, animationTime) {
                var animationStart = entry.animationStart, animationEnd = entry.animationEnd;
                var duration = animationEnd - animationStart;
                var trackLastWrapped = entry.trackLast % duration;
                var events = this.events;
                var i = 0, n = events.length;
                for (; i < n; i++) {
                    var event_1 = events[i];
                    if (event_1.time < trackLastWrapped)
                        break;
                    if (event_1.time > animationEnd)
                        continue;
                    this.queue.event(entry, event_1);
                }
                if (entry.loop ? (trackLastWrapped > entry.trackTime % duration)
                    : (animationTime >= animationEnd && entry.animationLast < animationEnd)) {
                    this.queue.complete(entry);
                }
                for (; i < n; i++) {
                    var event_2 = events[i];
                    if (event_2.time < animationStart)
                        continue;
                    this.queue.event(entry, events[i]);
                }
            };
            AnimationState.prototype.clearTracks = function () {
                var oldDrainDisabled = this.queue.drainDisabled;
                this.queue.drainDisabled = true;
                for (var i = 0, n = this.tracks.length; i < n; i++)
                    this.clearTrack(i);
                this.tracks.length = 0;
                this.queue.drainDisabled = oldDrainDisabled;
                this.queue.drain();
            };
            AnimationState.prototype.clearTrack = function (trackIndex) {
                if (trackIndex >= this.tracks.length)
                    return;
                var current = this.tracks[trackIndex];
                if (current == null)
                    return;
                this.queue.end(current);
                this.disposeNext(current);
                var entry = current;
                while (true) {
                    var from = entry.mixingFrom;
                    if (from == null)
                        break;
                    this.queue.end(from);
                    entry.mixingFrom = null;
                    entry = from;
                }
                this.tracks[current.trackIndex] = null;
                this.queue.drain();
            };
            AnimationState.prototype.setCurrent = function (index, current, interrupt) {
                var from = this.expandToIndex(index);
                this.tracks[index] = current;
                if (from != null) {
                    if (interrupt)
                        this.queue.interrupt(from);
                    current.mixingFrom = from;
                    current.mixTime = 0;
                    if (from.mixingFrom != null && from.mixDuration > 0)
                        current.interruptAlpha *= Math.min(1, from.mixTime / from.mixDuration);
                    from.timelinesRotation.length = 0;
                }
                this.queue.start(current);
            };
            AnimationState.prototype.setAnimation = function (trackIndex, animationName, loop) {
                var animation = this.data.skeletonData.findAnimation(animationName);
                if (animation == null)
                    throw new Error("Animation not found: " + animationName);
                return this.setAnimationWith(trackIndex, animation, loop);
            };
            AnimationState.prototype.setAnimationWith = function (trackIndex, animation, loop) {
                if (animation == null)
                    throw new Error("animation cannot be null.");
                var interrupt = true;
                var current = this.expandToIndex(trackIndex);
                if (current != null) {
                    if (current.nextTrackLast == -1) {
                        this.tracks[trackIndex] = current.mixingFrom;
                        this.queue.interrupt(current);
                        this.queue.end(current);
                        this.disposeNext(current);
                        current = current.mixingFrom;
                        interrupt = false;
                    }
                    else
                        this.disposeNext(current);
                }
                var entry = this.trackEntry(trackIndex, animation, loop, current);
                this.setCurrent(trackIndex, entry, interrupt);
                this.queue.drain();
                return entry;
            };
            AnimationState.prototype.addAnimation = function (trackIndex, animationName, loop, delay) {
                if (delay === void 0) { delay = 0; }
                var animation = this.data.skeletonData.findAnimation(animationName);
                if (animation == null)
                    throw new Error("Animation not found: " + animationName);
                return this.addAnimationWith(trackIndex, animation, loop, delay);
            };
            AnimationState.prototype.addAnimationWith = function (trackIndex, animation, loop, delay) {
                if (delay === void 0) { delay = 0; }
                if (animation == null)
                    throw new Error("animation cannot be null.");
                var last = this.expandToIndex(trackIndex);
                if (last != null) {
                    while (last.next != null)
                        last = last.next;
                }
                var entry = this.trackEntry(trackIndex, animation, loop, last);
                if (last == null) {
                    this.setCurrent(trackIndex, entry, true);
                    this.queue.drain();
                }
                else {
                    last.next = entry;
                    if (delay <= 0) {
                        var duration = last.animationEnd - last.animationStart;
                        if (duration != 0) {
                            if (last.loop)
                                delay += duration * (1 + ((last.trackTime / duration) | 0));
                            else
                                delay += duration;
                            delay -= this.data.getMix(last.animation, animation);
                        }
                        else
                            delay = 0;
                    }
                }
                entry.delay = delay;
                return entry;
            };
            AnimationState.prototype.setEmptyAnimation = function (trackIndex, mixDuration) {
                var entry = this.setAnimationWith(trackIndex, AnimationState.emptyAnimation, false);
                entry.mixDuration = mixDuration;
                entry.trackEnd = mixDuration;
                return entry;
            };
            AnimationState.prototype.addEmptyAnimation = function (trackIndex, mixDuration, delay) {
                if (delay <= 0)
                    delay -= mixDuration;
                var entry = this.addAnimationWith(trackIndex, AnimationState.emptyAnimation, false, delay);
                entry.mixDuration = mixDuration;
                entry.trackEnd = mixDuration;
                return entry;
            };
            AnimationState.prototype.setEmptyAnimations = function (mixDuration) {
                var oldDrainDisabled = this.queue.drainDisabled;
                this.queue.drainDisabled = true;
                for (var i = 0, n = this.tracks.length; i < n; i++) {
                    var current = this.tracks[i];
                    if (current != null)
                        this.setEmptyAnimation(current.trackIndex, mixDuration);
                }
                this.queue.drainDisabled = oldDrainDisabled;
                this.queue.drain();
            };
            AnimationState.prototype.expandToIndex = function (index) {
                if (index < this.tracks.length)
                    return this.tracks[index];
                core.Utils.ensureArrayCapacity(this.tracks, index - this.tracks.length + 1, null);
                this.tracks.length = index + 1;
                return null;
            };
            AnimationState.prototype.trackEntry = function (trackIndex, animation, loop, last) {
                var entry = this.trackEntryPool.obtain();
                entry.trackIndex = trackIndex;
                entry.animation = animation;
                entry.loop = loop;
                entry.eventThreshold = 0;
                entry.attachmentThreshold = 0;
                entry.drawOrderThreshold = 0;
                entry.animationStart = 0;
                entry.animationEnd = animation.duration;
                entry.animationLast = -1;
                entry.nextAnimationLast = -1;
                entry.delay = 0;
                entry.trackTime = 0;
                entry.trackLast = -1;
                entry.nextTrackLast = -1;
                entry.trackEnd = Number.MAX_VALUE;
                entry.timeScale = 1;
                entry.alpha = 1;
                entry.interruptAlpha = 1;
                entry.mixTime = 0;
                entry.mixDuration = last == null ? 0 : this.data.getMix(last.animation, animation);
                return entry;
            };
            AnimationState.prototype.disposeNext = function (entry) {
                var next = entry.next;
                while (next != null) {
                    this.queue.dispose(next);
                    next = next.next;
                }
                entry.next = null;
            };
            AnimationState.prototype._animationsChanged = function () {
                this.animationsChanged = false;
                var propertyIDs = this.propertyIDs;
                propertyIDs.clear();
                var mixingTo = this.mixingTo;
                var lastEntry = null;
                for (var i = 0, n = this.tracks.length; i < n; i++) {
                    var entry = this.tracks[i];
                    if (entry != null)
                        entry.setTimelineData(null, mixingTo, propertyIDs);
                }
            };
            AnimationState.prototype.getCurrent = function (trackIndex) {
                if (trackIndex >= this.tracks.length)
                    return null;
                return this.tracks[trackIndex];
            };
            AnimationState.prototype.addListener = function (listener) {
                if (listener == null)
                    throw new Error("listener cannot be null.");
                var index = this.listeners.indexOf(listener);
                if (index == -1)
                    this.listeners.push(listener);
            };
            AnimationState.prototype.removeListener = function (listener) {
                var index = this.listeners.indexOf(listener);
                if (index >= 0)
                    this.listeners.splice(index, 1);
            };
            AnimationState.prototype.clearListeners = function () {
                this.listeners.length = 0;
            };
            AnimationState.prototype.clearListenerNotifications = function () {
                this.queue.clear();
            };
            AnimationState.prototype.setAnimationByName = function (trackIndex, animationName, loop) {
                if (!AnimationState.deprecatedWarning1) {
                    AnimationState.deprecatedWarning1 = true;
                    console.warn("Deprecation Warning: AnimationState.setAnimationByName is deprecated, please use setAnimation from now on.");
                }
                this.setAnimation(trackIndex, animationName, loop);
            };
            AnimationState.prototype.addAnimationByName = function (trackIndex, animationName, loop, delay) {
                if (!AnimationState.deprecatedWarning2) {
                    AnimationState.deprecatedWarning2 = true;
                    console.warn("Deprecation Warning: AnimationState.addAnimationByName is deprecated, please use addAnimation from now on.");
                }
                this.addAnimation(trackIndex, animationName, loop, delay);
            };
            AnimationState.prototype.hasAnimation = function (animationName) {
                var animation = this.data.skeletonData.findAnimation(animationName);
                return animation !== null;
            };
            AnimationState.prototype.hasAnimationByName = function (animationName) {
                if (!AnimationState.deprecatedWarning3) {
                    AnimationState.deprecatedWarning3 = true;
                    console.warn("Deprecation Warning: AnimationState.hasAnimationByName is deprecated, please use hasAnimation from now on.");
                }
                return this.hasAnimation(animationName);
            };
            AnimationState.emptyAnimation = new core.Animation("<empty>", [], 0);
            AnimationState.SUBSEQUENT = 0;
            AnimationState.FIRST = 1;
            AnimationState.DIP = 2;
            AnimationState.DIP_MIX = 3;
            AnimationState.deprecatedWarning1 = false;
            AnimationState.deprecatedWarning2 = false;
            AnimationState.deprecatedWarning3 = false;
            return AnimationState;
        }());
        core.AnimationState = AnimationState;
        var TrackEntry = (function () {
            function TrackEntry() {
                this.timelineData = new Array();
                this.timelineDipMix = new Array();
                this.timelinesRotation = new Array();
            }
            TrackEntry.prototype.reset = function () {
                this.next = null;
                this.mixingFrom = null;
                this.animation = null;
                this.listener = null;
                this.timelineData.length = 0;
                this.timelineDipMix.length = 0;
                this.timelinesRotation.length = 0;
            };
            TrackEntry.prototype.setTimelineData = function (to, mixingToArray, propertyIDs) {
                if (to != null)
                    mixingToArray.push(to);
                var lastEntry = this.mixingFrom != null ? this.mixingFrom.setTimelineData(this, mixingToArray, propertyIDs) : this;
                if (to != null)
                    mixingToArray.pop();
                var mixingTo = mixingToArray;
                var mixingToLast = mixingToArray.length - 1;
                var timelines = this.animation.timelines;
                var timelinesCount = this.animation.timelines.length;
                var timelineData = core.Utils.setArraySize(this.timelineData, timelinesCount);
                this.timelineDipMix.length = 0;
                var timelineDipMix = core.Utils.setArraySize(this.timelineDipMix, timelinesCount);
                outer: for (var i = 0; i < timelinesCount; i++) {
                    var id = timelines[i].getPropertyId();
                    if (!propertyIDs.add(id))
                        timelineData[i] = AnimationState.SUBSEQUENT;
                    else if (to == null || !to.hasTimeline(id))
                        timelineData[i] = AnimationState.FIRST;
                    else {
                        for (var ii = mixingToLast; ii >= 0; ii--) {
                            var entry = mixingTo[ii];
                            if (!entry.hasTimeline(id)) {
                                if (entry.mixDuration > 0) {
                                    timelineData[i] = AnimationState.DIP_MIX;
                                    timelineDipMix[i] = entry;
                                    continue outer;
                                }
                            }
                        }
                        timelineData[i] = AnimationState.DIP;
                    }
                }
                return lastEntry;
            };
            TrackEntry.prototype.hasTimeline = function (id) {
                var timelines = this.animation.timelines;
                for (var i = 0, n = timelines.length; i < n; i++)
                    if (timelines[i].getPropertyId() == id)
                        return true;
                return false;
            };
            TrackEntry.prototype.getAnimationTime = function () {
                if (this.loop) {
                    var duration = this.animationEnd - this.animationStart;
                    if (duration == 0)
                        return this.animationStart;
                    return (this.trackTime % duration) + this.animationStart;
                }
                return Math.min(this.trackTime + this.animationStart, this.animationEnd);
            };
            TrackEntry.prototype.setAnimationLast = function (animationLast) {
                this.animationLast = animationLast;
                this.nextAnimationLast = animationLast;
            };
            TrackEntry.prototype.isComplete = function () {
                return this.trackTime >= this.animationEnd - this.animationStart;
            };
            TrackEntry.prototype.resetRotationDirections = function () {
                this.timelinesRotation.length = 0;
            };
            Object.defineProperty(TrackEntry.prototype, "time", {
                get: function () {
                    if (!TrackEntry.deprecatedWarning1) {
                        TrackEntry.deprecatedWarning1 = true;
                        console.warn("Deprecation Warning: TrackEntry.time is deprecated, please use trackTime from now on.");
                    }
                    return this.trackTime;
                },
                set: function (value) {
                    if (!TrackEntry.deprecatedWarning1) {
                        TrackEntry.deprecatedWarning1 = true;
                        console.warn("Deprecation Warning: TrackEntry.time is deprecated, please use trackTime from now on.");
                    }
                    this.trackTime = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TrackEntry.prototype, "endTime", {
                get: function () {
                    if (!TrackEntry.deprecatedWarning2) {
                        TrackEntry.deprecatedWarning2 = true;
                        console.warn("Deprecation Warning: TrackEntry.endTime is deprecated, please use trackEnd from now on.");
                    }
                    return this.trackTime;
                },
                set: function (value) {
                    if (!TrackEntry.deprecatedWarning2) {
                        TrackEntry.deprecatedWarning2 = true;
                        console.warn("Deprecation Warning: TrackEntry.endTime is deprecated, please use trackEnd from now on.");
                    }
                    this.trackTime = value;
                },
                enumerable: true,
                configurable: true
            });
            TrackEntry.prototype.loopsCount = function () {
                return Math.floor(this.trackTime / this.trackEnd);
            };
            TrackEntry.deprecatedWarning1 = false;
            TrackEntry.deprecatedWarning2 = false;
            return TrackEntry;
        }());
        core.TrackEntry = TrackEntry;
        var EventQueue = (function () {
            function EventQueue(animState) {
                this.objects = [];
                this.drainDisabled = false;
                this.animState = animState;
            }
            EventQueue.prototype.start = function (entry) {
                this.objects.push(EventType.start);
                this.objects.push(entry);
                this.animState.animationsChanged = true;
            };
            EventQueue.prototype.interrupt = function (entry) {
                this.objects.push(EventType.interrupt);
                this.objects.push(entry);
            };
            EventQueue.prototype.end = function (entry) {
                this.objects.push(EventType.end);
                this.objects.push(entry);
                this.animState.animationsChanged = true;
            };
            EventQueue.prototype.dispose = function (entry) {
                this.objects.push(EventType.dispose);
                this.objects.push(entry);
            };
            EventQueue.prototype.complete = function (entry) {
                this.objects.push(EventType.complete);
                this.objects.push(entry);
            };
            EventQueue.prototype.event = function (entry, event) {
                this.objects.push(EventType.event);
                this.objects.push(entry);
                this.objects.push(event);
            };
            EventQueue.prototype.deprecateStuff = function () {
                if (!EventQueue.deprecatedWarning1) {
                    EventQueue.deprecatedWarning1 = true;
                    console.warn("Deprecation Warning: onComplete, onStart, onEnd, onEvent art deprecated, please use listeners from now on. 'state.addListener({ complete: function(track, event) { } })'");
                }
                return true;
            };
            EventQueue.prototype.drain = function () {
                if (this.drainDisabled)
                    return;
                this.drainDisabled = true;
                var objects = this.objects;
                var listeners = this.animState.listeners;
                for (var i = 0; i < objects.length; i += 2) {
                    var type = objects[i];
                    var entry = objects[i + 1];
                    switch (type) {
                        case EventType.start:
                            if (entry.listener != null && entry.listener.start)
                                entry.listener.start(entry);
                            for (var ii = 0; ii < listeners.length; ii++)
                                if (listeners[ii].start)
                                    listeners[ii].start(entry);
                            entry.onStart && this.deprecateStuff() && entry.onStart(entry.trackIndex);
                            this.animState.onStart && this.deprecateStuff() && this.deprecateStuff && this.animState.onStart(entry.trackIndex);
                            break;
                        case EventType.interrupt:
                            if (entry.listener != null && entry.listener.interrupt)
                                entry.listener.interrupt(entry);
                            for (var ii = 0; ii < listeners.length; ii++)
                                if (listeners[ii].interrupt)
                                    listeners[ii].interrupt(entry);
                            break;
                        case EventType.end:
                            if (entry.listener != null && entry.listener.end)
                                entry.listener.end(entry);
                            for (var ii = 0; ii < listeners.length; ii++)
                                if (listeners[ii].end)
                                    listeners[ii].end(entry);
                            entry.onEnd && this.deprecateStuff() && entry.onEnd(entry.trackIndex);
                            this.animState.onEnd && this.deprecateStuff() && this.animState.onEnd(entry.trackIndex);
                        case EventType.dispose:
                            if (entry.listener != null && entry.listener.dispose)
                                entry.listener.dispose(entry);
                            for (var ii = 0; ii < listeners.length; ii++)
                                if (listeners[ii].dispose)
                                    listeners[ii].dispose(entry);
                            this.animState.trackEntryPool.free(entry);
                            break;
                        case EventType.complete:
                            if (entry.listener != null && entry.listener.complete)
                                entry.listener.complete(entry);
                            for (var ii = 0; ii < listeners.length; ii++)
                                if (listeners[ii].complete)
                                    listeners[ii].complete(entry);
                            var count = core.MathUtils.toInt(entry.loopsCount());
                            entry.onComplete && this.deprecateStuff() && entry.onComplete(entry.trackIndex, count);
                            this.animState.onComplete && this.deprecateStuff() && this.animState.onComplete(entry.trackIndex, count);
                            break;
                        case EventType.event:
                            var event_3 = objects[i++ + 2];
                            if (entry.listener != null && entry.listener.event)
                                entry.listener.event(entry, event_3);
                            for (var ii = 0; ii < listeners.length; ii++)
                                if (listeners[ii].event)
                                    listeners[ii].event(entry, event_3);
                            entry.onEvent && this.deprecateStuff() && entry.onEvent(entry.trackIndex, event_3);
                            this.animState.onEvent && this.deprecateStuff() && this.animState.onEvent(entry.trackIndex, event_3);
                            break;
                    }
                }
                this.clear();
                this.drainDisabled = false;
            };
            EventQueue.prototype.clear = function () {
                this.objects.length = 0;
            };
            EventQueue.deprecatedWarning1 = false;
            return EventQueue;
        }());
        core.EventQueue = EventQueue;
        var EventType;
        (function (EventType) {
            EventType[EventType["start"] = 0] = "start";
            EventType[EventType["interrupt"] = 1] = "interrupt";
            EventType[EventType["end"] = 2] = "end";
            EventType[EventType["dispose"] = 3] = "dispose";
            EventType[EventType["complete"] = 4] = "complete";
            EventType[EventType["event"] = 5] = "event";
        })(EventType = core.EventType || (core.EventType = {}));
        var AnimationStateAdapter2 = (function () {
            function AnimationStateAdapter2() {
            }
            AnimationStateAdapter2.prototype.start = function (entry) {
            };
            AnimationStateAdapter2.prototype.interrupt = function (entry) {
            };
            AnimationStateAdapter2.prototype.end = function (entry) {
            };
            AnimationStateAdapter2.prototype.dispose = function (entry) {
            };
            AnimationStateAdapter2.prototype.complete = function (entry) {
            };
            AnimationStateAdapter2.prototype.event = function (entry, event) {
            };
            return AnimationStateAdapter2;
        }());
        core.AnimationStateAdapter2 = AnimationStateAdapter2;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var AnimationStateData = (function () {
            function AnimationStateData(skeletonData) {
                this.animationToMixTime = {};
                this.defaultMix = 0;
                if (skeletonData == null)
                    throw new Error("skeletonData cannot be null.");
                this.skeletonData = skeletonData;
            }
            AnimationStateData.prototype.setMix = function (fromName, toName, duration) {
                var from = this.skeletonData.findAnimation(fromName);
                if (from == null)
                    throw new Error("Animation not found: " + fromName);
                var to = this.skeletonData.findAnimation(toName);
                if (to == null)
                    throw new Error("Animation not found: " + toName);
                this.setMixWith(from, to, duration);
            };
            AnimationStateData.prototype.setMixByName = function (fromName, toName, duration) {
                if (!AnimationStateData.deprecatedWarning1) {
                    AnimationStateData.deprecatedWarning1 = true;
                    console.warn("Deprecation Warning: AnimationStateData.setMixByName is deprecated, please use setMix from now on.");
                }
                this.setMix(fromName, toName, duration);
            };
            AnimationStateData.prototype.setMixWith = function (from, to, duration) {
                if (from == null)
                    throw new Error("from cannot be null.");
                if (to == null)
                    throw new Error("to cannot be null.");
                var key = from.name + "." + to.name;
                this.animationToMixTime[key] = duration;
            };
            AnimationStateData.prototype.getMix = function (from, to) {
                var key = from.name + "." + to.name;
                var value = this.animationToMixTime[key];
                return value === undefined ? this.defaultMix : value;
            };
            AnimationStateData.deprecatedWarning1 = false;
            return AnimationStateData;
        }());
        core.AnimationStateData = AnimationStateData;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var AtlasAttachmentLoader = (function () {
            function AtlasAttachmentLoader(atlas) {
                this.atlas = atlas;
            }
            AtlasAttachmentLoader.prototype.newRegionAttachment = function (skin, name, path) {
                var region = this.atlas.findRegion(path);
                if (region == null)
                    throw new Error("Region not found in atlas: " + path + " (region attachment: " + name + ")");
                var attachment = new core.RegionAttachment(name);
                attachment.region = region;
                return attachment;
            };
            AtlasAttachmentLoader.prototype.newMeshAttachment = function (skin, name, path) {
                var region = this.atlas.findRegion(path);
                if (region == null)
                    throw new Error("Region not found in atlas: " + path + " (mesh attachment: " + name + ")");
                var attachment = new core.MeshAttachment(name);
                attachment.region = region;
                return attachment;
            };
            AtlasAttachmentLoader.prototype.newBoundingBoxAttachment = function (skin, name) {
                return new core.BoundingBoxAttachment(name);
            };
            AtlasAttachmentLoader.prototype.newPathAttachment = function (skin, name) {
                return new core.PathAttachment(name);
            };
            AtlasAttachmentLoader.prototype.newPointAttachment = function (skin, name) {
                return new core.PointAttachment(name);
            };
            AtlasAttachmentLoader.prototype.newClippingAttachment = function (skin, name) {
                return new core.ClippingAttachment(name);
            };
            return AtlasAttachmentLoader;
        }());
        core.AtlasAttachmentLoader = AtlasAttachmentLoader;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var BlendMode;
        (function (BlendMode) {
            BlendMode[BlendMode["Normal"] = 0] = "Normal";
            BlendMode[BlendMode["Additive"] = 1] = "Additive";
            BlendMode[BlendMode["Multiply"] = 2] = "Multiply";
            BlendMode[BlendMode["Screen"] = 3] = "Screen";
        })(BlendMode = core.BlendMode || (core.BlendMode = {}));
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var Bone = (function () {
            function Bone(data, skeleton, parent) {
                this.matrix = new PIXI.Matrix();
                this.children = new Array();
                this.x = 0;
                this.y = 0;
                this.rotation = 0;
                this.scaleX = 0;
                this.scaleY = 0;
                this.shearX = 0;
                this.shearY = 0;
                this.ax = 0;
                this.ay = 0;
                this.arotation = 0;
                this.ascaleX = 0;
                this.ascaleY = 0;
                this.ashearX = 0;
                this.ashearY = 0;
                this.appliedValid = false;
                this.sorted = false;
                if (data == null)
                    throw new Error("data cannot be null.");
                if (skeleton == null)
                    throw new Error("skeleton cannot be null.");
                this.data = data;
                this.skeleton = skeleton;
                this.parent = parent;
                this.setToSetupPose();
            }
            Object.defineProperty(Bone.prototype, "worldX", {
                get: function () {
                    return this.matrix.tx;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Bone.prototype, "worldY", {
                get: function () {
                    return this.matrix.ty;
                },
                enumerable: true,
                configurable: true
            });
            Bone.prototype.update = function () {
                this.updateWorldTransformWith(this.x, this.y, this.rotation, this.scaleX, this.scaleY, this.shearX, this.shearY);
            };
            Bone.prototype.updateWorldTransform = function () {
                this.updateWorldTransformWith(this.x, this.y, this.rotation, this.scaleX, this.scaleY, this.shearX, this.shearY);
            };
            Bone.prototype.updateWorldTransformWith = function (x, y, rotation, scaleX, scaleY, shearX, shearY) {
                this.ax = x;
                this.ay = y;
                this.arotation = rotation;
                this.ascaleX = scaleX;
                this.ascaleY = scaleY;
                this.ashearX = shearX;
                this.ashearY = shearY;
                this.appliedValid = true;
                var parent = this.parent;
                var m = this.matrix;
                if (parent == null) {
                    var rotationY = rotation + 90 + shearY;
                    var la = core.MathUtils.cosDeg(rotation + shearX) * scaleX;
                    var lb = core.MathUtils.cosDeg(rotationY) * scaleY;
                    var lc = core.MathUtils.sinDeg(rotation + shearX) * scaleX;
                    var ld = core.MathUtils.sinDeg(rotationY) * scaleY;
                    var skeleton = this.skeleton;
                    if (skeleton.flipX) {
                        x = -x;
                        la = -la;
                        lb = -lb;
                    }
                    if (skeleton.flipY !== Bone.yDown) {
                        y = -y;
                        lc = -lc;
                        ld = -ld;
                    }
                    m.a = la;
                    m.c = lb;
                    m.b = lc;
                    m.d = ld;
                    m.tx = x + skeleton.x;
                    m.ty = y + skeleton.y;
                    return;
                }
                var pa = parent.matrix.a, pb = parent.matrix.c, pc = parent.matrix.b, pd = parent.matrix.d;
                m.tx = pa * x + pb * y + parent.matrix.tx;
                m.ty = pc * x + pd * y + parent.matrix.ty;
                switch (this.data.transformMode) {
                    case core.TransformMode.Normal: {
                        var rotationY = rotation + 90 + shearY;
                        var la = core.MathUtils.cosDeg(rotation + shearX) * scaleX;
                        var lb = core.MathUtils.cosDeg(rotationY) * scaleY;
                        var lc = core.MathUtils.sinDeg(rotation + shearX) * scaleX;
                        var ld = core.MathUtils.sinDeg(rotationY) * scaleY;
                        m.a = pa * la + pb * lc;
                        m.c = pa * lb + pb * ld;
                        m.b = pc * la + pd * lc;
                        m.d = pc * lb + pd * ld;
                        return;
                    }
                    case core.TransformMode.OnlyTranslation: {
                        var rotationY = rotation + 90 + shearY;
                        m.a = core.MathUtils.cosDeg(rotation + shearX) * scaleX;
                        m.c = core.MathUtils.cosDeg(rotationY) * scaleY;
                        m.b = core.MathUtils.sinDeg(rotation + shearX) * scaleX;
                        m.d = core.MathUtils.sinDeg(rotationY) * scaleY;
                        break;
                    }
                    case core.TransformMode.NoRotationOrReflection: {
                        var s = pa * pa + pc * pc;
                        var prx = 0;
                        if (s > 0.0001) {
                            s = Math.abs(pa * pd - pb * pc) / s;
                            pb = pc * s;
                            pd = pa * s;
                            prx = Math.atan2(pc, pa) * core.MathUtils.radDeg;
                        }
                        else {
                            pa = 0;
                            pc = 0;
                            prx = 90 - Math.atan2(pd, pb) * core.MathUtils.radDeg;
                        }
                        var rx = rotation + shearX - prx;
                        var ry = rotation + shearY - prx + 90;
                        var la = core.MathUtils.cosDeg(rx) * scaleX;
                        var lb = core.MathUtils.cosDeg(ry) * scaleY;
                        var lc = core.MathUtils.sinDeg(rx) * scaleX;
                        var ld = core.MathUtils.sinDeg(ry) * scaleY;
                        m.a = pa * la - pb * lc;
                        m.c = pa * lb - pb * ld;
                        m.b = pc * la + pd * lc;
                        m.d = pc * lb + pd * ld;
                        break;
                    }
                    case core.TransformMode.NoScale:
                    case core.TransformMode.NoScaleOrReflection: {
                        var cos = core.MathUtils.cosDeg(rotation);
                        var sin = core.MathUtils.sinDeg(rotation);
                        var za = pa * cos + pb * sin;
                        var zc = pc * cos + pd * sin;
                        var s = Math.sqrt(za * za + zc * zc);
                        if (s > 0.00001)
                            s = 1 / s;
                        za *= s;
                        zc *= s;
                        s = Math.sqrt(za * za + zc * zc);
                        var r = Math.PI / 2 + Math.atan2(zc, za);
                        var zb = Math.cos(r) * s;
                        var zd = Math.sin(r) * s;
                        var la = core.MathUtils.cosDeg(shearX) * scaleX;
                        var lb = core.MathUtils.cosDeg(90 + shearY) * scaleY;
                        var lc = core.MathUtils.sinDeg(shearX) * scaleX;
                        var ld = core.MathUtils.sinDeg(90 + shearY) * scaleY;
                        if (this.data.transformMode != core.TransformMode.NoScaleOrReflection ? pa * pd - pb * pc < 0 : ((this.skeleton.flipX != this.skeleton.flipY) != Bone.yDown)) {
                            zb = -zb;
                            zd = -zd;
                        }
                        m.a = za * la + zb * lc;
                        m.c = za * lb + zb * ld;
                        m.b = zc * la + zd * lc;
                        m.d = zc * lb + zd * ld;
                        return;
                    }
                }
                if (this.skeleton.flipX) {
                    m.a = -m.a;
                    m.c = -m.c;
                }
                if (this.skeleton.flipY != Bone.yDown) {
                    m.b = -m.b;
                    m.d = -m.d;
                }
            };
            Bone.prototype.setToSetupPose = function () {
                var data = this.data;
                this.x = data.x;
                this.y = data.y;
                this.rotation = data.rotation;
                this.scaleX = data.scaleX;
                this.scaleY = data.scaleY;
                this.shearX = data.shearX;
                this.shearY = data.shearY;
            };
            Bone.prototype.getWorldRotationX = function () {
                return Math.atan2(this.matrix.b, this.matrix.a) * core.MathUtils.radDeg;
            };
            Bone.prototype.getWorldRotationY = function () {
                return Math.atan2(this.matrix.d, this.matrix.c) * core.MathUtils.radDeg;
            };
            Bone.prototype.getWorldScaleX = function () {
                var m = this.matrix;
                return Math.sqrt(m.a * m.a + m.c * m.c);
            };
            Bone.prototype.getWorldScaleY = function () {
                var m = this.matrix;
                return Math.sqrt(m.b * m.b + m.d * m.d);
            };
            Bone.prototype.updateAppliedTransform = function () {
                this.appliedValid = true;
                var parent = this.parent;
                var m = this.matrix;
                if (parent == null) {
                    this.ax = m.tx;
                    this.ay = m.ty;
                    this.arotation = Math.atan2(m.b, m.a) * core.MathUtils.radDeg;
                    this.ascaleX = Math.sqrt(m.a * m.a + m.b * m.b);
                    this.ascaleY = Math.sqrt(m.c * m.c + m.d * m.d);
                    this.ashearX = 0;
                    this.ashearY = Math.atan2(m.a * m.c + m.b * m.d, m.a * m.d - m.b * m.c) * core.MathUtils.radDeg;
                    return;
                }
                var pm = parent.matrix;
                var pid = 1 / (pm.a * pm.d - pm.b * pm.c);
                var dx = m.tx - pm.tx, dy = m.ty - pm.ty;
                this.ax = (dx * pm.d * pid - dy * pm.c * pid);
                this.ay = (dy * pm.a * pid - dx * pm.b * pid);
                var ia = pid * pm.d;
                var id = pid * pm.a;
                var ib = pid * pm.c;
                var ic = pid * pm.b;
                var ra = ia * m.a - ib * m.b;
                var rb = ia * m.c - ib * m.d;
                var rc = id * m.b - ic * m.a;
                var rd = id * m.d - ic * m.c;
                this.ashearX = 0;
                this.ascaleX = Math.sqrt(ra * ra + rc * rc);
                if (this.ascaleX > 0.0001) {
                    var det = ra * rd - rb * rc;
                    this.ascaleY = det / this.ascaleX;
                    this.ashearY = Math.atan2(ra * rb + rc * rd, det) * core.MathUtils.radDeg;
                    this.arotation = Math.atan2(rc, ra) * core.MathUtils.radDeg;
                }
                else {
                    this.ascaleX = 0;
                    this.ascaleY = Math.sqrt(rb * rb + rd * rd);
                    this.ashearY = 0;
                    this.arotation = 90 - Math.atan2(rd, rb) * core.MathUtils.radDeg;
                }
            };
            Bone.prototype.worldToLocal = function (world) {
                var m = this.matrix;
                var a = m.a, b = m.c, c = m.b, d = m.d;
                var invDet = 1 / (a * d - b * c);
                var x = world.x - m.tx, y = world.y - m.ty;
                world.x = (x * d * invDet - y * b * invDet);
                world.y = (y * a * invDet - x * c * invDet);
                return world;
            };
            Bone.prototype.localToWorld = function (local) {
                var m = this.matrix;
                var x = local.x, y = local.y;
                local.x = x * m.a + y * m.c + m.tx;
                local.y = x * m.b + y * m.d + m.ty;
                return local;
            };
            Bone.prototype.worldToLocalRotation = function (worldRotation) {
                var sin = core.MathUtils.sinDeg(worldRotation), cos = core.MathUtils.cosDeg(worldRotation);
                var mat = this.matrix;
                return Math.atan2(mat.a * sin - mat.b * cos, mat.d * cos - mat.c * sin) * core.MathUtils.radDeg;
            };
            Bone.prototype.localToWorldRotation = function (localRotation) {
                var sin = core.MathUtils.sinDeg(localRotation), cos = core.MathUtils.cosDeg(localRotation);
                var mat = this.matrix;
                return Math.atan2(cos * mat.b + sin * mat.d, cos * mat.a + sin * mat.c) * core.MathUtils.radDeg;
            };
            Bone.prototype.rotateWorld = function (degrees) {
                var mat = this.matrix;
                var a = mat.a, b = mat.c, c = mat.b, d = mat.d;
                var cos = core.MathUtils.cosDeg(degrees), sin = core.MathUtils.sinDeg(degrees);
                mat.a = cos * a - sin * c;
                mat.c = cos * b - sin * d;
                mat.b = sin * a + cos * c;
                mat.d = sin * b + cos * d;
                this.appliedValid = false;
            };
            Bone.yDown = false;
            return Bone;
        }());
        core.Bone = Bone;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var BoneData = (function () {
            function BoneData(index, name, parent) {
                this.x = 0;
                this.y = 0;
                this.rotation = 0;
                this.scaleX = 1;
                this.scaleY = 1;
                this.shearX = 0;
                this.shearY = 0;
                this.transformMode = TransformMode.Normal;
                if (index < 0)
                    throw new Error("index must be >= 0.");
                if (name == null)
                    throw new Error("name cannot be null.");
                this.index = index;
                this.name = name;
                this.parent = parent;
            }
            return BoneData;
        }());
        core.BoneData = BoneData;
        var TransformMode;
        (function (TransformMode) {
            TransformMode[TransformMode["Normal"] = 0] = "Normal";
            TransformMode[TransformMode["OnlyTranslation"] = 1] = "OnlyTranslation";
            TransformMode[TransformMode["NoRotationOrReflection"] = 2] = "NoRotationOrReflection";
            TransformMode[TransformMode["NoScale"] = 3] = "NoScale";
            TransformMode[TransformMode["NoScaleOrReflection"] = 4] = "NoScaleOrReflection";
        })(TransformMode = core.TransformMode || (core.TransformMode = {}));
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var Event = (function () {
            function Event(time, data) {
                if (data == null)
                    throw new Error("data cannot be null.");
                this.time = time;
                this.data = data;
            }
            return Event;
        }());
        core.Event = Event;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var EventData = (function () {
            function EventData(name) {
                this.name = name;
            }
            return EventData;
        }());
        core.EventData = EventData;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var IkConstraint = (function () {
            function IkConstraint(data, skeleton) {
                this.mix = 1;
                this.bendDirection = 0;
                if (data == null)
                    throw new Error("data cannot be null.");
                if (skeleton == null)
                    throw new Error("skeleton cannot be null.");
                this.data = data;
                this.mix = data.mix;
                this.bendDirection = data.bendDirection;
                this.bones = new Array();
                for (var i = 0; i < data.bones.length; i++)
                    this.bones.push(skeleton.findBone(data.bones[i].name));
                this.target = skeleton.findBone(data.target.name);
            }
            IkConstraint.prototype.getOrder = function () {
                return this.data.order;
            };
            IkConstraint.prototype.apply = function () {
                this.update();
            };
            IkConstraint.prototype.update = function () {
                var target = this.target;
                var bones = this.bones;
                switch (bones.length) {
                    case 1:
                        this.apply1(bones[0], target.worldX, target.worldY, this.mix);
                        break;
                    case 2:
                        this.apply2(bones[0], bones[1], target.worldX, target.worldY, this.bendDirection, this.mix);
                        break;
                }
            };
            IkConstraint.prototype.apply1 = function (bone, targetX, targetY, alpha) {
                if (!bone.appliedValid)
                    bone.updateAppliedTransform();
                var p = bone.parent.matrix;
                var id = 1 / (p.a * p.d - p.b * p.c);
                var x = targetX - p.tx, y = targetY - p.ty;
                var tx = (x * p.d - y * p.c) * id - bone.ax, ty = (y * p.a - x * p.b) * id - bone.ay;
                var rotationIK = Math.atan2(ty, tx) * core.MathUtils.radDeg - bone.ashearX - bone.arotation;
                if (bone.ascaleX < 0)
                    rotationIK += 180;
                if (rotationIK > 180)
                    rotationIK -= 360;
                else if (rotationIK < -180)
                    rotationIK += 360;
                bone.updateWorldTransformWith(bone.ax, bone.ay, bone.arotation + rotationIK * alpha, bone.ascaleX, bone.ascaleY, bone.ashearX, bone.ashearY);
            };
            IkConstraint.prototype.apply2 = function (parent, child, targetX, targetY, bendDir, alpha) {
                if (alpha == 0) {
                    child.updateWorldTransform();
                    return;
                }
                if (!parent.appliedValid)
                    parent.updateAppliedTransform();
                if (!child.appliedValid)
                    child.updateAppliedTransform();
                var px = parent.ax, py = parent.ay, psx = parent.ascaleX, psy = parent.ascaleY, csx = child.ascaleX;
                var pmat = parent.matrix;
                var os1 = 0, os2 = 0, s2 = 0;
                if (psx < 0) {
                    psx = -psx;
                    os1 = 180;
                    s2 = -1;
                }
                else {
                    os1 = 0;
                    s2 = 1;
                }
                if (psy < 0) {
                    psy = -psy;
                    s2 = -s2;
                }
                if (csx < 0) {
                    csx = -csx;
                    os2 = 180;
                }
                else
                    os2 = 0;
                var cx = child.ax, cy = 0, cwx = 0, cwy = 0, a = pmat.a, b = pmat.c, c = pmat.b, d = pmat.d;
                var u = Math.abs(psx - psy) <= 0.0001;
                if (!u) {
                    cy = 0;
                    cwx = a * cx + pmat.tx;
                    cwy = c * cx + pmat.ty;
                }
                else {
                    cy = child.ay;
                    cwx = a * cx + b * cy + pmat.tx;
                    cwy = c * cx + d * cy + pmat.ty;
                }
                var pp = parent.parent.matrix;
                a = pp.a;
                b = pp.c;
                c = pp.b;
                d = pp.d;
                var id = 1 / (a * d - b * c), x = targetX - pp.tx, y = targetY - pp.ty;
                var tx = (x * d - y * b) * id - px, ty = (y * a - x * c) * id - py;
                x = cwx - pp.tx;
                y = cwy - pp.ty;
                var dx = (x * d - y * b) * id - px, dy = (y * a - x * c) * id - py;
                var l1 = Math.sqrt(dx * dx + dy * dy), l2 = child.data.length * csx, a1 = 0, a2 = 0;
                outer: if (u) {
                    l2 *= psx;
                    var cos = (tx * tx + ty * ty - l1 * l1 - l2 * l2) / (2 * l1 * l2);
                    if (cos < -1)
                        cos = -1;
                    else if (cos > 1)
                        cos = 1;
                    a2 = Math.acos(cos) * bendDir;
                    a = l1 + l2 * cos;
                    b = l2 * Math.sin(a2);
                    a1 = Math.atan2(ty * a - tx * b, tx * a + ty * b);
                }
                else {
                    a = psx * l2;
                    b = psy * l2;
                    var aa = a * a, bb = b * b, dd = tx * tx + ty * ty, ta = Math.atan2(ty, tx);
                    c = bb * l1 * l1 + aa * dd - aa * bb;
                    var c1 = -2 * bb * l1, c2 = bb - aa;
                    d = c1 * c1 - 4 * c2 * c;
                    if (d >= 0) {
                        var q = Math.sqrt(d);
                        if (c1 < 0)
                            q = -q;
                        q = -(c1 + q) / 2;
                        var r0 = q / c2, r1 = c / q;
                        var r = Math.abs(r0) < Math.abs(r1) ? r0 : r1;
                        if (r * r <= dd) {
                            y = Math.sqrt(dd - r * r) * bendDir;
                            a1 = ta - Math.atan2(y, r);
                            a2 = Math.atan2(y / psy, (r - l1) / psx);
                            break outer;
                        }
                    }
                    var minAngle = core.MathUtils.PI, minX = l1 - a, minDist = minX * minX, minY = 0;
                    var maxAngle = 0, maxX = l1 + a, maxDist = maxX * maxX, maxY = 0;
                    c = -a * l1 / (aa - bb);
                    if (c >= -1 && c <= 1) {
                        c = Math.acos(c);
                        x = a * Math.cos(c) + l1;
                        y = b * Math.sin(c);
                        d = x * x + y * y;
                        if (d < minDist) {
                            minAngle = c;
                            minDist = d;
                            minX = x;
                            minY = y;
                        }
                        if (d > maxDist) {
                            maxAngle = c;
                            maxDist = d;
                            maxX = x;
                            maxY = y;
                        }
                    }
                    if (dd <= (minDist + maxDist) / 2) {
                        a1 = ta - Math.atan2(minY * bendDir, minX);
                        a2 = minAngle * bendDir;
                    }
                    else {
                        a1 = ta - Math.atan2(maxY * bendDir, maxX);
                        a2 = maxAngle * bendDir;
                    }
                }
                var os = Math.atan2(cy, cx) * s2;
                var rotation = parent.arotation;
                a1 = (a1 - os) * core.MathUtils.radDeg + os1 - rotation;
                if (a1 > 180)
                    a1 -= 360;
                else if (a1 < -180)
                    a1 += 360;
                parent.updateWorldTransformWith(px, py, rotation + a1 * alpha, parent.ascaleX, parent.ascaleY, 0, 0);
                rotation = child.arotation;
                a2 = ((a2 + os) * core.MathUtils.radDeg - child.ashearX) * s2 + os2 - rotation;
                if (a2 > 180)
                    a2 -= 360;
                else if (a2 < -180)
                    a2 += 360;
                child.updateWorldTransformWith(cx, cy, rotation + a2 * alpha, child.ascaleX, child.ascaleY, child.ashearX, child.ashearY);
            };
            return IkConstraint;
        }());
        core.IkConstraint = IkConstraint;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var IkConstraintData = (function () {
            function IkConstraintData(name) {
                this.order = 0;
                this.bones = new Array();
                this.bendDirection = 1;
                this.mix = 1;
                this.name = name;
            }
            return IkConstraintData;
        }());
        core.IkConstraintData = IkConstraintData;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var PathConstraint = (function () {
            function PathConstraint(data, skeleton) {
                this.position = 0;
                this.spacing = 0;
                this.rotateMix = 0;
                this.translateMix = 0;
                this.spaces = new Array();
                this.positions = new Array();
                this.world = new Array();
                this.curves = new Array();
                this.lengths = new Array();
                this.segments = new Array();
                if (data == null)
                    throw new Error("data cannot be null.");
                if (skeleton == null)
                    throw new Error("skeleton cannot be null.");
                this.data = data;
                this.bones = new Array();
                for (var i = 0, n = data.bones.length; i < n; i++)
                    this.bones.push(skeleton.findBone(data.bones[i].name));
                this.target = skeleton.findSlot(data.target.name);
                this.position = data.position;
                this.spacing = data.spacing;
                this.rotateMix = data.rotateMix;
                this.translateMix = data.translateMix;
            }
            PathConstraint.prototype.apply = function () {
                this.update();
            };
            PathConstraint.prototype.update = function () {
                var attachment = this.target.getAttachment();
                if (!(attachment instanceof core.PathAttachment))
                    return;
                var rotateMix = this.rotateMix, translateMix = this.translateMix;
                var translate = translateMix > 0, rotate = rotateMix > 0;
                if (!translate && !rotate)
                    return;
                var data = this.data;
                var spacingMode = data.spacingMode;
                var lengthSpacing = spacingMode == core.SpacingMode.Length;
                var rotateMode = data.rotateMode;
                var tangents = rotateMode == core.RotateMode.Tangent, scale = rotateMode == core.RotateMode.ChainScale;
                var boneCount = this.bones.length, spacesCount = tangents ? boneCount : boneCount + 1;
                var bones = this.bones;
                var spaces = core.Utils.setArraySize(this.spaces, spacesCount), lengths = null;
                var spacing = this.spacing;
                if (scale || lengthSpacing) {
                    if (scale)
                        lengths = core.Utils.setArraySize(this.lengths, boneCount);
                    for (var i = 0, n = spacesCount - 1; i < n;) {
                        var bone = bones[i];
                        var setupLength = bone.data.length;
                        if (setupLength < PathConstraint.epsilon) {
                            if (scale)
                                lengths[i] = 0;
                            spaces[++i] = 0;
                        }
                        else {
                            var x = setupLength * bone.matrix.a, y = setupLength * bone.matrix.b;
                            var length_1 = Math.sqrt(x * x + y * y);
                            if (scale)
                                lengths[i] = length_1;
                            spaces[++i] = (lengthSpacing ? setupLength + spacing : spacing) * length_1 / setupLength;
                        }
                    }
                }
                else {
                    for (var i = 1; i < spacesCount; i++)
                        spaces[i] = spacing;
                }
                var positions = this.computeWorldPositions(attachment, spacesCount, tangents, data.positionMode == core.PositionMode.Percent, spacingMode == core.SpacingMode.Percent);
                var boneX = positions[0], boneY = positions[1], offsetRotation = data.offsetRotation;
                var tip = false;
                if (offsetRotation == 0)
                    tip = rotateMode == core.RotateMode.Chain;
                else {
                    tip = false;
                    var p = this.target.bone.matrix;
                    offsetRotation *= p.a * p.d - p.b * p.c > 0 ? core.MathUtils.degRad : -core.MathUtils.degRad;
                }
                for (var i = 0, p = 3; i < boneCount; i++, p += 3) {
                    var bone = bones[i];
                    var mat = bone.matrix;
                    mat.tx += (boneX - mat.tx) * translateMix;
                    mat.ty += (boneY - mat.ty) * translateMix;
                    var x = positions[p], y = positions[p + 1], dx = x - boneX, dy = y - boneY;
                    if (scale) {
                        var length_2 = lengths[i];
                        if (length_2 != 0) {
                            var s = (Math.sqrt(dx * dx + dy * dy) / length_2 - 1) * rotateMix + 1;
                            mat.a *= s;
                            mat.b *= s;
                        }
                    }
                    boneX = x;
                    boneY = y;
                    if (rotate) {
                        var a = mat.a, b = mat.c, c = mat.b, d = mat.d, r = 0, cos = 0, sin = 0;
                        if (tangents)
                            r = positions[p - 1];
                        else if (spaces[i + 1] == 0)
                            r = positions[p + 2];
                        else
                            r = Math.atan2(dy, dx);
                        r -= Math.atan2(c, a);
                        if (tip) {
                            cos = Math.cos(r);
                            sin = Math.sin(r);
                            var length_3 = bone.data.length;
                            boneX += (length_3 * (cos * a - sin * c) - dx) * rotateMix;
                            boneY += (length_3 * (sin * a + cos * c) - dy) * rotateMix;
                        }
                        else {
                            r += offsetRotation;
                        }
                        if (r > core.MathUtils.PI)
                            r -= core.MathUtils.PI2;
                        else if (r < -core.MathUtils.PI)
                            r += core.MathUtils.PI2;
                        r *= rotateMix;
                        cos = Math.cos(r);
                        sin = Math.sin(r);
                        mat.a = cos * a - sin * c;
                        mat.c = cos * b - sin * d;
                        mat.b = sin * a + cos * c;
                        mat.d = sin * b + cos * d;
                    }
                    bone.appliedValid = false;
                }
            };
            PathConstraint.prototype.computeWorldPositions = function (path, spacesCount, tangents, percentPosition, percentSpacing) {
                var target = this.target;
                var position = this.position;
                var spaces = this.spaces, out = core.Utils.setArraySize(this.positions, spacesCount * 3 + 2), world = null;
                var closed = path.closed;
                var verticesLength = path.worldVerticesLength, curveCount = verticesLength / 6, prevCurve = PathConstraint.NONE;
                if (!path.constantSpeed) {
                    var lengths = path.lengths;
                    curveCount -= closed ? 1 : 2;
                    var pathLength_1 = lengths[curveCount];
                    if (percentPosition)
                        position *= pathLength_1;
                    if (percentSpacing) {
                        for (var i = 0; i < spacesCount; i++)
                            spaces[i] *= pathLength_1;
                    }
                    world = core.Utils.setArraySize(this.world, 8);
                    for (var i = 0, o = 0, curve = 0; i < spacesCount; i++, o += 3) {
                        var space = spaces[i];
                        position += space;
                        var p = position;
                        if (closed) {
                            p %= pathLength_1;
                            if (p < 0)
                                p += pathLength_1;
                            curve = 0;
                        }
                        else if (p < 0) {
                            if (prevCurve != PathConstraint.BEFORE) {
                                prevCurve = PathConstraint.BEFORE;
                                path.computeWorldVertices(target, 2, 4, world, 0, 2);
                            }
                            this.addBeforePosition(p, world, 0, out, o);
                            continue;
                        }
                        else if (p > pathLength_1) {
                            if (prevCurve != PathConstraint.AFTER) {
                                prevCurve = PathConstraint.AFTER;
                                path.computeWorldVertices(target, verticesLength - 6, 4, world, 0, 2);
                            }
                            this.addAfterPosition(p - pathLength_1, world, 0, out, o);
                            continue;
                        }
                        for (;; curve++) {
                            var length_4 = lengths[curve];
                            if (p > length_4)
                                continue;
                            if (curve == 0)
                                p /= length_4;
                            else {
                                var prev = lengths[curve - 1];
                                p = (p - prev) / (length_4 - prev);
                            }
                            break;
                        }
                        if (curve != prevCurve) {
                            prevCurve = curve;
                            if (closed && curve == curveCount) {
                                path.computeWorldVertices(target, verticesLength - 4, 4, world, 0, 2);
                                path.computeWorldVertices(target, 0, 4, world, 4, 2);
                            }
                            else
                                path.computeWorldVertices(target, curve * 6 + 2, 8, world, 0, 2);
                        }
                        this.addCurvePosition(p, world[0], world[1], world[2], world[3], world[4], world[5], world[6], world[7], out, o, tangents || (i > 0 && space == 0));
                    }
                    return out;
                }
                if (closed) {
                    verticesLength += 2;
                    world = core.Utils.setArraySize(this.world, verticesLength);
                    path.computeWorldVertices(target, 2, verticesLength - 4, world, 0, 2);
                    path.computeWorldVertices(target, 0, 2, world, verticesLength - 4, 2);
                    world[verticesLength - 2] = world[0];
                    world[verticesLength - 1] = world[1];
                }
                else {
                    curveCount--;
                    verticesLength -= 4;
                    world = core.Utils.setArraySize(this.world, verticesLength);
                    path.computeWorldVertices(target, 2, verticesLength, world, 0, 2);
                }
                var curves = core.Utils.setArraySize(this.curves, curveCount);
                var pathLength = 0;
                var x1 = world[0], y1 = world[1], cx1 = 0, cy1 = 0, cx2 = 0, cy2 = 0, x2 = 0, y2 = 0;
                var tmpx = 0, tmpy = 0, dddfx = 0, dddfy = 0, ddfx = 0, ddfy = 0, dfx = 0, dfy = 0;
                for (var i = 0, w = 2; i < curveCount; i++, w += 6) {
                    cx1 = world[w];
                    cy1 = world[w + 1];
                    cx2 = world[w + 2];
                    cy2 = world[w + 3];
                    x2 = world[w + 4];
                    y2 = world[w + 5];
                    tmpx = (x1 - cx1 * 2 + cx2) * 0.1875;
                    tmpy = (y1 - cy1 * 2 + cy2) * 0.1875;
                    dddfx = ((cx1 - cx2) * 3 - x1 + x2) * 0.09375;
                    dddfy = ((cy1 - cy2) * 3 - y1 + y2) * 0.09375;
                    ddfx = tmpx * 2 + dddfx;
                    ddfy = tmpy * 2 + dddfy;
                    dfx = (cx1 - x1) * 0.75 + tmpx + dddfx * 0.16666667;
                    dfy = (cy1 - y1) * 0.75 + tmpy + dddfy * 0.16666667;
                    pathLength += Math.sqrt(dfx * dfx + dfy * dfy);
                    dfx += ddfx;
                    dfy += ddfy;
                    ddfx += dddfx;
                    ddfy += dddfy;
                    pathLength += Math.sqrt(dfx * dfx + dfy * dfy);
                    dfx += ddfx;
                    dfy += ddfy;
                    pathLength += Math.sqrt(dfx * dfx + dfy * dfy);
                    dfx += ddfx + dddfx;
                    dfy += ddfy + dddfy;
                    pathLength += Math.sqrt(dfx * dfx + dfy * dfy);
                    curves[i] = pathLength;
                    x1 = x2;
                    y1 = y2;
                }
                if (percentPosition)
                    position *= pathLength;
                if (percentSpacing) {
                    for (var i = 0; i < spacesCount; i++)
                        spaces[i] *= pathLength;
                }
                var segments = this.segments;
                var curveLength = 0;
                for (var i = 0, o = 0, curve = 0, segment = 0; i < spacesCount; i++, o += 3) {
                    var space = spaces[i];
                    position += space;
                    var p = position;
                    if (closed) {
                        p %= pathLength;
                        if (p < 0)
                            p += pathLength;
                        curve = 0;
                    }
                    else if (p < 0) {
                        this.addBeforePosition(p, world, 0, out, o);
                        continue;
                    }
                    else if (p > pathLength) {
                        this.addAfterPosition(p - pathLength, world, verticesLength - 4, out, o);
                        continue;
                    }
                    for (;; curve++) {
                        var length_5 = curves[curve];
                        if (p > length_5)
                            continue;
                        if (curve == 0)
                            p /= length_5;
                        else {
                            var prev = curves[curve - 1];
                            p = (p - prev) / (length_5 - prev);
                        }
                        break;
                    }
                    if (curve != prevCurve) {
                        prevCurve = curve;
                        var ii = curve * 6;
                        x1 = world[ii];
                        y1 = world[ii + 1];
                        cx1 = world[ii + 2];
                        cy1 = world[ii + 3];
                        cx2 = world[ii + 4];
                        cy2 = world[ii + 5];
                        x2 = world[ii + 6];
                        y2 = world[ii + 7];
                        tmpx = (x1 - cx1 * 2 + cx2) * 0.03;
                        tmpy = (y1 - cy1 * 2 + cy2) * 0.03;
                        dddfx = ((cx1 - cx2) * 3 - x1 + x2) * 0.006;
                        dddfy = ((cy1 - cy2) * 3 - y1 + y2) * 0.006;
                        ddfx = tmpx * 2 + dddfx;
                        ddfy = tmpy * 2 + dddfy;
                        dfx = (cx1 - x1) * 0.3 + tmpx + dddfx * 0.16666667;
                        dfy = (cy1 - y1) * 0.3 + tmpy + dddfy * 0.16666667;
                        curveLength = Math.sqrt(dfx * dfx + dfy * dfy);
                        segments[0] = curveLength;
                        for (ii = 1; ii < 8; ii++) {
                            dfx += ddfx;
                            dfy += ddfy;
                            ddfx += dddfx;
                            ddfy += dddfy;
                            curveLength += Math.sqrt(dfx * dfx + dfy * dfy);
                            segments[ii] = curveLength;
                        }
                        dfx += ddfx;
                        dfy += ddfy;
                        curveLength += Math.sqrt(dfx * dfx + dfy * dfy);
                        segments[8] = curveLength;
                        dfx += ddfx + dddfx;
                        dfy += ddfy + dddfy;
                        curveLength += Math.sqrt(dfx * dfx + dfy * dfy);
                        segments[9] = curveLength;
                        segment = 0;
                    }
                    p *= curveLength;
                    for (;; segment++) {
                        var length_6 = segments[segment];
                        if (p > length_6)
                            continue;
                        if (segment == 0)
                            p /= length_6;
                        else {
                            var prev = segments[segment - 1];
                            p = segment + (p - prev) / (length_6 - prev);
                        }
                        break;
                    }
                    this.addCurvePosition(p * 0.1, x1, y1, cx1, cy1, cx2, cy2, x2, y2, out, o, tangents || (i > 0 && space == 0));
                }
                return out;
            };
            PathConstraint.prototype.addBeforePosition = function (p, temp, i, out, o) {
                var x1 = temp[i], y1 = temp[i + 1], dx = temp[i + 2] - x1, dy = temp[i + 3] - y1, r = Math.atan2(dy, dx);
                out[o] = x1 + p * Math.cos(r);
                out[o + 1] = y1 + p * Math.sin(r);
                out[o + 2] = r;
            };
            PathConstraint.prototype.addAfterPosition = function (p, temp, i, out, o) {
                var x1 = temp[i + 2], y1 = temp[i + 3], dx = x1 - temp[i], dy = y1 - temp[i + 1], r = Math.atan2(dy, dx);
                out[o] = x1 + p * Math.cos(r);
                out[o + 1] = y1 + p * Math.sin(r);
                out[o + 2] = r;
            };
            PathConstraint.prototype.addCurvePosition = function (p, x1, y1, cx1, cy1, cx2, cy2, x2, y2, out, o, tangents) {
                if (p == 0 || isNaN(p))
                    p = 0.0001;
                var tt = p * p, ttt = tt * p, u = 1 - p, uu = u * u, uuu = uu * u;
                var ut = u * p, ut3 = ut * 3, uut3 = u * ut3, utt3 = ut3 * p;
                var x = x1 * uuu + cx1 * uut3 + cx2 * utt3 + x2 * ttt, y = y1 * uuu + cy1 * uut3 + cy2 * utt3 + y2 * ttt;
                out[o] = x;
                out[o + 1] = y;
                if (tangents)
                    out[o + 2] = Math.atan2(y - (y1 * uu + cy1 * ut * 2 + cy2 * tt), x - (x1 * uu + cx1 * ut * 2 + cx2 * tt));
            };
            PathConstraint.prototype.getOrder = function () {
                return this.data.order;
            };
            PathConstraint.NONE = -1;
            PathConstraint.BEFORE = -2;
            PathConstraint.AFTER = -3;
            PathConstraint.epsilon = 0.00001;
            return PathConstraint;
        }());
        core.PathConstraint = PathConstraint;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var PathConstraintData = (function () {
            function PathConstraintData(name) {
                this.order = 0;
                this.bones = new Array();
                this.name = name;
            }
            return PathConstraintData;
        }());
        core.PathConstraintData = PathConstraintData;
        var PositionMode;
        (function (PositionMode) {
            PositionMode[PositionMode["Fixed"] = 0] = "Fixed";
            PositionMode[PositionMode["Percent"] = 1] = "Percent";
        })(PositionMode = core.PositionMode || (core.PositionMode = {}));
        var SpacingMode;
        (function (SpacingMode) {
            SpacingMode[SpacingMode["Length"] = 0] = "Length";
            SpacingMode[SpacingMode["Fixed"] = 1] = "Fixed";
            SpacingMode[SpacingMode["Percent"] = 2] = "Percent";
        })(SpacingMode = core.SpacingMode || (core.SpacingMode = {}));
        var RotateMode;
        (function (RotateMode) {
            RotateMode[RotateMode["Tangent"] = 0] = "Tangent";
            RotateMode[RotateMode["Chain"] = 1] = "Chain";
            RotateMode[RotateMode["ChainScale"] = 2] = "ChainScale";
        })(RotateMode = core.RotateMode || (core.RotateMode = {}));
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var Skeleton = (function () {
            function Skeleton(data) {
                this._updateCache = new Array();
                this.updateCacheReset = new Array();
                this.time = 0;
                this.flipX = false;
                this.flipY = false;
                this.x = 0;
                this.y = 0;
                if (data == null)
                    throw new Error("data cannot be null.");
                this.data = data;
                this.bones = new Array();
                for (var i = 0; i < data.bones.length; i++) {
                    var boneData = data.bones[i];
                    var bone = void 0;
                    if (boneData.parent == null)
                        bone = new core.Bone(boneData, this, null);
                    else {
                        var parent_1 = this.bones[boneData.parent.index];
                        bone = new core.Bone(boneData, this, parent_1);
                        parent_1.children.push(bone);
                    }
                    this.bones.push(bone);
                }
                this.slots = new Array();
                this.drawOrder = new Array();
                for (var i = 0; i < data.slots.length; i++) {
                    var slotData = data.slots[i];
                    var bone = this.bones[slotData.boneData.index];
                    var slot = new core.Slot(slotData, bone);
                    this.slots.push(slot);
                    this.drawOrder.push(slot);
                }
                this.ikConstraints = new Array();
                for (var i = 0; i < data.ikConstraints.length; i++) {
                    var ikConstraintData = data.ikConstraints[i];
                    this.ikConstraints.push(new core.IkConstraint(ikConstraintData, this));
                }
                this.transformConstraints = new Array();
                for (var i = 0; i < data.transformConstraints.length; i++) {
                    var transformConstraintData = data.transformConstraints[i];
                    this.transformConstraints.push(new core.TransformConstraint(transformConstraintData, this));
                }
                this.pathConstraints = new Array();
                for (var i = 0; i < data.pathConstraints.length; i++) {
                    var pathConstraintData = data.pathConstraints[i];
                    this.pathConstraints.push(new core.PathConstraint(pathConstraintData, this));
                }
                this.color = new core.Color(1, 1, 1, 1);
                this.updateCache();
            }
            Skeleton.prototype.updateCache = function () {
                var updateCache = this._updateCache;
                updateCache.length = 0;
                this.updateCacheReset.length = 0;
                var bones = this.bones;
                for (var i = 0, n = bones.length; i < n; i++)
                    bones[i].sorted = false;
                var ikConstraints = this.ikConstraints;
                var transformConstraints = this.transformConstraints;
                var pathConstraints = this.pathConstraints;
                var ikCount = ikConstraints.length, transformCount = transformConstraints.length, pathCount = pathConstraints.length;
                var constraintCount = ikCount + transformCount + pathCount;
                outer: for (var i = 0; i < constraintCount; i++) {
                    for (var ii = 0; ii < ikCount; ii++) {
                        var constraint = ikConstraints[ii];
                        if (constraint.data.order == i) {
                            this.sortIkConstraint(constraint);
                            continue outer;
                        }
                    }
                    for (var ii = 0; ii < transformCount; ii++) {
                        var constraint = transformConstraints[ii];
                        if (constraint.data.order == i) {
                            this.sortTransformConstraint(constraint);
                            continue outer;
                        }
                    }
                    for (var ii = 0; ii < pathCount; ii++) {
                        var constraint = pathConstraints[ii];
                        if (constraint.data.order == i) {
                            this.sortPathConstraint(constraint);
                            continue outer;
                        }
                    }
                }
                for (var i = 0, n = bones.length; i < n; i++)
                    this.sortBone(bones[i]);
            };
            Skeleton.prototype.sortIkConstraint = function (constraint) {
                var target = constraint.target;
                this.sortBone(target);
                var constrained = constraint.bones;
                var parent = constrained[0];
                this.sortBone(parent);
                if (constrained.length > 1) {
                    var child = constrained[constrained.length - 1];
                    if (!(this._updateCache.indexOf(child) > -1))
                        this.updateCacheReset.push(child);
                }
                this._updateCache.push(constraint);
                this.sortReset(parent.children);
                constrained[constrained.length - 1].sorted = true;
            };
            Skeleton.prototype.sortPathConstraint = function (constraint) {
                var slot = constraint.target;
                var slotIndex = slot.data.index;
                var slotBone = slot.bone;
                if (this.skin != null)
                    this.sortPathConstraintAttachment(this.skin, slotIndex, slotBone);
                if (this.data.defaultSkin != null && this.data.defaultSkin != this.skin)
                    this.sortPathConstraintAttachment(this.data.defaultSkin, slotIndex, slotBone);
                for (var i = 0, n = this.data.skins.length; i < n; i++)
                    this.sortPathConstraintAttachment(this.data.skins[i], slotIndex, slotBone);
                var attachment = slot.getAttachment();
                if (attachment instanceof core.PathAttachment)
                    this.sortPathConstraintAttachmentWith(attachment, slotBone);
                var constrained = constraint.bones;
                var boneCount = constrained.length;
                for (var i = 0; i < boneCount; i++)
                    this.sortBone(constrained[i]);
                this._updateCache.push(constraint);
                for (var i = 0; i < boneCount; i++)
                    this.sortReset(constrained[i].children);
                for (var i = 0; i < boneCount; i++)
                    constrained[i].sorted = true;
            };
            Skeleton.prototype.sortTransformConstraint = function (constraint) {
                this.sortBone(constraint.target);
                var constrained = constraint.bones;
                var boneCount = constrained.length;
                if (constraint.data.local) {
                    for (var i = 0; i < boneCount; i++) {
                        var child = constrained[i];
                        this.sortBone(child.parent);
                        if (!(this._updateCache.indexOf(child) > -1))
                            this.updateCacheReset.push(child);
                    }
                }
                else {
                    for (var i = 0; i < boneCount; i++) {
                        this.sortBone(constrained[i]);
                    }
                }
                this._updateCache.push(constraint);
                for (var ii = 0; ii < boneCount; ii++)
                    this.sortReset(constrained[ii].children);
                for (var ii = 0; ii < boneCount; ii++)
                    constrained[ii].sorted = true;
            };
            Skeleton.prototype.sortPathConstraintAttachment = function (skin, slotIndex, slotBone) {
                var attachments = skin.attachments[slotIndex];
                if (!attachments)
                    return;
                for (var key in attachments) {
                    this.sortPathConstraintAttachmentWith(attachments[key], slotBone);
                }
            };
            Skeleton.prototype.sortPathConstraintAttachmentWith = function (attachment, slotBone) {
                if (!(attachment instanceof core.PathAttachment))
                    return;
                var pathBones = attachment.bones;
                if (pathBones == null)
                    this.sortBone(slotBone);
                else {
                    var bones = this.bones;
                    var i = 0;
                    while (i < pathBones.length) {
                        var boneCount = pathBones[i++];
                        for (var n = i + boneCount; i < n; i++) {
                            var boneIndex = pathBones[i];
                            this.sortBone(bones[boneIndex]);
                        }
                    }
                }
            };
            Skeleton.prototype.sortBone = function (bone) {
                if (bone.sorted)
                    return;
                var parent = bone.parent;
                if (parent != null)
                    this.sortBone(parent);
                bone.sorted = true;
                this._updateCache.push(bone);
            };
            Skeleton.prototype.sortReset = function (bones) {
                for (var i = 0, n = bones.length; i < n; i++) {
                    var bone = bones[i];
                    if (bone.sorted)
                        this.sortReset(bone.children);
                    bone.sorted = false;
                }
            };
            Skeleton.prototype.updateWorldTransform = function () {
                var updateCacheReset = this.updateCacheReset;
                for (var i = 0, n = updateCacheReset.length; i < n; i++) {
                    var bone = updateCacheReset[i];
                    bone.ax = bone.x;
                    bone.ay = bone.y;
                    bone.arotation = bone.rotation;
                    bone.ascaleX = bone.scaleX;
                    bone.ascaleY = bone.scaleY;
                    bone.ashearX = bone.shearX;
                    bone.ashearY = bone.shearY;
                    bone.appliedValid = true;
                }
                var updateCache = this._updateCache;
                for (var i = 0, n = updateCache.length; i < n; i++)
                    updateCache[i].update();
            };
            Skeleton.prototype.setToSetupPose = function () {
                this.setBonesToSetupPose();
                this.setSlotsToSetupPose();
            };
            Skeleton.prototype.setBonesToSetupPose = function () {
                var bones = this.bones;
                for (var i = 0, n = bones.length; i < n; i++)
                    bones[i].setToSetupPose();
                var ikConstraints = this.ikConstraints;
                for (var i = 0, n = ikConstraints.length; i < n; i++) {
                    var constraint = ikConstraints[i];
                    constraint.bendDirection = constraint.data.bendDirection;
                    constraint.mix = constraint.data.mix;
                }
                var transformConstraints = this.transformConstraints;
                for (var i = 0, n = transformConstraints.length; i < n; i++) {
                    var constraint = transformConstraints[i];
                    var data = constraint.data;
                    constraint.rotateMix = data.rotateMix;
                    constraint.translateMix = data.translateMix;
                    constraint.scaleMix = data.scaleMix;
                    constraint.shearMix = data.shearMix;
                }
                var pathConstraints = this.pathConstraints;
                for (var i = 0, n = pathConstraints.length; i < n; i++) {
                    var constraint = pathConstraints[i];
                    var data = constraint.data;
                    constraint.position = data.position;
                    constraint.spacing = data.spacing;
                    constraint.rotateMix = data.rotateMix;
                    constraint.translateMix = data.translateMix;
                }
            };
            Skeleton.prototype.setSlotsToSetupPose = function () {
                var slots = this.slots;
                core.Utils.arrayCopy(slots, 0, this.drawOrder, 0, slots.length);
                for (var i = 0, n = slots.length; i < n; i++)
                    slots[i].setToSetupPose();
            };
            Skeleton.prototype.getRootBone = function () {
                if (this.bones.length == 0)
                    return null;
                return this.bones[0];
            };
            Skeleton.prototype.findBone = function (boneName) {
                if (boneName == null)
                    throw new Error("boneName cannot be null.");
                var bones = this.bones;
                for (var i = 0, n = bones.length; i < n; i++) {
                    var bone = bones[i];
                    if (bone.data.name == boneName)
                        return bone;
                }
                return null;
            };
            Skeleton.prototype.findBoneIndex = function (boneName) {
                if (boneName == null)
                    throw new Error("boneName cannot be null.");
                var bones = this.bones;
                for (var i = 0, n = bones.length; i < n; i++)
                    if (bones[i].data.name == boneName)
                        return i;
                return -1;
            };
            Skeleton.prototype.findSlot = function (slotName) {
                if (slotName == null)
                    throw new Error("slotName cannot be null.");
                var slots = this.slots;
                for (var i = 0, n = slots.length; i < n; i++) {
                    var slot = slots[i];
                    if (slot.data.name == slotName)
                        return slot;
                }
                return null;
            };
            Skeleton.prototype.findSlotIndex = function (slotName) {
                if (slotName == null)
                    throw new Error("slotName cannot be null.");
                var slots = this.slots;
                for (var i = 0, n = slots.length; i < n; i++)
                    if (slots[i].data.name == slotName)
                        return i;
                return -1;
            };
            Skeleton.prototype.setSkinByName = function (skinName) {
                var skin = this.data.findSkin(skinName);
                if (skin == null)
                    throw new Error("Skin not found: " + skinName);
                this.setSkin(skin);
            };
            Skeleton.prototype.setSkin = function (newSkin) {
                if (newSkin != null) {
                    if (this.skin != null)
                        newSkin.attachAll(this, this.skin);
                    else {
                        var slots = this.slots;
                        for (var i = 0, n = slots.length; i < n; i++) {
                            var slot = slots[i];
                            var name_1 = slot.data.attachmentName;
                            if (name_1 != null) {
                                var attachment = newSkin.getAttachment(i, name_1);
                                if (attachment != null)
                                    slot.setAttachment(attachment);
                            }
                        }
                    }
                }
                this.skin = newSkin;
            };
            Skeleton.prototype.getAttachmentByName = function (slotName, attachmentName) {
                return this.getAttachment(this.data.findSlotIndex(slotName), attachmentName);
            };
            Skeleton.prototype.getAttachment = function (slotIndex, attachmentName) {
                if (attachmentName == null)
                    throw new Error("attachmentName cannot be null.");
                if (this.skin != null) {
                    var attachment = this.skin.getAttachment(slotIndex, attachmentName);
                    if (attachment != null)
                        return attachment;
                }
                if (this.data.defaultSkin != null)
                    return this.data.defaultSkin.getAttachment(slotIndex, attachmentName);
                return null;
            };
            Skeleton.prototype.setAttachment = function (slotName, attachmentName) {
                if (slotName == null)
                    throw new Error("slotName cannot be null.");
                var slots = this.slots;
                for (var i = 0, n = slots.length; i < n; i++) {
                    var slot = slots[i];
                    if (slot.data.name == slotName) {
                        var attachment = null;
                        if (attachmentName != null) {
                            attachment = this.getAttachment(i, attachmentName);
                            if (attachment == null)
                                throw new Error("Attachment not found: " + attachmentName + ", for slot: " + slotName);
                        }
                        slot.setAttachment(attachment);
                        return;
                    }
                }
                throw new Error("Slot not found: " + slotName);
            };
            Skeleton.prototype.findIkConstraint = function (constraintName) {
                if (constraintName == null)
                    throw new Error("constraintName cannot be null.");
                var ikConstraints = this.ikConstraints;
                for (var i = 0, n = ikConstraints.length; i < n; i++) {
                    var ikConstraint = ikConstraints[i];
                    if (ikConstraint.data.name == constraintName)
                        return ikConstraint;
                }
                return null;
            };
            Skeleton.prototype.findTransformConstraint = function (constraintName) {
                if (constraintName == null)
                    throw new Error("constraintName cannot be null.");
                var transformConstraints = this.transformConstraints;
                for (var i = 0, n = transformConstraints.length; i < n; i++) {
                    var constraint = transformConstraints[i];
                    if (constraint.data.name == constraintName)
                        return constraint;
                }
                return null;
            };
            Skeleton.prototype.findPathConstraint = function (constraintName) {
                if (constraintName == null)
                    throw new Error("constraintName cannot be null.");
                var pathConstraints = this.pathConstraints;
                for (var i = 0, n = pathConstraints.length; i < n; i++) {
                    var constraint = pathConstraints[i];
                    if (constraint.data.name == constraintName)
                        return constraint;
                }
                return null;
            };
            Skeleton.prototype.getBounds = function (offset, size, temp) {
                if (offset == null)
                    throw new Error("offset cannot be null.");
                if (size == null)
                    throw new Error("size cannot be null.");
                var drawOrder = this.drawOrder;
                var minX = Number.POSITIVE_INFINITY, minY = Number.POSITIVE_INFINITY, maxX = Number.NEGATIVE_INFINITY, maxY = Number.NEGATIVE_INFINITY;
                for (var i = 0, n = drawOrder.length; i < n; i++) {
                    var slot = drawOrder[i];
                    var verticesLength = 0;
                    var vertices = null;
                    var attachment = slot.getAttachment();
                    if (attachment instanceof core.RegionAttachment) {
                        verticesLength = 8;
                        vertices = core.Utils.setArraySize(temp, verticesLength, 0);
                        attachment.computeWorldVertices(slot.bone, vertices, 0, 2);
                    }
                    else if (attachment instanceof core.MeshAttachment) {
                        var mesh = attachment;
                        verticesLength = mesh.worldVerticesLength;
                        vertices = core.Utils.setArraySize(temp, verticesLength, 0);
                        mesh.computeWorldVertices(slot, 0, verticesLength, vertices, 0, 2);
                    }
                    if (vertices != null) {
                        for (var ii = 0, nn = vertices.length; ii < nn; ii += 2) {
                            var x = vertices[ii], y = vertices[ii + 1];
                            minX = Math.min(minX, x);
                            minY = Math.min(minY, y);
                            maxX = Math.max(maxX, x);
                            maxY = Math.max(maxY, y);
                        }
                    }
                }
                offset.set(minX, minY);
                size.set(maxX - minX, maxY - minY);
            };
            Skeleton.prototype.update = function (delta) {
                this.time += delta;
            };
            return Skeleton;
        }());
        core.Skeleton = Skeleton;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var SkeletonBounds = (function () {
            function SkeletonBounds() {
                this.minX = 0;
                this.minY = 0;
                this.maxX = 0;
                this.maxY = 0;
                this.boundingBoxes = new Array();
                this.polygons = new Array();
                this.polygonPool = new core.Pool(function () {
                    return core.Utils.newFloatArray(16);
                });
            }
            SkeletonBounds.prototype.update = function (skeleton, updateAabb) {
                if (skeleton == null)
                    throw new Error("skeleton cannot be null.");
                var boundingBoxes = this.boundingBoxes;
                var polygons = this.polygons;
                var polygonPool = this.polygonPool;
                var slots = skeleton.slots;
                var slotCount = slots.length;
                boundingBoxes.length = 0;
                polygonPool.freeAll(polygons);
                polygons.length = 0;
                for (var i = 0; i < slotCount; i++) {
                    var slot = slots[i];
                    var attachment = slot.getAttachment();
                    if (attachment instanceof core.BoundingBoxAttachment) {
                        var boundingBox = attachment;
                        boundingBoxes.push(boundingBox);
                        var polygon = polygonPool.obtain();
                        if (polygon.length != boundingBox.worldVerticesLength) {
                            polygon = core.Utils.newFloatArray(boundingBox.worldVerticesLength);
                        }
                        polygons.push(polygon);
                        boundingBox.computeWorldVertices(slot, 0, boundingBox.worldVerticesLength, polygon, 0, 2);
                    }
                }
                if (updateAabb) {
                    this.aabbCompute();
                }
                else {
                    this.minX = Number.POSITIVE_INFINITY;
                    this.minY = Number.POSITIVE_INFINITY;
                    this.maxX = Number.NEGATIVE_INFINITY;
                    this.maxY = Number.NEGATIVE_INFINITY;
                }
            };
            SkeletonBounds.prototype.aabbCompute = function () {
                var minX = Number.POSITIVE_INFINITY, minY = Number.POSITIVE_INFINITY, maxX = Number.NEGATIVE_INFINITY, maxY = Number.NEGATIVE_INFINITY;
                var polygons = this.polygons;
                for (var i = 0, n = polygons.length; i < n; i++) {
                    var polygon = polygons[i];
                    var vertices = polygon;
                    for (var ii = 0, nn = polygon.length; ii < nn; ii += 2) {
                        var x = vertices[ii];
                        var y = vertices[ii + 1];
                        minX = Math.min(minX, x);
                        minY = Math.min(minY, y);
                        maxX = Math.max(maxX, x);
                        maxY = Math.max(maxY, y);
                    }
                }
                this.minX = minX;
                this.minY = minY;
                this.maxX = maxX;
                this.maxY = maxY;
            };
            SkeletonBounds.prototype.aabbContainsPoint = function (x, y) {
                return x >= this.minX && x <= this.maxX && y >= this.minY && y <= this.maxY;
            };
            SkeletonBounds.prototype.aabbIntersectsSegment = function (x1, y1, x2, y2) {
                var minX = this.minX;
                var minY = this.minY;
                var maxX = this.maxX;
                var maxY = this.maxY;
                if ((x1 <= minX && x2 <= minX) || (y1 <= minY && y2 <= minY) || (x1 >= maxX && x2 >= maxX) || (y1 >= maxY && y2 >= maxY))
                    return false;
                var m = (y2 - y1) / (x2 - x1);
                var y = m * (minX - x1) + y1;
                if (y > minY && y < maxY)
                    return true;
                y = m * (maxX - x1) + y1;
                if (y > minY && y < maxY)
                    return true;
                var x = (minY - y1) / m + x1;
                if (x > minX && x < maxX)
                    return true;
                x = (maxY - y1) / m + x1;
                if (x > minX && x < maxX)
                    return true;
                return false;
            };
            SkeletonBounds.prototype.aabbIntersectsSkeleton = function (bounds) {
                return this.minX < bounds.maxX && this.maxX > bounds.minX && this.minY < bounds.maxY && this.maxY > bounds.minY;
            };
            SkeletonBounds.prototype.containsPoint = function (x, y) {
                var polygons = this.polygons;
                for (var i = 0, n = polygons.length; i < n; i++)
                    if (this.containsPointPolygon(polygons[i], x, y))
                        return this.boundingBoxes[i];
                return null;
            };
            SkeletonBounds.prototype.containsPointPolygon = function (polygon, x, y) {
                var vertices = polygon;
                var nn = polygon.length;
                var prevIndex = nn - 2;
                var inside = false;
                for (var ii = 0; ii < nn; ii += 2) {
                    var vertexY = vertices[ii + 1];
                    var prevY = vertices[prevIndex + 1];
                    if ((vertexY < y && prevY >= y) || (prevY < y && vertexY >= y)) {
                        var vertexX = vertices[ii];
                        if (vertexX + (y - vertexY) / (prevY - vertexY) * (vertices[prevIndex] - vertexX) < x)
                            inside = !inside;
                    }
                    prevIndex = ii;
                }
                return inside;
            };
            SkeletonBounds.prototype.intersectsSegment = function (x1, y1, x2, y2) {
                var polygons = this.polygons;
                for (var i = 0, n = polygons.length; i < n; i++)
                    if (this.intersectsSegmentPolygon(polygons[i], x1, y1, x2, y2))
                        return this.boundingBoxes[i];
                return null;
            };
            SkeletonBounds.prototype.intersectsSegmentPolygon = function (polygon, x1, y1, x2, y2) {
                var vertices = polygon;
                var nn = polygon.length;
                var width12 = x1 - x2, height12 = y1 - y2;
                var det1 = x1 * y2 - y1 * x2;
                var x3 = vertices[nn - 2], y3 = vertices[nn - 1];
                for (var ii = 0; ii < nn; ii += 2) {
                    var x4 = vertices[ii], y4 = vertices[ii + 1];
                    var det2 = x3 * y4 - y3 * x4;
                    var width34 = x3 - x4, height34 = y3 - y4;
                    var det3 = width12 * height34 - height12 * width34;
                    var x = (det1 * width34 - width12 * det2) / det3;
                    if (((x >= x3 && x <= x4) || (x >= x4 && x <= x3)) && ((x >= x1 && x <= x2) || (x >= x2 && x <= x1))) {
                        var y = (det1 * height34 - height12 * det2) / det3;
                        if (((y >= y3 && y <= y4) || (y >= y4 && y <= y3)) && ((y >= y1 && y <= y2) || (y >= y2 && y <= y1)))
                            return true;
                    }
                    x3 = x4;
                    y3 = y4;
                }
                return false;
            };
            SkeletonBounds.prototype.getPolygon = function (boundingBox) {
                if (boundingBox == null)
                    throw new Error("boundingBox cannot be null.");
                var index = this.boundingBoxes.indexOf(boundingBox);
                return index == -1 ? null : this.polygons[index];
            };
            SkeletonBounds.prototype.getWidth = function () {
                return this.maxX - this.minX;
            };
            SkeletonBounds.prototype.getHeight = function () {
                return this.maxY - this.minY;
            };
            return SkeletonBounds;
        }());
        core.SkeletonBounds = SkeletonBounds;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var SkeletonClipping = (function () {
            function SkeletonClipping() {
                this.triangulator = new core.Triangulator();
                this.clippingPolygon = new Array();
                this.clipOutput = new Array();
                this.clippedVertices = new Array();
                this.clippedTriangles = new Array();
                this.scratch = new Array();
            }
            SkeletonClipping.prototype.clipStart = function (slot, clip) {
                if (this.clipAttachment != null)
                    return 0;
                this.clipAttachment = clip;
                var n = clip.worldVerticesLength;
                var vertices = core.Utils.setArraySize(this.clippingPolygon, n);
                clip.computeWorldVertices(slot, 0, n, vertices, 0, 2);
                var clippingPolygon = this.clippingPolygon;
                SkeletonClipping.makeClockwise(clippingPolygon);
                var clippingPolygons = this.clippingPolygons = this.triangulator.decompose(clippingPolygon, this.triangulator.triangulate(clippingPolygon));
                for (var i = 0, n_1 = clippingPolygons.length; i < n_1; i++) {
                    var polygon = clippingPolygons[i];
                    SkeletonClipping.makeClockwise(polygon);
                    polygon.push(polygon[0]);
                    polygon.push(polygon[1]);
                }
                return clippingPolygons.length;
            };
            SkeletonClipping.prototype.clipEndWithSlot = function (slot) {
                if (this.clipAttachment != null && this.clipAttachment.endSlot == slot.data)
                    this.clipEnd();
            };
            SkeletonClipping.prototype.clipEnd = function () {
                if (this.clipAttachment == null)
                    return;
                this.clipAttachment = null;
                this.clippingPolygons = null;
                this.clippedVertices.length = 0;
                this.clippedTriangles.length = 0;
                this.clippingPolygon.length = 0;
            };
            SkeletonClipping.prototype.isClipping = function () {
                return this.clipAttachment != null;
            };
            SkeletonClipping.prototype.clipTriangles = function (vertices, verticesLength, triangles, trianglesLength, uvs, light, dark, twoColor) {
                var clipOutput = this.clipOutput, clippedVertices = this.clippedVertices;
                var clippedTriangles = this.clippedTriangles;
                var polygons = this.clippingPolygons;
                var polygonsCount = this.clippingPolygons.length;
                var vertexSize = twoColor ? 12 : 8;
                var index = 0;
                clippedVertices.length = 0;
                clippedTriangles.length = 0;
                outer: for (var i = 0; i < trianglesLength; i += 3) {
                    var vertexOffset = triangles[i] << 1;
                    var x1 = vertices[vertexOffset], y1 = vertices[vertexOffset + 1];
                    var u1 = uvs[vertexOffset], v1 = uvs[vertexOffset + 1];
                    vertexOffset = triangles[i + 1] << 1;
                    var x2 = vertices[vertexOffset], y2 = vertices[vertexOffset + 1];
                    var u2 = uvs[vertexOffset], v2 = uvs[vertexOffset + 1];
                    vertexOffset = triangles[i + 2] << 1;
                    var x3 = vertices[vertexOffset], y3 = vertices[vertexOffset + 1];
                    var u3 = uvs[vertexOffset], v3 = uvs[vertexOffset + 1];
                    for (var p = 0; p < polygonsCount; p++) {
                        var s = clippedVertices.length;
                        if (this.clip(x1, y1, x2, y2, x3, y3, polygons[p], clipOutput)) {
                            var clipOutputLength = clipOutput.length;
                            if (clipOutputLength == 0)
                                continue;
                            var d0 = y2 - y3, d1 = x3 - x2, d2 = x1 - x3, d4 = y3 - y1;
                            var d = 1 / (d0 * d2 + d1 * (y1 - y3));
                            var clipOutputCount = clipOutputLength >> 1;
                            var clipOutputItems = this.clipOutput;
                            var clippedVerticesItems = core.Utils.setArraySize(clippedVertices, s + clipOutputCount * vertexSize);
                            for (var ii = 0; ii < clipOutputLength; ii += 2) {
                                var x = clipOutputItems[ii], y = clipOutputItems[ii + 1];
                                clippedVerticesItems[s] = x;
                                clippedVerticesItems[s + 1] = y;
                                clippedVerticesItems[s + 2] = light.r;
                                clippedVerticesItems[s + 3] = light.g;
                                clippedVerticesItems[s + 4] = light.b;
                                clippedVerticesItems[s + 5] = light.a;
                                var c0 = x - x3, c1 = y - y3;
                                var a = (d0 * c0 + d1 * c1) * d;
                                var b = (d4 * c0 + d2 * c1) * d;
                                var c = 1 - a - b;
                                clippedVerticesItems[s + 6] = u1 * a + u2 * b + u3 * c;
                                clippedVerticesItems[s + 7] = v1 * a + v2 * b + v3 * c;
                                if (twoColor) {
                                    clippedVerticesItems[s + 8] = dark.r;
                                    clippedVerticesItems[s + 9] = dark.g;
                                    clippedVerticesItems[s + 10] = dark.b;
                                    clippedVerticesItems[s + 11] = dark.a;
                                }
                                s += vertexSize;
                            }
                            s = clippedTriangles.length;
                            var clippedTrianglesItems = core.Utils.setArraySize(clippedTriangles, s + 3 * (clipOutputCount - 2));
                            clipOutputCount--;
                            for (var ii = 1; ii < clipOutputCount; ii++) {
                                clippedTrianglesItems[s] = index;
                                clippedTrianglesItems[s + 1] = (index + ii);
                                clippedTrianglesItems[s + 2] = (index + ii + 1);
                                s += 3;
                            }
                            index += clipOutputCount + 1;
                        }
                        else {
                            var clippedVerticesItems = core.Utils.setArraySize(clippedVertices, s + 3 * vertexSize);
                            clippedVerticesItems[s] = x1;
                            clippedVerticesItems[s + 1] = y1;
                            clippedVerticesItems[s + 2] = light.r;
                            clippedVerticesItems[s + 3] = light.g;
                            clippedVerticesItems[s + 4] = light.b;
                            clippedVerticesItems[s + 5] = light.a;
                            if (!twoColor) {
                                clippedVerticesItems[s + 6] = u1;
                                clippedVerticesItems[s + 7] = v1;
                                clippedVerticesItems[s + 8] = x2;
                                clippedVerticesItems[s + 9] = y2;
                                clippedVerticesItems[s + 10] = light.r;
                                clippedVerticesItems[s + 11] = light.g;
                                clippedVerticesItems[s + 12] = light.b;
                                clippedVerticesItems[s + 13] = light.a;
                                clippedVerticesItems[s + 14] = u2;
                                clippedVerticesItems[s + 15] = v2;
                                clippedVerticesItems[s + 16] = x3;
                                clippedVerticesItems[s + 17] = y3;
                                clippedVerticesItems[s + 18] = light.r;
                                clippedVerticesItems[s + 19] = light.g;
                                clippedVerticesItems[s + 20] = light.b;
                                clippedVerticesItems[s + 21] = light.a;
                                clippedVerticesItems[s + 22] = u3;
                                clippedVerticesItems[s + 23] = v3;
                            }
                            else {
                                clippedVerticesItems[s + 6] = u1;
                                clippedVerticesItems[s + 7] = v1;
                                clippedVerticesItems[s + 8] = dark.r;
                                clippedVerticesItems[s + 9] = dark.g;
                                clippedVerticesItems[s + 10] = dark.b;
                                clippedVerticesItems[s + 11] = dark.a;
                                clippedVerticesItems[s + 12] = x2;
                                clippedVerticesItems[s + 13] = y2;
                                clippedVerticesItems[s + 14] = light.r;
                                clippedVerticesItems[s + 15] = light.g;
                                clippedVerticesItems[s + 16] = light.b;
                                clippedVerticesItems[s + 17] = light.a;
                                clippedVerticesItems[s + 18] = u2;
                                clippedVerticesItems[s + 19] = v2;
                                clippedVerticesItems[s + 20] = dark.r;
                                clippedVerticesItems[s + 21] = dark.g;
                                clippedVerticesItems[s + 22] = dark.b;
                                clippedVerticesItems[s + 23] = dark.a;
                                clippedVerticesItems[s + 24] = x3;
                                clippedVerticesItems[s + 25] = y3;
                                clippedVerticesItems[s + 26] = light.r;
                                clippedVerticesItems[s + 27] = light.g;
                                clippedVerticesItems[s + 28] = light.b;
                                clippedVerticesItems[s + 29] = light.a;
                                clippedVerticesItems[s + 30] = u3;
                                clippedVerticesItems[s + 31] = v3;
                                clippedVerticesItems[s + 32] = dark.r;
                                clippedVerticesItems[s + 33] = dark.g;
                                clippedVerticesItems[s + 34] = dark.b;
                                clippedVerticesItems[s + 35] = dark.a;
                            }
                            s = clippedTriangles.length;
                            var clippedTrianglesItems = core.Utils.setArraySize(clippedTriangles, s + 3);
                            clippedTrianglesItems[s] = index;
                            clippedTrianglesItems[s + 1] = (index + 1);
                            clippedTrianglesItems[s + 2] = (index + 2);
                            index += 3;
                            continue outer;
                        }
                    }
                }
            };
            SkeletonClipping.prototype.clip = function (x1, y1, x2, y2, x3, y3, clippingArea, output) {
                var originalOutput = output;
                var clipped = false;
                var input = null;
                if (clippingArea.length % 4 >= 2) {
                    input = output;
                    output = this.scratch;
                }
                else
                    input = this.scratch;
                input.length = 0;
                input.push(x1);
                input.push(y1);
                input.push(x2);
                input.push(y2);
                input.push(x3);
                input.push(y3);
                input.push(x1);
                input.push(y1);
                output.length = 0;
                var clippingVertices = clippingArea;
                var clippingVerticesLast = clippingArea.length - 4;
                for (var i = 0;; i += 2) {
                    var edgeX = clippingVertices[i], edgeY = clippingVertices[i + 1];
                    var edgeX2 = clippingVertices[i + 2], edgeY2 = clippingVertices[i + 3];
                    var deltaX = edgeX - edgeX2, deltaY = edgeY - edgeY2;
                    var inputVertices = input;
                    var inputVerticesLength = input.length - 2, outputStart = output.length;
                    for (var ii = 0; ii < inputVerticesLength; ii += 2) {
                        var inputX = inputVertices[ii], inputY = inputVertices[ii + 1];
                        var inputX2 = inputVertices[ii + 2], inputY2 = inputVertices[ii + 3];
                        var side2 = deltaX * (inputY2 - edgeY2) - deltaY * (inputX2 - edgeX2) > 0;
                        if (deltaX * (inputY - edgeY2) - deltaY * (inputX - edgeX2) > 0) {
                            if (side2) {
                                output.push(inputX2);
                                output.push(inputY2);
                                continue;
                            }
                            var c0 = inputY2 - inputY, c2 = inputX2 - inputX;
                            var ua = (c2 * (edgeY - inputY) - c0 * (edgeX - inputX)) / (c0 * (edgeX2 - edgeX) - c2 * (edgeY2 - edgeY));
                            output.push(edgeX + (edgeX2 - edgeX) * ua);
                            output.push(edgeY + (edgeY2 - edgeY) * ua);
                        }
                        else if (side2) {
                            var c0 = inputY2 - inputY, c2 = inputX2 - inputX;
                            var ua = (c2 * (edgeY - inputY) - c0 * (edgeX - inputX)) / (c0 * (edgeX2 - edgeX) - c2 * (edgeY2 - edgeY));
                            output.push(edgeX + (edgeX2 - edgeX) * ua);
                            output.push(edgeY + (edgeY2 - edgeY) * ua);
                            output.push(inputX2);
                            output.push(inputY2);
                        }
                        clipped = true;
                    }
                    if (outputStart == output.length) {
                        originalOutput.length = 0;
                        return true;
                    }
                    output.push(output[0]);
                    output.push(output[1]);
                    if (i == clippingVerticesLast)
                        break;
                    var temp = output;
                    output = input;
                    output.length = 0;
                    input = temp;
                }
                if (originalOutput != output) {
                    originalOutput.length = 0;
                    for (var i = 0, n = output.length - 2; i < n; i++)
                        originalOutput[i] = output[i];
                }
                else
                    originalOutput.length = originalOutput.length - 2;
                return clipped;
            };
            SkeletonClipping.makeClockwise = function (polygon) {
                var vertices = polygon;
                var verticeslength = polygon.length;
                var area = vertices[verticeslength - 2] * vertices[1] - vertices[0] * vertices[verticeslength - 1], p1x = 0, p1y = 0, p2x = 0, p2y = 0;
                for (var i = 0, n = verticeslength - 3; i < n; i += 2) {
                    p1x = vertices[i];
                    p1y = vertices[i + 1];
                    p2x = vertices[i + 2];
                    p2y = vertices[i + 3];
                    area += p1x * p2y - p2x * p1y;
                }
                if (area < 0)
                    return;
                for (var i = 0, lastX = verticeslength - 2, n = verticeslength >> 1; i < n; i += 2) {
                    var x = vertices[i], y = vertices[i + 1];
                    var other = lastX - i;
                    vertices[i] = vertices[other];
                    vertices[i + 1] = vertices[other + 1];
                    vertices[other] = x;
                    vertices[other + 1] = y;
                }
            };
            return SkeletonClipping;
        }());
        core.SkeletonClipping = SkeletonClipping;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var SkeletonData = (function () {
            function SkeletonData() {
                this.bones = new Array();
                this.slots = new Array();
                this.skins = new Array();
                this.events = new Array();
                this.animations = new Array();
                this.ikConstraints = new Array();
                this.transformConstraints = new Array();
                this.pathConstraints = new Array();
                this.fps = 0;
            }
            SkeletonData.prototype.findBone = function (boneName) {
                if (boneName == null)
                    throw new Error("boneName cannot be null.");
                var bones = this.bones;
                for (var i = 0, n = bones.length; i < n; i++) {
                    var bone = bones[i];
                    if (bone.name == boneName)
                        return bone;
                }
                return null;
            };
            SkeletonData.prototype.findBoneIndex = function (boneName) {
                if (boneName == null)
                    throw new Error("boneName cannot be null.");
                var bones = this.bones;
                for (var i = 0, n = bones.length; i < n; i++)
                    if (bones[i].name == boneName)
                        return i;
                return -1;
            };
            SkeletonData.prototype.findSlot = function (slotName) {
                if (slotName == null)
                    throw new Error("slotName cannot be null.");
                var slots = this.slots;
                for (var i = 0, n = slots.length; i < n; i++) {
                    var slot = slots[i];
                    if (slot.name == slotName)
                        return slot;
                }
                return null;
            };
            SkeletonData.prototype.findSlotIndex = function (slotName) {
                if (slotName == null)
                    throw new Error("slotName cannot be null.");
                var slots = this.slots;
                for (var i = 0, n = slots.length; i < n; i++)
                    if (slots[i].name == slotName)
                        return i;
                return -1;
            };
            SkeletonData.prototype.findSkin = function (skinName) {
                if (skinName == null)
                    throw new Error("skinName cannot be null.");
                var skins = this.skins;
                for (var i = 0, n = skins.length; i < n; i++) {
                    var skin = skins[i];
                    if (skin.name == skinName)
                        return skin;
                }
                return null;
            };
            SkeletonData.prototype.findEvent = function (eventDataName) {
                if (eventDataName == null)
                    throw new Error("eventDataName cannot be null.");
                var events = this.events;
                for (var i = 0, n = events.length; i < n; i++) {
                    var event_4 = events[i];
                    if (event_4.name == eventDataName)
                        return event_4;
                }
                return null;
            };
            SkeletonData.prototype.findAnimation = function (animationName) {
                if (animationName == null)
                    throw new Error("animationName cannot be null.");
                var animations = this.animations;
                for (var i = 0, n = animations.length; i < n; i++) {
                    var animation = animations[i];
                    if (animation.name == animationName)
                        return animation;
                }
                return null;
            };
            SkeletonData.prototype.findIkConstraint = function (constraintName) {
                if (constraintName == null)
                    throw new Error("constraintName cannot be null.");
                var ikConstraints = this.ikConstraints;
                for (var i = 0, n = ikConstraints.length; i < n; i++) {
                    var constraint = ikConstraints[i];
                    if (constraint.name == constraintName)
                        return constraint;
                }
                return null;
            };
            SkeletonData.prototype.findTransformConstraint = function (constraintName) {
                if (constraintName == null)
                    throw new Error("constraintName cannot be null.");
                var transformConstraints = this.transformConstraints;
                for (var i = 0, n = transformConstraints.length; i < n; i++) {
                    var constraint = transformConstraints[i];
                    if (constraint.name == constraintName)
                        return constraint;
                }
                return null;
            };
            SkeletonData.prototype.findPathConstraint = function (constraintName) {
                if (constraintName == null)
                    throw new Error("constraintName cannot be null.");
                var pathConstraints = this.pathConstraints;
                for (var i = 0, n = pathConstraints.length; i < n; i++) {
                    var constraint = pathConstraints[i];
                    if (constraint.name == constraintName)
                        return constraint;
                }
                return null;
            };
            SkeletonData.prototype.findPathConstraintIndex = function (pathConstraintName) {
                if (pathConstraintName == null)
                    throw new Error("pathConstraintName cannot be null.");
                var pathConstraints = this.pathConstraints;
                for (var i = 0, n = pathConstraints.length; i < n; i++)
                    if (pathConstraints[i].name == pathConstraintName)
                        return i;
                return -1;
            };
            return SkeletonData;
        }());
        core.SkeletonData = SkeletonData;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var SkeletonJson = (function () {
            function SkeletonJson(attachmentLoader) {
                this.scale = 1;
                this.linkedMeshes = new Array();
                this.attachmentLoader = attachmentLoader;
            }
            SkeletonJson.prototype.readSkeletonData = function (json) {
                var scale = this.scale;
                var skeletonData = new core.SkeletonData();
                var root = typeof (json) === "string" ? JSON.parse(json) : json;
                var skeletonMap = root.skeleton;
                if (skeletonMap != null) {
                    skeletonData.hash = skeletonMap.hash;
                    skeletonData.version = skeletonMap.spine;
                    skeletonData.width = skeletonMap.width;
                    skeletonData.height = skeletonMap.height;
                    skeletonData.fps = skeletonMap.fps;
                    skeletonData.imagesPath = skeletonMap.images;
                }
                if (root.bones) {
                    for (var i = 0; i < root.bones.length; i++) {
                        var boneMap = root.bones[i];
                        var parent_2 = null;
                        var parentName = this.getValue(boneMap, "parent", null);
                        if (parentName != null) {
                            parent_2 = skeletonData.findBone(parentName);
                            if (parent_2 == null)
                                throw new Error("Parent bone not found: " + parentName);
                        }
                        var data = new core.BoneData(skeletonData.bones.length, boneMap.name, parent_2);
                        data.length = this.getValue(boneMap, "length", 0) * scale;
                        data.x = this.getValue(boneMap, "x", 0) * scale;
                        data.y = this.getValue(boneMap, "y", 0) * scale;
                        data.rotation = this.getValue(boneMap, "rotation", 0);
                        data.scaleX = this.getValue(boneMap, "scaleX", 1);
                        data.scaleY = this.getValue(boneMap, "scaleY", 1);
                        data.shearX = this.getValue(boneMap, "shearX", 0);
                        data.shearY = this.getValue(boneMap, "shearY", 0);
                        data.transformMode = SkeletonJson.transformModeFromString(this.getValue(boneMap, "transform", "normal"));
                        skeletonData.bones.push(data);
                    }
                }
                if (root.slots) {
                    for (var i = 0; i < root.slots.length; i++) {
                        var slotMap = root.slots[i];
                        var slotName = slotMap.name;
                        var boneName = slotMap.bone;
                        var boneData = skeletonData.findBone(boneName);
                        if (boneData == null)
                            throw new Error("Slot bone not found: " + boneName);
                        var data = new core.SlotData(skeletonData.slots.length, slotName, boneData);
                        var color = this.getValue(slotMap, "color", null);
                        if (color != null)
                            data.color.setFromString(color);
                        var dark = this.getValue(slotMap, "dark", null);
                        if (dark != null) {
                            data.darkColor = new core.Color(1, 1, 1, 1);
                            data.darkColor.setFromString(dark);
                        }
                        data.attachmentName = this.getValue(slotMap, "attachment", null);
                        data.blendMode = SkeletonJson.blendModeFromString(this.getValue(slotMap, "blend", "normal"));
                        skeletonData.slots.push(data);
                    }
                }
                if (root.ik) {
                    for (var i = 0; i < root.ik.length; i++) {
                        var constraintMap = root.ik[i];
                        var data = new core.IkConstraintData(constraintMap.name);
                        data.order = this.getValue(constraintMap, "order", 0);
                        for (var j = 0; j < constraintMap.bones.length; j++) {
                            var boneName = constraintMap.bones[j];
                            var bone = skeletonData.findBone(boneName);
                            if (bone == null)
                                throw new Error("IK bone not found: " + boneName);
                            data.bones.push(bone);
                        }
                        var targetName = constraintMap.target;
                        data.target = skeletonData.findBone(targetName);
                        if (data.target == null)
                            throw new Error("IK target bone not found: " + targetName);
                        data.bendDirection = this.getValue(constraintMap, "bendPositive", true) ? 1 : -1;
                        data.mix = this.getValue(constraintMap, "mix", 1);
                        skeletonData.ikConstraints.push(data);
                    }
                }
                if (root.transform) {
                    for (var i = 0; i < root.transform.length; i++) {
                        var constraintMap = root.transform[i];
                        var data = new core.TransformConstraintData(constraintMap.name);
                        data.order = this.getValue(constraintMap, "order", 0);
                        for (var j = 0; j < constraintMap.bones.length; j++) {
                            var boneName = constraintMap.bones[j];
                            var bone = skeletonData.findBone(boneName);
                            if (bone == null)
                                throw new Error("Transform constraint bone not found: " + boneName);
                            data.bones.push(bone);
                        }
                        var targetName = constraintMap.target;
                        data.target = skeletonData.findBone(targetName);
                        if (data.target == null)
                            throw new Error("Transform constraint target bone not found: " + targetName);
                        data.local = this.getValue(constraintMap, "local", false);
                        data.relative = this.getValue(constraintMap, "relative", false);
                        data.offsetRotation = this.getValue(constraintMap, "rotation", 0);
                        data.offsetX = this.getValue(constraintMap, "x", 0) * scale;
                        data.offsetY = this.getValue(constraintMap, "y", 0) * scale;
                        data.offsetScaleX = this.getValue(constraintMap, "scaleX", 0);
                        data.offsetScaleY = this.getValue(constraintMap, "scaleY", 0);
                        data.offsetShearY = this.getValue(constraintMap, "shearY", 0);
                        data.rotateMix = this.getValue(constraintMap, "rotateMix", 1);
                        data.translateMix = this.getValue(constraintMap, "translateMix", 1);
                        data.scaleMix = this.getValue(constraintMap, "scaleMix", 1);
                        data.shearMix = this.getValue(constraintMap, "shearMix", 1);
                        skeletonData.transformConstraints.push(data);
                    }
                }
                if (root.path) {
                    for (var i = 0; i < root.path.length; i++) {
                        var constraintMap = root.path[i];
                        var data = new core.PathConstraintData(constraintMap.name);
                        data.order = this.getValue(constraintMap, "order", 0);
                        for (var j = 0; j < constraintMap.bones.length; j++) {
                            var boneName = constraintMap.bones[j];
                            var bone = skeletonData.findBone(boneName);
                            if (bone == null)
                                throw new Error("Transform constraint bone not found: " + boneName);
                            data.bones.push(bone);
                        }
                        var targetName = constraintMap.target;
                        data.target = skeletonData.findSlot(targetName);
                        if (data.target == null)
                            throw new Error("Path target slot not found: " + targetName);
                        data.positionMode = SkeletonJson.positionModeFromString(this.getValue(constraintMap, "positionMode", "percent"));
                        data.spacingMode = SkeletonJson.spacingModeFromString(this.getValue(constraintMap, "spacingMode", "length"));
                        data.rotateMode = SkeletonJson.rotateModeFromString(this.getValue(constraintMap, "rotateMode", "tangent"));
                        data.offsetRotation = this.getValue(constraintMap, "rotation", 0);
                        data.position = this.getValue(constraintMap, "position", 0);
                        if (data.positionMode == core.PositionMode.Fixed)
                            data.position *= scale;
                        data.spacing = this.getValue(constraintMap, "spacing", 0);
                        if (data.spacingMode == core.SpacingMode.Length || data.spacingMode == core.SpacingMode.Fixed)
                            data.spacing *= scale;
                        data.rotateMix = this.getValue(constraintMap, "rotateMix", 1);
                        data.translateMix = this.getValue(constraintMap, "translateMix", 1);
                        skeletonData.pathConstraints.push(data);
                    }
                }
                if (root.skins) {
                    for (var skinName in root.skins) {
                        var skinMap = root.skins[skinName];
                        var skin = new core.Skin(skinName);
                        for (var slotName in skinMap) {
                            var slotIndex = skeletonData.findSlotIndex(slotName);
                            if (slotIndex == -1)
                                throw new Error("Slot not found: " + slotName);
                            var slotMap = skinMap[slotName];
                            for (var entryName in slotMap) {
                                var attachment = this.readAttachment(slotMap[entryName], skin, slotIndex, entryName, skeletonData);
                                if (attachment != null)
                                    skin.addAttachment(slotIndex, entryName, attachment);
                            }
                        }
                        skeletonData.skins.push(skin);
                        if (skin.name == "default")
                            skeletonData.defaultSkin = skin;
                    }
                }
                for (var i = 0, n = this.linkedMeshes.length; i < n; i++) {
                    var linkedMesh = this.linkedMeshes[i];
                    var skin = linkedMesh.skin == null ? skeletonData.defaultSkin : skeletonData.findSkin(linkedMesh.skin);
                    if (skin == null)
                        throw new Error("Skin not found: " + linkedMesh.skin);
                    var parent_3 = skin.getAttachment(linkedMesh.slotIndex, linkedMesh.parent);
                    if (parent_3 == null)
                        throw new Error("Parent mesh not found: " + linkedMesh.parent);
                    linkedMesh.mesh.setParentMesh(parent_3);
                }
                this.linkedMeshes.length = 0;
                if (root.events) {
                    for (var eventName in root.events) {
                        var eventMap = root.events[eventName];
                        var data = new core.EventData(eventName);
                        data.intValue = this.getValue(eventMap, "int", 0);
                        data.floatValue = this.getValue(eventMap, "float", 0);
                        data.stringValue = this.getValue(eventMap, "string", "");
                        data.audio = this.getValue(eventMap, "audio", null);
                        skeletonData.events.push(data);
                    }
                }
                if (root.animations) {
                    for (var animationName in root.animations) {
                        var animationMap = root.animations[animationName];
                        this.readAnimation(animationMap, animationName, skeletonData);
                    }
                }
                return skeletonData;
            };
            SkeletonJson.prototype.readAttachment = function (map, skin, slotIndex, name, skeletonData) {
                var scale = this.scale;
                name = this.getValue(map, "name", name);
                var type = this.getValue(map, "type", "region");
                switch (type) {
                    case "region": {
                        var path = this.getValue(map, "path", name);
                        var region = this.attachmentLoader.newRegionAttachment(skin, name, path);
                        if (region == null)
                            return null;
                        region.path = path;
                        region.x = this.getValue(map, "x", 0) * scale;
                        region.y = this.getValue(map, "y", 0) * scale;
                        region.scaleX = this.getValue(map, "scaleX", 1);
                        region.scaleY = this.getValue(map, "scaleY", 1);
                        region.rotation = this.getValue(map, "rotation", 0);
                        region.width = map.width * scale;
                        region.height = map.height * scale;
                        var color = this.getValue(map, "color", null);
                        if (color != null)
                            region.color.setFromString(color);
                        return region;
                    }
                    case "boundingbox": {
                        var box = this.attachmentLoader.newBoundingBoxAttachment(skin, name);
                        if (box == null)
                            return null;
                        this.readVertices(map, box, map.vertexCount << 1);
                        var color = this.getValue(map, "color", null);
                        if (color != null)
                            box.color.setFromString(color);
                        return box;
                    }
                    case "mesh":
                    case "linkedmesh": {
                        var path = this.getValue(map, "path", name);
                        var mesh = this.attachmentLoader.newMeshAttachment(skin, name, path);
                        if (mesh == null)
                            return null;
                        mesh.path = path;
                        var color = this.getValue(map, "color", null);
                        if (color != null)
                            mesh.color.setFromString(color);
                        var parent_4 = this.getValue(map, "parent", null);
                        if (parent_4 != null) {
                            mesh.inheritDeform = this.getValue(map, "deform", true);
                            this.linkedMeshes.push(new LinkedMesh(mesh, this.getValue(map, "skin", null), slotIndex, parent_4));
                            return mesh;
                        }
                        var uvs = map.uvs;
                        this.readVertices(map, mesh, uvs.length);
                        mesh.triangles = map.triangles;
                        mesh.regionUVs = uvs;
                        mesh.hullLength = this.getValue(map, "hull", 0) * 2;
                        return mesh;
                    }
                    case "path": {
                        var path = this.attachmentLoader.newPathAttachment(skin, name);
                        if (path == null)
                            return null;
                        path.closed = this.getValue(map, "closed", false);
                        path.constantSpeed = this.getValue(map, "constantSpeed", true);
                        var vertexCount = map.vertexCount;
                        this.readVertices(map, path, vertexCount << 1);
                        var lengths = core.Utils.newArray(vertexCount / 3, 0);
                        for (var i = 0; i < map.lengths.length; i++)
                            lengths[i] = map.lengths[i] * scale;
                        path.lengths = lengths;
                        var color = this.getValue(map, "color", null);
                        if (color != null)
                            path.color.setFromString(color);
                        return path;
                    }
                    case "point": {
                        var point = this.attachmentLoader.newPointAttachment(skin, name);
                        if (point == null)
                            return null;
                        point.x = this.getValue(map, "x", 0) * scale;
                        point.y = this.getValue(map, "y", 0) * scale;
                        point.rotation = this.getValue(map, "rotation", 0);
                        var color = this.getValue(map, "color", null);
                        if (color != null)
                            point.color.setFromString(color);
                        return point;
                    }
                    case "clipping": {
                        var clip = this.attachmentLoader.newClippingAttachment(skin, name);
                        if (clip == null)
                            return null;
                        var end = this.getValue(map, "end", null);
                        if (end != null) {
                            var slot = skeletonData.findSlot(end);
                            if (slot == null)
                                throw new Error("Clipping end slot not found: " + end);
                            clip.endSlot = slot;
                        }
                        var vertexCount = map.vertexCount;
                        this.readVertices(map, clip, vertexCount << 1);
                        var color = this.getValue(map, "color", null);
                        if (color != null)
                            clip.color.setFromString(color);
                        return clip;
                    }
                }
                return null;
            };
            SkeletonJson.prototype.readVertices = function (map, attachment, verticesLength) {
                var scale = this.scale;
                attachment.worldVerticesLength = verticesLength;
                var vertices = map.vertices;
                if (verticesLength == vertices.length) {
                    var scaledVertices = core.Utils.toFloatArray(vertices);
                    if (scale != 1) {
                        for (var i = 0, n = vertices.length; i < n; i++)
                            scaledVertices[i] *= scale;
                    }
                    attachment.vertices = scaledVertices;
                    return;
                }
                var weights = new Array();
                var bones = new Array();
                for (var i = 0, n = vertices.length; i < n;) {
                    var boneCount = vertices[i++];
                    bones.push(boneCount);
                    for (var nn = i + boneCount * 4; i < nn; i += 4) {
                        bones.push(vertices[i]);
                        weights.push(vertices[i + 1] * scale);
                        weights.push(vertices[i + 2] * scale);
                        weights.push(vertices[i + 3]);
                    }
                }
                attachment.bones = bones;
                attachment.vertices = core.Utils.toFloatArray(weights);
            };
            SkeletonJson.prototype.readAnimation = function (map, name, skeletonData) {
                var scale = this.scale;
                var timelines = new Array();
                var duration = 0;
                if (map.slots) {
                    for (var slotName in map.slots) {
                        var slotMap = map.slots[slotName];
                        var slotIndex = skeletonData.findSlotIndex(slotName);
                        if (slotIndex == -1)
                            throw new Error("Slot not found: " + slotName);
                        for (var timelineName in slotMap) {
                            var timelineMap = slotMap[timelineName];
                            if (timelineName == "attachment") {
                                var timeline = new core.AttachmentTimeline(timelineMap.length);
                                timeline.slotIndex = slotIndex;
                                var frameIndex = 0;
                                for (var i = 0; i < timelineMap.length; i++) {
                                    var valueMap = timelineMap[i];
                                    timeline.setFrame(frameIndex++, valueMap.time, valueMap.name);
                                }
                                timelines.push(timeline);
                                duration = Math.max(duration, timeline.frames[timeline.getFrameCount() - 1]);
                            }
                            else if (timelineName == "color") {
                                var timeline = new core.ColorTimeline(timelineMap.length);
                                timeline.slotIndex = slotIndex;
                                var frameIndex = 0;
                                for (var i = 0; i < timelineMap.length; i++) {
                                    var valueMap = timelineMap[i];
                                    var color = new core.Color();
                                    color.setFromString(valueMap.color || "ffffffff");
                                    timeline.setFrame(frameIndex, valueMap.time, color.r, color.g, color.b, color.a);
                                    this.readCurve(valueMap, timeline, frameIndex);
                                    frameIndex++;
                                }
                                timelines.push(timeline);
                                duration = Math.max(duration, timeline.frames[(timeline.getFrameCount() - 1) * core.ColorTimeline.ENTRIES]);
                            }
                            else if (timelineName == "twoColor") {
                                var timeline = new core.TwoColorTimeline(timelineMap.length);
                                timeline.slotIndex = slotIndex;
                                var frameIndex = 0;
                                for (var i = 0; i < timelineMap.length; i++) {
                                    var valueMap = timelineMap[i];
                                    var light = new core.Color();
                                    var dark = new core.Color();
                                    light.setFromString(valueMap.light);
                                    dark.setFromString(valueMap.dark);
                                    timeline.setFrame(frameIndex, valueMap.time, light.r, light.g, light.b, light.a, dark.r, dark.g, dark.b);
                                    this.readCurve(valueMap, timeline, frameIndex);
                                    frameIndex++;
                                }
                                timelines.push(timeline);
                                duration = Math.max(duration, timeline.frames[(timeline.getFrameCount() - 1) * core.TwoColorTimeline.ENTRIES]);
                            }
                            else
                                throw new Error("Invalid timeline type for a slot: " + timelineName + " (" + slotName + ")");
                        }
                    }
                }
                if (map.bones) {
                    for (var boneName in map.bones) {
                        var boneMap = map.bones[boneName];
                        var boneIndex = skeletonData.findBoneIndex(boneName);
                        if (boneIndex == -1)
                            throw new Error("Bone not found: " + boneName);
                        for (var timelineName in boneMap) {
                            var timelineMap = boneMap[timelineName];
                            if (timelineName === "rotate") {
                                var timeline = new core.RotateTimeline(timelineMap.length);
                                timeline.boneIndex = boneIndex;
                                var frameIndex = 0;
                                for (var i = 0; i < timelineMap.length; i++) {
                                    var valueMap = timelineMap[i];
                                    timeline.setFrame(frameIndex, valueMap.time, valueMap.angle);
                                    this.readCurve(valueMap, timeline, frameIndex);
                                    frameIndex++;
                                }
                                timelines.push(timeline);
                                duration = Math.max(duration, timeline.frames[(timeline.getFrameCount() - 1) * core.RotateTimeline.ENTRIES]);
                            }
                            else if (timelineName === "translate" || timelineName === "scale" || timelineName === "shear") {
                                var timeline = null;
                                var timelineScale = 1;
                                if (timelineName === "scale")
                                    timeline = new core.ScaleTimeline(timelineMap.length);
                                else if (timelineName === "shear")
                                    timeline = new core.ShearTimeline(timelineMap.length);
                                else {
                                    timeline = new core.TranslateTimeline(timelineMap.length);
                                    timelineScale = scale;
                                }
                                timeline.boneIndex = boneIndex;
                                var frameIndex = 0;
                                for (var i = 0; i < timelineMap.length; i++) {
                                    var valueMap = timelineMap[i];
                                    var x = this.getValue(valueMap, "x", 0), y = this.getValue(valueMap, "y", 0);
                                    timeline.setFrame(frameIndex, valueMap.time, x * timelineScale, y * timelineScale);
                                    this.readCurve(valueMap, timeline, frameIndex);
                                    frameIndex++;
                                }
                                timelines.push(timeline);
                                duration = Math.max(duration, timeline.frames[(timeline.getFrameCount() - 1) * core.TranslateTimeline.ENTRIES]);
                            }
                            else
                                throw new Error("Invalid timeline type for a bone: " + timelineName + " (" + boneName + ")");
                        }
                    }
                }
                if (map.ik) {
                    for (var constraintName in map.ik) {
                        var constraintMap = map.ik[constraintName];
                        var constraint = skeletonData.findIkConstraint(constraintName);
                        var timeline = new core.IkConstraintTimeline(constraintMap.length);
                        timeline.ikConstraintIndex = skeletonData.ikConstraints.indexOf(constraint);
                        var frameIndex = 0;
                        for (var i = 0; i < constraintMap.length; i++) {
                            var valueMap = constraintMap[i];
                            timeline.setFrame(frameIndex, valueMap.time, this.getValue(valueMap, "mix", 1), this.getValue(valueMap, "bendPositive", true) ? 1 : -1);
                            this.readCurve(valueMap, timeline, frameIndex);
                            frameIndex++;
                        }
                        timelines.push(timeline);
                        duration = Math.max(duration, timeline.frames[(timeline.getFrameCount() - 1) * core.IkConstraintTimeline.ENTRIES]);
                    }
                }
                if (map.transform) {
                    for (var constraintName in map.transform) {
                        var constraintMap = map.transform[constraintName];
                        var constraint = skeletonData.findTransformConstraint(constraintName);
                        var timeline = new core.TransformConstraintTimeline(constraintMap.length);
                        timeline.transformConstraintIndex = skeletonData.transformConstraints.indexOf(constraint);
                        var frameIndex = 0;
                        for (var i = 0; i < constraintMap.length; i++) {
                            var valueMap = constraintMap[i];
                            timeline.setFrame(frameIndex, valueMap.time, this.getValue(valueMap, "rotateMix", 1), this.getValue(valueMap, "translateMix", 1), this.getValue(valueMap, "scaleMix", 1), this.getValue(valueMap, "shearMix", 1));
                            this.readCurve(valueMap, timeline, frameIndex);
                            frameIndex++;
                        }
                        timelines.push(timeline);
                        duration = Math.max(duration, timeline.frames[(timeline.getFrameCount() - 1) * core.TransformConstraintTimeline.ENTRIES]);
                    }
                }
                if (map.paths) {
                    for (var constraintName in map.paths) {
                        var constraintMap = map.paths[constraintName];
                        var index = skeletonData.findPathConstraintIndex(constraintName);
                        if (index == -1)
                            throw new Error("Path constraint not found: " + constraintName);
                        var data = skeletonData.pathConstraints[index];
                        for (var timelineName in constraintMap) {
                            var timelineMap = constraintMap[timelineName];
                            if (timelineName === "position" || timelineName === "spacing") {
                                var timeline = null;
                                var timelineScale = 1;
                                if (timelineName === "spacing") {
                                    timeline = new core.PathConstraintSpacingTimeline(timelineMap.length);
                                    if (data.spacingMode == core.SpacingMode.Length || data.spacingMode == core.SpacingMode.Fixed)
                                        timelineScale = scale;
                                }
                                else {
                                    timeline = new core.PathConstraintPositionTimeline(timelineMap.length);
                                    if (data.positionMode == core.PositionMode.Fixed)
                                        timelineScale = scale;
                                }
                                timeline.pathConstraintIndex = index;
                                var frameIndex = 0;
                                for (var i = 0; i < timelineMap.length; i++) {
                                    var valueMap = timelineMap[i];
                                    timeline.setFrame(frameIndex, valueMap.time, this.getValue(valueMap, timelineName, 0) * timelineScale);
                                    this.readCurve(valueMap, timeline, frameIndex);
                                    frameIndex++;
                                }
                                timelines.push(timeline);
                                duration = Math.max(duration, timeline.frames[(timeline.getFrameCount() - 1) * core.PathConstraintPositionTimeline.ENTRIES]);
                            }
                            else if (timelineName === "mix") {
                                var timeline = new core.PathConstraintMixTimeline(timelineMap.length);
                                timeline.pathConstraintIndex = index;
                                var frameIndex = 0;
                                for (var i = 0; i < timelineMap.length; i++) {
                                    var valueMap = timelineMap[i];
                                    timeline.setFrame(frameIndex, valueMap.time, this.getValue(valueMap, "rotateMix", 1), this.getValue(valueMap, "translateMix", 1));
                                    this.readCurve(valueMap, timeline, frameIndex);
                                    frameIndex++;
                                }
                                timelines.push(timeline);
                                duration = Math.max(duration, timeline.frames[(timeline.getFrameCount() - 1) * core.PathConstraintMixTimeline.ENTRIES]);
                            }
                        }
                    }
                }
                if (map.deform) {
                    for (var deformName in map.deform) {
                        var deformMap = map.deform[deformName];
                        var skin = skeletonData.findSkin(deformName);
                        if (skin == null)
                            throw new Error("Skin not found: " + deformName);
                        for (var slotName in deformMap) {
                            var slotMap = deformMap[slotName];
                            var slotIndex = skeletonData.findSlotIndex(slotName);
                            if (slotIndex == -1)
                                throw new Error("Slot not found: " + slotMap.name);
                            for (var timelineName in slotMap) {
                                var timelineMap = slotMap[timelineName];
                                var attachment = skin.getAttachment(slotIndex, timelineName);
                                if (attachment == null)
                                    throw new Error("Deform attachment not found: " + timelineMap.name);
                                var weighted = attachment.bones != null;
                                var vertices = attachment.vertices;
                                var deformLength = weighted ? vertices.length / 3 * 2 : vertices.length;
                                var timeline = new core.DeformTimeline(timelineMap.length);
                                timeline.slotIndex = slotIndex;
                                timeline.attachment = attachment;
                                var frameIndex = 0;
                                for (var j = 0; j < timelineMap.length; j++) {
                                    var valueMap = timelineMap[j];
                                    var deform = void 0;
                                    var verticesValue = this.getValue(valueMap, "vertices", null);
                                    if (verticesValue == null)
                                        deform = weighted ? core.Utils.newFloatArray(deformLength) : vertices;
                                    else {
                                        deform = core.Utils.newFloatArray(deformLength);
                                        var start = this.getValue(valueMap, "offset", 0);
                                        core.Utils.arrayCopy(verticesValue, 0, deform, start, verticesValue.length);
                                        if (scale != 1) {
                                            for (var i = start, n = i + verticesValue.length; i < n; i++)
                                                deform[i] *= scale;
                                        }
                                        if (!weighted) {
                                            for (var i = 0; i < deformLength; i++)
                                                deform[i] += vertices[i];
                                        }
                                    }
                                    timeline.setFrame(frameIndex, valueMap.time, deform);
                                    this.readCurve(valueMap, timeline, frameIndex);
                                    frameIndex++;
                                }
                                timelines.push(timeline);
                                duration = Math.max(duration, timeline.frames[timeline.getFrameCount() - 1]);
                            }
                        }
                    }
                }
                var drawOrderNode = map.drawOrder;
                if (drawOrderNode == null)
                    drawOrderNode = map.draworder;
                if (drawOrderNode != null) {
                    var timeline = new core.DrawOrderTimeline(drawOrderNode.length);
                    var slotCount = skeletonData.slots.length;
                    var frameIndex = 0;
                    for (var j = 0; j < drawOrderNode.length; j++) {
                        var drawOrderMap = drawOrderNode[j];
                        var drawOrder = null;
                        var offsets = this.getValue(drawOrderMap, "offsets", null);
                        if (offsets != null) {
                            drawOrder = core.Utils.newArray(slotCount, -1);
                            var unchanged = core.Utils.newArray(slotCount - offsets.length, 0);
                            var originalIndex = 0, unchangedIndex = 0;
                            for (var i = 0; i < offsets.length; i++) {
                                var offsetMap = offsets[i];
                                var slotIndex = skeletonData.findSlotIndex(offsetMap.slot);
                                if (slotIndex == -1)
                                    throw new Error("Slot not found: " + offsetMap.slot);
                                while (originalIndex != slotIndex)
                                    unchanged[unchangedIndex++] = originalIndex++;
                                drawOrder[originalIndex + offsetMap.offset] = originalIndex++;
                            }
                            while (originalIndex < slotCount)
                                unchanged[unchangedIndex++] = originalIndex++;
                            for (var i = slotCount - 1; i >= 0; i--)
                                if (drawOrder[i] == -1)
                                    drawOrder[i] = unchanged[--unchangedIndex];
                        }
                        timeline.setFrame(frameIndex++, drawOrderMap.time, drawOrder);
                    }
                    timelines.push(timeline);
                    duration = Math.max(duration, timeline.frames[timeline.getFrameCount() - 1]);
                }
                if (map.events) {
                    var timeline = new core.EventTimeline(map.events.length);
                    var frameIndex = 0;
                    for (var i = 0; i < map.events.length; i++) {
                        var eventMap = map.events[i];
                        var eventData = skeletonData.findEvent(eventMap.name);
                        if (eventData == null)
                            throw new Error("Event not found: " + eventMap.name);
                        var event_5 = new core.Event(core.Utils.toSinglePrecision(eventMap.time), eventData);
                        event_5.intValue = this.getValue(eventMap, "int", eventData.intValue);
                        event_5.floatValue = this.getValue(eventMap, "float", eventData.floatValue);
                        event_5.stringValue = this.getValue(eventMap, "string", eventData.stringValue);
                        timeline.setFrame(frameIndex++, event_5);
                    }
                    timelines.push(timeline);
                    duration = Math.max(duration, timeline.frames[timeline.getFrameCount() - 1]);
                }
                if (isNaN(duration)) {
                    throw new Error("Error while parsing animation, duration is NaN");
                }
                skeletonData.animations.push(new core.Animation(name, timelines, duration));
            };
            SkeletonJson.prototype.readCurve = function (map, timeline, frameIndex) {
                if (!map.curve)
                    return;
                if (map.curve === "stepped")
                    timeline.setStepped(frameIndex);
                else if (Object.prototype.toString.call(map.curve) === '[object Array]') {
                    var curve = map.curve;
                    timeline.setCurve(frameIndex, curve[0], curve[1], curve[2], curve[3]);
                }
            };
            SkeletonJson.prototype.getValue = function (map, prop, defaultValue) {
                return map[prop] !== undefined ? map[prop] : defaultValue;
            };
            SkeletonJson.blendModeFromString = function (str) {
                str = str.toLowerCase();
                if (str == "normal")
                    return core.BlendMode.Normal;
                if (str == "additive")
                    return core.BlendMode.Additive;
                if (str == "multiply")
                    return core.BlendMode.Multiply;
                if (str == "screen")
                    return core.BlendMode.Screen;
                throw new Error("Unknown blend mode: " + str);
            };
            SkeletonJson.positionModeFromString = function (str) {
                str = str.toLowerCase();
                if (str == "fixed")
                    return core.PositionMode.Fixed;
                if (str == "percent")
                    return core.PositionMode.Percent;
                throw new Error("Unknown position mode: " + str);
            };
            SkeletonJson.spacingModeFromString = function (str) {
                str = str.toLowerCase();
                if (str == "length")
                    return core.SpacingMode.Length;
                if (str == "fixed")
                    return core.SpacingMode.Fixed;
                if (str == "percent")
                    return core.SpacingMode.Percent;
                throw new Error("Unknown position mode: " + str);
            };
            SkeletonJson.rotateModeFromString = function (str) {
                str = str.toLowerCase();
                if (str == "tangent")
                    return core.RotateMode.Tangent;
                if (str == "chain")
                    return core.RotateMode.Chain;
                if (str == "chainscale")
                    return core.RotateMode.ChainScale;
                throw new Error("Unknown rotate mode: " + str);
            };
            SkeletonJson.transformModeFromString = function (str) {
                str = str.toLowerCase();
                if (str == "normal")
                    return core.TransformMode.Normal;
                if (str == "onlytranslation")
                    return core.TransformMode.OnlyTranslation;
                if (str == "norotationorreflection")
                    return core.TransformMode.NoRotationOrReflection;
                if (str == "noscale")
                    return core.TransformMode.NoScale;
                if (str == "noscaleorreflection")
                    return core.TransformMode.NoScaleOrReflection;
                throw new Error("Unknown transform mode: " + str);
            };
            return SkeletonJson;
        }());
        core.SkeletonJson = SkeletonJson;
        var LinkedMesh = (function () {
            function LinkedMesh(mesh, skin, slotIndex, parent) {
                this.mesh = mesh;
                this.skin = skin;
                this.slotIndex = slotIndex;
                this.parent = parent;
            }
            return LinkedMesh;
        }());
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var Skin = (function () {
            function Skin(name) {
                this.attachments = new Array();
                if (name == null)
                    throw new Error("name cannot be null.");
                this.name = name;
            }
            Skin.prototype.addAttachment = function (slotIndex, name, attachment) {
                if (attachment == null)
                    throw new Error("attachment cannot be null.");
                var attachments = this.attachments;
                if (slotIndex >= attachments.length)
                    attachments.length = slotIndex + 1;
                if (!attachments[slotIndex])
                    attachments[slotIndex] = {};
                attachments[slotIndex][name] = attachment;
            };
            Skin.prototype.getAttachment = function (slotIndex, name) {
                var dictionary = this.attachments[slotIndex];
                return dictionary ? dictionary[name] : null;
            };
            Skin.prototype.attachAll = function (skeleton, oldSkin) {
                var slotIndex = 0;
                for (var i = 0; i < skeleton.slots.length; i++) {
                    var slot = skeleton.slots[i];
                    var slotAttachment = slot.getAttachment();
                    if (slotAttachment && slotIndex < oldSkin.attachments.length) {
                        var dictionary = oldSkin.attachments[slotIndex];
                        for (var key in dictionary) {
                            var skinAttachment = dictionary[key];
                            if (slotAttachment == skinAttachment) {
                                var attachment = this.getAttachment(slotIndex, key);
                                if (attachment != null)
                                    slot.setAttachment(attachment);
                                break;
                            }
                        }
                    }
                    slotIndex++;
                }
            };
            return Skin;
        }());
        core.Skin = Skin;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var Slot = (function () {
            function Slot(data, bone) {
                this.attachmentVertices = new Array();
                if (data == null)
                    throw new Error("data cannot be null.");
                if (bone == null)
                    throw new Error("bone cannot be null.");
                this.data = data;
                this.bone = bone;
                this.color = new core.Color();
                this.darkColor = data.darkColor == null ? null : new core.Color();
                this.setToSetupPose();
                this.blendMode = this.data.blendMode;
            }
            Slot.prototype.getAttachment = function () {
                return this.attachment;
            };
            Slot.prototype.setAttachment = function (attachment) {
                if (this.attachment == attachment)
                    return;
                this.attachment = attachment;
                this.attachmentTime = this.bone.skeleton.time;
                this.attachmentVertices.length = 0;
            };
            Slot.prototype.setAttachmentTime = function (time) {
                this.attachmentTime = this.bone.skeleton.time - time;
            };
            Slot.prototype.getAttachmentTime = function () {
                return this.bone.skeleton.time - this.attachmentTime;
            };
            Slot.prototype.setToSetupPose = function () {
                this.color.setFromColor(this.data.color);
                if (this.darkColor != null)
                    this.darkColor.setFromColor(this.data.darkColor);
                if (this.data.attachmentName == null)
                    this.attachment = null;
                else {
                    this.attachment = null;
                    this.setAttachment(this.bone.skeleton.getAttachment(this.data.index, this.data.attachmentName));
                }
            };
            return Slot;
        }());
        core.Slot = Slot;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var SlotData = (function () {
            function SlotData(index, name, boneData) {
                this.color = new core.Color(1, 1, 1, 1);
                if (index < 0)
                    throw new Error("index must be >= 0.");
                if (name == null)
                    throw new Error("name cannot be null.");
                if (boneData == null)
                    throw new Error("boneData cannot be null.");
                this.index = index;
                this.name = name;
                this.boneData = boneData;
            }
            return SlotData;
        }());
        core.SlotData = SlotData;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var Texture = (function () {
            function Texture(image) {
                this._image = image;
            }
            Texture.prototype.getImage = function () {
                return this._image;
            };
            Texture.filterFromString = function (text) {
                switch (text.toLowerCase()) {
                    case "nearest": return TextureFilter.Nearest;
                    case "linear": return TextureFilter.Linear;
                    case "mipmap": return TextureFilter.MipMap;
                    case "mipmapnearestnearest": return TextureFilter.MipMapNearestNearest;
                    case "mipmaplinearnearest": return TextureFilter.MipMapLinearNearest;
                    case "mipmapnearestlinear": return TextureFilter.MipMapNearestLinear;
                    case "mipmaplinearlinear": return TextureFilter.MipMapLinearLinear;
                    default: throw new Error("Unknown texture filter " + text);
                }
            };
            Texture.wrapFromString = function (text) {
                switch (text.toLowerCase()) {
                    case "mirroredtepeat": return TextureWrap.MirroredRepeat;
                    case "clamptoedge": return TextureWrap.ClampToEdge;
                    case "repeat": return TextureWrap.Repeat;
                    default: throw new Error("Unknown texture wrap " + text);
                }
            };
            return Texture;
        }());
        core.Texture = Texture;
        var TextureFilter;
        (function (TextureFilter) {
            TextureFilter[TextureFilter["Nearest"] = 9728] = "Nearest";
            TextureFilter[TextureFilter["Linear"] = 9729] = "Linear";
            TextureFilter[TextureFilter["MipMap"] = 9987] = "MipMap";
            TextureFilter[TextureFilter["MipMapNearestNearest"] = 9984] = "MipMapNearestNearest";
            TextureFilter[TextureFilter["MipMapLinearNearest"] = 9985] = "MipMapLinearNearest";
            TextureFilter[TextureFilter["MipMapNearestLinear"] = 9986] = "MipMapNearestLinear";
            TextureFilter[TextureFilter["MipMapLinearLinear"] = 9987] = "MipMapLinearLinear";
        })(TextureFilter = core.TextureFilter || (core.TextureFilter = {}));
        var TextureWrap;
        (function (TextureWrap) {
            TextureWrap[TextureWrap["MirroredRepeat"] = 33648] = "MirroredRepeat";
            TextureWrap[TextureWrap["ClampToEdge"] = 33071] = "ClampToEdge";
            TextureWrap[TextureWrap["Repeat"] = 10497] = "Repeat";
        })(TextureWrap = core.TextureWrap || (core.TextureWrap = {}));
        var TextureRegion = (function () {
            function TextureRegion() {
                this.size = null;
            }
            Object.defineProperty(TextureRegion.prototype, "width", {
                get: function () {
                    var tex = this.texture;
                    if (PIXI.VERSION[0] == '3') {
                        return tex.crop.width;
                    }
                    if (tex.trim) {
                        return tex.trim.width;
                    }
                    return tex.orig.width;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextureRegion.prototype, "height", {
                get: function () {
                    var tex = this.texture;
                    if (PIXI.VERSION[0] == '3') {
                        return tex.crop.height;
                    }
                    if (tex.trim) {
                        return tex.trim.height;
                    }
                    return tex.orig.height;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextureRegion.prototype, "u", {
                get: function () {
                    return this.texture._uvs.x0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextureRegion.prototype, "v", {
                get: function () {
                    return this.texture._uvs.y0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextureRegion.prototype, "u2", {
                get: function () {
                    return this.texture._uvs.x2;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextureRegion.prototype, "v2", {
                get: function () {
                    return this.texture._uvs.y2;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextureRegion.prototype, "offsetX", {
                get: function () {
                    var tex = this.texture;
                    return tex.trim ? tex.trim.x : 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextureRegion.prototype, "offsetY", {
                get: function () {
                    console.warn("Deprecation Warning: @Hackerham: I guess, if you are using PIXI-SPINE ATLAS region.offsetY, you want a texture, right? Use region.texture from now on.");
                    return this.spineOffsetY;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextureRegion.prototype, "pixiOffsetY", {
                get: function () {
                    var tex = this.texture;
                    return tex.trim ? tex.trim.y : 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextureRegion.prototype, "spineOffsetY", {
                get: function () {
                    var tex = this.texture;
                    return this.originalHeight - this.height - (tex.trim ? tex.trim.y : 0);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextureRegion.prototype, "originalWidth", {
                get: function () {
                    var tex = this.texture;
                    if (PIXI.VERSION[0] == '3') {
                        if (tex.trim) {
                            return tex.trim.width;
                        }
                        return tex.crop.width;
                    }
                    return tex.orig.width;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextureRegion.prototype, "originalHeight", {
                get: function () {
                    var tex = this.texture;
                    if (PIXI.VERSION[0] == '3') {
                        if (tex.trim) {
                            return tex.trim.height;
                        }
                        return tex.crop.height;
                    }
                    return tex.orig.height;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextureRegion.prototype, "x", {
                get: function () {
                    return this.texture.frame.x;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextureRegion.prototype, "y", {
                get: function () {
                    return this.texture.frame.y;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextureRegion.prototype, "rotate", {
                get: function () {
                    return this.texture.rotate !== 0;
                },
                enumerable: true,
                configurable: true
            });
            return TextureRegion;
        }());
        core.TextureRegion = TextureRegion;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var TextureAtlas = (function () {
            function TextureAtlas(atlasText, textureLoader, callback) {
                this.pages = new Array();
                this.regions = new Array();
                if (atlasText) {
                    this.addSpineAtlas(atlasText, textureLoader, callback);
                }
            }
            TextureAtlas.prototype.addTexture = function (name, texture) {
                var pages = this.pages;
                var page = null;
                for (var i = 0; i < pages.length; i++) {
                    if (pages[i].baseTexture === texture.baseTexture) {
                        page = pages[i];
                        break;
                    }
                }
                if (page === null) {
                    page = new TextureAtlasPage();
                    page.name = 'texturePage';
                    var baseTexture = texture.baseTexture;
                    page.width = baseTexture.realWidth;
                    page.height = baseTexture.realHeight;
                    page.baseTexture = baseTexture;
                    page.minFilter = page.magFilter = core.TextureFilter.Nearest;
                    page.uWrap = core.TextureWrap.ClampToEdge;
                    page.vWrap = core.TextureWrap.ClampToEdge;
                    pages.push(page);
                }
                var region = new TextureAtlasRegion();
                region.name = name;
                region.page = page;
                region.texture = texture;
                region.index = -1;
                this.regions.push(region);
                return region;
            };
            TextureAtlas.prototype.addTextureHash = function (textures, stripExtension) {
                for (var key in textures) {
                    if (textures.hasOwnProperty(key)) {
                        this.addTexture(stripExtension && key.indexOf('.') !== -1 ? key.substr(0, key.lastIndexOf('.')) : key, textures[key]);
                    }
                }
            };
            TextureAtlas.prototype.addSpineAtlas = function (atlasText, textureLoader, callback) {
                return this.load(atlasText, textureLoader, callback);
            };
            TextureAtlas.prototype.load = function (atlasText, textureLoader, callback) {
                var _this = this;
                if (textureLoader == null)
                    throw new Error("textureLoader cannot be null.");
                var reader = new TextureAtlasReader(atlasText);
                var tuple = new Array(4);
                var page = null;
                var iterateParser = function () {
                    while (true) {
                        var line = reader.readLine();
                        if (line == null) {
                            return callback && callback(_this);
                        }
                        line = line.trim();
                        if (line.length == 0)
                            page = null;
                        else if (!page) {
                            page = new TextureAtlasPage();
                            page.name = line;
                            if (reader.readTuple(tuple) == 2) {
                                page.width = parseInt(tuple[0]);
                                page.height = parseInt(tuple[1]);
                                reader.readTuple(tuple);
                            }
                            reader.readTuple(tuple);
                            page.minFilter = core.Texture.filterFromString(tuple[0]);
                            page.magFilter = core.Texture.filterFromString(tuple[1]);
                            var direction = reader.readValue();
                            page.uWrap = core.TextureWrap.ClampToEdge;
                            page.vWrap = core.TextureWrap.ClampToEdge;
                            if (direction == "x")
                                page.uWrap = core.TextureWrap.Repeat;
                            else if (direction == "y")
                                page.vWrap = core.TextureWrap.Repeat;
                            else if (direction == "xy")
                                page.uWrap = page.vWrap = core.TextureWrap.Repeat;
                            textureLoader(line, function (texture) {
                                page.baseTexture = texture;
                                if (!texture.hasLoaded) {
                                    texture.width = page.width;
                                    texture.height = page.height;
                                }
                                _this.pages.push(page);
                                page.setFilters();
                                if (!page.width || !page.height) {
                                    page.width = texture.realWidth;
                                    page.height = texture.realHeight;
                                    if (!page.width || !page.height) {
                                        console.log("ERROR spine atlas page " + page.name + ": meshes wont work if you dont specify size in atlas (http://www.html5gamedevs.com/topic/18888-pixi-spines-and-meshes/?p=107121)");
                                    }
                                }
                                iterateParser();
                            });
                            _this.pages.push(page);
                            break;
                        }
                        else {
                            var region = new TextureAtlasRegion();
                            region.name = line;
                            region.page = page;
                            var rotate = reader.readValue() == "true" ? 6 : 0;
                            reader.readTuple(tuple);
                            var x = parseInt(tuple[0]);
                            var y = parseInt(tuple[1]);
                            reader.readTuple(tuple);
                            var width = parseInt(tuple[0]);
                            var height = parseInt(tuple[1]);
                            var resolution = page.baseTexture.resolution;
                            x /= resolution;
                            y /= resolution;
                            width /= resolution;
                            height /= resolution;
                            var frame = new PIXI.Rectangle(x, y, rotate ? height : width, rotate ? width : height);
                            if (reader.readTuple(tuple) == 4) {
                                if (reader.readTuple(tuple) == 4) {
                                    reader.readTuple(tuple);
                                }
                            }
                            var originalWidth = parseInt(tuple[0]) / resolution;
                            var originalHeight = parseInt(tuple[1]) / resolution;
                            reader.readTuple(tuple);
                            var offsetX = parseInt(tuple[0]) / resolution;
                            var offsetY = parseInt(tuple[1]) / resolution;
                            var orig = new PIXI.Rectangle(0, 0, originalWidth, originalHeight);
                            var trim = new PIXI.Rectangle(offsetX, originalHeight - height - offsetY, width, height);
                            if (PIXI.VERSION[0] != '3') {
                                region.texture = new PIXI.Texture(region.page.baseTexture, frame, orig, trim, rotate);
                            }
                            else {
                                var frame2 = new PIXI.Rectangle(x, y, width, height);
                                var crop = frame2.clone();
                                trim.width = originalWidth;
                                trim.height = originalHeight;
                                region.texture = new PIXI.Texture(region.page.baseTexture, frame2, crop, trim, rotate);
                            }
                            region.index = parseInt(reader.readValue());
                            region.texture._updateUvs();
                            _this.regions.push(region);
                        }
                    }
                };
                iterateParser();
            };
            TextureAtlas.prototype.findRegion = function (name) {
                for (var i = 0; i < this.regions.length; i++) {
                    if (this.regions[i].name == name) {
                        return this.regions[i];
                    }
                }
                return null;
            };
            TextureAtlas.prototype.dispose = function () {
                for (var i = 0; i < this.pages.length; i++) {
                    this.pages[i].baseTexture.dispose();
                }
            };
            return TextureAtlas;
        }());
        core.TextureAtlas = TextureAtlas;
        var TextureAtlasReader = (function () {
            function TextureAtlasReader(text) {
                this.index = 0;
                this.lines = text.split(/\r\n|\r|\n/);
            }
            TextureAtlasReader.prototype.readLine = function () {
                if (this.index >= this.lines.length)
                    return null;
                return this.lines[this.index++];
            };
            TextureAtlasReader.prototype.readValue = function () {
                var line = this.readLine();
                var colon = line.indexOf(":");
                if (colon == -1)
                    throw new Error("Invalid line: " + line);
                return line.substring(colon + 1).trim();
            };
            TextureAtlasReader.prototype.readTuple = function (tuple) {
                var line = this.readLine();
                var colon = line.indexOf(":");
                if (colon == -1)
                    throw new Error("Invalid line: " + line);
                var i = 0, lastMatch = colon + 1;
                for (; i < 3; i++) {
                    var comma = line.indexOf(",", lastMatch);
                    if (comma == -1)
                        break;
                    tuple[i] = line.substr(lastMatch, comma - lastMatch).trim();
                    lastMatch = comma + 1;
                }
                tuple[i] = line.substring(lastMatch).trim();
                return i + 1;
            };
            return TextureAtlasReader;
        }());
        var TextureAtlasPage = (function () {
            function TextureAtlasPage() {
            }
            TextureAtlasPage.prototype.setFilters = function () {
                var tex = this.baseTexture;
                var filter = this.minFilter;
                if (filter == core.TextureFilter.Linear) {
                    tex.scaleMode = PIXI.SCALE_MODES.LINEAR;
                }
                else if (this.minFilter == core.TextureFilter.Nearest) {
                    tex.scaleMode = PIXI.SCALE_MODES.NEAREST;
                }
                else {
                    tex.mipmap = true;
                    if (filter == core.TextureFilter.MipMapNearestNearest) {
                        tex.scaleMode = PIXI.SCALE_MODES.NEAREST;
                    }
                    else {
                        tex.scaleMode = PIXI.SCALE_MODES.LINEAR;
                    }
                }
            };
            return TextureAtlasPage;
        }());
        core.TextureAtlasPage = TextureAtlasPage;
        var TextureAtlasRegion = (function (_super) {
            __extends(TextureAtlasRegion, _super);
            function TextureAtlasRegion() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return TextureAtlasRegion;
        }(core.TextureRegion));
        core.TextureAtlasRegion = TextureAtlasRegion;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var TransformConstraint = (function () {
            function TransformConstraint(data, skeleton) {
                this.rotateMix = 0;
                this.translateMix = 0;
                this.scaleMix = 0;
                this.shearMix = 0;
                this.temp = new core.Vector2();
                if (data == null)
                    throw new Error("data cannot be null.");
                if (skeleton == null)
                    throw new Error("skeleton cannot be null.");
                this.data = data;
                this.rotateMix = data.rotateMix;
                this.translateMix = data.translateMix;
                this.scaleMix = data.scaleMix;
                this.shearMix = data.shearMix;
                this.bones = new Array();
                for (var i = 0; i < data.bones.length; i++)
                    this.bones.push(skeleton.findBone(data.bones[i].name));
                this.target = skeleton.findBone(data.target.name);
            }
            TransformConstraint.prototype.apply = function () {
                this.update();
            };
            TransformConstraint.prototype.update = function () {
                if (this.data.local) {
                    if (this.data.relative)
                        this.applyRelativeLocal();
                    else
                        this.applyAbsoluteLocal();
                }
                else {
                    if (this.data.relative)
                        this.applyRelativeWorld();
                    else
                        this.applyAbsoluteWorld();
                }
            };
            TransformConstraint.prototype.applyAbsoluteWorld = function () {
                var rotateMix = this.rotateMix, translateMix = this.translateMix, scaleMix = this.scaleMix, shearMix = this.shearMix;
                var target = this.target;
                var targetMat = target.matrix;
                var ta = targetMat.a, tb = targetMat.c, tc = targetMat.b, td = targetMat.d;
                var degRadReflect = ta * td - tb * tc > 0 ? core.MathUtils.degRad : -core.MathUtils.degRad;
                var offsetRotation = this.data.offsetRotation * degRadReflect;
                var offsetShearY = this.data.offsetShearY * degRadReflect;
                var bones = this.bones;
                for (var i = 0, n = bones.length; i < n; i++) {
                    var bone = bones[i];
                    var modified = false;
                    var mat = bone.matrix;
                    if (rotateMix != 0) {
                        var a = mat.a, b = mat.c, c = mat.b, d = mat.d;
                        var r = Math.atan2(tc, ta) - Math.atan2(c, a) + offsetRotation;
                        if (r > core.MathUtils.PI)
                            r -= core.MathUtils.PI2;
                        else if (r < -core.MathUtils.PI)
                            r += core.MathUtils.PI2;
                        r *= rotateMix;
                        var cos = Math.cos(r), sin = Math.sin(r);
                        mat.a = cos * a - sin * c;
                        mat.c = cos * b - sin * d;
                        mat.b = sin * a + cos * c;
                        mat.d = sin * b + cos * d;
                        modified = true;
                    }
                    if (translateMix != 0) {
                        var temp = this.temp;
                        target.localToWorld(temp.set(this.data.offsetX, this.data.offsetY));
                        mat.tx += (temp.x - mat.tx) * translateMix;
                        mat.ty += (temp.y - mat.ty) * translateMix;
                        modified = true;
                    }
                    if (scaleMix > 0) {
                        var s = Math.sqrt(mat.a * mat.a + mat.b * mat.b);
                        var ts = Math.sqrt(ta * ta + tc * tc);
                        if (s > 0.00001)
                            s = (s + (ts - s + this.data.offsetScaleX) * scaleMix) / s;
                        mat.a *= s;
                        mat.b *= s;
                        s = Math.sqrt(mat.c * mat.c + mat.d * mat.d);
                        ts = Math.sqrt(tb * tb + td * td);
                        if (s > 0.00001)
                            s = (s + (ts - s + this.data.offsetScaleY) * scaleMix) / s;
                        mat.c *= s;
                        mat.d *= s;
                        modified = true;
                    }
                    if (shearMix > 0) {
                        var b = mat.c, d = mat.d;
                        var by = Math.atan2(d, b);
                        var r = Math.atan2(td, tb) - Math.atan2(tc, ta) - (by - Math.atan2(mat.b, mat.a));
                        if (r > core.MathUtils.PI)
                            r -= core.MathUtils.PI2;
                        else if (r < -core.MathUtils.PI)
                            r += core.MathUtils.PI2;
                        r = by + (r + offsetShearY) * shearMix;
                        var s = Math.sqrt(b * b + d * d);
                        mat.c = Math.cos(r) * s;
                        mat.d = Math.sin(r) * s;
                        modified = true;
                    }
                    if (modified)
                        bone.appliedValid = false;
                }
            };
            TransformConstraint.prototype.applyRelativeWorld = function () {
                var rotateMix = this.rotateMix, translateMix = this.translateMix, scaleMix = this.scaleMix, shearMix = this.shearMix;
                var target = this.target;
                var targetMat = target.matrix;
                var ta = targetMat.a, tb = targetMat.c, tc = targetMat.b, td = targetMat.d;
                var degRadReflect = ta * td - tb * tc > 0 ? core.MathUtils.degRad : -core.MathUtils.degRad;
                var offsetRotation = this.data.offsetRotation * degRadReflect, offsetShearY = this.data.offsetShearY * degRadReflect;
                var bones = this.bones;
                for (var i = 0, n = bones.length; i < n; i++) {
                    var bone = bones[i];
                    var modified = false;
                    var mat = bone.matrix;
                    if (rotateMix != 0) {
                        var a = mat.a, b = mat.c, c = mat.b, d = mat.d;
                        var r = Math.atan2(tc, ta) + offsetRotation;
                        if (r > core.MathUtils.PI)
                            r -= core.MathUtils.PI2;
                        else if (r < -core.MathUtils.PI)
                            r += core.MathUtils.PI2;
                        r *= rotateMix;
                        var cos = Math.cos(r), sin = Math.sin(r);
                        mat.a = cos * a - sin * c;
                        mat.c = cos * b - sin * d;
                        mat.b = sin * a + cos * c;
                        mat.d = sin * b + cos * d;
                        modified = true;
                    }
                    if (translateMix != 0) {
                        var temp = this.temp;
                        target.localToWorld(temp.set(this.data.offsetX, this.data.offsetY));
                        mat.tx += temp.x * translateMix;
                        mat.ty += temp.y * translateMix;
                        modified = true;
                    }
                    if (scaleMix > 0) {
                        var s = (Math.sqrt(ta * ta + tc * tc) - 1 + this.data.offsetScaleX) * scaleMix + 1;
                        mat.a *= s;
                        mat.b *= s;
                        s = (Math.sqrt(tb * tb + td * td) - 1 + this.data.offsetScaleY) * scaleMix + 1;
                        mat.c *= s;
                        mat.d *= s;
                        modified = true;
                    }
                    if (shearMix > 0) {
                        var r = Math.atan2(td, tb) - Math.atan2(tc, ta);
                        if (r > core.MathUtils.PI)
                            r -= core.MathUtils.PI2;
                        else if (r < -core.MathUtils.PI)
                            r += core.MathUtils.PI2;
                        var b = mat.c, d = mat.d;
                        r = Math.atan2(d, b) + (r - core.MathUtils.PI / 2 + offsetShearY) * shearMix;
                        var s = Math.sqrt(b * b + d * d);
                        mat.c = Math.cos(r) * s;
                        mat.d = Math.sin(r) * s;
                        modified = true;
                    }
                    if (modified)
                        bone.appliedValid = false;
                }
            };
            TransformConstraint.prototype.applyAbsoluteLocal = function () {
                var rotateMix = this.rotateMix, translateMix = this.translateMix, scaleMix = this.scaleMix, shearMix = this.shearMix;
                var target = this.target;
                if (!target.appliedValid)
                    target.updateAppliedTransform();
                var bones = this.bones;
                for (var i = 0, n = bones.length; i < n; i++) {
                    var bone = bones[i];
                    if (!bone.appliedValid)
                        bone.updateAppliedTransform();
                    var rotation = bone.arotation;
                    if (rotateMix != 0) {
                        var r = target.arotation - rotation + this.data.offsetRotation;
                        r -= (16384 - ((16384.499999999996 - r / 360) | 0)) * 360;
                        rotation += r * rotateMix;
                    }
                    var x = bone.ax, y = bone.ay;
                    if (translateMix != 0) {
                        x += (target.ax - x + this.data.offsetX) * translateMix;
                        y += (target.ay - y + this.data.offsetY) * translateMix;
                    }
                    var scaleX = bone.ascaleX, scaleY = bone.ascaleY;
                    if (scaleMix > 0) {
                        if (scaleX > 0.00001)
                            scaleX = (scaleX + (target.ascaleX - scaleX + this.data.offsetScaleX) * scaleMix) / scaleX;
                        if (scaleY > 0.00001)
                            scaleY = (scaleY + (target.ascaleY - scaleY + this.data.offsetScaleY) * scaleMix) / scaleY;
                    }
                    var shearY = bone.ashearY;
                    if (shearMix > 0) {
                        var r = target.ashearY - shearY + this.data.offsetShearY;
                        r -= (16384 - ((16384.499999999996 - r / 360) | 0)) * 360;
                        bone.shearY += r * shearMix;
                    }
                    bone.updateWorldTransformWith(x, y, rotation, scaleX, scaleY, bone.ashearX, shearY);
                }
            };
            TransformConstraint.prototype.applyRelativeLocal = function () {
                var rotateMix = this.rotateMix, translateMix = this.translateMix, scaleMix = this.scaleMix, shearMix = this.shearMix;
                var target = this.target;
                if (!target.appliedValid)
                    target.updateAppliedTransform();
                var bones = this.bones;
                for (var i = 0, n = bones.length; i < n; i++) {
                    var bone = bones[i];
                    if (!bone.appliedValid)
                        bone.updateAppliedTransform();
                    var rotation = bone.arotation;
                    if (rotateMix != 0)
                        rotation += (target.arotation + this.data.offsetRotation) * rotateMix;
                    var x = bone.ax, y = bone.ay;
                    if (translateMix != 0) {
                        x += (target.ax + this.data.offsetX) * translateMix;
                        y += (target.ay + this.data.offsetY) * translateMix;
                    }
                    var scaleX = bone.ascaleX, scaleY = bone.ascaleY;
                    if (scaleMix > 0) {
                        if (scaleX > 0.00001)
                            scaleX *= ((target.ascaleX - 1 + this.data.offsetScaleX) * scaleMix) + 1;
                        if (scaleY > 0.00001)
                            scaleY *= ((target.ascaleY - 1 + this.data.offsetScaleY) * scaleMix) + 1;
                    }
                    var shearY = bone.ashearY;
                    if (shearMix > 0)
                        shearY += (target.ashearY + this.data.offsetShearY) * shearMix;
                    bone.updateWorldTransformWith(x, y, rotation, scaleX, scaleY, bone.ashearX, shearY);
                }
            };
            TransformConstraint.prototype.getOrder = function () {
                return this.data.order;
            };
            return TransformConstraint;
        }());
        core.TransformConstraint = TransformConstraint;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var TransformConstraintData = (function () {
            function TransformConstraintData(name) {
                this.order = 0;
                this.bones = new Array();
                this.rotateMix = 0;
                this.translateMix = 0;
                this.scaleMix = 0;
                this.shearMix = 0;
                this.offsetRotation = 0;
                this.offsetX = 0;
                this.offsetY = 0;
                this.offsetScaleX = 0;
                this.offsetScaleY = 0;
                this.offsetShearY = 0;
                this.relative = false;
                this.local = false;
                if (name == null)
                    throw new Error("name cannot be null.");
                this.name = name;
            }
            return TransformConstraintData;
        }());
        core.TransformConstraintData = TransformConstraintData;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var Triangulator = (function () {
            function Triangulator() {
                this.convexPolygons = new Array();
                this.convexPolygonsIndices = new Array();
                this.indicesArray = new Array();
                this.isConcaveArray = new Array();
                this.triangles = new Array();
                this.polygonPool = new core.Pool(function () {
                    return new Array();
                });
                this.polygonIndicesPool = new core.Pool(function () {
                    return new Array();
                });
            }
            Triangulator.prototype.triangulate = function (verticesArray) {
                var vertices = verticesArray;
                var vertexCount = verticesArray.length >> 1;
                var indices = this.indicesArray;
                indices.length = 0;
                for (var i = 0; i < vertexCount; i++)
                    indices[i] = i;
                var isConcave = this.isConcaveArray;
                isConcave.length = 0;
                for (var i = 0, n = vertexCount; i < n; ++i)
                    isConcave[i] = Triangulator.isConcave(i, vertexCount, vertices, indices);
                var triangles = this.triangles;
                triangles.length = 0;
                while (vertexCount > 3) {
                    var previous = vertexCount - 1, i = 0, next = 1;
                    while (true) {
                        outer: if (!isConcave[i]) {
                            var p1 = indices[previous] << 1, p2 = indices[i] << 1, p3 = indices[next] << 1;
                            var p1x = vertices[p1], p1y = vertices[p1 + 1];
                            var p2x = vertices[p2], p2y = vertices[p2 + 1];
                            var p3x = vertices[p3], p3y = vertices[p3 + 1];
                            for (var ii = (next + 1) % vertexCount; ii != previous; ii = (ii + 1) % vertexCount) {
                                if (!isConcave[ii])
                                    continue;
                                var v = indices[ii] << 1;
                                var vx = vertices[v], vy = vertices[v + 1];
                                if (Triangulator.positiveArea(p3x, p3y, p1x, p1y, vx, vy)) {
                                    if (Triangulator.positiveArea(p1x, p1y, p2x, p2y, vx, vy)) {
                                        if (Triangulator.positiveArea(p2x, p2y, p3x, p3y, vx, vy))
                                            break outer;
                                    }
                                }
                            }
                            break;
                        }
                        if (next == 0) {
                            do {
                                if (!isConcave[i])
                                    break;
                                i--;
                            } while (i > 0);
                            break;
                        }
                        previous = i;
                        i = next;
                        next = (next + 1) % vertexCount;
                    }
                    triangles.push(indices[(vertexCount + i - 1) % vertexCount]);
                    triangles.push(indices[i]);
                    triangles.push(indices[(i + 1) % vertexCount]);
                    indices.splice(i, 1);
                    isConcave.splice(i, 1);
                    vertexCount--;
                    var previousIndex = (vertexCount + i - 1) % vertexCount;
                    var nextIndex = i == vertexCount ? 0 : i;
                    isConcave[previousIndex] = Triangulator.isConcave(previousIndex, vertexCount, vertices, indices);
                    isConcave[nextIndex] = Triangulator.isConcave(nextIndex, vertexCount, vertices, indices);
                }
                if (vertexCount == 3) {
                    triangles.push(indices[2]);
                    triangles.push(indices[0]);
                    triangles.push(indices[1]);
                }
                return triangles;
            };
            Triangulator.prototype.decompose = function (verticesArray, triangles) {
                var vertices = verticesArray;
                var convexPolygons = this.convexPolygons;
                this.polygonPool.freeAll(convexPolygons);
                convexPolygons.length = 0;
                var convexPolygonsIndices = this.convexPolygonsIndices;
                this.polygonIndicesPool.freeAll(convexPolygonsIndices);
                convexPolygonsIndices.length = 0;
                var polygonIndices = this.polygonIndicesPool.obtain();
                polygonIndices.length = 0;
                var polygon = this.polygonPool.obtain();
                polygon.length = 0;
                var fanBaseIndex = -1, lastWinding = 0;
                for (var i = 0, n = triangles.length; i < n; i += 3) {
                    var t1 = triangles[i] << 1, t2 = triangles[i + 1] << 1, t3 = triangles[i + 2] << 1;
                    var x1 = vertices[t1], y1 = vertices[t1 + 1];
                    var x2 = vertices[t2], y2 = vertices[t2 + 1];
                    var x3 = vertices[t3], y3 = vertices[t3 + 1];
                    var merged = false;
                    if (fanBaseIndex == t1) {
                        var o = polygon.length - 4;
                        var winding1 = Triangulator.winding(polygon[o], polygon[o + 1], polygon[o + 2], polygon[o + 3], x3, y3);
                        var winding2 = Triangulator.winding(x3, y3, polygon[0], polygon[1], polygon[2], polygon[3]);
                        if (winding1 == lastWinding && winding2 == lastWinding) {
                            polygon.push(x3);
                            polygon.push(y3);
                            polygonIndices.push(t3);
                            merged = true;
                        }
                    }
                    if (!merged) {
                        if (polygon.length > 0) {
                            convexPolygons.push(polygon);
                            convexPolygonsIndices.push(polygonIndices);
                        }
                        else {
                            this.polygonPool.free(polygon);
                            this.polygonIndicesPool.free(polygonIndices);
                        }
                        polygon = this.polygonPool.obtain();
                        polygon.length = 0;
                        polygon.push(x1);
                        polygon.push(y1);
                        polygon.push(x2);
                        polygon.push(y2);
                        polygon.push(x3);
                        polygon.push(y3);
                        polygonIndices = this.polygonIndicesPool.obtain();
                        polygonIndices.length = 0;
                        polygonIndices.push(t1);
                        polygonIndices.push(t2);
                        polygonIndices.push(t3);
                        lastWinding = Triangulator.winding(x1, y1, x2, y2, x3, y3);
                        fanBaseIndex = t1;
                    }
                }
                if (polygon.length > 0) {
                    convexPolygons.push(polygon);
                    convexPolygonsIndices.push(polygonIndices);
                }
                for (var i = 0, n = convexPolygons.length; i < n; i++) {
                    polygonIndices = convexPolygonsIndices[i];
                    if (polygonIndices.length == 0)
                        continue;
                    var firstIndex = polygonIndices[0];
                    var lastIndex = polygonIndices[polygonIndices.length - 1];
                    polygon = convexPolygons[i];
                    var o = polygon.length - 4;
                    var prevPrevX = polygon[o], prevPrevY = polygon[o + 1];
                    var prevX = polygon[o + 2], prevY = polygon[o + 3];
                    var firstX = polygon[0], firstY = polygon[1];
                    var secondX = polygon[2], secondY = polygon[3];
                    var winding = Triangulator.winding(prevPrevX, prevPrevY, prevX, prevY, firstX, firstY);
                    for (var ii = 0; ii < n; ii++) {
                        if (ii == i)
                            continue;
                        var otherIndices = convexPolygonsIndices[ii];
                        if (otherIndices.length != 3)
                            continue;
                        var otherFirstIndex = otherIndices[0];
                        var otherSecondIndex = otherIndices[1];
                        var otherLastIndex = otherIndices[2];
                        var otherPoly = convexPolygons[ii];
                        var x3 = otherPoly[otherPoly.length - 2], y3 = otherPoly[otherPoly.length - 1];
                        if (otherFirstIndex != firstIndex || otherSecondIndex != lastIndex)
                            continue;
                        var winding1 = Triangulator.winding(prevPrevX, prevPrevY, prevX, prevY, x3, y3);
                        var winding2 = Triangulator.winding(x3, y3, firstX, firstY, secondX, secondY);
                        if (winding1 == winding && winding2 == winding) {
                            otherPoly.length = 0;
                            otherIndices.length = 0;
                            polygon.push(x3);
                            polygon.push(y3);
                            polygonIndices.push(otherLastIndex);
                            prevPrevX = prevX;
                            prevPrevY = prevY;
                            prevX = x3;
                            prevY = y3;
                            ii = 0;
                        }
                    }
                }
                for (var i = convexPolygons.length - 1; i >= 0; i--) {
                    polygon = convexPolygons[i];
                    if (polygon.length == 0) {
                        convexPolygons.splice(i, 1);
                        this.polygonPool.free(polygon);
                        polygonIndices = convexPolygonsIndices[i];
                        convexPolygonsIndices.splice(i, 1);
                        this.polygonIndicesPool.free(polygonIndices);
                    }
                }
                return convexPolygons;
            };
            Triangulator.isConcave = function (index, vertexCount, vertices, indices) {
                var previous = indices[(vertexCount + index - 1) % vertexCount] << 1;
                var current = indices[index] << 1;
                var next = indices[(index + 1) % vertexCount] << 1;
                return !this.positiveArea(vertices[previous], vertices[previous + 1], vertices[current], vertices[current + 1], vertices[next], vertices[next + 1]);
            };
            Triangulator.positiveArea = function (p1x, p1y, p2x, p2y, p3x, p3y) {
                return p1x * (p3y - p2y) + p2x * (p1y - p3y) + p3x * (p2y - p1y) >= 0;
            };
            Triangulator.winding = function (p1x, p1y, p2x, p2y, p3x, p3y) {
                var px = p2x - p1x, py = p2y - p1y;
                return p3x * py - p3y * px + px * p1y - p1x * py >= 0 ? 1 : -1;
            };
            return Triangulator;
        }());
        core.Triangulator = Triangulator;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var IntSet = (function () {
            function IntSet() {
                this.array = new Array();
            }
            IntSet.prototype.add = function (value) {
                var contains = this.contains(value);
                this.array[value | 0] = value | 0;
                return !contains;
            };
            IntSet.prototype.contains = function (value) {
                return this.array[value | 0] != undefined;
            };
            IntSet.prototype.remove = function (value) {
                this.array[value | 0] = undefined;
            };
            IntSet.prototype.clear = function () {
                this.array.length = 0;
            };
            return IntSet;
        }());
        core.IntSet = IntSet;
        var Color = (function () {
            function Color(r, g, b, a) {
                if (r === void 0) { r = 0; }
                if (g === void 0) { g = 0; }
                if (b === void 0) { b = 0; }
                if (a === void 0) { a = 0; }
                this.r = r;
                this.g = g;
                this.b = b;
                this.a = a;
            }
            Color.prototype.set = function (r, g, b, a) {
                this.r = r;
                this.g = g;
                this.b = b;
                this.a = a;
                this.clamp();
                return this;
            };
            Color.prototype.setFromColor = function (c) {
                this.r = c.r;
                this.g = c.g;
                this.b = c.b;
                this.a = c.a;
                return this;
            };
            Color.prototype.setFromString = function (hex) {
                hex = hex.charAt(0) == '#' ? hex.substr(1) : hex;
                this.r = parseInt(hex.substr(0, 2), 16) / 255.0;
                this.g = parseInt(hex.substr(2, 2), 16) / 255.0;
                this.b = parseInt(hex.substr(4, 2), 16) / 255.0;
                this.a = (hex.length != 8 ? 255 : parseInt(hex.substr(6, 2), 16)) / 255.0;
                return this;
            };
            Color.prototype.add = function (r, g, b, a) {
                this.r += r;
                this.g += g;
                this.b += b;
                this.a += a;
                this.clamp();
                return this;
            };
            Color.prototype.clamp = function () {
                if (this.r < 0)
                    this.r = 0;
                else if (this.r > 1)
                    this.r = 1;
                if (this.g < 0)
                    this.g = 0;
                else if (this.g > 1)
                    this.g = 1;
                if (this.b < 0)
                    this.b = 0;
                else if (this.b > 1)
                    this.b = 1;
                if (this.a < 0)
                    this.a = 0;
                else if (this.a > 1)
                    this.a = 1;
                return this;
            };
            Color.WHITE = new Color(1, 1, 1, 1);
            Color.RED = new Color(1, 0, 0, 1);
            Color.GREEN = new Color(0, 1, 0, 1);
            Color.BLUE = new Color(0, 0, 1, 1);
            Color.MAGENTA = new Color(1, 0, 1, 1);
            return Color;
        }());
        core.Color = Color;
        var MathUtils = (function () {
            function MathUtils() {
            }
            MathUtils.clamp = function (value, min, max) {
                if (value < min)
                    return min;
                if (value > max)
                    return max;
                return value;
            };
            MathUtils.cosDeg = function (degrees) {
                return Math.cos(degrees * MathUtils.degRad);
            };
            MathUtils.sinDeg = function (degrees) {
                return Math.sin(degrees * MathUtils.degRad);
            };
            MathUtils.signum = function (value) {
                return value > 0 ? 1 : value < 0 ? -1 : 0;
            };
            MathUtils.toInt = function (x) {
                return x > 0 ? Math.floor(x) : Math.ceil(x);
            };
            MathUtils.cbrt = function (x) {
                var y = Math.pow(Math.abs(x), 1 / 3);
                return x < 0 ? -y : y;
            };
            MathUtils.randomTriangular = function (min, max) {
                return MathUtils.randomTriangularWith(min, max, (min + max) * 0.5);
            };
            MathUtils.randomTriangularWith = function (min, max, mode) {
                var u = Math.random();
                var d = max - min;
                if (u <= (mode - min) / d)
                    return min + Math.sqrt(u * d * (mode - min));
                return max - Math.sqrt((1 - u) * d * (max - mode));
            };
            MathUtils.PI = 3.1415927;
            MathUtils.PI2 = MathUtils.PI * 2;
            MathUtils.radiansToDegrees = 180 / MathUtils.PI;
            MathUtils.radDeg = MathUtils.radiansToDegrees;
            MathUtils.degreesToRadians = MathUtils.PI / 180;
            MathUtils.degRad = MathUtils.degreesToRadians;
            return MathUtils;
        }());
        core.MathUtils = MathUtils;
        var Interpolation = (function () {
            function Interpolation() {
            }
            Interpolation.prototype.apply = function (start, end, a) {
                return start + (end - start) * this.applyInternal(a);
            };
            return Interpolation;
        }());
        core.Interpolation = Interpolation;
        var Pow = (function (_super) {
            __extends(Pow, _super);
            function Pow(power) {
                var _this = _super.call(this) || this;
                _this.power = 2;
                _this.power = power;
                return _this;
            }
            Pow.prototype.applyInternal = function (a) {
                if (a <= 0.5)
                    return Math.pow(a * 2, this.power) / 2;
                return Math.pow((a - 1) * 2, this.power) / (this.power % 2 == 0 ? -2 : 2) + 1;
            };
            return Pow;
        }(Interpolation));
        core.Pow = Pow;
        var PowOut = (function (_super) {
            __extends(PowOut, _super);
            function PowOut(power) {
                return _super.call(this, power) || this;
            }
            PowOut.prototype.applyInternal = function (a) {
                return Math.pow(a - 1, this.power) * (this.power % 2 == 0 ? -1 : 1) + 1;
            };
            return PowOut;
        }(Pow));
        core.PowOut = PowOut;
        var Utils = (function () {
            function Utils() {
            }
            Utils.arrayCopy = function (source, sourceStart, dest, destStart, numElements) {
                for (var i = sourceStart, j = destStart; i < sourceStart + numElements; i++, j++) {
                    dest[j] = source[i];
                }
            };
            Utils.setArraySize = function (array, size, value) {
                if (value === void 0) { value = 0; }
                var oldSize = array.length;
                if (oldSize == size)
                    return array;
                array.length = size;
                if (oldSize < size) {
                    for (var i = oldSize; i < size; i++)
                        array[i] = value;
                }
                return array;
            };
            Utils.ensureArrayCapacity = function (array, size, value) {
                if (value === void 0) { value = 0; }
                if (array.length >= size)
                    return array;
                return Utils.setArraySize(array, size, value);
            };
            Utils.newArray = function (size, defaultValue) {
                var array = new Array(size);
                for (var i = 0; i < size; i++)
                    array[i] = defaultValue;
                return array;
            };
            Utils.newFloatArray = function (size) {
                if (Utils.SUPPORTS_TYPED_ARRAYS) {
                    return new Float32Array(size);
                }
                else {
                    var array = new Array(size);
                    for (var i = 0; i < array.length; i++)
                        array[i] = 0;
                    return array;
                }
            };
            Utils.newShortArray = function (size) {
                if (Utils.SUPPORTS_TYPED_ARRAYS) {
                    return new Int16Array(size);
                }
                else {
                    var array = new Array(size);
                    for (var i = 0; i < array.length; i++)
                        array[i] = 0;
                    return array;
                }
            };
            Utils.toFloatArray = function (array) {
                return Utils.SUPPORTS_TYPED_ARRAYS ? new Float32Array(array) : array;
            };
            Utils.toSinglePrecision = function (value) {
                return Utils.SUPPORTS_TYPED_ARRAYS ? Math.fround(value) : value;
            };
            Utils.webkit602BugfixHelper = function (alpha, pose) {
            };
            Utils.SUPPORTS_TYPED_ARRAYS = typeof (Float32Array) !== "undefined";
            return Utils;
        }());
        core.Utils = Utils;
        var DebugUtils = (function () {
            function DebugUtils() {
            }
            DebugUtils.logBones = function (skeleton) {
                for (var i = 0; i < skeleton.bones.length; i++) {
                    var bone = skeleton.bones[i];
                    var mat = bone.matrix;
                    console.log(bone.data.name + ", " + mat.a + ", " + mat.b + ", " + mat.c + ", " + mat.d + ", " + mat.tx + ", " + mat.ty);
                }
            };
            return DebugUtils;
        }());
        core.DebugUtils = DebugUtils;
        var Pool = (function () {
            function Pool(instantiator) {
                this.items = new Array();
                this.instantiator = instantiator;
            }
            Pool.prototype.obtain = function () {
                return this.items.length > 0 ? this.items.pop() : this.instantiator();
            };
            Pool.prototype.free = function (item) {
                if (item.reset)
                    item.reset();
                this.items.push(item);
            };
            Pool.prototype.freeAll = function (items) {
                for (var i = 0; i < items.length; i++) {
                    if (items[i].reset)
                        items[i].reset();
                    this.items[i] = items[i];
                }
            };
            Pool.prototype.clear = function () {
                this.items.length = 0;
            };
            return Pool;
        }());
        core.Pool = Pool;
        var Vector2 = (function () {
            function Vector2(x, y) {
                if (x === void 0) { x = 0; }
                if (y === void 0) { y = 0; }
                this.x = x;
                this.y = y;
            }
            Vector2.prototype.set = function (x, y) {
                this.x = x;
                this.y = y;
                return this;
            };
            Vector2.prototype.length = function () {
                var x = this.x;
                var y = this.y;
                return Math.sqrt(x * x + y * y);
            };
            Vector2.prototype.normalize = function () {
                var len = this.length();
                if (len != 0) {
                    this.x /= len;
                    this.y /= len;
                }
                return this;
            };
            return Vector2;
        }());
        core.Vector2 = Vector2;
        var TimeKeeper = (function () {
            function TimeKeeper() {
                this.maxDelta = 0.064;
                this.framesPerSecond = 0;
                this.delta = 0;
                this.totalTime = 0;
                this.lastTime = Date.now() / 1000;
                this.frameCount = 0;
                this.frameTime = 0;
            }
            TimeKeeper.prototype.update = function () {
                var now = Date.now() / 1000;
                this.delta = now - this.lastTime;
                this.frameTime += this.delta;
                this.totalTime += this.delta;
                if (this.delta > this.maxDelta)
                    this.delta = this.maxDelta;
                this.lastTime = now;
                this.frameCount++;
                if (this.frameTime > 1) {
                    this.framesPerSecond = this.frameCount / this.frameTime;
                    this.frameTime = 0;
                    this.frameCount = 0;
                }
            };
            return TimeKeeper;
        }());
        core.TimeKeeper = TimeKeeper;
        var WindowedMean = (function () {
            function WindowedMean(windowSize) {
                if (windowSize === void 0) { windowSize = 32; }
                this.addedValues = 0;
                this.lastValue = 0;
                this.mean = 0;
                this.dirty = true;
                this.values = new Array(windowSize);
            }
            WindowedMean.prototype.hasEnoughData = function () {
                return this.addedValues >= this.values.length;
            };
            WindowedMean.prototype.addValue = function (value) {
                if (this.addedValues < this.values.length)
                    this.addedValues++;
                this.values[this.lastValue++] = value;
                if (this.lastValue > this.values.length - 1)
                    this.lastValue = 0;
                this.dirty = true;
            };
            WindowedMean.prototype.getMean = function () {
                if (this.hasEnoughData()) {
                    if (this.dirty) {
                        var mean = 0;
                        for (var i = 0; i < this.values.length; i++) {
                            mean += this.values[i];
                        }
                        this.mean = mean / this.values.length;
                        this.dirty = false;
                    }
                    return this.mean;
                }
                else {
                    return 0;
                }
            };
            return WindowedMean;
        }());
        core.WindowedMean = WindowedMean;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var Attachment = (function () {
            function Attachment(name) {
                if (name == null)
                    throw new Error("name cannot be null.");
                this.name = name;
            }
            return Attachment;
        }());
        core.Attachment = Attachment;
        var VertexAttachment = (function (_super) {
            __extends(VertexAttachment, _super);
            function VertexAttachment(name) {
                var _this = _super.call(this, name) || this;
                _this.id = (VertexAttachment.nextID++ & 65535) << 11;
                _this.worldVerticesLength = 0;
                return _this;
            }
            VertexAttachment.prototype.computeWorldVerticesOld = function (slot, worldVertices) {
                this.computeWorldVertices(slot, 0, this.worldVerticesLength, worldVertices, 0, 2);
            };
            VertexAttachment.prototype.computeWorldVertices = function (slot, start, count, worldVertices, offset, stride) {
                count = offset + (count >> 1) * stride;
                var skeleton = slot.bone.skeleton;
                var deformArray = slot.attachmentVertices;
                var vertices = this.vertices;
                var bones = this.bones;
                if (bones == null) {
                    if (deformArray.length > 0)
                        vertices = deformArray;
                    var mat = slot.bone.matrix;
                    var x = mat.tx;
                    var y = mat.ty;
                    var a = mat.a, b = mat.c, c = mat.b, d = mat.d;
                    for (var v_1 = start, w = offset; w < count; v_1 += 2, w += stride) {
                        var vx = vertices[v_1], vy = vertices[v_1 + 1];
                        worldVertices[w] = vx * a + vy * b + x;
                        worldVertices[w + 1] = vx * c + vy * d + y;
                    }
                    return;
                }
                var v = 0, skip = 0;
                for (var i = 0; i < start; i += 2) {
                    var n = bones[v];
                    v += n + 1;
                    skip += n;
                }
                var skeletonBones = skeleton.bones;
                if (deformArray.length == 0) {
                    for (var w = offset, b = skip * 3; w < count; w += stride) {
                        var wx = 0, wy = 0;
                        var n = bones[v++];
                        n += v;
                        for (; v < n; v++, b += 3) {
                            var mat = skeletonBones[bones[v]].matrix;
                            var vx = vertices[b], vy = vertices[b + 1], weight = vertices[b + 2];
                            wx += (vx * mat.a + vy * mat.c + mat.tx) * weight;
                            wy += (vx * mat.b + vy * mat.d + mat.ty) * weight;
                        }
                        worldVertices[w] = wx;
                        worldVertices[w + 1] = wy;
                    }
                }
                else {
                    var deform = deformArray;
                    for (var w = offset, b = skip * 3, f = skip << 1; w < count; w += stride) {
                        var wx = 0, wy = 0;
                        var n = bones[v++];
                        n += v;
                        for (; v < n; v++, b += 3, f += 2) {
                            var mat = skeletonBones[bones[v]].matrix;
                            var vx = vertices[b] + deform[f], vy = vertices[b + 1] + deform[f + 1], weight = vertices[b + 2];
                            wx += (vx * mat.a + vy * mat.c + mat.tx) * weight;
                            wy += (vx * mat.b + vy * mat.d + mat.ty) * weight;
                        }
                        worldVertices[w] = wx;
                        worldVertices[w + 1] = wy;
                    }
                }
            };
            VertexAttachment.prototype.applyDeform = function (sourceAttachment) {
                return this == sourceAttachment;
            };
            VertexAttachment.nextID = 0;
            return VertexAttachment;
        }(Attachment));
        core.VertexAttachment = VertexAttachment;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var AttachmentType;
        (function (AttachmentType) {
            AttachmentType[AttachmentType["Region"] = 0] = "Region";
            AttachmentType[AttachmentType["BoundingBox"] = 1] = "BoundingBox";
            AttachmentType[AttachmentType["Mesh"] = 2] = "Mesh";
            AttachmentType[AttachmentType["LinkedMesh"] = 3] = "LinkedMesh";
            AttachmentType[AttachmentType["Path"] = 4] = "Path";
            AttachmentType[AttachmentType["Point"] = 5] = "Point";
        })(AttachmentType = core.AttachmentType || (core.AttachmentType = {}));
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var BoundingBoxAttachment = (function (_super) {
            __extends(BoundingBoxAttachment, _super);
            function BoundingBoxAttachment(name) {
                var _this = _super.call(this, name) || this;
                _this.color = new core.Color(1, 1, 1, 1);
                return _this;
            }
            return BoundingBoxAttachment;
        }(core.VertexAttachment));
        core.BoundingBoxAttachment = BoundingBoxAttachment;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var ClippingAttachment = (function (_super) {
            __extends(ClippingAttachment, _super);
            function ClippingAttachment(name) {
                var _this = _super.call(this, name) || this;
                _this.color = new core.Color(0.2275, 0.2275, 0.8078, 1);
                return _this;
            }
            return ClippingAttachment;
        }(core.VertexAttachment));
        core.ClippingAttachment = ClippingAttachment;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var MeshAttachment = (function (_super) {
            __extends(MeshAttachment, _super);
            function MeshAttachment(name) {
                var _this = _super.call(this, name) || this;
                _this.color = new core.Color(1, 1, 1, 1);
                _this.inheritDeform = false;
                _this.tempColor = new core.Color(0, 0, 0, 0);
                return _this;
            }
            MeshAttachment.prototype.updateUVs = function (region, uvs) {
                var regionUVs = this.regionUVs;
                var n = regionUVs.length;
                if (!uvs || uvs.length != n) {
                    uvs = core.Utils.newFloatArray(n);
                }
                if (region == null) {
                    return;
                }
                var texture = region.texture;
                var r = texture._uvs;
                var w1 = region.width, h1 = region.height, w2 = region.originalWidth, h2 = region.originalHeight;
                var x = region.offsetX, y = region.pixiOffsetY;
                for (var i = 0; i < n; i += 2) {
                    var u = this.regionUVs[i], v = this.regionUVs[i + 1];
                    u = (u * w2 - x) / w1;
                    v = (v * h2 - y) / h1;
                    uvs[i] = (r.x0 * (1 - u) + r.x1 * u) * (1 - v) + (r.x3 * (1 - u) + r.x2 * u) * v;
                    uvs[i + 1] = (r.y0 * (1 - u) + r.y1 * u) * (1 - v) + (r.y3 * (1 - u) + r.y2 * u) * v;
                }
                return uvs;
            };
            MeshAttachment.prototype.applyDeform = function (sourceAttachment) {
                return this == sourceAttachment || (this.inheritDeform && this.parentMesh == sourceAttachment);
            };
            MeshAttachment.prototype.getParentMesh = function () {
                return this.parentMesh;
            };
            MeshAttachment.prototype.setParentMesh = function (parentMesh) {
                this.parentMesh = parentMesh;
                if (parentMesh != null) {
                    this.bones = parentMesh.bones;
                    this.vertices = parentMesh.vertices;
                    this.worldVerticesLength = parentMesh.worldVerticesLength;
                    this.regionUVs = parentMesh.regionUVs;
                    this.triangles = parentMesh.triangles;
                    this.hullLength = parentMesh.hullLength;
                    this.worldVerticesLength = parentMesh.worldVerticesLength;
                }
            };
            return MeshAttachment;
        }(core.VertexAttachment));
        core.MeshAttachment = MeshAttachment;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var PathAttachment = (function (_super) {
            __extends(PathAttachment, _super);
            function PathAttachment(name) {
                var _this = _super.call(this, name) || this;
                _this.closed = false;
                _this.constantSpeed = false;
                _this.color = new core.Color(1, 1, 1, 1);
                return _this;
            }
            return PathAttachment;
        }(core.VertexAttachment));
        core.PathAttachment = PathAttachment;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var PointAttachment = (function (_super) {
            __extends(PointAttachment, _super);
            function PointAttachment(name) {
                var _this = _super.call(this, name) || this;
                _this.color = new core.Color(0.38, 0.94, 0, 1);
                return _this;
            }
            PointAttachment.prototype.computeWorldPosition = function (bone, point) {
                var mat = bone.matrix;
                point.x = this.x * mat.a + this.y * mat.c + bone.worldX;
                point.y = this.x * mat.b + this.y * mat.d + bone.worldY;
                return point;
            };
            PointAttachment.prototype.computeWorldRotation = function (bone) {
                var mat = bone.matrix;
                var cos = core.MathUtils.cosDeg(this.rotation), sin = core.MathUtils.sinDeg(this.rotation);
                var x = cos * mat.a + sin * mat.c;
                var y = cos * mat.b + sin * mat.d;
                return Math.atan2(y, x) * core.MathUtils.radDeg;
            };
            return PointAttachment;
        }(core.VertexAttachment));
        core.PointAttachment = PointAttachment;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var RegionAttachment = (function (_super) {
            __extends(RegionAttachment, _super);
            function RegionAttachment(name) {
                var _this = _super.call(this, name) || this;
                _this.x = 0;
                _this.y = 0;
                _this.scaleX = 1;
                _this.scaleY = 1;
                _this.rotation = 0;
                _this.width = 0;
                _this.height = 0;
                _this.color = new core.Color(1, 1, 1, 1);
                _this.offset = core.Utils.newFloatArray(8);
                _this.uvs = core.Utils.newFloatArray(8);
                _this.tempColor = new core.Color(1, 1, 1, 1);
                return _this;
            }
            RegionAttachment.prototype.updateOffset = function () {
                var regionScaleX = this.width / this.region.originalWidth * this.scaleX;
                var regionScaleY = this.height / this.region.originalHeight * this.scaleY;
                var localX = -this.width / 2 * this.scaleX + this.region.offsetX * regionScaleX;
                var localY = -this.height / 2 * this.scaleY + this.region.offsetY * regionScaleY;
                var localX2 = localX + this.region.width * regionScaleX;
                var localY2 = localY + this.region.height * regionScaleY;
                var radians = this.rotation * Math.PI / 180;
                var cos = Math.cos(radians);
                var sin = Math.sin(radians);
                var localXCos = localX * cos + this.x;
                var localXSin = localX * sin;
                var localYCos = localY * cos + this.y;
                var localYSin = localY * sin;
                var localX2Cos = localX2 * cos + this.x;
                var localX2Sin = localX2 * sin;
                var localY2Cos = localY2 * cos + this.y;
                var localY2Sin = localY2 * sin;
                var offset = this.offset;
                offset[RegionAttachment.OX1] = localXCos - localYSin;
                offset[RegionAttachment.OY1] = localYCos + localXSin;
                offset[RegionAttachment.OX2] = localXCos - localY2Sin;
                offset[RegionAttachment.OY2] = localY2Cos + localXSin;
                offset[RegionAttachment.OX3] = localX2Cos - localY2Sin;
                offset[RegionAttachment.OY3] = localY2Cos + localX2Sin;
                offset[RegionAttachment.OX4] = localX2Cos - localYSin;
                offset[RegionAttachment.OY4] = localYCos + localX2Sin;
            };
            RegionAttachment.prototype.setRegion = function (region) {
                this.region = region;
                var uvs = this.uvs;
                if (region.rotate) {
                    uvs[2] = region.u;
                    uvs[3] = region.v2;
                    uvs[4] = region.u;
                    uvs[5] = region.v;
                    uvs[6] = region.u2;
                    uvs[7] = region.v;
                    uvs[0] = region.u2;
                    uvs[1] = region.v2;
                }
                else {
                    uvs[0] = region.u;
                    uvs[1] = region.v2;
                    uvs[2] = region.u;
                    uvs[3] = region.v;
                    uvs[4] = region.u2;
                    uvs[5] = region.v;
                    uvs[6] = region.u2;
                    uvs[7] = region.v2;
                }
            };
            RegionAttachment.prototype.computeWorldVertices = function (bone, worldVertices, offset, stride) {
                var vertexOffset = this.offset;
                var mat = bone.matrix;
                var x = mat.tx, y = mat.ty;
                var a = mat.a, b = mat.c, c = mat.b, d = mat.d;
                var offsetX = 0, offsetY = 0;
                offsetX = vertexOffset[RegionAttachment.OX1];
                offsetY = vertexOffset[RegionAttachment.OY1];
                worldVertices[offset] = offsetX * a + offsetY * b + x;
                worldVertices[offset + 1] = offsetX * c + offsetY * d + y;
                offset += stride;
                offsetX = vertexOffset[RegionAttachment.OX2];
                offsetY = vertexOffset[RegionAttachment.OY2];
                worldVertices[offset] = offsetX * a + offsetY * b + x;
                worldVertices[offset + 1] = offsetX * c + offsetY * d + y;
                offset += stride;
                offsetX = vertexOffset[RegionAttachment.OX3];
                offsetY = vertexOffset[RegionAttachment.OY3];
                worldVertices[offset] = offsetX * a + offsetY * b + x;
                worldVertices[offset + 1] = offsetX * c + offsetY * d + y;
                offset += stride;
                offsetX = vertexOffset[RegionAttachment.OX4];
                offsetY = vertexOffset[RegionAttachment.OY4];
                worldVertices[offset] = offsetX * a + offsetY * b + x;
                worldVertices[offset + 1] = offsetX * c + offsetY * d + y;
            };
            RegionAttachment.OX1 = 0;
            RegionAttachment.OY1 = 1;
            RegionAttachment.OX2 = 2;
            RegionAttachment.OY2 = 3;
            RegionAttachment.OX3 = 4;
            RegionAttachment.OY3 = 5;
            RegionAttachment.OX4 = 6;
            RegionAttachment.OY4 = 7;
            RegionAttachment.X1 = 0;
            RegionAttachment.Y1 = 1;
            RegionAttachment.C1R = 2;
            RegionAttachment.C1G = 3;
            RegionAttachment.C1B = 4;
            RegionAttachment.C1A = 5;
            RegionAttachment.U1 = 6;
            RegionAttachment.V1 = 7;
            RegionAttachment.X2 = 8;
            RegionAttachment.Y2 = 9;
            RegionAttachment.C2R = 10;
            RegionAttachment.C2G = 11;
            RegionAttachment.C2B = 12;
            RegionAttachment.C2A = 13;
            RegionAttachment.U2 = 14;
            RegionAttachment.V2 = 15;
            RegionAttachment.X3 = 16;
            RegionAttachment.Y3 = 17;
            RegionAttachment.C3R = 18;
            RegionAttachment.C3G = 19;
            RegionAttachment.C3B = 20;
            RegionAttachment.C3A = 21;
            RegionAttachment.U3 = 22;
            RegionAttachment.V3 = 23;
            RegionAttachment.X4 = 24;
            RegionAttachment.Y4 = 25;
            RegionAttachment.C4R = 26;
            RegionAttachment.C4G = 27;
            RegionAttachment.C4B = 28;
            RegionAttachment.C4A = 29;
            RegionAttachment.U4 = 30;
            RegionAttachment.V4 = 31;
            return RegionAttachment;
        }(core.Attachment));
        core.RegionAttachment = RegionAttachment;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var JitterEffect = (function () {
            function JitterEffect(jitterX, jitterY) {
                this.jitterX = 0;
                this.jitterY = 0;
                this.jitterX = jitterX;
                this.jitterY = jitterY;
            }
            JitterEffect.prototype.begin = function (skeleton) {
            };
            JitterEffect.prototype.transform = function (position, uv, light, dark) {
                position.x += core.MathUtils.randomTriangular(-this.jitterX, this.jitterY);
                position.y += core.MathUtils.randomTriangular(-this.jitterX, this.jitterY);
            };
            JitterEffect.prototype.end = function () {
            };
            return JitterEffect;
        }());
        core.JitterEffect = JitterEffect;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var SwirlEffect = (function () {
            function SwirlEffect(radius) {
                this.centerX = 0;
                this.centerY = 0;
                this.radius = 0;
                this.angle = 0;
                this.worldX = 0;
                this.worldY = 0;
                this.radius = radius;
            }
            SwirlEffect.prototype.begin = function (skeleton) {
                this.worldX = skeleton.x + this.centerX;
                this.worldY = skeleton.y + this.centerY;
            };
            SwirlEffect.prototype.transform = function (position, uv, light, dark) {
                var radAngle = this.angle * core.MathUtils.degreesToRadians;
                var x = position.x - this.worldX;
                var y = position.y - this.worldY;
                var dist = Math.sqrt(x * x + y * y);
                if (dist < this.radius) {
                    var theta = SwirlEffect.interpolation.apply(0, radAngle, (this.radius - dist) / this.radius);
                    var cos = Math.cos(theta);
                    var sin = Math.sin(theta);
                    position.x = cos * x - sin * y + this.worldX;
                    position.y = sin * x + cos * y + this.worldY;
                }
            };
            SwirlEffect.prototype.end = function () {
            };
            SwirlEffect.interpolation = new core.PowOut(2);
            return SwirlEffect;
        }());
        core.SwirlEffect = SwirlEffect;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    PIXI.spine = pixi_spine;
    var TextureProto = PIXI.Texture.prototype;
    if (!TextureProto._updateUvs) {
        TextureProto._updateUvs = TextureProto.updateUvs;
    }
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    function isJson(resource) {
        return resource.type === PIXI.loaders.Resource.TYPE.JSON;
    }
    function atlasParser() {
        return function atlasParser(resource, next) {
            if (!resource.data ||
                !isJson(resource) ||
                !resource.data.bones) {
                return next();
            }
            var metadata = resource.metadata || {};
            var metadataSkeletonScale = metadata ? resource.metadata.spineSkeletonScale : null;
            var metadataAtlas = metadata ? resource.metadata.spineAtlas : null;
            if (metadataAtlas === false) {
                return next();
            }
            if (metadataAtlas && metadataAtlas.pages) {
                var spineJsonParser = new pixi_spine.core.SkeletonJson(new pixi_spine.core.AtlasAttachmentLoader(metadataAtlas));
                var skeletonData = spineJsonParser.readSkeletonData(resource.data);
                resource.spineData = skeletonData;
                resource.spineAtlas = metadataAtlas;
                return next();
            }
            var metadataAtlasSuffix = metadata.spineAtlasSuffix || '.atlas';
            var atlasPath = resource.url.substr(0, resource.url.lastIndexOf('.')) + metadataAtlasSuffix;
            if (resource.metadata && resource.metadata.spineAtlasFile) {
                atlasPath = resource.metadata.spineAtlasFile;
            }
            atlasPath = atlasPath.replace(this.baseUrl, '');
            var atlasOptions = {
                crossOrigin: resource.crossOrigin,
                xhrType: PIXI.loaders.Resource.XHR_RESPONSE_TYPE.TEXT,
                metadata: metadata.spineMetadata || null,
                parentResource: resource
            };
            var imageOptions = {
                crossOrigin: resource.crossOrigin,
                metadata: metadata.imageMetadata || null,
                parentResource: resource
            };
            var baseUrl = resource.url.substr(0, resource.url.lastIndexOf('/') + 1);
            baseUrl = baseUrl.replace(this.baseUrl, '');
            var namePrefix = metadata.imageNamePrefix || (resource.name + '_atlas_page_');
            var adapter = metadata.images ? staticImageLoader(metadata.images)
                : metadata.image ? staticImageLoader({ 'default': metadata.image })
                    : metadata.imageLoader ? metadata.imageLoader(this, namePrefix, baseUrl, imageOptions)
                        : imageLoaderAdapter(this, namePrefix, baseUrl, imageOptions);
            var createSkeletonWithRawAtlas = function (rawData) {
                new pixi_spine.core.TextureAtlas(rawData, adapter, function (spineAtlas) {
                    var spineJsonParser = new pixi_spine.core.SkeletonJson(new pixi_spine.core.AtlasAttachmentLoader(spineAtlas));
                    if (metadataSkeletonScale) {
                        spineJsonParser.scale = metadataSkeletonScale;
                    }
                    resource.spineData = spineJsonParser.readSkeletonData(resource.data);
                    resource.spineAtlas = spineAtlas;
                    next();
                });
            };
            if (resource.metadata && resource.metadata.atlasRawData) {
                createSkeletonWithRawAtlas(resource.metadata.atlasRawData);
            }
            else {
                this.add(resource.name + '_atlas', atlasPath, atlasOptions, function (atlasResource) {
                    if (!atlasResource.error) {
                        createSkeletonWithRawAtlas(atlasResource.data);
                    }
                    else {
                        next();
                    }
                });
            }
        };
    }
    pixi_spine.atlasParser = atlasParser;
    function imageLoaderAdapter(loader, namePrefix, baseUrl, imageOptions) {
        if (baseUrl && baseUrl.lastIndexOf('/') !== (baseUrl.length - 1)) {
            baseUrl += '/';
        }
        return function (line, callback) {
            var name = namePrefix + line;
            var url = baseUrl + line;
            var cachedResource = loader.resources[name];
            if (cachedResource) {
                function done() {
                    callback(cachedResource.texture.baseTexture);
                }
                if (cachedResource.texture) {
                    done();
                }
                else {
                    cachedResource.onAfterMiddleware.add(done);
                }
            }
            else {
                loader.add(name, url, imageOptions, function (resource) {
                    callback(resource.texture.baseTexture);
                });
            }
        };
    }
    pixi_spine.imageLoaderAdapter = imageLoaderAdapter;
    function syncImageLoaderAdapter(baseUrl, crossOrigin) {
        if (baseUrl && baseUrl.lastIndexOf('/') !== (baseUrl.length - 1)) {
            baseUrl += '/';
        }
        return function (line, callback) {
            callback(PIXI.BaseTexture.fromImage(line, crossOrigin));
        };
    }
    pixi_spine.syncImageLoaderAdapter = syncImageLoaderAdapter;
    function staticImageLoader(pages) {
        return function (line, callback) {
            var page = pages[line] || pages['default'];
            if (page && page.baseTexture)
                callback(page.baseTexture);
            else
                callback(page);
        };
    }
    pixi_spine.staticImageLoader = staticImageLoader;
    if (PIXI.loaders.Loader) {
        PIXI.loaders.Loader.addPixiMiddleware(atlasParser);
        PIXI.loader.use(atlasParser());
    }
})(pixi_spine || (pixi_spine = {}));
(function () {
    if (!Math.fround) {
        Math.fround = Math.fround = (function (array) {
            return function (x) {
                return array[0] = x, array[0];
            };
        })(new Float32Array(1));
    }
})();
var pixi_spine;
(function (pixi_spine) {
    pixi_spine.core.Bone.yDown = true;
    var tempRgb = [0, 0, 0];
    var SpineSprite = (function (_super) {
        __extends(SpineSprite, _super);
        function SpineSprite() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.region = null;
            return _this;
        }
        return SpineSprite;
    }(PIXI.Sprite));
    pixi_spine.SpineSprite = SpineSprite;
    var SpineMesh = (function (_super) {
        __extends(SpineMesh, _super);
        function SpineMesh(texture, vertices, uvs, indices, drawMode) {
            return _super.call(this, texture, vertices, uvs, indices, drawMode) || this;
        }
        return SpineMesh;
    }(PIXI.mesh.Mesh));
    pixi_spine.SpineMesh = SpineMesh;
    var Spine = (function (_super) {
        __extends(Spine, _super);
        function Spine(spineData) {
            var _this = _super.call(this) || this;
            if (!spineData) {
                throw new Error('The spineData param is required.');
            }
            if ((typeof spineData) === "string") {
                throw new Error('spineData param cant be string. Please use spine.Spine.fromAtlas("YOUR_RESOURCE_NAME") from now on.');
            }
            _this.spineData = spineData;
            _this.skeleton = new pixi_spine.core.Skeleton(spineData);
            _this.skeleton.updateWorldTransform();
            _this.stateData = new pixi_spine.core.AnimationStateData(spineData);
            _this.state = new pixi_spine.core.AnimationState(_this.stateData);
            _this.slotContainers = [];
            _this.tempClipContainers = [];
            for (var i = 0, n = _this.skeleton.slots.length; i < n; i++) {
                var slot = _this.skeleton.slots[i];
                var attachment = slot.attachment;
                var slotContainer = _this.newContainer();
                _this.slotContainers.push(slotContainer);
                _this.addChild(slotContainer);
                _this.tempClipContainers.push(null);
                if (attachment instanceof pixi_spine.core.RegionAttachment) {
                    var spriteName = attachment.region.name;
                    var sprite = _this.createSprite(slot, attachment, spriteName);
                    slot.currentSprite = sprite;
                    slot.currentSpriteName = spriteName;
                    slotContainer.addChild(sprite);
                }
                else if (attachment instanceof pixi_spine.core.MeshAttachment) {
                    var mesh = _this.createMesh(slot, attachment);
                    slot.currentMesh = mesh;
                    slot.currentMeshName = attachment.name;
                    slotContainer.addChild(mesh);
                }
                else if (attachment instanceof pixi_spine.core.ClippingAttachment) {
                    _this.createGraphics(slot, attachment);
                    slotContainer.addChild(slot.clippingContainer);
                    slotContainer.addChild(slot.currentGraphics);
                }
                else {
                    continue;
                }
            }
            _this.autoUpdate = true;
            _this.tintRgb = new Float32Array([1, 1, 1]);
            return _this;
        }
        Object.defineProperty(Spine.prototype, "autoUpdate", {
            get: function () {
                return (this.updateTransform === Spine.prototype.autoUpdateTransform);
            },
            set: function (value) {
                this.updateTransform = value ? Spine.prototype.autoUpdateTransform : PIXI.Container.prototype.updateTransform;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Spine.prototype, "tint", {
            get: function () {
                return PIXI.utils.rgb2hex(this.tintRgb);
            },
            set: function (value) {
                this.tintRgb = PIXI.utils.hex2rgb(value, this.tintRgb);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Spine.prototype, "delayLimit", {
            get: function () {
                var limit = typeof this.localDelayLimit !== "undefined" ?
                    this.localDelayLimit : Spine.globalDelayLimit;
                return limit || Number.MAX_VALUE;
            },
            enumerable: true,
            configurable: true
        });
        Spine.prototype.update = function (dt) {
            var delayLimit = this.delayLimit;
            if (dt > delayLimit)
                dt = delayLimit;
            this.state.update(dt);
            this.state.apply(this.skeleton);
            this.skeleton.updateWorldTransform();
            var slots = this.skeleton.slots;
            var globalClr = this.color;
            var light = null, dark = null;
            if (globalClr) {
                light = globalClr.light;
                dark = globalClr.dark;
            }
            else {
                light = this.tintRgb;
            }
            var thack = PIXI.TransformBase && (this.transformHack() == 1);
            for (var i = 0, n = slots.length; i < n; i++) {
                var slot = slots[i];
                var attachment = slot.attachment;
                var slotContainer = this.slotContainers[i];
                if (!attachment) {
                    slotContainer.visible = false;
                    continue;
                }
                var spriteColor = null;
                var attColor = attachment.color;
                if (attachment instanceof pixi_spine.core.RegionAttachment) {
                    var region = attachment.region;
                    if (region) {
                        if (slot.currentMesh) {
                            slot.currentMesh.visible = false;
                            slot.currentMesh = null;
                            slot.currentMeshName = undefined;
                        }
                        var ar = region;
                        if (!slot.currentSpriteName || slot.currentSpriteName !== ar.name) {
                            var spriteName = ar.name;
                            if (slot.currentSprite) {
                                slot.currentSprite.visible = false;
                            }
                            slot.sprites = slot.sprites || {};
                            if (slot.sprites[spriteName] !== undefined) {
                                slot.sprites[spriteName].visible = true;
                            }
                            else {
                                var sprite = this.createSprite(slot, attachment, spriteName);
                                slotContainer.addChild(sprite);
                            }
                            slot.currentSprite = slot.sprites[spriteName];
                            slot.currentSpriteName = spriteName;
                        }
                    }
                    if (slotContainer.transform) {
                        var transform = slotContainer.transform;
                        var transAny = transform;
                        var lt = null;
                        if (transAny.matrix2d) {
                            lt = transAny.matrix2d;
                            transAny._dirtyVersion++;
                            transAny.version = transAny._dirtyVersion;
                            transAny.isStatic = true;
                            transAny.operMode = 0;
                        }
                        else {
                            if (thack) {
                                if (transAny.position) {
                                    transform = new PIXI.TransformBase();
                                    transform._parentID = -1;
                                    transform._worldID = slotContainer.transform._worldID;
                                    slotContainer.transform = transform;
                                }
                                lt = transform.localTransform;
                            }
                            else {
                                transAny.setFromMatrix(slot.bone.matrix);
                            }
                        }
                        if (lt) {
                            slot.bone.matrix.copy(lt);
                        }
                    }
                    else {
                        var lt = slotContainer.localTransform || new PIXI.Matrix();
                        slot.bone.matrix.copy(lt);
                        slotContainer.localTransform = lt;
                        slotContainer.displayObjectUpdateTransform = SlotContainerUpdateTransformV3;
                    }
                    if (slot.currentSprite.color) {
                        spriteColor = slot.currentSprite.color;
                    }
                    else {
                        tempRgb[0] = light[0] * slot.color.r * attColor.r;
                        tempRgb[1] = light[1] * slot.color.g * attColor.g;
                        tempRgb[2] = light[2] * slot.color.b * attColor.b;
                        slot.currentSprite.tint = PIXI.utils.rgb2hex(tempRgb);
                    }
                    slot.currentSprite.blendMode = slot.blendMode;
                }
                else if (attachment instanceof pixi_spine.core.MeshAttachment) {
                    if (slot.currentSprite) {
                        slot.currentSprite.visible = false;
                        slot.currentSprite = null;
                        slot.currentSpriteName = undefined;
                        if (slotContainer.transform) {
                            var transform = new PIXI.TransformStatic();
                            transform._parentID = -1;
                            transform._worldID = slotContainer.transform._worldID;
                            slotContainer.transform = transform;
                        }
                        else {
                            slotContainer.localTransform = new PIXI.Matrix();
                            slotContainer.displayObjectUpdateTransform = PIXI.DisplayObject.prototype.updateTransform;
                        }
                    }
                    if (!slot.currentMeshName || slot.currentMeshName !== attachment.name) {
                        var meshName = attachment.name;
                        if (slot.currentMesh) {
                            slot.currentMesh.visible = false;
                        }
                        slot.meshes = slot.meshes || {};
                        if (slot.meshes[meshName] !== undefined) {
                            slot.meshes[meshName].visible = true;
                        }
                        else {
                            var mesh = this.createMesh(slot, attachment);
                            slotContainer.addChild(mesh);
                        }
                        slot.currentMesh = slot.meshes[meshName];
                        slot.currentMeshName = meshName;
                    }
                    attachment.computeWorldVerticesOld(slot, slot.currentMesh.vertices);
                    if (slot.currentMesh.color) {
                        spriteColor = slot.currentMesh.color;
                    }
                    else if (PIXI.VERSION[0] !== '3') {
                        var tintRgb = slot.currentMesh.tintRgb;
                        tintRgb[0] = light[0] * slot.color.r * attColor.r;
                        tintRgb[1] = light[1] * slot.color.g * attColor.g;
                        tintRgb[2] = light[2] * slot.color.b * attColor.b;
                    }
                    slot.currentMesh.blendMode = slot.blendMode;
                }
                else if (attachment instanceof pixi_spine.core.ClippingAttachment) {
                    if (!slot.currentGraphics) {
                        this.createGraphics(slot, attachment);
                        slotContainer.addChild(slot.clippingContainer);
                        slotContainer.addChild(slot.currentGraphics);
                    }
                    this.updateGraphics(slot, attachment);
                }
                else {
                    slotContainer.visible = false;
                    continue;
                }
                slotContainer.visible = true;
                if (spriteColor) {
                    var r0 = slot.color.r * attColor.r;
                    var g0 = slot.color.g * attColor.g;
                    var b0 = slot.color.b * attColor.b;
                    spriteColor.setLight(light[0] * r0 + dark[0] * (1.0 - r0), light[1] * g0 + dark[1] * (1.0 - g0), light[2] * b0 + dark[2] * (1.0 - b0));
                    if (slot.darkColor) {
                        r0 = slot.darkColor.r;
                        g0 = slot.darkColor.g;
                        b0 = slot.darkColor.b;
                    }
                    else {
                        r0 = 0.0;
                        g0 = 0.0;
                        b0 = 0.0;
                    }
                    spriteColor.setDark(light[0] * r0 + dark[0] * (1 - r0), light[1] * g0 + dark[1] * (1 - g0), light[2] * b0 + dark[2] * (1 - b0));
                }
                slotContainer.alpha = slot.color.a;
            }
            var drawOrder = this.skeleton.drawOrder;
            var clippingAttachment = null;
            var clippingContainer = null;
            for (var i = 0, n = drawOrder.length; i < n; i++) {
                var slot = slots[drawOrder[i].data.index];
                var slotContainer = this.slotContainers[drawOrder[i].data.index];
                if (!clippingContainer) {
                    if (slotContainer.parent !== null && slotContainer.parent !== this) {
                        slotContainer.parent.removeChild(slotContainer);
                        slotContainer.parent = this;
                    }
                }
                if (slot.currentGraphics && slot.attachment) {
                    clippingContainer = slot.clippingContainer;
                    clippingAttachment = slot.attachment;
                    clippingContainer.children.length = 0;
                    this.children[i] = slotContainer;
                    if (clippingAttachment.endSlot == slot.data) {
                        clippingAttachment.endSlot = null;
                    }
                }
                else {
                    if (clippingContainer) {
                        var c = this.tempClipContainers[i];
                        if (!c) {
                            c = this.tempClipContainers[i] = this.newContainer();
                            c.visible = false;
                        }
                        this.children[i] = c;
                        slotContainer.parent = null;
                        clippingContainer.addChild(slotContainer);
                        if (clippingAttachment.endSlot == slot.data) {
                            clippingContainer.renderable = true;
                            clippingContainer = null;
                            clippingAttachment = null;
                        }
                    }
                    else {
                        this.children[i] = slotContainer;
                    }
                }
            }
        };
        ;
        Spine.prototype.setSpriteRegion = function (attachment, sprite, region) {
            sprite.region = region;
            sprite.texture = region.texture;
            if (!region.size) {
                sprite.scale.x = attachment.scaleX * attachment.width / region.originalWidth;
                sprite.scale.y = -attachment.scaleY * attachment.height / region.originalHeight;
            }
            else {
                sprite.scale.x = region.size.width / region.originalWidth;
                sprite.scale.y = -region.size.height / region.originalHeight;
            }
        };
        Spine.prototype.setMeshRegion = function (attachment, mesh, region) {
            mesh.region = region;
            mesh.texture = region.texture;
            region.texture._updateUvs();
            attachment.updateUVs(region, mesh.uvs);
            mesh.dirty++;
        };
        Spine.prototype.autoUpdateTransform = function () {
            if (Spine.globalAutoUpdate) {
                this.lastTime = this.lastTime || Date.now();
                var timeDelta = (Date.now() - this.lastTime) * 0.001;
                this.lastTime = Date.now();
                this.update(timeDelta);
            }
            else {
                this.lastTime = 0;
            }
            PIXI.Container.prototype.updateTransform.call(this);
        };
        ;
        Spine.prototype.createSprite = function (slot, attachment, defName) {
            var region = attachment.region;
            if (slot.tempAttachment === attachment) {
                region = slot.tempRegion;
                slot.tempAttachment = null;
                slot.tempRegion = null;
            }
            var texture = region.texture;
            var sprite = this.newSprite(texture);
            sprite.rotation = attachment.rotation * pixi_spine.core.MathUtils.degRad;
            sprite.anchor.x = 0.5;
            sprite.anchor.y = 0.5;
            sprite.position.x = attachment.x;
            sprite.position.y = attachment.y;
            sprite.alpha = attachment.color.a;
            sprite.region = attachment.region;
            this.setSpriteRegion(attachment, sprite, attachment.region);
            slot.sprites = slot.sprites || {};
            slot.sprites[defName] = sprite;
            return sprite;
        };
        ;
        Spine.prototype.createMesh = function (slot, attachment) {
            var region = attachment.region;
            if (slot.tempAttachment === attachment) {
                region = slot.tempRegion;
                slot.tempAttachment = null;
                slot.tempRegion = null;
            }
            var strip = this.newMesh(region.texture, new Float32Array(attachment.regionUVs.length), new Float32Array(attachment.regionUVs.length), new Uint16Array(attachment.triangles), PIXI.mesh.Mesh.DRAW_MODES.TRIANGLES);
            strip.canvasPadding = 1.5;
            strip.alpha = attachment.color.a;
            strip.region = attachment.region;
            this.setMeshRegion(attachment, strip, region);
            slot.meshes = slot.meshes || {};
            slot.meshes[attachment.name] = strip;
            return strip;
        };
        ;
        Spine.prototype.createGraphics = function (slot, clip) {
            var graphics = this.newGraphics();
            var poly = new PIXI.Polygon([]);
            graphics.clear();
            graphics.beginFill(0xffffff, 1);
            graphics.drawPolygon(poly);
            graphics.renderable = false;
            slot.currentGraphics = graphics;
            slot.clippingContainer = this.newContainer();
            slot.clippingContainer.mask = slot.currentGraphics;
            return graphics;
        };
        Spine.prototype.updateGraphics = function (slot, clip) {
            var vertices = slot.currentGraphics.graphicsData[0].shape.points;
            var n = clip.worldVerticesLength;
            vertices.length = n;
            clip.computeWorldVertices(slot, 0, n, vertices, 0, 2);
            slot.currentGraphics.dirty++;
            slot.currentGraphics.clearDirty++;
        };
        Spine.prototype.hackTextureBySlotIndex = function (slotIndex, texture, size) {
            if (texture === void 0) { texture = null; }
            if (size === void 0) { size = null; }
            var slot = this.skeleton.slots[slotIndex];
            if (!slot) {
                return false;
            }
            var attachment = slot.attachment;
            var region = attachment.region;
            if (texture) {
                region = new pixi_spine.core.TextureRegion();
                region.texture = texture;
                region.size = size;
            }
            if (slot.currentSprite && slot.currentSprite.region != region) {
                this.setSpriteRegion(attachment, slot.currentSprite, region);
                slot.currentSprite.region = region;
            }
            else if (slot.currentMesh && slot.currentMesh.region != region) {
                this.setMeshRegion(attachment, slot.currentMesh, region);
            }
            else {
                slot.tempRegion = region;
                slot.tempAttachment = attachment;
            }
            return true;
        };
        Spine.prototype.hackTextureBySlotName = function (slotName, texture, size) {
            if (texture === void 0) { texture = null; }
            if (size === void 0) { size = null; }
            var index = this.skeleton.findSlotIndex(slotName);
            if (index == -1) {
                return false;
            }
            return this.hackTextureBySlotIndex(index, texture, size);
        };
        Spine.prototype.newContainer = function () {
            return new PIXI.Container();
        };
        Spine.prototype.newSprite = function (tex) {
            return new SpineSprite(tex);
        };
        Spine.prototype.newGraphics = function () {
            return new PIXI.Graphics();
        };
        Spine.prototype.newMesh = function (texture, vertices, uvs, indices, drawMode) {
            return new SpineMesh(texture, vertices, uvs, indices, drawMode);
        };
        Spine.prototype.transformHack = function () {
            return 1;
        };
        Spine.prototype.hackAttachmentGroups = function (nameSuffix, group, outGroup) {
            if (!nameSuffix) {
                return;
            }
            var list_d = [], list_n = [];
            for (var i = 0, len = this.skeleton.slots.length; i < len; i++) {
                var slot = this.skeleton.slots[i];
                var name_2 = slot.currentSpriteName || slot.currentMeshName || "";
                var target = slot.currentSprite || slot.currentMesh;
                if (name_2.endsWith(nameSuffix)) {
                    target.parentGroup = group;
                    list_n.push(target);
                }
                else if (outGroup && target) {
                    target.parentGroup = outGroup;
                    list_d.push(target);
                }
            }
            return [list_d, list_n];
        };
        ;
        Spine.prototype.destroy = function (options) {
            for (var i = 0, n = this.skeleton.slots.length; i < n; i++) {
                var slot = this.skeleton.slots[i];
                for (var name_3 in slot.meshes) {
                    slot.meshes[name_3].destroy(options);
                }
                slot.meshes = null;
                for (var name_4 in slot.sprites) {
                    slot.sprites[name_4].destroy(options);
                }
                slot.sprites = null;
            }
            for (var i = 0, n = this.slotContainers.length; i < n; i++) {
                this.slotContainers[i].destroy(options);
            }
            this.spineData = null;
            this.skeleton = null;
            this.slotContainers = null;
            this.stateData = null;
            this.state = null;
            this.tempClipContainers = null;
            _super.prototype.destroy.call(this, options);
        };
        Spine.globalAutoUpdate = true;
        Spine.globalDelayLimit = 0;
        Spine.clippingPolygon = [];
        return Spine;
    }(PIXI.Container));
    pixi_spine.Spine = Spine;
    function SlotContainerUpdateTransformV3() {
        var pt = this.parent.worldTransform;
        var wt = this.worldTransform;
        var lt = this.localTransform;
        wt.a = lt.a * pt.a + lt.b * pt.c;
        wt.b = lt.a * pt.b + lt.b * pt.d;
        wt.c = lt.c * pt.a + lt.d * pt.c;
        wt.d = lt.c * pt.b + lt.d * pt.d;
        wt.tx = lt.tx * pt.a + lt.ty * pt.c + pt.tx;
        wt.ty = lt.tx * pt.b + lt.ty * pt.d + pt.ty;
        this.worldAlpha = this.alpha * this.parent.worldAlpha;
        this._currentBounds = null;
    }
})(pixi_spine || (pixi_spine = {}));
//# sourceMappingURL=pixi-spine.js.map

/***/ }),

/***/ "./node_modules/querystring-es3/decode.js":
/*!************************************************!*\
  !*** ./node_modules/querystring-es3/decode.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};


/***/ }),

/***/ "./node_modules/querystring-es3/encode.js":
/*!************************************************!*\
  !*** ./node_modules/querystring-es3/encode.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};


/***/ }),

/***/ "./node_modules/querystring-es3/index.js":
/*!***********************************************!*\
  !*** ./node_modules/querystring-es3/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.decode = exports.parse = __webpack_require__(/*! ./decode */ "./node_modules/querystring-es3/decode.js");
exports.encode = exports.stringify = __webpack_require__(/*! ./encode */ "./node_modules/querystring-es3/encode.js");


/***/ }),

/***/ "./node_modules/sockjs-client/dist/sockjs.js":
/*!***************************************************!*\
  !*** ./node_modules/sockjs-client/dist/sockjs.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var require;var require;/* sockjs-client v1.3.0 | http://sockjs.org | MIT license */
(function(f){if(true){module.exports=f()}else { var g; }})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return require(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){
'use strict';

var transportList = require('./transport-list');

module.exports = require('./main')(transportList);

// TODO can't get rid of this until all servers do
if ('_sockjs_onload' in global) {
  setTimeout(global._sockjs_onload, 1);
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./main":14,"./transport-list":16}],2:[function(require,module,exports){
'use strict';

var inherits = require('inherits')
  , Event = require('./event')
  ;

function CloseEvent() {
  Event.call(this);
  this.initEvent('close', false, false);
  this.wasClean = false;
  this.code = 0;
  this.reason = '';
}

inherits(CloseEvent, Event);

module.exports = CloseEvent;

},{"./event":4,"inherits":57}],3:[function(require,module,exports){
'use strict';

var inherits = require('inherits')
  , EventTarget = require('./eventtarget')
  ;

function EventEmitter() {
  EventTarget.call(this);
}

inherits(EventEmitter, EventTarget);

EventEmitter.prototype.removeAllListeners = function(type) {
  if (type) {
    delete this._listeners[type];
  } else {
    this._listeners = {};
  }
};

EventEmitter.prototype.once = function(type, listener) {
  var self = this
    , fired = false;

  function g() {
    self.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  this.on(type, g);
};

EventEmitter.prototype.emit = function() {
  var type = arguments[0];
  var listeners = this._listeners[type];
  if (!listeners) {
    return;
  }
  // equivalent of Array.prototype.slice.call(arguments, 1);
  var l = arguments.length;
  var args = new Array(l - 1);
  for (var ai = 1; ai < l; ai++) {
    args[ai - 1] = arguments[ai];
  }
  for (var i = 0; i < listeners.length; i++) {
    listeners[i].apply(this, args);
  }
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener = EventTarget.prototype.addEventListener;
EventEmitter.prototype.removeListener = EventTarget.prototype.removeEventListener;

module.exports.EventEmitter = EventEmitter;

},{"./eventtarget":5,"inherits":57}],4:[function(require,module,exports){
'use strict';

function Event(eventType) {
  this.type = eventType;
}

Event.prototype.initEvent = function(eventType, canBubble, cancelable) {
  this.type = eventType;
  this.bubbles = canBubble;
  this.cancelable = cancelable;
  this.timeStamp = +new Date();
  return this;
};

Event.prototype.stopPropagation = function() {};
Event.prototype.preventDefault = function() {};

Event.CAPTURING_PHASE = 1;
Event.AT_TARGET = 2;
Event.BUBBLING_PHASE = 3;

module.exports = Event;

},{}],5:[function(require,module,exports){
'use strict';

/* Simplified implementation of DOM2 EventTarget.
 *   http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventTarget
 */

function EventTarget() {
  this._listeners = {};
}

EventTarget.prototype.addEventListener = function(eventType, listener) {
  if (!(eventType in this._listeners)) {
    this._listeners[eventType] = [];
  }
  var arr = this._listeners[eventType];
  // #4
  if (arr.indexOf(listener) === -1) {
    // Make a copy so as not to interfere with a current dispatchEvent.
    arr = arr.concat([listener]);
  }
  this._listeners[eventType] = arr;
};

EventTarget.prototype.removeEventListener = function(eventType, listener) {
  var arr = this._listeners[eventType];
  if (!arr) {
    return;
  }
  var idx = arr.indexOf(listener);
  if (idx !== -1) {
    if (arr.length > 1) {
      // Make a copy so as not to interfere with a current dispatchEvent.
      this._listeners[eventType] = arr.slice(0, idx).concat(arr.slice(idx + 1));
    } else {
      delete this._listeners[eventType];
    }
    return;
  }
};

EventTarget.prototype.dispatchEvent = function() {
  var event = arguments[0];
  var t = event.type;
  // equivalent of Array.prototype.slice.call(arguments, 0);
  var args = arguments.length === 1 ? [event] : Array.apply(null, arguments);
  // TODO: This doesn't match the real behavior; per spec, onfoo get
  // their place in line from the /first/ time they're set from
  // non-null. Although WebKit bumps it to the end every time it's
  // set.
  if (this['on' + t]) {
    this['on' + t].apply(this, args);
  }
  if (t in this._listeners) {
    // Grab a reference to the listeners list. removeEventListener may alter the list.
    var listeners = this._listeners[t];
    for (var i = 0; i < listeners.length; i++) {
      listeners[i].apply(this, args);
    }
  }
};

module.exports = EventTarget;

},{}],6:[function(require,module,exports){
'use strict';

var inherits = require('inherits')
  , Event = require('./event')
  ;

function TransportMessageEvent(data) {
  Event.call(this);
  this.initEvent('message', false, false);
  this.data = data;
}

inherits(TransportMessageEvent, Event);

module.exports = TransportMessageEvent;

},{"./event":4,"inherits":57}],7:[function(require,module,exports){
'use strict';

var JSON3 = require('json3')
  , iframeUtils = require('./utils/iframe')
  ;

function FacadeJS(transport) {
  this._transport = transport;
  transport.on('message', this._transportMessage.bind(this));
  transport.on('close', this._transportClose.bind(this));
}

FacadeJS.prototype._transportClose = function(code, reason) {
  iframeUtils.postMessage('c', JSON3.stringify([code, reason]));
};
FacadeJS.prototype._transportMessage = function(frame) {
  iframeUtils.postMessage('t', frame);
};
FacadeJS.prototype._send = function(data) {
  this._transport.send(data);
};
FacadeJS.prototype._close = function() {
  this._transport.close();
  this._transport.removeAllListeners();
};

module.exports = FacadeJS;

},{"./utils/iframe":47,"json3":58}],8:[function(require,module,exports){
(function (process){
'use strict';

var urlUtils = require('./utils/url')
  , eventUtils = require('./utils/event')
  , JSON3 = require('json3')
  , FacadeJS = require('./facade')
  , InfoIframeReceiver = require('./info-iframe-receiver')
  , iframeUtils = require('./utils/iframe')
  , loc = require('./location')
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:iframe-bootstrap');
}

module.exports = function(SockJS, availableTransports) {
  var transportMap = {};
  availableTransports.forEach(function(at) {
    if (at.facadeTransport) {
      transportMap[at.facadeTransport.transportName] = at.facadeTransport;
    }
  });

  // hard-coded for the info iframe
  // TODO see if we can make this more dynamic
  transportMap[InfoIframeReceiver.transportName] = InfoIframeReceiver;
  var parentOrigin;

  /* eslint-disable camelcase */
  SockJS.bootstrap_iframe = function() {
    /* eslint-enable camelcase */
    var facade;
    iframeUtils.currentWindowId = loc.hash.slice(1);
    var onMessage = function(e) {
      if (e.source !== parent) {
        return;
      }
      if (typeof parentOrigin === 'undefined') {
        parentOrigin = e.origin;
      }
      if (e.origin !== parentOrigin) {
        return;
      }

      var iframeMessage;
      try {
        iframeMessage = JSON3.parse(e.data);
      } catch (ignored) {
        debug('bad json', e.data);
        return;
      }

      if (iframeMessage.windowId !== iframeUtils.currentWindowId) {
        return;
      }
      switch (iframeMessage.type) {
      case 's':
        var p;
        try {
          p = JSON3.parse(iframeMessage.data);
        } catch (ignored) {
          debug('bad json', iframeMessage.data);
          break;
        }
        var version = p[0];
        var transport = p[1];
        var transUrl = p[2];
        var baseUrl = p[3];
        debug(version, transport, transUrl, baseUrl);
        // change this to semver logic
        if (version !== SockJS.version) {
          throw new Error('Incompatible SockJS! Main site uses:' +
                    ' "' + version + '", the iframe:' +
                    ' "' + SockJS.version + '".');
        }

        if (!urlUtils.isOriginEqual(transUrl, loc.href) ||
            !urlUtils.isOriginEqual(baseUrl, loc.href)) {
          throw new Error('Can\'t connect to different domain from within an ' +
                    'iframe. (' + loc.href + ', ' + transUrl + ', ' + baseUrl + ')');
        }
        facade = new FacadeJS(new transportMap[transport](transUrl, baseUrl));
        break;
      case 'm':
        facade._send(iframeMessage.data);
        break;
      case 'c':
        if (facade) {
          facade._close();
        }
        facade = null;
        break;
      }
    };

    eventUtils.attachEvent('message', onMessage);

    // Start
    iframeUtils.postMessage('s');
  };
};

}).call(this,{ env: {} })

},{"./facade":7,"./info-iframe-receiver":10,"./location":13,"./utils/event":46,"./utils/iframe":47,"./utils/url":52,"debug":55,"json3":58}],9:[function(require,module,exports){
(function (process){
'use strict';

var EventEmitter = require('events').EventEmitter
  , inherits = require('inherits')
  , JSON3 = require('json3')
  , objectUtils = require('./utils/object')
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:info-ajax');
}

function InfoAjax(url, AjaxObject) {
  EventEmitter.call(this);

  var self = this;
  var t0 = +new Date();
  this.xo = new AjaxObject('GET', url);

  this.xo.once('finish', function(status, text) {
    var info, rtt;
    if (status === 200) {
      rtt = (+new Date()) - t0;
      if (text) {
        try {
          info = JSON3.parse(text);
        } catch (e) {
          debug('bad json', text);
        }
      }

      if (!objectUtils.isObject(info)) {
        info = {};
      }
    }
    self.emit('finish', info, rtt);
    self.removeAllListeners();
  });
}

inherits(InfoAjax, EventEmitter);

InfoAjax.prototype.close = function() {
  this.removeAllListeners();
  this.xo.close();
};

module.exports = InfoAjax;

}).call(this,{ env: {} })

},{"./utils/object":49,"debug":55,"events":3,"inherits":57,"json3":58}],10:[function(require,module,exports){
'use strict';

var inherits = require('inherits')
  , EventEmitter = require('events').EventEmitter
  , JSON3 = require('json3')
  , XHRLocalObject = require('./transport/sender/xhr-local')
  , InfoAjax = require('./info-ajax')
  ;

function InfoReceiverIframe(transUrl) {
  var self = this;
  EventEmitter.call(this);

  this.ir = new InfoAjax(transUrl, XHRLocalObject);
  this.ir.once('finish', function(info, rtt) {
    self.ir = null;
    self.emit('message', JSON3.stringify([info, rtt]));
  });
}

inherits(InfoReceiverIframe, EventEmitter);

InfoReceiverIframe.transportName = 'iframe-info-receiver';

InfoReceiverIframe.prototype.close = function() {
  if (this.ir) {
    this.ir.close();
    this.ir = null;
  }
  this.removeAllListeners();
};

module.exports = InfoReceiverIframe;

},{"./info-ajax":9,"./transport/sender/xhr-local":37,"events":3,"inherits":57,"json3":58}],11:[function(require,module,exports){
(function (process,global){
'use strict';

var EventEmitter = require('events').EventEmitter
  , inherits = require('inherits')
  , JSON3 = require('json3')
  , utils = require('./utils/event')
  , IframeTransport = require('./transport/iframe')
  , InfoReceiverIframe = require('./info-iframe-receiver')
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:info-iframe');
}

function InfoIframe(baseUrl, url) {
  var self = this;
  EventEmitter.call(this);

  var go = function() {
    var ifr = self.ifr = new IframeTransport(InfoReceiverIframe.transportName, url, baseUrl);

    ifr.once('message', function(msg) {
      if (msg) {
        var d;
        try {
          d = JSON3.parse(msg);
        } catch (e) {
          debug('bad json', msg);
          self.emit('finish');
          self.close();
          return;
        }

        var info = d[0], rtt = d[1];
        self.emit('finish', info, rtt);
      }
      self.close();
    });

    ifr.once('close', function() {
      self.emit('finish');
      self.close();
    });
  };

  // TODO this seems the same as the 'needBody' from transports
  if (!global.document.body) {
    utils.attachEvent('load', go);
  } else {
    go();
  }
}

inherits(InfoIframe, EventEmitter);

InfoIframe.enabled = function() {
  return IframeTransport.enabled();
};

InfoIframe.prototype.close = function() {
  if (this.ifr) {
    this.ifr.close();
  }
  this.removeAllListeners();
  this.ifr = null;
};

module.exports = InfoIframe;

}).call(this,{ env: {} },typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./info-iframe-receiver":10,"./transport/iframe":22,"./utils/event":46,"debug":55,"events":3,"inherits":57,"json3":58}],12:[function(require,module,exports){
(function (process){
'use strict';

var EventEmitter = require('events').EventEmitter
  , inherits = require('inherits')
  , urlUtils = require('./utils/url')
  , XDR = require('./transport/sender/xdr')
  , XHRCors = require('./transport/sender/xhr-cors')
  , XHRLocal = require('./transport/sender/xhr-local')
  , XHRFake = require('./transport/sender/xhr-fake')
  , InfoIframe = require('./info-iframe')
  , InfoAjax = require('./info-ajax')
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:info-receiver');
}

function InfoReceiver(baseUrl, urlInfo) {
  debug(baseUrl);
  var self = this;
  EventEmitter.call(this);

  setTimeout(function() {
    self.doXhr(baseUrl, urlInfo);
  }, 0);
}

inherits(InfoReceiver, EventEmitter);

// TODO this is currently ignoring the list of available transports and the whitelist

InfoReceiver._getReceiver = function(baseUrl, url, urlInfo) {
  // determine method of CORS support (if needed)
  if (urlInfo.sameOrigin) {
    return new InfoAjax(url, XHRLocal);
  }
  if (XHRCors.enabled) {
    return new InfoAjax(url, XHRCors);
  }
  if (XDR.enabled && urlInfo.sameScheme) {
    return new InfoAjax(url, XDR);
  }
  if (InfoIframe.enabled()) {
    return new InfoIframe(baseUrl, url);
  }
  return new InfoAjax(url, XHRFake);
};

InfoReceiver.prototype.doXhr = function(baseUrl, urlInfo) {
  var self = this
    , url = urlUtils.addPath(baseUrl, '/info')
    ;
  debug('doXhr', url);

  this.xo = InfoReceiver._getReceiver(baseUrl, url, urlInfo);

  this.timeoutRef = setTimeout(function() {
    debug('timeout');
    self._cleanup(false);
    self.emit('finish');
  }, InfoReceiver.timeout);

  this.xo.once('finish', function(info, rtt) {
    debug('finish', info, rtt);
    self._cleanup(true);
    self.emit('finish', info, rtt);
  });
};

InfoReceiver.prototype._cleanup = function(wasClean) {
  debug('_cleanup');
  clearTimeout(this.timeoutRef);
  this.timeoutRef = null;
  if (!wasClean && this.xo) {
    this.xo.close();
  }
  this.xo = null;
};

InfoReceiver.prototype.close = function() {
  debug('close');
  this.removeAllListeners();
  this._cleanup(false);
};

InfoReceiver.timeout = 8000;

module.exports = InfoReceiver;

}).call(this,{ env: {} })

},{"./info-ajax":9,"./info-iframe":11,"./transport/sender/xdr":34,"./transport/sender/xhr-cors":35,"./transport/sender/xhr-fake":36,"./transport/sender/xhr-local":37,"./utils/url":52,"debug":55,"events":3,"inherits":57}],13:[function(require,module,exports){
(function (global){
'use strict';

module.exports = global.location || {
  origin: 'http://localhost:80'
, protocol: 'http:'
, host: 'localhost'
, port: 80
, href: 'http://localhost/'
, hash: ''
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],14:[function(require,module,exports){
(function (process,global){
'use strict';

require('./shims');

var URL = require('url-parse')
  , inherits = require('inherits')
  , JSON3 = require('json3')
  , random = require('./utils/random')
  , escape = require('./utils/escape')
  , urlUtils = require('./utils/url')
  , eventUtils = require('./utils/event')
  , transport = require('./utils/transport')
  , objectUtils = require('./utils/object')
  , browser = require('./utils/browser')
  , log = require('./utils/log')
  , Event = require('./event/event')
  , EventTarget = require('./event/eventtarget')
  , loc = require('./location')
  , CloseEvent = require('./event/close')
  , TransportMessageEvent = require('./event/trans-message')
  , InfoReceiver = require('./info-receiver')
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:main');
}

var transports;

// follow constructor steps defined at http://dev.w3.org/html5/websockets/#the-websocket-interface
function SockJS(url, protocols, options) {
  if (!(this instanceof SockJS)) {
    return new SockJS(url, protocols, options);
  }
  if (arguments.length < 1) {
    throw new TypeError("Failed to construct 'SockJS: 1 argument required, but only 0 present");
  }
  EventTarget.call(this);

  this.readyState = SockJS.CONNECTING;
  this.extensions = '';
  this.protocol = '';

  // non-standard extension
  options = options || {};
  if (options.protocols_whitelist) {
    log.warn("'protocols_whitelist' is DEPRECATED. Use 'transports' instead.");
  }
  this._transportsWhitelist = options.transports;
  this._transportOptions = options.transportOptions || {};

  var sessionId = options.sessionId || 8;
  if (typeof sessionId === 'function') {
    this._generateSessionId = sessionId;
  } else if (typeof sessionId === 'number') {
    this._generateSessionId = function() {
      return random.string(sessionId);
    };
  } else {
    throw new TypeError('If sessionId is used in the options, it needs to be a number or a function.');
  }

  this._server = options.server || random.numberString(1000);

  // Step 1 of WS spec - parse and validate the url. Issue #8
  var parsedUrl = new URL(url);
  if (!parsedUrl.host || !parsedUrl.protocol) {
    throw new SyntaxError("The URL '" + url + "' is invalid");
  } else if (parsedUrl.hash) {
    throw new SyntaxError('The URL must not contain a fragment');
  } else if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
    throw new SyntaxError("The URL's scheme must be either 'http:' or 'https:'. '" + parsedUrl.protocol + "' is not allowed.");
  }

  var secure = parsedUrl.protocol === 'https:';
  // Step 2 - don't allow secure origin with an insecure protocol
  if (loc.protocol === 'https:' && !secure) {
    throw new Error('SecurityError: An insecure SockJS connection may not be initiated from a page loaded over HTTPS');
  }

  // Step 3 - check port access - no need here
  // Step 4 - parse protocols argument
  if (!protocols) {
    protocols = [];
  } else if (!Array.isArray(protocols)) {
    protocols = [protocols];
  }

  // Step 5 - check protocols argument
  var sortedProtocols = protocols.sort();
  sortedProtocols.forEach(function(proto, i) {
    if (!proto) {
      throw new SyntaxError("The protocols entry '" + proto + "' is invalid.");
    }
    if (i < (sortedProtocols.length - 1) && proto === sortedProtocols[i + 1]) {
      throw new SyntaxError("The protocols entry '" + proto + "' is duplicated.");
    }
  });

  // Step 6 - convert origin
  var o = urlUtils.getOrigin(loc.href);
  this._origin = o ? o.toLowerCase() : null;

  // remove the trailing slash
  parsedUrl.set('pathname', parsedUrl.pathname.replace(/\/+$/, ''));

  // store the sanitized url
  this.url = parsedUrl.href;
  debug('using url', this.url);

  // Step 7 - start connection in background
  // obtain server info
  // http://sockjs.github.io/sockjs-protocol/sockjs-protocol-0.3.3.html#section-26
  this._urlInfo = {
    nullOrigin: !browser.hasDomain()
  , sameOrigin: urlUtils.isOriginEqual(this.url, loc.href)
  , sameScheme: urlUtils.isSchemeEqual(this.url, loc.href)
  };

  this._ir = new InfoReceiver(this.url, this._urlInfo);
  this._ir.once('finish', this._receiveInfo.bind(this));
}

inherits(SockJS, EventTarget);

function userSetCode(code) {
  return code === 1000 || (code >= 3000 && code <= 4999);
}

SockJS.prototype.close = function(code, reason) {
  // Step 1
  if (code && !userSetCode(code)) {
    throw new Error('InvalidAccessError: Invalid code');
  }
  // Step 2.4 states the max is 123 bytes, but we are just checking length
  if (reason && reason.length > 123) {
    throw new SyntaxError('reason argument has an invalid length');
  }

  // Step 3.1
  if (this.readyState === SockJS.CLOSING || this.readyState === SockJS.CLOSED) {
    return;
  }

  // TODO look at docs to determine how to set this
  var wasClean = true;
  this._close(code || 1000, reason || 'Normal closure', wasClean);
};

SockJS.prototype.send = function(data) {
  // #13 - convert anything non-string to string
  // TODO this currently turns objects into [object Object]
  if (typeof data !== 'string') {
    data = '' + data;
  }
  if (this.readyState === SockJS.CONNECTING) {
    throw new Error('InvalidStateError: The connection has not been established yet');
  }
  if (this.readyState !== SockJS.OPEN) {
    return;
  }
  this._transport.send(escape.quote(data));
};

SockJS.version = require('./version');

SockJS.CONNECTING = 0;
SockJS.OPEN = 1;
SockJS.CLOSING = 2;
SockJS.CLOSED = 3;

SockJS.prototype._receiveInfo = function(info, rtt) {
  debug('_receiveInfo', rtt);
  this._ir = null;
  if (!info) {
    this._close(1002, 'Cannot connect to server');
    return;
  }

  // establish a round-trip timeout (RTO) based on the
  // round-trip time (RTT)
  this._rto = this.countRTO(rtt);
  // allow server to override url used for the actual transport
  this._transUrl = info.base_url ? info.base_url : this.url;
  info = objectUtils.extend(info, this._urlInfo);
  debug('info', info);
  // determine list of desired and supported transports
  var enabledTransports = transports.filterToEnabled(this._transportsWhitelist, info);
  this._transports = enabledTransports.main;
  debug(this._transports.length + ' enabled transports');

  this._connect();
};

SockJS.prototype._connect = function() {
  for (var Transport = this._transports.shift(); Transport; Transport = this._transports.shift()) {
    debug('attempt', Transport.transportName);
    if (Transport.needBody) {
      if (!global.document.body ||
          (typeof global.document.readyState !== 'undefined' &&
            global.document.readyState !== 'complete' &&
            global.document.readyState !== 'interactive')) {
        debug('waiting for body');
        this._transports.unshift(Transport);
        eventUtils.attachEvent('load', this._connect.bind(this));
        return;
      }
    }

    // calculate timeout based on RTO and round trips. Default to 5s
    var timeoutMs = (this._rto * Transport.roundTrips) || 5000;
    this._transportTimeoutId = setTimeout(this._transportTimeout.bind(this), timeoutMs);
    debug('using timeout', timeoutMs);

    var transportUrl = urlUtils.addPath(this._transUrl, '/' + this._server + '/' + this._generateSessionId());
    var options = this._transportOptions[Transport.transportName];
    debug('transport url', transportUrl);
    var transportObj = new Transport(transportUrl, this._transUrl, options);
    transportObj.on('message', this._transportMessage.bind(this));
    transportObj.once('close', this._transportClose.bind(this));
    transportObj.transportName = Transport.transportName;
    this._transport = transportObj;

    return;
  }
  this._close(2000, 'All transports failed', false);
};

SockJS.prototype._transportTimeout = function() {
  debug('_transportTimeout');
  if (this.readyState === SockJS.CONNECTING) {
    if (this._transport) {
      this._transport.close();
    }

    this._transportClose(2007, 'Transport timed out');
  }
};

SockJS.prototype._transportMessage = function(msg) {
  debug('_transportMessage', msg);
  var self = this
    , type = msg.slice(0, 1)
    , content = msg.slice(1)
    , payload
    ;

  // first check for messages that don't need a payload
  switch (type) {
    case 'o':
      this._open();
      return;
    case 'h':
      this.dispatchEvent(new Event('heartbeat'));
      debug('heartbeat', this.transport);
      return;
  }

  if (content) {
    try {
      payload = JSON3.parse(content);
    } catch (e) {
      debug('bad json', content);
    }
  }

  if (typeof payload === 'undefined') {
    debug('empty payload', content);
    return;
  }

  switch (type) {
    case 'a':
      if (Array.isArray(payload)) {
        payload.forEach(function(p) {
          debug('message', self.transport, p);
          self.dispatchEvent(new TransportMessageEvent(p));
        });
      }
      break;
    case 'm':
      debug('message', this.transport, payload);
      this.dispatchEvent(new TransportMessageEvent(payload));
      break;
    case 'c':
      if (Array.isArray(payload) && payload.length === 2) {
        this._close(payload[0], payload[1], true);
      }
      break;
  }
};

SockJS.prototype._transportClose = function(code, reason) {
  debug('_transportClose', this.transport, code, reason);
  if (this._transport) {
    this._transport.removeAllListeners();
    this._transport = null;
    this.transport = null;
  }

  if (!userSetCode(code) && code !== 2000 && this.readyState === SockJS.CONNECTING) {
    this._connect();
    return;
  }

  this._close(code, reason);
};

SockJS.prototype._open = function() {
  debug('_open', this._transport.transportName, this.readyState);
  if (this.readyState === SockJS.CONNECTING) {
    if (this._transportTimeoutId) {
      clearTimeout(this._transportTimeoutId);
      this._transportTimeoutId = null;
    }
    this.readyState = SockJS.OPEN;
    this.transport = this._transport.transportName;
    this.dispatchEvent(new Event('open'));
    debug('connected', this.transport);
  } else {
    // The server might have been restarted, and lost track of our
    // connection.
    this._close(1006, 'Server lost session');
  }
};

SockJS.prototype._close = function(code, reason, wasClean) {
  debug('_close', this.transport, code, reason, wasClean, this.readyState);
  var forceFail = false;

  if (this._ir) {
    forceFail = true;
    this._ir.close();
    this._ir = null;
  }
  if (this._transport) {
    this._transport.close();
    this._transport = null;
    this.transport = null;
  }

  if (this.readyState === SockJS.CLOSED) {
    throw new Error('InvalidStateError: SockJS has already been closed');
  }

  this.readyState = SockJS.CLOSING;
  setTimeout(function() {
    this.readyState = SockJS.CLOSED;

    if (forceFail) {
      this.dispatchEvent(new Event('error'));
    }

    var e = new CloseEvent('close');
    e.wasClean = wasClean || false;
    e.code = code || 1000;
    e.reason = reason;

    this.dispatchEvent(e);
    this.onmessage = this.onclose = this.onerror = null;
    debug('disconnected');
  }.bind(this), 0);
};

// See: http://www.erg.abdn.ac.uk/~gerrit/dccp/notes/ccid2/rto_estimator/
// and RFC 2988.
SockJS.prototype.countRTO = function(rtt) {
  // In a local environment, when using IE8/9 and the `jsonp-polling`
  // transport the time needed to establish a connection (the time that pass
  // from the opening of the transport to the call of `_dispatchOpen`) is
  // around 200msec (the lower bound used in the article above) and this
  // causes spurious timeouts. For this reason we calculate a value slightly
  // larger than that used in the article.
  if (rtt > 100) {
    return 4 * rtt; // rto > 400msec
  }
  return 300 + rtt; // 300msec < rto <= 400msec
};

module.exports = function(availableTransports) {
  transports = transport(availableTransports);
  require('./iframe-bootstrap')(SockJS, availableTransports);
  return SockJS;
};

}).call(this,{ env: {} },typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./event/close":2,"./event/event":4,"./event/eventtarget":5,"./event/trans-message":6,"./iframe-bootstrap":8,"./info-receiver":12,"./location":13,"./shims":15,"./utils/browser":44,"./utils/escape":45,"./utils/event":46,"./utils/log":48,"./utils/object":49,"./utils/random":50,"./utils/transport":51,"./utils/url":52,"./version":53,"debug":55,"inherits":57,"json3":58,"url-parse":61}],15:[function(require,module,exports){
/* eslint-disable */
/* jscs: disable */
'use strict';

// pulled specific shims from https://github.com/es-shims/es5-shim

var ArrayPrototype = Array.prototype;
var ObjectPrototype = Object.prototype;
var FunctionPrototype = Function.prototype;
var StringPrototype = String.prototype;
var array_slice = ArrayPrototype.slice;

var _toString = ObjectPrototype.toString;
var isFunction = function (val) {
    return ObjectPrototype.toString.call(val) === '[object Function]';
};
var isArray = function isArray(obj) {
    return _toString.call(obj) === '[object Array]';
};
var isString = function isString(obj) {
    return _toString.call(obj) === '[object String]';
};

var supportsDescriptors = Object.defineProperty && (function () {
    try {
        Object.defineProperty({}, 'x', {});
        return true;
    } catch (e) { /* this is ES3 */
        return false;
    }
}());

// Define configurable, writable and non-enumerable props
// if they don't exist.
var defineProperty;
if (supportsDescriptors) {
    defineProperty = function (object, name, method, forceAssign) {
        if (!forceAssign && (name in object)) { return; }
        Object.defineProperty(object, name, {
            configurable: true,
            enumerable: false,
            writable: true,
            value: method
        });
    };
} else {
    defineProperty = function (object, name, method, forceAssign) {
        if (!forceAssign && (name in object)) { return; }
        object[name] = method;
    };
}
var defineProperties = function (object, map, forceAssign) {
    for (var name in map) {
        if (ObjectPrototype.hasOwnProperty.call(map, name)) {
          defineProperty(object, name, map[name], forceAssign);
        }
    }
};

var toObject = function (o) {
    if (o == null) { // this matches both null and undefined
        throw new TypeError("can't convert " + o + ' to object');
    }
    return Object(o);
};

//
// Util
// ======
//

// ES5 9.4
// http://es5.github.com/#x9.4
// http://jsperf.com/to-integer

function toInteger(num) {
    var n = +num;
    if (n !== n) { // isNaN
        n = 0;
    } else if (n !== 0 && n !== (1 / 0) && n !== -(1 / 0)) {
        n = (n > 0 || -1) * Math.floor(Math.abs(n));
    }
    return n;
}

function ToUint32(x) {
    return x >>> 0;
}

//
// Function
// ========
//

// ES-5 15.3.4.5
// http://es5.github.com/#x15.3.4.5

function Empty() {}

defineProperties(FunctionPrototype, {
    bind: function bind(that) { // .length is 1
        // 1. Let Target be the this value.
        var target = this;
        // 2. If IsCallable(Target) is false, throw a TypeError exception.
        if (!isFunction(target)) {
            throw new TypeError('Function.prototype.bind called on incompatible ' + target);
        }
        // 3. Let A be a new (possibly empty) internal list of all of the
        //   argument values provided after thisArg (arg1, arg2 etc), in order.
        // XXX slicedArgs will stand in for "A" if used
        var args = array_slice.call(arguments, 1); // for normal call
        // 4. Let F be a new native ECMAScript object.
        // 11. Set the [[Prototype]] internal property of F to the standard
        //   built-in Function prototype object as specified in 15.3.3.1.
        // 12. Set the [[Call]] internal property of F as described in
        //   15.3.4.5.1.
        // 13. Set the [[Construct]] internal property of F as described in
        //   15.3.4.5.2.
        // 14. Set the [[HasInstance]] internal property of F as described in
        //   15.3.4.5.3.
        var binder = function () {

            if (this instanceof bound) {
                // 15.3.4.5.2 [[Construct]]
                // When the [[Construct]] internal method of a function object,
                // F that was created using the bind function is called with a
                // list of arguments ExtraArgs, the following steps are taken:
                // 1. Let target be the value of F's [[TargetFunction]]
                //   internal property.
                // 2. If target has no [[Construct]] internal method, a
                //   TypeError exception is thrown.
                // 3. Let boundArgs be the value of F's [[BoundArgs]] internal
                //   property.
                // 4. Let args be a new list containing the same values as the
                //   list boundArgs in the same order followed by the same
                //   values as the list ExtraArgs in the same order.
                // 5. Return the result of calling the [[Construct]] internal
                //   method of target providing args as the arguments.

                var result = target.apply(
                    this,
                    args.concat(array_slice.call(arguments))
                );
                if (Object(result) === result) {
                    return result;
                }
                return this;

            } else {
                // 15.3.4.5.1 [[Call]]
                // When the [[Call]] internal method of a function object, F,
                // which was created using the bind function is called with a
                // this value and a list of arguments ExtraArgs, the following
                // steps are taken:
                // 1. Let boundArgs be the value of F's [[BoundArgs]] internal
                //   property.
                // 2. Let boundThis be the value of F's [[BoundThis]] internal
                //   property.
                // 3. Let target be the value of F's [[TargetFunction]] internal
                //   property.
                // 4. Let args be a new list containing the same values as the
                //   list boundArgs in the same order followed by the same
                //   values as the list ExtraArgs in the same order.
                // 5. Return the result of calling the [[Call]] internal method
                //   of target providing boundThis as the this value and
                //   providing args as the arguments.

                // equiv: target.call(this, ...boundArgs, ...args)
                return target.apply(
                    that,
                    args.concat(array_slice.call(arguments))
                );

            }

        };

        // 15. If the [[Class]] internal property of Target is "Function", then
        //     a. Let L be the length property of Target minus the length of A.
        //     b. Set the length own property of F to either 0 or L, whichever is
        //       larger.
        // 16. Else set the length own property of F to 0.

        var boundLength = Math.max(0, target.length - args.length);

        // 17. Set the attributes of the length own property of F to the values
        //   specified in 15.3.5.1.
        var boundArgs = [];
        for (var i = 0; i < boundLength; i++) {
            boundArgs.push('$' + i);
        }

        // XXX Build a dynamic function with desired amount of arguments is the only
        // way to set the length property of a function.
        // In environments where Content Security Policies enabled (Chrome extensions,
        // for ex.) all use of eval or Function costructor throws an exception.
        // However in all of these environments Function.prototype.bind exists
        // and so this code will never be executed.
        var bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this, arguments); }')(binder);

        if (target.prototype) {
            Empty.prototype = target.prototype;
            bound.prototype = new Empty();
            // Clean up dangling references.
            Empty.prototype = null;
        }

        // TODO
        // 18. Set the [[Extensible]] internal property of F to true.

        // TODO
        // 19. Let thrower be the [[ThrowTypeError]] function Object (13.2.3).
        // 20. Call the [[DefineOwnProperty]] internal method of F with
        //   arguments "caller", PropertyDescriptor {[[Get]]: thrower, [[Set]]:
        //   thrower, [[Enumerable]]: false, [[Configurable]]: false}, and
        //   false.
        // 21. Call the [[DefineOwnProperty]] internal method of F with
        //   arguments "arguments", PropertyDescriptor {[[Get]]: thrower,
        //   [[Set]]: thrower, [[Enumerable]]: false, [[Configurable]]: false},
        //   and false.

        // TODO
        // NOTE Function objects created using Function.prototype.bind do not
        // have a prototype property or the [[Code]], [[FormalParameters]], and
        // [[Scope]] internal properties.
        // XXX can't delete prototype in pure-js.

        // 22. Return F.
        return bound;
    }
});

//
// Array
// =====
//

// ES5 15.4.3.2
// http://es5.github.com/#x15.4.3.2
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/isArray
defineProperties(Array, { isArray: isArray });


var boxedString = Object('a');
var splitString = boxedString[0] !== 'a' || !(0 in boxedString);

var properlyBoxesContext = function properlyBoxed(method) {
    // Check node 0.6.21 bug where third parameter is not boxed
    var properlyBoxesNonStrict = true;
    var properlyBoxesStrict = true;
    if (method) {
        method.call('foo', function (_, __, context) {
            if (typeof context !== 'object') { properlyBoxesNonStrict = false; }
        });

        method.call([1], function () {
            'use strict';
            properlyBoxesStrict = typeof this === 'string';
        }, 'x');
    }
    return !!method && properlyBoxesNonStrict && properlyBoxesStrict;
};

defineProperties(ArrayPrototype, {
    forEach: function forEach(fun /*, thisp*/) {
        var object = toObject(this),
            self = splitString && isString(this) ? this.split('') : object,
            thisp = arguments[1],
            i = -1,
            length = self.length >>> 0;

        // If no callback function or if callback is not a callable function
        if (!isFunction(fun)) {
            throw new TypeError(); // TODO message
        }

        while (++i < length) {
            if (i in self) {
                // Invoke the callback function with call, passing arguments:
                // context, property value, property key, thisArg object
                // context
                fun.call(thisp, self[i], i, object);
            }
        }
    }
}, !properlyBoxesContext(ArrayPrototype.forEach));

// ES5 15.4.4.14
// http://es5.github.com/#x15.4.4.14
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/indexOf
var hasFirefox2IndexOfBug = Array.prototype.indexOf && [0, 1].indexOf(1, 2) !== -1;
defineProperties(ArrayPrototype, {
    indexOf: function indexOf(sought /*, fromIndex */ ) {
        var self = splitString && isString(this) ? this.split('') : toObject(this),
            length = self.length >>> 0;

        if (!length) {
            return -1;
        }

        var i = 0;
        if (arguments.length > 1) {
            i = toInteger(arguments[1]);
        }

        // handle negative indices
        i = i >= 0 ? i : Math.max(0, length + i);
        for (; i < length; i++) {
            if (i in self && self[i] === sought) {
                return i;
            }
        }
        return -1;
    }
}, hasFirefox2IndexOfBug);

//
// String
// ======
//

// ES5 15.5.4.14
// http://es5.github.com/#x15.5.4.14

// [bugfix, IE lt 9, firefox 4, Konqueror, Opera, obscure browsers]
// Many browsers do not split properly with regular expressions or they
// do not perform the split correctly under obscure conditions.
// See http://blog.stevenlevithan.com/archives/cross-browser-split
// I've tested in many browsers and this seems to cover the deviant ones:
//    'ab'.split(/(?:ab)*/) should be ["", ""], not [""]
//    '.'.split(/(.?)(.?)/) should be ["", ".", "", ""], not ["", ""]
//    'tesst'.split(/(s)*/) should be ["t", undefined, "e", "s", "t"], not
//       [undefined, "t", undefined, "e", ...]
//    ''.split(/.?/) should be [], not [""]
//    '.'.split(/()()/) should be ["."], not ["", "", "."]

var string_split = StringPrototype.split;
if (
    'ab'.split(/(?:ab)*/).length !== 2 ||
    '.'.split(/(.?)(.?)/).length !== 4 ||
    'tesst'.split(/(s)*/)[1] === 't' ||
    'test'.split(/(?:)/, -1).length !== 4 ||
    ''.split(/.?/).length ||
    '.'.split(/()()/).length > 1
) {
    (function () {
        var compliantExecNpcg = /()??/.exec('')[1] === void 0; // NPCG: nonparticipating capturing group

        StringPrototype.split = function (separator, limit) {
            var string = this;
            if (separator === void 0 && limit === 0) {
                return [];
            }

            // If `separator` is not a regex, use native split
            if (_toString.call(separator) !== '[object RegExp]') {
                return string_split.call(this, separator, limit);
            }

            var output = [],
                flags = (separator.ignoreCase ? 'i' : '') +
                        (separator.multiline  ? 'm' : '') +
                        (separator.extended   ? 'x' : '') + // Proposed for ES6
                        (separator.sticky     ? 'y' : ''), // Firefox 3+
                lastLastIndex = 0,
                // Make `global` and avoid `lastIndex` issues by working with a copy
                separator2, match, lastIndex, lastLength;
            separator = new RegExp(separator.source, flags + 'g');
            string += ''; // Type-convert
            if (!compliantExecNpcg) {
                // Doesn't need flags gy, but they don't hurt
                separator2 = new RegExp('^' + separator.source + '$(?!\\s)', flags);
            }
            /* Values for `limit`, per the spec:
             * If undefined: 4294967295 // Math.pow(2, 32) - 1
             * If 0, Infinity, or NaN: 0
             * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
             * If negative number: 4294967296 - Math.floor(Math.abs(limit))
             * If other: Type-convert, then use the above rules
             */
            limit = limit === void 0 ?
                -1 >>> 0 : // Math.pow(2, 32) - 1
                ToUint32(limit);
            while (match = separator.exec(string)) {
                // `separator.lastIndex` is not reliable cross-browser
                lastIndex = match.index + match[0].length;
                if (lastIndex > lastLastIndex) {
                    output.push(string.slice(lastLastIndex, match.index));
                    // Fix browsers whose `exec` methods don't consistently return `undefined` for
                    // nonparticipating capturing groups
                    if (!compliantExecNpcg && match.length > 1) {
                        match[0].replace(separator2, function () {
                            for (var i = 1; i < arguments.length - 2; i++) {
                                if (arguments[i] === void 0) {
                                    match[i] = void 0;
                                }
                            }
                        });
                    }
                    if (match.length > 1 && match.index < string.length) {
                        ArrayPrototype.push.apply(output, match.slice(1));
                    }
                    lastLength = match[0].length;
                    lastLastIndex = lastIndex;
                    if (output.length >= limit) {
                        break;
                    }
                }
                if (separator.lastIndex === match.index) {
                    separator.lastIndex++; // Avoid an infinite loop
                }
            }
            if (lastLastIndex === string.length) {
                if (lastLength || !separator.test('')) {
                    output.push('');
                }
            } else {
                output.push(string.slice(lastLastIndex));
            }
            return output.length > limit ? output.slice(0, limit) : output;
        };
    }());

// [bugfix, chrome]
// If separator is undefined, then the result array contains just one String,
// which is the this value (converted to a String). If limit is not undefined,
// then the output array is truncated so that it contains no more than limit
// elements.
// "0".split(undefined, 0) -> []
} else if ('0'.split(void 0, 0).length) {
    StringPrototype.split = function split(separator, limit) {
        if (separator === void 0 && limit === 0) { return []; }
        return string_split.call(this, separator, limit);
    };
}

// ECMA-262, 3rd B.2.3
// Not an ECMAScript standard, although ECMAScript 3rd Edition has a
// non-normative section suggesting uniform semantics and it should be
// normalized across all browsers
// [bugfix, IE lt 9] IE < 9 substr() with negative value not working in IE
var string_substr = StringPrototype.substr;
var hasNegativeSubstrBug = ''.substr && '0b'.substr(-1) !== 'b';
defineProperties(StringPrototype, {
    substr: function substr(start, length) {
        return string_substr.call(
            this,
            start < 0 ? ((start = this.length + start) < 0 ? 0 : start) : start,
            length
        );
    }
}, hasNegativeSubstrBug);

},{}],16:[function(require,module,exports){
'use strict';

module.exports = [
  // streaming transports
  require('./transport/websocket')
, require('./transport/xhr-streaming')
, require('./transport/xdr-streaming')
, require('./transport/eventsource')
, require('./transport/lib/iframe-wrap')(require('./transport/eventsource'))

  // polling transports
, require('./transport/htmlfile')
, require('./transport/lib/iframe-wrap')(require('./transport/htmlfile'))
, require('./transport/xhr-polling')
, require('./transport/xdr-polling')
, require('./transport/lib/iframe-wrap')(require('./transport/xhr-polling'))
, require('./transport/jsonp-polling')
];

},{"./transport/eventsource":20,"./transport/htmlfile":21,"./transport/jsonp-polling":23,"./transport/lib/iframe-wrap":26,"./transport/websocket":38,"./transport/xdr-polling":39,"./transport/xdr-streaming":40,"./transport/xhr-polling":41,"./transport/xhr-streaming":42}],17:[function(require,module,exports){
(function (process,global){
'use strict';

var EventEmitter = require('events').EventEmitter
  , inherits = require('inherits')
  , utils = require('../../utils/event')
  , urlUtils = require('../../utils/url')
  , XHR = global.XMLHttpRequest
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:browser:xhr');
}

function AbstractXHRObject(method, url, payload, opts) {
  debug(method, url);
  var self = this;
  EventEmitter.call(this);

  setTimeout(function () {
    self._start(method, url, payload, opts);
  }, 0);
}

inherits(AbstractXHRObject, EventEmitter);

AbstractXHRObject.prototype._start = function(method, url, payload, opts) {
  var self = this;

  try {
    this.xhr = new XHR();
  } catch (x) {
    // intentionally empty
  }

  if (!this.xhr) {
    debug('no xhr');
    this.emit('finish', 0, 'no xhr support');
    this._cleanup();
    return;
  }

  // several browsers cache POSTs
  url = urlUtils.addQuery(url, 't=' + (+new Date()));

  // Explorer tends to keep connection open, even after the
  // tab gets closed: http://bugs.jquery.com/ticket/5280
  this.unloadRef = utils.unloadAdd(function() {
    debug('unload cleanup');
    self._cleanup(true);
  });
  try {
    this.xhr.open(method, url, true);
    if (this.timeout && 'timeout' in this.xhr) {
      this.xhr.timeout = this.timeout;
      this.xhr.ontimeout = function() {
        debug('xhr timeout');
        self.emit('finish', 0, '');
        self._cleanup(false);
      };
    }
  } catch (e) {
    debug('exception', e);
    // IE raises an exception on wrong port.
    this.emit('finish', 0, '');
    this._cleanup(false);
    return;
  }

  if ((!opts || !opts.noCredentials) && AbstractXHRObject.supportsCORS) {
    debug('withCredentials');
    // Mozilla docs says https://developer.mozilla.org/en/XMLHttpRequest :
    // "This never affects same-site requests."

    this.xhr.withCredentials = true;
  }
  if (opts && opts.headers) {
    for (var key in opts.headers) {
      this.xhr.setRequestHeader(key, opts.headers[key]);
    }
  }

  this.xhr.onreadystatechange = function() {
    if (self.xhr) {
      var x = self.xhr;
      var text, status;
      debug('readyState', x.readyState);
      switch (x.readyState) {
      case 3:
        // IE doesn't like peeking into responseText or status
        // on Microsoft.XMLHTTP and readystate=3
        try {
          status = x.status;
          text = x.responseText;
        } catch (e) {
          // intentionally empty
        }
        debug('status', status);
        // IE returns 1223 for 204: http://bugs.jquery.com/ticket/1450
        if (status === 1223) {
          status = 204;
        }

        // IE does return readystate == 3 for 404 answers.
        if (status === 200 && text && text.length > 0) {
          debug('chunk');
          self.emit('chunk', status, text);
        }
        break;
      case 4:
        status = x.status;
        debug('status', status);
        // IE returns 1223 for 204: http://bugs.jquery.com/ticket/1450
        if (status === 1223) {
          status = 204;
        }
        // IE returns this for a bad port
        // http://msdn.microsoft.com/en-us/library/windows/desktop/aa383770(v=vs.85).aspx
        if (status === 12005 || status === 12029) {
          status = 0;
        }

        debug('finish', status, x.responseText);
        self.emit('finish', status, x.responseText);
        self._cleanup(false);
        break;
      }
    }
  };

  try {
    self.xhr.send(payload);
  } catch (e) {
    self.emit('finish', 0, '');
    self._cleanup(false);
  }
};

AbstractXHRObject.prototype._cleanup = function(abort) {
  debug('cleanup');
  if (!this.xhr) {
    return;
  }
  this.removeAllListeners();
  utils.unloadDel(this.unloadRef);

  // IE needs this field to be a function
  this.xhr.onreadystatechange = function() {};
  if (this.xhr.ontimeout) {
    this.xhr.ontimeout = null;
  }

  if (abort) {
    try {
      this.xhr.abort();
    } catch (x) {
      // intentionally empty
    }
  }
  this.unloadRef = this.xhr = null;
};

AbstractXHRObject.prototype.close = function() {
  debug('close');
  this._cleanup(true);
};

AbstractXHRObject.enabled = !!XHR;
// override XMLHttpRequest for IE6/7
// obfuscate to avoid firewalls
var axo = ['Active'].concat('Object').join('X');
if (!AbstractXHRObject.enabled && (axo in global)) {
  debug('overriding xmlhttprequest');
  XHR = function() {
    try {
      return new global[axo]('Microsoft.XMLHTTP');
    } catch (e) {
      return null;
    }
  };
  AbstractXHRObject.enabled = !!new XHR();
}

var cors = false;
try {
  cors = 'withCredentials' in new XHR();
} catch (ignored) {
  // intentionally empty
}

AbstractXHRObject.supportsCORS = cors;

module.exports = AbstractXHRObject;

}).call(this,{ env: {} },typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../../utils/event":46,"../../utils/url":52,"debug":55,"events":3,"inherits":57}],18:[function(require,module,exports){
(function (global){
module.exports = global.EventSource;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],19:[function(require,module,exports){
(function (global){
'use strict';

var Driver = global.WebSocket || global.MozWebSocket;
if (Driver) {
	module.exports = function WebSocketBrowserDriver(url) {
		return new Driver(url);
	};
} else {
	module.exports = undefined;
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],20:[function(require,module,exports){
'use strict';

var inherits = require('inherits')
  , AjaxBasedTransport = require('./lib/ajax-based')
  , EventSourceReceiver = require('./receiver/eventsource')
  , XHRCorsObject = require('./sender/xhr-cors')
  , EventSourceDriver = require('eventsource')
  ;

function EventSourceTransport(transUrl) {
  if (!EventSourceTransport.enabled()) {
    throw new Error('Transport created when disabled');
  }

  AjaxBasedTransport.call(this, transUrl, '/eventsource', EventSourceReceiver, XHRCorsObject);
}

inherits(EventSourceTransport, AjaxBasedTransport);

EventSourceTransport.enabled = function() {
  return !!EventSourceDriver;
};

EventSourceTransport.transportName = 'eventsource';
EventSourceTransport.roundTrips = 2;

module.exports = EventSourceTransport;

},{"./lib/ajax-based":24,"./receiver/eventsource":29,"./sender/xhr-cors":35,"eventsource":18,"inherits":57}],21:[function(require,module,exports){
'use strict';

var inherits = require('inherits')
  , HtmlfileReceiver = require('./receiver/htmlfile')
  , XHRLocalObject = require('./sender/xhr-local')
  , AjaxBasedTransport = require('./lib/ajax-based')
  ;

function HtmlFileTransport(transUrl) {
  if (!HtmlfileReceiver.enabled) {
    throw new Error('Transport created when disabled');
  }
  AjaxBasedTransport.call(this, transUrl, '/htmlfile', HtmlfileReceiver, XHRLocalObject);
}

inherits(HtmlFileTransport, AjaxBasedTransport);

HtmlFileTransport.enabled = function(info) {
  return HtmlfileReceiver.enabled && info.sameOrigin;
};

HtmlFileTransport.transportName = 'htmlfile';
HtmlFileTransport.roundTrips = 2;

module.exports = HtmlFileTransport;

},{"./lib/ajax-based":24,"./receiver/htmlfile":30,"./sender/xhr-local":37,"inherits":57}],22:[function(require,module,exports){
(function (process){
'use strict';

// Few cool transports do work only for same-origin. In order to make
// them work cross-domain we shall use iframe, served from the
// remote domain. New browsers have capabilities to communicate with
// cross domain iframe using postMessage(). In IE it was implemented
// from IE 8+, but of course, IE got some details wrong:
//    http://msdn.microsoft.com/en-us/library/cc197015(v=VS.85).aspx
//    http://stevesouders.com/misc/test-postmessage.php

var inherits = require('inherits')
  , JSON3 = require('json3')
  , EventEmitter = require('events').EventEmitter
  , version = require('../version')
  , urlUtils = require('../utils/url')
  , iframeUtils = require('../utils/iframe')
  , eventUtils = require('../utils/event')
  , random = require('../utils/random')
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:transport:iframe');
}

function IframeTransport(transport, transUrl, baseUrl) {
  if (!IframeTransport.enabled()) {
    throw new Error('Transport created when disabled');
  }
  EventEmitter.call(this);

  var self = this;
  this.origin = urlUtils.getOrigin(baseUrl);
  this.baseUrl = baseUrl;
  this.transUrl = transUrl;
  this.transport = transport;
  this.windowId = random.string(8);

  var iframeUrl = urlUtils.addPath(baseUrl, '/iframe.html') + '#' + this.windowId;
  debug(transport, transUrl, iframeUrl);

  this.iframeObj = iframeUtils.createIframe(iframeUrl, function(r) {
    debug('err callback');
    self.emit('close', 1006, 'Unable to load an iframe (' + r + ')');
    self.close();
  });

  this.onmessageCallback = this._message.bind(this);
  eventUtils.attachEvent('message', this.onmessageCallback);
}

inherits(IframeTransport, EventEmitter);

IframeTransport.prototype.close = function() {
  debug('close');
  this.removeAllListeners();
  if (this.iframeObj) {
    eventUtils.detachEvent('message', this.onmessageCallback);
    try {
      // When the iframe is not loaded, IE raises an exception
      // on 'contentWindow'.
      this.postMessage('c');
    } catch (x) {
      // intentionally empty
    }
    this.iframeObj.cleanup();
    this.iframeObj = null;
    this.onmessageCallback = this.iframeObj = null;
  }
};

IframeTransport.prototype._message = function(e) {
  debug('message', e.data);
  if (!urlUtils.isOriginEqual(e.origin, this.origin)) {
    debug('not same origin', e.origin, this.origin);
    return;
  }

  var iframeMessage;
  try {
    iframeMessage = JSON3.parse(e.data);
  } catch (ignored) {
    debug('bad json', e.data);
    return;
  }

  if (iframeMessage.windowId !== this.windowId) {
    debug('mismatched window id', iframeMessage.windowId, this.windowId);
    return;
  }

  switch (iframeMessage.type) {
  case 's':
    this.iframeObj.loaded();
    // window global dependency
    this.postMessage('s', JSON3.stringify([
      version
    , this.transport
    , this.transUrl
    , this.baseUrl
    ]));
    break;
  case 't':
    this.emit('message', iframeMessage.data);
    break;
  case 'c':
    var cdata;
    try {
      cdata = JSON3.parse(iframeMessage.data);
    } catch (ignored) {
      debug('bad json', iframeMessage.data);
      return;
    }
    this.emit('close', cdata[0], cdata[1]);
    this.close();
    break;
  }
};

IframeTransport.prototype.postMessage = function(type, data) {
  debug('postMessage', type, data);
  this.iframeObj.post(JSON3.stringify({
    windowId: this.windowId
  , type: type
  , data: data || ''
  }), this.origin);
};

IframeTransport.prototype.send = function(message) {
  debug('send', message);
  this.postMessage('m', message);
};

IframeTransport.enabled = function() {
  return iframeUtils.iframeEnabled;
};

IframeTransport.transportName = 'iframe';
IframeTransport.roundTrips = 2;

module.exports = IframeTransport;

}).call(this,{ env: {} })

},{"../utils/event":46,"../utils/iframe":47,"../utils/random":50,"../utils/url":52,"../version":53,"debug":55,"events":3,"inherits":57,"json3":58}],23:[function(require,module,exports){
(function (global){
'use strict';

// The simplest and most robust transport, using the well-know cross
// domain hack - JSONP. This transport is quite inefficient - one
// message could use up to one http request. But at least it works almost
// everywhere.
// Known limitations:
//   o you will get a spinning cursor
//   o for Konqueror a dumb timer is needed to detect errors

var inherits = require('inherits')
  , SenderReceiver = require('./lib/sender-receiver')
  , JsonpReceiver = require('./receiver/jsonp')
  , jsonpSender = require('./sender/jsonp')
  ;

function JsonPTransport(transUrl) {
  if (!JsonPTransport.enabled()) {
    throw new Error('Transport created when disabled');
  }
  SenderReceiver.call(this, transUrl, '/jsonp', jsonpSender, JsonpReceiver);
}

inherits(JsonPTransport, SenderReceiver);

JsonPTransport.enabled = function() {
  return !!global.document;
};

JsonPTransport.transportName = 'jsonp-polling';
JsonPTransport.roundTrips = 1;
JsonPTransport.needBody = true;

module.exports = JsonPTransport;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./lib/sender-receiver":28,"./receiver/jsonp":31,"./sender/jsonp":33,"inherits":57}],24:[function(require,module,exports){
(function (process){
'use strict';

var inherits = require('inherits')
  , urlUtils = require('../../utils/url')
  , SenderReceiver = require('./sender-receiver')
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:ajax-based');
}

function createAjaxSender(AjaxObject) {
  return function(url, payload, callback) {
    debug('create ajax sender', url, payload);
    var opt = {};
    if (typeof payload === 'string') {
      opt.headers = {'Content-type': 'text/plain'};
    }
    var ajaxUrl = urlUtils.addPath(url, '/xhr_send');
    var xo = new AjaxObject('POST', ajaxUrl, payload, opt);
    xo.once('finish', function(status) {
      debug('finish', status);
      xo = null;

      if (status !== 200 && status !== 204) {
        return callback(new Error('http status ' + status));
      }
      callback();
    });
    return function() {
      debug('abort');
      xo.close();
      xo = null;

      var err = new Error('Aborted');
      err.code = 1000;
      callback(err);
    };
  };
}

function AjaxBasedTransport(transUrl, urlSuffix, Receiver, AjaxObject) {
  SenderReceiver.call(this, transUrl, urlSuffix, createAjaxSender(AjaxObject), Receiver, AjaxObject);
}

inherits(AjaxBasedTransport, SenderReceiver);

module.exports = AjaxBasedTransport;

}).call(this,{ env: {} })

},{"../../utils/url":52,"./sender-receiver":28,"debug":55,"inherits":57}],25:[function(require,module,exports){
(function (process){
'use strict';

var inherits = require('inherits')
  , EventEmitter = require('events').EventEmitter
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:buffered-sender');
}

function BufferedSender(url, sender) {
  debug(url);
  EventEmitter.call(this);
  this.sendBuffer = [];
  this.sender = sender;
  this.url = url;
}

inherits(BufferedSender, EventEmitter);

BufferedSender.prototype.send = function(message) {
  debug('send', message);
  this.sendBuffer.push(message);
  if (!this.sendStop) {
    this.sendSchedule();
  }
};

// For polling transports in a situation when in the message callback,
// new message is being send. If the sending connection was started
// before receiving one, it is possible to saturate the network and
// timeout due to the lack of receiving socket. To avoid that we delay
// sending messages by some small time, in order to let receiving
// connection be started beforehand. This is only a halfmeasure and
// does not fix the big problem, but it does make the tests go more
// stable on slow networks.
BufferedSender.prototype.sendScheduleWait = function() {
  debug('sendScheduleWait');
  var self = this;
  var tref;
  this.sendStop = function() {
    debug('sendStop');
    self.sendStop = null;
    clearTimeout(tref);
  };
  tref = setTimeout(function() {
    debug('timeout');
    self.sendStop = null;
    self.sendSchedule();
  }, 25);
};

BufferedSender.prototype.sendSchedule = function() {
  debug('sendSchedule', this.sendBuffer.length);
  var self = this;
  if (this.sendBuffer.length > 0) {
    var payload = '[' + this.sendBuffer.join(',') + ']';
    this.sendStop = this.sender(this.url, payload, function(err) {
      self.sendStop = null;
      if (err) {
        debug('error', err);
        self.emit('close', err.code || 1006, 'Sending error: ' + err);
        self.close();
      } else {
        self.sendScheduleWait();
      }
    });
    this.sendBuffer = [];
  }
};

BufferedSender.prototype._cleanup = function() {
  debug('_cleanup');
  this.removeAllListeners();
};

BufferedSender.prototype.close = function() {
  debug('close');
  this._cleanup();
  if (this.sendStop) {
    this.sendStop();
    this.sendStop = null;
  }
};

module.exports = BufferedSender;

}).call(this,{ env: {} })

},{"debug":55,"events":3,"inherits":57}],26:[function(require,module,exports){
(function (global){
'use strict';

var inherits = require('inherits')
  , IframeTransport = require('../iframe')
  , objectUtils = require('../../utils/object')
  ;

module.exports = function(transport) {

  function IframeWrapTransport(transUrl, baseUrl) {
    IframeTransport.call(this, transport.transportName, transUrl, baseUrl);
  }

  inherits(IframeWrapTransport, IframeTransport);

  IframeWrapTransport.enabled = function(url, info) {
    if (!global.document) {
      return false;
    }

    var iframeInfo = objectUtils.extend({}, info);
    iframeInfo.sameOrigin = true;
    return transport.enabled(iframeInfo) && IframeTransport.enabled();
  };

  IframeWrapTransport.transportName = 'iframe-' + transport.transportName;
  IframeWrapTransport.needBody = true;
  IframeWrapTransport.roundTrips = IframeTransport.roundTrips + transport.roundTrips - 1; // html, javascript (2) + transport - no CORS (1)

  IframeWrapTransport.facadeTransport = transport;

  return IframeWrapTransport;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../../utils/object":49,"../iframe":22,"inherits":57}],27:[function(require,module,exports){
(function (process){
'use strict';

var inherits = require('inherits')
  , EventEmitter = require('events').EventEmitter
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:polling');
}

function Polling(Receiver, receiveUrl, AjaxObject) {
  debug(receiveUrl);
  EventEmitter.call(this);
  this.Receiver = Receiver;
  this.receiveUrl = receiveUrl;
  this.AjaxObject = AjaxObject;
  this._scheduleReceiver();
}

inherits(Polling, EventEmitter);

Polling.prototype._scheduleReceiver = function() {
  debug('_scheduleReceiver');
  var self = this;
  var poll = this.poll = new this.Receiver(this.receiveUrl, this.AjaxObject);

  poll.on('message', function(msg) {
    debug('message', msg);
    self.emit('message', msg);
  });

  poll.once('close', function(code, reason) {
    debug('close', code, reason, self.pollIsClosing);
    self.poll = poll = null;

    if (!self.pollIsClosing) {
      if (reason === 'network') {
        self._scheduleReceiver();
      } else {
        self.emit('close', code || 1006, reason);
        self.removeAllListeners();
      }
    }
  });
};

Polling.prototype.abort = function() {
  debug('abort');
  this.removeAllListeners();
  this.pollIsClosing = true;
  if (this.poll) {
    this.poll.abort();
  }
};

module.exports = Polling;

}).call(this,{ env: {} })

},{"debug":55,"events":3,"inherits":57}],28:[function(require,module,exports){
(function (process){
'use strict';

var inherits = require('inherits')
  , urlUtils = require('../../utils/url')
  , BufferedSender = require('./buffered-sender')
  , Polling = require('./polling')
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:sender-receiver');
}

function SenderReceiver(transUrl, urlSuffix, senderFunc, Receiver, AjaxObject) {
  var pollUrl = urlUtils.addPath(transUrl, urlSuffix);
  debug(pollUrl);
  var self = this;
  BufferedSender.call(this, transUrl, senderFunc);

  this.poll = new Polling(Receiver, pollUrl, AjaxObject);
  this.poll.on('message', function(msg) {
    debug('poll message', msg);
    self.emit('message', msg);
  });
  this.poll.once('close', function(code, reason) {
    debug('poll close', code, reason);
    self.poll = null;
    self.emit('close', code, reason);
    self.close();
  });
}

inherits(SenderReceiver, BufferedSender);

SenderReceiver.prototype.close = function() {
  BufferedSender.prototype.close.call(this);
  debug('close');
  this.removeAllListeners();
  if (this.poll) {
    this.poll.abort();
    this.poll = null;
  }
};

module.exports = SenderReceiver;

}).call(this,{ env: {} })

},{"../../utils/url":52,"./buffered-sender":25,"./polling":27,"debug":55,"inherits":57}],29:[function(require,module,exports){
(function (process){
'use strict';

var inherits = require('inherits')
  , EventEmitter = require('events').EventEmitter
  , EventSourceDriver = require('eventsource')
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:receiver:eventsource');
}

function EventSourceReceiver(url) {
  debug(url);
  EventEmitter.call(this);

  var self = this;
  var es = this.es = new EventSourceDriver(url);
  es.onmessage = function(e) {
    debug('message', e.data);
    self.emit('message', decodeURI(e.data));
  };
  es.onerror = function(e) {
    debug('error', es.readyState, e);
    // ES on reconnection has readyState = 0 or 1.
    // on network error it's CLOSED = 2
    var reason = (es.readyState !== 2 ? 'network' : 'permanent');
    self._cleanup();
    self._close(reason);
  };
}

inherits(EventSourceReceiver, EventEmitter);

EventSourceReceiver.prototype.abort = function() {
  debug('abort');
  this._cleanup();
  this._close('user');
};

EventSourceReceiver.prototype._cleanup = function() {
  debug('cleanup');
  var es = this.es;
  if (es) {
    es.onmessage = es.onerror = null;
    es.close();
    this.es = null;
  }
};

EventSourceReceiver.prototype._close = function(reason) {
  debug('close', reason);
  var self = this;
  // Safari and chrome < 15 crash if we close window before
  // waiting for ES cleanup. See:
  // https://code.google.com/p/chromium/issues/detail?id=89155
  setTimeout(function() {
    self.emit('close', null, reason);
    self.removeAllListeners();
  }, 200);
};

module.exports = EventSourceReceiver;

}).call(this,{ env: {} })

},{"debug":55,"events":3,"eventsource":18,"inherits":57}],30:[function(require,module,exports){
(function (process,global){
'use strict';

var inherits = require('inherits')
  , iframeUtils = require('../../utils/iframe')
  , urlUtils = require('../../utils/url')
  , EventEmitter = require('events').EventEmitter
  , random = require('../../utils/random')
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:receiver:htmlfile');
}

function HtmlfileReceiver(url) {
  debug(url);
  EventEmitter.call(this);
  var self = this;
  iframeUtils.polluteGlobalNamespace();

  this.id = 'a' + random.string(6);
  url = urlUtils.addQuery(url, 'c=' + decodeURIComponent(iframeUtils.WPrefix + '.' + this.id));

  debug('using htmlfile', HtmlfileReceiver.htmlfileEnabled);
  var constructFunc = HtmlfileReceiver.htmlfileEnabled ?
      iframeUtils.createHtmlfile : iframeUtils.createIframe;

  global[iframeUtils.WPrefix][this.id] = {
    start: function() {
      debug('start');
      self.iframeObj.loaded();
    }
  , message: function(data) {
      debug('message', data);
      self.emit('message', data);
    }
  , stop: function() {
      debug('stop');
      self._cleanup();
      self._close('network');
    }
  };
  this.iframeObj = constructFunc(url, function() {
    debug('callback');
    self._cleanup();
    self._close('permanent');
  });
}

inherits(HtmlfileReceiver, EventEmitter);

HtmlfileReceiver.prototype.abort = function() {
  debug('abort');
  this._cleanup();
  this._close('user');
};

HtmlfileReceiver.prototype._cleanup = function() {
  debug('_cleanup');
  if (this.iframeObj) {
    this.iframeObj.cleanup();
    this.iframeObj = null;
  }
  delete global[iframeUtils.WPrefix][this.id];
};

HtmlfileReceiver.prototype._close = function(reason) {
  debug('_close', reason);
  this.emit('close', null, reason);
  this.removeAllListeners();
};

HtmlfileReceiver.htmlfileEnabled = false;

// obfuscate to avoid firewalls
var axo = ['Active'].concat('Object').join('X');
if (axo in global) {
  try {
    HtmlfileReceiver.htmlfileEnabled = !!new global[axo]('htmlfile');
  } catch (x) {
    // intentionally empty
  }
}

HtmlfileReceiver.enabled = HtmlfileReceiver.htmlfileEnabled || iframeUtils.iframeEnabled;

module.exports = HtmlfileReceiver;

}).call(this,{ env: {} },typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../../utils/iframe":47,"../../utils/random":50,"../../utils/url":52,"debug":55,"events":3,"inherits":57}],31:[function(require,module,exports){
(function (process,global){
'use strict';

var utils = require('../../utils/iframe')
  , random = require('../../utils/random')
  , browser = require('../../utils/browser')
  , urlUtils = require('../../utils/url')
  , inherits = require('inherits')
  , EventEmitter = require('events').EventEmitter
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:receiver:jsonp');
}

function JsonpReceiver(url) {
  debug(url);
  var self = this;
  EventEmitter.call(this);

  utils.polluteGlobalNamespace();

  this.id = 'a' + random.string(6);
  var urlWithId = urlUtils.addQuery(url, 'c=' + encodeURIComponent(utils.WPrefix + '.' + this.id));

  global[utils.WPrefix][this.id] = this._callback.bind(this);
  this._createScript(urlWithId);

  // Fallback mostly for Konqueror - stupid timer, 35 seconds shall be plenty.
  this.timeoutId = setTimeout(function() {
    debug('timeout');
    self._abort(new Error('JSONP script loaded abnormally (timeout)'));
  }, JsonpReceiver.timeout);
}

inherits(JsonpReceiver, EventEmitter);

JsonpReceiver.prototype.abort = function() {
  debug('abort');
  if (global[utils.WPrefix][this.id]) {
    var err = new Error('JSONP user aborted read');
    err.code = 1000;
    this._abort(err);
  }
};

JsonpReceiver.timeout = 35000;
JsonpReceiver.scriptErrorTimeout = 1000;

JsonpReceiver.prototype._callback = function(data) {
  debug('_callback', data);
  this._cleanup();

  if (this.aborting) {
    return;
  }

  if (data) {
    debug('message', data);
    this.emit('message', data);
  }
  this.emit('close', null, 'network');
  this.removeAllListeners();
};

JsonpReceiver.prototype._abort = function(err) {
  debug('_abort', err);
  this._cleanup();
  this.aborting = true;
  this.emit('close', err.code, err.message);
  this.removeAllListeners();
};

JsonpReceiver.prototype._cleanup = function() {
  debug('_cleanup');
  clearTimeout(this.timeoutId);
  if (this.script2) {
    this.script2.parentNode.removeChild(this.script2);
    this.script2 = null;
  }
  if (this.script) {
    var script = this.script;
    // Unfortunately, you can't really abort script loading of
    // the script.
    script.parentNode.removeChild(script);
    script.onreadystatechange = script.onerror =
        script.onload = script.onclick = null;
    this.script = null;
  }
  delete global[utils.WPrefix][this.id];
};

JsonpReceiver.prototype._scriptError = function() {
  debug('_scriptError');
  var self = this;
  if (this.errorTimer) {
    return;
  }

  this.errorTimer = setTimeout(function() {
    if (!self.loadedOkay) {
      self._abort(new Error('JSONP script loaded abnormally (onerror)'));
    }
  }, JsonpReceiver.scriptErrorTimeout);
};

JsonpReceiver.prototype._createScript = function(url) {
  debug('_createScript', url);
  var self = this;
  var script = this.script = global.document.createElement('script');
  var script2;  // Opera synchronous load trick.

  script.id = 'a' + random.string(8);
  script.src = url;
  script.type = 'text/javascript';
  script.charset = 'UTF-8';
  script.onerror = this._scriptError.bind(this);
  script.onload = function() {
    debug('onload');
    self._abort(new Error('JSONP script loaded abnormally (onload)'));
  };

  // IE9 fires 'error' event after onreadystatechange or before, in random order.
  // Use loadedOkay to determine if actually errored
  script.onreadystatechange = function() {
    debug('onreadystatechange', script.readyState);
    if (/loaded|closed/.test(script.readyState)) {
      if (script && script.htmlFor && script.onclick) {
        self.loadedOkay = true;
        try {
          // In IE, actually execute the script.
          script.onclick();
        } catch (x) {
          // intentionally empty
        }
      }
      if (script) {
        self._abort(new Error('JSONP script loaded abnormally (onreadystatechange)'));
      }
    }
  };
  // IE: event/htmlFor/onclick trick.
  // One can't rely on proper order for onreadystatechange. In order to
  // make sure, set a 'htmlFor' and 'event' properties, so that
  // script code will be installed as 'onclick' handler for the
  // script object. Later, onreadystatechange, manually execute this
  // code. FF and Chrome doesn't work with 'event' and 'htmlFor'
  // set. For reference see:
  //   http://jaubourg.net/2010/07/loading-script-as-onclick-handler-of.html
  // Also, read on that about script ordering:
  //   http://wiki.whatwg.org/wiki/Dynamic_Script_Execution_Order
  if (typeof script.async === 'undefined' && global.document.attachEvent) {
    // According to mozilla docs, in recent browsers script.async defaults
    // to 'true', so we may use it to detect a good browser:
    // https://developer.mozilla.org/en/HTML/Element/script
    if (!browser.isOpera()) {
      // Naively assume we're in IE
      try {
        script.htmlFor = script.id;
        script.event = 'onclick';
      } catch (x) {
        // intentionally empty
      }
      script.async = true;
    } else {
      // Opera, second sync script hack
      script2 = this.script2 = global.document.createElement('script');
      script2.text = "try{var a = document.getElementById('" + script.id + "'); if(a)a.onerror();}catch(x){};";
      script.async = script2.async = false;
    }
  }
  if (typeof script.async !== 'undefined') {
    script.async = true;
  }

  var head = global.document.getElementsByTagName('head')[0];
  head.insertBefore(script, head.firstChild);
  if (script2) {
    head.insertBefore(script2, head.firstChild);
  }
};

module.exports = JsonpReceiver;

}).call(this,{ env: {} },typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../../utils/browser":44,"../../utils/iframe":47,"../../utils/random":50,"../../utils/url":52,"debug":55,"events":3,"inherits":57}],32:[function(require,module,exports){
(function (process){
'use strict';

var inherits = require('inherits')
  , EventEmitter = require('events').EventEmitter
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:receiver:xhr');
}

function XhrReceiver(url, AjaxObject) {
  debug(url);
  EventEmitter.call(this);
  var self = this;

  this.bufferPosition = 0;

  this.xo = new AjaxObject('POST', url, null);
  this.xo.on('chunk', this._chunkHandler.bind(this));
  this.xo.once('finish', function(status, text) {
    debug('finish', status, text);
    self._chunkHandler(status, text);
    self.xo = null;
    var reason = status === 200 ? 'network' : 'permanent';
    debug('close', reason);
    self.emit('close', null, reason);
    self._cleanup();
  });
}

inherits(XhrReceiver, EventEmitter);

XhrReceiver.prototype._chunkHandler = function(status, text) {
  debug('_chunkHandler', status);
  if (status !== 200 || !text) {
    return;
  }

  for (var idx = -1; ; this.bufferPosition += idx + 1) {
    var buf = text.slice(this.bufferPosition);
    idx = buf.indexOf('\n');
    if (idx === -1) {
      break;
    }
    var msg = buf.slice(0, idx);
    if (msg) {
      debug('message', msg);
      this.emit('message', msg);
    }
  }
};

XhrReceiver.prototype._cleanup = function() {
  debug('_cleanup');
  this.removeAllListeners();
};

XhrReceiver.prototype.abort = function() {
  debug('abort');
  if (this.xo) {
    this.xo.close();
    debug('close');
    this.emit('close', null, 'user');
    this.xo = null;
  }
  this._cleanup();
};

module.exports = XhrReceiver;

}).call(this,{ env: {} })

},{"debug":55,"events":3,"inherits":57}],33:[function(require,module,exports){
(function (process,global){
'use strict';

var random = require('../../utils/random')
  , urlUtils = require('../../utils/url')
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:sender:jsonp');
}

var form, area;

function createIframe(id) {
  debug('createIframe', id);
  try {
    // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
    return global.document.createElement('<iframe name="' + id + '">');
  } catch (x) {
    var iframe = global.document.createElement('iframe');
    iframe.name = id;
    return iframe;
  }
}

function createForm() {
  debug('createForm');
  form = global.document.createElement('form');
  form.style.display = 'none';
  form.style.position = 'absolute';
  form.method = 'POST';
  form.enctype = 'application/x-www-form-urlencoded';
  form.acceptCharset = 'UTF-8';

  area = global.document.createElement('textarea');
  area.name = 'd';
  form.appendChild(area);

  global.document.body.appendChild(form);
}

module.exports = function(url, payload, callback) {
  debug(url, payload);
  if (!form) {
    createForm();
  }
  var id = 'a' + random.string(8);
  form.target = id;
  form.action = urlUtils.addQuery(urlUtils.addPath(url, '/jsonp_send'), 'i=' + id);

  var iframe = createIframe(id);
  iframe.id = id;
  iframe.style.display = 'none';
  form.appendChild(iframe);

  try {
    area.value = payload;
  } catch (e) {
    // seriously broken browsers get here
  }
  form.submit();

  var completed = function(err) {
    debug('completed', id, err);
    if (!iframe.onerror) {
      return;
    }
    iframe.onreadystatechange = iframe.onerror = iframe.onload = null;
    // Opera mini doesn't like if we GC iframe
    // immediately, thus this timeout.
    setTimeout(function() {
      debug('cleaning up', id);
      iframe.parentNode.removeChild(iframe);
      iframe = null;
    }, 500);
    area.value = '';
    // It is not possible to detect if the iframe succeeded or
    // failed to submit our form.
    callback(err);
  };
  iframe.onerror = function() {
    debug('onerror', id);
    completed();
  };
  iframe.onload = function() {
    debug('onload', id);
    completed();
  };
  iframe.onreadystatechange = function(e) {
    debug('onreadystatechange', id, iframe.readyState, e);
    if (iframe.readyState === 'complete') {
      completed();
    }
  };
  return function() {
    debug('aborted', id);
    completed(new Error('Aborted'));
  };
};

}).call(this,{ env: {} },typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../../utils/random":50,"../../utils/url":52,"debug":55}],34:[function(require,module,exports){
(function (process,global){
'use strict';

var EventEmitter = require('events').EventEmitter
  , inherits = require('inherits')
  , eventUtils = require('../../utils/event')
  , browser = require('../../utils/browser')
  , urlUtils = require('../../utils/url')
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:sender:xdr');
}

// References:
//   http://ajaxian.com/archives/100-line-ajax-wrapper
//   http://msdn.microsoft.com/en-us/library/cc288060(v=VS.85).aspx

function XDRObject(method, url, payload) {
  debug(method, url);
  var self = this;
  EventEmitter.call(this);

  setTimeout(function() {
    self._start(method, url, payload);
  }, 0);
}

inherits(XDRObject, EventEmitter);

XDRObject.prototype._start = function(method, url, payload) {
  debug('_start');
  var self = this;
  var xdr = new global.XDomainRequest();
  // IE caches even POSTs
  url = urlUtils.addQuery(url, 't=' + (+new Date()));

  xdr.onerror = function() {
    debug('onerror');
    self._error();
  };
  xdr.ontimeout = function() {
    debug('ontimeout');
    self._error();
  };
  xdr.onprogress = function() {
    debug('progress', xdr.responseText);
    self.emit('chunk', 200, xdr.responseText);
  };
  xdr.onload = function() {
    debug('load');
    self.emit('finish', 200, xdr.responseText);
    self._cleanup(false);
  };
  this.xdr = xdr;
  this.unloadRef = eventUtils.unloadAdd(function() {
    self._cleanup(true);
  });
  try {
    // Fails with AccessDenied if port number is bogus
    this.xdr.open(method, url);
    if (this.timeout) {
      this.xdr.timeout = this.timeout;
    }
    this.xdr.send(payload);
  } catch (x) {
    this._error();
  }
};

XDRObject.prototype._error = function() {
  this.emit('finish', 0, '');
  this._cleanup(false);
};

XDRObject.prototype._cleanup = function(abort) {
  debug('cleanup', abort);
  if (!this.xdr) {
    return;
  }
  this.removeAllListeners();
  eventUtils.unloadDel(this.unloadRef);

  this.xdr.ontimeout = this.xdr.onerror = this.xdr.onprogress = this.xdr.onload = null;
  if (abort) {
    try {
      this.xdr.abort();
    } catch (x) {
      // intentionally empty
    }
  }
  this.unloadRef = this.xdr = null;
};

XDRObject.prototype.close = function() {
  debug('close');
  this._cleanup(true);
};

// IE 8/9 if the request target uses the same scheme - #79
XDRObject.enabled = !!(global.XDomainRequest && browser.hasDomain());

module.exports = XDRObject;

}).call(this,{ env: {} },typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../../utils/browser":44,"../../utils/event":46,"../../utils/url":52,"debug":55,"events":3,"inherits":57}],35:[function(require,module,exports){
'use strict';

var inherits = require('inherits')
  , XhrDriver = require('../driver/xhr')
  ;

function XHRCorsObject(method, url, payload, opts) {
  XhrDriver.call(this, method, url, payload, opts);
}

inherits(XHRCorsObject, XhrDriver);

XHRCorsObject.enabled = XhrDriver.enabled && XhrDriver.supportsCORS;

module.exports = XHRCorsObject;

},{"../driver/xhr":17,"inherits":57}],36:[function(require,module,exports){
'use strict';

var EventEmitter = require('events').EventEmitter
  , inherits = require('inherits')
  ;

function XHRFake(/* method, url, payload, opts */) {
  var self = this;
  EventEmitter.call(this);

  this.to = setTimeout(function() {
    self.emit('finish', 200, '{}');
  }, XHRFake.timeout);
}

inherits(XHRFake, EventEmitter);

XHRFake.prototype.close = function() {
  clearTimeout(this.to);
};

XHRFake.timeout = 2000;

module.exports = XHRFake;

},{"events":3,"inherits":57}],37:[function(require,module,exports){
'use strict';

var inherits = require('inherits')
  , XhrDriver = require('../driver/xhr')
  ;

function XHRLocalObject(method, url, payload /*, opts */) {
  XhrDriver.call(this, method, url, payload, {
    noCredentials: true
  });
}

inherits(XHRLocalObject, XhrDriver);

XHRLocalObject.enabled = XhrDriver.enabled;

module.exports = XHRLocalObject;

},{"../driver/xhr":17,"inherits":57}],38:[function(require,module,exports){
(function (process){
'use strict';

var utils = require('../utils/event')
  , urlUtils = require('../utils/url')
  , inherits = require('inherits')
  , EventEmitter = require('events').EventEmitter
  , WebsocketDriver = require('./driver/websocket')
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:websocket');
}

function WebSocketTransport(transUrl, ignore, options) {
  if (!WebSocketTransport.enabled()) {
    throw new Error('Transport created when disabled');
  }

  EventEmitter.call(this);
  debug('constructor', transUrl);

  var self = this;
  var url = urlUtils.addPath(transUrl, '/websocket');
  if (url.slice(0, 5) === 'https') {
    url = 'wss' + url.slice(5);
  } else {
    url = 'ws' + url.slice(4);
  }
  this.url = url;

  this.ws = new WebsocketDriver(this.url, [], options);
  this.ws.onmessage = function(e) {
    debug('message event', e.data);
    self.emit('message', e.data);
  };
  // Firefox has an interesting bug. If a websocket connection is
  // created after onunload, it stays alive even when user
  // navigates away from the page. In such situation let's lie -
  // let's not open the ws connection at all. See:
  // https://github.com/sockjs/sockjs-client/issues/28
  // https://bugzilla.mozilla.org/show_bug.cgi?id=696085
  this.unloadRef = utils.unloadAdd(function() {
    debug('unload');
    self.ws.close();
  });
  this.ws.onclose = function(e) {
    debug('close event', e.code, e.reason);
    self.emit('close', e.code, e.reason);
    self._cleanup();
  };
  this.ws.onerror = function(e) {
    debug('error event', e);
    self.emit('close', 1006, 'WebSocket connection broken');
    self._cleanup();
  };
}

inherits(WebSocketTransport, EventEmitter);

WebSocketTransport.prototype.send = function(data) {
  var msg = '[' + data + ']';
  debug('send', msg);
  this.ws.send(msg);
};

WebSocketTransport.prototype.close = function() {
  debug('close');
  var ws = this.ws;
  this._cleanup();
  if (ws) {
    ws.close();
  }
};

WebSocketTransport.prototype._cleanup = function() {
  debug('_cleanup');
  var ws = this.ws;
  if (ws) {
    ws.onmessage = ws.onclose = ws.onerror = null;
  }
  utils.unloadDel(this.unloadRef);
  this.unloadRef = this.ws = null;
  this.removeAllListeners();
};

WebSocketTransport.enabled = function() {
  debug('enabled');
  return !!WebsocketDriver;
};
WebSocketTransport.transportName = 'websocket';

// In theory, ws should require 1 round trip. But in chrome, this is
// not very stable over SSL. Most likely a ws connection requires a
// separate SSL connection, in which case 2 round trips are an
// absolute minumum.
WebSocketTransport.roundTrips = 2;

module.exports = WebSocketTransport;

}).call(this,{ env: {} })

},{"../utils/event":46,"../utils/url":52,"./driver/websocket":19,"debug":55,"events":3,"inherits":57}],39:[function(require,module,exports){
'use strict';

var inherits = require('inherits')
  , AjaxBasedTransport = require('./lib/ajax-based')
  , XdrStreamingTransport = require('./xdr-streaming')
  , XhrReceiver = require('./receiver/xhr')
  , XDRObject = require('./sender/xdr')
  ;

function XdrPollingTransport(transUrl) {
  if (!XDRObject.enabled) {
    throw new Error('Transport created when disabled');
  }
  AjaxBasedTransport.call(this, transUrl, '/xhr', XhrReceiver, XDRObject);
}

inherits(XdrPollingTransport, AjaxBasedTransport);

XdrPollingTransport.enabled = XdrStreamingTransport.enabled;
XdrPollingTransport.transportName = 'xdr-polling';
XdrPollingTransport.roundTrips = 2; // preflight, ajax

module.exports = XdrPollingTransport;

},{"./lib/ajax-based":24,"./receiver/xhr":32,"./sender/xdr":34,"./xdr-streaming":40,"inherits":57}],40:[function(require,module,exports){
'use strict';

var inherits = require('inherits')
  , AjaxBasedTransport = require('./lib/ajax-based')
  , XhrReceiver = require('./receiver/xhr')
  , XDRObject = require('./sender/xdr')
  ;

// According to:
//   http://stackoverflow.com/questions/1641507/detect-browser-support-for-cross-domain-xmlhttprequests
//   http://hacks.mozilla.org/2009/07/cross-site-xmlhttprequest-with-cors/

function XdrStreamingTransport(transUrl) {
  if (!XDRObject.enabled) {
    throw new Error('Transport created when disabled');
  }
  AjaxBasedTransport.call(this, transUrl, '/xhr_streaming', XhrReceiver, XDRObject);
}

inherits(XdrStreamingTransport, AjaxBasedTransport);

XdrStreamingTransport.enabled = function(info) {
  if (info.cookie_needed || info.nullOrigin) {
    return false;
  }
  return XDRObject.enabled && info.sameScheme;
};

XdrStreamingTransport.transportName = 'xdr-streaming';
XdrStreamingTransport.roundTrips = 2; // preflight, ajax

module.exports = XdrStreamingTransport;

},{"./lib/ajax-based":24,"./receiver/xhr":32,"./sender/xdr":34,"inherits":57}],41:[function(require,module,exports){
'use strict';

var inherits = require('inherits')
  , AjaxBasedTransport = require('./lib/ajax-based')
  , XhrReceiver = require('./receiver/xhr')
  , XHRCorsObject = require('./sender/xhr-cors')
  , XHRLocalObject = require('./sender/xhr-local')
  ;

function XhrPollingTransport(transUrl) {
  if (!XHRLocalObject.enabled && !XHRCorsObject.enabled) {
    throw new Error('Transport created when disabled');
  }
  AjaxBasedTransport.call(this, transUrl, '/xhr', XhrReceiver, XHRCorsObject);
}

inherits(XhrPollingTransport, AjaxBasedTransport);

XhrPollingTransport.enabled = function(info) {
  if (info.nullOrigin) {
    return false;
  }

  if (XHRLocalObject.enabled && info.sameOrigin) {
    return true;
  }
  return XHRCorsObject.enabled;
};

XhrPollingTransport.transportName = 'xhr-polling';
XhrPollingTransport.roundTrips = 2; // preflight, ajax

module.exports = XhrPollingTransport;

},{"./lib/ajax-based":24,"./receiver/xhr":32,"./sender/xhr-cors":35,"./sender/xhr-local":37,"inherits":57}],42:[function(require,module,exports){
(function (global){
'use strict';

var inherits = require('inherits')
  , AjaxBasedTransport = require('./lib/ajax-based')
  , XhrReceiver = require('./receiver/xhr')
  , XHRCorsObject = require('./sender/xhr-cors')
  , XHRLocalObject = require('./sender/xhr-local')
  , browser = require('../utils/browser')
  ;

function XhrStreamingTransport(transUrl) {
  if (!XHRLocalObject.enabled && !XHRCorsObject.enabled) {
    throw new Error('Transport created when disabled');
  }
  AjaxBasedTransport.call(this, transUrl, '/xhr_streaming', XhrReceiver, XHRCorsObject);
}

inherits(XhrStreamingTransport, AjaxBasedTransport);

XhrStreamingTransport.enabled = function(info) {
  if (info.nullOrigin) {
    return false;
  }
  // Opera doesn't support xhr-streaming #60
  // But it might be able to #92
  if (browser.isOpera()) {
    return false;
  }

  return XHRCorsObject.enabled;
};

XhrStreamingTransport.transportName = 'xhr-streaming';
XhrStreamingTransport.roundTrips = 2; // preflight, ajax

// Safari gets confused when a streaming ajax request is started
// before onload. This causes the load indicator to spin indefinetely.
// Only require body when used in a browser
XhrStreamingTransport.needBody = !!global.document;

module.exports = XhrStreamingTransport;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../utils/browser":44,"./lib/ajax-based":24,"./receiver/xhr":32,"./sender/xhr-cors":35,"./sender/xhr-local":37,"inherits":57}],43:[function(require,module,exports){
(function (global){
'use strict';

if (global.crypto && global.crypto.getRandomValues) {
  module.exports.randomBytes = function(length) {
    var bytes = new Uint8Array(length);
    global.crypto.getRandomValues(bytes);
    return bytes;
  };
} else {
  module.exports.randomBytes = function(length) {
    var bytes = new Array(length);
    for (var i = 0; i < length; i++) {
      bytes[i] = Math.floor(Math.random() * 256);
    }
    return bytes;
  };
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],44:[function(require,module,exports){
(function (global){
'use strict';

module.exports = {
  isOpera: function() {
    return global.navigator &&
      /opera/i.test(global.navigator.userAgent);
  }

, isKonqueror: function() {
    return global.navigator &&
      /konqueror/i.test(global.navigator.userAgent);
  }

  // #187 wrap document.domain in try/catch because of WP8 from file:///
, hasDomain: function () {
    // non-browser client always has a domain
    if (!global.document) {
      return true;
    }

    try {
      return !!global.document.domain;
    } catch (e) {
      return false;
    }
  }
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],45:[function(require,module,exports){
'use strict';

var JSON3 = require('json3');

// Some extra characters that Chrome gets wrong, and substitutes with
// something else on the wire.
// eslint-disable-next-line no-control-regex
var extraEscapable = /[\x00-\x1f\ud800-\udfff\ufffe\uffff\u0300-\u0333\u033d-\u0346\u034a-\u034c\u0350-\u0352\u0357-\u0358\u035c-\u0362\u0374\u037e\u0387\u0591-\u05af\u05c4\u0610-\u0617\u0653-\u0654\u0657-\u065b\u065d-\u065e\u06df-\u06e2\u06eb-\u06ec\u0730\u0732-\u0733\u0735-\u0736\u073a\u073d\u073f-\u0741\u0743\u0745\u0747\u07eb-\u07f1\u0951\u0958-\u095f\u09dc-\u09dd\u09df\u0a33\u0a36\u0a59-\u0a5b\u0a5e\u0b5c-\u0b5d\u0e38-\u0e39\u0f43\u0f4d\u0f52\u0f57\u0f5c\u0f69\u0f72-\u0f76\u0f78\u0f80-\u0f83\u0f93\u0f9d\u0fa2\u0fa7\u0fac\u0fb9\u1939-\u193a\u1a17\u1b6b\u1cda-\u1cdb\u1dc0-\u1dcf\u1dfc\u1dfe\u1f71\u1f73\u1f75\u1f77\u1f79\u1f7b\u1f7d\u1fbb\u1fbe\u1fc9\u1fcb\u1fd3\u1fdb\u1fe3\u1feb\u1fee-\u1fef\u1ff9\u1ffb\u1ffd\u2000-\u2001\u20d0-\u20d1\u20d4-\u20d7\u20e7-\u20e9\u2126\u212a-\u212b\u2329-\u232a\u2adc\u302b-\u302c\uaab2-\uaab3\uf900-\ufa0d\ufa10\ufa12\ufa15-\ufa1e\ufa20\ufa22\ufa25-\ufa26\ufa2a-\ufa2d\ufa30-\ufa6d\ufa70-\ufad9\ufb1d\ufb1f\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40-\ufb41\ufb43-\ufb44\ufb46-\ufb4e\ufff0-\uffff]/g
  , extraLookup;

// This may be quite slow, so let's delay until user actually uses bad
// characters.
var unrollLookup = function(escapable) {
  var i;
  var unrolled = {};
  var c = [];
  for (i = 0; i < 65536; i++) {
    c.push( String.fromCharCode(i) );
  }
  escapable.lastIndex = 0;
  c.join('').replace(escapable, function(a) {
    unrolled[ a ] = '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
    return '';
  });
  escapable.lastIndex = 0;
  return unrolled;
};

// Quote string, also taking care of unicode characters that browsers
// often break. Especially, take care of unicode surrogates:
// http://en.wikipedia.org/wiki/Mapping_of_Unicode_characters#Surrogates
module.exports = {
  quote: function(string) {
    var quoted = JSON3.stringify(string);

    // In most cases this should be very fast and good enough.
    extraEscapable.lastIndex = 0;
    if (!extraEscapable.test(quoted)) {
      return quoted;
    }

    if (!extraLookup) {
      extraLookup = unrollLookup(extraEscapable);
    }

    return quoted.replace(extraEscapable, function(a) {
      return extraLookup[a];
    });
  }
};

},{"json3":58}],46:[function(require,module,exports){
(function (global){
'use strict';

var random = require('./random');

var onUnload = {}
  , afterUnload = false
    // detect google chrome packaged apps because they don't allow the 'unload' event
  , isChromePackagedApp = global.chrome && global.chrome.app && global.chrome.app.runtime
  ;

module.exports = {
  attachEvent: function(event, listener) {
    if (typeof global.addEventListener !== 'undefined') {
      global.addEventListener(event, listener, false);
    } else if (global.document && global.attachEvent) {
      // IE quirks.
      // According to: http://stevesouders.com/misc/test-postmessage.php
      // the message gets delivered only to 'document', not 'window'.
      global.document.attachEvent('on' + event, listener);
      // I get 'window' for ie8.
      global.attachEvent('on' + event, listener);
    }
  }

, detachEvent: function(event, listener) {
    if (typeof global.addEventListener !== 'undefined') {
      global.removeEventListener(event, listener, false);
    } else if (global.document && global.detachEvent) {
      global.document.detachEvent('on' + event, listener);
      global.detachEvent('on' + event, listener);
    }
  }

, unloadAdd: function(listener) {
    if (isChromePackagedApp) {
      return null;
    }

    var ref = random.string(8);
    onUnload[ref] = listener;
    if (afterUnload) {
      setTimeout(this.triggerUnloadCallbacks, 0);
    }
    return ref;
  }

, unloadDel: function(ref) {
    if (ref in onUnload) {
      delete onUnload[ref];
    }
  }

, triggerUnloadCallbacks: function() {
    for (var ref in onUnload) {
      onUnload[ref]();
      delete onUnload[ref];
    }
  }
};

var unloadTriggered = function() {
  if (afterUnload) {
    return;
  }
  afterUnload = true;
  module.exports.triggerUnloadCallbacks();
};

// 'unload' alone is not reliable in opera within an iframe, but we
// can't use `beforeunload` as IE fires it on javascript: links.
if (!isChromePackagedApp) {
  module.exports.attachEvent('unload', unloadTriggered);
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./random":50}],47:[function(require,module,exports){
(function (process,global){
'use strict';

var eventUtils = require('./event')
  , JSON3 = require('json3')
  , browser = require('./browser')
  ;

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:utils:iframe');
}

module.exports = {
  WPrefix: '_jp'
, currentWindowId: null

, polluteGlobalNamespace: function() {
    if (!(module.exports.WPrefix in global)) {
      global[module.exports.WPrefix] = {};
    }
  }

, postMessage: function(type, data) {
    if (global.parent !== global) {
      global.parent.postMessage(JSON3.stringify({
        windowId: module.exports.currentWindowId
      , type: type
      , data: data || ''
      }), '*');
    } else {
      debug('Cannot postMessage, no parent window.', type, data);
    }
  }

, createIframe: function(iframeUrl, errorCallback) {
    var iframe = global.document.createElement('iframe');
    var tref, unloadRef;
    var unattach = function() {
      debug('unattach');
      clearTimeout(tref);
      // Explorer had problems with that.
      try {
        iframe.onload = null;
      } catch (x) {
        // intentionally empty
      }
      iframe.onerror = null;
    };
    var cleanup = function() {
      debug('cleanup');
      if (iframe) {
        unattach();
        // This timeout makes chrome fire onbeforeunload event
        // within iframe. Without the timeout it goes straight to
        // onunload.
        setTimeout(function() {
          if (iframe) {
            iframe.parentNode.removeChild(iframe);
          }
          iframe = null;
        }, 0);
        eventUtils.unloadDel(unloadRef);
      }
    };
    var onerror = function(err) {
      debug('onerror', err);
      if (iframe) {
        cleanup();
        errorCallback(err);
      }
    };
    var post = function(msg, origin) {
      debug('post', msg, origin);
      setTimeout(function() {
        try {
          // When the iframe is not loaded, IE raises an exception
          // on 'contentWindow'.
          if (iframe && iframe.contentWindow) {
            iframe.contentWindow.postMessage(msg, origin);
          }
        } catch (x) {
          // intentionally empty
        }
      }, 0);
    };

    iframe.src = iframeUrl;
    iframe.style.display = 'none';
    iframe.style.position = 'absolute';
    iframe.onerror = function() {
      onerror('onerror');
    };
    iframe.onload = function() {
      debug('onload');
      // `onload` is triggered before scripts on the iframe are
      // executed. Give it few seconds to actually load stuff.
      clearTimeout(tref);
      tref = setTimeout(function() {
        onerror('onload timeout');
      }, 2000);
    };
    global.document.body.appendChild(iframe);
    tref = setTimeout(function() {
      onerror('timeout');
    }, 15000);
    unloadRef = eventUtils.unloadAdd(cleanup);
    return {
      post: post
    , cleanup: cleanup
    , loaded: unattach
    };
  }

/* eslint no-undef: "off", new-cap: "off" */
, createHtmlfile: function(iframeUrl, errorCallback) {
    var axo = ['Active'].concat('Object').join('X');
    var doc = new global[axo]('htmlfile');
    var tref, unloadRef;
    var iframe;
    var unattach = function() {
      clearTimeout(tref);
      iframe.onerror = null;
    };
    var cleanup = function() {
      if (doc) {
        unattach();
        eventUtils.unloadDel(unloadRef);
        iframe.parentNode.removeChild(iframe);
        iframe = doc = null;
        CollectGarbage();
      }
    };
    var onerror = function(r) {
      debug('onerror', r);
      if (doc) {
        cleanup();
        errorCallback(r);
      }
    };
    var post = function(msg, origin) {
      try {
        // When the iframe is not loaded, IE raises an exception
        // on 'contentWindow'.
        setTimeout(function() {
          if (iframe && iframe.contentWindow) {
              iframe.contentWindow.postMessage(msg, origin);
          }
        }, 0);
      } catch (x) {
        // intentionally empty
      }
    };

    doc.open();
    doc.write('<html><s' + 'cript>' +
              'document.domain="' + global.document.domain + '";' +
              '</s' + 'cript></html>');
    doc.close();
    doc.parentWindow[module.exports.WPrefix] = global[module.exports.WPrefix];
    var c = doc.createElement('div');
    doc.body.appendChild(c);
    iframe = doc.createElement('iframe');
    c.appendChild(iframe);
    iframe.src = iframeUrl;
    iframe.onerror = function() {
      onerror('onerror');
    };
    tref = setTimeout(function() {
      onerror('timeout');
    }, 15000);
    unloadRef = eventUtils.unloadAdd(cleanup);
    return {
      post: post
    , cleanup: cleanup
    , loaded: unattach
    };
  }
};

module.exports.iframeEnabled = false;
if (global.document) {
  // postMessage misbehaves in konqueror 4.6.5 - the messages are delivered with
  // huge delay, or not at all.
  module.exports.iframeEnabled = (typeof global.postMessage === 'function' ||
    typeof global.postMessage === 'object') && (!browser.isKonqueror());
}

}).call(this,{ env: {} },typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./browser":44,"./event":46,"debug":55,"json3":58}],48:[function(require,module,exports){
(function (global){
'use strict';

var logObject = {};
['log', 'debug', 'warn'].forEach(function (level) {
  var levelExists;

  try {
    levelExists = global.console && global.console[level] && global.console[level].apply;
  } catch(e) {
    // do nothing
  }

  logObject[level] = levelExists ? function () {
    return global.console[level].apply(global.console, arguments);
  } : (level === 'log' ? function () {} : logObject.log);
});

module.exports = logObject;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],49:[function(require,module,exports){
'use strict';

module.exports = {
  isObject: function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  }

, extend: function(obj) {
    if (!this.isObject(obj)) {
      return obj;
    }
    var source, prop;
    for (var i = 1, length = arguments.length; i < length; i++) {
      source = arguments[i];
      for (prop in source) {
        if (Object.prototype.hasOwnProperty.call(source, prop)) {
          obj[prop] = source[prop];
        }
      }
    }
    return obj;
  }
};

},{}],50:[function(require,module,exports){
'use strict';

/* global crypto:true */
var crypto = require('crypto');

// This string has length 32, a power of 2, so the modulus doesn't introduce a
// bias.
var _randomStringChars = 'abcdefghijklmnopqrstuvwxyz012345';
module.exports = {
  string: function(length) {
    var max = _randomStringChars.length;
    var bytes = crypto.randomBytes(length);
    var ret = [];
    for (var i = 0; i < length; i++) {
      ret.push(_randomStringChars.substr(bytes[i] % max, 1));
    }
    return ret.join('');
  }

, number: function(max) {
    return Math.floor(Math.random() * max);
  }

, numberString: function(max) {
    var t = ('' + (max - 1)).length;
    var p = new Array(t + 1).join('0');
    return (p + this.number(max)).slice(-t);
  }
};

},{"crypto":43}],51:[function(require,module,exports){
(function (process){
'use strict';

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:utils:transport');
}

module.exports = function(availableTransports) {
  return {
    filterToEnabled: function(transportsWhitelist, info) {
      var transports = {
        main: []
      , facade: []
      };
      if (!transportsWhitelist) {
        transportsWhitelist = [];
      } else if (typeof transportsWhitelist === 'string') {
        transportsWhitelist = [transportsWhitelist];
      }

      availableTransports.forEach(function(trans) {
        if (!trans) {
          return;
        }

        if (trans.transportName === 'websocket' && info.websocket === false) {
          debug('disabled from server', 'websocket');
          return;
        }

        if (transportsWhitelist.length &&
            transportsWhitelist.indexOf(trans.transportName) === -1) {
          debug('not in whitelist', trans.transportName);
          return;
        }

        if (trans.enabled(info)) {
          debug('enabled', trans.transportName);
          transports.main.push(trans);
          if (trans.facadeTransport) {
            transports.facade.push(trans.facadeTransport);
          }
        } else {
          debug('disabled', trans.transportName);
        }
      });
      return transports;
    }
  };
};

}).call(this,{ env: {} })

},{"debug":55}],52:[function(require,module,exports){
(function (process){
'use strict';

var URL = require('url-parse');

var debug = function() {};
if (process.env.NODE_ENV !== 'production') {
  debug = require('debug')('sockjs-client:utils:url');
}

module.exports = {
  getOrigin: function(url) {
    if (!url) {
      return null;
    }

    var p = new URL(url);
    if (p.protocol === 'file:') {
      return null;
    }

    var port = p.port;
    if (!port) {
      port = (p.protocol === 'https:') ? '443' : '80';
    }

    return p.protocol + '//' + p.hostname + ':' + port;
  }

, isOriginEqual: function(a, b) {
    var res = this.getOrigin(a) === this.getOrigin(b);
    debug('same', a, b, res);
    return res;
  }

, isSchemeEqual: function(a, b) {
    return (a.split(':')[0] === b.split(':')[0]);
  }

, addPath: function (url, path) {
    var qs = url.split('?');
    return qs[0] + path + (qs[1] ? '?' + qs[1] : '');
  }

, addQuery: function (url, q) {
    return url + (url.indexOf('?') === -1 ? ('?' + q) : ('&' + q));
  }
};

}).call(this,{ env: {} })

},{"debug":55,"url-parse":61}],53:[function(require,module,exports){
module.exports = '1.3.0';

},{}],54:[function(require,module,exports){
/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^((?:\d+)?\-?\d?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'weeks':
    case 'week':
    case 'w':
      return n * w;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (msAbs >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (msAbs >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (msAbs >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'day');
  }
  if (msAbs >= h) {
    return plural(ms, msAbs, h, 'hour');
  }
  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'minute');
  }
  if (msAbs >= s) {
    return plural(ms, msAbs, s, 'second');
  }
  return ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}

},{}],55:[function(require,module,exports){
(function (process){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* eslint-env browser */

/**
 * This is the web browser implementation of `debug()`.
 */
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = localstorage();
/**
 * Colors.
 */

exports.colors = ['#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC', '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF', '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC', '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF', '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC', '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033', '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366', '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933', '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC', '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF', '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'];
/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */
// eslint-disable-next-line complexity

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
    return true;
  } // Internet Explorer and Edge do not support colors.


  if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
    return false;
  } // Is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632


  return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
  typeof window !== 'undefined' && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
  // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
}
/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */


function formatArgs(args) {
  args[0] = (this.useColors ? '%c' : '') + this.namespace + (this.useColors ? ' %c' : ' ') + args[0] + (this.useColors ? '%c ' : ' ') + '+' + module.exports.humanize(this.diff);

  if (!this.useColors) {
    return;
  }

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit'); // The final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into

  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function (match) {
    if (match === '%%') {
      return;
    }

    index++;

    if (match === '%c') {
      // We only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });
  args.splice(lastC, 0, c);
}
/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */


function log() {
  var _console;

  // This hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return (typeof console === "undefined" ? "undefined" : _typeof(console)) === 'object' && console.log && (_console = console).log.apply(_console, arguments);
}
/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */


function save(namespaces) {
  try {
    if (namespaces) {
      exports.storage.setItem('debug', namespaces);
    } else {
      exports.storage.removeItem('debug');
    }
  } catch (error) {// Swallow
    // XXX (@Qix-) should we be logging these?
  }
}
/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */


function load() {
  var r;

  try {
    r = exports.storage.getItem('debug');
  } catch (error) {} // Swallow
  // XXX (@Qix-) should we be logging these?
  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG


  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}
/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */


function localstorage() {
  try {
    // TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
    // The Browser also has localStorage in the global context.
    return localStorage;
  } catch (error) {// Swallow
    // XXX (@Qix-) should we be logging these?
  }
}

module.exports = require('./common')(exports);
var formatters = module.exports.formatters;
/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

formatters.j = function (v) {
  try {
    return JSON.stringify(v);
  } catch (error) {
    return '[UnexpectedJSONParseError]: ' + error.message;
  }
};


}).call(this,{ env: {} })

},{"./common":56}],56:[function(require,module,exports){
"use strict";

/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */
function setup(env) {
  createDebug.debug = createDebug;
  createDebug.default = createDebug;
  createDebug.coerce = coerce;
  createDebug.disable = disable;
  createDebug.enable = enable;
  createDebug.enabled = enabled;
  createDebug.humanize = require('ms');
  Object.keys(env).forEach(function (key) {
    createDebug[key] = env[key];
  });
  /**
  * Active `debug` instances.
  */

  createDebug.instances = [];
  /**
  * The currently active debug mode names, and names to skip.
  */

  createDebug.names = [];
  createDebug.skips = [];
  /**
  * Map of special "%n" handling functions, for the debug "format" argument.
  *
  * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
  */

  createDebug.formatters = {};
  /**
  * Selects a color for a debug namespace
  * @param {String} namespace The namespace string for the for the debug instance to be colored
  * @return {Number|String} An ANSI color code for the given namespace
  * @api private
  */

  function selectColor(namespace) {
    var hash = 0;

    for (var i = 0; i < namespace.length; i++) {
      hash = (hash << 5) - hash + namespace.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }

    return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
  }

  createDebug.selectColor = selectColor;
  /**
  * Create a debugger with the given `namespace`.
  *
  * @param {String} namespace
  * @return {Function}
  * @api public
  */

  function createDebug(namespace) {
    var prevTime;

    function debug() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      // Disabled?
      if (!debug.enabled) {
        return;
      }

      var self = debug; // Set `diff` timestamp

      var curr = Number(new Date());
      var ms = curr - (prevTime || curr);
      self.diff = ms;
      self.prev = prevTime;
      self.curr = curr;
      prevTime = curr;
      args[0] = createDebug.coerce(args[0]);

      if (typeof args[0] !== 'string') {
        // Anything else let's inspect with %O
        args.unshift('%O');
      } // Apply any `formatters` transformations


      var index = 0;
      args[0] = args[0].replace(/%([a-zA-Z%])/g, function (match, format) {
        // If we encounter an escaped % then don't increase the array index
        if (match === '%%') {
          return match;
        }

        index++;
        var formatter = createDebug.formatters[format];

        if (typeof formatter === 'function') {
          var val = args[index];
          match = formatter.call(self, val); // Now we need to remove `args[index]` since it's inlined in the `format`

          args.splice(index, 1);
          index--;
        }

        return match;
      }); // Apply env-specific formatting (colors, etc.)

      createDebug.formatArgs.call(self, args);
      var logFn = self.log || createDebug.log;
      logFn.apply(self, args);
    }

    debug.namespace = namespace;
    debug.enabled = createDebug.enabled(namespace);
    debug.useColors = createDebug.useColors();
    debug.color = selectColor(namespace);
    debug.destroy = destroy;
    debug.extend = extend; // Debug.formatArgs = formatArgs;
    // debug.rawLog = rawLog;
    // env-specific initialization logic for debug instances

    if (typeof createDebug.init === 'function') {
      createDebug.init(debug);
    }

    createDebug.instances.push(debug);
    return debug;
  }

  function destroy() {
    var index = createDebug.instances.indexOf(this);

    if (index !== -1) {
      createDebug.instances.splice(index, 1);
      return true;
    }

    return false;
  }

  function extend(namespace, delimiter) {
    return createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
  }
  /**
  * Enables a debug mode by namespaces. This can include modes
  * separated by a colon and wildcards.
  *
  * @param {String} namespaces
  * @api public
  */


  function enable(namespaces) {
    createDebug.save(namespaces);
    createDebug.names = [];
    createDebug.skips = [];
    var i;
    var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
    var len = split.length;

    for (i = 0; i < len; i++) {
      if (!split[i]) {
        // ignore empty strings
        continue;
      }

      namespaces = split[i].replace(/\*/g, '.*?');

      if (namespaces[0] === '-') {
        createDebug.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
      } else {
        createDebug.names.push(new RegExp('^' + namespaces + '$'));
      }
    }

    for (i = 0; i < createDebug.instances.length; i++) {
      var instance = createDebug.instances[i];
      instance.enabled = createDebug.enabled(instance.namespace);
    }
  }
  /**
  * Disable debug output.
  *
  * @api public
  */


  function disable() {
    createDebug.enable('');
  }
  /**
  * Returns true if the given mode name is enabled, false otherwise.
  *
  * @param {String} name
  * @return {Boolean}
  * @api public
  */


  function enabled(name) {
    if (name[name.length - 1] === '*') {
      return true;
    }

    var i;
    var len;

    for (i = 0, len = createDebug.skips.length; i < len; i++) {
      if (createDebug.skips[i].test(name)) {
        return false;
      }
    }

    for (i = 0, len = createDebug.names.length; i < len; i++) {
      if (createDebug.names[i].test(name)) {
        return true;
      }
    }

    return false;
  }
  /**
  * Coerce `val`.
  *
  * @param {Mixed} val
  * @return {Mixed}
  * @api private
  */


  function coerce(val) {
    if (val instanceof Error) {
      return val.stack || val.message;
    }

    return val;
  }

  createDebug.enable(createDebug.load());
  return createDebug;
}

module.exports = setup;


},{"ms":54}],57:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],58:[function(require,module,exports){
(function (global){
/*! JSON v3.3.2 | http://bestiejs.github.io/json3 | Copyright 2012-2014, Kit Cambridge | http://kit.mit-license.org */
;(function () {
  // Detect the `define` function exposed by asynchronous module loaders. The
  // strict `define` check is necessary for compatibility with `r.js`.
  var isLoader = typeof define === "function" && define.amd;

  // A set of types used to distinguish objects from primitives.
  var objectTypes = {
    "function": true,
    "object": true
  };

  // Detect the `exports` object exposed by CommonJS implementations.
  var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;

  // Use the `global` object exposed by Node (including Browserify via
  // `insert-module-globals`), Narwhal, and Ringo as the default context,
  // and the `window` object in browsers. Rhino exports a `global` function
  // instead.
  var root = objectTypes[typeof window] && window || this,
      freeGlobal = freeExports && objectTypes[typeof module] && module && !module.nodeType && typeof global == "object" && global;

  if (freeGlobal && (freeGlobal["global"] === freeGlobal || freeGlobal["window"] === freeGlobal || freeGlobal["self"] === freeGlobal)) {
    root = freeGlobal;
  }

  // Public: Initializes JSON 3 using the given `context` object, attaching the
  // `stringify` and `parse` functions to the specified `exports` object.
  function runInContext(context, exports) {
    context || (context = root["Object"]());
    exports || (exports = root["Object"]());

    // Native constructor aliases.
    var Number = context["Number"] || root["Number"],
        String = context["String"] || root["String"],
        Object = context["Object"] || root["Object"],
        Date = context["Date"] || root["Date"],
        SyntaxError = context["SyntaxError"] || root["SyntaxError"],
        TypeError = context["TypeError"] || root["TypeError"],
        Math = context["Math"] || root["Math"],
        nativeJSON = context["JSON"] || root["JSON"];

    // Delegate to the native `stringify` and `parse` implementations.
    if (typeof nativeJSON == "object" && nativeJSON) {
      exports.stringify = nativeJSON.stringify;
      exports.parse = nativeJSON.parse;
    }

    // Convenience aliases.
    var objectProto = Object.prototype,
        getClass = objectProto.toString,
        isProperty, forEach, undef;

    // Test the `Date#getUTC*` methods. Based on work by @Yaffle.
    var isExtended = new Date(-3509827334573292);
    try {
      // The `getUTCFullYear`, `Month`, and `Date` methods return nonsensical
      // results for certain dates in Opera >= 10.53.
      isExtended = isExtended.getUTCFullYear() == -109252 && isExtended.getUTCMonth() === 0 && isExtended.getUTCDate() === 1 &&
        // Safari < 2.0.2 stores the internal millisecond time value correctly,
        // but clips the values returned by the date methods to the range of
        // signed 32-bit integers ([-2 ** 31, 2 ** 31 - 1]).
        isExtended.getUTCHours() == 10 && isExtended.getUTCMinutes() == 37 && isExtended.getUTCSeconds() == 6 && isExtended.getUTCMilliseconds() == 708;
    } catch (exception) {}

    // Internal: Determines whether the native `JSON.stringify` and `parse`
    // implementations are spec-compliant. Based on work by Ken Snyder.
    function has(name) {
      if (has[name] !== undef) {
        // Return cached feature test result.
        return has[name];
      }
      var isSupported;
      if (name == "bug-string-char-index") {
        // IE <= 7 doesn't support accessing string characters using square
        // bracket notation. IE 8 only supports this for primitives.
        isSupported = "a"[0] != "a";
      } else if (name == "json") {
        // Indicates whether both `JSON.stringify` and `JSON.parse` are
        // supported.
        isSupported = has("json-stringify") && has("json-parse");
      } else {
        var value, serialized = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
        // Test `JSON.stringify`.
        if (name == "json-stringify") {
          var stringify = exports.stringify, stringifySupported = typeof stringify == "function" && isExtended;
          if (stringifySupported) {
            // A test function object with a custom `toJSON` method.
            (value = function () {
              return 1;
            }).toJSON = value;
            try {
              stringifySupported =
                // Firefox 3.1b1 and b2 serialize string, number, and boolean
                // primitives as object literals.
                stringify(0) === "0" &&
                // FF 3.1b1, b2, and JSON 2 serialize wrapped primitives as object
                // literals.
                stringify(new Number()) === "0" &&
                stringify(new String()) == '""' &&
                // FF 3.1b1, 2 throw an error if the value is `null`, `undefined`, or
                // does not define a canonical JSON representation (this applies to
                // objects with `toJSON` properties as well, *unless* they are nested
                // within an object or array).
                stringify(getClass) === undef &&
                // IE 8 serializes `undefined` as `"undefined"`. Safari <= 5.1.7 and
                // FF 3.1b3 pass this test.
                stringify(undef) === undef &&
                // Safari <= 5.1.7 and FF 3.1b3 throw `Error`s and `TypeError`s,
                // respectively, if the value is omitted entirely.
                stringify() === undef &&
                // FF 3.1b1, 2 throw an error if the given value is not a number,
                // string, array, object, Boolean, or `null` literal. This applies to
                // objects with custom `toJSON` methods as well, unless they are nested
                // inside object or array literals. YUI 3.0.0b1 ignores custom `toJSON`
                // methods entirely.
                stringify(value) === "1" &&
                stringify([value]) == "[1]" &&
                // Prototype <= 1.6.1 serializes `[undefined]` as `"[]"` instead of
                // `"[null]"`.
                stringify([undef]) == "[null]" &&
                // YUI 3.0.0b1 fails to serialize `null` literals.
                stringify(null) == "null" &&
                // FF 3.1b1, 2 halts serialization if an array contains a function:
                // `[1, true, getClass, 1]` serializes as "[1,true,],". FF 3.1b3
                // elides non-JSON values from objects and arrays, unless they
                // define custom `toJSON` methods.
                stringify([undef, getClass, null]) == "[null,null,null]" &&
                // Simple serialization test. FF 3.1b1 uses Unicode escape sequences
                // where character escape codes are expected (e.g., `\b` => `\u0008`).
                stringify({ "a": [value, true, false, null, "\x00\b\n\f\r\t"] }) == serialized &&
                // FF 3.1b1 and b2 ignore the `filter` and `width` arguments.
                stringify(null, value) === "1" &&
                stringify([1, 2], null, 1) == "[\n 1,\n 2\n]" &&
                // JSON 2, Prototype <= 1.7, and older WebKit builds incorrectly
                // serialize extended years.
                stringify(new Date(-8.64e15)) == '"-271821-04-20T00:00:00.000Z"' &&
                // The milliseconds are optional in ES 5, but required in 5.1.
                stringify(new Date(8.64e15)) == '"+275760-09-13T00:00:00.000Z"' &&
                // Firefox <= 11.0 incorrectly serializes years prior to 0 as negative
                // four-digit years instead of six-digit years. Credits: @Yaffle.
                stringify(new Date(-621987552e5)) == '"-000001-01-01T00:00:00.000Z"' &&
                // Safari <= 5.1.5 and Opera >= 10.53 incorrectly serialize millisecond
                // values less than 1000. Credits: @Yaffle.
                stringify(new Date(-1)) == '"1969-12-31T23:59:59.999Z"';
            } catch (exception) {
              stringifySupported = false;
            }
          }
          isSupported = stringifySupported;
        }
        // Test `JSON.parse`.
        if (name == "json-parse") {
          var parse = exports.parse;
          if (typeof parse == "function") {
            try {
              // FF 3.1b1, b2 will throw an exception if a bare literal is provided.
              // Conforming implementations should also coerce the initial argument to
              // a string prior to parsing.
              if (parse("0") === 0 && !parse(false)) {
                // Simple parsing test.
                value = parse(serialized);
                var parseSupported = value["a"].length == 5 && value["a"][0] === 1;
                if (parseSupported) {
                  try {
                    // Safari <= 5.1.2 and FF 3.1b1 allow unescaped tabs in strings.
                    parseSupported = !parse('"\t"');
                  } catch (exception) {}
                  if (parseSupported) {
                    try {
                      // FF 4.0 and 4.0.1 allow leading `+` signs and leading
                      // decimal points. FF 4.0, 4.0.1, and IE 9-10 also allow
                      // certain octal literals.
                      parseSupported = parse("01") !== 1;
                    } catch (exception) {}
                  }
                  if (parseSupported) {
                    try {
                      // FF 4.0, 4.0.1, and Rhino 1.7R3-R4 allow trailing decimal
                      // points. These environments, along with FF 3.1b1 and 2,
                      // also allow trailing commas in JSON objects and arrays.
                      parseSupported = parse("1.") !== 1;
                    } catch (exception) {}
                  }
                }
              }
            } catch (exception) {
              parseSupported = false;
            }
          }
          isSupported = parseSupported;
        }
      }
      return has[name] = !!isSupported;
    }

    if (!has("json")) {
      // Common `[[Class]]` name aliases.
      var functionClass = "[object Function]",
          dateClass = "[object Date]",
          numberClass = "[object Number]",
          stringClass = "[object String]",
          arrayClass = "[object Array]",
          booleanClass = "[object Boolean]";

      // Detect incomplete support for accessing string characters by index.
      var charIndexBuggy = has("bug-string-char-index");

      // Define additional utility methods if the `Date` methods are buggy.
      if (!isExtended) {
        var floor = Math.floor;
        // A mapping between the months of the year and the number of days between
        // January 1st and the first of the respective month.
        var Months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
        // Internal: Calculates the number of days between the Unix epoch and the
        // first day of the given month.
        var getDay = function (year, month) {
          return Months[month] + 365 * (year - 1970) + floor((year - 1969 + (month = +(month > 1))) / 4) - floor((year - 1901 + month) / 100) + floor((year - 1601 + month) / 400);
        };
      }

      // Internal: Determines if a property is a direct property of the given
      // object. Delegates to the native `Object#hasOwnProperty` method.
      if (!(isProperty = objectProto.hasOwnProperty)) {
        isProperty = function (property) {
          var members = {}, constructor;
          if ((members.__proto__ = null, members.__proto__ = {
            // The *proto* property cannot be set multiple times in recent
            // versions of Firefox and SeaMonkey.
            "toString": 1
          }, members).toString != getClass) {
            // Safari <= 2.0.3 doesn't implement `Object#hasOwnProperty`, but
            // supports the mutable *proto* property.
            isProperty = function (property) {
              // Capture and break the object's prototype chain (see section 8.6.2
              // of the ES 5.1 spec). The parenthesized expression prevents an
              // unsafe transformation by the Closure Compiler.
              var original = this.__proto__, result = property in (this.__proto__ = null, this);
              // Restore the original prototype chain.
              this.__proto__ = original;
              return result;
            };
          } else {
            // Capture a reference to the top-level `Object` constructor.
            constructor = members.constructor;
            // Use the `constructor` property to simulate `Object#hasOwnProperty` in
            // other environments.
            isProperty = function (property) {
              var parent = (this.constructor || constructor).prototype;
              return property in this && !(property in parent && this[property] === parent[property]);
            };
          }
          members = null;
          return isProperty.call(this, property);
        };
      }

      // Internal: Normalizes the `for...in` iteration algorithm across
      // environments. Each enumerated key is yielded to a `callback` function.
      forEach = function (object, callback) {
        var size = 0, Properties, members, property;

        // Tests for bugs in the current environment's `for...in` algorithm. The
        // `valueOf` property inherits the non-enumerable flag from
        // `Object.prototype` in older versions of IE, Netscape, and Mozilla.
        (Properties = function () {
          this.valueOf = 0;
        }).prototype.valueOf = 0;

        // Iterate over a new instance of the `Properties` class.
        members = new Properties();
        for (property in members) {
          // Ignore all properties inherited from `Object.prototype`.
          if (isProperty.call(members, property)) {
            size++;
          }
        }
        Properties = members = null;

        // Normalize the iteration algorithm.
        if (!size) {
          // A list of non-enumerable properties inherited from `Object.prototype`.
          members = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"];
          // IE <= 8, Mozilla 1.0, and Netscape 6.2 ignore shadowed non-enumerable
          // properties.
          forEach = function (object, callback) {
            var isFunction = getClass.call(object) == functionClass, property, length;
            var hasProperty = !isFunction && typeof object.constructor != "function" && objectTypes[typeof object.hasOwnProperty] && object.hasOwnProperty || isProperty;
            for (property in object) {
              // Gecko <= 1.0 enumerates the `prototype` property of functions under
              // certain conditions; IE does not.
              if (!(isFunction && property == "prototype") && hasProperty.call(object, property)) {
                callback(property);
              }
            }
            // Manually invoke the callback for each non-enumerable property.
            for (length = members.length; property = members[--length]; hasProperty.call(object, property) && callback(property));
          };
        } else if (size == 2) {
          // Safari <= 2.0.4 enumerates shadowed properties twice.
          forEach = function (object, callback) {
            // Create a set of iterated properties.
            var members = {}, isFunction = getClass.call(object) == functionClass, property;
            for (property in object) {
              // Store each property name to prevent double enumeration. The
              // `prototype` property of functions is not enumerated due to cross-
              // environment inconsistencies.
              if (!(isFunction && property == "prototype") && !isProperty.call(members, property) && (members[property] = 1) && isProperty.call(object, property)) {
                callback(property);
              }
            }
          };
        } else {
          // No bugs detected; use the standard `for...in` algorithm.
          forEach = function (object, callback) {
            var isFunction = getClass.call(object) == functionClass, property, isConstructor;
            for (property in object) {
              if (!(isFunction && property == "prototype") && isProperty.call(object, property) && !(isConstructor = property === "constructor")) {
                callback(property);
              }
            }
            // Manually invoke the callback for the `constructor` property due to
            // cross-environment inconsistencies.
            if (isConstructor || isProperty.call(object, (property = "constructor"))) {
              callback(property);
            }
          };
        }
        return forEach(object, callback);
      };

      // Public: Serializes a JavaScript `value` as a JSON string. The optional
      // `filter` argument may specify either a function that alters how object and
      // array members are serialized, or an array of strings and numbers that
      // indicates which properties should be serialized. The optional `width`
      // argument may be either a string or number that specifies the indentation
      // level of the output.
      if (!has("json-stringify")) {
        // Internal: A map of control characters and their escaped equivalents.
        var Escapes = {
          92: "\\\\",
          34: '\\"',
          8: "\\b",
          12: "\\f",
          10: "\\n",
          13: "\\r",
          9: "\\t"
        };

        // Internal: Converts `value` into a zero-padded string such that its
        // length is at least equal to `width`. The `width` must be <= 6.
        var leadingZeroes = "000000";
        var toPaddedString = function (width, value) {
          // The `|| 0` expression is necessary to work around a bug in
          // Opera <= 7.54u2 where `0 == -0`, but `String(-0) !== "0"`.
          return (leadingZeroes + (value || 0)).slice(-width);
        };

        // Internal: Double-quotes a string `value`, replacing all ASCII control
        // characters (characters with code unit values between 0 and 31) with
        // their escaped equivalents. This is an implementation of the
        // `Quote(value)` operation defined in ES 5.1 section 15.12.3.
        var unicodePrefix = "\\u00";
        var quote = function (value) {
          var result = '"', index = 0, length = value.length, useCharIndex = !charIndexBuggy || length > 10;
          var symbols = useCharIndex && (charIndexBuggy ? value.split("") : value);
          for (; index < length; index++) {
            var charCode = value.charCodeAt(index);
            // If the character is a control character, append its Unicode or
            // shorthand escape sequence; otherwise, append the character as-is.
            switch (charCode) {
              case 8: case 9: case 10: case 12: case 13: case 34: case 92:
                result += Escapes[charCode];
                break;
              default:
                if (charCode < 32) {
                  result += unicodePrefix + toPaddedString(2, charCode.toString(16));
                  break;
                }
                result += useCharIndex ? symbols[index] : value.charAt(index);
            }
          }
          return result + '"';
        };

        // Internal: Recursively serializes an object. Implements the
        // `Str(key, holder)`, `JO(value)`, and `JA(value)` operations.
        var serialize = function (property, object, callback, properties, whitespace, indentation, stack) {
          var value, className, year, month, date, time, hours, minutes, seconds, milliseconds, results, element, index, length, prefix, result;
          try {
            // Necessary for host object support.
            value = object[property];
          } catch (exception) {}
          if (typeof value == "object" && value) {
            className = getClass.call(value);
            if (className == dateClass && !isProperty.call(value, "toJSON")) {
              if (value > -1 / 0 && value < 1 / 0) {
                // Dates are serialized according to the `Date#toJSON` method
                // specified in ES 5.1 section 15.9.5.44. See section 15.9.1.15
                // for the ISO 8601 date time string format.
                if (getDay) {
                  // Manually compute the year, month, date, hours, minutes,
                  // seconds, and milliseconds if the `getUTC*` methods are
                  // buggy. Adapted from @Yaffle's `date-shim` project.
                  date = floor(value / 864e5);
                  for (year = floor(date / 365.2425) + 1970 - 1; getDay(year + 1, 0) <= date; year++);
                  for (month = floor((date - getDay(year, 0)) / 30.42); getDay(year, month + 1) <= date; month++);
                  date = 1 + date - getDay(year, month);
                  // The `time` value specifies the time within the day (see ES
                  // 5.1 section 15.9.1.2). The formula `(A % B + B) % B` is used
                  // to compute `A modulo B`, as the `%` operator does not
                  // correspond to the `modulo` operation for negative numbers.
                  time = (value % 864e5 + 864e5) % 864e5;
                  // The hours, minutes, seconds, and milliseconds are obtained by
                  // decomposing the time within the day. See section 15.9.1.10.
                  hours = floor(time / 36e5) % 24;
                  minutes = floor(time / 6e4) % 60;
                  seconds = floor(time / 1e3) % 60;
                  milliseconds = time % 1e3;
                } else {
                  year = value.getUTCFullYear();
                  month = value.getUTCMonth();
                  date = value.getUTCDate();
                  hours = value.getUTCHours();
                  minutes = value.getUTCMinutes();
                  seconds = value.getUTCSeconds();
                  milliseconds = value.getUTCMilliseconds();
                }
                // Serialize extended years correctly.
                value = (year <= 0 || year >= 1e4 ? (year < 0 ? "-" : "+") + toPaddedString(6, year < 0 ? -year : year) : toPaddedString(4, year)) +
                  "-" + toPaddedString(2, month + 1) + "-" + toPaddedString(2, date) +
                  // Months, dates, hours, minutes, and seconds should have two
                  // digits; milliseconds should have three.
                  "T" + toPaddedString(2, hours) + ":" + toPaddedString(2, minutes) + ":" + toPaddedString(2, seconds) +
                  // Milliseconds are optional in ES 5.0, but required in 5.1.
                  "." + toPaddedString(3, milliseconds) + "Z";
              } else {
                value = null;
              }
            } else if (typeof value.toJSON == "function" && ((className != numberClass && className != stringClass && className != arrayClass) || isProperty.call(value, "toJSON"))) {
              // Prototype <= 1.6.1 adds non-standard `toJSON` methods to the
              // `Number`, `String`, `Date`, and `Array` prototypes. JSON 3
              // ignores all `toJSON` methods on these objects unless they are
              // defined directly on an instance.
              value = value.toJSON(property);
            }
          }
          if (callback) {
            // If a replacement function was provided, call it to obtain the value
            // for serialization.
            value = callback.call(object, property, value);
          }
          if (value === null) {
            return "null";
          }
          className = getClass.call(value);
          if (className == booleanClass) {
            // Booleans are represented literally.
            return "" + value;
          } else if (className == numberClass) {
            // JSON numbers must be finite. `Infinity` and `NaN` are serialized as
            // `"null"`.
            return value > -1 / 0 && value < 1 / 0 ? "" + value : "null";
          } else if (className == stringClass) {
            // Strings are double-quoted and escaped.
            return quote("" + value);
          }
          // Recursively serialize objects and arrays.
          if (typeof value == "object") {
            // Check for cyclic structures. This is a linear search; performance
            // is inversely proportional to the number of unique nested objects.
            for (length = stack.length; length--;) {
              if (stack[length] === value) {
                // Cyclic structures cannot be serialized by `JSON.stringify`.
                throw TypeError();
              }
            }
            // Add the object to the stack of traversed objects.
            stack.push(value);
            results = [];
            // Save the current indentation level and indent one additional level.
            prefix = indentation;
            indentation += whitespace;
            if (className == arrayClass) {
              // Recursively serialize array elements.
              for (index = 0, length = value.length; index < length; index++) {
                element = serialize(index, value, callback, properties, whitespace, indentation, stack);
                results.push(element === undef ? "null" : element);
              }
              result = results.length ? (whitespace ? "[\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "]" : ("[" + results.join(",") + "]")) : "[]";
            } else {
              // Recursively serialize object members. Members are selected from
              // either a user-specified list of property names, or the object
              // itself.
              forEach(properties || value, function (property) {
                var element = serialize(property, value, callback, properties, whitespace, indentation, stack);
                if (element !== undef) {
                  // According to ES 5.1 section 15.12.3: "If `gap` {whitespace}
                  // is not the empty string, let `member` {quote(property) + ":"}
                  // be the concatenation of `member` and the `space` character."
                  // The "`space` character" refers to the literal space
                  // character, not the `space` {width} argument provided to
                  // `JSON.stringify`.
                  results.push(quote(property) + ":" + (whitespace ? " " : "") + element);
                }
              });
              result = results.length ? (whitespace ? "{\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "}" : ("{" + results.join(",") + "}")) : "{}";
            }
            // Remove the object from the traversed object stack.
            stack.pop();
            return result;
          }
        };

        // Public: `JSON.stringify`. See ES 5.1 section 15.12.3.
        exports.stringify = function (source, filter, width) {
          var whitespace, callback, properties, className;
          if (objectTypes[typeof filter] && filter) {
            if ((className = getClass.call(filter)) == functionClass) {
              callback = filter;
            } else if (className == arrayClass) {
              // Convert the property names array into a makeshift set.
              properties = {};
              for (var index = 0, length = filter.length, value; index < length; value = filter[index++], ((className = getClass.call(value)), className == stringClass || className == numberClass) && (properties[value] = 1));
            }
          }
          if (width) {
            if ((className = getClass.call(width)) == numberClass) {
              // Convert the `width` to an integer and create a string containing
              // `width` number of space characters.
              if ((width -= width % 1) > 0) {
                for (whitespace = "", width > 10 && (width = 10); whitespace.length < width; whitespace += " ");
              }
            } else if (className == stringClass) {
              whitespace = width.length <= 10 ? width : width.slice(0, 10);
            }
          }
          // Opera <= 7.54u2 discards the values associated with empty string keys
          // (`""`) only if they are used directly within an object member list
          // (e.g., `!("" in { "": 1})`).
          return serialize("", (value = {}, value[""] = source, value), callback, properties, whitespace, "", []);
        };
      }

      // Public: Parses a JSON source string.
      if (!has("json-parse")) {
        var fromCharCode = String.fromCharCode;

        // Internal: A map of escaped control characters and their unescaped
        // equivalents.
        var Unescapes = {
          92: "\\",
          34: '"',
          47: "/",
          98: "\b",
          116: "\t",
          110: "\n",
          102: "\f",
          114: "\r"
        };

        // Internal: Stores the parser state.
        var Index, Source;

        // Internal: Resets the parser state and throws a `SyntaxError`.
        var abort = function () {
          Index = Source = null;
          throw SyntaxError();
        };

        // Internal: Returns the next token, or `"$"` if the parser has reached
        // the end of the source string. A token may be a string, number, `null`
        // literal, or Boolean literal.
        var lex = function () {
          var source = Source, length = source.length, value, begin, position, isSigned, charCode;
          while (Index < length) {
            charCode = source.charCodeAt(Index);
            switch (charCode) {
              case 9: case 10: case 13: case 32:
                // Skip whitespace tokens, including tabs, carriage returns, line
                // feeds, and space characters.
                Index++;
                break;
              case 123: case 125: case 91: case 93: case 58: case 44:
                // Parse a punctuator token (`{`, `}`, `[`, `]`, `:`, or `,`) at
                // the current position.
                value = charIndexBuggy ? source.charAt(Index) : source[Index];
                Index++;
                return value;
              case 34:
                // `"` delimits a JSON string; advance to the next character and
                // begin parsing the string. String tokens are prefixed with the
                // sentinel `@` character to distinguish them from punctuators and
                // end-of-string tokens.
                for (value = "@", Index++; Index < length;) {
                  charCode = source.charCodeAt(Index);
                  if (charCode < 32) {
                    // Unescaped ASCII control characters (those with a code unit
                    // less than the space character) are not permitted.
                    abort();
                  } else if (charCode == 92) {
                    // A reverse solidus (`\`) marks the beginning of an escaped
                    // control character (including `"`, `\`, and `/`) or Unicode
                    // escape sequence.
                    charCode = source.charCodeAt(++Index);
                    switch (charCode) {
                      case 92: case 34: case 47: case 98: case 116: case 110: case 102: case 114:
                        // Revive escaped control characters.
                        value += Unescapes[charCode];
                        Index++;
                        break;
                      case 117:
                        // `\u` marks the beginning of a Unicode escape sequence.
                        // Advance to the first character and validate the
                        // four-digit code point.
                        begin = ++Index;
                        for (position = Index + 4; Index < position; Index++) {
                          charCode = source.charCodeAt(Index);
                          // A valid sequence comprises four hexdigits (case-
                          // insensitive) that form a single hexadecimal value.
                          if (!(charCode >= 48 && charCode <= 57 || charCode >= 97 && charCode <= 102 || charCode >= 65 && charCode <= 70)) {
                            // Invalid Unicode escape sequence.
                            abort();
                          }
                        }
                        // Revive the escaped character.
                        value += fromCharCode("0x" + source.slice(begin, Index));
                        break;
                      default:
                        // Invalid escape sequence.
                        abort();
                    }
                  } else {
                    if (charCode == 34) {
                      // An unescaped double-quote character marks the end of the
                      // string.
                      break;
                    }
                    charCode = source.charCodeAt(Index);
                    begin = Index;
                    // Optimize for the common case where a string is valid.
                    while (charCode >= 32 && charCode != 92 && charCode != 34) {
                      charCode = source.charCodeAt(++Index);
                    }
                    // Append the string as-is.
                    value += source.slice(begin, Index);
                  }
                }
                if (source.charCodeAt(Index) == 34) {
                  // Advance to the next character and return the revived string.
                  Index++;
                  return value;
                }
                // Unterminated string.
                abort();
              default:
                // Parse numbers and literals.
                begin = Index;
                // Advance past the negative sign, if one is specified.
                if (charCode == 45) {
                  isSigned = true;
                  charCode = source.charCodeAt(++Index);
                }
                // Parse an integer or floating-point value.
                if (charCode >= 48 && charCode <= 57) {
                  // Leading zeroes are interpreted as octal literals.
                  if (charCode == 48 && ((charCode = source.charCodeAt(Index + 1)), charCode >= 48 && charCode <= 57)) {
                    // Illegal octal literal.
                    abort();
                  }
                  isSigned = false;
                  // Parse the integer component.
                  for (; Index < length && ((charCode = source.charCodeAt(Index)), charCode >= 48 && charCode <= 57); Index++);
                  // Floats cannot contain a leading decimal point; however, this
                  // case is already accounted for by the parser.
                  if (source.charCodeAt(Index) == 46) {
                    position = ++Index;
                    // Parse the decimal component.
                    for (; position < length && ((charCode = source.charCodeAt(position)), charCode >= 48 && charCode <= 57); position++);
                    if (position == Index) {
                      // Illegal trailing decimal.
                      abort();
                    }
                    Index = position;
                  }
                  // Parse exponents. The `e` denoting the exponent is
                  // case-insensitive.
                  charCode = source.charCodeAt(Index);
                  if (charCode == 101 || charCode == 69) {
                    charCode = source.charCodeAt(++Index);
                    // Skip past the sign following the exponent, if one is
                    // specified.
                    if (charCode == 43 || charCode == 45) {
                      Index++;
                    }
                    // Parse the exponential component.
                    for (position = Index; position < length && ((charCode = source.charCodeAt(position)), charCode >= 48 && charCode <= 57); position++);
                    if (position == Index) {
                      // Illegal empty exponent.
                      abort();
                    }
                    Index = position;
                  }
                  // Coerce the parsed value to a JavaScript number.
                  return +source.slice(begin, Index);
                }
                // A negative sign may only precede numbers.
                if (isSigned) {
                  abort();
                }
                // `true`, `false`, and `null` literals.
                if (source.slice(Index, Index + 4) == "true") {
                  Index += 4;
                  return true;
                } else if (source.slice(Index, Index + 5) == "false") {
                  Index += 5;
                  return false;
                } else if (source.slice(Index, Index + 4) == "null") {
                  Index += 4;
                  return null;
                }
                // Unrecognized token.
                abort();
            }
          }
          // Return the sentinel `$` character if the parser has reached the end
          // of the source string.
          return "$";
        };

        // Internal: Parses a JSON `value` token.
        var get = function (value) {
          var results, hasMembers;
          if (value == "$") {
            // Unexpected end of input.
            abort();
          }
          if (typeof value == "string") {
            if ((charIndexBuggy ? value.charAt(0) : value[0]) == "@") {
              // Remove the sentinel `@` character.
              return value.slice(1);
            }
            // Parse object and array literals.
            if (value == "[") {
              // Parses a JSON array, returning a new JavaScript array.
              results = [];
              for (;; hasMembers || (hasMembers = true)) {
                value = lex();
                // A closing square bracket marks the end of the array literal.
                if (value == "]") {
                  break;
                }
                // If the array literal contains elements, the current token
                // should be a comma separating the previous element from the
                // next.
                if (hasMembers) {
                  if (value == ",") {
                    value = lex();
                    if (value == "]") {
                      // Unexpected trailing `,` in array literal.
                      abort();
                    }
                  } else {
                    // A `,` must separate each array element.
                    abort();
                  }
                }
                // Elisions and leading commas are not permitted.
                if (value == ",") {
                  abort();
                }
                results.push(get(value));
              }
              return results;
            } else if (value == "{") {
              // Parses a JSON object, returning a new JavaScript object.
              results = {};
              for (;; hasMembers || (hasMembers = true)) {
                value = lex();
                // A closing curly brace marks the end of the object literal.
                if (value == "}") {
                  break;
                }
                // If the object literal contains members, the current token
                // should be a comma separator.
                if (hasMembers) {
                  if (value == ",") {
                    value = lex();
                    if (value == "}") {
                      // Unexpected trailing `,` in object literal.
                      abort();
                    }
                  } else {
                    // A `,` must separate each object member.
                    abort();
                  }
                }
                // Leading commas are not permitted, object property names must be
                // double-quoted strings, and a `:` must separate each property
                // name and value.
                if (value == "," || typeof value != "string" || (charIndexBuggy ? value.charAt(0) : value[0]) != "@" || lex() != ":") {
                  abort();
                }
                results[value.slice(1)] = get(lex());
              }
              return results;
            }
            // Unexpected token encountered.
            abort();
          }
          return value;
        };

        // Internal: Updates a traversed object member.
        var update = function (source, property, callback) {
          var element = walk(source, property, callback);
          if (element === undef) {
            delete source[property];
          } else {
            source[property] = element;
          }
        };

        // Internal: Recursively traverses a parsed JSON object, invoking the
        // `callback` function for each value. This is an implementation of the
        // `Walk(holder, name)` operation defined in ES 5.1 section 15.12.2.
        var walk = function (source, property, callback) {
          var value = source[property], length;
          if (typeof value == "object" && value) {
            // `forEach` can't be used to traverse an array in Opera <= 8.54
            // because its `Object#hasOwnProperty` implementation returns `false`
            // for array indices (e.g., `![1, 2, 3].hasOwnProperty("0")`).
            if (getClass.call(value) == arrayClass) {
              for (length = value.length; length--;) {
                update(value, length, callback);
              }
            } else {
              forEach(value, function (property) {
                update(value, property, callback);
              });
            }
          }
          return callback.call(source, property, value);
        };

        // Public: `JSON.parse`. See ES 5.1 section 15.12.2.
        exports.parse = function (source, callback) {
          var result, value;
          Index = 0;
          Source = "" + source;
          result = get(lex());
          // If a JSON string contains multiple tokens, it is invalid.
          if (lex() != "$") {
            abort();
          }
          // Reset the parser state.
          Index = Source = null;
          return callback && getClass.call(callback) == functionClass ? walk((value = {}, value[""] = result, value), "", callback) : result;
        };
      }
    }

    exports["runInContext"] = runInContext;
    return exports;
  }

  if (freeExports && !isLoader) {
    // Export for CommonJS environments.
    runInContext(root, freeExports);
  } else {
    // Export for web browsers and JavaScript engines.
    var nativeJSON = root.JSON,
        previousJSON = root["JSON3"],
        isRestored = false;

    var JSON3 = runInContext(root, (root["JSON3"] = {
      // Public: Restores the original value of the global `JSON` object and
      // returns a reference to the `JSON3` object.
      "noConflict": function () {
        if (!isRestored) {
          isRestored = true;
          root.JSON = nativeJSON;
          root["JSON3"] = previousJSON;
          nativeJSON = previousJSON = null;
        }
        return JSON3;
      }
    }));

    root.JSON = {
      "parse": JSON3.parse,
      "stringify": JSON3.stringify
    };
  }

  // Export for asynchronous module loaders.
  if (isLoader) {
    define(function () {
      return JSON3;
    });
  }
}).call(this);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],59:[function(require,module,exports){
'use strict';

var has = Object.prototype.hasOwnProperty;

/**
 * Decode a URI encoded string.
 *
 * @param {String} input The URI encoded string.
 * @returns {String} The decoded string.
 * @api private
 */
function decode(input) {
  return decodeURIComponent(input.replace(/\+/g, ' '));
}

/**
 * Simple query string parser.
 *
 * @param {String} query The query string that needs to be parsed.
 * @returns {Object}
 * @api public
 */
function querystring(query) {
  var parser = /([^=?&]+)=?([^&]*)/g
    , result = {}
    , part;

  while (part = parser.exec(query)) {
    var key = decode(part[1])
      , value = decode(part[2]);

    //
    // Prevent overriding of existing properties. This ensures that build-in
    // methods like `toString` or __proto__ are not overriden by malicious
    // querystrings.
    //
    if (key in result) continue;
    result[key] = value;
  }

  return result;
}

/**
 * Transform a query string to an object.
 *
 * @param {Object} obj Object that should be transformed.
 * @param {String} prefix Optional prefix.
 * @returns {String}
 * @api public
 */
function querystringify(obj, prefix) {
  prefix = prefix || '';

  var pairs = [];

  //
  // Optionally prefix with a '?' if needed
  //
  if ('string' !== typeof prefix) prefix = '?';

  for (var key in obj) {
    if (has.call(obj, key)) {
      pairs.push(encodeURIComponent(key) +'='+ encodeURIComponent(obj[key]));
    }
  }

  return pairs.length ? prefix + pairs.join('&') : '';
}

//
// Expose the module.
//
exports.stringify = querystringify;
exports.parse = querystring;

},{}],60:[function(require,module,exports){
'use strict';

/**
 * Check if we're required to add a port number.
 *
 * @see https://url.spec.whatwg.org/#default-port
 * @param {Number|String} port Port number we need to check
 * @param {String} protocol Protocol we need to check against.
 * @returns {Boolean} Is it a default port for the given protocol
 * @api private
 */
module.exports = function required(port, protocol) {
  protocol = protocol.split(':')[0];
  port = +port;

  if (!port) return false;

  switch (protocol) {
    case 'http':
    case 'ws':
    return port !== 80;

    case 'https':
    case 'wss':
    return port !== 443;

    case 'ftp':
    return port !== 21;

    case 'gopher':
    return port !== 70;

    case 'file':
    return false;
  }

  return port !== 0;
};

},{}],61:[function(require,module,exports){
(function (global){
'use strict';

var required = require('requires-port')
  , qs = require('querystringify')
  , protocolre = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\S\s]*)/i
  , slashes = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//;

/**
 * These are the parse rules for the URL parser, it informs the parser
 * about:
 *
 * 0. The char it Needs to parse, if it's a string it should be done using
 *    indexOf, RegExp using exec and NaN means set as current value.
 * 1. The property we should set when parsing this value.
 * 2. Indication if it's backwards or forward parsing, when set as number it's
 *    the value of extra chars that should be split off.
 * 3. Inherit from location if non existing in the parser.
 * 4. `toLowerCase` the resulting value.
 */
var rules = [
  ['#', 'hash'],                        // Extract from the back.
  ['?', 'query'],                       // Extract from the back.
  function sanitize(address) {          // Sanitize what is left of the address
    return address.replace('\\', '/');
  },
  ['/', 'pathname'],                    // Extract from the back.
  ['@', 'auth', 1],                     // Extract from the front.
  [NaN, 'host', undefined, 1, 1],       // Set left over value.
  [/:(\d+)$/, 'port', undefined, 1],    // RegExp the back.
  [NaN, 'hostname', undefined, 1, 1]    // Set left over.
];

/**
 * These properties should not be copied or inherited from. This is only needed
 * for all non blob URL's as a blob URL does not include a hash, only the
 * origin.
 *
 * @type {Object}
 * @private
 */
var ignore = { hash: 1, query: 1 };

/**
 * The location object differs when your code is loaded through a normal page,
 * Worker or through a worker using a blob. And with the blobble begins the
 * trouble as the location object will contain the URL of the blob, not the
 * location of the page where our code is loaded in. The actual origin is
 * encoded in the `pathname` so we can thankfully generate a good "default"
 * location from it so we can generate proper relative URL's again.
 *
 * @param {Object|String} loc Optional default location object.
 * @returns {Object} lolcation object.
 * @public
 */
function lolcation(loc) {
  var location = global && global.location || {};
  loc = loc || location;

  var finaldestination = {}
    , type = typeof loc
    , key;

  if ('blob:' === loc.protocol) {
    finaldestination = new Url(unescape(loc.pathname), {});
  } else if ('string' === type) {
    finaldestination = new Url(loc, {});
    for (key in ignore) delete finaldestination[key];
  } else if ('object' === type) {
    for (key in loc) {
      if (key in ignore) continue;
      finaldestination[key] = loc[key];
    }

    if (finaldestination.slashes === undefined) {
      finaldestination.slashes = slashes.test(loc.href);
    }
  }

  return finaldestination;
}

/**
 * @typedef ProtocolExtract
 * @type Object
 * @property {String} protocol Protocol matched in the URL, in lowercase.
 * @property {Boolean} slashes `true` if protocol is followed by "//", else `false`.
 * @property {String} rest Rest of the URL that is not part of the protocol.
 */

/**
 * Extract protocol information from a URL with/without double slash ("//").
 *
 * @param {String} address URL we want to extract from.
 * @return {ProtocolExtract} Extracted information.
 * @private
 */
function extractProtocol(address) {
  var match = protocolre.exec(address);

  return {
    protocol: match[1] ? match[1].toLowerCase() : '',
    slashes: !!match[2],
    rest: match[3]
  };
}

/**
 * Resolve a relative URL pathname against a base URL pathname.
 *
 * @param {String} relative Pathname of the relative URL.
 * @param {String} base Pathname of the base URL.
 * @return {String} Resolved pathname.
 * @private
 */
function resolve(relative, base) {
  var path = (base || '/').split('/').slice(0, -1).concat(relative.split('/'))
    , i = path.length
    , last = path[i - 1]
    , unshift = false
    , up = 0;

  while (i--) {
    if (path[i] === '.') {
      path.splice(i, 1);
    } else if (path[i] === '..') {
      path.splice(i, 1);
      up++;
    } else if (up) {
      if (i === 0) unshift = true;
      path.splice(i, 1);
      up--;
    }
  }

  if (unshift) path.unshift('');
  if (last === '.' || last === '..') path.push('');

  return path.join('/');
}

/**
 * The actual URL instance. Instead of returning an object we've opted-in to
 * create an actual constructor as it's much more memory efficient and
 * faster and it pleases my OCD.
 *
 * It is worth noting that we should not use `URL` as class name to prevent
 * clashes with the global URL instance that got introduced in browsers.
 *
 * @constructor
 * @param {String} address URL we want to parse.
 * @param {Object|String} location Location defaults for relative paths.
 * @param {Boolean|Function} parser Parser for the query string.
 * @private
 */
function Url(address, location, parser) {
  if (!(this instanceof Url)) {
    return new Url(address, location, parser);
  }

  var relative, extracted, parse, instruction, index, key
    , instructions = rules.slice()
    , type = typeof location
    , url = this
    , i = 0;

  //
  // The following if statements allows this module two have compatibility with
  // 2 different API:
  //
  // 1. Node.js's `url.parse` api which accepts a URL, boolean as arguments
  //    where the boolean indicates that the query string should also be parsed.
  //
  // 2. The `URL` interface of the browser which accepts a URL, object as
  //    arguments. The supplied object will be used as default values / fall-back
  //    for relative paths.
  //
  if ('object' !== type && 'string' !== type) {
    parser = location;
    location = null;
  }

  if (parser && 'function' !== typeof parser) parser = qs.parse;

  location = lolcation(location);

  //
  // Extract protocol information before running the instructions.
  //
  extracted = extractProtocol(address || '');
  relative = !extracted.protocol && !extracted.slashes;
  url.slashes = extracted.slashes || relative && location.slashes;
  url.protocol = extracted.protocol || location.protocol || '';
  address = extracted.rest;

  //
  // When the authority component is absent the URL starts with a path
  // component.
  //
  if (!extracted.slashes) instructions[3] = [/(.*)/, 'pathname'];

  for (; i < instructions.length; i++) {
    instruction = instructions[i];

    if (typeof instruction === 'function') {
      address = instruction(address);
      continue;
    }

    parse = instruction[0];
    key = instruction[1];

    if (parse !== parse) {
      url[key] = address;
    } else if ('string' === typeof parse) {
      if (~(index = address.indexOf(parse))) {
        if ('number' === typeof instruction[2]) {
          url[key] = address.slice(0, index);
          address = address.slice(index + instruction[2]);
        } else {
          url[key] = address.slice(index);
          address = address.slice(0, index);
        }
      }
    } else if ((index = parse.exec(address))) {
      url[key] = index[1];
      address = address.slice(0, index.index);
    }

    url[key] = url[key] || (
      relative && instruction[3] ? location[key] || '' : ''
    );

    //
    // Hostname, host and protocol should be lowercased so they can be used to
    // create a proper `origin`.
    //
    if (instruction[4]) url[key] = url[key].toLowerCase();
  }

  //
  // Also parse the supplied query string in to an object. If we're supplied
  // with a custom parser as function use that instead of the default build-in
  // parser.
  //
  if (parser) url.query = parser(url.query);

  //
  // If the URL is relative, resolve the pathname against the base URL.
  //
  if (
      relative
    && location.slashes
    && url.pathname.charAt(0) !== '/'
    && (url.pathname !== '' || location.pathname !== '')
  ) {
    url.pathname = resolve(url.pathname, location.pathname);
  }

  //
  // We should not add port numbers if they are already the default port number
  // for a given protocol. As the host also contains the port number we're going
  // override it with the hostname which contains no port number.
  //
  if (!required(url.port, url.protocol)) {
    url.host = url.hostname;
    url.port = '';
  }

  //
  // Parse down the `auth` for the username and password.
  //
  url.username = url.password = '';
  if (url.auth) {
    instruction = url.auth.split(':');
    url.username = instruction[0] || '';
    url.password = instruction[1] || '';
  }

  url.origin = url.protocol && url.host && url.protocol !== 'file:'
    ? url.protocol +'//'+ url.host
    : 'null';

  //
  // The href is just the compiled result.
  //
  url.href = url.toString();
}

/**
 * This is convenience method for changing properties in the URL instance to
 * insure that they all propagate correctly.
 *
 * @param {String} part          Property we need to adjust.
 * @param {Mixed} value          The newly assigned value.
 * @param {Boolean|Function} fn  When setting the query, it will be the function
 *                               used to parse the query.
 *                               When setting the protocol, double slash will be
 *                               removed from the final url if it is true.
 * @returns {URL} URL instance for chaining.
 * @public
 */
function set(part, value, fn) {
  var url = this;

  switch (part) {
    case 'query':
      if ('string' === typeof value && value.length) {
        value = (fn || qs.parse)(value);
      }

      url[part] = value;
      break;

    case 'port':
      url[part] = value;

      if (!required(value, url.protocol)) {
        url.host = url.hostname;
        url[part] = '';
      } else if (value) {
        url.host = url.hostname +':'+ value;
      }

      break;

    case 'hostname':
      url[part] = value;

      if (url.port) value += ':'+ url.port;
      url.host = value;
      break;

    case 'host':
      url[part] = value;

      if (/:\d+$/.test(value)) {
        value = value.split(':');
        url.port = value.pop();
        url.hostname = value.join(':');
      } else {
        url.hostname = value;
        url.port = '';
      }

      break;

    case 'protocol':
      url.protocol = value.toLowerCase();
      url.slashes = !fn;
      break;

    case 'pathname':
    case 'hash':
      if (value) {
        var char = part === 'pathname' ? '/' : '#';
        url[part] = value.charAt(0) !== char ? char + value : value;
      } else {
        url[part] = value;
      }
      break;

    default:
      url[part] = value;
  }

  for (var i = 0; i < rules.length; i++) {
    var ins = rules[i];

    if (ins[4]) url[ins[1]] = url[ins[1]].toLowerCase();
  }

  url.origin = url.protocol && url.host && url.protocol !== 'file:'
    ? url.protocol +'//'+ url.host
    : 'null';

  url.href = url.toString();

  return url;
}

/**
 * Transform the properties back in to a valid and full URL string.
 *
 * @param {Function} stringify Optional query stringify function.
 * @returns {String} Compiled version of the URL.
 * @public
 */
function toString(stringify) {
  if (!stringify || 'function' !== typeof stringify) stringify = qs.stringify;

  var query
    , url = this
    , protocol = url.protocol;

  if (protocol && protocol.charAt(protocol.length - 1) !== ':') protocol += ':';

  var result = protocol + (url.slashes ? '//' : '');

  if (url.username) {
    result += url.username;
    if (url.password) result += ':'+ url.password;
    result += '@';
  }

  result += url.host + url.pathname;

  query = 'object' === typeof url.query ? stringify(url.query) : url.query;
  if (query) result += '?' !== query.charAt(0) ? '?'+ query : query;

  if (url.hash) result += url.hash;

  return result;
}

Url.prototype = { set: set, toString: toString };

//
// Expose the URL parser and some additional properties that might be useful for
// others or testing.
//
Url.extractProtocol = extractProtocol;
Url.location = lolcation;
Url.qs = qs;

module.exports = Url;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"querystringify":59,"requires-port":60}]},{},[1])(1)
});


//# sourceMappingURL=sockjs.js.map

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/strip-ansi/index.js":
/*!******************************************!*\
  !*** ./node_modules/strip-ansi/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ansiRegex = __webpack_require__(/*! ansi-regex */ "./node_modules/ansi-regex/index.js")();

module.exports = function (str) {
	return typeof str === 'string' ? str.replace(ansiRegex, '') : str;
};


/***/ }),

/***/ "./node_modules/url/url.js":
/*!*********************************!*\
  !*** ./node_modules/url/url.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var punycode = __webpack_require__(/*! punycode */ "./node_modules/node-libs-browser/node_modules/punycode/punycode.js");
var util = __webpack_require__(/*! ./util */ "./node_modules/url/util.js");

exports.parse = urlParse;
exports.resolve = urlResolve;
exports.resolveObject = urlResolveObject;
exports.format = urlFormat;

exports.Url = Url;

function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.host = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.query = null;
  this.pathname = null;
  this.path = null;
  this.href = null;
}

// Reference: RFC 3986, RFC 1808, RFC 2396

// define these here so at least they only have to be
// compiled once on the first module load.
var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,

    // Special case for a simple path URL
    simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

    // RFC 2396: characters reserved for delimiting URLs.
    // We actually just auto-escape these.
    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

    // RFC 2396: characters not allowed for various reasons.
    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
    autoEscape = ['\''].concat(unwise),
    // Characters that are never ever allowed in a hostname.
    // Note that any invalid chars are also handled, but these
    // are the ones that are *expected* to be seen, so we fast-path
    // them.
    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
    hostEndingChars = ['/', '?', '#'],
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
    // protocols that can allow "unsafe" and "unwise" chars.
    unsafeProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that never have a hostname.
    hostlessProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that always contain a // bit.
    slashedProtocol = {
      'http': true,
      'https': true,
      'ftp': true,
      'gopher': true,
      'file': true,
      'http:': true,
      'https:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    },
    querystring = __webpack_require__(/*! querystring */ "./node_modules/querystring-es3/index.js");

function urlParse(url, parseQueryString, slashesDenoteHost) {
  if (url && util.isObject(url) && url instanceof Url) return url;

  var u = new Url;
  u.parse(url, parseQueryString, slashesDenoteHost);
  return u;
}

Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
  if (!util.isString(url)) {
    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
  }

  // Copy chrome, IE, opera backslash-handling behavior.
  // Back slashes before the query string get converted to forward slashes
  // See: https://code.google.com/p/chromium/issues/detail?id=25916
  var queryIndex = url.indexOf('?'),
      splitter =
          (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
      uSplit = url.split(splitter),
      slashRegex = /\\/g;
  uSplit[0] = uSplit[0].replace(slashRegex, '/');
  url = uSplit.join(splitter);

  var rest = url;

  // trim before proceeding.
  // This is to support parse stuff like "  http://foo.com  \n"
  rest = rest.trim();

  if (!slashesDenoteHost && url.split('#').length === 1) {
    // Try fast path regexp
    var simplePath = simplePathPattern.exec(rest);
    if (simplePath) {
      this.path = rest;
      this.href = rest;
      this.pathname = simplePath[1];
      if (simplePath[2]) {
        this.search = simplePath[2];
        if (parseQueryString) {
          this.query = querystring.parse(this.search.substr(1));
        } else {
          this.query = this.search.substr(1);
        }
      } else if (parseQueryString) {
        this.search = '';
        this.query = {};
      }
      return this;
    }
  }

  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    var lowerProto = proto.toLowerCase();
    this.protocol = lowerProto;
    rest = rest.substr(proto.length);
  }

  // figure out if it's got a host
  // user@server is *always* interpreted as a hostname, and url
  // resolution will treat //foo/bar as host=foo,path=bar because that's
  // how the browser resolves relative URLs.
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var slashes = rest.substr(0, 2) === '//';
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] &&
      (slashes || (proto && !slashedProtocol[proto]))) {

    // there's a hostname.
    // the first instance of /, ?, ;, or # ends the host.
    //
    // If there is an @ in the hostname, then non-host chars *are* allowed
    // to the left of the last @ sign, unless some host-ending character
    // comes *before* the @-sign.
    // URLs are obnoxious.
    //
    // ex:
    // http://a@b@c/ => user:a@b host:c
    // http://a@b?@c => user:a host:c path:/?@c

    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
    // Review our test case against browsers more comprehensively.

    // find the first instance of any hostEndingChars
    var hostEnd = -1;
    for (var i = 0; i < hostEndingChars.length; i++) {
      var hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }

    // at this point, either we have an explicit point where the
    // auth portion cannot go past, or the last @ char is the decider.
    var auth, atSign;
    if (hostEnd === -1) {
      // atSign can be anywhere.
      atSign = rest.lastIndexOf('@');
    } else {
      // atSign must be in auth portion.
      // http://a@b/c@d => host:b auth:a path:/c@d
      atSign = rest.lastIndexOf('@', hostEnd);
    }

    // Now we have a portion which is definitely the auth.
    // Pull that off.
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = decodeURIComponent(auth);
    }

    // the host is the remaining to the left of the first non-host char
    hostEnd = -1;
    for (var i = 0; i < nonHostChars.length; i++) {
      var hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }
    // if we still have not hit it, then the entire thing is a host.
    if (hostEnd === -1)
      hostEnd = rest.length;

    this.host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);

    // pull out port.
    this.parseHost();

    // we've indicated that there is a hostname,
    // so even if it's empty, it has to be present.
    this.hostname = this.hostname || '';

    // if hostname begins with [ and ends with ]
    // assume that it's an IPv6 address.
    var ipv6Hostname = this.hostname[0] === '[' &&
        this.hostname[this.hostname.length - 1] === ']';

    // validate a little.
    if (!ipv6Hostname) {
      var hostparts = this.hostname.split(/\./);
      for (var i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part) continue;
        if (!part.match(hostnamePartPattern)) {
          var newpart = '';
          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              // we replace non-ASCII char with a temporary placeholder
              // we need this to make sure size of hostname is not
              // broken by replacing non-ASCII by nothing
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          }
          // we test again with ASCII char only
          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = '/' + notHost.join('.') + rest;
            }
            this.hostname = validParts.join('.');
            break;
          }
        }
      }
    }

    if (this.hostname.length > hostnameMaxLen) {
      this.hostname = '';
    } else {
      // hostnames are always lower case.
      this.hostname = this.hostname.toLowerCase();
    }

    if (!ipv6Hostname) {
      // IDNA Support: Returns a punycoded representation of "domain".
      // It only converts parts of the domain name that
      // have non-ASCII characters, i.e. it doesn't matter if
      // you call it with a domain that already is ASCII-only.
      this.hostname = punycode.toASCII(this.hostname);
    }

    var p = this.port ? ':' + this.port : '';
    var h = this.hostname || '';
    this.host = h + p;
    this.href += this.host;

    // strip [ and ] from the hostname
    // the host field still retains them, though
    if (ipv6Hostname) {
      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
      if (rest[0] !== '/') {
        rest = '/' + rest;
      }
    }
  }

  // now rest is set to the post-host stuff.
  // chop off any delim chars.
  if (!unsafeProtocol[lowerProto]) {

    // First, make 100% sure that any "autoEscape" chars get
    // escaped, even if encodeURIComponent doesn't think they
    // need to be.
    for (var i = 0, l = autoEscape.length; i < l; i++) {
      var ae = autoEscape[i];
      if (rest.indexOf(ae) === -1)
        continue;
      var esc = encodeURIComponent(ae);
      if (esc === ae) {
        esc = escape(ae);
      }
      rest = rest.split(ae).join(esc);
    }
  }


  // chop off from the tail first.
  var hash = rest.indexOf('#');
  if (hash !== -1) {
    // got a fragment string.
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf('?');
  if (qm !== -1) {
    this.search = rest.substr(qm);
    this.query = rest.substr(qm + 1);
    if (parseQueryString) {
      this.query = querystring.parse(this.query);
    }
    rest = rest.slice(0, qm);
  } else if (parseQueryString) {
    // no query string, but parseQueryString still requested
    this.search = '';
    this.query = {};
  }
  if (rest) this.pathname = rest;
  if (slashedProtocol[lowerProto] &&
      this.hostname && !this.pathname) {
    this.pathname = '/';
  }

  //to support http.request
  if (this.pathname || this.search) {
    var p = this.pathname || '';
    var s = this.search || '';
    this.path = p + s;
  }

  // finally, reconstruct the href based on what has been validated.
  this.href = this.format();
  return this;
};

// format a parsed object into a url string
function urlFormat(obj) {
  // ensure it's an object, and not a string url.
  // If it's an obj, this is a no-op.
  // this way, you can call url_format() on strings
  // to clean up potentially wonky urls.
  if (util.isString(obj)) obj = urlParse(obj);
  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
  return obj.format();
}

Url.prototype.format = function() {
  var auth = this.auth || '';
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ':');
    auth += '@';
  }

  var protocol = this.protocol || '',
      pathname = this.pathname || '',
      hash = this.hash || '',
      host = false,
      query = '';

  if (this.host) {
    host = auth + this.host;
  } else if (this.hostname) {
    host = auth + (this.hostname.indexOf(':') === -1 ?
        this.hostname :
        '[' + this.hostname + ']');
    if (this.port) {
      host += ':' + this.port;
    }
  }

  if (this.query &&
      util.isObject(this.query) &&
      Object.keys(this.query).length) {
    query = querystring.stringify(this.query);
  }

  var search = this.search || (query && ('?' + query)) || '';

  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
  // unless they had them to begin with.
  if (this.slashes ||
      (!protocol || slashedProtocol[protocol]) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
  } else if (!host) {
    host = '';
  }

  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
  if (search && search.charAt(0) !== '?') search = '?' + search;

  pathname = pathname.replace(/[?#]/g, function(match) {
    return encodeURIComponent(match);
  });
  search = search.replace('#', '%23');

  return protocol + host + pathname + search + hash;
};

function urlResolve(source, relative) {
  return urlParse(source, false, true).resolve(relative);
}

Url.prototype.resolve = function(relative) {
  return this.resolveObject(urlParse(relative, false, true)).format();
};

function urlResolveObject(source, relative) {
  if (!source) return relative;
  return urlParse(source, false, true).resolveObject(relative);
}

Url.prototype.resolveObject = function(relative) {
  if (util.isString(relative)) {
    var rel = new Url();
    rel.parse(relative, false, true);
    relative = rel;
  }

  var result = new Url();
  var tkeys = Object.keys(this);
  for (var tk = 0; tk < tkeys.length; tk++) {
    var tkey = tkeys[tk];
    result[tkey] = this[tkey];
  }

  // hash is always overridden, no matter what.
  // even href="" will remove it.
  result.hash = relative.hash;

  // if the relative url is empty, then there's nothing left to do here.
  if (relative.href === '') {
    result.href = result.format();
    return result;
  }

  // hrefs like //foo/bar always cut to the protocol.
  if (relative.slashes && !relative.protocol) {
    // take everything except the protocol from relative
    var rkeys = Object.keys(relative);
    for (var rk = 0; rk < rkeys.length; rk++) {
      var rkey = rkeys[rk];
      if (rkey !== 'protocol')
        result[rkey] = relative[rkey];
    }

    //urlParse appends trailing / to urls like http://www.example.com
    if (slashedProtocol[result.protocol] &&
        result.hostname && !result.pathname) {
      result.path = result.pathname = '/';
    }

    result.href = result.format();
    return result;
  }

  if (relative.protocol && relative.protocol !== result.protocol) {
    // if it's a known url protocol, then changing
    // the protocol does weird things
    // first, if it's not file:, then we MUST have a host,
    // and if there was a path
    // to begin with, then we MUST have a path.
    // if it is file:, then the host is dropped,
    // because that's known to be hostless.
    // anything else is assumed to be absolute.
    if (!slashedProtocol[relative.protocol]) {
      var keys = Object.keys(relative);
      for (var v = 0; v < keys.length; v++) {
        var k = keys[v];
        result[k] = relative[k];
      }
      result.href = result.format();
      return result;
    }

    result.protocol = relative.protocol;
    if (!relative.host && !hostlessProtocol[relative.protocol]) {
      var relPath = (relative.pathname || '').split('/');
      while (relPath.length && !(relative.host = relPath.shift()));
      if (!relative.host) relative.host = '';
      if (!relative.hostname) relative.hostname = '';
      if (relPath[0] !== '') relPath.unshift('');
      if (relPath.length < 2) relPath.unshift('');
      result.pathname = relPath.join('/');
    } else {
      result.pathname = relative.pathname;
    }
    result.search = relative.search;
    result.query = relative.query;
    result.host = relative.host || '';
    result.auth = relative.auth;
    result.hostname = relative.hostname || relative.host;
    result.port = relative.port;
    // to support http.request
    if (result.pathname || result.search) {
      var p = result.pathname || '';
      var s = result.search || '';
      result.path = p + s;
    }
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  }

  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
      isRelAbs = (
          relative.host ||
          relative.pathname && relative.pathname.charAt(0) === '/'
      ),
      mustEndAbs = (isRelAbs || isSourceAbs ||
                    (result.host && relative.pathname)),
      removeAllDots = mustEndAbs,
      srcPath = result.pathname && result.pathname.split('/') || [],
      relPath = relative.pathname && relative.pathname.split('/') || [],
      psychotic = result.protocol && !slashedProtocol[result.protocol];

  // if the url is a non-slashed url, then relative
  // links like ../.. should be able
  // to crawl up to the hostname, as well.  This is strange.
  // result.protocol has already been set by now.
  // Later on, put the first path part into the host field.
  if (psychotic) {
    result.hostname = '';
    result.port = null;
    if (result.host) {
      if (srcPath[0] === '') srcPath[0] = result.host;
      else srcPath.unshift(result.host);
    }
    result.host = '';
    if (relative.protocol) {
      relative.hostname = null;
      relative.port = null;
      if (relative.host) {
        if (relPath[0] === '') relPath[0] = relative.host;
        else relPath.unshift(relative.host);
      }
      relative.host = null;
    }
    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
  }

  if (isRelAbs) {
    // it's absolute.
    result.host = (relative.host || relative.host === '') ?
                  relative.host : result.host;
    result.hostname = (relative.hostname || relative.hostname === '') ?
                      relative.hostname : result.hostname;
    result.search = relative.search;
    result.query = relative.query;
    srcPath = relPath;
    // fall through to the dot-handling below.
  } else if (relPath.length) {
    // it's relative
    // throw away the existing file, and take the new path instead.
    if (!srcPath) srcPath = [];
    srcPath.pop();
    srcPath = srcPath.concat(relPath);
    result.search = relative.search;
    result.query = relative.query;
  } else if (!util.isNullOrUndefined(relative.search)) {
    // just pull out the search.
    // like href='?foo'.
    // Put this after the other two cases because it simplifies the booleans
    if (psychotic) {
      result.hostname = result.host = srcPath.shift();
      //occationaly the auth can get stuck only in host
      //this especially happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
      var authInHost = result.host && result.host.indexOf('@') > 0 ?
                       result.host.split('@') : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }
    result.search = relative.search;
    result.query = relative.query;
    //to support http.request
    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : '') +
                    (result.search ? result.search : '');
    }
    result.href = result.format();
    return result;
  }

  if (!srcPath.length) {
    // no path at all.  easy.
    // we've already handled the other stuff above.
    result.pathname = null;
    //to support http.request
    if (result.search) {
      result.path = '/' + result.search;
    } else {
      result.path = null;
    }
    result.href = result.format();
    return result;
  }

  // if a url ENDs in . or .., then it must get a trailing slash.
  // however, if it ends in anything else non-slashy,
  // then it must NOT get a trailing slash.
  var last = srcPath.slice(-1)[0];
  var hasTrailingSlash = (
      (result.host || relative.host || srcPath.length > 1) &&
      (last === '.' || last === '..') || last === '');

  // strip single dots, resolve double dots to parent dir
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = srcPath.length; i >= 0; i--) {
    last = srcPath[i];
    if (last === '.') {
      srcPath.splice(i, 1);
    } else if (last === '..') {
      srcPath.splice(i, 1);
      up++;
    } else if (up) {
      srcPath.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (!mustEndAbs && !removeAllDots) {
    for (; up--; up) {
      srcPath.unshift('..');
    }
  }

  if (mustEndAbs && srcPath[0] !== '' &&
      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
    srcPath.unshift('');
  }

  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
    srcPath.push('');
  }

  var isAbsolute = srcPath[0] === '' ||
      (srcPath[0] && srcPath[0].charAt(0) === '/');

  // put the host back
  if (psychotic) {
    result.hostname = result.host = isAbsolute ? '' :
                                    srcPath.length ? srcPath.shift() : '';
    //occationaly the auth can get stuck only in host
    //this especially happens in cases like
    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
    var authInHost = result.host && result.host.indexOf('@') > 0 ?
                     result.host.split('@') : false;
    if (authInHost) {
      result.auth = authInHost.shift();
      result.host = result.hostname = authInHost.shift();
    }
  }

  mustEndAbs = mustEndAbs || (result.host && srcPath.length);

  if (mustEndAbs && !isAbsolute) {
    srcPath.unshift('');
  }

  if (!srcPath.length) {
    result.pathname = null;
    result.path = null;
  } else {
    result.pathname = srcPath.join('/');
  }

  //to support request.http
  if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
    result.path = (result.pathname ? result.pathname : '') +
                  (result.search ? result.search : '');
  }
  result.auth = relative.auth || result.auth;
  result.slashes = result.slashes || relative.slashes;
  result.href = result.format();
  return result;
};

Url.prototype.parseHost = function() {
  var host = this.host;
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ':') {
      this.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host) this.hostname = host;
};


/***/ }),

/***/ "./node_modules/url/util.js":
/*!**********************************!*\
  !*** ./node_modules/url/util.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  isString: function(arg) {
    return typeof(arg) === 'string';
  },
  isObject: function(arg) {
    return typeof(arg) === 'object' && arg !== null;
  },
  isNull: function(arg) {
    return arg === null;
  },
  isNullOrUndefined: function(arg) {
    return arg == null;
  }
};


/***/ }),

/***/ "./node_modules/webpack-dev-server/client/index.js?http://localhost:8080":
/*!*********************************************************!*\
  !*** (webpack)-dev-server/client?http://localhost:8080 ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__resourceQuery) {

/* global __resourceQuery WorkerGlobalScope self */
/* eslint prefer-destructuring: off */

var url = __webpack_require__(/*! url */ "./node_modules/url/url.js");
var stripAnsi = __webpack_require__(/*! strip-ansi */ "./node_modules/strip-ansi/index.js");
var log = __webpack_require__(/*! loglevel */ "./node_modules/loglevel/lib/loglevel.js").getLogger('webpack-dev-server');
var socket = __webpack_require__(/*! ./socket */ "./node_modules/webpack-dev-server/client/socket.js");
var overlay = __webpack_require__(/*! ./overlay */ "./node_modules/webpack-dev-server/client/overlay.js");

function getCurrentScriptSource() {
  // `document.currentScript` is the most accurate way to find the current script,
  // but is not supported in all browsers.
  if (document.currentScript) {
    return document.currentScript.getAttribute('src');
  }
  // Fall back to getting all scripts in the document.
  var scriptElements = document.scripts || [];
  var currentScript = scriptElements[scriptElements.length - 1];
  if (currentScript) {
    return currentScript.getAttribute('src');
  }
  // Fail as there was no script to use.
  throw new Error('[WDS] Failed to get current script source.');
}

var urlParts = void 0;
var hotReload = true;
if (typeof window !== 'undefined') {
  var qs = window.location.search.toLowerCase();
  hotReload = qs.indexOf('hotreload=false') === -1;
}
if (true) {
  // If this bundle is inlined, use the resource query to get the correct url.
  urlParts = url.parse(__resourceQuery.substr(1));
} else { var scriptHost; }

if (!urlParts.port || urlParts.port === '0') {
  urlParts.port = self.location.port;
}

var _hot = false;
var initial = true;
var currentHash = '';
var useWarningOverlay = false;
var useErrorOverlay = false;
var useProgress = false;

var INFO = 'info';
var WARNING = 'warning';
var ERROR = 'error';
var NONE = 'none';

// Set the default log level
log.setDefaultLevel(INFO);

// Send messages to the outside, so plugins can consume it.
function sendMsg(type, data) {
  if (typeof self !== 'undefined' && (typeof WorkerGlobalScope === 'undefined' || !(self instanceof WorkerGlobalScope))) {
    self.postMessage({
      type: 'webpack' + type,
      data: data
    }, '*');
  }
}

var onSocketMsg = {
  hot: function hot() {
    _hot = true;
    log.info('[WDS] Hot Module Replacement enabled.');
  },
  invalid: function invalid() {
    log.info('[WDS] App updated. Recompiling...');
    // fixes #1042. overlay doesn't clear if errors are fixed but warnings remain.
    if (useWarningOverlay || useErrorOverlay) overlay.clear();
    sendMsg('Invalid');
  },
  hash: function hash(_hash) {
    currentHash = _hash;
  },

  'still-ok': function stillOk() {
    log.info('[WDS] Nothing changed.');
    if (useWarningOverlay || useErrorOverlay) overlay.clear();
    sendMsg('StillOk');
  },
  'log-level': function logLevel(level) {
    var hotCtx = __webpack_require__("./node_modules/webpack/hot sync ^\\.\\/log$");
    if (hotCtx.keys().indexOf('./log') !== -1) {
      hotCtx('./log').setLogLevel(level);
    }
    switch (level) {
      case INFO:
      case ERROR:
        log.setLevel(level);
        break;
      case WARNING:
        // loglevel's warning name is different from webpack's
        log.setLevel('warn');
        break;
      case NONE:
        log.disableAll();
        break;
      default:
        log.error('[WDS] Unknown clientLogLevel \'' + level + '\'');
    }
  },
  overlay: function overlay(value) {
    if (typeof document !== 'undefined') {
      if (typeof value === 'boolean') {
        useWarningOverlay = false;
        useErrorOverlay = value;
      } else if (value) {
        useWarningOverlay = value.warnings;
        useErrorOverlay = value.errors;
      }
    }
  },
  progress: function progress(_progress) {
    if (typeof document !== 'undefined') {
      useProgress = _progress;
    }
  },

  'progress-update': function progressUpdate(data) {
    if (useProgress) log.info('[WDS] ' + data.percent + '% - ' + data.msg + '.');
    sendMsg('Progress', data);
  },
  ok: function ok() {
    sendMsg('Ok');
    if (useWarningOverlay || useErrorOverlay) overlay.clear();
    if (initial) return initial = false; // eslint-disable-line no-return-assign
    reloadApp();
  },

  'content-changed': function contentChanged() {
    log.info('[WDS] Content base changed. Reloading...');
    self.location.reload();
  },
  warnings: function warnings(_warnings) {
    log.warn('[WDS] Warnings while compiling.');
    var strippedWarnings = _warnings.map(function (warning) {
      return stripAnsi(warning);
    });
    sendMsg('Warnings', strippedWarnings);
    for (var i = 0; i < strippedWarnings.length; i++) {
      log.warn(strippedWarnings[i]);
    }
    if (useWarningOverlay) overlay.showMessage(_warnings);

    if (initial) return initial = false; // eslint-disable-line no-return-assign
    reloadApp();
  },
  errors: function errors(_errors) {
    log.error('[WDS] Errors while compiling. Reload prevented.');
    var strippedErrors = _errors.map(function (error) {
      return stripAnsi(error);
    });
    sendMsg('Errors', strippedErrors);
    for (var i = 0; i < strippedErrors.length; i++) {
      log.error(strippedErrors[i]);
    }
    if (useErrorOverlay) overlay.showMessage(_errors);
    initial = false;
  },
  error: function error(_error) {
    log.error(_error);
  },
  close: function close() {
    log.error('[WDS] Disconnected!');
    sendMsg('Close');
  }
};

var hostname = urlParts.hostname;
var protocol = urlParts.protocol;

// check ipv4 and ipv6 `all hostname`
if (hostname === '0.0.0.0' || hostname === '::') {
  // why do we need this check?
  // hostname n/a for file protocol (example, when using electron, ionic)
  // see: https://github.com/webpack/webpack-dev-server/pull/384
  // eslint-disable-next-line no-bitwise
  if (self.location.hostname && !!~self.location.protocol.indexOf('http')) {
    hostname = self.location.hostname;
  }
}

// `hostname` can be empty when the script path is relative. In that case, specifying
// a protocol would result in an invalid URL.
// When https is used in the app, secure websockets are always necessary
// because the browser doesn't accept non-secure websockets.
if (hostname && (self.location.protocol === 'https:' || urlParts.hostname === '0.0.0.0')) {
  protocol = self.location.protocol;
}

var socketUrl = url.format({
  protocol: protocol,
  auth: urlParts.auth,
  hostname: hostname,
  port: urlParts.port,
  pathname: urlParts.path == null || urlParts.path === '/' ? '/sockjs-node' : urlParts.path
});

socket(socketUrl, onSocketMsg);

var isUnloading = false;
self.addEventListener('beforeunload', function () {
  isUnloading = true;
});

function reloadApp() {
  if (isUnloading || !hotReload) {
    return;
  }
  if (_hot) {
    log.info('[WDS] App hot update...');
    // eslint-disable-next-line global-require
    var hotEmitter = __webpack_require__(/*! webpack/hot/emitter */ "./node_modules/webpack/hot/emitter.js");
    hotEmitter.emit('webpackHotUpdate', currentHash);
    if (typeof self !== 'undefined' && self.window) {
      // broadcast update to window
      self.postMessage('webpackHotUpdate' + currentHash, '*');
    }
  } else {
    var rootWindow = self;
    // use parent window for reload (in case we're in an iframe with no valid src)
    var intervalId = self.setInterval(function () {
      if (rootWindow.location.protocol !== 'about:') {
        // reload immediately if protocol is valid
        applyReload(rootWindow, intervalId);
      } else {
        rootWindow = rootWindow.parent;
        if (rootWindow.parent === rootWindow) {
          // if parent equals current window we've reached the root which would continue forever, so trigger a reload anyways
          applyReload(rootWindow, intervalId);
        }
      }
    });
  }

  function applyReload(rootWindow, intervalId) {
    clearInterval(intervalId);
    log.info('[WDS] App updated. Reloading...');
    rootWindow.location.reload();
  }
}
/* WEBPACK VAR INJECTION */}.call(this, "?http://localhost:8080"))

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/overlay.js":
/*!**********************************************!*\
  !*** (webpack)-dev-server/client/overlay.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// The error overlay is inspired (and mostly copied) from Create React App (https://github.com/facebookincubator/create-react-app)
// They, in turn, got inspired by webpack-hot-middleware (https://github.com/glenjamin/webpack-hot-middleware).

var ansiHTML = __webpack_require__(/*! ansi-html */ "./node_modules/ansi-html/index.js");
var Entities = __webpack_require__(/*! html-entities */ "./node_modules/html-entities/index.js").AllHtmlEntities;

var entities = new Entities();

var colors = {
  reset: ['transparent', 'transparent'],
  black: '181818',
  red: 'E36049',
  green: 'B3CB74',
  yellow: 'FFD080',
  blue: '7CAFC2',
  magenta: '7FACCA',
  cyan: 'C3C2EF',
  lightgrey: 'EBE7E3',
  darkgrey: '6D7891'
};
ansiHTML.setColors(colors);

function createOverlayIframe(onIframeLoad) {
  var iframe = document.createElement('iframe');
  iframe.id = 'webpack-dev-server-client-overlay';
  iframe.src = 'about:blank';
  iframe.style.position = 'fixed';
  iframe.style.left = 0;
  iframe.style.top = 0;
  iframe.style.right = 0;
  iframe.style.bottom = 0;
  iframe.style.width = '100vw';
  iframe.style.height = '100vh';
  iframe.style.border = 'none';
  iframe.style.zIndex = 9999999999;
  iframe.onload = onIframeLoad;
  return iframe;
}

function addOverlayDivTo(iframe) {
  var div = iframe.contentDocument.createElement('div');
  div.id = 'webpack-dev-server-client-overlay-div';
  div.style.position = 'fixed';
  div.style.boxSizing = 'border-box';
  div.style.left = 0;
  div.style.top = 0;
  div.style.right = 0;
  div.style.bottom = 0;
  div.style.width = '100vw';
  div.style.height = '100vh';
  div.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
  div.style.color = '#E8E8E8';
  div.style.fontFamily = 'Menlo, Consolas, monospace';
  div.style.fontSize = 'large';
  div.style.padding = '2rem';
  div.style.lineHeight = '1.2';
  div.style.whiteSpace = 'pre-wrap';
  div.style.overflow = 'auto';
  iframe.contentDocument.body.appendChild(div);
  return div;
}

var overlayIframe = null;
var overlayDiv = null;
var lastOnOverlayDivReady = null;

function ensureOverlayDivExists(onOverlayDivReady) {
  if (overlayDiv) {
    // Everything is ready, call the callback right away.
    onOverlayDivReady(overlayDiv);
    return;
  }

  // Creating an iframe may be asynchronous so we'll schedule the callback.
  // In case of multiple calls, last callback wins.
  lastOnOverlayDivReady = onOverlayDivReady;

  if (overlayIframe) {
    // We're already creating it.
    return;
  }

  // Create iframe and, when it is ready, a div inside it.
  overlayIframe = createOverlayIframe(function () {
    overlayDiv = addOverlayDivTo(overlayIframe);
    // Now we can talk!
    lastOnOverlayDivReady(overlayDiv);
  });

  // Zalgo alert: onIframeLoad() will be called either synchronously
  // or asynchronously depending on the browser.
  // We delay adding it so `overlayIframe` is set when `onIframeLoad` fires.
  document.body.appendChild(overlayIframe);
}

function showMessageOverlay(message) {
  ensureOverlayDivExists(function (div) {
    // Make it look similar to our terminal.
    div.innerHTML = '<span style="color: #' + colors.red + '">Failed to compile.</span><br><br>' + ansiHTML(entities.encode(message));
  });
}

function destroyErrorOverlay() {
  if (!overlayDiv) {
    // It is not there in the first place.
    return;
  }

  // Clean up and reset internal state.
  document.body.removeChild(overlayIframe);
  overlayDiv = null;
  overlayIframe = null;
  lastOnOverlayDivReady = null;
}

// Successful compilation.
exports.clear = function handleSuccess() {
  destroyErrorOverlay();
};

// Compilation with errors (e.g. syntax error or missing modules).
exports.showMessage = function handleMessage(messages) {
  showMessageOverlay(messages[0]);
};

/***/ }),

/***/ "./node_modules/webpack-dev-server/client/socket.js":
/*!*********************************************!*\
  !*** (webpack)-dev-server/client/socket.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var SockJS = __webpack_require__(/*! sockjs-client/dist/sockjs */ "./node_modules/sockjs-client/dist/sockjs.js");

var retries = 0;
var sock = null;

var socket = function initSocket(url, handlers) {
  sock = new SockJS(url);

  sock.onopen = function onopen() {
    retries = 0;
  };

  sock.onclose = function onclose() {
    if (retries === 0) {
      handlers.close();
    }

    // Try to reconnect.
    sock = null;

    // After 10 retries stop trying, to prevent logspam.
    if (retries <= 10) {
      // Exponentially increase timeout to reconnect.
      // Respectfully copied from the package `got`.
      // eslint-disable-next-line no-mixed-operators, no-restricted-properties
      var retryInMs = 1000 * Math.pow(2, retries) + Math.random() * 100;
      retries += 1;

      setTimeout(function () {
        socket(url, handlers);
      }, retryInMs);
    }
  };

  sock.onmessage = function onmessage(e) {
    // This assumes that all data sent via the websocket is JSON.
    var msg = JSON.parse(e.data);
    if (handlers[msg.type]) {
      handlers[msg.type](msg.data);
    }
  };
};

module.exports = socket;

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./node_modules/webpack/hot sync ^\\.\\/log$":
/*!*************************************************!*\
  !*** (webpack)/hot sync nonrecursive ^\.\/log$ ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./log": "./node_modules/webpack/hot/log.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) { // check for number or string
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return id;
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./node_modules/webpack/hot sync ^\\.\\/log$";

/***/ }),

/***/ "./node_modules/webpack/hot/emitter.js":
/*!********************************!*\
  !*** (webpack)/hot/emitter.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var EventEmitter = __webpack_require__(/*! events */ "./node_modules/events/events.js");
module.exports = new EventEmitter();


/***/ }),

/***/ "./node_modules/webpack/hot/log.js":
/*!****************************!*\
  !*** (webpack)/hot/log.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

var logLevel = "info";

function dummy() {}

function shouldLog(level) {
	var shouldLog =
		(logLevel === "info" && level === "info") ||
		(["info", "warning"].indexOf(logLevel) >= 0 && level === "warning") ||
		(["info", "warning", "error"].indexOf(logLevel) >= 0 && level === "error");
	return shouldLog;
}

function logGroup(logFn) {
	return function(level, msg) {
		if (shouldLog(level)) {
			logFn(msg);
		}
	};
}

module.exports = function(level, msg) {
	if (shouldLog(level)) {
		if (level === "info") {
			console.log(msg);
		} else if (level === "warning") {
			console.warn(msg);
		} else if (level === "error") {
			console.error(msg);
		}
	}
};

/* eslint-disable node/no-unsupported-features/node-builtins */
var group = console.group || dummy;
var groupCollapsed = console.groupCollapsed || dummy;
var groupEnd = console.groupEnd || dummy;
/* eslint-enable node/no-unsupported-features/node-builtins */

module.exports.group = logGroup(group);

module.exports.groupCollapsed = logGroup(groupCollapsed);

module.exports.groupEnd = logGroup(groupEnd);

module.exports.setLogLevel = function(level) {
	logLevel = level;
};


/***/ }),

/***/ "./src/scripts/CoroutineManager.ts":
/*!*****************************************!*\
  !*** ./src/scripts/CoroutineManager.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
//import { Time } from "../core/Time";
var PIXI = __webpack_require__(/*! pixi.js */ "pixi.js");
//const { ccclass, property, executionOrder } = cc._decorator;
var WaitForSeconds = /** @class */ (function () {
    function WaitForSeconds(sec) {
        this.sec = sec;
    }
    return WaitForSeconds;
}());
exports.WaitForSeconds = WaitForSeconds;
var Coroutine = /** @class */ (function () {
    function Coroutine(iterator, validator) {
        this.promiseResolves = [];
        this.id = Coroutine.idMaker++;
        this.iterator = iterator;
        this.validator = validator;
        this.done = false;
    }
    Object.defineProperty(Coroutine.prototype, "done", {
        get: function () { return this._done; },
        set: function (value) {
            this._done = value;
            if (value === true) {
                this.promiseResolves.forEach(function (r) { return r(); });
                this.promiseResolves = [];
            }
        },
        enumerable: true,
        configurable: true
    });
    Coroutine.prototype.getDonePromise = function () {
        var _this = this;
        return new Promise(function (resolve) { return _this._done ? resolve() : _this.promiseResolves.push(resolve); });
    };
    Coroutine.idMaker = 1;
    return Coroutine;
}());
exports.Coroutine = Coroutine;
var CoroutineManager = /** @class */ (function (_super) {
    __extends(CoroutineManager, _super);
    function CoroutineManager() {
        var _this = _super.call(this) || this;
        _this.coroutines = [];
        _this.totalElapsed = 0;
        CoroutineManager.instance = _this;
        return _this;
    }
    CoroutineManager.startCoroutine = function (iterator, validator) {
        // instance 가 생성되기 전에 불리면 안됨.
        return this.instance._startCoroutine(iterator, validator);
    };
    CoroutineManager.stopCoroutine = function (coroutine) {
        this.instance._removeCoroutine(coroutine);
    };
    // update(dt: number) {
    //     //Time.update(dt);
    // }
    CoroutineManager.prototype.lateUpdate = function () {
        this.totalElapsed = PIXI.ticker.shared.lastTime * 0.001; //dt;
        if (this.coroutines.length === 0)
            return;
        var coroutines = this.coroutines.slice(0);
        for (var i = 0; i < coroutines.length; i++) {
            var c = coroutines[i];
            var done = this.runOnce(c);
            if (done) {
                this._removeCoroutine(c);
            }
        }
    };
    CoroutineManager.prototype._startCoroutine = function (iterator, validator) {
        var cs = new Coroutine(iterator, validator);
        var done = this.runOnce(cs);
        if (!done) {
            cs.firstFrame = true;
            this.coroutines.push(cs);
        }
        return cs;
    };
    CoroutineManager.prototype._removeCoroutine = function (coroutine) {
        var coroutines = this.coroutines;
        for (var i = 0; i < coroutines.length; i++) {
            var c = coroutines[i];
            if (c === coroutine) {
                coroutines.splice(i, 1);
                break;
            }
        }
    };
    CoroutineManager.prototype.runOnce = function (c) {
        if (c.validator !== null) {
            if (c.validator instanceof PIXI.Container) {
                if (!c.validator || !c.validator.visible) {
                    c.done = true;
                    return { doneValue: undefined };
                }
                ;
            }
            else if (typeof c.validator === "function" && !c.validator()) {
                c.done = true;
                return { doneValue: undefined };
            }
        }
        if (c.nestedCoroutine) {
            var done = this.runOnce(c.nestedCoroutine);
            if (done) {
                delete c.nestedCoroutine;
                c.nestedCoroutineDoneValue = done.doneValue;
            }
            else {
                return;
            }
        }
        if (c.firstFrame) {
            c.firstFrame = false;
            return;
        }
        if (c.availableTiming && c.availableTiming > this.totalElapsed) {
            return;
        }
        var next = c.iterator.next(c.nestedCoroutineDoneValue);
        delete c.nestedCoroutineDoneValue;
        if (next.done) {
            c.done = true;
            return { doneValue: next.value };
        }
        else if (!next.value) {
            return;
        }
        else if (next.value instanceof WaitForSeconds) {
            c.availableTiming = this.totalElapsed + next.value.sec;
        }
        else if (next.value instanceof Coroutine) {
            this._removeCoroutine(next.value);
            c.nestedCoroutine = next.value;
        }
        else if (next.value.toString() === "[object Object]" || next.value.toString() === "[object Generator]") { // babel이 번역해준 것에서는 generator가 [object Generator]였는데 지금은typescript가 번역해 주며, [object Object]로 온다. 흠...
            var cs = new Coroutine(next.value, c.validator);
            var done = this.runOnce(cs);
            if (!done) {
                c.nestedCoroutine = cs;
            }
        }
        else {
            throw "Wrong yield";
        }
        return;
    };
    return CoroutineManager;
}(PIXI.Container));
exports.CoroutineManager = CoroutineManager;


/***/ }),

/***/ "./src/scripts/main.ts":
/*!*****************************!*\
  !*** ./src/scripts/main.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var PIXI = __webpack_require__(/*! pixi.js */ "pixi.js");
__webpack_require__(/*! pixi-spine */ "./node_modules/pixi-spine/bin/pixi-spine.js");
var sub_1 = __webpack_require__(/*! ./sub */ "./src/scripts/sub.ts");
var CoroutineManager_1 = __webpack_require__(/*! ./CoroutineManager */ "./src/scripts/CoroutineManager.ts");
var Main = /** @class */ (function () {
    function Main() {
        this.platformType = "Car";
        this.adMobId = "ca-app-pub-3342072736104210~8202836574";
        this.adMobSKD = "ca-app-pub-3342072736104210/5848135972";
        console.log("Main Init start");
        this.init();
    }
    Main.prototype.init = function () {
        var _this = this;
        this.app = new PIXI.Application({
            width: 846,
            height: 412,
            antialias: true,
            transparent: false,
            resolution: 1
        });
        this.initCoroutine();
        this.initTextField();
        this.initAd();
        this.showBannerFunc();
        document.body.appendChild(this.app.view);
        console.log("init");
        console.log(this.app);
        // 일반 이미지 로드 
        var loader1 = new PIXI.loaders.Loader();
        loader1.add("images/cat.png").load(function (loader, res) {
            _this.setup(loader, res);
        });
        var loader2 = new PIXI.loaders.Loader();
        loader2.add('power_shoot', 'images/spine/power_shoot.json').load(function (loader, res) {
            _this.onAssetsLoaded(loader, res);
        });
        this.app.ticker.add(function (deltaTime) {
            _this.update(deltaTime);
        });
    };
    Main.prototype.onAssetsLoaded = function (loader, res) {
        console.log(res);
        this.dragon = new PIXI.spine.Spine(res.power_shoot.spineData);
        this.dragon.skeleton.setToSetupPose();
        this.dragon.update(0);
        this.dragon.autoUpdate = false;
        // create a container for the spine animation and add the animation to it
        var dragonCage = new PIXI.Container();
        dragonCage.addChild(this.dragon);
        // measure the spine animation and position it inside its container to align it to the origin
        var localRect = this.dragon.getLocalBounds();
        this.dragon.position.set(-localRect.x, -localRect.y);
        // now we can scale, position and rotate the container as any other display object
        var scale = Math.min((this.app.screen.width * 0.7) / dragonCage.width, (this.app.screen.height * 0.7) / dragonCage.height);
        dragonCage.scale.set(scale, scale);
        dragonCage.position.set((this.app.screen.width - dragonCage.width) * 0.5, (this.app.screen.height - dragonCage.height) * 0.5);
        // add the container to the stage
        this.app.stage.addChild(dragonCage);
        // once position and scaled, set the animation to play
        this.dragon.state.setAnimation(0, 'play_02', true);
        //this.app.start();
    };
    Main.prototype.initCoroutine = function () {
        this.app.ticker.add(function (deltaTime) {
            CoroutineManager_1.CoroutineManager.instance.lateUpdate();
        });
    };
    Main.prototype.update = function (deltaTime) {
        if (this.containerCar)
            this.containerCar.rotation += 0.01;
        if (this.dragon)
            this.dragon.update(0.016);
    };
    Main.prototype.setup = function (loader, res) {
        return __awaiter(this, void 0, void 0, function () {
            var cat, platform, coroutine;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("setups");
                        console.log(this.app);
                        console.log(res);
                        cat = new PIXI.Sprite(res["images/cat.png"].texture);
                        cat.x = 100;
                        //Add the cat to the stage
                        this.app.stage.addChild(cat);
                        this.containerCar = new sub_1.SubCar();
                        this.containerCar.x = 300;
                        this.containerCar.y = 400;
                        this.app.stage.addChild(this.containerCar);
                        this.containerHot = new sub_1.SubHot();
                        //this.containerHot.init();
                        this.containerHot.x = 0;
                        this.containerHot.y = 400;
                        this.app.stage.addChild(this.containerHot);
                        if (this.platformType === "Car") {
                            platform = this.containerCar;
                        }
                        else {
                            platform = this.containerHot;
                        }
                        platform.init();
                        console.log("type : " + platform.isType());
                        //async test
                        this.asyncTest();
                        coroutine = CoroutineManager_1.CoroutineManager.startCoroutine(this.coroutineClock(), null);
                        return [4 /*yield*/, coroutine.getDonePromise()];
                    case 1:
                        _a.sent();
                        console.log("wait coroutine");
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.coroutineClock = function () {
        var index;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    index = 0;
                    _a.label = 1;
                case 1:
                    if (!(index < 5)) return [3 /*break*/, 4];
                    return [4 /*yield*/, new CoroutineManager_1.WaitForSeconds(1)];
                case 2:
                    _a.sent();
                    console.log("time : " + index);
                    _a.label = 3;
                case 3:
                    index++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    };
    Main.prototype.asyncTest = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result1, result2, result3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.delay3("a", 1000)];
                    case 1:
                        result1 = _a.sent();
                        return [4 /*yield*/, this.delay3(result1 + "b", 500)];
                    case 2:
                        result2 = _a.sent();
                        return [4 /*yield*/, this.delay3(result2 + "c", 100)];
                    case 3:
                        result3 = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.delay3 = function (msg, ms) {
        return new Promise(function (resolve) {
            setTimeout(function () {
                resolve(msg);
            }, ms);
        }).then(function (v) {
            console.log(v + " " + ms + "ms");
            return v;
        });
    };
    Main.prototype.initTextField = function () {
        var style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 36,
            fontStyle: 'italic',
            fontWeight: 'bold',
            fill: ['#ffffff', '#00ff99'],
            stroke: '#4a1850',
            strokeThickness: 5,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
            wordWrap: true,
            wordWrapWidth: 440
        });
        var windowOuterWidth = window.innerWidth;
        var windowOuterHeight = window.innerHeight;
        var richText = new PIXI.Text(windowOuterWidth + " = " + windowOuterHeight, style);
        richText.x = 0;
        richText.y = 0;
        this.app.stage.addChild(richText);
    };
    Main.prototype.initAd = function () {
        try {
            // if (window.plugins && window.plugins.AdMob) {
            //     var ad_units = {
            //         ios: {
            //             banner: 'ca-app-pub-xxxxxxxxxxx/xxxxxxxxxxx',		//PUT ADMOB ADCODE HERE
            //             interstitial: 'ca-app-pub-xxxxxxxxxxx/xxxxxxxxxxx'	//PUT ADMOB ADCODE HERE
            //         },
            //         android: {
            //             banner: this.adMobId,		//PUT ADMOB ADCODE HERE
            //             interstitial: 'ca-app-pub-xxxxxxxxxxx/xxxxxxxxxxx'	//PUT ADMOB ADCODE HERE
            //         }
            //     };
            //     var admobid = (/(android)/i.test(navigator.userAgent)) ? ad_units.android : ad_units.ios;
            //     window.plugins.AdMob.setOptions({
            //         publisherId: admobid.banner,
            //         interstitialAdId: admobid.interstitial,
            //         adSize: window.plugins.AdMob.AD_SIZE.SMART_BANNER,	//use SMART_BANNER, BANNER, LARGE_BANNER, IAB_MRECT, IAB_BANNER, IAB_LEADERBOARD
            //         bannerAtTop: false, // set to true, to put banner at top
            //         overlap: true, // banner will overlap webview
            //         offsetTopBar: false, // set to true to avoid ios7 status bar overlap
            //         isTesting: true, // receiving test ad
            //         autoShow: true // auto show interstitial ad when loaded
            //     });
            //     this.registerAdEvents();
            // } else {
            //     //alert( 'admob plugin not ready' );
            // }
        }
        catch (e) {
        }
    };
    Main.prototype.registerAdEvents = function () {
        document.addEventListener('onReceiveAd', function () { });
        document.addEventListener('onFailedToReceiveAd', function (data) { });
        document.addEventListener('onPresentAd', function () { });
        document.addEventListener('onDismissAd', function () { });
        document.addEventListener('onLeaveToAd', function () { });
        document.addEventListener('onReceiveInterstitialAd', function () { });
        document.addEventListener('onPresentInterstitialAd', function () { });
        document.addEventListener('onDismissInterstitialAd', function () { });
    };
    Main.prototype.showBannerFunc = function () {
        //window.plugins.AdMob.createBannerView();
    };
    return Main;
}());
exports.Main = Main;
var coroutineManager = new CoroutineManager_1.CoroutineManager();
var main = new Main();


/***/ }),

/***/ "./src/scripts/sub.ts":
/*!****************************!*\
  !*** ./src/scripts/sub.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var PIXI = __webpack_require__(/*! pixi.js */ "pixi.js");
var Sub = /** @class */ (function (_super) {
    __extends(Sub, _super);
    function Sub() {
        return _super.call(this) || this;
    }
    Sub.prototype.init = function () {
        console.log("Sub");
    };
    Sub.prototype.setup = function () {
        console.log("Setup");
    };
    Sub.prototype.isType = function () {
        return "types";
    };
    return Sub;
}(PIXI.Container));
exports.Sub = Sub;
var SubCar = /** @class */ (function (_super) {
    __extends(SubCar, _super);
    function SubCar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SubCar.prototype.init = function () {
        var _this = this;
        _super.prototype.init.call(this);
        console.log("SubCar Override");
        //static loader rule
        PIXI.loader
            .add("images/mon.png")
            .load(function () {
            _this.setup();
        });
    };
    SubCar.prototype.setup = function () {
        console.log("Sub Setup");
        var mon = new PIXI.Sprite(PIXI.loader.resources["images/mon.png"].texture);
        mon.x = 100;
        this.addChild(mon);
    };
    SubCar.prototype.isType = function () {
        return "Car";
    };
    return SubCar;
}(Sub));
exports.SubCar = SubCar;
var SubHot = /** @class */ (function (_super) {
    __extends(SubHot, _super);
    function SubHot() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SubHot.prototype.init = function () {
        var _this = this;
        _super.prototype.init.call(this);
        console.log("SubHot Override");
        this.loader = new PIXI.loaders.Loader();
        this.loader.add("images/lobby/icon_04.png").load(function () {
            _this.setup();
        });
    };
    SubHot.prototype.setup = function () {
        console.log("Sub Setup");
        console.log(this.loader);
        var mon = new PIXI.Sprite(this.loader.resources["images/lobby/icon_04.png"].texture);
        mon.x = 0;
        this.addChild(mon);
    };
    SubHot.prototype.isType = function () {
        return "Hot";
    };
    return SubHot;
}(Sub));
exports.SubHot = SubHot;


/***/ }),

/***/ 0:
/*!*************************************************************************************!*\
  !*** multi (webpack)-dev-server/client?http://localhost:8080 ./src/scripts/main.ts ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! C:\HtmlTest\CordovarPixiWebpack\PixiProject\node_modules\webpack-dev-server\client\index.js?http://localhost:8080 */"./node_modules/webpack-dev-server/client/index.js?http://localhost:8080");
module.exports = __webpack_require__(/*! ./src/scripts/main.ts */"./src/scripts/main.ts");


/***/ }),

/***/ "pixi.js":
/*!***********************!*\
  !*** external "PIXI" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = PIXI;

/***/ })

/******/ });