import * as Vuex from 'vuex'
import { firestore } from '@/plugins/firebase'

interface ICommit {
  commit: Vuex.Commit
  dispatch: Vuex.Dispatch
}

export interface IReservation {
  id: number
  peopleNumber: number
  plan: string
  option: string
  status: string
}

interface IReservationDate {
  guestNumber: number
  plan: string
  option: string
  status: string
}

interface IState {
  reservations: IReservation[]
}

export const state = (): IState => ({
  reservations: []
})

export const mutations = {
  CLEAR_INFO(state: IState) {
    state.reservations = []
  },
  SET_RESERVATION(state: IState, payload: IReservationDate) {
    const reservationList = {
      id: state.reservations.length + 1,
      peopleNumber: payload.guestNumber,
      plan: payload.plan,
      option:
        payload.option !== ''
          ? payload.option
          : 'オプションが選択されていません。',
      status: payload.status
    }

    state.reservations.push(reservationList)
  }
}

export const actions = {
  async getReservations(dispatch: ICommit, payload: string) {
    const facility = await firestore
      .collection('facilities')
      .where('displayName', '==', payload)
      .get()

    const reservations = await firestore
      .collection('facilities')
      .doc(facility.docs[0].id)
      .collection('reservations')
      .get()

    console.log(reservations.docs[0].data())

    for (let index = 0; index < reservations.size; index++) {
      dispatch.commit('SET_RESERVATION', reservations.docs[index].data())
    }
  }
}
