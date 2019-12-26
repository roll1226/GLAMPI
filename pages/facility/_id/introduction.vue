<template>
  <div>
    <div class="d-flex">
      <h2>
        施設名
      </h2>

      <v-spacer></v-spacer>

      <v-btn icon @click="like = !like">
        <v-icon v-if="!like">mdi-heart</v-icon>
        <v-icon v-else color="pink lighten-1">mdi-heart</v-icon>
      </v-btn>
    </div>

    <v-carousel
      cycle
      hide-delimiter-background
      show-arrows-on-hover
      width="500"
    >
      <v-carousel-item
        v-for="(slider, i) in facility.slider"
        :key="i"
        :src="slider"
      ></v-carousel-item>
    </v-carousel>

    <v-card>
      <v-card-text class="text-left mt-5" max-width="300">
        <div v-for="(info, index) in facility.info" :key="index">
          {{ info }}
        </div>
      </v-card-text>
    </v-card>

    <v-row>
      <v-col
        v-for="(planCard, index) in plan"
        :key="index"
        lg="6"
        md="6"
        sm="6"
        xs="12"
      >
        <PlanCard
          :src="planCard.planImage"
          :plan-title="planCard.planTitle"
          :pay="planCard.pay"
          :url="planCard.pay"
          :details="planCard.details"
        />
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
    <CommentCard />

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
          v-model="comment"
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
        <v-btn class="mx-4" @click="testComment">
          投稿
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import PlanCard from '@/components/Card/Facility/Introduction/PlanCard.vue'
import { IFacility, IPlan } from '@/store/facility'
import CommentCard from '@/components/Card/Facility/Introduction/CommentCard.vue'
import { firestore, timestamp } from '@/plugins/firebase'

interface IGlammity {
  title: string
  text: string
  src: string
}

@Component({
  components: {
    PlanCard,
    CommentCard
  }
})
export default class introduction extends Vue {
  // ハート
  like: boolean = false
  // 星
  rating: number = 0
  // コメント
  comment: string = ''

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

  get facility(): IFacility {
    return this.$store.state.facility.facility
  }

  get plan(): IPlan {
    return this.$store.state.facility.plan
  }

  rules: [] = []

  created() {
    if (window.parent.screen.width <= 420) {
      this.pageSlice = 1
    } else {
      this.pageSlice = 3
    }
    this.$store.dispatch('facility/catchFacility', this.$route.params.id)
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

  async testComment() {
    await firestore.collection('comments').add({
      createdAt: timestamp,
      star: this.rating,
      text: this.comment,
      userId: 'mZ7qYdUy04iiJiM8SvFI',
      facilityUrl: this.$route.params.id
    })
  }
}
</script>
