<script setup>
import {
  defineProps,
  toRefs,
  onMounted,
  ref
} from 'vue';

const props = defineProps({
  current: {
    type: Object
  }
});

const snackBarRef = ref(null);

const { current } = toRefs(props);

const { message, color } = current.value;

// TODO FIXME
// const message = 'testing a bunch of things today man';
// const color = 'red';

onMounted(() => {
  snackBarRef.value.className = 'show';
});
</script>

<template lang="pug">
#snackbar.show(ref="snackBarRef")
  | {{ message }}
</template>

<style lang="scss" scoped>

$core-opacity: .6;

@mixin mobile-to {
  opacity: 1;
  bottom: 1rem;
}

#snackbar {
  visibility: hidden;
  min-width: 20rem;
  background-color: v-bind(color);
  color: #FFF;
  text-align: center;
  border-radius: 6px;
  padding: 2rem;
  position: fixed;
  z-index: 9999;
  bottom: 2rem;
  font-size: 1.35rem;

  @media screen and (max-width: $mobile-and-tablet) {
    // left: 20%;
  }

  @media screen and (max-width: $mobile) {
    font-size: 1rem;
  }

  @media screen and (max-width: ($mobile - 100)) {
    // margin-left: -50px;
    padding: 1rem 2rem;
    bottom: 1rem;
    font-size: 1rem;
  }
}

#snackbar.show {
  visibility: visible;
  -webkit-animation: fade-in 0.5s, fade-out 0.5s 2.5s;
  animation: fade-in 0.5s, fade-out 0.5s 2.5s;
  opacity: $core-opacity;

  @media screen and (max-width: ($mobile - 100)) {
    opacity: 1;
  }
}

@-webkit-keyframes fade-in {
  from {
    bottom: 0;
    opacity: 0;
  }

  to {
    bottom: 2rem;
    opacity: $core-opacity;

    @media screen and (max-width: ($mobile - 100)) {
      @include mobile-to;
    }
  }

}

@keyframes fade-in {
  from {
    bottom: 0;
    opacity: 0;
  }
  to {
    bottom: 2rem;
    opacity: $core-opacity;

    @media screen and (max-width: ($mobile - 100)) {
      @include mobile-to;
    }
  }
}

@-webkit-keyframes fade-out {
  from {
    bottom: 2rem;
    opacity: $core-opacity;

    @media screen and (max-width: ($mobile - 100)) {
      @include mobile-to;
    }
  }
  to {
    bottom: 0;
    opacity: 0;
  }
}

@keyframes fade-out {
  from {
    bottom: 2rem;
    opacity: $core-opacity;

    @media screen and (max-width: ($mobile - 100)) {
      @include mobile-to;
    }
  }
  to {
    bottom: 0;
    opacity: 0;
  }
}
</style>
