<script>
export default {
  name: 'MainDrawer'
};
</script> lines (47 sloc)  1.3 KB

<template>
  <q-drawer
    persistent
    no-swipe-close
    behavior="desktop"
    :value="true"
  >
    <q-list>
      <q-item-label header>Essential Links</q-item-label>
      <q-item clickable tag="a" target="_blank" href="https://github.com/quasarframework/">
        <q-item-section>
          here
        </q-item-section>

      </q-item>
      <q-item clickable tag="a" target="_blank" href="https://chat.quasar.dev">
        <q-item-section>
          here 2
        </q-item-section>
      </q-item>
    </q-list>

  </q-drawer>
</template>
