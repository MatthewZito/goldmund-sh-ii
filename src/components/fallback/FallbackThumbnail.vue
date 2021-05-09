<script setup>

</script>

<template lang="pug">
.grid__item
  img.img-responsive.img-controlled(
    alt="blog post thumbnail error image"
    src="@/assets/images/sadmac.jpg"
  )
</template>

<style lang="scss" scoped>
.img-controlled {
  max-width: 50%;
}

@media (max-width: 500px) {
  .img-controlled {
    max-width: 85%;
  }
}
</style>
