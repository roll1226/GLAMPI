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
          <v-tab class="black--text" @click="tab = 1">会員登録</v-tab>
          <v-tab class="black--text" @click="tab = 2">予約管理</v-tab>
          <v-tab class="black--text" @click="tab = 3">施設管理</v-tab>
          <v-tab class="black--text" @click="tab = 4">収益</v-tab>
          <v-tab class="black--text" @click="tab = 5">問い合わせ</v-tab>
        </v-tabs>
      </v-col>
      <!--cols="10"-->
      <v-col no-gutters>
        <v-tabs-items class="item">
          <div v-if="tab == 0"><adminTop /></div>
          <div v-else-if="tab == 1"><userManage /></div>
          <div v-else-if="tab == 2"><reserveManage /></div>
          <div v-else-if="tab == 3"></div>
          <div v-else-if="tab == 4"><revenue /></div>
          <div v-else-if="tab == 5"><inquiry /></div>
        </v-tabs-items>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import adminTop from '@/components/Admin_/AdminTop.vue'
import userManage from '@/components/Admin_/userManage.vue'
import reserveManage from '@/components/Admin_/reserveManage.vue'
import revenue from '@/components/Admin_/revenue.vue'
import inquiry from '@/components/Admin_/inquiry.vue'

@Component({
  components: {
    adminTop,
    userManage,
    reserveManage,
    revenue,
    inquiry
  }
})
export default class AdminIndex extends Vue {
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
