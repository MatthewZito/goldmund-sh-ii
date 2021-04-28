<script setup>
import { ref, onErrorCaptured } from 'vue';

/* Data */
const hasError = ref(false);

onErrorCaptured((err, vm, info) => {
  hasError.value = true;
});
</script>

<template lang="pug">
div(v-if="hasError")
  | An error occurred
div(v-else="")
  slot
</template>
