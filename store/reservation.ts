import * as Vuex from 'vuex'

interface ICommit {
  commit: Vuex.Commit
}

interface IState {
  planTitle: string
  isActive: boolean
  nowActive: string
  planPay: number
  optionTitle: string
  optionPay: number
  totalPay: number
  dates: [...string[]]
}

export const state = (): IState => ({
  planTitle: '',
  isActive: false,
  nowActive: '',
  planPay: 0, // 読み込まれた時に挿入
  optionTitle: '',
  optionPay: 0,
  totalPay: 0,
  dates: []
})

export const mutations = {
  SET_IS_ACTIVE(state: IState, payload: boolean) {
    state.isActive = payload
  },

  SET_NOW_ACTIVE(
    state: IState,
    payload: { active: string; pay: string; optionTitle: string }
  ) {
    state.nowActive = payload.active
    state.optionPay = Number(payload.pay)
    state.optionTitle = payload.optionTitle
  },

  ADDITION(state: IState) {
    state.totalPay = state.planPay + state.optionPay
  },

  SET_DATES(state: IState, payload: []) {
    state.dates = payload
  },

  SET_PAY(state: IState, payload: number) {
    state.planPay = payload
  },

  SET_PLAN_TITLE(state: IState, payload: string) {
    state.planTitle = payload
  }
}

export const actions = {
  SEND_FIRESTORE_RESERVATION(state: IState, payload: string) {}
}
