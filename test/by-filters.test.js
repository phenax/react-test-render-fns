/* eslint-disable prettier/prettier */
import React from 'react';
import { mountVanilla, byDisplayName, byTestSelector, byType, byProp, byId } from '../src';

describe('Render-fns > by* filters', () => {
  const MyComp = () => <div />;

  const MyCompWithDisplayName = () => <div />;
  MyCompWithDisplayName.displayName = 'MyCompWithDisplayName';

  describe('byDisplayName', () => {
    it('should return true only if the display name or the fn name matches the node', () => {
      const myComp = mountVanilla(<MyComp />);
      const myCompDN = mountVanilla(<MyCompWithDisplayName />);

      const isMyCompDN = byDisplayName('MyCompWithDisplayName');
      expect(isMyCompDN(myCompDN)).toBe(true);

      const isMyComp = byDisplayName('MyComp');
      expect(isMyComp(myComp)).toBe(true);

      const isNotMyComp = byDisplayName('NotMyComp');
      expect(isNotMyComp(myComp)).toBe(false);
    });

    it('should return true only if displayName matches if the second param is false', () => {
      const myComp = mountVanilla(<MyComp />);
      const myCompDN = mountVanilla(<MyCompWithDisplayName />);

      const isMyComp = byDisplayName('MyComp', false);
      expect(isMyComp(myComp)).toBe(false);

      const isMyCompDN = byDisplayName('MyCompWithDisplayName', false);
      expect(isMyCompDN(myCompDN)).toBe(true);
    });
  });

  describe('byType', () => {
    it('should return true only if the type of the component matches the node', () => {
      const myComp = mountVanilla(<MyComp />);
      const myCompDN = mountVanilla(<MyCompWithDisplayName />);

      const isMyCompDN = byType(MyCompWithDisplayName);
      expect(isMyCompDN(myCompDN)).toBe(true);

      const isMyComp = byType(MyComp);
      expect(isMyComp(myComp)).toBe(true);

      const isNotMyComp = byType(() => {});
      expect(isNotMyComp(myComp)).toBe(false);
    });
  });

  describe('byProp', () => {
    it('should return true if the node has the given prop', () => {
      const myCompWithHello = mountVanilla(<MyComp hello='world' />);
      const myCompWithoutHello = mountVanilla(<MyComp />);

      const hasPropHello = byProp('hello');
      expect(hasPropHello(myCompWithHello)).toBe(true);

      expect(hasPropHello(myCompWithoutHello)).toBe(false);
    });

    it('should return true if the node has the correct value for the given prop', () => {
      const myCompHelloWorld = mountVanilla(<MyComp hello='world' />);
      const myCompHelloUniverse = mountVanilla(<MyComp hello='universe' />);

      const hasPropHello = byProp('hello', 'world');
      expect(hasPropHello(myCompHelloWorld)).toBe(true);

      expect(hasPropHello(myCompHelloUniverse)).toBe(false);
    });
  });

  describe('byId', () => {
    it('should return true if the node has the given id', () => {
      const myCompHelloWorld = mountVanilla(<MyComp id='hello_world' />);
      const myCompHelloUniverse = mountVanilla(<MyComp id='hello_universe' />);

      const hasPropHello = byId('hello_world');
      expect(hasPropHello(myCompHelloWorld)).toBe(true);

      expect(hasPropHello(myCompHelloUniverse)).toBe(false);
    });
  });

  describe('byTestSelector', () => {
    it('should return true if the node has the given id', () => {
      const myCompHelloWorld = mountVanilla(<MyComp data-test-selector='hello_world' />);
      const myCompHelloUniverse = mountVanilla(<MyComp data-test-selector='hello_universe' />);

      const hasPropHello = byTestSelector('hello_world');
      expect(hasPropHello(myCompHelloWorld)).toBe(true);

      expect(hasPropHello(myCompHelloUniverse)).toBe(false);
    });
  });
});
