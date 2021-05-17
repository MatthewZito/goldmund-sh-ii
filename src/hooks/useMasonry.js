import Masonry from 'masonry-layout';
import { ref } from 'vue';

export {
  useMasonry
};

/**
 * @summary Initialize a responsive masonry grid
 */
function useMasonry () {
  const masonryCharger = ref(null);

  function generateLayout () {
    masonryCharger.value.layout();
  }

  function createMasonry () {
    masonryCharger.value = new Masonry(
      document.querySelector('.grid'), {
        columnWidth: '.grid__sizer',
        itemSelector: '.grid__item',
        gutter: '.gutter-sizer'
      });

    generateLayout();
  }

  function initMasonry () {
    createMasonry();
    generateLayout();
    setTimeout(() => {
      generateLayout();
    }, 1000);
  }

  return { initMasonry };
}
