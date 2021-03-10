<script>
import Notification from './Notification.vue';

import { createNamespacedHelpers } from 'vuex';
const { mapGetters, mapActions } = createNamespacedHelpers('notifications');

export default {
  name: 'NotificationDispatch',
  components: {
    Notification
  },
  computed: {
    ...mapGetters([
      'pendingNotifications',
      'hasPendingNotifications'
    ]),
  },
  methods: {
    ...mapActions(['resolveNotification']),
    close (id) {
      this.resolveNotification(id);
    }
  }
};
</script>

<template>
  <div>
    <transition-group
      :name="$style.notif"
      mode="out-in"
    >
      <span
        v-for="notif in pendingNotifications"
        :key="notif.id"
      >
        <Notification
          v-model="hasPendingNotifications"
          :color="notif.color"
          @close="close(notif.id)"
        >
          {{ notif.message }}
        </Notification>
      </span>
    </transition-group>
  </div>
</template>

<style lang="scss" module>
.notif-leave-active,
.notif-enter-active {
  transition: all .75s;
}

.notif-enter {
  opacity: 0;
  transform: translateY(30px);
}

.notif-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
