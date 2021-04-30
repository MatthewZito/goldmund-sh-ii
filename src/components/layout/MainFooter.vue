<script setup>
/* Data */
const outboundConfig = [
  { label: 'instagram', title: 'to instagram', href: 'https://www.instagram.com/magister_zito' },
  { label: 'youtube', title: 'to youtube', href: 'https://www.youtube.com/user/fasolplanetarium/videos' },
  { label: 'github', title: 'to github', href: 'https://github.com/MatthewZito' }
];
</script>

<template lang="pug">
nav.nav-footer
  p.nav-footer-social-buttons
    a.fa-icon.icon__colored(
      v-for="({ label, href, title, }, idx) in outboundConfig"
      :key="idx"
      :href="href"
      :title="title"
      :aria-label="label"
      rel="noreferrer"
      target="_blank"
    )
      FontAwesomeIcon(:icon="['fab', label]" aria-hidden="true")
  p © goldmund
</template>

<style scoped>
.icon__colored {
  color: var(--main-accent-color);
}

.icon__colored:hover {
  color: var(--main-accent-active);
}
</style>
