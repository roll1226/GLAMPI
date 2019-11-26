import * as Vuex from 'vuex'
// import * as axios from 'axios'
const { default: axios } = require('axios')
import { auth } from '@/plugins/firebase'
interface ICommit {
  commit: Vuex.Commit
}
interface IState {
  loading: boolean
  isLogin: boolean
  test: object[]
}
export const state = (): IState => ({
  loading: false,
  isLogin: false,
  test: []
})
export const mutations = {
  SET_LOADING(state: IState, payload: boolean) {
    state.loading = payload
  },
  IS_LOGIN(state: IState, payload: boolean) {
    state.isLogin = payload
  },
  SET_TEST(state: IState, payload: object[]) {
    state.test = payload
  }
}
export const actions = {
  async loginEmailPass(
    dispatch: ICommit,
    payload: { user: string; password: string }
  ) {
    const params = new URLSearchParams()
    params.append('user', payload.user)
    params.append('passwd', payload.password)
    params.append('login', 'aaa')
    await axios
      .post('http://localhost:8080/GLAMPY/login.php', params)
      .then((response: object[]) => {
        dispatch.commit('SET_TEST', response)
        dispatch.commit('SET_LOADING', false)
      })
  },

  async loginOut(dispatch: ICommit, payload: boolean) {
    const params = new URLSearchParams()
    params.append('logout', 'aaa')
    await axios
      .post('http://localhost:8080/GLAMPY/login.php', params)
      .then((response: object[]) => {
        dispatch.commit('SET_TEST', response)
        dispatch.commit('SET_LOADING', false)
      })
  }
}
