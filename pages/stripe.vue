<template>
  <div>
    <transition name="fade">
      <div v-if="!submitted" class="payment">
        <h3>Please enter your payment details:</h3>
        <label for="email">Email</label>
        <input
          id="email"
          v-model="stripeEmail"
          type="email"
          placeholder="name@example.com"
        />
        <label for="card">Credit Card</label>
        <p>
          Test using this credit card:
          <span class="cc-number">4242 4242 4242 4242</span>, and enter any 5
          digits for the zip code
        </p>
        <card
          id="card"
          class="stripe-card"
          :class="{ complete }"
          :stripe="stripe_api_key"
          :options="stripeOptions"
          @change="complete = $event.complete"
        />
        <button
          class="pay-with-stripe"
          :disabled="!complete || !stripeEmail"
          @click="pay"
        >
          Pay with credit card
        </button>
      </div>

      <div v-else class="statussubmit">
        <div v-if="status === 'failure'">
          <h3>Oh No!</h3>
          <p>Something went wrong!</p>
          <button @click="clearCart">Please try again</button>
        </div>

        <div v-else class="loadcontain">
          <h4>Please hold, we're filling up your cart with goodies</h4>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { Card, createToken } from 'vue-stripe-elements-plus'

export default {
  components: {
    Card
  },
  props: {
    total: {
      type: [Number, String],
      default: '50.00'
    },
    success: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      submitted: false,
      complete: false,
      status: '',
      response: '',
      stripe_api_key: process.env.STRIPE_PUBLIC_KEY,
      stripeOptions: {
        // you can configure that cc element. I liked the default, but you can
        // see https://stripe.com/docs/stripe.js#element-options for details
        hidePostalCode: true
      },
      stripeEmail: ''
    }
  },
  methods: {
    async pay() {
      await createToken().then((data) => {
        this.submitted = true
        console.log(data) // this is a token we would use for the stripeToken below
      })
    },
    clearCart() {
      this.submitted = false
      this.status = ''
      this.complete = false
      this.response = ''
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
