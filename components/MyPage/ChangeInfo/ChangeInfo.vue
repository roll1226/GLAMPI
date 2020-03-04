<template>
  <div class="changeInfo-wrap">
    <BasicInfo v-if="screen2 == 0" />
    <Payment v-if="screen2 == 1" />
    <Password v-if="screen2 == 2" />
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
export default class ChangeInfo extends Vue {
  get screen2(): number {
    return this.$store.state.mypage.screen2
  }
}
</script>
