/* eslint-disable prettier/prettier */
import React from 'react';
import { mountVanilla, text, getProp, setState, getState, firstChild } from '../src';

describe('Render-fns > helpers', () => {

  describe('getProps', () => {
    it('should return the prop value', () => {
      const node = mountVanilla(<div hello="World" />);

      expect(getProp('hello', node)).toBe('World');
      expect(getProp('hello')(node)).toBe('World');

      expect(getProp('hellowad', node)).toBe(undefined);
    });
  });

  describe('text', () => {
    it('should return the rendered text', () => {
      const node = mountVanilla(<div>Hello world. Number: {10}</div>);
      expect(text(node)).toBe('Hello world. Number: 10');
    });

    it('should traverse a nested tree to return the rendered text', () => {
      const node = mountVanilla(
        <div>
          {'Hello '}
          <span>world</span>.
          <div>
            <div />
            <div>
              <div>Number: <span>{10}</span></div>
            </div>
          </div>
        </div>
      );
      expect(text(node)).toBe('Hello world.Number: 10');
    });
  });

  describe('setState/getState', () => {

    class Comp extends React.Component {
      state = { count: 0, isVisible: true };
      render = () => this.state.isVisible ? <div>{this.state.count}</div> : <div />;
    }

    it('should set the state of the given node', () => {
      const node = mountVanilla(<Comp />);

      setState({ count: 5 }, node);
      expect(getState('count', node)).toBe(5);

      setState({ count: 10 })(node);
      expect(getState('count')(node)).toBe(10);
    });

    it('should set the state of the given node (functional setState)', () => {
      const node = mountVanilla(<Comp />);

      Array(10).fill(node).forEach(setState(({ count }) => ({ count: count + 1 })));

      expect(getState('count', node)).toBe(10);
    });
  });

  describe('firstChild', () => {
    it('should return the first child', () => {
      const node = mountVanilla(
        <div>
          <div id='firstChild' />
          <div id='swecondChild' />
        </div>
      );

      expect(firstChild(node).props.id).toBe('firstChild');
    });

    it('should return undefined if there are no children', () => {
      const node = mountVanilla(<div />);

      expect(firstChild(node)).toBe(undefined);
    });

    it('should return the root node for component', () => {
      const Comp = () => <div id='child' />;
      const node = mountVanilla(<Comp />);

      expect(firstChild(node).props.id).toBe('child');
    });
  });
});
