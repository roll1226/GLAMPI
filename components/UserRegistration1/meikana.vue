<template>
  <div>
    <v-text-field
      v-model="meiKana"
      placeholder="メイ"
      label="メイ"
      :rules="rules.lname1"
    ></v-text-field>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class meikanaUserRegistration extends Vue {
  public meiKana: string = ''
  public rules: {} = {
    lname1: [
      (v: string) => !!v || 'セイ・メイは必ず入力してください',
      (v: string) =>
        (v && v.length <= 20) ||
        'セイ・メイはそれぞれ20文字以内にて入力してください。'
    ]
  }
}
</script>
