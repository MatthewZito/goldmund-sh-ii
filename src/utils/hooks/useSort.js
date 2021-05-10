import { ref, computed } from 'vue';

export {
  useSort
};

function useSort (items, sortProp) {
  const SORT_KEYS = {
    ASC: 'ASC',
    DESC: 'DESC'
  };

  const sorting = ref(null);

  const displayedItems = computed(() => {
    if (!sorting.value) return items.value;

    return items.slice().sort((i1, i2) => {
      // asc and match
      if (sorting.value === SORT_KEYS.ASC && i1[sortProp] > i2[sortProp]) {
        return 1;
        // asc no match
      } else if (sorting.value === SORT_KEYS.ASC) {
        return -1;
        // desc and no match
      } else if (sorting.value === SORT_KEYS.DESC && i1[sortProp] > i2[sortProp]) {
        return -1;
      } else {
        // desc and match
        return 1;
      }
    });
  });

  function sort (mode) {
    sorting.value = mode;
  }

  return {
    SORT_KEYS,
    sorting,
    displayedItems,
    sort
  };
}

// const { ... } = useSort(availableItems, 'prop')
