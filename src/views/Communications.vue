<script setup>
import {
  reactive,
  computed,
  inject,
  onMounted
} from 'vue';
import { useRouter } from 'vue-router';

import {
  useClipboard,
  useTooltip,
  useActions
} from '@/hooks';

/* Est */
const { addNotification } =
  useActions('notifications', [
    'addNotification'
  ]);

const router = useRouter();
const { form } = inject('$api');

/* Data */
const { initTooltip, tooltipRef } = useTooltip();
const { copy, isCopied } = useClipboard();

const fingerprint = 'C899 B092 077E 2A65 C37B B2F7 63E8 AA50 86D4 7BE0';

const formData = reactive({
  email: null,
  subject: null,
  body: null
});

/* Computed */
const isValid = computed(() => Object
  .values(formData)
  .filter(v => !!v)
  .length === 3);

/* Methods */
async function onSubmit () {
  await form.submitMessage(formData, ({ ok, error }) => {
    if (!ok) {
      addNotification({
        type: 'error',
        message: error
      });
    } else {
      addNotification({
        type: 'success',
        message: 'Your comment has been submitted'
      })
        .finally(() => {
          router.push({ name: 'Landing' });
        });
    }
  });
}

function onClickCopy ({ target } = {}) {
  copy(target?.innerText)
    .then(ok => {
      if (ok) {
        addNotification({
          type: 'success',
          message: 'Successfully copied to clipboard'
        });
      }
    });
}

/* A posteriori */
onMounted(() => {
  initTooltip(
    isValid,
    'You\'ll need to complete the required fields in order to submit this form'
  );
});

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
      input.main-form__control(
        v-model="formData.email"
        type="email"
        name="email"
        required
        autocomplete="off"
      )
      label(htmlFor="subject")
        | Subject
      input.main-form__control(
        v-model="formData.subject"
        type="text"
        name="subject"
        required
        :maxlength="99"
        autocomplete="off"
      )
      label(htmlFor="comment")
        | Comment
      textarea.main-form__control(
        v-model="formData.body"
        placeholder="Enter your comment"
        type="text"
        name="comment"
        required
        :rows="3"
        :maxlength="400"
        autocomplete="off"
      )
      span.button__wrapper(
        ref="tooltipRef"
        flow="right"
      )
        button.btn(
          aria-label="submit form"
          type="submit"
          :disabled="!isValid"
        )
          | Send
  .grid-col.grid-col__offset.grid-col__right
    .contact-info
      li
        span.comm-icon
          FAIcon(
            :icon="['fa', 'key']",
            aria-hidden="true"
          )
        a(href="/pub.asc" download)
          | public key
      li(
        @dblclick="onClickCopy"
        tooltip="Double click to copy"
        flow="left"
      )
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

.button__wrapper {
  display: flex;
  width: max-content;
}

.contact-info {
  padding-left: 0;
  list-style: none;

  li:nth-child(even):hover {
    cursor: pointer;
  }
}

.comm-icon {
  display: inline-block;
  width: 2rem;
  height: 2rem;
  color: #000;
  font-size: 15px;
  line-height: 2rem;
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
    font-size: 0.8em;
  }
}

@media (min-width: $tablet-and-desktop) {
  .contact-info {
    margin: 2rem;
    margin-top: 5rem;
  }
}
</style>
