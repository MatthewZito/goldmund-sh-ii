<script setup>
import { defineProps, ref, toRefs } from 'vue';

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

const url = window.location.href; // TODO update when using SSG

const shareBtns = [
  { href:`https://www.facebook.com/share.php?u=${url}&title=${title.value}`, icon: ['fab', 'facebook'] },
  { href: `https://twitter.com/intent/tweet?status=${title.value}+${url}`, icon: ['fab', 'twitter'] },
  { href:`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title.value}`, icon: ['fab', 'linkedin'] },
];

/* Methods */
function toggleTargets () {
  hasTargets.value = !hasTargets.value;
}

function open (url) {  // TODO update when using SSG
  window.open(url);
}
</script>
<template lang="pug">
<!-- /* eslint-disable */ -->
.blog-post-card(:style="bgImage")
  .blog-post-card__overlay
  .blog-post-card__share
    button.blog-post-card__icon(@click="toggleTargets")
      FontAwesomeIcon(:icon="['fa', 'share-alt-square']")
    span.blog-post-card__share-targets(
      v-if="hasTargets"
      style="margin-left:5px;"
    )
      button.blog-post-card__icon(
        v-for="({ href, icon }, idx) in shareBtns"
        :key="idx"
        @click="open(href)"
      )
        FontAwesomeIcon(:icon="icon")
  .blog-post-card__content
    .blog-post-card__header
      h1.blog-post-card__title {{ title }}
      h4.blog-post-card__info {{ date }}
    p.blog-post-card__desc {{ subtitle }}
</template>

<style lang="scss" scoped>

$primary-font: 'Montserrat', helvetica, arial, sans-serif;

a {
  text-decoration: none;
}

button {
  font-family: $primary-font;
  border: 0;
  cursor: pointer;
  opacity: .75;
  &:focus {
    outline: 0;
     opacity: 1;
  }
}

.blog-post-card {
  background-size: contain;
  background-repeat: no-repeat;
  width: 100%;
  max-width: 1200px;
  height: 100%;
  min-height: 300px;
  display: block;
  border-radius: 8px;
  position: relative;
  margin: 0 auto;
  // box-shadow: 0px 8px 12px 0px rgba(0,0,0,0.25);

  @media screen and (max-width: 800px) {
    width: 95%;
    max-width: 95%;
  }

  @media screen and (max-width: 600px) {
    background-position: 50% 0%;
    background-size: cover;
    height: 300px;
  }

  &__overlay {
    width:100%;
    height: 100%;
    background: linear-gradient(to right, rgba(42,159,255,.2) 0%,rgba(33,33,32,1) 60%,rgba(33,33,32,1) 100%);
    background-blend-mode: multiply;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;

    @media screen and (max-width: 600px) {
      background: linear-gradient(to bottom, rgba(42,159,255,.2) 0%,rgba(33,33,32,1) 60%,rgba(33,33,32,1) 100%);
    }
  }

  &__share {
    padding: 1em;
    display: inline-block;
    width: 100%;
    max-width: 200px;

    @media screen and (max-width: 600px) {
      display: block;
      width: 100%;
    }
  }

  &__share-targets {
    animation-name: targets;
    animation-duration: 1s;
    > button {
      color: var(--main-error-color);
    }
  }

  &__icon {
    color: var(--main-accent-color);
    background: none;
    padding: 0;
    font-size: 1.2em;

    &:hover {
      color: var(--main-success-color);
      mix-blend-mode: lighten;
    }

    &:not(:first-of-type) {
      margin-left: 5px;
    }
  }

  &__content {
    width: 100%;
    max-width: 370px;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    position:relative;
    float: right;
    padding-right: 1.2em;
    padding-bottom: 1em;

    @media screen and (max-width: 1000px) {
      width: 50%;
    }
    @media screen and (max-width: 600px) {
      width: 100%;
      float: inherit;
      max-width: 100%;
      padding: 0 1em 1em;
    }
  }

  &__header {
    margin-bottom: 2em;
  }

  &__title {
    color: #ffffff;
    margin-bottom: .25em;
    opacity: .75;
  }

  &__info {
    text-transform: uppercase;
    letter-spacing: 2px;
    font-size: .8em;
    color: var(--main-accent-color);
    line-height: 1;
    margin: 0;
    font-weight: 700;
    opacity:.5;
  }

  &__desc {
    color: var(--main-secondary-color);
    font-weight: 300;
    opacity: .84;
    margin-bottom: 2em;
  }
}

h1,h2,h3 {
  text-transform: uppercase;
  letter-spacing: 2px;
  line-height: 1;
  font-weight: 400;
}

.button {
  padding: .5rem 2rem;
  background-color: rgba(255,255,255,.4);
  color: rgba(255,255,255,1);
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
