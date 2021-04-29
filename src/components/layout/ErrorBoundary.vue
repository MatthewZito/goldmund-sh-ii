<script setup>
import { ref, onErrorCaptured, defineProps, useContext } from 'vue';

/* Data */
const hasError = ref(false);

const props = defineProps({
  params: {
    type: Object
  }
});

onErrorCaptured((err, vm, info) => {
  hasError.value = true;
  return false;
});

const { slots } = useContext();
const main = slots.default();

</script>

<template>
<div>
  <div v-if="hasError">
    error
  </div>
  <div v-else>
    <slot :v-bind="{props}" />
  </div>
</div>
</template>
