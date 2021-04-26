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

<template>
  <div class="grid-item blog-post">
    <img
      class="img-responsive"
      alt="blog entry thumbnail"
      :src="imgSrc"
    />
    <router-link
      :to="`/blog/${slug}`"
      class="blog-post__overlay"
    >
      <div class="blog-post__content">
        <div class="blog-post__header">
          <h3 class="blog-post__title">
            {{ title }}
          </h3>
        </div>
        <p class="blog-post__desc">
          {{ subtitle }}
        </p>
      </div>
    </router-link>
  </div>
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

  @media screen and (max-width: 768px) {
    font-size: 4em;
  }

  @media screen and (max-width: 400px) {
    font-size: 2em;
  }
}

a {
  text-decoration: none;
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
    color: #ffffff;
    margin-bottom: .25em;
    opacity: .75;
  }

  &__desc {
    @include overlay-text(1, 700);
    color: var(--main-secondary-color);
    margin-bottom: 2em;
  }
}

.blog-post:hover > img {
  filter: blur(3px);
}
</style>
