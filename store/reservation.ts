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
  totalDate: number
  planImg: string
  maxGuests: string
  guest: string
}

export const state = (): IState => ({
  planTitle: '',
  isActive: false,
  nowActive: '',
  planPay: 0, // 読み込まれた時に挿入
  optionTitle: '',
  optionPay: 0,
  totalPay: 0,
  dates: [],
  totalDate: 0,
  planImg: '',
  maxGuests: '',
  guest: ''
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
    state.totalPay = state.planPay * state.totalDate + state.optionPay
  },

  SET_DATES(state: IState, payload: [...string[]]) {
    state.dates = payload
    const totalDate = getDiff(payload[0], payload[1])
    state.totalDate = totalDate
  },

  SET_PAY(state: IState, payload: number) {
    state.planPay = payload
  },

  SET_PLAN_TITLE(state: IState, payload: string) {
    state.planTitle = payload
  },

  SET_DATE_RE(state: IState, payload: { checkIn: string; checkOut: string }) {
    state.dates[0] = payload.checkIn
    state.dates[1] = payload.checkOut
    const totalDate = getDiff(payload.checkIn, payload.checkOut)
    state.totalDate = totalDate
  },

  SET_PLAN_IMG(state: IState, payload: string) {
    state.planImg = payload
  },

  SET_MAX_GUESTS(state: IState, payload: string) {
    state.maxGuests = payload
  },

  SET_GUEST(state: IState, payload: string) {
    state.guest = payload
  }
}

const getDiff = (date1Str: string, date2Str: string) => {
  const date1 = new Date(date1Str)
  const date2 = new Date(date2Str)

  // getTimeメソッドで経過ミリ秒を取得し、２つの日付の差を求める
  const msDiff = date2.getTime() - date1.getTime()

  // 求めた差分（ミリ秒）を日付へ変換します（経過ミリ秒÷(1000ミリ秒×60秒×60分×24時間)。端数切り捨て）
  let daysDiff = Math.floor(msDiff / (1000 * 60 * 60 * 24))

  // 差分へ1日分加算して返却します
  return ++daysDiff
}
