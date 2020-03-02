import * as Vuex from 'vuex'
import { createToken } from 'vue-stripe-elements-plus'
import { firestore, timestamp } from '@/plugins/firebase'
const checkoutUrl = 'https://us-central1-j4k1-b789f.cloudfunctions.net/charge'
const uuid = require('uuid/v4')

const reservationUuid = uuid()
  .split('-')
  .join('')
  .slice(0, -12)

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
  async stripePay(
    dispatch: ICommit,
    payload: {
      charge: ICharge
      planName: string
      userId: string
      glammityId: string
      facilityId: string
      date: string
    }
  ) {
    await createToken().then(async (data: any) => {
      const token = data.token
      await fetch(checkoutUrl, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          token,
          charge: payload.charge
        })
      }).then(async () => {
        console.log('OK')
        const batch = firestore.batch()

        const reservationList = {
          checkDates: payload.date,
          createdAt: timestamp,
          facilityId: payload.facilityId,
          glammityId: payload.glammityId,
          userId: payload.userId,
          payment: 'クレジットカード',
          plan: payload.planName,
          status: '宿泊前',
          totalPay: payload.charge.amount
        }

        const userReservation = firestore
          .collection('users')
          .doc(payload.userId)
          .collection('reservations')
          .doc(reservationUuid)

        const facilityReservation = firestore
          .collection('facilities')
          .doc(payload.facilityId)
          .collection('reservations')
          .doc(reservationUuid)

        batch.set(userReservation, {})
        batch.set(facilityReservation, {})
        await batch.commit().then(async () => {
          await firestore.runTransaction(async (transaction) => {
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
        })
      })
    })
  }
}