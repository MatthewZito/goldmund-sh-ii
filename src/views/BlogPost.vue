<script>
function defaultPostData () {
  return {
    createdAt: null,
    imgSrc: null,
    sanitized: null,
    subtitle: null,
    tags: null,
    title: null,
    updatedAt: null
  };
}

export default {
  name: 'BlogPost',
  props: {
    slug: {
      type: String,
      required: true
    }
  },
  data: () => ({
    post: defaultPostData()
  }),
  mounted () {
    this.fetchPost();
  },
  computed: {
    dateFooter () {
      const { createdAt, updatedAt } = this.post;

      let footer = this.dateConv(createdAt);

      if (createdAt !== updatedAt) {
        const updated = this.dateConv(updatedAt);

        footer += ` (updated on ${updated})`;
      }

      return footer;
    }
  },
  methods: {
    async fetchPost () {
      await this.$api.blog.fetchOne(this.slug, ({ ok, data }) => {
        if (ok) Object.assign(this.post, data);
        console.log(this.post);
      });
    },
    dateConv (ts) {
      return new Date(ts).toDateString();
    }
  }
};
</script>

<template>
  <div
    class="row"
    style="maxWidth:1150px;"
  >
    <div class="main-container">
      <div class="container__section-spacer">
        <h2>
          {{ post.title }}
        </h2>
        <p style="fontWeight:700;">
          {{ post.subtitle }}
        </p>
        <hr />
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
