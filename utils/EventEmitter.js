import { singleton } from "./singleton";

class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, listener) {
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }

    this.events.get(event).add(listener);
  }

  off(event, listener) {
    if (!this.events.has(event)) {
      return
    }
    this.events.get(event).delete(listener);
  }

  once(event, listener) {
    const onceListener = (...args) => {
      listener(...args);
      this.off(event, onceListener);
    };

    this.on(event, onceListener);
  }

  emit(event, ...args) {
    if (!this.events.has(event)) {
      return;
    }

    this.events.get(event).forEach(listener => listener(...args));
  }
}

const EventEmitterSingleton = singleton(EventEmitter);

export default new EventEmitterSingleton();