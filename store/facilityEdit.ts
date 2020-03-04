import * as Vuex from 'vuex'

interface ICommit {
  commit: Vuex.Commit
  dispatch: Vuex.Dispatch
  state: IState
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
  uid: string
}

export interface ISliderList {
  img: File | null
}

export interface ITagsList {
  tag: string
  icon: string
}

export interface IState {
  planEdit: IPlanList[]
  facilityInfo: string
  optionEdit: IOptionList[]
  sliderEdit: ISliderList[]
  tagsEdit: ITagsList[]
  dialog: boolean
  loading: boolean
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
  pay: '',
  uid: ''
}

const sliderList = {
  img: null
}

export const state = (): IState => ({
  planEdit: [],
  facilityInfo: '',
  optionEdit: [],
  sliderEdit: [],
  tagsEdit: [],
  dialog: false,
  loading: false
})

export const mutations = {
  RESET_EDIT(state: IState) {
    state.facilityInfo = ''
    state.planEdit = []
    state.optionEdit = []
    state.sliderEdit = []
    state.tagsEdit = []

    state.planEdit.push(planList)
    state.optionEdit.push(optionList)
    state.sliderEdit.push(sliderList)
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

  PLUS_SLIDER_EDIT(state: IState) {
    state.sliderEdit.push(sliderList)
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
  },

  SET_OPTION_EDIT_UID(state: IState, payload: { value: string; cnt: number }) {
    state.optionEdit[payload.cnt].uid = payload.value
  },

  SET_SLIDER_EDIT_IMAGE(
    state: IState,
    payload: { img: File | null; cnt: number }
  ) {
    state.sliderEdit[payload.cnt].img = payload.img
  },

  SET_TAG_EDIT(state: IState, payload: ITagsList[]) {
    state.tagsEdit = []
    if (payload.length === 0) {
      return
    }
    for (let index = 0; index < payload.length; index++) {
      const tag = {
        tag: payload[index].tag,
        icon: payload[index].icon
      }
      state.tagsEdit.push(tag)
    }
  },

  SET_EDIT_DIALOG(state: IState, payload: boolean) {
    state.dialog = payload
  }
}

export const actions = {
  async updateFacilityEdit(dispatch: ICommit, payload: string) {}
}
