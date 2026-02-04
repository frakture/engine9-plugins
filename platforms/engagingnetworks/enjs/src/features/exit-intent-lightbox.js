export function ExitIntentLightbox() {
  return {
    id: 'exit-intent-lightbox',
    register({ on }) {
      let api;
      on('enjs:lightbox:api', (a) => (api = a));
      on('enjs:ready', () => {
        if (!api) return;
        document.addEventListener(
          'mouseout',
          (e) => {
            if (e.clientY <= 0) api.open('<h3>Before you go</h3>');
          },
          { once: true }
        );
      });
    }
  };
}
