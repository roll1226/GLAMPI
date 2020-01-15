<template>
  <div>
    <v-row>
      <v-col>
        <v-text-field
          v-model="seiKana"
          label="セイ"
          placeholder="セイ"
          :rules="[rules.fname1, rules.seimeiFormat]"
          prepend-icon="mdi-"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          v-model="meiKana"
          placeholder="メイ"
          label="メイ"
          :rules="[rules.lname1, rules.seimeiFormat]"
        ></v-text-field>
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class seimeiKanaUserRegistration extends Vue {
  // public sei: string = ''
  get seiKana(): string {
    return this.$store.state.registration.firstNameKana
  }

  set seiKana(value: string) {
    this.$store.commit('registration/SET_FIRST_NAME_KANA', value)
  }
  // public mei: string = ''
  get meiKana(): string {
    return this.$store.state.registration.lastNameKana
  }

  set meiKana(value: string) {
    this.$store.commit('registration/SET_LAST_NAME_KANA', value)
  }
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
    ],
    seimeiFormat: (v: string) => {
      const pattern = /^[ァ-ヶー]+$/
      return pattern.test(v) || 'セイ・メイは全角カタカナで入力してください。'
    }
  }
}
</script>
