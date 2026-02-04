export function OptInLadder() {
  return {
    id: 'opt-in-ladder',
    register({ on, state }) {
      on('enjs:ready', () => {
        if (state.page.type !== 'thankyou') return;
        const el = document.getElementById('opt-in-ladder');
        if (el) el.innerHTML = '<p>Take another action</p>';
      });
    }
  };
}
