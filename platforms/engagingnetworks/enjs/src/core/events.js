export function createEmitter() {
  const handlers = new Map();

  function on(event, cb) {
    if (!handlers.has(event)) handlers.set(event, []);
    handlers.get(event).push(cb);
  }

  function emit(event, payload) {
    (handlers.get(event) || []).forEach(cb => cb(payload));
  }

  return { on, emit };
}
