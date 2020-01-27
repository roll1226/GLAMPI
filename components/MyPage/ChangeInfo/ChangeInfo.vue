<template>
  <v-card>
    <v-card-text>
      <v-row>
        <v-col lg="3" md="3" sm="12" xs="12">
          <!--ボタン-->
          <v-btn block class="mb-3" @click="toBasicInfo">基本情報変更</v-btn>
          <v-btn class="mb-3" block @click="toPayment">支払い方法変更</v-btn>
          <v-btn block @click="toPassword">パスワード変更</v-btn>
        </v-col>

        <v-col lg="9" md="9" sm="12" xs="12">
          <BasicInfo v-if="screen2 == 0" />
          <Payment v-if="screen2 == 1" />
          <Password v-if="screen2 == 2" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import BasicInfo from '@/components/MyPage/ChangeInfo/BasicInfo.vue'
import Payment from '@/components/MyPage/ChangeInfo/Payment.vue'
import Password from '@/components/MyPage/ChangeInfo/Password.vue'

@Component({
  components: {
    BasicInfo,
    Payment,
    Password
  }
})
export default class ChangeInfo extends Vue {
  public screen2: number = 0
  public toBasicInfo() {
    this.screen2 = 0
  }
  public toPayment() {
    this.screen2 = 1
  }
  public toPassword() {
    this.screen2 = 2
  }
}
</script>
