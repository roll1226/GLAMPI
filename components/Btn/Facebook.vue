<template>
  <v-card-actions class="d-flex justify-center">
    <v-btn
      class="white--text"
      :color="this.$vuetify.theme.themes.dark.facebook"
      style="text-transform: none;"
      @click="facebookLogin"
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
import { auth, facebookProvider } from '@/plugins/firebase'

@Component
export default class Facebook extends Vue {
  async facebookLogin() {
    await auth
      .signInWithPopup(facebookProvider)
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
