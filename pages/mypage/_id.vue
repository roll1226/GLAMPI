<template>
  <div class="mypage-bg">
    <v-row no-gutters class="mypage-navi">
      <v-col>
        <h2>
          マイページ
        </h2>
      </v-col>
      <v-col>
        <!-- background-color="transparent"
        color="rgb(87, 95, 69)"-->
        <v-tabs>
          <v-tabs-slider> </v-tabs-slider>
          <v-tab @click="screen1 = 0">トップ</v-tab>
          <v-divider inset vertical></v-divider>
          <v-tab @click="screen1 = 1">情報変更</v-tab>
          <v-divider inset vertical></v-divider>
          <v-tab @click="screen1 = 2">予約履歴</v-tab>
          <v-divider inset vertical></v-divider>
          <v-tab @click="screen1 = 3">GLAMMITY</v-tab>
          <v-divider inset vertical></v-divider>
          <v-tab @click="screen1 = 4">お気に入り</v-tab>
          <v-divider inset vertical></v-divider>
          <v-tab @click="screen1 = 5">口コミ</v-tab>
          <v-divider inset vertical></v-divider>
        </v-tabs>
      </v-col>
    </v-row>

    <!--とりあえずここより上部分から修正-->

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
}
</script>

<style lang="scss">
// .mypage-bg {
//   margin: 0 20px;
// }
// .mypage-wrapp {
//   width: 100%;
// }
.promg {
  background-color: $site_color_2;
}

.mypage-navi {
  width: max-content;
  margin: 28px auto;
}
</style>
