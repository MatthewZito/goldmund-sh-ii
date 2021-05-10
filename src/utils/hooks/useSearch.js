import { ref, computed, watch } from 'vue';

export {
  useSearch
};

function useSearch (items) {
  const searchTerm = ref('');
  const activeSearchTerm = ref('');

  const availableItems = computed(() => {
    let filteredResults = [];

    if (activeSearchTerm.value) {
      filteredResults = items.filter(byTags(activeSearchTerm));
    } else if (items) {
      filteredResults = items;
    }
    return filteredResults;
  });

  watch(searchTerm, (next) => {
    setTimeout(() => {
      if (next === searchTerm.value) {
        activeSearchTerm.value = next;
      }
    }, 300);
  });

  function updateSearch (v) {
    searchTerm.value = v;
  }

  return {
    searchTerm,
    availableItems,
    updateSearch
  };
}

function byTags ({ value }) {
  return function (post) {
    return  post
      ?.meta
      ?.frontmatter
      ?.tags
      ?.includes(value);
  };
}

// usage
// const {
//   searchTerm,
//   availableItems,
//    updateSearch
// } = useSearch(props.posts);
