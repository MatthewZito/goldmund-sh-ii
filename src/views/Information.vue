<script setup>

</script>

<template lang="pug">
.row
  .col-main.col-main__offset.col-main__right
    img(
      class="img-responsive"
      style="marginTop:30px;"
      alt="A picture of the site admin"
      src="@/assets/images/headshot.jpg"
    )
    p
      | Goldmund.sh author and administrator
  .col-main.col-main__offset.col-main__right
    hr
    p
      | Some info will go here
    div
      router-link(
        v-slot="{ navigate }"
        to="/communications"
        custom
      )
        button.btn.btn-primary(@click="navigate")
          | Communicate
</template>

<style scoped>
.col-main {
  width: 100%;
}

.col-main__offset {
  position: relative;
  min-height: 1px;
  padding-left: 15px;
  padding-right: 15px;
}

@media (min-width: 992px) {
  .col-main__right {
    float: left;
    width: 50%;
  }
}
</style>
