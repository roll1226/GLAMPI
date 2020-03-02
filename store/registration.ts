import * as Vuex from 'vuex'

interface ICommit {
  commit: Vuex.Commit
}

interface IState {
  lastName: string
  firstName: string
  lastNameKana: string
  firstNameKana: string
  sex: string
  birthdayYear: string
  birthdayMonth: string
  birthdayDay: string
  postalCode: string
  streetAddress: string
  email: string
  password: string
  passwordCheck: string
  phoneNumber: string
  nickname: string
  postCode: string
}

export const state = (): IState => ({
  lastName: '',
  firstName: '',
  lastNameKana: '',
  firstNameKana: '',
  sex: 'M',
  birthdayYear: '',
  birthdayMonth: '',
  birthdayDay: '',
  postalCode: '',
  streetAddress: '',
  email: '',
  password: '',
  passwordCheck: '',
  phoneNumber: '',
  nickname: '',
  postCode: ''
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

  SET_SEX(state: IState, payload: string) {
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

  SET_POSTAL_CODE(state: IState, payload: string) {
    state.postalCode = payload
  },

  SET_STREET_ADDRESS(state: IState, payload: string) {
    state.streetAddress = payload
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
  },

  SET_POST_CODE(state: IState, payload: string) {
    state.postCode = payload
  }
}
