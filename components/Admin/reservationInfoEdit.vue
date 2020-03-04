<template>
  <div>
    <v-card max-width="900" class="mx-auto">
      <v-card-title>
        情報登録
      </v-card-title>
      <v-card-text>
        <v-textarea v-model="info" label="施設紹介"></v-textarea>
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
        スライダー画像
      </v-card-title>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
// import { storage } from '@/plugins/firebase'
import FacilityPlanEdit from '@/components/Admin/Edit/FacilityPlanEdit.vue'
import FacilityOptionEdit from '@/components/Admin/Edit/FacilityOptionEdit.vue'

import { IPlanList, IOptionList } from '@/store/facilityEdit'

@Component({
  components: {
    FacilityPlanEdit,
    FacilityOptionEdit
  }
})
export default class reservationInfoEdit extends Vue {
  get planCnt(): IPlanList[] {
    return this.$store.state.facilityEdit.planEdit
  }

  get optionCnt(): IOptionList[] {
    return this.$store.state.facilityEdit.optionEdit
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
}
</script>
