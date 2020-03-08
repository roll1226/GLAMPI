import * as Vuex from 'vuex'
import { storage, firestore, timestamp, fieldValue } from '@/plugins/firebase'
const uuid = require('uuid/v4')

interface ICommit {
  commit: Vuex.Commit
  dispatch: Vuex.Dispatch
  state: IState
}

export interface IPlanList {
  img: any
  planTitle: string
  maxGuests: string
  details: string
  pay: number | string
}

export interface IOptionList {
  img: any
  optionTitle: string
  details: string
  pay: number | string
  uid: string
}

export interface ISliderList {
  img: any
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
  endDialog: boolean
  loading: boolean
  siteDialog: boolean

  checkSliderImg: any
  checkPlan: any
  checkPlanImg: any
  checkOption: any
  checkOptionImg: any
}

const planList = {
  img: null,
  planTitle: '',
  maxGuests: '',
  details: '',
  pay: ''
}

const checkPlanList = {
  planTitle: '',
  pay: 0,
  details: '',
  maxGuests: ''
}

const optionList = {
  img: null,
  optionTitle: '',
  details: '',
  pay: '',
  uid: uuid()
    .split('-')
    .join('')
    .slice(0, -12)
}

const checkOptionList = {
  optionTitle: '',
  details: '',
  pay: 0
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
  endDialog: false,
  loading: false,
  siteDialog: false,

  checkSliderImg: [],
  checkPlan: [
    {
      planTitle: '',
      pay: 0,
      details: '',
      maxGuests: ''
    }
  ],
  checkPlanImg: [],
  checkOption: [
    {
      optionTitle: '',
      details: '',
      pay: 0
    }
  ],
  checkOptionImg: []
})

export const mutations = {
  RESET_EDIT(state: IState) {
    state.facilityInfo = ''
    state.planEdit = []
    state.optionEdit = []
    state.sliderEdit = []
    state.tagsEdit = []
    state.checkSliderImg = []
    state.checkPlan = []
    state.checkPlanImg = []
    state.checkOption = []
    state.checkOptionImg = []

    state.planEdit.push(planList)
    state.optionEdit.push(optionList)
    state.sliderEdit.push(sliderList)
    state.checkPlan.push(checkPlanList)
    state.checkPlan.push(checkOptionList)
    state.checkOption.push(checkOptionList)
  },

  SET_FACILITY_INFO(state: IState, payload: string) {
    state.facilityInfo = payload
  },

  PLUS_PLAN_EDIT(state: IState) {
    const setPlanDate = {
      img: null,
      planTitle: '',
      maxGuests: '',
      details: '',
      pay: ''
    }

    const setCheckPlan = {
      planTitle: '',
      pay: 0,
      details: '',
      maxGuests: ''
    }

    state.planEdit.push(setPlanDate)
    state.checkPlan.push(setCheckPlan)
  },

  PLUS_OPTION_EDIT(state: IState) {
    const setOptionDate = {
      img: null,
      optionTitle: '',
      details: '',
      pay: '',
      uid: uuid()
        .split('-')
        .join('')
        .slice(0, -12)
    }

    const setCheckOptionDate = {
      optionTitle: '',
      details: '',
      pay: 0
    }

    state.optionEdit.push(setOptionDate)
    state.checkOption.push(setCheckOptionDate)
  },

  PLUS_SLIDER_EDIT(state: IState) {
    state.sliderEdit.push(sliderList)
  },

  SET_PLAN_EDIT_IMAGE(state: IState, payload: { img: any; cnt: number }) {
    state.planEdit[payload.cnt].img = payload.img

    const reader = new FileReader()
    reader.readAsDataURL(payload.img)
    reader.addEventListener('load', () => {
      state.checkPlanImg[payload.cnt] = reader.result
    })
  },

  SET_PLAN_EDIT_TITLE(state: IState, payload: { value: string; cnt: number }) {
    state.planEdit[payload.cnt].planTitle = payload.value

    state.checkPlan[payload.cnt].planTitle = payload.value
  },

  SET_PLAN_EDIT_MAX_GUESTS(
    state: IState,
    payload: { value: string; cnt: number }
  ) {
    state.planEdit[payload.cnt].maxGuests = payload.value

    state.checkPlan[payload.cnt].maxGuests = payload.value
  },

  SET_PLAN_EDIT_DETAILS(
    state: IState,
    payload: { value: string; cnt: number }
  ) {
    state.planEdit[payload.cnt].details = payload.value

    state.checkPlan[payload.cnt].details = payload.value
  },

  SET_PLAN_EDIT_PAY(state: IState, payload: { value: string; cnt: number }) {
    state.planEdit[payload.cnt].pay = Number(payload.value)

    state.checkPlan[payload.cnt].pay = Number(payload.value)
  },

  SET_OPTION_EDIT_IMAGE(state: IState, payload: { img: any; cnt: number }) {
    state.optionEdit[payload.cnt].img = payload.img

    const reader = new FileReader()
    reader.readAsDataURL(payload.img)
    reader.addEventListener('load', () => {
      state.checkOptionImg[payload.cnt] = reader.result
    })
  },

  SET_OPTION_EDIT_TITLE(
    state: IState,
    payload: { value: string; cnt: number }
  ) {
    state.optionEdit[payload.cnt].optionTitle = payload.value

    state.checkOption[payload.cnt].optionTitle = payload.value
  },

  SET_OPTION_EDIT_DETAILS(
    state: IState,
    payload: { value: string; cnt: number }
  ) {
    state.optionEdit[payload.cnt].details = payload.value

    state.checkOption[payload.cnt].details = payload.value
  },

  SET_OPTION_EDIT_PAY(state: IState, payload: { value: string; cnt: number }) {
    state.optionEdit[payload.cnt].pay = Number(payload.value)

    state.checkOption[payload.cnt].pay = Number(payload.value)
  },

  SET_OPTION_EDIT_UID(state: IState, payload: { value: string; cnt: number }) {
    state.optionEdit[payload.cnt].uid = payload.value
  },

  SET_SLIDER_EDIT_IMAGE(state: IState, payload: { img: any; cnt: number }) {
    console.log(payload.img)

    state.sliderEdit[payload.cnt].img = payload.img

    const reader = new FileReader()
    reader.readAsDataURL(payload.img)
    reader.addEventListener('load', () => {
      state.checkSliderImg[payload.cnt] = reader.result
    })
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
  },

  SET_LOADING(state: IState, payload: boolean) {
    state.loading = payload
  },

  SET_END_DIALOG(state: IState, payload: boolean) {
    state.endDialog = payload
  },

  SET_SITE_DIALOG(state: IState, payload: boolean) {
    state.siteDialog = payload
  }
}

export const actions = {
  async updateFacilityEdit(dispatch: ICommit, payload: string) {
    // 施設ID取得
    const facility = await firestore
      .collection('facilities')
      .where('displayName', '==', payload)
      .get()

    // 施設info
    await firestore
      .collection('facilities')
      .doc(facility.docs[0].id)
      .update({
        info: dispatch.state.facilityInfo
      })

    // プラン
    const planEdit = dispatch.state.planEdit
    for (let index = 0; index < dispatch.state.planEdit.length; index++) {
      const planImg = await storage
        .ref()
        .child(`facility/${payload}/plans/${planEdit[index].img.name}`)
        .put(planEdit[index].img)

      const planImgUrl = await planImg.ref.getDownloadURL()

      const planData = {
        details: planEdit[index].details,
        maxGuests: planEdit[index].maxGuests,
        pay: planEdit[index].pay,
        planTitle: planEdit[index].planTitle,
        planImage: planImgUrl
      }

      await firestore
        .collection('facilities')
        .doc(facility.docs[0].id)
        .collection('plans')
        .add(planData)
    }

    // オプション
    const optionEdit = dispatch.state.optionEdit
    for (let index = 0; index < optionEdit.length; index++) {
      const optionImg = await storage
        .ref()
        .child(`facility/${payload}/options/${optionEdit[index].img.name}`)
        .put(optionEdit[index].img)

      const optionImgUrl = await optionImg.ref.getDownloadURL()

      const optionData = {
        createdAt: timestamp,
        texts: optionEdit[index].details,
        pay: optionEdit[index].pay,
        displayName: optionEdit[index].uid,
        title: optionEdit[index].optionTitle,
        img: optionImgUrl
      }

      await firestore
        .collection('facilities')
        .doc(facility.docs[0].id)
        .collection('options')
        .add(optionData)
    }

    // スライダー
    const sliderEdit = dispatch.state.sliderEdit
    for (let index = 0; index < sliderEdit.length; index++) {
      const sliderImg = await storage
        .ref()
        .child(`facility/${payload}/slider/${sliderEdit[index].img.name}`)
        .put(sliderEdit[index].img)

      const sliderImgUrl = await sliderImg.ref.getDownloadURL()

      await firestore
        .collection('facilities')
        .doc(facility.docs[0].id)
        .update({
          slider: fieldValue.arrayUnion(sliderImgUrl)
        })
    }

    // タグ
    const tagEdit = dispatch.state.tagsEdit
    for (let index = 0; index < tagEdit.length; index++) {
      await firestore
        .collection('facilities')
        .doc(facility.docs[0].id)
        .update({
          tags: fieldValue.arrayUnion(tagEdit[index].tag)
        })
    }

    dispatch.commit('SET_LOADING', false)
    dispatch.commit('SET_EDIT_DIALOG', false)
    dispatch.commit('SET_END_DIALOG', true)
  }
}
