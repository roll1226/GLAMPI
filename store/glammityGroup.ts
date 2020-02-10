import * as Vuex from 'vuex'
// import { firestore } from '@/plugins/firebase'

export type userStates = 'host' | 'guest'

interface ICommit {
  commit: Vuex.Commit
}

interface IState {
  tabNumber: number
  userStates: userStates
}

export const state = (): IState => ({
  tabNumber: 0,
  userStates: 'host'
})

export const mutations = {
  SET_TAB_NUMBER(state: IState, payload: number) {
    state.tabNumber = payload
  },

  SET_USER_STATES(state: IState, payload: userStates) {
    state.userStates = payload
  }
}
