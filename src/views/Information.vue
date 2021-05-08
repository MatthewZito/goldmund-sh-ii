<script setup>
import { about } from '@/data/about.json';

</script>

<template lang="pug">
.row
  .grid-col.grid-col__offset.grid-col__right
    img.img-responsive(
      style="marginTop:30px;"
      alt="A picture of the site admin"
      src="@/assets/images/headshot.jpg"
    )
    p
      | Goldmund.sh author and administrator
  .grid-col.grid-col__offset.grid-col__right
    hr.break-hidden
    p(
      v-for="(para, idx) in about",
      :key="idx"
      class="text-main"
    )
      | {{ para }}
      hr.break-hidden
    div
      router-link(
        v-slot="{ navigate }"
        to="/communications"
        custom
      )
        button.btn.btn__primary(@click="navigate")
          | Communicate
</template>

<style lang="scss" scoped>
.break-hidden {
  border-color: #FFF;
}
</style>
