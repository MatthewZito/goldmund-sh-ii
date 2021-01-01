/* eslint-disable no-console */
import { isSerialized } from '@/utils/heuristics';

function transformResponse (data) {
  let deserialized = data;

  if (isSerialized(data)) deserialized = JSON.parse(data);

  const printF = 'color: #50fa7b; font-weight: bold';
  console.log('%c [TRANSFORM:RESPONSE]', printF, deserialized);

  return deserialized;
}

export default transformResponse;
