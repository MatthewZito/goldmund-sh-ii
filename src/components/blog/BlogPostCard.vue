<script>
export default {
  name: 'BlogPostCard',
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
  },
  data: () => ({
    url: 'https://static1.squarespace.com/static/51b3dc8ee4b051b96ceb10de/t/58d86b3db3db2b57ce8f2986/1490578241899/?format=2500w'
  }),
  computed: {
    bgImg () {
      return `background-image: url(${this.imgSrc})`;
    }
  }
};
</script>

<template>
  <div
    class="blog-post-card"
    :style="bgImg"
  >
    <div class="blog-post-card__overlay" />
    <div class="blog-post-card__share">
      <button class="blog-post-card__icon">
        <font-awesome-icon
          :icon="['fa', 'share-alt-square']"
          class="blog-post-card__icon"
        />
      </button>
    </div>
    <div class="blog-post-card__content">
      <div class="blog-post-card__header">
        <h1 class="blog-post-card__title">
          title here
        </h1>
        <h4 class="blog-post-card__info">
          {{ new Date().toDateString() }}
        </h4>

      </div>
      <p class="blog-post-card__desc">
        a short description of the post
      </p>
      <button class="blog-post-card__button button button-outline">
        Read
      </button>
    </div>
  </div>
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
  &:focus {
    outline: 0;
  }
}

.blog-post-card {
  background-size: contain;
  background-repeat: no-repeat;
  width: 100%;
  max-width: 1000px;
  height: 100%;
  min-height: 300px;
  display: block;
  margin: 8vh auto;
  border-radius: 8px;
  position: relative;
  box-shadow: 0px 8px 12px 0px rgba(0,0,0,0.25);

  @media screen and (max-width: 800px) {
    width: 95%;
    max-width: 95%;
  }

  @media screen and (max-width: 600px) {
    background-position:50% 0%;
    background-size: cover;
    height: 300px;
  }

  &__overlay {
    width:100%;
    height: 100%;
    border-radius: 8px;
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
    max-width: 130px;

    @media screen and (max-width: 600px) {
      display: block;
      width: 100%;
    }
  }

  &__icon {
    color: var(--main-accent-color);
    mix-blend-mode: lighten;
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
      margin-top: 4.2em;
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
  border-radius: 2px;
}

.button-outline {
  background-color: transparent;
  border: 3px solid #ffffff;
}

.button-outline:hover {
  border-color: var(--main-secondary-color);
  color: var(--main-secondary-color);
}

</style>
