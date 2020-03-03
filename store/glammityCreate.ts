import * as Vuex from 'vuex'
import { firestore } from '@/plugins/firebase'

interface ICommit {
  commit: Vuex.Commit
  dispatch: Vuex.Dispatch
  state: IState
}

export interface IList {
  id: string
  text: string
}

interface IState {
  glammityName: string
  facilityName: string
  facilityId: string
  planId: string
  planTitle: string
  planList: IList[]
  optionId: string
  optionTitle: string
  optionList: IList[]
  guestNumber: number
  recruitmentDates: [...string[]]
  dates: [...string[]]
  totalDate: number
}

export const state = (): IState => ({
  glammityName: '',
  facilityName: '',
  facilityId: '',
  planId: '',
  planTitle: '',
  planList: [],
  optionId: '',
  optionTitle: '',
  optionList: [],
  guestNumber: 0,
  dates: [],
  recruitmentDates: [],
  totalDate: 0
})

export const mutations = {
  SET_GLAMMITY_NAME(state: IState, payload: string) {
    state.glammityName = payload
  },

  SET_FACILITY_NAME(state: IState, payload: string) {
    state.facilityName = payload
  },

  SET_GUEST_NUMBER(state: IState, payload: string) {
    state.guestNumber = Number(payload)
  },

  SET_PLAN_ID(state: IState, payload: IList) {
    state.planId = payload.id
  },

  SET_OPTION_ID(state: IState, payload: IList) {
    state.optionId = payload.id
  },

  SET_FACILITY_ID(state: IState, payload: string) {
    state.facilityId = payload
  },

  SET_PLAN_LIST(state: IState, payload: IList) {
    state.planList.push(payload)
  },

  SET_OPTION_LIST(state: IState, payload: IList) {
    state.optionList.push(payload)
  },

  SET_DATE_RE(state: IState, payload: { checkIn: string; checkOut: string }) {
    state.dates[0] = payload.checkIn
    state.dates[1] = payload.checkOut
    const totalDate = getDiff(payload.checkIn, payload.checkOut)
    state.totalDate = totalDate
  },

  SET_DATES(state: IState, payload: [...string[]]) {
    state.dates = payload
    const totalDate = getDiff(payload[0], payload[1])
    state.totalDate = totalDate
  },

  SET_RECRUITMENT_DATE_RE(
    state: IState,
    payload: { checkIn: string; checkOut: string }
  ) {
    state.recruitmentDates[0] = payload.checkIn
    state.recruitmentDates[1] = payload.checkOut
  },

  SET_RECRUITMENT_DATES(state: IState, payload: [...string[]]) {
    state.recruitmentDates = payload
  }
}

export const actions = {
  async getPlan(dispatch: ICommit, payload: string) {
    const facility = await firestore
      .collection('facilities')
      .where('name', '==', payload)
      .get()
    if (facility.empty) return

    console.log(facility.docs[0].id)
    dispatch.commit('SET_FACILITY_NAME', payload)
    dispatch.commit('SET_FACILITY_ID', facility.docs[0].id)

    const plans = await firestore
      .collection('facilities')
      .doc(facility.docs[0].id)
      .collection('plans')
      .get()

    for (let index = 0; index < plans.size; index++) {
      dispatch.commit('SET_PLAN_LIST', {
        id: plans.docs[index].id,
        text: plans.docs[index].data().planTitle
      })
    }

    const options = await firestore
      .collection('facilities')
      .doc(facility.docs[0].id)
      .collection('options')
      .get()

    for (let index = 0; index < options.size; index++) {
      dispatch.commit('SET_OPTION_LIST', {
        id: options.docs[index].id,
        text: options.docs[index].data().title
      })
    }
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
