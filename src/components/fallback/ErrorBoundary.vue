<script setup>
import {
  ref,
  onErrorCaptured,
  defineProps,
  useContext
} from 'vue';

/* Data */
const hasError = ref(false);

const props = defineProps({
  fallback: {
    type: Object
  },
  propagates: {
    type: Boolean,
    default: false
  }
});

onErrorCaptured((err, vm, info) => {
  hasError.value = true;
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.warn({ err }, { info });
  }
  return !!props.propagates;
});

const { slots } = useContext();
const main = slots.default();

</script>

<template>
<div>
  <div v-if="hasError">
    <component :is="fallback" />
  </div>
  <div v-else>
    <slot :v-bind="{props}" />
  </div>
</div>
</template>
