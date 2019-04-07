"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.byTestSelector = exports.byId = exports.byProp = exports.byType = exports.byDisplayName = exports.Filter = void 0;

var _utils = require("./utils");

/* eslint-disable prettier/prettier */
// type Filter = Node -> Boolean
// constructor :: (Node -> Boolean) -> Filter
var Filter = function Filter(predicate, filtername) {
  var filter = (0, _utils.compose)(_utils.ifHasProps, _utils.ifSafeValue)(predicate);

  filter.toString = function () {
    return "Filter(".concat(filtername || predicate, ")");
  };

  return filter;
}; // byDisplayName :: (String, Boolean) -> Filter


exports.Filter = Filter;

var byDisplayName = function byDisplayName(name) {
  var includeName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  return Filter(function (node) {
    return [node.type.displayName, includeName && node.type.name].filter(Boolean).includes(name);
  }, "byDisplayName(\"".concat(name, "\")"));
}; // byType :: NodeType -> Filter


exports.byDisplayName = byDisplayName;

var byType = function byType(type) {
  return Filter(function (node) {
    return node.type === type || node.type.type === type;
  }, "byType(".concat(type.displayName || type.name || type, ")"));
}; // byProp :: (String, *) -> Filter


exports.byType = byType;

var byProp = function byProp(propName) {
  var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _utils.EMPTY;
  return Filter(function (node) {
    return value !== _utils.EMPTY ? node.props[propName] === value : propName in node.props;
  }, "byProp(\"".concat(propName, "\"").concat(value === _utils.EMPTY ? '' : ", \"".concat(value, "\""), ")"));
}; // byId :: String -> Filter


exports.byProp = byProp;

var byId = function byId(id) {
  return byProp('id', id);
}; // byTestSelector :: String -> Filter


exports.byId = byId;

var byTestSelector = function byTestSelector(id) {
  return byProp('data-test-selector', id);
};

exports.byTestSelector = byTestSelector;