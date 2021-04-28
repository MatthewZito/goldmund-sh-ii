const pipe = (fn, ...fns) =>
  (...args) => fns.reduce((acc, fn) => fn(acc), fn(...args));

export {
  pipe
};
