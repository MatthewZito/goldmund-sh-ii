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
          .main-form-grp
            label(htmlFor="email")
              | Email
            input#email.main-form-grp__control(
              required
              type="email"
              name="email"
            )
          .main-form-grp
            label(htmlFor="subject")
              | Subject
            input#subject.main-form-grp__control(
              required
              type="text"
              name="subject"
            )
          .main-form-grp
            label(htmlFor="content")
              | Message
            textarea#content.main-form-grp__control(
              required
              type="text"
              name="content"
              :rows="3"
              placeholder="Enter your message"
            )
          button.btn.btn__primary.btn-lg(
            aria-label="submit form"
            type="submit"
          )
            | Send
        div(
          class="main-form main-.main-form__offset"
          style="margin-left:-15px"
        )
          hr(class="main-form__sep")
          ul.main-list__unstyled
            li
              span.fa-icon
                FAIcon(
                  :icon="['fa', 'key']",
                  aria-hidden="true"
                )
              a(href="'/pub.asc" download)
                | public key
            li
              span.fa-icon
                FAIcon(:icon="['fa', 'fingerprint']")
              | {{ fingerprint }}
            li
              span.fa-icon
                FAIcon(:icon="['fa', 'comment-alt']")
              | Catch me on IRC -> goldmund@freeenode
</template>

<style lang="scss" scoped>
a {
  color: $main-accent-color;

  &:hover,
  &:active {
    color: $main-accent-active;
    text-decoration: none;
  }
}

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

  &-grp {
  margin-bottom: 15px;

    &__control {
      width: 100%;
      height: auto;
      padding: 8px 20px;
      border: 1px solid #000;
      border-radius: 2px;
      display: block;
      font-size: 1.4rem;
      line-height: 1.78;
      color: $main-dark-color;

      &:last-child {
        border-bottom-left-radius: 0;
        border-top-left-radius: 0;
      }

      &:focus {
        outline: 0;
        border-color:#66afe9;
      }

      &::-ms-expand {
        border: 0;
        background-color: transparent;
      }

      &::-moz-placeholder,
      &:-ms-input-placeholder,
      &::-webkit-input-placeholder {
        color: $main-dark-color;
      }
    }
  }
}

.main-form__sep {
  display: block;
}

@media (min-width: 992px) {
  .main-form__offset {
    float: left;
    width: 50%;
    max-width: 600px;
  }


  .main-form__sep {
    display: none;
  }
}

@media (max-width:767px) {
  h1 {
    margin-top: 30px;
  }
}
</style>
