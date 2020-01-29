<template>
  <v-card outlined>
    <v-card-actions class="pt-2 pb-1 px-4">
      <v-rating
        v-model="rating"
        color="indigo lighten-3"
        class="mx-2"
        dense
        size="28"
        :readonly="!isLogin"
      ></v-rating>
      <span class="grey--text text--lighten-2 caption mr-2">
        ({{ rating }})
      </span>
    </v-card-actions>

    <v-card-text class="pt-1 pb-0">
      <v-textarea
        v-model="comment"
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
        :loading="loading"
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
import { firestore, timestamp } from '@/plugins/firebase'

@Component
export default class SendCommentCard extends Vue {
  // 星
  rating: number = 0
  // コメント
  comment: string = ''
  // ローディング
  loading: boolean = false

  get userUid(): string {
    return this.$store.state.login.userUid
  }

  get isLogin(): boolean {
    return this.$store.state.login.isLogin
  }

  public get formIsValid(): boolean {
    if (this.rating !== 0 && this.comment !== '') {
      return false
    } else {
      return true
    }
  }

  clearComment() {
    this.rating = 0
    this.comment = ''
  }

  async sendComment() {
    this.loading = true
    await firestore
      .collection('facilities')
      .where('displayName', '==', this.$route.params.id)
      .get()
      .then((snapshot) => {
        if (!snapshot.empty) {
          snapshot.forEach(async (doc) => {
            await firestore
              .collection('facilities')
              .doc(doc.id)
              .collection('comments')
              .add({
                createdAt: timestamp,
                star: this.rating,
                text: this.comment,
                userId: this.userUid
              })
              .then(() => {
                this.clearComment()
                this.loading = false
              })
          })
        }
      })
  }
}
</script>
