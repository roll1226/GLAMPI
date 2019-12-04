<template>
  <div>
    <v-card class="d-flex pa-5">
      <div width="max-content" class="mr-7">
        <!--ボタン-->
        <v-btn width="200" class="mb-3" @click="toBasicInfo"
          >基本情報変更</v-btn
        >
        <v-btn class="mb-3" block @click="toPayment">支払い方法変更</v-btn>
        <v-btn block @click="toPassword">パスワード変更</v-btn>
      </div>
      <div v-if="screen2 == 0">
        <BasicInfo></BasicInfo>
      </div>
      <div v-if="screen2 == 1">
        <Payment></Payment>
      </div>
      <div v-if="screen2 == 2">
        <Password></Password>
      </div>
    </v-card>
  </div>
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
export default class template extends Vue {
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
