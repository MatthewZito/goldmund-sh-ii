import { isObject } from 'js-heuristics';

/* Enums & Config */

const notificationTypes = {
  error: 'exception',
  warning: 'warning',
  success: 'tertiary'
};

let autoId = 0;

/**
 * @description The interval in ms after which the notification will automatically dismiss
 */
const autoDismissInterval = 3000;

/**
 * @description Dispatch a notification to be displayed to the user
 * @param {string} type
 * @param {string} message
 */
export const addNotification = ({ commit, getters, dispatch }, notificationConfig) => {
  if (!isObject(notificationConfig) || !('message' in notificationConfig) || !notificationConfig.type) return;

  if (!notificationTypes[notificationConfig.type]) return;

  // if we are currently showing a notif, recurse this action to debounce
  if (getters.hasPendingNotifications) {
    setTimeout(() => dispatch('addNotification', notificationConfig), autoDismissInterval - 2000);
    return;
  }

  const id = ++autoId;
  const tsPayload = {
    time: new Date(),
    id,
    color: notificationConfig.type,
    ...notificationConfig
  };

  commit('enqueueNotification', tsPayload);

  setTimeout(() => commit('dequeueNotification', id), autoDismissInterval);
};

/**
 * @description Remove a notification from the queue
 * @param {number} id The id of the notification to be removed
 */
export const resolveNotification = ({ commit }, id) => {
  commit('dequeueNotification', id);
};
