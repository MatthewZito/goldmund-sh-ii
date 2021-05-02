<script setup>
/* Data */
const outboundConfig = [
  { label: 'instagram', title: 'to instagram', href: 'https://www.instagram.com/magister_zito' },
  { label: 'youtube', title: 'to youtube', href: 'https://www.youtube.com/user/fasolplanetarium/videos' },
  { label: 'github', title: 'to github', href: 'https://github.com/MatthewZito' }
];
</script>

<template lang="pug">
nav.navigator__footer
  p.navigator__footer-social-buttons
    a.fa-icon.icon__colored(
      v-for="({ label, href, title, }, idx) in outboundConfig"
      :key="idx"
      :href="href"
      :title="title"
      :aria-label="label"
      rel="noreferrer"
      target="_blank"
    )
      FAIcon(:icon="['fab', label]" aria-hidden="true")
  p © goldmund
</template>

<style lang="scss" scoped>
.icon__colored {
  color: $main-accent-color;

  &:hover {
    color: $main-accent-active;
  }
}
</style>
