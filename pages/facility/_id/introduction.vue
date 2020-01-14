<template>
  <div>
    <div class="d-flex">
      <h2>
        {{ facility.name }}
      </h2>

      <v-spacer></v-spacer>

      <v-btn icon @click="changeLike">
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

    <OptionListCard />

    <GlammityListCard />

    <!-- コメント -->
    <CommentCard />

    <!-- コメント入力カード -->
    <SendCommentCard />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import PlanCard from '@/components/Card/Facility/Introduction/PlanCard.vue'
import { IFacility, IPlan } from '@/store/facility'
import CommentCard from '@/components/Card/Facility/Introduction/CommentCard.vue'
import GlammityListCard from '@/components/Card/Facility/Introduction/GlammityListCard.vue'
import GlammityCard from '@/components/Card/Glammity/GlammityCard.vue'
import OptionListCard from '@/components/Card/Facility/Introduction/OptionListCard.vue'
import SendCommentCard from '@/components/Card/Facility/Introduction/SendCommentCard.vue'

interface IGlammity {
  title: string
  text: string
  src: string
}

@Component({
  components: {
    PlanCard,
    GlammityListCard,
    CommentCard,
    GlammityCard,
    OptionListCard,
    SendCommentCard
  }
})
export default class introduction extends Vue {
  // ハート
  like: boolean = false

  get facility(): IFacility {
    return this.$store.state.facility.facility
  }

  get plan(): IPlan {
    return this.$store.state.facility.plan
  }

  get isLogin(): boolean {
    return this.$store.state.login.isLogin
  }

  created() {
    this.$store.dispatch('facility/catchFacility', this.$route.params.id)
  }

  changeLike() {
    if (this.isLogin === false) return
    this.like = !this.like
  }
}
</script>
