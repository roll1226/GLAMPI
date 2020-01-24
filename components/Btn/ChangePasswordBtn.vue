<template>
  <div>
    <v-btn color="red" text small class="caption" @click.stop="openCard">
      パスワードを忘れた方はこちら
    </v-btn>

    <div justify="center">
      <v-dialog v-model="dialog" max-width="500">
        <v-card :loading="loadings">
          <v-form ref="changePasswordForm" @submit.prevent="send">
            <v-container>
              <v-text-field
                v-model="email"
                label="メールアドレス"
                :rules="[
                  emailRules.isEmail,
                  emailRules.emailLength,
                  emailRules.emailFormat
                ]"
              ></v-text-field>
            </v-container>

            <v-card-actions class="d-flex justify-center">
              <v-btn color="green" :disabled="!email" type="submit">
                送信
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'

@Component({})
export default class ChangePasswordBtn extends Vue {
  email: string = ''

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

  formIsValid() {
    return this.email
  }

  get dialog(): boolean {
    return this.$store.state.login.changePasswordDialog
  }

  set dialog(value: boolean) {
    this.$store.commit('login/SET_CHANGE_PASSWORD_DIALOG', value)
  }

  get loadings(): boolean {
    return this.$store.state.login.loadingChangePassword
  }

  @Watch('dialog')
  checkDialog() {
    if (this.dialog === true) return
    const form: any = this.$refs.changePasswordForm
    form.reset()
  }

  openCard() {
    this.$store.commit('login/SET_CHANGE_PASSWORD_DIALOG', true)
  }

  send() {
    this.$store.commit('login/SET_LOADING_CHANGE_PASSWORD', true)

    const actionCodeSettings = { url: window.location.href }

    this.$store.dispatch('login/changePassword', {
      email: this.email,
      actionCodeSettings
    })
  }
}
</script>
