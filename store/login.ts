import * as Vuex from 'vuex'
import { auth, twitterProvider, facebookProvider } from '@/plugins/firebase'

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
  userUid: string
}

export const state = (): IState => ({
  loading: false,
  isLogin: false,
  snackbar: false,
  snackbarText: '',
  snackbarIcon: '',
  snackbarColor: '',
  userUid: ''
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
  },

  SET_USER_UID(state: IState, payload: string) {
    state.userUid = payload
    console.log(state.userUid)
  }
}

export const actions = {
  async loginEmailPass(
    dispatch: ICommit,
    payload: { user: string; password: string }
  ) {
    await auth
      .signInWithEmailAndPassword(payload.user, payload.password)
      .then((res: any) => {
        dispatch.commit('SET_LOADING', false)
        dispatch.commit('IS_LOGIN', true)
        dispatch.commit('SET_SNACKBAR', true)
        dispatch.commit('SET_SNACKBAR_TEXT', 'ログインしました。')
        dispatch.commit('SET_SNACKBAR_ICON', 'fas fa-check')
        dispatch.commit('SET_SNACKBAR_COLOR', 'success')
        dispatch.commit('SET_USER_UID', res.user.uid)
      })
      .catch(() => {
        dispatch.commit('SET_LOADING', false)
        dispatch.commit('SET_SNACKBAR', true)
        dispatch.commit(
          'SET_SNACKBAR_TEXT',
          'メールアドレス又は、パスワードが違います。'
        )
        dispatch.commit('SET_SNACKBAR_ICON', 'fas fa-exclamation')
        dispatch.commit('SET_SNACKBAR_COLOR', 'error')
      })
  },

  async loginTwitter(dispatch: ICommit) {
    await auth
      .signInWithPopup(twitterProvider)
      .then((res: any) => {
        console.log(res)
        dispatch.commit('IS_LOGIN', true)
        dispatch.commit('SET_SNACKBAR', true)
        dispatch.commit('SET_SNACKBAR_TEXT', 'ログインしました。')
        dispatch.commit('SET_SNACKBAR_ICON', 'fas fa-check')
        dispatch.commit('SET_SNACKBAR_COLOR', 'success')
        dispatch.commit('SET_USER_UID', res.user.uid)

      })
      .catch(() => {
        dispatch.commit('SET_SNACKBAR', true)
        dispatch.commit('SET_SNACKBAR_TEXT', 'ログインに失敗しました。')
        dispatch.commit('SET_SNACKBAR_ICON', 'fas fa-exclamation')
        dispatch.commit('SET_SNACKBAR_COLOR', 'error')
      })
  },

  async loginFacebook(dispatch: ICommit) {
    await auth
      .signInWithPopup(facebookProvider)
      .then((res: any) => {
        console.log(res)
        dispatch.commit('IS_LOGIN', true)
        dispatch.commit('SET_SNACKBAR', true)
        dispatch.commit('SET_SNACKBAR_TEXT', 'ログインしました。')
        dispatch.commit('SET_SNACKBAR_ICON', 'fas fa-check')
        dispatch.commit('SET_SNACKBAR_COLOR', 'success')
        dispatch.commit('SET_USER_UID', res.user.uid)
      })
      .catch(() => {
        dispatch.commit('SET_SNACKBAR', true)
        dispatch.commit('SET_SNACKBAR_TEXT', 'ログインに失敗しました。')
        dispatch.commit('SET_SNACKBAR_ICON', 'fas fa-exclamation')
        dispatch.commit('SET_SNACKBAR_COLOR', 'error')
      })
  }
}
