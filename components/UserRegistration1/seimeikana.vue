<template>
  <div>
    <v-row>
      <v-col>
        <v-text-field
          v-model="seiKana"
          label="セイ"
          placeholder="セイ"
          :rules="rules.fname1"
          prepend-icon="mdi-"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          v-model="meiKana"
          placeholder="メイ"
          label="メイ"
          :rules="rules.lname1"
        ></v-text-field>
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class seiUserRegistration extends Vue {
  public sei: string = ''
  public mei: string = ''
  public rules: {} = {
    fname1: [
      (v: string) => !!v || 'セイ・メイは必ず入力してください',
      (v: string) =>
        (v && v.length <= 20) ||
        'セイ・メイはそれぞれ20文字以内にて入力してください。'
    ],
    lname1: [
      (v: string) => !!v || 'セイ・メイは必ず入力してください',
      (v: string) =>
        (v && v.length <= 20) ||
        'セイ・メイはそれぞれ20文字以内にて入力してください。'
    ]
  }
}
</script>
