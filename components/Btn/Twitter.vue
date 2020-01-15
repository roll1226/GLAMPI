<template>
  <v-card-actions class="d-flex justify-center">
    <v-btn
      class="white--text"
      :color="this.$vuetify.theme.themes.dark.twitter"
      style="text-transform: none;"
      @click="twitterLogin"
    >
      <v-icon left>
        fab fa-twitter
      </v-icon>
      Twitterでログイン
    </v-btn>
  </v-card-actions>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class Twitter extends Vue {
  twitterLogin() {
    this.$store.dispatch('login/loginTwitter')
  }
}
</script>
