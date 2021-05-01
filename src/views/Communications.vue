<script setup>
/* data */
const fingerprint = 'C899 B092 077E 2A65 C37B B2F7 63E8 AA50 86D4 7BE0';
</script>

<template lang="pug">
.row
  .main-form
    h1.main-title Communications
    form
      .row
        .main-form.main-form__offset
          p
            .
              Should you wish to communicate, this is the best means to do so. PGP correspondence is welcome and furthermore encouraged.
              To this end, find here my self-signed GPG public key and accompanying fingerprint for validation.
          .form-group
            label(htmlFor="email")
              | Email
            input#email.form-control(
              required
              type="email"
              name="email"
            )
          .form-group
            label(htmlFor="subject")
              | Subject
            input#subject.form-control(
              required
              type="text"
              name="subject"
            )
          .form-group
            label(htmlFor="content")
              | Message
            textarea#content.form-control(
              required
              type="text"
              name="content"
              :rows="3"
              placeholder="Enter your message"
            )
          button.btn.btn-primary.btn-lg(
            aria-label="submit form"
            type="submit"
          )
            | Send
        div(
          class="main-form main-.main-form__offset"
          style="margin-left:-15px"
        )
          ul.main-list__unstyled
            li
              span.fa-icon
                FontAwesomeIcon(
                  :icon="['fa', 'key']",
                  aria-hidden="true"
                )
              a(href="'../../public/pub.asc" download)
                | public key
            li
              span.fa-icon
                FontAwesomeIcon(:icon="['fa', 'fingerprint']")
              | {{ fingerprint }}
</template>

<style lang="scss" scoped>
.main-list {
  &__unstyled {
    margin: 1rem;
    padding-left: 0;
    list-style: none;
  }
}

.main-form {
  position: relative;
  min-height: 1px;
  padding-left: 15px;
  padding-right: 15px;
}

@media (min-width: 992px) {
  .main-form__offset {
    float: left;
    width: 50%;
    max-width: 600px;
  }
}

@media (max-width:767px) {
  h1 {
    margin-top: 30px;
  }
}
</style>
