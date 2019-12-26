<template>
  <div>
    <v-card
      v-for="(comment, commentIndex) in comments"
      :key="commentIndex"
      outlined
    >
      <v-card-actions class="py-2 px-4">
        <v-rating
          :value="comment.star"
          readonly
          color="indigo lighten-3"
          dense
          half-increments
          hover
          size="22"
        ></v-rating>
        <span class="grey--text text--lighten-2 caption mr-2">
          ({{ comment.star }})
        </span>

        <v-spacer></v-spacer>

        <span class="subtitle-2">
          {{ comment.date }}
        </span>
      </v-card-actions>

      <v-divider></v-divider>

      <v-card-text class="ml-10 pa-2">
        <v-avatar>
          <v-img class="elevation-2 mr-8" :src="comment.userImg"></v-img>
        </v-avatar>

        <span class="subtitle-1">
          {{ comment.text }}
        </span>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import moment from 'moment'
import { firestore } from '@/plugins/firebase'
import { IComment } from '@/store/facility'

@Component
export default class CommentCard extends Vue {
  userName: string = ''
  userImg: string = ''
  comments: IComment[] = []
  private facilityId: string = ''
  private cnt: number = 0

  async created() {
    await firestore
      .collection('comments')
      .where('facilityUrl', '==', this.$route.params.id)
      .orderBy('createdAt', 'desc')
      .limit(1)
      .onSnapshot((commentSnapshot) => {
        if (!commentSnapshot.empty) {
          commentSnapshot.forEach(async (commentDoc) => {
            const comment = commentDoc.data()
            const date = commentDoc.data().createdAt.toDate()
            await firestore
              .collection('users')
              .doc(comment.userId)
              .get()
              .then((userDoc: any) => {
                this.userName = userDoc.data().nickname
                this.userImg = userDoc.data().userImg

                if (userDoc.data().nickname === '') {
                  this.userName =
                    userDoc.data().lastName + userDoc.data().firstName
                }

                const commentList = {
                  date: moment(date).format('YYYY年MM月DD日'),
                  star: comment.star,
                  text: comment.text,
                  userName: this.userName,
                  userImg: this.userImg
                }

                // this.$store.commit(
                //   'facility/SET_COMMENT_NEW',
                //   commentList
                // )
                this.comments.unshift(commentList)
                if (this.cnt === 0) {
                  this.comments.shift()
                  this.cnt++
                  console.log('hogr')
                }
              })
          })
        }
      })

    await firestore
      .collection('comments')
      .where('facilityUrl', '==', this.$route.params.id)
      .orderBy('createdAt', 'desc')
      .get()
      .then((commentSnapshot) => {
        if (!commentSnapshot.empty) {
          commentSnapshot.forEach((commentDoc: any) => {
            const comment = commentDoc.data()

            firestore
              .collection('users')
              .doc(comment.userId)
              .get()
              .then((userDoc: any) => {
                this.userName = userDoc.data().nickname
                const userUserImg = userDoc.data().userImg

                if (userDoc.data().nickname === '') {
                  this.userName =
                    userDoc.data().lastName + userDoc.data().firstName
                }

                const commentList = {
                  date: moment(commentDoc.data().createdAt.toDate()).format(
                    'YYYY年MM月DD日'
                  ),
                  star: comment.star,
                  text: comment.text,
                  userName: this.userName,
                  userImg: userUserImg
                }

                this.comments.push(commentList)
              })
          })
        }
      })
  }

  // get comments(): IComment {
  //   return this.$store.state.facility.comments
  // }
}
</script>
