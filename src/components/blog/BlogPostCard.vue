<script setup>
import {
  defineProps,
  ref,
  toRefs
} from 'vue';

/* Props */
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  },
  imgSrc: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  }
});

/* Data */
const { imgSrc, title } = toRefs(props);

let hasTargets = ref(false);

const bgImage = `background-image: url(${imgSrc.value})`;

const url = window.location.href; // TODO verify

const shareBtns = [
  { href:`https://www.facebook.com/share.php?u=${url}&title=${title.value}`, icon: ['fab', 'facebook'] },
  { href: `https://twitter.com/intent/tweet?status=${title.value}+${url}`, icon: ['fab', 'twitter'] },
  { href:`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title.value}`, icon: ['fab', 'linkedin'] }
];

/* Methods */
function toggleTargets () {
  hasTargets.value = !hasTargets.value;
}
</script>

<template lang="pug">
.blog-card(:style="bgImage")
  .blog-card__overlay
  .blog-card__share
    button.blog-card__icon(
      aria-label="share post"
      @click="toggleTargets"
    )
      FAIcon(:icon="['fa', 'share-alt-square']")
    span.blog-card__share-targets(
      v-if="hasTargets"
      style="margin-left:5px;"
    )
      button.blog-card__icon(
        v-for="({ href, icon }, idx) in shareBtns"
        :key="idx"
        :aria-label="`share post on ${icon[1]}`"
        @click="open(href)"
      )
        FAIcon(:icon="icon")
  .blog-card__content
    .blog-card__header
      h1.blog-card__title {{ title }}
      h2.blog-card__info {{ date }}
    p.blog-card__desc {{ subtitle }}
</template>

<style lang="scss" scoped>

$primary-font: 'Montserrat', helvetica, arial, sans-serif;

button {
  border: 0;
  cursor: pointer;
  font-family: $primary-font;
  opacity: 0.75;

  &:focus {
    opacity: 1;
    outline: 0;
  }
}

.blog-card {
  position: relative;
  display: block;
  width: 100%;
  max-width: 1200px;
  height: 100%;
  min-height: 300px;
  margin: 0 auto;
  margin-top: 20px;
  background-repeat: no-repeat;
  background-size: cover;
  font-size: 1.6rem;

  @media screen and (max-width: $tablet) {
    width: 95%;
    max-width: 95%;
  }

  /* Mobile Full Screen */
  @media screen and (max-width: $mobile-and-tablet) {
    width: 100%;
    max-width: 100%;
    font-size: 1.2rem;
  }

  @media screen and (max-width: $mobile) {
    height: 300px;
    background-position: 50% 0%;
    background-size: cover;
  }

  &__overlay {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background:
      rgba(164, 230, 250, 0.2) linear-gradient(
        to right,
        rgba(39, 196, 245, 0.2),
        rgba(255, 121, 198, 0.2),
        rgba(253, 141, 50, 0.2),
        rgba(112, 192, 80, 0.2),
        rgba(39, 196, 245, 0.2)
      );
    background-blend-mode: multiply;

    @media screen and (max-width: $mobile) {
      background:
        rgba(164, 230, 250, 0.2) linear-gradient(
          to right,
          rgba(39, 196, 245, 0.2),
          rgba(255, 121, 198, 0.2),
          rgba(253, 141, 50, 0.2),
          rgba(112, 192, 80, 0.2),
          rgba(39, 196, 245, 0.2)
        );
    }
  }

  &__share {
    display: inline-block;
    width: 100%;
    max-width: 15rem;
    padding: 1rem;

    @media screen and (max-width: $mobile) {
      display: block;
      width: 100%;
    }
  }

  &__share-targets {
    animation-duration: 1s;
    animation-name: targets;

    > button {
      color: $main-error-color;
    }
  }

  &__icon {
    padding: 0;
    background: none;
    color: $main-accent-color;
    font-size: 2rem;

    &:hover {
      color: $main-success-color;
      mix-blend-mode: lighten;
    }

    &:not(:first-of-type) {
      margin-left: 5px;
    }
  }

  &__content {
    position: relative;
    width: 100%;
    max-width: 40%;
    padding-right: 1.2em;
    padding-bottom: 1em;
    float: right;

    @media screen and (max-width: 1080px) {
      width: 50%;
      max-width: 100%;
    }

    @media screen and (max-width: 895px) {
      width: 80%;
    }

    @media screen and (max-width: $mobile) {
      width: 100%;
      padding: 0 1em 1em;
      float: inherit;
    }
  }

  &__header {
    margin-top: 1em;
  }

  &__title {
    margin-bottom: 0.25em;
    color: #fff;
  }

  &__info {
    margin: 0;
    color: $main-accent-color;
    font-size: 1.2em;
    font-weight: 700;
    letter-spacing: 2px;
    line-height: 1;
    text-transform: uppercase;
  }

  &__desc {
    margin-bottom: 2em;
    color: $main-error-color;
    font-weight: 700;
    text-transform: uppercase;
  }
}

h1,
h2,
h3 {
  font-weight: 400;
  letter-spacing: 2px;
  line-height: 1;
  text-transform: uppercase;
}

@keyframes targets {
  to {
    opacity: 1;
  }

  from {
    opacity: 0;
  }
}

</style>
