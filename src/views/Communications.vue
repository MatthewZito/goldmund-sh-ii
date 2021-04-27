<script setup>
</script>

<template lang="pug">
<!-- /* eslint-disable */ -->
.row
  .main-form
    .container-section__spacer
      h1 Communications
    .container-section__spacer
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
                required type="email"
                name="email"
              )
            .form-group
              label(htmlFor="subject")
                | Subject
              input#subject.form-control(
                required type="text"
                name="subject"
              )
            .form-group
              label(htmlFor="content")
                | Message
              textarea#content.form-control(
                required type="text"
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
                  i.fas.fa-key(aria-hidden="true")
                a(href="'../../public/pub.asc" download)
                  | public key
              li
                span.fa-icon
                  i.fas.fa-fingerprint(aria-hidden="true")
                | 306E 7D6A 359E 3448 F2F4  F85A 204C 907B 2280 7B5B
</template>

<style scoped>
.main-list__unstyled {
  padding-left: 0;
  list-style: none;
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
  }
}
</style>
