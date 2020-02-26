<template>
  <div>
    <v-text-field
      v-model="comment"
      label="プロフィールコメント"
      prepend-icon="mdi-message-processing-outline"
      :rules="[rules.commentLength]"
    ></v-text-field>
  </div>
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
