<template>
  <div justify="center">
    <v-dialog v-model="hostDialog" max-width="500" :persistent="hostLoading">
      <v-card :loading="hostLoading">
        <v-toolbar dark color="rgb(73, 92, 114)">
          <v-toolbar-title>
            クレジット支払い
          </v-toolbar-title>
        </v-toolbar>

        <div class="px-5 py-3">
          <v-text-field
            v-model="stripeEmail"
            :rules="emailRules.email"
            label="E-mail"
            hint="確認メール送信用アドレスを入力ください。"
            required
          ></v-text-field>

          <!-- クレジットカード -->
          <card
            id="card"
            class="stripe-card"
            :class="{ complete }"
            :stripe="stripeApiKey"
            :options="stripeOptions"
            @change="complete = $event.complete"
          />

          <div class="text-center">
            <v-btn
              class="white--text"
              color="rgb(87, 95, 69)"
              :disabled="!complete || !stripeEmail"
              @click="checkout"
            >
              {{ estimatedAmount.info.toLocaleString() }}、支払う
            </v-btn>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Card } from 'vue-stripe-elements-plus'
import { IGlammityInfoList } from '@/store/glammityInfo'
const api = process.env.STRIPE_PUBLIC_KEY

@Component({
  components: {
    Card
  }
})
export default class HostReservationStripe extends Vue {
  complete: boolean = false
  stripeApiKey: string | undefined = api
  stripeOptions: { hidePostalCode: boolean } = {
    hidePostalCode: true
  }
  emailRules: {} = {
    email: [
      (v: string) => !!v || 'メールアドレスは必ず入力してください。',
      (v: string) => (v && v.length <= 100) || 'メールアドレスが長すぎます。',
      (v: string) => {
        const pattern = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/
        return (
          pattern.test(v) ||
          'メールアドレスは半角英数字で「XX@XX.XX」の形式にて入力してください。'
        )
      }
    ]
  }

  get hostLoading(): boolean {
    return this.$store.state.glammityStripe.loading
  }

  get estimatedAmount(): IGlammityInfoList {
    return this.$store.state.glammityInfo.estimatedAmount
  }

  get planName(): IGlammityInfoList {
    return this.$store.state.glammityInfo.plan
  }

  get facilityId(): string {
    return this.$store.state.glammityInfo.facilityId
  }

  get date(): string {
    return this.$store.state.glammityInfo.date.checkIn
  }

  get stripeEmail(): string {
    return this.$store.state.glammityStripe.stripeEmail
  }

  get userId(): string {
    return this.$store.state.login.userUid
  }

  set stripeEmail(value: string) {
    this.$store.commit('glammityStripe/SET_STRIPE_EMAIL', value)
  }

  get hostDialog(): boolean {
    return this.$store.state.glammityStripe.hostDialog
  }

  set hostDialog(value: boolean) {
    this.$store.commit('glammityStripe/SET_HOST_DIALOG', value)
  }

  checkout() {
    this.$store.commit('glammityStripe/SET_LOADING', true)
    const url = this.$route.params.Glammity
    const pay = Number(
      this.estimatedAmount.info.replace(',', '').replace('円', '')
    )
    const charge = {
      amount: pay,
      currency: 'JPY',
      email: this.stripeEmail
    }
    this.$store.dispatch('glammityStripe/stripePay', {
      charge,
      planName: this.planName.info,
      userId: this.userId,
      glammityId: url,
      facilityId: this.facilityId,
      date: this.date
    })
  }
}
</script>

<style lang="scss" scoped>
.payment {
  border: 1px solid #ccc;
  color: black;
  width: 500px;
  padding: 50px;
  display: flex;
  flex-direction: column;
  min-height: 350px;
  justify-content: space-between;
  text-align: center;
}
.statussubmit {
  text-align: center;
}
.stripe-card {
  border: 1px solid #ccc;
}
p {
  margin: 0 0 10px;
}
label {
  color: black;
  margin: 15px 0 5px;
  font-family: 'Playfair Display', sans-serif;
}
button[disabled] {
  color: #ccc;
  border-color: #ccc;
  &:hover {
    background: white;
    color: #ccc;
  }
}
.loadcontain {
  text-align: center;
}
.stripe-card {
  margin-bottom: 10px;
}
.cc-number {
  color: #3964e8;
  font-weight: bold;
}
/* -- transition --*/
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
