import * as Vuex from 'vuex'

interface ICommit {
  commit: Vuex.Commit
}

interface IState {
  lastName: string
  firstName: string
  lastNameKana: string
  firstNameKana: string
  sex: boolean
  birthday: string
  postalCode: string
  streetAddress: [...string[]]
  email: string
  phoneNumber: string
  nickname: string
}

export const state = (): IState => ({
  lastName: '',
  firstName: '',
  lastNameKana: '',
  firstNameKana: '',
  sex: true,
  birthday: '',
  postalCode: '',
  streetAddress: [],
  email: '',
  phoneNumber: '',
  nickname: ''
})

export const mutations = {
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

  SET_SEX(state: IState, payload: boolean) {
    state.sex = payload
  },

  SET_BIRTHDAY(state: IState, payload: string) {
    state.birthday = payload
  },

  SET_POSTAL_CODE(state: IState, payload: string) {
    state.postalCode = payload
  },

  SET_STREET_ADDRESS(state: IState, payload: {pref: string, city: string, town: string}) {
    state.streetAddress = []
    state.streetAddress.push(payload.pref)
    state.streetAddress.push(payload.city)
    state.streetAddress.push(payload.town)
  },

  SET_EMAIL(state: IState, payload: string) {
    state.email = payload
  },

  SET_PHONE_NUMBER(state: IState, payload: string) {
    state.phoneNumber = payload
  },

  SET_NICKNAME(state: IState, payload: string) {
    state.nickname = payload
  }
}
