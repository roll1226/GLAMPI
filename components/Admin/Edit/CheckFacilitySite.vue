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
            v-for="(slider, i) in slideImgs"
            :key="i"
            :src="slider"
          ></v-carousel-item>
        </v-carousel>

        <v-card>
          <v-card-text
            class="text-left mt-5"
            max-width="300"
            style="white-space: pre;"
            v-text="info"
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
              :src="planImg[index]"
              :plan-title="planCard.planTitle"
              :pay="planCard.pay"
              :url="''"
              :details="planCard.details"
              :max-guests="planCard.maxGuests"
            />
          </v-col>
        </v-row>
      </v-card>

      <v-card>
        <v-list-item three-line>
          <v-list-item-content>
            <div class="body-2 mb-1">
              オプション一覧
            </div>

            <v-list-item-title class="headline mb-1">
              <v-row dense>
                <v-col
                  v-for="(option, cardIndex) in optionList"
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
                      :src="optionListImg[cardIndex]"
                    >
                      <v-card-title>
                        {{ option.title }}
                      </v-card-title>
                    </v-img>

                    <v-card-subtitle class="pb-0">
                      金額: {{ option.pay.toLocaleString() }}円
                    </v-card-subtitle>

                    <v-card-text
                      class="text--primary"
                      v-text="option.details"
                    ></v-card-text>
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
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import PlanCard from '@/components/Card/Facility/Introduction/PlanCard.vue'
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
  pageSlice: number = 0
  length: number = 0
  page: number = 1

  get dialog(): boolean {
    return this.$store.state.facilityEdit.siteDialog
  }

  get slideImgs(): any {
    return this.$store.state.facilityEdit.checkSliderImg
  }

  get info(): string {
    return this.$store.state.facilityEdit.facilityInfo
  }

  get plan(): any {
    return this.$store.state.facilityEdit.checkPlan
  }

  get planImg(): any {
    return this.$store.state.facilityEdit.checkPlanImg
  }

  get optionList(): any {
    return this.$store.state.facilityEdit.checkOption
  }

  get optionListImg(): any {
    return this.$store.state.facilityEdit.checkOptionImg
  }

  colseCheckSite() {
    this.$store.commit('facilityEdit/SET_SITE_DIALOG', false)
  }
}
</script>
