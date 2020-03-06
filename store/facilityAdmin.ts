import * as Vuex from 'vuex'
import { firestore } from '@/plugins/firebase'

interface ICommit {
  commit: Vuex.Commit
  dispatch: Vuex.Dispatch
  state: IState
}

export interface IGuests {
  rooms: string
  name: string
  checkIn: string
  checkOut: string
  planName: string
  optionName: string
}

interface IState {
  toDateGuests: IGuests[]
  tableLoading: boolean
}

export const state = (): IState => ({
  toDateGuests: [],
  tableLoading: false
})

export const mutations = {
  SET_TO_DATE_GUESTS(
    state: IState,
    payload: {
      plan: string
      option: string
      checkIn: string
      checkOut: string
      userDate: { firstName: string; lastName: string }
    }
  ) {
    const number = Math.floor(Math.random() * (99 - 1) + 1)
    const userName = `${payload.userDate.firstName} ${payload.userDate.lastName} 様`

    const toDateGuests = {
      name: userName,
      rooms: `0${String(number).length === 1 ? '0' + number : number}`,
      checkIn: payload.checkIn,
      checkOut: payload.checkOut,
      planName: payload.plan,
      optionName: payload.option
    }

    state.toDateGuests.push(toDateGuests)
  },

  RESET_DATA(state: IState) {
    state.toDateGuests = []
  },

  SET_TABLE_LOADING(state: IState, payload: boolean) {
    state.tableLoading = payload
  }
}

export const actions = {
  async getReservation(
    dispatch: ICommit,
    payload: { facilityId: string; toDate: string }
  ) {
    const facilityFirebase = firestore.collection('facilities')

    const facility = await facilityFirebase
      .where('displayName', '==', payload.facilityId)
      .get()

    console.log('getReservation')

    const reservation = await facilityFirebase
      .doc(facility.docs[0].id)
      .collection('reservations')
      .where('checkIn', '==', payload.toDate)
      .get()

    if (reservation.size === 0) {
      dispatch.commit('SET_TABLE_LOADING', false)
      return
    }

    for (let index = 0; index < reservation.size; index++) {
      await dispatch.dispatch('getUser', {
        plan: reservation.docs[index].data().plan,
        option: reservation.docs[index].data().option,
        checkIn: reservation.docs[index].data().checkIn,
        checkOut: reservation.docs[index].data().checkOut,
        userId: reservation.docs[index].data().userId
      })
    }

    dispatch.commit('SET_TABLE_LOADING', false)
  },

  async getUser(
    dispatch: ICommit,
    payload: {
      plan: string
      option: string
      checkIn: string
      checkOut: string
      userId: string
    }
  ) {
    const user = await firestore
      .collection('users')
      .doc(payload.userId)
      .get()

    console.log('getUser')

    dispatch.commit('SET_TO_DATE_GUESTS', {
      plan: payload.plan,
      option: payload.option,
      checkIn: payload.checkIn,
      checkOut: payload.checkOut,
      userDate: user.data()
    })
  }
}
