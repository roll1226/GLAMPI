import * as Vuex from 'vuex'
import { firestore } from '@/plugins/firebase'

interface ICommit {
  commit: Vuex.Commit
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
  birthday: ''
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
  }
}
