import * as Vuex from 'vuex'

interface ICommit {
  commit: Vuex.Commit
}

interface IState {
  email: string
  password: string
  passwordCheck: string
  resPerson: string
  phoneNumber: string
  facilityName: string
  address: string
  streetAddress: [...string[]]
}

export const state = (): IState => ({
  email: '',
  password: '',
  passwordCheck: '',
  resPerson: '',
  phoneNumber: '',
  facilityName: '',
  address: '',
  streetAddress: []
})

export const mutations = {
  SET_EMAIL(state: IState, payload: string) {
    state.email = payload
  },

  CHECK_PASSWORD(state: IState, payload: string) {
    state.password = payload
  },

  CHECK_PASSWORDCHECK(state: IState, payload: string) {
    state.passwordCheck = payload
  },

  SET_RESPERSON(state: IState, payload: string) {
    state.resPerson = payload
  },

  SET_PHONE_NUMBER(state: IState, payload: string) {
    state.phoneNumber = payload
  },

  SET_FACILITYNAME(state: IState, payload: string) {
    state.facilityName = payload
  },

  SET_ADDRESS(state: IState, payload: string) {
    state.address = payload
  },

  SET_STREET_ADDRESS(
    state: IState,
    payload: { pref: string; city: string; town: string }
  ) {
    state.streetAddress = []
    state.streetAddress.push(payload.pref)
    state.streetAddress.push(payload.city)
    state.streetAddress.push(payload.town)
  }
}
