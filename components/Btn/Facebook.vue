<template>
  <v-card-actions class="d-flex justify-center">
    <v-btn
      class="white--text"
      :color="this.$vuetify.theme.themes.dark.facebook"
      style="text-transform: none;"
    >
      <v-icon left>
        fab fa-facebook-f
      </v-icon>
      Facebookでログイン
    </v-btn>
  </v-card-actions>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class Facebook extends Vue {}
</script>
