<template>
  <v-row no-gutters class="align-baseline">
    <v-col cols="auto">
      <v-icon>mdi-pencil</v-icon>
    </v-col>
    <v-col class="d-flex flex-wrap">
      <v-col cols="12" sm="6" class="py-0 pr-0">
        <v-text-field
          v-model="seiKana"
          class="sei"
          label="セイ"
          :rules="[rules.seiKanaFormat]"
          counter="20"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" class="py-0 pr-0">
        <v-text-field
          v-model="meiKana"
          class="mei under"
          label="メイ"
          :rules="[rules.meiKanaFormat]"
          counter="20"
        ></v-text-field>
      </v-col>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class seimeiKanaMypageForm extends Vue {
  // public sei: string = ''
  get seiKana(): string {
    return this.$store.state.mypage.firstNameKana
  }

  set seiKana(value: string) {
    this.$store.commit('mypage/SET_FIRST_NAME_KANA', value)
  }
  // public mei: string = ''
  get meiKana(): string {
    return this.$store.state.mypage.lastNameKana
  }

  set meiKana(value: string) {
    this.$store.commit('mypage/SET_LAST_NAME_KANA', value)
  }
  public rules: {} = {
    seiKanaFormat: (v: string) => {
      const pattern = /^[ァ-ヶー]{1,20}$/
      return pattern.test(v) || 'セイは全角カタカナにて必ず入力してください。'
    },
    meiKanaFormat: (v: string) => {
      const pattern = /^[ァ-ヶー]{1,20}$/
      return pattern.test(v) || 'メイは全角カタカナにて必ず入力してください。'
    }
  }
}
</script>
