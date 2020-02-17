<template>
  <div class="mypage-wrap">
    <v-row no-gutters justify="center" align="center" class="mypage-navi">
      <v-col xs="12" cols="auto">
        <h2>
          マイページ
        </h2>
      </v-col>
      <v-col>
        <v-tabs
          show-arrows="true"
          active-class="font-weight-bold"
          color="rgb(87,95,69)"
        >
          <v-tabs-slider> </v-tabs-slider>
          <v-divider inset vertical></v-divider>
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

    <!--ここより下部分の修正-->

    <v-row no-gutters>
      <v-card>
        <v-row no-gutters>
          <!-- アイコンサイズの半分程度の左右margin -->
          <v-col cols="auto">
            <div class="mypage-user">
              <v-avatar class="promg" size="180">
                <v-icon size="160" dark>mdi-account-circle</v-icon>
              </v-avatar>
              <p>ユーザ名</p>
            </div>
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
      </v-card>
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
.promg {
  background-color: $site_color_2;
}

.mypage-wrap {
  //mypage全体
  max-width: 100%;
  //background-color: aqua;
  margin: 28px auto 100px;
  .mypage-navi {
    //background-color: bisque;
    //h2のvcolとv-tabsのvcolを含む
    margin-bottom: 28px;
    h2 {
      //color: $site_color_2;
      width: max-content;
      margin-right: 45px;
      font-size: 20px;
    }
    .v-tabs {
      .v-tab {
        width: 130px;
      }
    }
  }

  //今こっから下ー
  .v-card {
    background-color: bisque;
    //card内padding左右
    padding: 0 60px;
    .mypage-user {
      //avatarとicon,usernameを含む
      width: 180px;
      background-color: whitesmoke;
      //avatar上と右
      margin: 70px 60px 100px 0;
      p {
        font-size: 22px;
        text-align: center;
        //アイコンとusernameの間の余白
        margin: 15px 0 0 0;
      }
    }
  }
}

//パソコンサイズの時のCSS記述
@media screen and (min-width: 770px) {
}
</style>
