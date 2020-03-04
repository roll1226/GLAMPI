import * as Vuex from 'vuex'

interface ICommit {
  commit: Vuex.Commit
  dispatch: Vuex.Dispatch
}

export interface IPlanList {
  img: File | null
  planTitle: string
  maxGuests: string
  details: string
  pay: number | string
}

export interface IOptionList {
  img: File | null
  optionTitle: string
  details: string
  pay: number | string
}
export interface IState {
  planEdit: IPlanList[]
  facilityInfo: string
  optionEdit: IOptionList[]
}

const planList = {
  img: null,
  planTitle: '',
  maxGuests: '',
  details: '',
  pay: ''
}

const optionList = {
  img: null,
  optionTitle: '',
  details: '',
  pay: ''
}

export const state = (): IState => ({
  planEdit: [],
  facilityInfo: '',
  optionEdit: []
})

export const mutations = {
  RESET_EDIT(state: IState) {
    state.facilityInfo = ''
    state.planEdit = []
    state.optionEdit = []

    state.planEdit.push(planList)
    state.optionEdit.push(optionList)
  },

  SET_FACILITY_INFO(state: IState, payload: string) {
    state.facilityInfo = payload
  },

  PLUS_PLAN_EDIT(state: IState) {
    state.planEdit.push(planList)
  },

  PLUS_OPTION_EDIT(state: IState) {
    state.optionEdit.push(optionList)
  },

  SET_PLAN_EDIT_IMAGE(
    state: IState,
    payload: { img: File | null; cnt: number }
  ) {
    state.planEdit[payload.cnt].img = payload.img
  },

  SET_PLAN_EDIT_TITLE(state: IState, payload: { value: string; cnt: number }) {
    state.planEdit[payload.cnt].planTitle = payload.value
  },

  SET_PLAN_EDIT_MAX_GUESTS(
    state: IState,
    payload: { value: string; cnt: number }
  ) {
    state.planEdit[payload.cnt].maxGuests = payload.value
  },

  SET_PLAN_EDIT_DETAILS(
    state: IState,
    payload: { value: string; cnt: number }
  ) {
    state.planEdit[payload.cnt].details = payload.value
  },

  SET_PLAN_EDIT_PAY(state: IState, payload: { value: string; cnt: number }) {
    state.planEdit[payload.cnt].pay = Number(payload.value)
  },

  SET_OPTION_EDIT_IMAGE(
    state: IState,
    payload: { img: File | null; cnt: number }
  ) {
    state.optionEdit[payload.cnt].img = payload.img
  },

  SET_OPTION_EDIT_TITLE(
    state: IState,
    payload: { value: string; cnt: number }
  ) {
    state.optionEdit[payload.cnt].optionTitle = payload.value
  },

  SET_OPTION_EDIT_DETAILS(
    state: IState,
    payload: { value: string; cnt: number }
  ) {
    state.optionEdit[payload.cnt].details = payload.value
  },

  SET_OPTION_EDIT_PAY(state: IState, payload: { value: string; cnt: number }) {
    state.optionEdit[payload.cnt].pay = Number(payload.value)
  }
}

export const actions = {}
