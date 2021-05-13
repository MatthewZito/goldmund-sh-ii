<template lang="pug">
.container
  .box-1
    .inner
  .box-2
    .inner
</template>

<style lang="scss" scoped>
$s: 3rem;
.container {
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
}
.box-1 {
  width: $s;
  height: $s;
  padding: 3px;
  position: absolute;
  background: $main-accent-color;
  animation: clockwise 3s ease-in-out 0s infinite alternate;
}

.box-2 {
  width: $s;
  height: $s;
  padding: 3px;
  background: $main-secondary-color;
  transform: rotate(45deg);
  animation: x-clockwise 3s ease-in-out 0s infinite alternate;
}

.inner {
  width: 100%;
  height: 100%;
  background-color: #FFF;
}

/* Animations */
@keyframes clockwise {
  0% {
    transform: rotate(0);
  }
  25% {
    transform: rotate(90deg);
  }
  50% {
    transform: rotate(180deg);
  }
  75% {
    transform: rotate(270deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes x-clockwise {
  0% {
    transform: rotate(45deg);
  }
  25% {
    transform: rotate(-45deg);
  }
  50% {
    transform: rotate(-135deg);
  }
  75% {
    transform: rotate(-225deg);
  }
  100% {
    transform: rotate(-315deg);
  }
}
</style>
