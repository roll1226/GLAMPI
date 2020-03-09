<template>
  <div justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="colseCheckSite">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>
            サイト確認
          </v-toolbar-title>
        </v-toolbar>

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
          <v-card-text
            class="text-left mt-5"
            max-width="300"
            style="white-space: pre;"
            v-text="facility.info"
          >
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
      </v-card>
    </v-dialog>
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
export default class CheckFacilitySite extends Vue {
  get dialog(): boolean {
    return this.$store.state.facilityEdit.siteDialog
  }

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

  colseCheckSite() {
    this.$store.commit('facilityEdit/SET_SITE_DIALOG', false)
  }
}
</script>
