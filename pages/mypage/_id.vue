<template>
  <v-container class="mypage-wrapp">
    <v-row no-gutters justify="space-around" align="center" class="mypage-navi">
      <v-col xs="12" cols="auto">
        <h2>
          マイページ
        </h2>
      </v-col>
      <v-col xs="12">
        <v-tabs
          show-arrows
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

    <v-row no-gutters>
      <v-card class="card">
        <v-row
          no-gutters
          class="flex-row justyfy-center justify-sm-space-around"
        >
          <v-col sm="auto" cols="12" class="d-flex justify-center">
            <div class="mypage-user">
              <v-avatar color="rgb(87,95,69)" size="180">
                <v-img :src="userImg"></v-img>
              </v-avatar>
              <p>{{ nickname }}</p>
              <ChangeInfoBtn v-if="screen1 == 1" />
            </div>
          </v-col>

          <v-col cols="12" sm="9">
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
import ChangeInfoBtn from '@/components/MyPage/Btn/ChangeInfoBtn.vue'
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
    Reviews,
    ChangeInfoBtn
  }
})
export default class mypage extends Vue {
  public screen1: number = 0
  public screen2: number = 0

  created() {
    this.$store.commit('mypage/RESET_RESERVATION')
    this.$store.commit('mypage/RESET_GLAMMITY')
    this.$store.commit('mypage/RESET_LIKES')
    this.$store.commit('mypage/RESET_COMMENTS')
    this.$store.dispatch('mypage/getUserData', this.$route.params.id)
    this.$store.dispatch('mypage/getReservationFacility', this.$route.params.id)
    this.$store.dispatch('mypage/getGlammity', this.$route.params.id)
    this.$store.dispatch('mypage/getLikes', this.$route.params.id)
    this.$store.dispatch('mypage/getComments', this.$route.params.id)
  }
  get nickname(): string {
    return this.$store.state.mypage.nickname !== ''
      ? this.$store.state.mypage.nickname
      : this.$store.state.mypage.firstName + this.$store.state.mypage.lastName
  }

  get userImg(): string {
    return this.$store.state.mypage.userImg
  }
}
</script>

<style lang="scss">
.mypage-wrapp {
  overflow: visible !important;
  max-width: 1100px;
  padding: 28px 0 0 0;
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
        padding: 0px;
        min-width: 130px;
      }
    }
  }

  .card {
    width: 100%;
    box-sizing: border-box;
    margin: 0 auto;
    min-height: 400px;
    //カード内左右と下
    padding: 60px 40px;
    .mypage-user {
      width: 180px;
      // margin: 100px 0 0 0;
      p {
        font-size: 22px;
        text-align: center;
        margin: 15px 0 0 0;
      }
      .change-info-btn {
        margin: 20px 0 0 0;
        .v-btn {
          margin: 20px 0 0 0;
          width: 180px;
          height: 36px;
          border-radius: 8px;
        }
        .v-item--active {
          background-color: $site_color_2;
          color: #fff;
        }
      }
    }
    //mypage,Mytopコンポーネント
    .mytop-wrap {
      max-width: 740px;
      * {
        padding: 0px;
        margin: 0px;
      }
      .v-card__text {
        padding: 0 0 32px 0;
        min-width: 200px;
        .v-card__title {
          padding: 0px;
          margin-bottom: 16px;
        }
        ul {
          list-style-type: none;
        }
      }
    }

    //mypage,ChangeInfoコンポーネント
    .changeInfo-wrap {
      .row {
        .row {
          margin: 30px 0 0 0;
          .row {
            margin: 0 0 0 0;
          }
        }
      }
    }

    .row {
      .v-card {
        margin: 0 0 35px 0;
      }
    }
  }
}

@media screen and (max-width: 770px) {
  .container {
    padding: 28px 5px 28px;
    .mypage-navi {
      h2 {
        //スマホサイズの時中央
        padding: 0 0 0 0;
      }
    }

    .v-card {
      width: 100%;
      margin: 0 auto;
      padding: 0 10px 40px;
      .mypage-user {
        margin: 30px 0 0 0;
      }

      .mytop-wrap {
        margin: 30px 30px 20px;
        .v-divider {
          display: none;
        }
        .v-card__text {
          font-size: 14px;
          padding: 0 0 30px 0;
          .v-card__title {
            font-size: 18px;
            margin-bottom: 8px;
          }
          ul {
            list-style-type: none;
            li {
              margin-bottom: 6px;
            }
          }
        }
      }

      .changeInfo-wrap {
        margin: 0px 10px 0;
        .row {
          margin-top: 0px;
        }
      }

      .row {
        margin: 40px 0 0 0;
        .v-card {
          margin: 0 0 30px 0;
          padding: 0;
        }
      }
    }
  }
}
</style>
