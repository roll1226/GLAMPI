<template>
  <div>
    <v-card class="mx-auto">
      <v-card-title>
        情報登録
      </v-card-title>
      <v-card-text>
        <v-textarea v-model="info" label="施設紹介"></v-textarea>
      </v-card-text>

      <v-divider class="mx-2"></v-divider>

      <v-card-title>
        スライダー画像
      </v-card-title>
      <v-card-text>
        <v-row>
          <FacilitySliderEdit
            v-for="(slider, index) in sliderCnt"
            :key="index"
            :index-cnt="index"
          />

          <v-col cols="4" class="d-flex flex-row align-center pt-10">
            <v-btn class="mt-5" fab depressed @click="plusSliderList">
              <v-icon dark>mdi-plus</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider class="mx-2"></v-divider>

      <v-card-title>
        予約プラン
      </v-card-title>
      <v-card-text>
        <FacilityPlanEdit
          v-for="(plan, index) in planCnt"
          :key="index"
          :index-cnt="index"
        />
      </v-card-text>

      <div class="text-center mb-6">
        <v-btn fab depressed @click="plusPlanList">
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>
      </div>

      <v-divider class="mx-2"></v-divider>

      <v-card-title>
        オプション
      </v-card-title>
      <v-card-text>
        <FacilityOptionEdit
          v-for="(option, index) in optionCnt"
          :key="index"
          :index-cnt="index"
        />
      </v-card-text>

      <div class="text-center mb-6">
        <v-btn fab depressed @click="plusOptionList">
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>
      </div>

      <v-divider class="mx-2"></v-divider>

      <v-card-title>
        施設関連タグ
      </v-card-title>
      <v-card-text>
        <FacilityTagsEdit />
      </v-card-text>

      <CheackEditBtn />

      <FacilityEditEnd />
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
// import { storage } from '@/plugins/firebase'
import FacilityPlanEdit from '@/components/Admin/Edit/FacilityPlanEdit.vue'
import FacilityOptionEdit from '@/components/Admin/Edit/FacilityOptionEdit.vue'
import FacilitySliderEdit from '@/components/Admin/Edit/FacilitySliderEdit.vue'
import FacilityTagsEdit from '@/components/Admin/Edit/FacilityTagsEdit.vue'
import CheackEditBtn from '@/components/Btn/Admin/CheckEditBtn.vue'
import FacilityEditEnd from '@/components/Admin/Edit/FacilityEditEnd.vue'

import { IPlanList, IOptionList, ISliderList } from '@/store/facilityEdit'

@Component({
  components: {
    FacilityPlanEdit,
    FacilityOptionEdit,
    FacilitySliderEdit,
    FacilityTagsEdit,
    CheackEditBtn,
    FacilityEditEnd
  }
})
export default class reservationInfoEdit extends Vue {
  get planCnt(): IPlanList[] {
    return this.$store.state.facilityEdit.planEdit
  }

  get optionCnt(): IOptionList[] {
    return this.$store.state.facilityEdit.optionEdit
  }

  get sliderCnt(): ISliderList[] {
    return this.$store.state.facilityEdit.sliderEdit
  }

  get info(): string {
    return this.$store.state.facilityEdit.facilityInfo
  }

  set info(value: string) {
    this.$store.commit('facilityEdit/SET_FACILITY_INFO', value)
  }

  created() {
    this.$store.commit('facilityEdit/RESET_EDIT')
  }

  plusPlanList() {
    this.$store.commit('facilityEdit/PLUS_PLAN_EDIT')
  }

  plusOptionList() {
    this.$store.commit('facilityEdit/PLUS_OPTION_EDIT')
  }

  plusSliderList() {
    this.$store.commit('facilityEdit/PLUS_SLIDER_EDIT')
  }
}
</script>
