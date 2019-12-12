<template>
  <div>
    <v-text-field
      v-model="password"
      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
      :type="show1 ? 'text' : 'password'"
      name="input-10-1"
      label="パスワード"
      prepend-icon="mdi-lock"
      :rules="[rules.isPassword, rules.passwordLength, rules.passwordFormat]"
      counter
      @click:append="show1 = !show1"
    ></v-text-field>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class passwordUserRegistration extends Vue {
  public show1: boolean = false
  public password: string = ''
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
    }
  }
}
</script>
