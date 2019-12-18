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
import { auth, twitterProvider } from '@/plugins/firebase'

@Component
export default class Twitter extends Vue {
  async twitterLogin() {
    await auth
      .signInWithPopup(twitterProvider)
      .then((res) => {
        console.log(res)
        this.$store.commit('login/IS_LOGIN', true)
        this.$store.commit('login/SET_SNACKBAR', true)
        this.$store.commit('login/SET_SNACKBAR_TEXT', 'ログインしました。')
        this.$store.commit('login/SET_SNACKBAR_ICON', 'fas fa-check')
        this.$store.commit('login/SET_SNACKBAR_COLOR', 'success')
      })
      .catch(() => {
        this.$store.commit('login/SET_SNACKBAR', true)
        this.$store.commit(
          'login/SET_SNACKBAR_TEXT',
          'ログインに失敗しました。'
        )
        this.$store.commit('login/SET_SNACKBAR_ICON', 'fas fa-exclamation')
        this.$store.commit('login/SET_SNACKBAR_COLOR', 'error')
      })
  }
}
</script>
