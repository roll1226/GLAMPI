<template>
  <div>
    <v-text-field
      v-model="passwordCheck"
      :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
      :type="show2 ? 'text' : 'password'"
      label="パスワード確認"
      prepend-icon="mdi-lock"
      hint="パスワードをもう一度入力してください。"
      counter
      @click:append="show2 = !show2"
    ></v-text-field>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class passwordCheckUserRegistration extends Vue {
  public show1: boolean = false
  public passwordCheck: string = ''
  public show2: boolean = false
}
</script>
