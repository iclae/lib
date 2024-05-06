import { test, expect } from 'vitest';
import { singleton } from './singleton';

class MyClass {
  constructor() {
    this.value = Math.random();
  }
}

test('singleton', () => {
  const SingletonClass = singleton(MyClass);
  const instance1 = new SingletonClass();
  const instance2 = new SingletonClass();

  expect(instance1).toBe(instance2);
  expect(instance1.value).toBe(instance2.value);
});