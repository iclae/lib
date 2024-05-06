import { expect, test } from 'vitest'
import { format } from './format';

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