"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "act", {
  enumerable: true,
  get: function get() {
    return _reactTestRenderer.act;
  }
});
Object.defineProperty(exports, "compose", {
  enumerable: true,
  get: function get() {
    return _pipey.compose;
  }
});
Object.defineProperty(exports, "cond", {
  enumerable: true,
  get: function get() {
    return _cond["default"];
  }
});
exports.identity = exports.runAllTimers = exports.withAct = exports.ifHasProps = exports.ifSafeValue = exports.ifElse = exports.hasProps = exports.EMPTY = void 0;

var _reactTestRenderer = require("react-test-renderer");

var _pipey = require("pipey");

var _cond = _interopRequireDefault(require("lodash/cond"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable prettier/prettier */
var identity = function identity(x) {
  return x;
};

exports.identity = identity;
var EMPTY = Symbol["for"]('renderFns.empty'); // hasProps :: Node -> Boolean

exports.EMPTY = EMPTY;

var hasProps = function hasProps(c) {
  return !!(c && c.props);
}; // ifElse :: (a -> Boolean, (a -> b), (a -> b)) -> a -> b


exports.hasProps = hasProps;

var ifElse = function ifElse(pred) {
  var truthy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : identity;
  var falsey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : identity;
  return function () {
    return pred.apply(void 0, arguments) ? truthy.apply(void 0, arguments) : falsey.apply(void 0, arguments);
  };
}; // ifSafeValue :: 


exports.ifElse = ifElse;

var ifSafeValue = function ifSafeValue(fn) {
  return ifElse(function (x) {
    return x !== undefined;
  }, fn);
};

exports.ifSafeValue = ifSafeValue;

var ifHasProps = function ifHasProps(fn) {
  return ifElse(hasProps, fn);
}; // withAct :: (...a -> b) -> (...a) -> b


exports.ifHasProps = ifHasProps;

var withAct = function withAct(fn) {
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var returnValue;
    (0, _reactTestRenderer.act)(function () {
      returnValue = fn.apply(void 0, args);
    });
    return returnValue;
  };
}; // runAllTimers :: () -> ()


exports.withAct = withAct;
var runAllTimers = withAct(jest.runAllTimers);
exports.runAllTimers = runAllTimers;