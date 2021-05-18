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
  display: flex;
  height: 90vh;
  align-items: center;
  justify-content: center;
  background-color: transparent;
}

.box-1 {
  position: absolute;
  width: $s;
  height: $s;
  padding: 3px;
  animation: clockwise 3s ease-in-out 0s infinite alternate;
  background: $main-accent-color;
}

.box-2 {
  width: $s;
  height: $s;
  padding: 3px;
  animation: x-clockwise 3s ease-in-out 0s infinite alternate;
  background: $main-secondary-color;
  transform: rotate(45deg);
}

.inner {
  width: 100%;
  height: 100%;
  background-color: #fff;
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
