<template>
  <div>
    <div class="d-flex">
      <h1 width="300" height="100" @click="toMyTop">マイページ</h1>
      <v-tabs>
        <v-tabs-slider></v-tabs-slider>
        <v-tab @click="toChangeInfo">情報変更</v-tab>
        <v-divider inset vertical></v-divider>
        <v-tab @click="toBookingList">予約変更</v-tab>
        <v-divider inset vertical></v-divider>
        <v-tab @click="toGlammity">GLAMMITY</v-tab>
        <v-divider inset vertical></v-divider>
        <v-tab @click="toFavorites">お気に入り</v-tab>
        <v-divider inset vertical></v-divider>
        <v-tab @click="toReviews">口コミ</v-tab>
        <v-divider inset vertical></v-divider>
      </v-tabs>
    </div>

    <div class="d-flex">
      <div width="300" height="400" class="ma-5 mr-10">
        <v-avatar color="teal" size="150">
          <v-icon size="130" dark>mdi-account-circle</v-icon>
        </v-avatar>
        <p class="text-center .body-1">username</p>
      </div>
      <div v-if="screen1 == 0"><MyTop></MyTop></div>
      <div v-else-if="screen1 == 1"><ChangeInfo></ChangeInfo></div>
      <div v-else-if="screen1 == 2"><BookingList></BookingList></div>
      <div v-else-if="screen1 == 3"><Glammity></Glammity></div>
      <div v-else-if="screen1 == 4"><Favorites></Favorites></div>
      <div v-else><Reviews></Reviews></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import MyTop from '@/components/MyPage/MyTop.vue'
import ChangeInfo from '@/components/MyPage/ChangeInfo/ChangeInfo.vue'
import BookingList from '@/components/MyPage/BookingList.vue'
import Glammity from '@/components/MyPage/Glammity.vue'
import Favorites from '@/components/MyPage/Favorites.vue'
import Reviews from '@/components/MyPage/Reviews.vue'
import Btn from '@/components/MyPage/Btn.vue'

@Component({
  components: {
    Btn,
    MyTop,
    ChangeInfo,
    BookingList,
    Glammity,
    Favorites,
    Reviews
  }
})
export default class templete extends Vue {
  public screen1: number = 0

  public toMyTop() {
    this.screen1 = 0
  }
  public toChangeInfo() {
    this.screen1 = 1
  }
  public toBookingList() {
    this.screen1 = 2
  }
  public toGlammity() {
    this.screen1 = 3
  }
  public toFavorites() {
    this.screen1 = 4
  }
  public toReviews() {
    this.screen1 = 5
  }
}
</script>

<style lang="scss"></style>
