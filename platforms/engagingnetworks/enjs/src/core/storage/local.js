export const local = {
  get: k => localStorage.getItem(k),
  set: (k, v) => localStorage.setItem(k, v)
};
