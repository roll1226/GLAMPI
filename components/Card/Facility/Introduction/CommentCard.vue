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
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-avatar v-on="on">
              <v-img class="elevation-2 mr-8" :src="comment.userImg"></v-img>
            </v-avatar>
          </template>

          <span>
            {{ comment.userName }}
          </span>
        </v-tooltip>

        <span class="subtitle-1">
          {{ comment.text }}
        </span>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { IComment } from '@/store/facility'

@Component
export default class CommentCard extends Vue {
  userName: string = ''
  userImg: string = ''
  // comments: IComment[] = []
  commentList: IComment = {
    date: '',
    star: 0,
    text: '',
    userName: '',
    userImg: ''
  }
  private facilityId: string = ''
  private cnt: number = 0

  get comments(): IComment[] {
    return this.$store.state.facility.comments
  }

  created() {
    this.$store.dispatch('facility/getComment', {
      displayName: this.$route.params.id
    })
  }
}
</script>
