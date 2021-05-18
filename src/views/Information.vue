<script setup>
import { about } from '@/data/about.json';

</script>

<template lang="pug">
.grid-row
  .grid-col.grid-col__offset.grid-col__right
    figure.contain
      img.img-responsive.image-centered(
        src="@/assets/images/headshot.jpg"
        alt="a picture of the site admin"
      )
      figcaption.caption
        | Goldmund.sh author and administrator
  .grid-col.grid-col__offset.grid-col__right
    hr.break-hidden
    p.text-main(
      v-for="(para, idx) in about",
      :key="idx"
    )
      | {{ para }}
      hr.break-hidden
    div
      router-link(
        v-slot="{ navigate }"
        to="/communications"
        custom
      )
        button.btn(
          aria-label="navigate to contact page",
          @click="navigate"
        )
          | Communicate
</template>

<style lang="scss" scoped>
@include drop-cap('.text-main');

.break-hidden {
  border-color: #fff;
}

.contain {
  padding: 0;
  margin: 0;
  text-align: left;
}

.caption {
  font-size: 1rem;
  font-style: italic;
}

.image-centered {
  margin-top: 2rem;
}
</style>
