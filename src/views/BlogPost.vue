<script setup>
import {
  inject,
  defineProps,
  ref,
  reactive,
  computed,
  onMounted,
  toRefs
} from 'vue';

/* Components */
import BlogPostCard from '@/components/blog/BlogPostCard.vue';

/* Est */
const api = inject('$api');

/* Props */
const props = defineProps({
  slug: {
    type: String,
    required: true
  }
});

/* Data */
let isLoading = ref(true);

const post = reactive({
  createdAt: null,
  imgSrc: null,
  sanitized: null,
  subtitle: null,
  tags: null,
  title: null,
  updatedAt: null
});

const { createdAt, imgSrc, sanitized, subtitle, title, updatedAt } = toRefs(post);

/* Computed */
const dateHeader = computed(() => {
  return dateConv(createdAt.value);
});

const dateFooter = computed(() => {
  if (updatedAt.value) {
    const dateF = dateConv(updatedAt.value);

    return `updated on ${dateF}`;
  }

  return false;
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
  fetchPost()
    .finally(() => isLoading.value = false);
});
</script>

<template>
  <div
    v-if="!isLoading"
    class="row"
    style="maxWidth:1150px;"
  >
    <BlogPostCard
      :title="title"
      :subtitle="subtitle"
      :img-src="imgSrc"
      :date="dateHeader"
    />
    <div class="main-container">
      <div class="container-section__spacer">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="post.sanitized" />
        <hr />
        <p
          v-if="dateFooter"
          style="font-style:italic;color:#777;"
        >
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
