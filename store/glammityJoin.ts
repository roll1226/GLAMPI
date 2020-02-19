import * as Vuex from 'vuex'
import { firestore } from '@/plugins/firebase'
import { IUserInfo } from '@/store/glammityGroup'

interface ICommit {
  commit: Vuex.Commit
  dispatch: Vuex.Dispatch
}

interface IUser {
  userImg: string
  userName: string
}

interface IGlammityData {
  name: string
  facilityUrl: string
  plan: string
  numberOfApplicants: number
  allPay: number
  checkIn: string
  comment: string
  slider: [...string[]]
}

export interface IGlammity {
  glammityName: string
  facilityName: string
  planName: string
  numberOfApplicants: number
  allPay: number
  checkIn: string
  comment: string
  users: IUser[]
  slider: [...string[]]
}

interface IState {
  joinBtnDialog: boolean
  joinedBtnDialog: boolean
  loading: boolean
  glammity: IGlammity
}

export const state = (): IState => ({
  joinBtnDialog: false,
  joinedBtnDialog: false,
  loading: false,
  glammity: {
    glammityName: '',
    facilityName: '',
    planName: '',
    numberOfApplicants: 0,
    allPay: 0,
    checkIn: '',
    comment: '',
    slider: [],
    users: []
  }
})

export const mutations = {
  SET_JOIN_BTN_DIALOG(state: IState, payload: boolean) {
    state.joinBtnDialog = payload
  },

  SET_JOINED_BTN_DIALOG(state: IState, payload: boolean) {
    state.joinedBtnDialog = payload
  },

  SET_LOADING(state: IState, payload: boolean) {
    state.loading = payload
  },

  SET_USER(state: IState, payload: IUserInfo) {
    const user = {
      userName:
        payload.nickname !== ''
          ? payload.nickname
          : payload.lastName + payload.firstName,
      userImg: payload.userImg
    }

    state.glammity.users.push(user)
  },

  SET_GLAMMITY_SLIDER(state: IState, payload: [...string[]]) {
    for (const slider of payload) {
      state.glammity.slider.push(slider)
    }
  },

  SET_GLAMMITY_PLAN(state: IState, payload: { planTitle: string }) {
    state.glammity.planName = payload.planTitle
  },

  SET_GLAMMITY_FACILITY_NAME(state: IState, payload: string) {
    state.glammity.facilityName = payload
  },

  SET_GLAMMITY_DATA(state: IState, payload: IGlammityData) {
    state.glammity.glammityName = payload.name
    state.glammity.numberOfApplicants = payload.numberOfApplicants
    state.glammity.allPay = payload.allPay
    state.glammity.checkIn = payload.checkIn
    state.glammity.comment = payload.comment
  },

  RESET_GLAMMITY(state: IState) {
    state.glammity = {
      glammityName: '',
      facilityName: '',
      planName: '',
      numberOfApplicants: 0,
      allPay: 0,
      checkIn: '',
      comment: '',
      slider: [],
      users: []
    }
  }
}

export const actions = {
  async getGlammity(dispatch: ICommit, payload: string) {
    try {
      const db = await firestore
        .collection('glammity')
        .doc(payload)
        .get()
      dispatch.commit('SET_GLAMMITY_DATA', db.data())

      dispatch.dispatch('getFacility', db.data())

      dispatch.dispatch('getUser', payload)

      console.log(db.data())
    } catch (error) {
      console.log(error)
    }
  },

  async getUser(dispatch: ICommit, payload: string) {
    const member = await firestore
      .collection('glammity')
      .doc(payload)
      .collection('member')
      .get()

    for (const user of member.docs) {
      const userInfo = await firestore
        .collection('users')
        .doc(user.id)
        .get()
      dispatch.commit('SET_USER', userInfo.data())
    }
  },

  async getFacility(dispatch: ICommit, payload: IGlammityData) {
    const facilityDate = await firestore
      .collection('facilities')
      .where('displayName', '==', payload.facilityUrl)
      .get()
    const facilityName = facilityDate.docs[0].data().name
    const slider = facilityDate.docs[0].data().slider

    const plan = await firestore
      .collection('facilities')
      .doc(facilityDate.docs[0].id)
      .collection('plans')
      .doc(payload.plan)
      .get()
    dispatch.commit('SET_GLAMMITY_SLIDER', slider)
    dispatch.commit('SET_GLAMMITY_PLAN', plan.data())
    dispatch.commit('SET_GLAMMITY_FACILITY_NAME', facilityName)
  }
}
