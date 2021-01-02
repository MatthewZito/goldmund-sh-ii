<template>
  <q-layout view="lHh Lpr lFf">
    <LMToolbar />
    <LMDrawer />
    <LMVestibule />
  </q-layout>
</template>

<script>
import LMVestibule from '@/views/LMVestibule.vue';
import LMDrawer from '@/views/LMDrawer.vue';
import LMToolbar from '@/views/LMToolbar.vue';

export default {
  components: {
    LMVestibule,
    LMDrawer,
    LMToolbar
  },
  name: 'LayoutDefault'
};
</script>
