<template lang="pug">
figure.container
  img.img-responsive(
    src="@/assets/images/sadmac.jpg"
    alt="error page image"
  )
  figcaption.title
    | An error occurred while loading this post ¯\_(ツ)_/¯
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
}

.title {
  font-size: 2.5vw;
}

@media screen and (max-width: $mobile-and-tablet) {
  .title {
    font-size: 4vw;
  }
}

@media screen and (min-width: 1200px) {
  .title {
    font-size: 1.75em;
  }
}
</style>
