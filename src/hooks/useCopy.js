import { notNullOrUndefined } from 'js-heuristics';
import { ref, watch } from 'vue';

export {
  useCopyToClipboard
};

/**
 * @summary Exposes bindings to enable copy-to-clipboard on a given el
 */
function useCopyToClipboard (initial) {
  const clipboardRef = ref(initial || '');
  const isSuccess = ref(false);
  const isCopied = ref(false);

  watch(
    clipboardRef,
    str => {
      if (notNullOrUndefined(str)) {
        isCopied.value = true;
        isSuccess.value = cpToClipBoard(str);
      }
    },
    { immediate: !!initial, flush: 'sync' }
  );

  return {
    clipboardRef,
    isSuccess,
    isCopied
  };
}

function cpToClipBoard (input, { target = document.body } = {}) {
  const el = document.createElement('textarea');
  const previouslyFocusedElement = document.activeElement;

  el.value = input;

  el.setAttribute('readonly', '');

  const selection = document.getSelection();

  let originalRange;

  if (selection && selection.rangeCount > 0) {
    originalRange = selection.getRangeAt(0);
  }

  target.append(el);

  el.select();

  el.selectionStart = 0;
  el.selectionEnd = input.length;

  let isSuccess = false;

  try {
    isSuccess = document.execCommand('copy');
  } catch (e) {
    throw new Error(e);
  }

  el.remove();

  if (originalRange && selection) {
    selection.removeAllRanges();

    selection.addRange(originalRange);
  }

  if (previouslyFocusedElement) {
    previouslyFocusedElement.focus();
  }

  return isSuccess;
}
