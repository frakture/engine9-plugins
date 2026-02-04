import { createEmitter } from './events.js';
import { detectENPage } from './en/page.js';
import { waitForENReady } from './en/lifecycle.js';

export function createENJS(config = {}) {
  const emitter = createEmitter();
  const features = [...(config.features || [])];
  const state = {
    page: {},
    payment: {},
    supporter: {}
  };

  function applyRules() {
    (config.rules?.mutualExclusions || []).forEach(([a, b]) => {
      const hasA = features.find((f) => f.id === a);
      const hasB = features.find((f) => f.id === b);
      if (hasA && hasB) {
        const idx = features.findIndex((f) => f.id === b);
        if (idx >= 0) features.splice(idx, 1);
      }
    });
  }

  async function init() {
    applyRules();
    features.forEach((f) =>
      f.register({
        on: emitter.on,
        emit: emitter.emit,
        state
      })
    );

    await waitForENReady();
    state.page = detectENPage();
    emitter.emit('enjs:ready', { state });
  }

  return { init, on: emitter.on, emit: emitter.emit, state };
}
