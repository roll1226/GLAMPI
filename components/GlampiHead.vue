<template>
  <div>
    <v-snackbar v-model="snackbar" :timeout="2000" top left color="success">
      <span>
        ログインしました。
      </span>
      <v-icon class="pl-2" style="color: white;">
        fas fa-check
      </v-icon>
    </v-snackbar>

    <v-toolbar
      :elevation="elevationHead"
      dense
      width="100%"
      style="background: none;"
    >
      <v-btn text style="position: relative;" width="132px" class="logo" to="/">
        <v-img :src="require('@/assets/svg/logo.svg')" width="132px"></v-img>
      </v-btn>

      <v-spacer></v-spacer>
      <template v-if="!isLogin">
        <LoginModal :login-btn-class="loginBtnClass" />

        <v-divider class="mx-2" inset vertical></v-divider>

        <v-btn text small color="black" to="/userRegistration">
          会員登録
        </v-btn>
      </template>

      <template v-else>
        <v-btn text small class="mypage-btn" :to="`/mypage/${userId}`">
          マイページ
        </v-btn>

        <v-divider class="mx-2" inset vertical></v-divider>

        <v-btn text small color="black" @click="logout">
          ログアウト
        </v-btn>
      </template>
    </v-toolbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import LoginModal from '@/components/Btn/LoginModal.vue'
import { auth } from '@/plugins/firebase'

@Component({
  components: {
    LoginModal
  }
})
export default class GlampiHead extends Vue {
  @Prop({ required: true, default: '' })
  loginBtnClass!: string

  @Prop({ required: true, default: '' })
  elevationHead!: string

  async logout() {
    await auth.signOut().then(() => {
      this.$store.commit('login/IS_LOGIN', false)
    })
  }

  get userId(): string {
    return this.$store.state.login.userUid
  }

  get snackbar(): boolean {
    return this.$store.state.login.snackbarOk
  }

  get isLogin(): boolean {
    return this.$store.state.login.isLogin
  }

  set snackbar(isSnackbar: boolean) {
    this.$store.commit('login/SET_SNACKBAR_OK', isSnackbar)
  }
}
</script>

<style lang="scss" scoped>
.logo {
  margin-left: 12px;
}
.theme--light.v-btn--active:hover::before,
.theme--light.v-btn--active::before {
  opacity: 0;
}

.theme--light.v-btn:hover::before {
  opacity: 0;
}

.mypage-btn {
  &.theme--light.v-btn {
    color: $site_color_2;
    caret-color: $site_color_2;
    background-color: rgba(255, 255, 255, 0.3);
  }
}
</style>
