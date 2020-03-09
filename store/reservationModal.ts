import * as Vuex from 'vuex'

interface ICommit {
  commit: Vuex.Commit
}

interface IState {
  isCardDialog: boolean
}

export const state = (): IState => ({
  isCardDialog: false
})

export const mutations = {
  SET_ISCARDDIALOG(state: IState, payload: boolean) {
    state.isCardDialog = payload
  }
}
