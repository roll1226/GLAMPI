import * as Vuex from 'vuex'

interface ICommit {
  commit: Vuex.Commit
  dispatch: Vuex.Dispatch
  state: IState
}

export interface IState {
  email: string
  password: string
  checkPassword: string
  officerName: string
  phoneNumber: string
  facilityName: string
  prefectures: string
  municipality: string
  address: string
  facilityNameRuby: string
}

export const state = (): IState => ({
  email: '',
  password: '',
  checkPassword: '',
  officerName: '',
  phoneNumber: '',
  facilityName: '',
  prefectures: '',
  municipality: '',
  address: '',
  facilityNameRuby: ''
})

export const mutations = {
  SET_FACILITY_EMAIL(state: IState, payload: string) {
    state.email = payload
  },

  SET_FACILITY_PASSWORD(state: IState, payload: string) {
    state.password = payload
  },

  SET_FACILITY_CHECK_PASSWORD(state: IState, payload: string) {
    state.checkPassword = payload
  },

  SET_OFFICER_NAME(state: IState, payload: string) {
    state.officerName = payload
  },

  SET_FACILITY_NAME_RUBY(state: IState, payload: string) {
    state.facilityNameRuby = payload
  },

  SET_PHONE_NUMBER(state: IState, payload: string) {
    state.phoneNumber = payload
  },

  SET_FACILITY_NAME(state: IState, payload: string) {
    state.facilityName = payload
  },

  SET_PREFECTURES(state: IState, payload: string) {
    state.prefectures = payload
  },

  SET_MUNICIPALITY(state: IState, payload: string) {
    state.municipality = payload
  },

  SET_ADDRESS(state: IState, payload: string) {
    state.address = payload
  }
}
