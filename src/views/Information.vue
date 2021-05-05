<script setup>
import { about } from '@/data/about.json';

</script>

<template lang="pug">
.row
  .col-main.col-main__offset.col-main__right
    img.img-responsive(
      style="marginTop:30px;"
      alt="A picture of the site admin"
      src="@/assets/images/headshot.jpg"
    )
    p
      | Goldmund.sh author and administrator
  .col-main.col-main__offset.col-main__right
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

.col-main {
  width: 100%;

  &__offset {
    position: relative;
    min-height: 1px;
    padding-left: 15px;
    padding-right: 15px;
  }
}

@media (min-width: 992px) {
  .col-main__right {
    float: left;
    width: 50%;
  }
}

@media (max-width: 768px) {
  .col-main {
    display: flex;
    flex-direction: column;
  }
}
</style>
