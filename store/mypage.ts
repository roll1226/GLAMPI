import * as Vuex from 'vuex'

interface ICommit {
  commit: Vuex.Commit
}

interface IState {
  screen2: number
  lastName: string
  firstName: string
  lastNameKana: string
  firstNameKana: string
  address: string
  address2: string
  streetAddress: [...string[]]
  email: string
  passwordBefore: string
  passwordAfter: string
  passwordCheck: string
  nickname: string
}

export const state = (): IState => ({
  screen2: 0,
  lastName: '',
  firstName: '',
  lastNameKana: '',
  firstNameKana: '',
  address: '',
  address2: '',
  streetAddress: [],
  email: '',
  passwordBefore: '',
  passwordAfter: '',
  passwordCheck: '',
  nickname: ''
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

  SET_ADDRESS(state: IState, payload: string) {
    state.address = payload
  },

  SET_ADDRESS2(state: IState, payload: string) {
    state.address2 = payload
  },

  SET_STREET_ADDRESS(
    state: IState,
    payload: { pref: string; city: string; town: string }
  ) {
    state.streetAddress = []
    state.streetAddress.push(payload.pref)
    state.streetAddress.push(payload.city)
    state.streetAddress.push(payload.town)
  },

  SET_EMAIL(state: IState, payload: string) {
    state.email = payload
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
  }
}
