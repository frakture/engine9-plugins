import { EN } from '../core/en/selectors.js';
import { cookies } from '../core/storage/cookies.js';

export function RememberMe() {
  return {
    id: 'remember-me',
    register({ on }) {
      on('enjs:ready', () => {
        const data = cookies.get('remember');
        if (data) {
          try {
            const parsed = JSON.parse(data);
            Object.entries(parsed).forEach(([k, v]) => {
              const el = document.querySelector('input[name="' + k + '"]');
              if (el && !el.value) el.value = v;
            });
          } catch {}
        }

        const store = {};
        [EN.supporterFirst, EN.supporterLast, EN.supporterEmail].forEach((sel) => {
          const el = document.querySelector(sel);
          if (!el) return;
          el.addEventListener('blur', () => {
            store[el.name] = el.value;
            cookies.set('remember', JSON.stringify(store));
          });
        });
      });
    }
  };
}
