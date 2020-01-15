<template>
  <div>
    <v-text-field
      v-model="password"
      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
      :type="show1 ? 'text' : 'password'"
      label="パスワード"
      prepend-icon="mdi-lock"
      :rules="[rules.isPassword, rules.passwordLength, rules.passwordFormat]"
      counter
      @click:append="show1 = !show1"
    ></v-text-field>
    <v-text-field
      v-model="passwordCheck"
      :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
      :type="show2 ? 'text' : 'password'"
      label="パスワード確認"
      prepend-icon="mdi-"
      hint="パスワードをもう一度入力してください。"
      :rules="[rules.isPasswordCheck, rules.passwordCheck]"
      counter
      @click:append="show2 = !show2"
    ></v-text-field>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class passwordUserRegistration extends Vue {
  public show1: boolean = false
  public show2: boolean = false
  // public password: string = ''
  // public passwordCheck: string = ''
  get password() {
    return this.$store.state.registration.password
  }
  set password(value: string) {
    this.$store.commit('registration/CHECK_PASSWORD', value)
  }
  get passwordCheck() {
    return this.$store.state.registration.passwordCheck
  }
  set passwordCheck(value: string) {
    this.$store.commit('registration/CHECK_PASSWORDCHECK', value)
  }
  public rules: {} = {
    isPassword: (v: string) => !!v || 'パスワードは必ず入力してください。',
    passwordLength: (v: string) =>
      (v.length <= 20 && v.length >= 6) ||
      'パスワードは6桁以上20桁以内にて入力してください。',
    passwordFormat: (v: string) => {
      const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
      return (
        pattern.test(v) ||
        'パスワードは半角英字と、数字の両方を必ず入れてください。'
      )
    },
    isPasswordCheck: (v: string) =>
      !!v || 'パスワード確認は必ず入力してください',
    passwordCheck: (v: string) =>
      v === this.password || 'パスワードが一致していません。'
  }
}
</script>
