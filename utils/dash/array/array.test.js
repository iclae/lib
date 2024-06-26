import { expect, test, describe } from 'vitest'
import { filterArray } from './filterArray'
import { compareArray } from './compareArray';
import { uniqueBy } from './uniqueBy';

test('filterArray', () => {
  const targetArray = [
    { id: 1, name: 'a' },
    { id: 2, name: 'b' },
    { id: 3, name: 'c' },
    { id: 4, name: 'd' },
    { id: 5, name: 'e' },
  ];
  const uniqueArray = [
    { id: 2, name: 'b' },
    { id: 4, name: 'd' },
  ];
  expect(filterArray(targetArray, uniqueArray, 'id')).toEqual([
    { id: 1, name: 'a' },
    { id: 3, name: 'c' },
    { id: 5, name: 'e' },
  ]);
});

describe('compareArray', () => {
  test('compareArray - should return true for identical arrays', () => {
    const array1 = [1, 2, 3];
    const array2 = [1, 2, 3];

    const result = compareArray(array1, array2);

    expect(result).toBe(true);
  });

  test('compareArray - should return false for different arrays', () => {
    const array1 = [1, 2, 3];
    const array2 = [1, 2, 4];

    const result = compareArray(array1, array2);

    expect(result).toBe(false);
  });

  test('compareArray - should return false for arrays with different lengths', () => {
    const array1 = [1, 2, 3];
    const array2 = [1, 2, 3, 4];

    const result = compareArray(array1, array2);

    expect(result).toBe(false);
  });
})

describe('uniqueBy', () => {
  test('uniqueBy - has null item', () => {
    const arr = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
      null,
      { id: 3, name: 'Tom' },
      { id: 2, name: 'Jane' },
    ];
    expect(uniqueBy(arr, 'id')).toEqual([
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
      { id: 3, name: 'Tom' },
    ]);
  });

  test('uniqueBy', () => {
    const arr = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
      { id: 1, name: 'John' },
      { id: 3, name: 'Tom' },
      { id: 2, name: 'Jane' },
    ];
    expect(uniqueBy(arr, 'id')).toEqual([
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
      { id: 3, name: 'Tom' },
    ]);
  });
});
