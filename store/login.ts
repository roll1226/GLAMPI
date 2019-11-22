import * as Vuex from 'vuex'
import { auth } from '@/plugins/firebase'

interface ICommit {
  commit: Vuex.Commit
}

interface IState {
  loading: boolean
  isLogin: boolean
}

export const state = (): IState => ({
  loading: false,
  isLogin: false
})

export const mutations = {
  SET_LOADING(state: IState, payload: boolean) {
    state.loading = payload
  },

  IS_LOGIN(state: IState, payload: boolean) {
    state.isLogin = payload
  }
}

export const actions = {
  async loginEmailPass(
    dispatch: ICommit,
    payload: { user: string; password: string }
  ) {
    await auth
      .signInWithEmailAndPassword(payload.user, payload.password)
      .then(() => {
        dispatch.commit('SET_LOADING', false)
        dispatch.commit('IS_LOGIN', true)
      })
      .catch(() => {
        dispatch.commit('SET_LOADING', false)
      })
  }
}
