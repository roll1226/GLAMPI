<template>
  <div>
    <v-btn class="light-blue darken-4 white--text" @click.stop="dialog = true">
      支払う
    </v-btn>

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
                支払う
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
const { Card, createToken } = require('vue-stripe-elements-plus')
const checkoutUrl = 'https://us-central1-j4k1-b789f.cloudfunctions.net/charge'

const api = process.env.STRIPE_PUBLIC_KEY
@Component({
  components: {
    Card
  }
})
export default class stripe extends Vue {
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

  async pay() {
    this.loading = true
    await createToken().then(async (data: { token: string }) => {
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
            amount: 1000,
            currency: 'JPY',
            email: this.stripeEmail
          }
        })
      })
        .then((result) => {
          this.loading = false
          this.dialog = false
          console.log(result)
        })
        .catch((error) => {
          console.error(error)
        })
    })
  }

  clearCart() {
    this.complete = false
  }
}
// export default {

//   data() {
//     return {
//       complete: false,
//       status: '',
//       response: '',
//       loading: false,
//       dialog: false,
//       stripeApiKey: process.env.STRIPE_PUBLIC_KEY,
//       stripeOptions: {
//         // you can configure that cc element. I liked the default, but you can
//         // see https://stripe.com/docs/stripe.js#element-options for details
//         hidePostalCode: true
//       },
//       emailRules: [
//         (v) => !!v || 'メールアドレスは必ず入力してください。',
//         (v) => (v && v.length <= 100) || 'メールアドレスが長すぎます。',
//         (v) => {
//           const pattern = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/
//           return (
//             pattern.test(v) ||
//             'メールアドレスは半角英数字で「XX@XX.XX」の形式にて入力してください。'
//           )
//         }
//       ],
//       stripeEmail: ''
//     }
//   },
//   methods: {
//     async pay() {
//       this.loading = true
//       await createToken().then(async (data) => {
//         const token = data.token
//         console.log(data)

//         await fetch(checkoutUrl, {
//           method: 'POST',
//           headers: {
//             'Content-type': 'application/json'
//           },
//           body: JSON.stringify({
//             token,
//             charge: {
//               amount: 1000,
//               currency: 'JPY',
//               email: this.stripeEmail
//             }
//           })
//         })
//           .then((result) => {
//             this.loading = false
//             console.log(result)
//           })
//           .catch((error) => {
//             console.error(error)
//           })
//       })
//     },
//     clearCart() {
//       this.submitted = false
//       this.status = ''
//       this.complete = false
//       this.response = ''
//     }
//   }
// }
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
