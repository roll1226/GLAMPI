<template>
  <div>
    <div class="text-center mt-6">
      <v-btn
        :disabled="!reservationIsValid"
        class="light-blue darken-4 white--text"
        @click.stop="openDialog"
      >
        予約する
      </v-btn>
    </div>

    <v-row justify="center">
      <v-dialog v-model="dialog" max-width="500">
        <v-card>
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
                :loading="loading"
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

<script>
import { Card, createToken } from 'vue-stripe-elements-plus'
const checkoutUrl = 'https://us-central1-j4k1-b789f.cloudfunctions.net/charge'

const api = process.env.STRIPE_PUBLIC_KEY
export default {
  components: {
    Card
  },

  data() {
    return {
      complete: false,
      loading: false,
      dialog: false,
      stripeApiKey: api,
      stripeOptions: {
        hidePostalCode: true
      },
      emailRules: {
        email: [
          (v) => !!v || 'メールアドレスは必ず入力してください。',
          (v) => (v && v.length <= 100) || 'メールアドレスが長すぎます。',
          (v) => {
            const pattern = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/
            return (
              pattern.test(v) ||
              'メールアドレスは半角英数字で「XX@XX.XX」の形式にて入力してください。'
            )
          }
        ]
      },
      stripeEmail: ''
    }
  },

  computed: {
    totalPay() {
      return this.$store.state.reservation.totalPay
    },

    dates() {
      return this.$store.state.reservation.dates
    },

    reservationIsValid() {
      return this.dates[0] && this.dates[1]
    }
  },

  methods: {
    async pay() {
      this.loading = true
      await createToken().then(async (data) => {
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
          .then((result) => {
            this.loading = false
            this.dialog = false

            this.$router.push(
              `/facility/${this.$route.params.id}/reservation/complete`
            )

            // 成功時firebaseに投げる

            console.log(result)
          })
          .catch((error) => {
            console.error(error)
          })
      })
    },

    clearCart() {
      this.complete = false
    },

    openDialog() {
      this.dialog = true
      this.$store.commit('reservation/ADDITION')
    }
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
