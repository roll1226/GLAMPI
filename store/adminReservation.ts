import * as Vuex from 'vuex'
import moment from 'moment'
import { firestore } from '@/plugins/firebase'

interface ICommit {
  commit: Vuex.Commit
  dispatch: Vuex.Dispatch
}

export interface IReservation {
  id: number
  peopleNumber: string
  plan: string
  option: string
  status: userStates
  name: string
}

export type userStates = '宿泊前' | '宿泊中' | '宿泊済み' | null

interface IReservationDate {
  userDate: {
    firstName: string
    lastName: string
  }
  guestNumber: number
  plan: string
  option: string
  checkOut: string
}

interface IState {
  reservations: IReservation[]
  loading: boolean
}

export const state = (): IState => ({
  reservations: [],
  loading: false
})

export const mutations = {
  CLEAR_INFO(state: IState) {
    state.reservations = []
  },

  SET_RESERVATION(state: IState, payload: IReservationDate) {
    const toDate = moment(new Date()).format('YYYY-MM-DD')
    const isAfter = moment(toDate).isAfter(payload.checkOut)
    const isSame = moment(toDate).isSame(payload.checkOut)

    let status: userStates = null
    if (isAfter && !isSame) {
      status = '宿泊済み'
    } else if (!isAfter && isSame) {
      status = '宿泊中'
    } else if (!isAfter && !isSame) {
      status = '宿泊前'
    }

    const reservationList = {
      id: state.reservations.length + 1,
      peopleNumber: `${payload.guestNumber}人`,
      plan: payload.plan,
      option:
        payload.option !== ''
          ? payload.option
          : 'オプションが選択されていません。',
      status,
      name: payload.userDate.firstName + payload.userDate.lastName
    }

    state.reservations.push(reservationList)
  },

  SET_LOADING(state: IState, payload: boolean) {
    state.loading = payload
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
      .orderBy('createdAt', 'asc')
      .get()

    if (reservations.size === 0) return dispatch.commit('SET_LOADING', false)

    for (let index = 0; index < reservations.size; index++) {
      await dispatch.dispatch('getUser', {
        plan: reservations.docs[index].data().plan,
        option: reservations.docs[index].data().option,
        checkOut: reservations.docs[index].data().checkOut,
        userId: reservations.docs[index].data().userId,
        guestNumber: reservations.docs[index].data().guestNumber
      })
    }

    dispatch.commit('SET_LOADING', false)
  },

  async getUser(
    dispatch: ICommit,
    payload: {
      plan: string
      option: string
      checkOut: string
      userId: string
      guestNumber: string
    }
  ) {
    const user = await firestore
      .collection('users')
      .doc(payload.userId)
      .get()

    console.log('getUser')

    dispatch.commit('SET_RESERVATION', {
      plan: payload.plan,
      option: payload.option,
      checkOut: payload.checkOut,
      guestNumber: payload.guestNumber,
      userDate: user.data()
    })
  }
}
