<template>
  <!-- デバッグ -->
  <div class="facility-wrapp">
    <v-row class="pa-0 ma-0">
      <v-col class="pa-0 ma-0" cols="auto">
        <v-tabs
          class="pa-0 ma-0"
          active-class="font-weight-bold tab-active"
          hide-slider
          vertical
        >
          <!-- background-color="grey lighten-2"
          active-class="font-weight-bold grey" -->
          <v-tab class="black--text tab" @click="tab = 0">トップ</v-tab>
          <v-tab class="black--text tab" @click="tab = 1">予約一覧</v-tab>
          <v-tab class="black--text tab" @click="tab = 2">収益</v-tab>
          <v-tab class="black--text tab" @click="tab = 3">情報登録</v-tab>
          <v-tab class="black--text tab" @click="tab = 4">問い合わせ</v-tab>
        </v-tabs>
      </v-col>
      <v-col class="pa-0 ma-0" cols="10">
        <v-tabs-items class="item">
          <div v-if="tab == 0"><FacilityTop /></div>
          <div v-else-if="tab == 1"><ReserveManage /></div>
          <div v-else-if="tab == 2"><revenue /></div>
          <div v-else-if="tab == 3"><ReservationInfoEdit /></div>
          <div v-else-if="tab == 4"><inquiry /></div>
        </v-tabs-items>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import FacilityTop from '@/components/Admin/FacilityTop.vue'
import ReserveManage from '@/components/Admin/ReserveManage.vue'
import revenue from '@/components/Admin/revenue.vue'
import ReservationInfoEdit from '@/components/Admin/ReservationInfoEdit.vue'
import inquiry from '@/components/Admin/inquiry.vue'

@Component({
  components: {
    FacilityTop,
    ReserveManage,
    revenue,
    ReservationInfoEdit,
    inquiry
  }
})
export default class FacilityIndex extends Vue {
  public tab: number = 0
}
</script>
<style lang="scss">
.facility-wrapp {
  display: block;
  width: 1300px;
  //background-color: bisque;
  margin: 50px 0 0 50px;
  padding: 0;
}

// .v-tabs {
//   //width: 100%;
//   //height: 100%;
//   //height: 400px;
// }

.v-tab {
  width: 150px;
  //padding*2=height
  padding: 30px;
}

.tab-active {
  background-color: $site_color_9;
}

.contents {
  width: 1000px;
  height: max-content;
  margin: 0 0 0 40px;
}

/*.facility-tabs {
  background-color: bisque;
  .facility-tab {
    width: 140px;
    height: 60px;
    padding: 20px 10px;
    margin-bottom: 10px;
  }
}*/
</style>
