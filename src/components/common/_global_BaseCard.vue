<script>
export default {
  name: 'BaseCard',
  inheritAttrs: false,
  props: {
    img: {
      type: String,
      required: true,
      default: ''
    },
    tags: {
      type: Object,
      required: false,
      default: () => ({})
    },
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: true
    }
  },
  computed: {
    hasTags () {
      return Object.keys(this.tags).length;
    }
  }
};
</script>

<template>
  <v-flex>
    <v-card
      class="mx-auto"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <v-img
        :src="img"
      />

      <v-card-title>
        {{ title }}
      </v-card-title>

      <v-card-text>
        <div>
          {{ subtitle }}
        </div>
      </v-card-text>

      <v-divider
        v-if="hasTags"
        class="mx-4"
      />

      <v-card-text v-if="hasTags">
        <v-chip-group
          active-class="tertiary white--text"
          column
        >
          <v-chip
            v-for="({ text }, idx) in tags"
            :key="idx"
          >
            {{ text }}
          </v-chip>
        </v-chip-group>
      </v-card-text>

    </v-card>
  </v-flex>
</template>
