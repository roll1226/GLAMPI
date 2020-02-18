import * as Vuex from 'vuex'

interface ICommit {
  commit: Vuex.Commit
}

interface IState {
  screen2: number
}

export const state = (): IState => ({
  screen2: 0
})

export const mutations = {
  SET_SCREEN_NUMBER(state: IState, payload: number) {
    state.screen2 = payload
  }
}
