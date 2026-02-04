import { EN } from '../core/en/selectors.js';
import { local } from '../core/storage/local.js';

export function StickyPrepopulation() {
  return {
    id: 'sticky-prepopulation',
    register({ on }) {
      on('enjs:ready', () => {
        [EN.supporterFirst, EN.supporterLast, EN.supporterEmail].forEach((sel) => {
          const el = document.querySelector(sel);
          if (!el) return;
          const key = 'sticky:' + el.name;
          const v = local.get(key);
          if (v && !el.value) el.value = v;
          el.addEventListener('blur', () => local.set(key, el.value));
        });
      });
    }
  };
}
