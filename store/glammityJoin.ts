import * as Vuex from 'vuex'
import { firestore } from '@/plugins/firebase'

interface ICommit {
  commit: Vuex.Commit
}

interface IState {
  joinBtnDialog: boolean
  joinedBtnDialog: boolean
  loading: boolean
}

export const state = (): IState => ({
  joinBtnDialog: false,
  joinedBtnDialog: false,
  loading: false
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
