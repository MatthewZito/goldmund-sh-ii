const noop = () => {};

const pipe = (fn, ...fns) =>
  (...args) => fns.reduce((acc, fn) => fn(acc), fn(...args));

const blobify = data => new Blob([JSON.stringify(data)],
  { type : 'application/json; charset=UTF-8' });

const dateConv = ts => new Date(ts).toDateString();

const isDev = !!import.meta.env.VITE_LOCAL || import.meta.env.DEV;
const baseUrl = import.meta.env.VITE_LOCAL
  ? 'http://localhost:3000'
  : import.meta.env.VITE_APP_URL_UI;

export {
  noop,
  pipe,
  blobify,
  dateConv,
  isDev,
  baseUrl
};
