import { cookies } from '../core/storage/cookies.js';

export function WelcomeBack() {
  return {
    id: 'welcome-back',
    register({ on }) {
      on('enjs:ready', () => {
        if (cookies.get('remember')) {
          document.body.classList.add('enjs-welcome-back');
        }
      });
    }
  };
}
