import { createENJS } from './core/enjs.js';

import { StickyNSG } from './features/sticky-nsg.js';
import { StickyPrepopulation } from './features/sticky-prepopulation.js';
import { RememberMe } from './features/remember-me.js';
import { WelcomeBack } from './features/welcome-back.js';
import { PaymentTypes } from './features/payment-types.js';
import { GTMDataLayer } from './features/gtm-datalayer.js';
import { Lightbox } from './features/lightbox.js';
import { ExitIntentLightbox } from './features/exit-intent-lightbox.js';
import { OptInLadder } from './features/opt-in-ladder.js';

const enjs = createENJS({
  debug: false,
  features: [
    PaymentTypes(),
    GTMDataLayer(),
    Lightbox(),
    ExitIntentLightbox(),
    OptInLadder(),
    StickyNSG(),
    RememberMe(),
    WelcomeBack()
    // StickyPrepopulation() // optional, usually exclusive with RememberMe
  ],
  rules: {
    mutualExclusions: [['remember-me', 'sticky-prepopulation']]
  }
});

document.addEventListener('DOMContentLoaded', () => {
  enjs.init();
});
