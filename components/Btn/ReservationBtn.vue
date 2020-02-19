<template>
  <div class="text-center mb-1">
    <v-btn :disabled="!isReservation" @click="toVerification">
      予約確認
    </v-btn>

    <v-snackbar v-model="snackbar" top :timeout="timeout">
      予約するにはログインする必要があります。
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import Twitter from '@/components/Btn/Twitter.vue'
import Facebook from '@/components/Btn/Facebook.vue'
import ChangePasswordBtn from '@/components/Btn/ChangePasswordBtn.vue'

@Component({
  components: {
    Twitter,
    Facebook,
    ChangePasswordBtn
  }
})
export default class ReservationBtn extends Vue {
  isReservation: boolean = false
  snackbar: boolean = false
  timeout: number = 2000

  get dates(): [...string[]] {
    return this.$store.state.reservation.dates
  }

  get isLogin(): boolean {
    return this.$store.state.login.isLogin
  }

  @Watch('dates')
  reservationIsValid() {
    this.isReservation =
      this.isDateInputed(this.dates[0]) &&
      this.isDateInputed(this.dates[1]) &&
      this.checkDateLength(this.dates)
  }

  isDateInputed(date: string): boolean {
    if (date !== '') {
      return true
    } else {
      return false
    }
  }

  checkDateLength(dates: [...string[]]): boolean {
    if (dates.length === 2) {
      return true
    } else {
      return false
    }
  }

  toVerification() {
    if (this.isLogin === false) {
      console.log('ログインしていません')
      this.$store.commit('login/SET_LOGIN_DIALOG', true)
      this.snackbar = true
      return
    }
    this.$router.push(
      `/facility/${this.$route.params.id}/reservation/${this.$route.params.pay}/verification`
    )
  }
}
</script>
