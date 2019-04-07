/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { mountVanilla, withAct, byId, simulate, createEvent } from '../src';

jest.useFakeTimers();

describe('withAct', () => {
  const Component = () => {
    const [ x, setX ] = useState(0);
    return <button id="btn" onClick={() => setX(x + 1)}>Wow</button>;
  };

  console.error = jest.fn();

  it('should not warn me about using act to update state', () => {
    const $comp = mountVanilla(<Component />);
    const { onClick } = $comp.find(byId('btn')).props;
    const click = withAct(onClick);

    // With act
    click();
    expect(console.error).toHaveBeenCalledTimes(0);

    // Without act
    onClick();
    expect(console.error).toHaveBeenCalledTimes(1);
  });
});

describe('simulate', () => {
  it('should simulate the event correctly', () => {
    const onClick = jest.fn();
    const node = mountVanilla(<button onClick={onClick} />);

    simulate(createEvent('click'), node);
    simulate(createEvent('click'))(node);
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it('should simulate the event correctly (with MouseEvent)', () => {
    const onClick = jest.fn();
    const node = mountVanilla(<button onClick={onClick} />);

    simulate(new MouseEvent('click'), node);
    simulate(new MouseEvent('click'))(node);
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it('should call the event handler with the correct event', () => {
    const onClick = jest.fn();
    const node = mountVanilla(<button onClick={onClick} />);

    simulate(createEvent('click'), node);
    const [[ e ]] = onClick.mock.calls;
    expect(e.type).toBe('click');
  });

  it('should call the event handler with the correct event (touchstart)', () => {
    const onClick = jest.fn();
    const node = mountVanilla(<button onTouchStart={onClick} />);

    simulate(createEvent('touchstart'), node);
    const [[ e ]] = onClick.mock.calls;
    expect(e.type).toBe('touchstart');
  });
});
