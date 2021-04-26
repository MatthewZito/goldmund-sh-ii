<script setup>
import { computed, watch, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

const route = useRoute();
const store = useStore();

/* Computed */
const getCachedViews = computed(() => store.getters['config/getCachedViews']);

/* Methods */
const addViewToCache = store.dispatch['config/addViewToCache'];

function flagViewForCache () {
  return function () {
    if (route.name) addViewToCache(route);
  };
}

/* Watchers */
watch(() => route.name, flagViewForCache);

/* Init */
onMounted(() => {
  flagViewForCache();
});

</script>

<template>
  <router-view v-slot="{ Component }">
    <transition
      name="fade"
      mode="out-in"
    >
      <keep-alive :include="getCachedViews">
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
</template>
