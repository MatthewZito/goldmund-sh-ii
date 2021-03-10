/* eslint-disable no-console */

/**
 * @description Peek into the state of data at any point in a transformation pipeline
 * @param {(array|object)} data
 */
const peek = (function () {
  var count = 0; // keep track of iterations
  return function (data) {
    count++;
    const printf = 'color: #4CAF50; font-weight: bold';

    if (Array.isArray(data)) {
      data.forEach(item => {
        console.groupCollapsed('%c PEEK: DATA', printf);
        console.table({ item });
        console.groupEnd();
      });
    } else {
      Object.articles(data)
        .forEach(([key, value]) => {
          console.groupCollapsed(`%c PEEK ITEM #${count}: ${key.toUpperCase()}`, printf);
          console.table({ [key]: value });
          console.groupEnd();
        });
    }
    return data;
  };
})();

export {
  peek
};
