<script setup>
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

</script>

<template lang="pug">
.grid__item.blog-post
  img.img-responsive(
    alt="blog entry thumbnail"
    :src="imgSrc"
  )
  router-link.blog-post__overlay(:to="`/blog/${slug}`")
    .blog-post__content
      .blog-post__header
        h3.blog-post__title {{ title }}
</template>

<style lang="scss" scoped>
@mixin overlay-text($height, $weight) {
  letter-spacing: $height * 1px;
  line-height: 1;
  font-weight: $weight;
}

h1,h2,h3 {
  @include overlay-text(3, 400);
  text-transform: uppercase;
  font-size: 3em;

  @media screen and (max-width: 768px) {
    font-size: 3em;
  }

  @media screen and (max-width: 400px) {
    font-size: 2em;
  }

  @media (max-width: 768px) and (min-width: 551px) {
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
    padding: 20px;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    padding-left: 2em;

  }

  &__content {
    width: 100%;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    position: relative;
    float: right;
    padding-right: 1.2em;
  }

  &__header {
    margin-bottom: 2em;
  }

  &__title {
    color: #FFF;
    margin-bottom: .25em;
    font-weight: 700;;
  }
}

.blog-post:hover > img {
  filter: blur(3px);
}
</style>
