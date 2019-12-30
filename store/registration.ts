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
  birthdayYear: string
  birthdayMonth: string
  birthdayDay: string
  address: string
  address2: string
  streetAddress: [...string[]]
  email: string
  password: string
  passwordCheck: string
  phoneNumber: string
  nickname: string
}

export const state = (): IState => ({
  lastName: '',
  firstName: '',
  lastNameKana: '',
  firstNameKana: '',
  sex: true,
  birthdayYear: '',
  birthdayMonth: '',
  birthdayDay: '',
  address: '',
  address2: '',
  streetAddress: [],
  email: '',
  password: '',
  passwordCheck: '',
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

  SET_BIRTHDAY_YEAR(state: IState, payload: string) {
    state.birthdayYear = payload
  },

  SET_BIRTHDAY_MONTH(state: IState, payload: string) {
    state.birthdayMonth = payload
  },

  SET_BIRTHDAY_DAY(state: IState, payload: string) {
    state.birthdayDay = payload
  },

  SET_ADDRESS(state: IState, payload: string) {
    state.address = payload
  },

  SET_ADDRESS2(state: IState, payload: string) {
    state.address2 = payload
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

  CHECK_PASSWORD(state: IState, payload: string) {
    state.password = payload
  },

  CHECK_PASSWORDCHECK(state: IState, payload: string) {
    state.passwordCheck = payload
  },

  SET_PHONE_NUMBER(state: IState, payload: string) {
    state.phoneNumber = payload
  },

  SET_NICKNAME(state: IState, payload: string) {
    state.nickname = payload
  }
}
