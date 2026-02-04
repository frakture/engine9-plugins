import { EN } from "./selectors.js";

export function detectENPage() {
  const isThankYou = document.body.classList.contains(EN.thankYouClass);
  const isDonation = document.querySelector(EN.donationAmtRadios);
  let type = "other";
  if (isThankYou) type = "thankyou";
  else if (isDonation) type = "donation";
  return { type, isThankYou };
}
