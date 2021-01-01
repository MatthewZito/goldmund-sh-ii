/* eslint-disable */
import state from '@/state';

function beforeEach (to, from, next) {
  state.dispatch('api/cancelPendingRequests');
}

export default beforeEach;
