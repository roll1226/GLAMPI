import * as Vuex from 'vuex'
import { firestore } from '@/plugins/firebase'

interface ICommit {
  commit: Vuex.Commit
}

interface IUser {
  userImg: string
  userName: string
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
  }
}

export const actions = {
  async getGlammity(dispatch: ICommit, payload: string) {
    try {
      const db = await firestore
        .collection('glammity')
        .doc(payload)
        .get()
      console.log(db.data())
    } catch (error) {
      console.log(error)
    }
  }
}
