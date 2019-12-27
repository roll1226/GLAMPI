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

    <GlammityListCard />

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
import GlammityListCard from '@/components/Card/Facility/Introduction/GlammityListCard.vue'
import GlammityCard from '@/components/Card/Glammity/GlammityCard.vue'

interface IGlammity {
  title: string
  text: string
  src: string
}

@Component({
  components: {
    PlanCard,
    GlammityListCard,
    CommentCard
    GlammityCard
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
    await firestore
      .collection('facilities')
      .where('displayName', '==', this.$route.params.id)
      .get()
      .then((snapshot) => {
        if (!snapshot.empty) {
          snapshot.forEach(async (doc) => {
            await firestore
              .collection('facilities')
              .doc(doc.id)
              .collection('comments')
              .add({
                createdAt: timestamp,
                star: this.rating,
                text: this.comment,
                userId: 'mZ7qYdUy04iiJiM8SvFI'
              })
          })
        }
      })
  }
}
</script>
