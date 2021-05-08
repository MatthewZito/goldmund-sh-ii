<script setup>
import {
  reactive,
  computed,
  inject
} from 'vue';
import { useStore } from 'vuex';

/* Est */
const store = useStore();
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

async function onSubmit (x) {
  await api.form.submitComm(formData, ({ ok }) => {
    if (!ok) {
      store.dispatch('notifications/addNotification', {
        type: 'error',
        message: 'testing 123'
      });
    }
  });
}

</script>

<template lang="pug">
.row
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
      )
      label(htmlFor="subject")
        | Subject
      input#subject.main-form__control(
        v-model="formData.subject"
        type="text"
        name="subject"
        required
        :maxlength="99"
      )
      label(htmlFor="content")
        | Message
      textarea#content.main-form__control(
        v-model="formData.message"
        placeholder="Enter your message"
        type="text"
        name="content"
        required
        :rows="3"
        :maxlength="400"
      )
      button.btn.btn__primary(
        aria-label="submit form"
        type="submit"
        :disabled="!isValid"
      )
        | Send
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
    hr
</template>

<style lang="scss" scoped>
button {
  margin-top: 2rem;
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
    display: block;
  }
}

@media (min-width: 1000px) {
  .contact-info {
    margin: 2rem;
  }
}
</style>
