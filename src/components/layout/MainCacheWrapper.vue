<script setup>
import { computed, watch, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

const route = useRoute();
const store = useStore();

/* Computed */
const getCachedViews = computed(() => store.getters['config/getCachedViews']);

/* Methods */
const addViewToCache = rte => store.dispatch('config/addViewToCache', rte);

/* Watchers */
watch(
  () => route.name,
  () => addViewToCache(route)
);

/* Init */
onMounted(() => {
  addViewToCache(route);
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
