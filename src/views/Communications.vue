<script setup>
import {
  reactive,
  computed,
  inject
} from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

/* Est */
const store = useStore();
const router = useRouter();
const api = inject('$api');

/* Data */
const fingerprint = 'C899 B092 077E 2A65 C37B B2F7 63E8 AA50 86D4 7BE0';

const formData = reactive({
  email: null,
  subject: null,
  message: null
});

/* Computed */
const isValid = computed(() => Object.values(formData).filter(v => v).length === 3);

async function onSubmit () {
  await api.form.submitComm(formData, ({ ok, error }) => {
    if (!ok) {
      store.dispatch('notifications/addNotification', {
        type: 'error',
        message: error
      });
    } else {
      store.dispatch('notifications/addNotification', {
        type: 'success',
        message: 'Your message has been submitted'
      })
        .finally(() => {
          console.log('here');
          router.push({ name: 'Landing' });
        });
    }
  });
}

</script>

<template lang="pug">
.grid-row
  .grid-col.grid-col__offset.grid-col__right.main-form
    h1.main-title Communications
    form(@submit.prevent.stop="onSubmit")
      p
        | Should you wish to communicate, this is the best means to do so. PGP correspondence is welcome and furthermore encouraged.
        | To this end, find here my self-signed GPG public key and accompanying fingerprint for validation.

      label(htmlFor="email")
        | Email
      input#email.main-form__control(
        v-model="formData.email"
        type="email"
        name="email"
        required
        autocomplete="off"
      )
      label(htmlFor="subject")
        | Subject
      input#subject.main-form__control(
        v-model="formData.subject"
        type="text"
        name="subject"
        required
        :maxlength="99"
        autocomplete="off"
      )
      label(htmlFor="message")
        | Message
      textarea#message.main-form__control(
        v-model="formData.message"
        placeholder="Enter your message"
        type="text"
        name="message"
        required
        :rows="3"
        :maxlength="400"
        autocomplete="off"
      )
      button.btn.tooltipped(
        aria-label="submit form"
        type="submit"
        :disabled="!isValid"
      )
        | Send
        span.tooltip(v-if="!isValid")
          | You'll need to complete the required fields in order to submit this form
  .grid-col.grid-col__offset.grid-col__right
    ul.contact-info
      li
        span.comm-icon
          FAIcon(
            :icon="['fa', 'key']",
            aria-hidden="true"
          )
        a(href="/pub.asc" download)
          | public key
      li
        span.comm-icon

          FAIcon(:icon="['fa', 'fingerprint']")
        | {{ fingerprint }}
      li
        span.comm-icon
          FAIcon(:icon="['fa', 'comment-alt']")
        | Catch me on IRC -> goldmund@freeenode
</template>

<style lang="scss" scoped>
button {
  margin-top: 2rem;
}

.tooltipped {
  @include tooltip-ctrl('.tooltip');
}
.tooltip {
  @include tooltip(fixed);
}

.contact-info {
  padding-left: 0;
}

.comm-icon {
  color: #000;
  width: 2rem;
  height: 2rem;
  display: inline-block;
  line-height: 2rem;
  font-size: 15px;
  text-align: center;
}

.main-form {
  max-width: 800px;

  &__control {
    width: 100%;
    height: auto;
  }
}

@media (max-width: $mobile) {
  .contact-info {
    font-size: .8em;
  }
}

@media (min-width: $tablet-and-desktop) {
  .contact-info {
    margin: 2rem;
    margin-top: 5rem;
  }
}
</style>
