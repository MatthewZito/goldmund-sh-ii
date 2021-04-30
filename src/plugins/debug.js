/* eslint-disable no-console */

/* Devtools Debug Interface */
import { appName } from '@pkg';
const isDev = process.env.NODE_ENV !== 'production';

const header = 'color:#50fa7b;font-weight:bold;padding:6px;';
const printf = hex => `color:${hex};font-weight:bold`;

function debug () {
  /* Runtime Exceptions */
  window.onerror = (message, source, line, column, error) => {
    cc(
      `%cUncaught Exception: ${message}\nInfo: ${source} - Ln${line} Col${column}`,
      printf('#FF5555')
    );
  };

  /* Unhandled Promise Rejections */
  window.onunhandledrejection = function (e) {
    cc(
      `%c REJECTION: ${e.reason}`,
      printf('#FF5555')
    );
  };

  /* Vue Errors */
  this.config.errorHandler = (err, vm, info) => {
    cc(
      `%c ERROR: ${err.toString()}\nInfo: ${info}\nerr`,
      printf('#FF79C6')
    );
  };

  /* Vue Render Warnings */
  this.config.warnHandler = (msg, vm, trace) => {
    cc(
      `%c WARN: ${msg}\nTrace: ${trace}`,
      printf('#F1FA8C')
    );
  };
}

function cc (...args) {
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
