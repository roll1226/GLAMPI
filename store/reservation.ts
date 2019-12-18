import * as Vuex from 'vuex'

interface ICommit {
  commit: Vuex.Commit
}

interface IState {
  isActive: boolean,
  nowActive: string,
  planPay: number,
  optionPay: number,
  totalPay: number,
  dates: [...string[]]
}

export const state = (): IState => ({
  isActive: false,
  nowActive: '',
  planPay: 15000, // 読み込まれた時に挿入
  optionPay: 0,
  totalPay: 0,
  dates: []
})

export const mutations = {
  SET_IS_ACTIVE(state: IState, payload: boolean) {
    state.isActive = payload
  },

  SET_NOW_ACTIVE(state: IState, payload: { active: string, pay: string }) {
    state.nowActive = payload.active
    state.optionPay = Number(payload.pay)
  },

  ADDITION(state: IState) {
    state.totalPay = state.planPay + state.optionPay
  },

  SET_DATES(state: IState, payload: []) {
    state.dates = payload
  }
}
