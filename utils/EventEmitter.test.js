import { test, expect, describe } from 'vitest';
import EventEmitter from './EventEmitter';

describe('EventEmitter', () => {
  test('EventEmitter - on and emit', () => {
    let count = 0;

    EventEmitter.on('event', () => {
      count++;
    });

    EventEmitter.emit('event');
    EventEmitter.emit('event');
    EventEmitter.emit('event');

    expect(count).toBe(3);
  });

  test('EventEmitter - off', () => {
    let count = 0;

    const listener = () => {
      count++;
    };

    EventEmitter.on('event', listener);
    EventEmitter.emit('event');
    EventEmitter.off('event', listener);
    EventEmitter.emit('event');

    expect(count).toBe(1);
  });

  test('EventEmitter - once', () => {
    let count = 0;

    EventEmitter.once('event', () => {
      count++;
    });

    EventEmitter.emit('event');
    EventEmitter.emit('event');
    EventEmitter.emit('event');

    expect(count).toBe(1);
  });
});

