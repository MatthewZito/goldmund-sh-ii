<script setup>
import { ref } from 'vue';

import MainCacheWrapper from '@/components/layout/MainCacheWrapper.vue';
import MainDrawer from '@/components/layout/MainDrawer.vue';

/* Data */
const isLoading = ref(false);
</script>

<template>
  <div>
    <MainDrawer />
    <main id="main-collapse">
      <MainCacheWrapper />
    </main>
  </div>
</template>

<style lang="scss">
@import './styles/main.min.css';

.row {
  margin-left: -15px;
  margin-right: -15px;
}

.row:after,
.row:before {
  content: " ";
  display: table;
}

.row:after {
  clear: both;
}

.btn:focus,
.btn:focus:active {
  outline: none;
}

.container-section__spacer {
  margin-bottom: 30px;
}

</style>

