<template>
  <div class="facility-wrapp">
    <v-row no-gutters>
      <v-col no-gutters cols="auto">
        <v-tabs
          class="id pa-0 ma-0"
          active-class="font-weight-bold tab-active"
          hide-slider
          vertical
        >
          <v-tab class="black--text" @click="tab = 0">トップ</v-tab>
          <v-tab class="black--text" @click="tab = 1">予約一覧</v-tab>
          <v-tab class="black--text" @click="tab = 2">収益</v-tab>
          <v-tab class="black--text" @click="tab = 3">情報登録</v-tab>
          <v-tab class="black--text" @click="tab = 4">問い合わせ</v-tab>
        </v-tabs>
      </v-col>
      <!--cols="10"-->
      <v-col no-gutters>
        <v-tabs-items class="item">
          <div v-if="tab == 0"><FacilityTop /></div>
          <div v-else-if="tab == 1"><reserveManage /></div>
          <div v-else-if="tab == 2"><revenue /></div>
          <div v-else-if="tab == 3"><reservationInfoEdit /></div>
          <div v-else-if="tab == 4"><inquiry /></div>
        </v-tabs-items>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import FacilityTop from '@/components/Admin/FacilityTop.vue'
import reserveManage from '@/components/Admin/ReserveManage.vue'
import revenue from '@/components/Admin/revenue.vue'
import reservationInfoEdit from '@/components/Admin/reservationInfoEdit.vue'
import inquiry from '@/components/Admin/inquiry.vue'

@Component({
  components: {
    FacilityTop,
    reserveManage,
    revenue,
    reservationInfoEdit,
    inquiry
  }
})
export default class FacilityIndex extends Vue {
  public tab: number = 0
}
</script>
<style lang="scss">
.facility-wrapp {
  overflow: visible !important;
  margin: 70px auto 100px;
  width: 1300px;
  .id {
    .v-tab {
      width: 180px;
      //padding*2=height
      padding: 30px;
      margin: 0 40px 0 0;
    }
  }
}

.tab-active {
  background-color: $site_color_9;
}
</style>
