import { EN } from '../core/en/selectors.js';
import { local } from '../core/storage/local.js';

export function StickyNSG() {
  return {
    id: 'sticky-nsg',
    register({ on }) {
      on('enjs:ready', () => {
        const radios = document.querySelectorAll(EN.donationAmtRadios);
        radios.forEach((r) => r.addEventListener('change', () => local.set('nsg', r.value)));
        const saved = local.get('nsg');
        if (saved) radios.forEach((r) => r.value === saved && (r.checked = true));
      });
    }
  };
}
