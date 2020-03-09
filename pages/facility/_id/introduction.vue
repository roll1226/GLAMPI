<template>
  <div>
    <div class="d-flex">
      <v-card tile width="100%">
        <v-row class="ma-0 pa-0 px-3" justify="space-between">
          <v-col class="ma-0 pa-0" cols="auto">
            <v-card-title class="headline">
              {{ facility.name }}
            </v-card-title>
          </v-col>
          <v-col class="ma-0 pa-0 pt-3" cols="auto">
            <v-btn v-if="isLogin === true" icon @click="changeLike">
              <v-icon v-if="!like">mdi-heart</v-icon>
              <v-icon v-else color="pink lighten-1">mdi-heart</v-icon>
            </v-btn>
            <v-tooltip v-else-if="isLogin === false" bottom>
              <template v-slot:activator="{ on }">
                <v-btn color="grey" icon v-on="on">
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
              </template>
              <span color="pink">
                お気に入りに登録するにはログインが必要です。
              </span>
            </v-tooltip>
          </v-col>
        </v-row>
      </v-card>
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

    <v-card elevation="0">
      <v-card-text
        class="mt-5 body-1"
        max-width="300"
        style="white-space: pre; color:#444;"
        v-text="facility.info"
      >
      </v-card-text>
    </v-card>

    <v-row class="px-2">
      <v-col
        v-for="(planCard, index) in plan"
        :key="index"
        lg="4"
        md="4"
        sm="4"
        xs="12"
      >
        <PlanCard
          :src="planCard.planImage"
          :plan-title="planCard.planTitle"
          :pay="planCard.pay"
          :url="planCard.pay"
          :details="planCard.details"
          :max-guests="planCard.maxGuests"
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
import { Component, Vue, Watch } from 'nuxt-property-decorator'
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
  // like: boolean = false
  get like(): boolean {
    return this.$store.state.facility.like
  }

  get facility(): IFacility {
    return this.$store.state.facility.facility
  }

  get plan(): IPlan {
    return this.$store.state.facility.plan
  }

  get isLogin(): boolean {
    return this.$store.state.login.isLogin
  }

  get facilityId(): string {
    return this.$store.state.facility.uuid
  }

  get userUid(): string {
    return this.$store.state.login.userUid
  }

  // ユーザidをログイン時に登録

  created() {
    this.$store.commit('facilityGlammity/RESET_GLAMMITY_DATA')
    this.$store.dispatch('facility/catchFacility', this.$route.params.id)
    this.chackLike()
  }

  @Watch('userUid')
  chackLike() {
    if (this.isLogin === false) return
    this.$store.dispatch('facility/catchUserLike', {
      userId: this.$store.state.login.userUid,
      facilityId: this.$route.params.id
    })
  }

  changeLike() {
    if (this.isLogin === false) return
    if (this.like === true) {
      this.$store.dispatch('facility/deleteLike', {
        userId: this.userUid,
        facilityId: this.$route.params.id,
        facilityUid: this.facilityId
      })
    } else if (this.like === false) {
      this.$store.dispatch('facility/creatLike', {
        userId: this.userUid,
        facilityId: this.$route.params.id,
        facilityUid: this.facilityId
      })
    }
  }
}
</script>
