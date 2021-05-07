<script setup>
import { computed, defineProps, toRefs, watch, reactive } from 'vue';
import { useStore } from 'vuex';
import Notification from './Index.vue';
import { useGetters } from '@/hooks';

/* Est */
const store = useStore();

/* Props  */
const props = defineProps({
  namespace: {
    type: String,
    required: true
  }
});

const { namespace } = toRefs(props);

/* Computed */

const {
  currentNotification: notification,
  hasPendingNotifications: hasPending
} = useGetters('notifications', [
  'currentNotification',
  'hasPendingNotifications'
]);

/* Methods */
function close () {
  store.dispatch(`${namespace.value}/resolveNotification`, notification.value.id);
}

</script>
<template lang="pug">
div
  Notification(
    v-model="hasPending"
    :current="notification"
  )
</template>
