<script setup>
import {
  computed,
  watch,
  onMounted,
  ref
} from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

/* Est */
const route = useRoute();
const store = useStore();

/* Data */
const num = 3;
const id = Math.floor(Math.random() * num) + 1;

let imageRef = ref(null);

/* Computed */
const getCachedViews = computed(() => store.getters['config/getCachedViews']);

/* Methods */
const addViewToCache = rte => store.dispatch('config/addViewToCache', rte);

function closeAnnoyingImg () {
  imageRef.value.style.display = 'none';
}

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

<template lang="pug">
router-view(v-slot="{ Component }")
  transition(name="fade" mode="out-in")
    keep-alive(:include="getCachedViews")
      component(:is="Component")
img.img__overlay(
  :src="`/rand/m${id}.gif`",
  @click="closeAnnoyingImg",
  ref="imageRef"
  alt="randomized overlay image"
)
</template>

<style lang="scss" scoped>
.img__overlay {
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 999;
  max-height: 150px;

  &:hover {
    cursor: pointer;
  }
}

@media screen and (max-width: $mobile-and-tablet) {
  .img__overlay {
    max-height: 75px;
  }
}
</style>
