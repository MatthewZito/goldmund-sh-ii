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
    a.social-icon(
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
.social-icon {
  display: inline-block;
  width: 2.5rem;
  height: 2rem;
  color: $main-accent-color;
  font-size: 1.2rem;
  line-height: 2rem;
  text-align: center;

  &:hover {
    color: $main-accent-active;
  }
}
</style>
