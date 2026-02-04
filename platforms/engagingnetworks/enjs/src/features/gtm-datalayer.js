export function GTMDataLayer() {
  return {
    id: 'gtm-datalayer',
    register({ on, state }) {
      on('enjs:ready', () => {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'enjsReady',
          pageType: state.page.type
        });
      });
    }
  };
}
