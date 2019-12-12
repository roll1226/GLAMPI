<template>
  <div>
    <h1>
      施設名
    </h1>

    <v-btn large icon>
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-carousel
      cycle
      hide-delimiter-background
      show-arrows-on-hover
      width="500"
    >
      <v-carousel-item
        v-for="(item, i) in items"
        :key="i"
        :src="item.src"
      ></v-carousel-item>
    </v-carousel>

    <v-card>
      <p class="text-left mt-5" max-width="300">
        hogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehoge
        hogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehoge
      </p>
    </v-card>

    <v-row>
      <v-col
        v-for="(card, index) in cards"
        :key="index"
        lg="6"
        md="6"
        sm="6"
        xs="12"
      >
        <v-card>
          <v-img
            :src="card.src"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
          >
            <v-card-title v-text="card.title"></v-card-title>
          </v-img>

          <v-card-actions>
            <v-spacer></v-spacer>

            <!-- モーダルで詳細を表示 -->
            <v-btn>
              <v-icon class="mr-2">
                fas fa-info-circle
              </v-icon>
              詳細
            </v-btn>

            <!-- 予約ページに遷移する -->
            <v-btn>
              <v-icon class="mr-2">
                fas fa-campground
              </v-icon>
              予約
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-card>
      <v-list-item three-line>
        <v-list-item-content>
          <div class="body-2 mb-1">
            GLAMMITY一覧
          </div>

          <v-list-item-title class="headline mb-1">
            <v-row dense>
              <v-col
                v-for="(glammity, cardIndex) in displayLists"
                :key="cardIndex"
                lg="4"
                md="4"
                sm="4"
                xs="6"
              >
                <v-card class="mx-auto" max-width="300">
                  <v-img
                    class="white--text align-end"
                    height="200px"
                    :src="glammity.src"
                  >
                    <v-card-title>
                      {{ glammity.title }}
                    </v-card-title>
                  </v-img>

                  <v-card-subtitle class="pb-0">
                    GLAMMITY紹介文
                  </v-card-subtitle>

                  <v-card-text class="text--primary">
                    <div>
                      {{ glammity.text }}
                    </div>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>

                    <!-- 詳細飛ぶ -->
                    <v-btn>
                      詳細
                    </v-btn>
                    <!-- 参加する -->
                    <v-btn>
                      参加
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
            <div class="text-center">
              <v-pagination
                v-model="page"
                :length="length"
                @input="pageChange"
              ></v-pagination>
            </div>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

interface IItem {
  src: string
}

interface ICard {
  title: string
  src: string
}

interface IGlammity {
  title: string
  text: string
  src: string
}

@Component
export default class introduction extends Vue {
  // スライダー画像
  items: IItem[] = [
    {
      src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg'
    },
    {
      src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg'
    },
    {
      src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg'
    },
    {
      src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'
    }
  ]

  // プラン一覧
  cards: ICard[] = [
    {
      title: 'プラン名1',
      src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg'
    },
    {
      title: 'プラン名2',
      src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg'
    },
    {
      title: 'プラン名3',
      src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg'
    }
  ]

  pageSlice: number = 0
  length: number = 0
  page: number = 1
  list: IGlammity[] = [
    {
      title: 'GLAMMITY1',
      text: '凄い',
      src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg'
    },
    {
      title: 'GLAMMITY2',
      text: 'やばい',
      src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg'
    },
    {
      title: 'GLAMMITY3',
      text: '博俊',
      src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg'
    },
    {
      title: 'GLAMMITY4',
      text: '優人',
      src: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'
    }
  ]
  displayLists?: IGlammity[] = []

  created() {
    if (window.parent.screen.width <= 420) {
      this.pageSlice = 1
    } else {
      this.pageSlice = 3
    }
  }

  mounted() {
    this.length = Math.ceil(this.list.length / this.pageSlice)
    this.displayLists = this.list.slice(0, this.pageSlice)
  }

  pageChange(pageNumber: number) {
    this.displayLists = this.list.slice(
      this.pageSlice * (pageNumber - 1),
      this.pageSlice * pageNumber
    )
  }
}
</script>
