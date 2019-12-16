import * as Vuex from 'vuex'
const { default: axios } = require('axios')

interface ICommit {
  commit: Vuex.Commit
}

interface IState {
  loading: boolean
  isLogin: boolean
  snackbar: boolean
  snackbarText: string
  snackbarIcon: string
  snackbarColor: string
}

export const state = (): IState => ({
  loading: false,
  isLogin: false,
  snackbar: false,
  snackbarText: '',
  snackbarIcon: '',
  snackbarColor: ''
})

export const mutations = {
  SET_LOADING(state: IState, payload: boolean) {
    state.loading = payload
  },

  IS_LOGIN(state: IState, payload: boolean) {
    state.isLogin = payload
  },

  SET_SNACKBAR(state: IState, payload: boolean) {
    state.snackbar = payload
  },

  SET_SNACKBAR_TEXT(state: IState, payload: string) {
    state.snackbarText = payload
  },

  SET_SNACKBAR_ICON(state: IState, payload: string) {
    state.snackbarIcon = payload
  },

  SET_SNACKBAR_COLOR(state: IState, payload: string) {
    state.snackbarColor = payload
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
    params.append('login', 'login')
    await axios
      .post(
        'http://localhost:8080/GLAMPY/Controller/usersController.php',
        params
      )
      .then((response: { isLogin: boolean; status: boolean }) => {
        dispatch.commit('IS_LOGIN', response.isLogin)
        dispatch.commit('SET_SNACKBAR', response.status)
        dispatch.commit('SET_SNACKBAR_TEXT', 'ログインしました。')
        dispatch.commit('SET_SNACKBAR_ICON', 'fas fa-check')
        dispatch.commit('SET_SNACKBAR_COLOR', 'success')
        dispatch.commit('IS_LOGIN', true)
        dispatch.commit('SET_LOADING', false)
      })
  }
}
