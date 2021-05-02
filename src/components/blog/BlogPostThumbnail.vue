<script setup>
import { defineProps } from 'vue';

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
    p.blog-post__desc {{ subtitle }}
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
    font-size: 4em;
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

.blog-post {
  &__overlay {
    padding: 20px;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    padding-left: 2em;
    background: linear-gradient(to right, rgba(42,159,255,.2) 0%,rgba(33,33,32,.6) 60%,rgba(33,33,32,.8) 100%);
    background-blend-mode: multiply;
  }

  &__content {
    width: 100%;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    position: relative;
    float: right;
    padding-right: 1.2em;
    padding-bottom: 1em;
  }

  &__header {
    margin-bottom: 2em;
  }

  &__title {
    color: #fff;
    margin-bottom: .25em;
    opacity: .75;
  }

  &__desc {
    @include overlay-text(1, 400);
    color: #fff;
    margin-bottom: 2em;
  }
}

.blog-post:hover > img {
  filter: blur(3px);
}

</style>
