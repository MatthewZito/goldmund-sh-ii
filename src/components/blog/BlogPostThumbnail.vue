<script setup>
import { not, objNotEmptyDeep } from 'js-heuristics';

import { defineProps } from 'vue';

/* Props */
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  imgSrc: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  }
});

// if any of the props are null or undefined, trigger error boundary
if (not(objNotEmptyDeep(props))) {
  throw new Error('Rendering error');
}
</script>

<template lang="pug">
.grid__item.blog-post
  img.img-responsive(
    :src="imgSrc"
    alt="blog post thumbnail"
  )
  router-link.blog-post__overlay(:to="`/blog/${slug}`")
    .blog-post__content
      .blog-post__header
        h3.blog-post__title {{ title }}
</template>

<style lang="scss" scoped>
@mixin overlay-text($height, $weight) {
  font-weight: $weight;
  letter-spacing: $height * 1px;
  line-height: 1;
}

h1,
h2,
h3 {
  @include overlay-text(3, 400);

  font-size: 3em;
  text-transform: uppercase;

  @media screen and (max-width: $mobile-and-tablet) {
    font-size: 3em;
  }

  @media screen and (max-width: 400px) {
    font-size: 2em;
  }

  @media (max-width: $mobile-and-tablet) and (min-width: 551px) {
    font-size: 2em;
  }
}

a {
  text-decoration: none !important;
}

img {
  width: 100%;
}

.blog-post {
  &__overlay {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 20px;
    padding-left: 2em;
  }

  &__content {
    position: relative;
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    padding-right: 1.2em;
    float: right;
  }

  &__header {
    margin-bottom: 2em;
  }

  &__title {
    margin-bottom: 0.25em;
    color: #fff;
    font-weight: 700;
  }
}

.blog-post:hover > img {
  filter: blur(3px);
}
</style>
