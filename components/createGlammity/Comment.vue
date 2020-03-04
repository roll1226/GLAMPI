<template>
  <div>
    <v-row>
      <v-col sm="2">
        <h2>
          コメント入力
        </h2>
      </v-col>
      <v-col sm="9">
        <v-textarea v-model="comment" label="コメント入力"></v-textarea>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class CommentGlammityCreate extends Vue {
  get comment(): string {
    return this.$store.state.glammityCreate.comment
  }

  set comment(value: string) {
    this.$store.commit('glammityCreate/SET_COMMENT', value)
  }
}
</script>
