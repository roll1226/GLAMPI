<template>
  <v-card elevation="0">
    <v-card-actions class="pt-2 pb-1 px-4">
      <v-rating
        v-model="Rating"
        color="indigo lighten-3"
        class="mx-2"
        dense
        size="28"
        :readonly="!isLogin"
      ></v-rating>
      <span class="grey--text text--lighten-2 caption mr-2">
        ({{ Rating }})
      </span>
    </v-card-actions>

    <v-card-text class="pt-1 pb-0">
      <v-textarea
        v-model="Comment"
        solo
        class="mx-2"
        name="input-7-4"
        label="コメント入力欄"
        prepend-inner-icon="far fa-comment"
        counter="1000"
        :disabled="!isLogin"
      ></v-textarea>
    </v-card-text>

    <v-card-actions class="pt-0">
      <v-spacer></v-spacer>
      <v-btn
        class="mx-4"
        :loading="Loading"
        :disabled="formIsValid || !isLogin"
        @click="sendComment"
      >
        投稿
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class SendCommentCard extends Vue {
  get userUid(): string {
    return this.$store.state.login.userUid
  }

  get isLogin(): boolean {
    return this.$store.state.login.isLogin
  }

  get Loading(): boolean {
    return this.$store.state.facility.loading
  }

  get Rating(): number {
    return this.$store.state.facility.rating
  }

  set Rating(star: number) {
    this.$store.commit('facility/SET_RATING', star)
  }

  get Comment(): string {
    return this.$store.state.facility.comment
  }

  set Comment(comment: string) {
    this.$store.commit('facility/SET_COMMENTS', comment)
  }

  public get formIsValid(): boolean {
    if (this.Rating !== 0 && this.Comment !== '') {
      return false
    } else {
      return true
    }
  }

  sendComment() {
    this.$store.commit('facility/SET_LOADING', true)
    this.$store.dispatch('facility/postComment', {
      displayName: this.$route.params.id,
      rating: this.Rating,
      comment: this.Comment,
      uuid: this.userUid
    })
  }
}
</script>
