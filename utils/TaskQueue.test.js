import { test, expect, vi, describe } from 'vitest';
import TaskQueue from './TaskQueue';

describe('TaskQueue', () => {
  const taskQueue = new TaskQueue();
  test('TaskQueue - addTask', () => {
    const task1 = vi.fn();
    const task2 = vi.fn();

    taskQueue.addTask(task1);
    taskQueue.addTask(task2);

    return taskQueue.queue.then(() => {
      expect(task1).toHaveBeenCalled();
      expect(task2).toHaveBeenCalled();
    });
  });
});
