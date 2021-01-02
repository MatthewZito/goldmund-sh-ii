<template>
  <q-page class="q-pa-sm">
    <div class="fixed-center col-md-3 col-sm-12 col-xs-12">
      <slot />
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'BaseCentered'
};
</script>
