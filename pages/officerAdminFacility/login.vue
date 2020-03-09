<template>
  <div class="mt-12 pt-12">
    <v-card :loading="isLoading" class="mx-auto" width="500" outlined>
      <v-toolbar-title class="mb-0 pt-5">
        <img
          src="@/assets/svg/logoBg.svg"
          width="200px"
          class="mx-auto d-block"
          alt="GLAMPI"
        />

        <h1 class="text-center display-1 mt-5 grey--text">
          施設管理
        </h1>
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
                  color="grey darken-1"
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
                  color="grey darken-1"
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
              color="grey lighten-2"
              depressed
              :disabled="!formIsValid"
              type="submit"
            >
              ログイン
            </v-btn>
          </v-card-actions>
        </v-form>
      </div>
    </v-card>

    <v-snackbar
      v-model="snackbar"
      color="error"
      :timeout="2300"
      class="subtitle-1"
    >
      <v-icon color="white" class="mr-2">
        fas fa-exclamation-circle
      </v-icon>

      メールアドレス、又はパスワードが違います。
      <v-btn fab color="white" text @click="closeSnackbar">
        <v-icon>
          fas fa-times
        </v-icon>
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  layout: 'admin'
})
export default class AdminLogin extends Vue {
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

  get snackbar(): boolean {
    return this.$store.state.adminLogin.snackbarError
  }

  get isLoading(): boolean {
    return this.$store.state.adminLogin.isLoading
  }

  set snackbar(value: boolean) {
    this.$store.commit('adminLogin/LOGIN_ERROR', value)
  }

  closeSnackbar() {
    this.$store.commit('adminLogin/LOGIN_ERROR', false)
  }

  login() {
    this.$store.dispatch('adminLogin/login', {
      user: this.user,
      password: this.password
    })
  }
}
</script>
