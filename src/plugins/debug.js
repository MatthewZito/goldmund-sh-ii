/* eslint-disable no-console */

/* Devtools Debug Interface */
import * as Sentry from '@sentry/browser';
import { Integrations } from '@sentry/tracing';

import { appName, version } from '@pkg';
import { eventApi } from '@/services/api';

import { isDev } from '@/utils';

const header = 'color:#50fa7b;font-weight:bold;padding:6px;';
const printf = hex => `color:${hex};font-weight:bold`;

function debug () {
  Sentry.init({
    // public
    dsn: 'https://46974b6d1c0649878aae94e80ce1002b@o634926.ingest.sentry.io/5755736',
    release: appName + version,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: .25,
    logErrors: true,
    tracingOptions: {
      Vue: this,
      trackComponents: true
    }
  });

  /* Runtime Exceptions */
  window.onerror = (message, source, line, column, error) => {
    cc(
      `%cUncaught Exception: ${message}\nInfo: ${source} - Ln${line} Col${column}`,
      printf('#FF5555')
    );

    eventApi.logEvent({
      category: 'runtime_exception',
      info: `${message} ${error.toString()}`
    });

    Sentry.captureException(error);
  };

  /* Unhandled Promise Rejections */
  window.onunhandledrejection = function (e) {
    cc(
      `%c REJECTION: ${e.reason}`,
      printf('#FF5555')
    );

    eventApi.logEvent({
      category: 'promise_rejection',
      info: e.reason
    });

    Sentry.captureException(e);
    e.preventDefault();
  };

  /* Vue Errors */
  this.config.errorHandler = (err, vm, info) => {
    cc(
      `%c ERROR: ${err.toString()}\nInfo: ${info}`,
      printf('#FF79C6')
    );

    eventApi.logEvent({
      category: 'vue_exception',
      info: `${info} ${err.toString()}`
    });

    Sentry.captureException(err);
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
  install (app, opts) {
    debug.apply(app);
  }
};
