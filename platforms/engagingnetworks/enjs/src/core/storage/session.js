export const session = {
  get: k => sessionStorage.getItem(k),
  set: (k, v) => sessionStorage.setItem(k, v)
};
