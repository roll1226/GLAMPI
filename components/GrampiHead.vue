<template>
  <div>
    <v-snackbar v-model="snackbar" absolute bottom right :color="snackbarColor">
      <span>
        {{ snackbarText }}
      </span>
      <v-icon dark>
        {{ snackbarIcon }}
      </v-icon>
    </v-snackbar>

    <v-toolbar class="mb-5" dense>
      <v-btn text style="position: relative;" width="132px" to="/">
        <LogoImage />
      </v-btn>

      <v-spacer></v-spacer>
      <template v-if="!isLogin">
        <LoginModal />

        <v-divider class="mx-2" inset vertical></v-divider>

        <v-btn text small color="green">
          会員登録
        </v-btn>
      </template>

      <template v-else>
        <v-btn text small color="red" @click="logout">
          ログアウト
        </v-btn>

        <v-divider class="mx-2" inset vertical></v-divider>

        <v-btn text small color="primary">
          マイページ
        </v-btn>
      </template>
    </v-toolbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import LoginModal from '@/components/Btn/LoginModal.vue'
import { auth } from '@/plugins/firebase'

import LogoImage from '@/components/Image/LogoImage.vue'

@Component({
  components: {
    LoginModal,
    LogoImage
  },
  computed: {
    isLogin(): boolean {
      return this.$store.state.login.isLogin
    },
    snackbarText(): string {
      return this.$store.state.login.snackbarText
    },
    snackbarIcon(): string {
      return this.$store.state.login.snackbarIcon
    },
    snackbarColor(): string {
      return this.$store.state.login.snackbarColor
    }
  }
})
export default class GlampiHead extends Vue {
  async logout() {
    await auth.signOut().then(() => {
      this.$store.commit('login/IS_LOGIN', false)
    })
  }

  get snackbar(): boolean {
    return this.$store.state.login.snackbar
  }

  set snackbar(isSnackbar: boolean) {
    this.$store.commit('login/SET_SNACKBAR', isSnackbar)
  }
}
</script>

<style lang="scss" scoped>
.theme--light.v-btn--active:hover::before,
.theme--light.v-btn--active::before {
  opacity: 0;
}
</style>
