import { EN } from '../core/en/selectors.js';

export function PaymentTypes() {
  return {
    id: 'payment-types',
    register({ on, emit, state }) {
      on('enjs:ready', () => {
        const inputs = document.querySelectorAll(EN.paymentType);
        inputs.forEach((i) =>
          i.addEventListener('change', () => {
            state.payment.type = i.value;
            emit('enjs:paymentTypeChange', { type: i.value });
          })
        );
      });
    }
  };
}
