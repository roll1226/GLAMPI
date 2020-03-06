<template>
  <div>
    <div class="text-center mt-6">
      <v-btn class="light-blue darken-4 white--text" @click.stop="openDialog">
        予約する
      </v-btn>
    </div>

    <v-row justify="center">
      <v-dialog v-model="dialog" max-width="500">
        <v-card :loading="loading">
          <v-toolbar dark class="grey lighten-1">
            <v-toolbar-title>
              クレジット支払い
            </v-toolbar-title>
          </v-toolbar>

          <div class="px-5 py-3">
            <v-text-field
              v-model="stripeEmail"
              :rules="emailRules.email"
              label="E-mail"
              required
            ></v-text-field>

            <label for="card">
              クレジットカード
            </label>
            <p>
              テスト用カード<span class="cc-number">4242 4242 4242 4242</span>
            </p>

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
                class="pay-with-stripe light-blue darken-4 white--text"
                :disabled="!complete || !stripeEmail"
                @click="pay"
              >
                {{ totalPay.toLocaleString() }}円、支払う
              </v-btn>
            </div>
          </div>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Card, createToken } from 'vue-stripe-elements-plus'
import { firestore, timestamp } from '@/plugins/firebase'
import { IFacility } from '@/store/facility'
const checkoutUrl = 'https://us-central1-j4k1-b789f.cloudfunctions.net/charge'
const uuid = require('uuid/v4')
const api = process.env.STRIPE_PUBLIC_KEY

@Component({
  components: {
    Card
  }
})
export default class Stripe extends Vue {
  complete: boolean = false
  loading: boolean = false
  dialog: boolean = false
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
  stripeEmail: string = ''

  uuid: string = uuid()
    .split('-')
    .join('')
    .slice(0, -12)

  get totalPay(): number {
    return this.$store.state.reservation.totalPay
  }
  get dates(): [...string[]] {
    return this.$store.state.reservation.dates
  }
  get optionTitle(): string {
    return this.$store.state.reservation.optionTitle
  }
  get planTitle(): string {
    return this.$store.state.reservation.planTitle
  }
  get facilityId(): string {
    return this.$store.state.facility.uuid
  }
  get facility(): IFacility {
    return this.$store.state.facility.facility
  }
  get userId(): string {
    return this.$store.state.login.userUid
  }
  get guestNumber(): string {
    return this.$store.state.reservation.guest
  }

  async pay() {
    this.loading = true
    await createToken().then(async (data: any) => {
      const token = data.token
      console.log(data)
      await fetch(checkoutUrl, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          token,
          charge: {
            amount: this.totalPay,
            currency: 'JPY',
            email: this.stripeEmail
          }
        })
      })
        .then(async () => {
          // 成功時firebaseに投げる
          const batch = firestore.batch()
          const reservationList = {
            checkIn: this.dates[0],
            checkOut: this.dates[1],
            createdAt: timestamp,
            facilityId: this.$route.params.id,
            option: this.optionTitle,
            payment: 'クレジットカード',
            plan: this.planTitle,
            status: '宿泊前',
            totalPay: this.totalPay,
            userId: this.userId,
            guestNumber: this.guestNumber
          }
          const userReservation = firestore
            .collection('users')
            .doc(this.$store.state.login.userUid)
            .collection('reservations')
            .doc(this.uuid)
          const facilityReservation = firestore
            .collection('facilities')
            .doc(this.facilityId)
            .collection('reservations')
            .doc(this.uuid)
          batch.set(userReservation, {})
          batch.set(facilityReservation, {})
          await batch.commit().then(async () => {
            await firestore
              .runTransaction(async (transaction) => {
                const [
                  userReservationDoc,
                  facilityReservationDoc
                ] = await Promise.all([
                  transaction.get(userReservation),
                  transaction.get(facilityReservation)
                ])
                console.log(`${userReservationDoc}${facilityReservationDoc}`)
                transaction.update(userReservation, reservationList)
                transaction.update(facilityReservation, reservationList)
              })
              .then(() => {
                this.loading = false
                this.dialog = false
                this.$router.push(
                  `/facility/${this.$route.params.id}/reservation/complete`
                )
              })
          })
        })
        .catch((error) => {
          console.error(error)
        })
    })
  }
  clearCart() {
    this.complete = false
  }
  openDialog() {
    this.dialog = true
    this.$store.commit('reservation/ADDITION')
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
