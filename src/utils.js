/* eslint-disable prettier/prettier */
import { act } from 'react-test-renderer';
import compose from 'lodash/flowRight';
import { compose, cond, identity } from '../../helpers/common';

export const EMPTY = Symbol.for('renderFns.empty');

// hasProps :: Node -> Boolean
export const hasProps = c => !!(c && c.props);

// ifElse :: (a -> Boolean, (a -> b), (a -> b)) -> a -> b
export const ifElse = (pred, truthy = identity, falsey = identity) => (...x) =>
  pred(...x) ? truthy(...x) : falsey(...x);

// ifSafeValue :: 
export const ifSafeValue = fn => ifElse(x => x !== undefined, fn);
export const ifHasProps = fn => ifElse(hasProps, fn);

// withAct :: (...a -> b) -> (...a) -> b
export const withAct = fn => (...args) => {
  let returnValue;
  act(() => {
    returnValue = fn(...args);
  });
  return returnValue;
}

// runAllTimers :: () -> ()
export const runAllTimers = withAct(jest.runAllTimers);

export { act, compose, cond, identity };
