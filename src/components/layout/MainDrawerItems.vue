<script>
import { resolve } from 'path';

export default {
  name: 'MainDrawerItems',
  props: {
    routes: {
      type: Array,
      required: true
    },
    basePath: {
      type: String,
      required: false,
      default: ''
    }
  },
  methods: {
    isNested (route) {
      return route.children && route.children.length > 0;
    },
    resolvePath (path) {
      return resolve(this.basePath, path);
    }
  }
};
</script>

<style>
  .layout-drawer__icon {
    margin-bottom: 8px;
    margin-top: 8px;
  }
</style>

<template>
  <v-list class="pa-0">
    <div v-for="(route, idx) in routes" :key="idx">
      <v-list-item
        v-if="!isNested(route)"
        :dense="isNested(route)"
        :to="resolvePath(route.path)" ripple="ripple"
      >
        <v-tooltip right>
          <template v-slot:activator="{on}">
            <div
              class="d-inline-block"
              v-on="on"
            >
              <v-list-item-icon class="layout-drawer__icon">
                <v-icon v-if="route.meta.icon">
                  {{ route.meta.icon }}
                </v-icon>
              </v-list-item-icon>
            </div>
          </template>
          <span>
            {{ route.meta.label }}
          </span>
        </v-tooltip>

        <v-list-item-content>
          <v-list-item-title>
            {{ route.meta.label }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-group
        v-else
        :prepend-icon="route.meta.icon"
        color="integrity"
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>
              {{ route.meta.label }}
            </v-list-item-title>
          </v-list-item-content>
        </template>

        <MainDrawerItems
          :routes="route.children"
          :base-path="resolvePath(route.path)"
        />
      </v-list-group>
    </div>
  </v-list>
</template>
