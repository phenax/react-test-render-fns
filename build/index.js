"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  withStore: true,
  renderVanilla: true,
  mountVanilla: true,
  render: true,
  mount: true,
  firstChild: true,
  setState: true,
  getState: true,
  getProp: true,
  text: true,
  createEvent: true,
  simulate: true,
  find: true,
  findAll: true
};
exports.findAll = exports.find = exports.simulate = exports.createEvent = exports.text = exports.getProp = exports.getState = exports.setState = exports.firstChild = exports.mount = exports.render = exports.mountVanilla = exports.renderVanilla = exports.withStore = void 0;

var _react = _interopRequireDefault(require("react"));

var _curry = _interopRequireDefault(require("lodash/curry"));

var _mapKeys = _interopRequireDefault(require("lodash/mapKeys"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

var _utils = require("./utils");

Object.keys(_utils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _utils[key];
    }
  });
});

var _filters = require("./filters");

Object.keys(_filters).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _filters[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable prettier/prettier */
// withStore :: ReactNode -> ReactNode
var withStore = function withStore() {
  var store = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initializeStore();
  return function (node) {
    return node;
  };
}; // renderVanilla :: ReactNode -> TestRenderer


exports.withStore = withStore;
var renderVanilla = (0, _utils.withAct)(_reactTestRenderer["default"].create); // mountVanilla :: ReactNode -> Node

exports.renderVanilla = renderVanilla;

var mountVanilla = function mountVanilla(node) {
  return renderVanilla(node).root;
}; // render :: ReactNode -> TestRenderer


exports.mountVanilla = mountVanilla;
var render = renderVanilla; // mount :: ReactNode -> Node

exports.render = render;
var mount = mountVanilla; // firstChild :: Node -> Node

exports.mount = mount;
var firstChild = (0, _utils.cond)([[function (c) {
  return c && Array.isArray(c.children);
}, function (c) {
  return c.children[0];
}], [function (c) {
  return true;
}, function (c) {
  return c && c.children;
}]]); // Deprecated
// Only works for class components (Should be avoided. Try simulating an event instead)
// setState :: (State | State -> State) -> Node -> Node

exports.firstChild = firstChild;
var setState = (0, _curry["default"])(function (state, node) {
  node.instance.setState(state);
  return node;
}); // getState :: String -> Node -> State

exports.setState = setState;
var getState = (0, _curry["default"])(function (key, node) {
  return node.instance.state[key];
}); // getProp :: String -> Node -> *

exports.getState = getState;
var getProp = (0, _curry["default"])(function (propName, c) {
  return (c && c.props || {})[propName];
}); // text :: Node -> String

exports.getProp = getProp;
var text = (0, _utils.cond)([[function (c) {
  return typeof c === 'string';
}, function (c) {
  return c;
}], [function (c) {
  return c && Array.isArray(c.children);
}, function (c) {
  return c.children.map(text).join('');
}], [function (c) {
  return c;
}, function (c) {
  return text(c.children);
}], [function () {
  return true;
}, function (c) {
  return '';
}]]); // getHandlerName :: Event -> String

exports.text = text;

var getHandlerName = function getHandlerName(_ref) {
  var type = _ref.type;
  return "on".concat(type).toLowerCase();
}; // createEvent :: (String, ?Object) -> Event


var createEvent = function createEvent(eventName, data) {
  return new Event(eventName, data);
}; // simulate :: Event -> Node -> Node


exports.createEvent = createEvent;
var simulate = (0, _curry["default"])((0, _utils.withAct)(function (event, node) {
  var lowecasedProps = (0, _mapKeys["default"])(node.props, function (_, k) {
    return "".concat(k).toLowerCase();
  });
  var handler = lowecasedProps[getHandlerName(event)];
  if (typeof handler === 'function') handler(event);
  return node;
}), 2); // find :: Filter -> Node -> Node | Eff.Exception

exports.simulate = simulate;
var find = (0, _curry["default"])(function (filterFn, c) {
  return c.find(filterFn);
}); // findAll :: Filter -> Node -> [Node]

exports.find = find;
var findAll = (0, _curry["default"])(function (filterFn, c) {
  return c.findAll(filterFn);
});
exports.findAll = findAll;