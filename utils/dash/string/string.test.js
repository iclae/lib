import { expect, test } from 'vitest'
import { format } from './format';
import { getParameters } from './getParameters';

test('format', () => {
  const str = 'Hello, {name}! You are {age} years old.';
  const obj = { name: 'John', age: 30 };
  expect(format(str, obj)).toBe('Hello, John! You are 30 years old.');

  const str2 = 'The result is {result}.';
  const obj2 = { result: 42 };
  expect(format(str2, obj2)).toBe('The result is 42.');

  const str3 = 'No placeholders in this string.';
  const obj3 = { foo: 'bar' };
  expect(format(str3, obj3)).toBe('No placeholders in this string.');
});

test('getParameters', () => {
  const url1 = 'https://example.com/?foo=bar&baz=qux';
  const expected1 = { foo: 'bar', baz: 'qux' };
  expect(getParameters(url1)).toEqual(expected1);

  const url2 = 'https://example.com/?name=John&age=30&city=New%20York';
  const expected2 = { name: 'John', age: '30', city: 'New York' };
  expect(getParameters(url2)).toEqual(expected2);

  const url3 = 'https://example.com/';
  const expected3 = {};
  expect(getParameters(url3)).toEqual(expected3);
});