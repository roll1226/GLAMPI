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
          <v-tab class="black--text tab" @click="tab = 1">会員登録</v-tab>
          <v-tab class="black--text tab" @click="tab = 2">予約管理</v-tab>
          <v-tab class="black--text tab" @click="tab = 3">施設管理</v-tab>
          <v-tab class="black--text tab" @click="tab = 4">収益</v-tab>
          <v-tab class="black--text tab" @click="tab = 5">問い合わせ</v-tab>
        </v-tabs>
      </v-col>
      <v-col class="pa-0 ma-0" cols="10">
        <v-tabs-items class="item">
          <div v-if="tab == 0"><adminTop /></div>
          <div v-else-if="tab == 1"></div>
          <div v-else-if="tab == 2"><reserveManage /></div>
          <div v-else-if="tab == 3"></div>
          <div v-else-if="tab == 4"></div>
          <div v-else-if="tab == 5"><inquiry /></div>
        </v-tabs-items>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import adminTop from '@/components/Admin_/AdminTop.vue'
import reserveManage from '@/components/Admin_/reserveManage.vue'
import inquiry from '@/components/Admin/inquiry.vue'

@Component({
  components: {
    adminTop,
    reserveManage,
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
