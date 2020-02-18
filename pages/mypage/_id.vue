<template>
  <!--
  containerのmax-width設定:1100px
  v-tabsは領域いっぱい v-tabはwidth:20%(min-width:130px)

  h2右の余白どーすればいいんだ？
-->
  <v-container>
    <v-row no-gutters justify="space-around" align="center" class="mypage-navi">
      <v-col xs="12" cols="auto">
        <h2>
          マイページ
        </h2>
      </v-col>
      <v-col xs="12">
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
          <v-col xs="12" cols="auto">
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
  </v-container>
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

.container {
  max-width: 1100px;
  padding: 28px 0 100px 0;
  .mypage-navi {
    width: 100%;
    margin: 0 0 28px 0;
    h2 {
      padding: 0 45px 0 0;
      font-size: 20px;
      width: max-content;
    }
    .v-tabs {
      .v-tab {
        flex-basis: 20%;
        min-width: 130px;
      }
    }
  }

  .v-card {
    //background-color: bisque;
    width: 99.5%;
    margin: 0 auto;
    min-height: 400px;
    //カード内左右
    padding: 0 60px;
    .mypage-user {
      width: 180px;
      //background-color: whitesmoke;
      //avatar上と右
      margin: 70px 60px 0 0;
      p {
        font-size: 22px;
        text-align: center;
        //アイコンとusernameの間の余白
        margin: 15px 0 0 0;
      }
    }

    .mytop-wrap {
      //background-color: aqua;
      margin: 70px 0 0 0;
      * {
        padding: 0px;
        margin: 0px;
      }
      .v-card__text {
        padding: 0px;
        .v-card__title {
          padding: 0px;
          margin-bottom: 16px;
        }
        ul {
          list-style-type: none;
        }
      }
    }
  }
}

//パソコンサイズの時のCSS記述
@media screen and (min-width: 770px) {
}
</style>
