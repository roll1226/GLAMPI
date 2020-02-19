<template>
  <div class="mypage-bg">
    <v-row>
      <v-col lg="2" md="2" sm="2" xs="12">
        <h2 class="mt-2">
          マイページ
        </h2>
      </v-col>

      <v-col>
        <v-tabs background-color="transparent" color="rgb(87, 95, 69)">
          <v-tabs-slider> </v-tabs-slider>
          <v-tab @click="toMyTop">トップ</v-tab>
          <v-divider inset vertical></v-divider>
          <v-tab @click="toChangeInfo">情報変更</v-tab>
          <v-divider inset vertical></v-divider>
          <v-tab @click="toBookingList">予約履歴</v-tab>
          <v-divider inset vertical></v-divider>
          <v-tab @click="toGlammity">GLAMMITY</v-tab>
          <v-divider inset vertical></v-divider>
          <v-tab @click="toFavorites">お気に入り</v-tab>
          <v-divider inset vertical></v-divider>
          <v-tab @click="toReviews">口コミ</v-tab>
          <v-divider inset vertical></v-divider>
        </v-tabs>
      </v-col>
    </v-row>

    <v-row>
      <v-col lg="2" md="2" sm="2" xs="12" class="text-center">
        <v-avatar class="promg" size="180">
          <v-icon size="160" dark>mdi-account-circle</v-icon>
        </v-avatar>
        <p class=".body-1 text-center">username</p>
      </v-col>

      <v-col>
        <MyTop v-if="screen1 == 0" />

        <ChangeInfo v-else-if="screen1 == 1" />

        <BookingList v-else-if="screen1 == 2" />

        <Glammity v-else-if="screen1 == 3" />

        <Favorites v-else-if="screen1 == 4" />

        <Reviews v-else />
      </v-col>
    </v-row>
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

@Component({
  components: {
    MyTop,
    ChangeInfo,
    BookingList,
    Glammity,
    Favorites,
    Reviews
  }
})
export default class mypage extends Vue {
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

<style lang="scss">
.mypage-bg {
  margin: 0 20px;
}
.mypage-wrapp {
  width: 100%;
}

.promg {
  background-color: $site_color_2;
}
</style>
