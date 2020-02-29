import * as Vuex from 'vuex'
import { createToken } from 'vue-stripe-elements-plus'
import { firestore } from '@/plugins/firebase'
const checkoutUrl = 'https://us-central1-j4k1-b789f.cloudfunctions.net/charge'

interface ICommit {
  commit: Vuex.Commit
  state: IState
}

interface ICharge {
  amount: number
  currency: string
  email: string
}

interface IState {
  dialog: boolean
  loading: boolean
  complete: boolean
  stripeEmail: string
}

export const state = (): IState => ({
  dialog: false,
  loading: false,
  complete: false,
  stripeEmail: ''
})

export const mutations = {
  SET_LOADING(state: IState, payload: boolean) {
    state.loading = payload
  },

  SET_DIALOG(state: IState, payload: boolean) {
    state.dialog = payload
  },

  SET_STRIPE_EMAIL(state: IState, payload: string) {
    state.stripeEmail = payload
  }
}

export const actions = {
  async stripePay(dispatch: ICommit, payload: ICharge) {
    await createToken().then(async (data: any) => {
      const token = data.token
      await fetch(checkoutUrl, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          token,
          charge: payload
        })
      }).then(() => {
        console.log('OK')
      })
    })
  }
}
