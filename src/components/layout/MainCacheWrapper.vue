<script setup>
import { computed, watch, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

const route = useRoute();
const store = useStore();

/* Data */
const rootTransition = 'fade-transform';

/* Computed */
const viewKey = computed(() => route.path);

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
  <router-view v-slot="{ Component }" :key="viewKey" >
    <transition
      :name="rootTransition"
      mode="out-in"
    >
      <keep-alive :include="getCachedViews">
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
</template>
