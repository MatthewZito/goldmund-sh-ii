<script setup>
import MarkdownIt from 'markdown-it';
import Prism from 'markdown-it-prism';
import 'prismjs';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-markup-templating';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-docker';
import 'prismjs/components/prism-git';
import 'prismjs/components/prism-haskell';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-graphql';

import { computed, defineProps } from 'vue';

const props = defineProps({
  markDown: {
    type: String,
    required: true
  }
});

const md = computed(() => useMarkdown(props.markDown));

function useMarkdown (raw) {
  const markdown = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true
  }).use(Prism);

  return markdown.render(raw);
}
</script>

<template lang="pug">
div(v-html="md")
</template>
