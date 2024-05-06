import { expect, test } from 'vitest'
import { getParams } from './getParams'
import { qsify } from './qsify'
import { pick } from './pick'
import { omit } from './omit'

test('getParams', () => {
  const obj = {
    a: 1,
    b: '',
    c: undefined,
    d: null,
    e: '2',
    f: '3.14',
    g: NaN,
    h: '',
    i: '4a',
    j: '4.a5',
    k: 0,
  }
  expect(getParams(obj)).toEqual({ a: 1, e: '2', f: '3.14', i: '4a', j: '4.a5', k: 0 })

  expect(getParams(obj, { keepEmptyStr: true })).toEqual({ a: 1, b: '', e: '2', f: '3.14', h: '', i: '4a', j: '4.a5', k: 0 })

  expect(getParams(obj, { numberKeys: ['a', 'e', 'f', 'g', 'h', 'i', 'j'] })).toEqual({ a: 1, e: 2, f: 3.14, i: 4, j: 4, k: 0 })

  expect(getParams(obj, { numberKeys: ['a', 'e', 'f', 'g', 'h', 'i', 'j'], keepEmptyStr: true })).toEqual({ a: 1, b: '', e: 2, f: 3.14, h: '', i: 4, j: 4, k: 0 })
})

test('qsify', () => {
  const obj = {
    a: 1,
    b: '',
    c: undefined,
    d: null,
    e: 'e',
  }
  expect(qsify(obj)).toBe('a=1&e=e')
})

test('pick', () => {
  const obj = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
  }
  expect(pick(obj, 'a', 'c')).toEqual({ a: 1, c: 3 });

  expect(pick(obj, 'b', 'd')).toEqual({ b: 2, d: 4 });

  expect(pick(obj, 'a', 'b', 'c', 'd')).toEqual(obj);

  expect(pick(obj, 'e')).toEqual({});
})

test('omit', () => {
  const obj = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
  }

  expect(omit(obj, 'a')).toEqual({ b: 2, c: 3, d: 4 });

  expect(omit(obj, 'b', 'd')).toEqual({ a: 1, c: 3 });

  expect(omit(obj, 'a', 'b', 'c', 'd')).toEqual({});

  expect(omit(obj, 'e')).toEqual(obj);
});