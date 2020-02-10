<template>
  <!-- デバッグ -->
  <div class="facility-wrapp">
    <v-row class="pa-0 ma-0">
      <v-col class="pa-0 ma-0">
        <v-tabs
          classs="pa-0 ma-0 tabs"
          background-color="rgb(244,244,244)"
          active-class="font-weight-bold grey lighten-2"
          hide-slider="true"
          vertical
        >
          <v-tab class="black--text tab" @click="tab = 0">トップ</v-tab>
          <v-tab class="black--text tab" @click="tab = 1">予約一覧</v-tab>
          <v-tab class="black--text tab" @click="tab = 2">収益</v-tab>
          <v-tab class="black--text tab" @click="tab = 3">情報登録</v-tab>
          <v-tab class="black--text tab" @click="tab = 4">問い合わせ</v-tab>
        </v-tabs>
      </v-col>
      <v-col class="pa-0 ma-0" cols="10">
        <v-tabs-items class="item">
          <v-tabs-item v-if="tab == 0"><FacilityTop /></v-tabs-item>
          <v-tabs-item v-else-if="tab == 1"><ReserveManage /></v-tabs-item>
          <v-tabs-item v-else-if="tab == 2">収益中身</v-tabs-item>
          <v-tabs-item v-else-if="tab == 3"
            ><ReservationInfoEdit
          /></v-tabs-item>
          <v-tabs-item v-else-if="tab == 4">問い合わせ中身</v-tabs-item>
        </v-tabs-items>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import FacilityTop from '@/components/Admin/FacilityTop.vue'
import ReserveManage from '@/components/Admin/ReserveManage.vue'
import ReservationInfoEdit from '@/components/Admin/ReservationInfoEdit.vue'

@Component({
  components: {
    FacilityTop,
    ReserveManage,
    ReservationInfoEdit
  }
})
export default class FacilityIndex extends Vue {
  public reservation: number = 5
  public cancel: number = 4
  public tab: number = 0

  data() {
    return {
      headers: [
        {
          text: 'お客様名',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: '部屋番号', value: 'rooms' }
      ],
      guests: [
        {
          name: 'Guest1',
          rooms: 1
        },
        {
          name: 'Guest2',
          rooms: 2
        },
        {
          name: 'Guest3',
          rooms: 3
        }
      ]
    }
  }
}
</script>
<style lang="scss">
.facility-wrapp {
  margin: 50px 0 0 35px;
  //
  padding: 0;
  background-color: aquamarine;
}

.tabs {
  width: 100%;
  height: 100%;
}

.tab {
  width: 150px;
  //padding*2=height
  padding: 30px;
}

.item {
  width: 1000px;
  height: max-content;
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
