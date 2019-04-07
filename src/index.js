/* eslint-disable prettier/prettier */
import React from 'react';
import curry from 'lodash/curry';
import mapKeys from 'lodash/mapKeys';
import TestRenderer from 'react-test-renderer';

import { compose, cond, withAct } from './utils';

export * from './utils';
export * from './filters';

// withStore :: ReactNode -> ReactNode
export const withStore = (store = initializeStore()) => node => node;

// renderVanilla :: ReactNode -> TestRenderer
export const renderVanilla = withAct(TestRenderer.create);
// mountVanilla :: ReactNode -> Node
export const mountVanilla = node => renderVanilla(node).root;

// render :: ReactNode -> TestRenderer
export const render = renderVanilla;
// mount :: ReactNode -> Node
export const mount = mountVanilla;


// firstChild :: Node -> Node
export const firstChild = cond([
  [ c => c && Array.isArray(c.children), c => c.children[0] ],
  [ c => true, c => c && c.children ],
]);

// Deprecated
// Only works for class components (Should be avoided. Try simulating an event instead)
// setState :: (State | State -> State) -> Node -> Node
export const setState = curry((state, node) => {
  node.instance.setState(state);
  return node;
});
// getState :: String -> Node -> State
export const getState = curry((key, node) => node.instance.state[key]);

// getProp :: String -> Node -> *
export const getProp = curry((propName, c) => ((c && c.props) || {})[propName]);

// text :: Node -> String
export const text = cond([
  [ c => typeof c === 'string', c => c ],
  [ c => c && Array.isArray(c.children), c => c.children.map(text).join('') ],
  [ c => c, c => text(c.children) ],
  [ () => true, c => '' ],
]);

// getHandlerName :: Event -> String
const getHandlerName = ({ type }) => `on${type}`.toLowerCase();

// createEvent :: (String, ?Object) -> Event
export const createEvent = (eventName, data) => new Event(eventName, data);

// simulate :: Event -> Node -> Node
export const simulate = curry(withAct((event, node) => {
  const lowecasedProps = mapKeys(node.props, (_, k) => `${k}`.toLowerCase());
  const handler = lowecasedProps[getHandlerName(event)];
  if (typeof handler === 'function') handler(event);
  return node;
}), 2);



// find :: Filter -> Node -> Node | Eff.Exception
export const find = curry((filterFn, c) => c.find(filterFn));
// findAll :: Filter -> Node -> [Node]
export const findAll = curry((filterFn, c) => c.findAll(filterFn));
