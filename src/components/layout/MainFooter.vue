<script>
export default {
  name: 'MainFooter',
  data: () => ({
    outboundConfig: Object.freeze([
      { label: 'instagram', title: 'instagram link', href: 'https://www.instagram.com/magister_zito' },
      { label: 'youtube', title: 'youtube link', href: 'https://www.youtube.com/user/fasolplanetarium/videos' },
      { label: 'github', title: 'github link', href: 'https://github.com/MatthewZito' }
    ])
  })
};
</script>

<template>
  <nav class="nav-footer">
    <p class="nav-footer-social-buttons">
      <a
        v-for="({ label, href, title, }, idx) in outboundConfig"
        :key="idx"
        :aria-label="label"
        rel="noreferrer"
        class="fa-icon icon__colored"
        target="_blank"
        :href="href"
        :title="title"
      >
        <font-awesome-icon
          :icon="['fab', label]"
          aria-hidden="true"
        />
      </a>
    </p>
    <p>
      © goldmund
    </p>
  </nav>
</template>

<style scoped>
.icon__colored {
  color: var(--main-accent-color);
}

.icon__colored:hover {
  color: var(--main-accent-active);
}
</style>
