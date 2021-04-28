/* eslint-disable no-console */

/* Devtools Debug Interface */
import { appName } from '../../package.json';
const isDev = process.env.NODE_ENV !== 'production';

const header = 'color:#50fa7b;font-weight:bold;padding:6px;';
const printf = hex => `color:${hex};font-weight:bold`;

function debug () {
  window.onerror = (message, source, line, column, error) => {
    logF(
      `%cUncaught Exception: ${message}\nInfo: ${source} - Ln${line} Col${column}`,
      printf('#ff5555')
    );
  };

  this.config.errorHandler = (err, vm, info) => {
    logF(
      `%c ERROR: ${err.toString()}\nInfo: ${info}\nerr`,
      printf('#ff79c6')
    );
  };

  this.config.warnHandler = (msg, vm, trace) => {
    logF(
      `%c WARN: ${msg}\nTrace: ${trace}`,
      printf('#f1fa8c')
    );
  };
}

function logF (...args) {
  if (isDev) {
    console.groupCollapsed(`%cDEBUG@${appName}`, header);
    console.log(...args);
    console.groupEnd();
  }
}

export default {
  install (app, options) {
    debug.apply(app);
  }
};
