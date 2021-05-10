<script setup>
import {
  defineProps,
  toRefs
} from 'vue';
import { useStore } from 'vuex';
import { useGetters } from '@/utils';

/* Components */
import Notification from './Notification.vue';

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

</script>
<template lang="pug">
.notification-wrapper
  Notification(
    v-if="hasPending"
    :current="notification"
  )
</template>

<style lang="scss" scoped>
.notification-wrapper {
  display: flex;
  justify-content: center;
}
</style>
