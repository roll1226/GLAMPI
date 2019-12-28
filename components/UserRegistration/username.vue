<template>
  <div>
    <v-text-field
      v-model="username"
      label="ユーザ名"
      prepend-icon="mdi-account-circle"
      :rules="[rules.usernameLength]"
    ></v-text-field>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class usernameUserRegistration extends Vue {
  // public username: string = ''
  get username(): string {
    return this.$store.state.registration.nickname
  }

  set username(value: string) {
    this.$store.commit('registration/SET_NICKNAME', value)
  }
  public rules: {} = {
    usernameLength: (v: string) =>
      (v && v.length <= 20) || 'ユーザ名は20字以内にて入力してください。'
  }
}
</script>
