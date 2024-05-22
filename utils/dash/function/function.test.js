import { test, expect, describe, vi } from 'vitest';
import { debounce } from './debounce';
import { throttle } from './throttle';

describe('debounce', () => {
  // Test case 1: Debounced function should be called after the specified delay
  test('Debounced function should be called after the specified delay', () => {
    // Arrange
    const delay = 1000;
    const mockFunction = vi.fn();
    const debouncedFunction = debounce(mockFunction, delay);

    // Act
    debouncedFunction();
    vi.useFakeTimers(delay - 1);
    debouncedFunction();
    vi.advanceTimersByTime(1);

    // Assert
    expect(mockFunction).toHaveBeenCalledTimes(0);
    vi.advanceTimersByTime(delay);
    expect(mockFunction).toHaveBeenCalledTimes(1);
  });

  // Test case 2: Debounced function should be called with the latest arguments
  test('Debounced function should be called with the latest arguments', () => {
    // Arrange
    const delay = 500;
    const mockFunction = vi.fn();
    const debouncedFunction = debounce(mockFunction, delay);

    // Act
    debouncedFunction(1);
    vi.useFakeTimers(delay / 2);
    debouncedFunction(2);
    vi.useFakeTimers(delay / 2);
  });
})

test('throttle', () => {
  let count = 0;
  const increment = () => {
    count++;
  };

  const throttledIncrement = throttle(increment, 100);

  // Call the throttled function multiple times within the delay
  throttledIncrement();
  throttledIncrement();
  throttledIncrement();

  // Wait for the delay to pass
  setTimeout(() => {
    throttledIncrement();
  }, 200);

  // Wait for the delay to pass again
  setTimeout(() => {
    throttledIncrement();
  }, 300);

  // Check the count after a sufficient delay
  setTimeout(() => {
    expect(count).toBe(2);
  }, 400);
});

