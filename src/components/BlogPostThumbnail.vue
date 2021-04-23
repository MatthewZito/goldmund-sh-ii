<script>
export default {
  name: 'BlogPostThumbnail',
  props: {
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
  }
};
</script>

<template>
  <div class="grid-item">
    <img
      class="img-responsive"
      alt="blog entry thumbnail"
      :src="imgSrc"
    />
      <router-link
        :to="`/blog/${slug}`"
        class="project-description"
      >
      <div class="project-text-holder">
        <div class="project-text-inner">
          <h3>
            {{ title }}
          </h3>
          <p>
            {{ subtitle }}
          </p>
        </div>
      </div>
    </router-link>
  </div>
</template>
