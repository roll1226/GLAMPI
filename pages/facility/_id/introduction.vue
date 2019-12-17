<template>
  <div>
    <h1>
      施設名
    </h1>

    <v-btn icon large @click="like = !like">
      <v-icon v-if="!like">mdi-heart</v-icon>
      <v-icon v-else color="pink lighten-1">mdi-heart</v-icon>
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
      <v-card-text class="text-left mt-5" max-width="300">
        hogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehoge
        hogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehogehoge
      </v-card-text>
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

    <!-- コメント -->
    <v-card outlined>
      <v-card-actions class="py-2 px-4">
        <v-rating
          :value="rating"
          readonly
          color="indigo lighten-3"
          dense
          half-increments
          hover
          size="22"
        ></v-rating>
        <span class="grey--text text--lighten-2 caption mr-2">
          ({{ rating }})
        </span>

        <v-spacer></v-spacer>

        <span class="subtitle-2">
          2019年10月21日
        </span>
      </v-card-actions>

      <v-divider></v-divider>

      <v-card-text class="ml-10 pa-2">
        <v-avatar>
          <v-img
            class="elevation-2 mr-8"
            src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
          ></v-img>
        </v-avatar>

        <span class="subtitle-1">
          コメント表示
        </span>
      </v-card-text>
    </v-card>

    <v-card outlined>
      <v-card-actions class="pt-2 pb-1 px-4">
        <v-rating
          v-model="rating"
          color="indigo lighten-3"
          class="mx-2"
          dense
          size="28"
        ></v-rating>
        <span class="grey--text text--lighten-2 caption mr-2">
          ({{ rating }})
        </span>
      </v-card-actions>

      <v-card-text class="pt-1 pb-0">
        <v-textarea
          solo
          class="mx-2"
          name="input-7-4"
          label="Solo textarea"
          prepend-inner-icon="far fa-comment"
          counter="1000"
        ></v-textarea>
      </v-card-text>

      <v-card-actions class="pt-0">
        <v-spacer></v-spacer>
        <v-btn class="mx-4">
          投稿
        </v-btn>
      </v-card-actions>
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
  // ハート
  like: boolean = false
  // 星
  rating: number = 4
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

  rules: [] = []

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
