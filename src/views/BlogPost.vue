<script setup>
import { inject, defineProps, reactive, computed, onMounted  } from 'vue';

/* Est */
const api = inject('$api');

/* Props */
/* Props */
const props = defineProps({
  slug: {
    type: String,
    required: true
  }
});

/* Data */
const post = reactive({
  createdAt: null,
  imgSrc: null,
  sanitized: null,
  subtitle: null,
  tags: null,
  title: null,
  updatedAt: null
});

/* Computed */
const dateFooter = computed(() => {
  const { createdAt, updatedAt } = post;

  let footer = dateConv(createdAt.value);

  if (createdAt.value !== updatedAt.value) {
    const updated = dateConv(updatedAt.value);

    footer += ` (updated on ${updated})`;
  }

  return footer;
});

/* Methods */
async function fetchPost () {
  await api.blog.fetchOne(props.slug, ({ ok, data }) => {
    if (ok) Object.assign(post, data);
  });
}

function dateConv (ts) {
  return new Date(ts).toDateString();
}

/* Init */
onMounted(() => {
  fetchPost();
});
</script>

<template>
  <div
    class="row"
    style="maxWidth:1150px;"
  >
    <div class="main-container">
      <div class="container-section__spacer">
        <h2>
          {{ post.title }}
        </h2>
        <p style="font-weight:700;">
          {{ post.subtitle }}
        </p>
        <hr />
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="post.sanitized" />
        <hr />
        <p style="font-style:italic;color:#777;">
          {{ dateFooter }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-container {
  position: relative;
  min-height: 1px;
  padding-left: 15px;
  padding-right: 15px;
  float: left;
  width: 100%;
}
</style>
