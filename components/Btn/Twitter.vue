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
import { auth, provider } from '@/plugins/firebase'

@Component
export default class Twitter extends Vue {
  async twitterLogin() {
    await auth.signInWithPopup(provider).then((res) => {
      console.log(res)
    })
  }

  log() {
    auth.signOut().then(() => {
      console.log('ログアウトしました')
    })
  }
}
</script>
