<template>
  <v-row no-gutters class="review-wrap">
    <v-col
      v-for="(comment, commentIndex) in commentList"
      :key="commentIndex"
      lg="12"
      md="12"
      sm="12"
      xs="12"
    >
      <CommentCard
        :facility-name="comment.facilityName"
        :star="comment.star"
        :text="comment.text"
        :date="comment.date"
        :url="comment.date"
      />
    </v-col>
  </v-row>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { IComment } from '@/store/mypage'
import CommentCard from '@/components/Card/Mypage/CommentCard.vue'

@Component({
  components: {
    CommentCard
  }
})
export default class Reviews extends Vue {
  get commentList(): IComment[] {
    return this.$store.state.mypage.comments
  }
}
</script>
