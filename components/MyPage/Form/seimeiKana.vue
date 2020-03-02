<template>
  <v-row no-gutters>
    <v-col>
      <v-row no-gutters class="margin-delete">
        <v-col cols="auto"> <v-icon>mdi-pencil</v-icon> </v-col>
        <v-col>
          <v-text-field
            v-model="seiKana"
            class="name"
            label="セイ"
            :rules="[rules.seiKanaFormat]"
            counter="20"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-col>
    <v-col>
      <v-text-field
        v-model="meiKana"
        class="name under"
        label="メイ"
        :rules="[rules.meiKanaFormat]"
        counter="20"
      ></v-text-field>
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
