<template>
  <v-row no-gutters>
    <v-col cols="auto"> <v-icon>mdi-account-circle</v-icon> </v-col>
    <v-col>
      <v-text-field
        v-model="username"
        label="ユーザ名"
        :rules="[rules.usernameLength]"
      ></v-text-field>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class usernameMypageForm extends Vue {
  // public username: string = ''
  get username(): string {
    return this.$store.state.mypage.nickname
  }

  set username(value: string) {
    this.$store.commit('mypage/SET_NICKNAME', value)
  }
  public rules: {} = {
    usernameLength: (v: string) =>
      v.length <= 20 || 'ユーザ名は20字以内にて入力してください。'
  }
}
</script>
