# ENJS

ENJS is a small, modular JavaScript framework inspired by **ENgrid v2**.
It is designed for **Engaging Networks (EN)** pages and focuses on:

- Modular, opt-in features
- Centralized state
- Lifecycle awareness (wait for EN DOM readiness)
- Event-driven architecture

This repository is a **starter scaffold** you can extend or slim down.

---

## Core Concepts (mirrors ENgrid v2)

### 1. Lifecycle Awareness

ENJS waits until EN markup is present before activating features.

### 2. Central State

One shared state object:

- page type
- payment type
- supporter info

### 3. Event Bus

Features communicate via events instead of tight coupling.

### 4. Feature Modules

Each feature:

- Has a unique `id`
- Registers event handlers
- Can be enabled/disabled independently

---

## File Structure

```
src/
  index.js
  core/
    enjs.js
    events.js
    dom.js
    storage/
      local.js
      session.js
      cookies.js
    en/
      selectors.js
      page.js
      lifecycle.js
  features/
    sticky-nsg.js
    sticky-prepopulation.js
    remember-me.js
    welcome-back.js
    payment-types.js
    gtm-datalayer.js
    lightbox.js
    exit-intent-lightbox.js
    opt-in-ladder.js
    (...additional stubs)
```

---

## Mutual Exclusions

Some features overlap by design.

Example:

- `remember-me` and `sticky-prepopulation` should not run together

Configured via:

```js
rules: {
  mutualExclusions: [['remember-me', 'sticky-prepopulation']];
}
```

# ENJS (ENgrid v2–inspired mini framework)

ENJS is a small, modular framework designed to be a “replace ENgrid” skeleton:

- Central state
- Lifecycle-aware init
- Event-driven feature modules
- EN-specific selectors and page detection

It targets Engaging Networks (EN) pages in the same general way ENgrid does, but it’s intentionally minimal and easy to customize.

---

## Why this is “ENgrid v2–inspired”

ENgrid v2’s biggest differences vs older approaches:

1. **Modular feature architecture**
   - Features are discrete modules you can turn on/off.
2. **Lifecycle awareness**
   - Wait for EN content to exist before running.
3. **Central state**
   - One place to read/write “page type”, “payment type”, supporter info, etc.
4. **Events**
   - Features communicate through a bus instead of calling each other directly.

ENJS implements the same philosophy:

- `enjs:ready` is the primary lifecycle event.
- Features register via `register({ on, emit, state })`.

---

## Quick Start

### 1) Import ENJS and the features you want

In `src/index.js`:

```js
import { createENJS } from './core/enjs.js';
import { StickyNSG } from './features/sticky-nsg.js';
import { RememberMe } from './features/remember-me.js';
import { PaymentTypes } from './features/payment-types.js';

const enjs = createENJS({
  features: [PaymentTypes(), StickyNSG(), RememberMe()],
  rules: { mutualExclusions: [['remember-me', 'sticky-prepopulation']] }
});

document.addEventListener('DOMContentLoaded', () => enjs.init());
```

## 2) Include it on an EN page

If you bundle it, include your bundled JS in the EN page header/footer.

If you **don’t** bundle and your environment supports modules:

```html
<script type="module" src="/path/to/src/index.js"></script>
```

---

## Feature List (mapped from ENgrid v2 concepts)

### Advanced Features

- **sticky-nsg** — persist donation amount selection
- **sticky-prepopulation** — short-term persistence of supporter fields
- **remember-me** — longer-lived cookie persistence
- **welcome-back** — “returning user” flag + event
- **opt-in-ladder** — thank-you sequencing
- **exit-intent-lightbox** — exit intent modal (uses lightbox API)
- **frequency-upsell** _(stub)_
- **post-donation-donation** _(stub)_
- **multistep** _(stub)_
- **lightbox** — shared modal system used by other features
- **homepage-takeover** _(stub; often GTM-driven)_

---

### Donation Pages

- **payment-types** — watches `transaction.paymenttype`, emits change events
- **preferred-payment** _(stub)_
- **gift-frequency** _(stub)_
- **gift-amount** _(stub)_
- **upsells** _(stub)_
- **tribute** _(stub)_
- **custom-premium** _(stub)_
- **receipting** _(stub)_
- **embedded-ecard** _(stub)_

---

### Form Features

- **field-helpers** _(stub)_
- **conditional-required** _(stub)_
- **international-address** _(stub)_
- **url-args** _(stub)_
- **embed** _(stub)_

---

### All Pages

- **click-to-expand** _(stub)_
- **conditional-content** _(stub)_
- **replace-banner** _(stub)_
- **bg-positioning** _(stub)_

---

### Analytics

- **gtm-datalayer** — pushes ENJS events to `window.dataLayer`

---

## Mutual Exclusions (important)

Some features overlap in intent and storage strategy.

**Example (mirrors ENgrid v2 guidance):**

If `remember-me` is enabled, disable `sticky-prepopulation`.

ENJS enforces this via:

```js
rules: {
  mutualExclusions: [['remember-me', 'sticky-prepopulation']];
}
```

---

## Lifecycle + Events

### Lifecycle Event

- **enjs:ready** — fires once EN content is present and page type has been detected.

### Other Common Events

- **enjs:paymentTypeChange** — payload `{ type }`
- **enjs:welcomeBack** — payload `{ returning }`
- **enjs:lightbox:api** — payload `{ open(html) }`

---

## Developing New Features

A feature module looks like:

```js
export function MyFeature(options = {}) {
  return {
    id: 'my-feature',
    register({ on, emit, state, log }) {
      on('enjs:ready', () => {
        // implement
        log('my-feature enabled');
      });
    }
  };
}
```

### Tips

- Keep EN selectors centralized in `src/core/en/selectors.js`
- Avoid direct feature-to-feature imports; use events
- Store state in `state.*` (and only store persisted values in cookies/local/session)

---

## Notes for Real EN Installs

Engaging Networks HTML differs by template/account:

- Field names are usually stable (e.g. `supporter.emailAddress`)
- Wrappers and classes can differ

Plan to customize:

- `src/core/en/page.js` detection heuristics
- `src/core/en/selectors.js` selectors
- Thank-you markers and GTM event naming conventions

---

## License

Internal / starter scaffold — adapt freely.
