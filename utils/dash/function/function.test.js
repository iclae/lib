import { test, expect, describe, vi } from 'vitest';
import { debounce } from './debounce';

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


