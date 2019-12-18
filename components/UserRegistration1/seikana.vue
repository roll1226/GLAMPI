<template>
  <div>
    <v-text-field
      v-model="seiKana"
      placeholder="セイ"
      label="セイ"
      :rules="rules.fname1"
    ></v-text-field>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class seikanaUserRegistration extends Vue {
  public seiKana: string = ''
  public rules: {} = {
    fname1: [
      (v: string) => !!v || 'セイ・メイは必ず入力してください',
      (v: string) =>
        (v && v.length <= 20) ||
        'セイ・メイはそれぞれ20文字以内にて入力してください。'
    ]
  }
}
</script>
