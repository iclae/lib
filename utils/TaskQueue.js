class TaskQueue {
  constructor() {
    this.queue = Promise.resolve();
  }

  addTask(task) {
    this.queue = this.queue.then(() => task());
  }
}

export default TaskQueue;
