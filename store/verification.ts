import * as Vuex from 'vuex'

interface ICommit {
  commit: Vuex.Commit
}

export interface IVerification {
  title: string
  text: string
}

interface IState {
  verificationList: IVerification[]
}

export const state = (): IState => ({
  verificationList: []
})

export const mutations = {
  SET_VERIFICATION(state: IState, payload: { title: string; text: string }) {
    const list = {
      title: payload.title,
      text: payload.text
    }
    state.verificationList.push(list)
  }
}
