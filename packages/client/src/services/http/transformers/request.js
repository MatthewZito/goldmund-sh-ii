import state from '@/state';

function transformRequest (data, headers) {

  if (state.getters['settings/isLoggerOn']('http')) {
    const printF = 'color: #50fa7b; font-weight: bold';
    console.log('%c [TRANSFORM:REQUEST]', printF, data, headers);
  }

  return data;
}

export default transformRequest;
