import * as Vuex from 'vuex'
import { auth } from '@/plugins/firebase'

interface ICommit {
  commit: Vuex.Commit
}

interface IState {
  isLogin: boolean
  snackbarOk: boolean
  snackbarError: boolean
  isLoading: boolean
}

export const state = (): IState => ({
  isLogin: false,
  snackbarOk: false,
  snackbarError: false,
  isLoading: false
})

export const mutations = {
  SET_IS_LOGIN(state: IState, payload: boolean) {
    state.isLogin = payload
  },

  LOGIN_OK(state: IState, payload: boolean) {
    state.snackbarOk = payload
  },

  LOGIN_ERROR(state: IState, payload: boolean) {
    state.snackbarError = payload
  },

  SET_LOADING(state: IState, payload: boolean) {
    state.isLoading = payload
  }
}

export const actions = {
  async logout(dispatch: ICommit) {
    await auth.signOut()
    dispatch.commit('SET_IS_LOGIN', false)
  },

  async login(dispatch: ICommit, payload: { user: string; password: string }) {
    dispatch.commit('SET_LOADING', true)
    await auth
      .signInWithEmailAndPassword(payload.user, payload.password)
      .then(() => {
        dispatch.commit('LOGIN_OK', true)
      })
      .catch(() => {
        dispatch.commit('LOGIN_ERROR', true)
      })
    dispatch.commit('SET_LOADING', false)
  }
}
