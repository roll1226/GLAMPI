import * as Vuex from 'vuex'
import { firestore } from '@/plugins/firebase'

interface ICommit {
  commit: Vuex.Commit
  dispatch: Vuex.Dispatch
}

interface IUser {
  lastName: string
  firstName: string
  lastNameKana: string
  firstNameKana: string
  email: string
  postalCode: string
  streetAddress: string
  nickname: string
  comment: string
  sex: string
  birthday: string
}

interface IState {
  screen2: number
  lastName: string
  firstName: string
  lastNameKana: string
  firstNameKana: string
  address: string
  postalCode: string
  streetAddress: string
  email: string
  passwordBefore: string
  passwordAfter: string
  passwordCheck: string
  nickname: string
  comment: string
  sex: string
  birthday: string
  reservation: IFacility[]
}

interface IFacility {
  facilityName: string
  facilityImg: string
  address: string
  planName: string
  planPay: number
  introduction: string
  url: string
  status: string
}

interface IUserData {
  facilityId: string
  plan: string
  totalPay: number
  status: string
}

export const state = (): IState => ({
  screen2: 0,
  lastName: '',
  firstName: '',
  lastNameKana: '',
  firstNameKana: '',
  address: '',
  postalCode: '',
  streetAddress: '',
  email: '',
  passwordBefore: '',
  passwordAfter: '',
  passwordCheck: '',
  nickname: '',
  comment: '',
  sex: '',
  birthday: '',
  reservation: []
})

export const mutations = {
  SET_SCREEN_NUMBER(state: IState, payload: number) {
    state.screen2 = payload
  },

  SET_LAST_NAME(state: IState, payload: string) {
    state.lastName = payload
  },

  SET_FIRST_NAME(state: IState, payload: string) {
    state.firstName = payload
  },

  SET_LAST_NAME_KANA(state: IState, payload: string) {
    state.lastNameKana = payload
  },

  SET_FIRST_NAME_KANA(state: IState, payload: string) {
    state.firstNameKana = payload
  },

  SET_EMAIL(state: IState, payload: string) {
    state.email = payload
  },

  SET_STREETADDRESS(state: IState, payload: string) {
    state.streetAddress = payload
  },

  SET_POSTAL_CODE(state: IState, payload: string) {
    state.postalCode = payload
  },

  SET_COMMENT(state: IState, payload: string) {
    state.comment = payload
  },

  CHECK_PASSWORD_BEFORE(state: IState, payload: string) {
    state.passwordBefore = payload
  },

  CHECK_PASSWORD_AFTER(state: IState, payload: string) {
    state.passwordAfter = payload
  },

  CHECK_PASSWORDCHECK(state: IState, payload: string) {
    state.passwordCheck = payload
  },

  SET_NICKNAME(state: IState, payload: string) {
    state.nickname = payload
  },

  INITIAL_VALUE(state: IState, payload: IUser) {
    state.firstName = payload.firstName

    state.lastName = payload.lastName

    state.firstNameKana = payload.lastNameKana

    state.lastNameKana = payload.lastNameKana

    state.email = payload.email

    state.postalCode = payload.postalCode

    state.streetAddress = payload.streetAddress

    state.nickname = payload.nickname

    state.comment = payload.comment

    state.sex = payload.sex

    state.birthday = payload.birthday
  },
  SET_RESERVATION_FACILITY(
    state: IState,
    payload: {
      userData: IUserData
      facilityData: {
        name: string
        displayName: string
        info: string
        slider: [...string[]]
        streetAddress: [...string[]]
      }
    }
  ) {
    let address = ''

    for (
      let index = 0;
      index < payload.facilityData.streetAddress.length;
      index++
    ) {
      address += payload.facilityData.streetAddress[index]
    }

    const reservationList = {
      facilityName: payload.facilityData.name,
      address,
      planName: payload.userData.plan,
      planPay: payload.userData.totalPay,
      introduction: payload.facilityData.info,
      facilityImg: payload.facilityData.slider[0],
      url: payload.facilityData.displayName,
      status: payload.userData.status
    }

    state.reservation.push(reservationList)
  }
}

export const actions = {
  async getUserData(dispatch: ICommit, payload: string) {
    const user = await firestore
      .collection('users')
      .doc(payload)
      .get()

    console.log(user.data())

    dispatch.commit('INITIAL_VALUE', user.data())
  },

  async getReservationFacility(dispatch: ICommit, payload: string) {
    const user = await firestore
      .collection('users')
      .doc(payload)
      .collection('reservations')
      .get()
    console.log(user.docs)
    for (let index = 0; index < user.size; index++) {
      dispatch.dispatch('getFacility', user.docs[index].data())
    }
  },

  async getFacility(
    dispatch: ICommit,
    payload: {
      facilityId: string
      plan: string
      totalpay: number
      status: string
    }
  ) {
    const facility = await firestore
      .collection('facilities')
      .where('displayName', '==', payload.facilityId)
      .get()

    console.log(facility.docs[0].data())
    dispatch.commit('SET_RESERVATION_FACILITY', {
      userData: payload,
      facilityData: facility.docs[0].data()
    })
  }
}
