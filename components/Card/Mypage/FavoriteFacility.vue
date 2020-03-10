<template>
  <v-card outlined>
    <v-container class="px-5">
      <v-row justify="center" no-gutters>
        <v-col cols="auto" class="mx-auto">
          <v-img height="220" :src="facilityImg"> </v-img>
        </v-col>
      </v-row>

      <v-row no-gutters>
        <v-col>
          <v-card-text class="pa-0">
            <v-card-title class="pl-0 pt-0">
              {{ facilityName }}
            </v-card-title>
          </v-card-text>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col>
          {{ introduction }}
        </v-col>
      </v-row>

      <v-row no-gutters>
        <v-card-actions class="pa-0">
          <v-col class="pa-0">
            <v-btn outlined @click="goFacility">
              詳細ページへ
            </v-btn>
          </v-col>
          <v-col class="pa-0 pl-12 ml-9">
            <v-btn outlined @click="dialog = true">
              お気に入り解除
            </v-btn>
          </v-col>
        </v-card-actions>
      </v-row>
    </v-container>

    <!--モーダル-->
    <div justify="center">
      <v-dialog v-model="dialog" max-width="470">
        <v-card>
          <v-card-text>
            この施設をお気に入りから削除してよろしいですか？</v-card-text
          >
          <v-card-actions>
            <v-btn @click="deleteFavorite(url)">はい</v-btn>
            <v-btn @click="dialog = false">いいえ</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { firestore } from '@/plugins/firebase'

@Component
export default class BookingFasility extends Vue {
  dialog: boolean = false
  @Prop({ required: true, default: '' })
  facilityName!: string

  @Prop({ required: true, default: '' })
  facilityImg!: string

  @Prop({ required: true, default: '' })
  introduction!: string

  @Prop({ required: true, default: '' })
  url!: string

  goFacility() {
    this.$router.push(`/facility/${this.url}/introduction`)
  }

  async deleteFavorite(url: string) {
    await firestore
      .collection('users')
      .doc(this.$route.params.id)
      .collection('likes')
      .doc(url)
      .delete()

    this.$store.commit('mypage/RESET_LIKES')

    this.$store.dispatch('mypage/getLikes', this.$route.params.id)
  }
}
</script>
