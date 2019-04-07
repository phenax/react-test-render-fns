/* eslint-disable prettier/prettier */
import { EMPTY, compose, ifHasProps, ifSafeValue } from './utils';

// type Filter = Node -> Boolean
// constructor :: (Node -> Boolean) -> Filter
export const Filter = (predicate, filtername) => {
  const filter = compose(ifHasProps, ifSafeValue)(predicate);
  filter.toString = () => `Filter(${filtername || predicate})`;
  return filter;
};

// byDisplayName :: (String, Boolean) -> Filter
export const byDisplayName = (name, includeName = true) =>
  Filter(node => [node.type.displayName, includeName && node.type.name].filter(Boolean).includes(name), `byDisplayName("${name}")`);

// byType :: NodeType -> Filter
export const byType = type =>
  Filter(node => node.type === type || node.type.type === type, `byType(${type.displayName || type.name || type})`);

// byProp :: (String, *) -> Filter
export const byProp = (propName, value = EMPTY) =>
  Filter(node => value !== EMPTY ? node.props[propName] === value : propName in node.props, `byProp("${propName}"${value === EMPTY ? '' : `, "${value}"`})`);

// byId :: String -> Filter
export const byId = id => byProp('id', id);

// byTestSelector :: String -> Filter
export const byTestSelector = id => byProp('data-test-selector', id);
