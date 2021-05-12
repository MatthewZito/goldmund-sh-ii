<script setup>
import {
  ref,
  onErrorCaptured,
  defineProps,
  inject
} from 'vue';

/* Est */
const { event } = inject('$api');

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

onErrorCaptured(async (err, vm, info) => {
  hasError.value = true;
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.warn({ err }, { info });
  }

  event.logEvent({
    category: 'error_boundary',
    info: `${info} ${err.toString()}`
  });

  return !!props.propagates;
});

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
