<template>
  <div>
    <v-btn text small :class="loginBtnClass" @click.stop="openCard">
      ログイン
    </v-btn>

    <div justify="center">
      <v-dialog v-model="dialog" max-width="470">
        <v-snackbar v-model="snackbar" :timeout="2000" top left color="error">
          <span>
            メールアドレス又は、パスワードが違います。
          </span>
          <v-icon class="pl-2" style="color: white;">
            fas fa-exclamation
          </v-icon>
        </v-snackbar>

        <v-card :loading="isLoading">
          <v-toolbar-title class="mb-0 pt-5">
            <img
              src="@/assets/svg/logoBg.svg"
              width="200px"
              class="mx-auto d-block"
              alt="GLAMPI"
            />
          </v-toolbar-title>

          <div class="px-5 pb-4 pt-0">
            <v-form ref="form" @submit.prevent="login">
              <v-container class="py-0 px-0">
                <v-row>
                  <v-col cols="12" class="pb-0">
                    <v-text-field
                      ref="name"
                      v-model="user"
                      :rules="[
                        emailRules.isEmail,
                        emailRules.emailLength,
                        emailRules.emailFormat
                      ]"
                      color="rgb(87, 95, 69)"
                      label="メールアドレス"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12">
                    <v-text-field
                      v-model="password"
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show1 ? 'text' : 'password'"
                      :rules="[rules.required, rules.min, rules.max]"
                      name="input-10-1"
                      color="rgb(87, 95, 69)"
                      label="パスワード"
                      hint="6文字以上、20文字以内で入力してください"
                      counter
                      autocomplete="on"
                      @click:append="show1 = !show1"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>

              <v-card-actions class="d-flex justify-center">
                <v-btn
                  class="login-click-btn"
                  :disabled="!formIsValid"
                  type="submit"
                >
                  ログイン
                </v-btn>
              </v-card-actions>

              <v-card-actions class="pb-0">
                <v-spacer></v-spacer>
                <v-btn
                  color="black"
                  text
                  small
                  class="caption"
                  to="/userRegistration"
                  @click="toUserRegistration"
                >
                  会員登録はこちら
                </v-btn>
              </v-card-actions>

              <v-card-actions class="pt-0">
                <v-spacer></v-spacer>
                <ChangePasswordBtn />
              </v-card-actions>
            </v-form>

            <v-divider></v-divider>

            <v-row>
              <v-col class="pb-0">
                <Twitter />
              </v-col>
              <v-col class="pb-0">
                <Facebook />
              </v-col>
            </v-row>
          </div>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'nuxt-property-decorator'
import Twitter from '@/components/Btn/Twitter.vue'
import Facebook from '@/components/Btn/Facebook.vue'
import ChangePasswordBtn from '@/components/Btn/ChangePasswordBtn.vue'

@Component({
  components: {
    Twitter,
    Facebook,
    ChangePasswordBtn
  }
})
export default class LoginModal extends Vue {
  @Prop({ required: true, default: '' })
  loginBtnClass!: string

  show1: boolean = false
  // dialog: boolean = false
  user: string = ''
  password: string = ''

  rules: {} = {
    required: (value: string) => !!value || 'パスワードを入力してください',
    min: (v: string) => (v && v.length >= 6) || '6文字以上で入力してください',
    max: (v: string) => (v && v.length < 21) || '20文字以内で入力してください'
  }

  emailRules: {} = {
    isEmail: (v: string) => !!v || 'メールアドレスは必ず入力してください。',
    emailLength: (v: string) =>
      (v && v.length <= 100) || 'メールアドレスが長すぎます。',
    emailFormat: (v: string) => {
      const pattern = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/
      return (
        pattern.test(v) ||
        'メールアドレスは半角英数字で「XX@XX.XX」の形式にて入力してください。'
      )
    }
  }

  get formIsValid(): string {
    return this.user && this.password
  }

  get isLoading(): boolean {
    return this.$store.state.login.loading
  }

  get dialog(): boolean {
    return this.$store.state.login.loginDialog
  }

  get snackbar(): boolean {
    return this.$store.state.login.snackbarError
  }

  set dialog(value: boolean) {
    this.$store.commit('login/SET_LOGIN_DIALOG', value)
  }

  set snackbar(isSnackbar: boolean) {
    this.$store.commit('login/SET_SNACKBAR_ERROR', isSnackbar)
  }

  openCard() {
    this.$store.commit('login/SET_LOGIN_DIALOG', true)
  }

  @Watch('dialog')
  checkDialog() {
    if (this.dialog === true) return
    const form: any = this.$refs.form
    form.reset()
  }

  login() {
    this.$store.commit('login/SET_LOADING', true)
    this.$store.dispatch('login/loginEmailPass', {
      user: this.user,
      password: this.password
    })
  }

  toUserRegistration() {
    this.$store.commit('login/SET_LOGIN_DIALOG', false)
  }
}
</script>

<style lang="scss">
.login-btn {
  &.theme--light.v-btn {
    color: $site_color_2;
    caret-color: $site_color_2;
  }
}

.login-btn-index {
  &.theme--light.v-btn {
    color: $site_color_8;
    caret-color: $site_color_8;
  }
}

.login-click-btn {
  &.theme--light.v-btn {
    color: $site_color_8;
    caret-color: $site_color_8;
  }
  &.theme--light.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
    background: $site_color_2;
  }
}
</style>
