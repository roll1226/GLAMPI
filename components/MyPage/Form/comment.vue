<template>
  <v-row no-gutters>
    <v-col cols="auto"> <v-icon>mdi-message-processing-outline</v-icon> </v-col>
    <v-col>
      <v-text-field
        v-model="comment"
        label="プロフィールコメント"
        :rules="[rules.commentLength]"
        counter="280"
      ></v-text-field>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class commentMypageForm extends Vue {
  // public username: string = ''
  get comment(): string {
    return this.$store.state.mypage.comment
  }

  set comment(value: string) {
    this.$store.commit('mypage/SET_COMMENT', value)
  }
  public rules: {} = {
    commentLength: (v: string) =>
      v.length <= 280 || 'プロフィールコメントは280字以内にて入力してください。'
  }
}
</script>
