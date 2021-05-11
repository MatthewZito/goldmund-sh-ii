const pipe = (fn, ...fns) =>
  (...args) => fns.reduce((acc, fn) => fn(acc), fn(...args));

const blobify = data => new Blob([JSON.stringify(data)],
  { type : 'application/json; charset=UTF-8' });

const isDev = import.meta.env.LOCAL || import.meta.env.DEV;
const baseUrl = import.meta.env.VITE_LOCAL
  ? 'http://localhost:3000'
  : import.meta.env.VITE_APP_URL_UI;

export {
  pipe,
  blobify,
  isDev,
  baseUrl
};
