import * as Vuex from 'vuex'
import { auth, twitterProvider, facebookProvider } from '@/plugins/firebase'

interface ICommit {
  commit: Vuex.Commit
}

interface IState {
  userUid: string
  loading: boolean
  loadingChangePassword: boolean
  isLogin: boolean
  snackbarOk: boolean
  snackbarError: boolean
  loginDialog: boolean
  changePasswordDialog: boolean
}

export const state = (): IState => ({
  userUid: '',
  loading: false,
  loadingChangePassword: false,
  isLogin: false,
  snackbarOk: false,
  snackbarError: false,
  loginDialog: false,
  changePasswordDialog: false
})

export const mutations = {
  SET_LOADING(state: IState, payload: boolean) {
    state.loading = payload
  },

  SET_LOADING_CHANGE_PASSWORD(state: IState, payload: boolean) {
    state.loadingChangePassword = payload
  },

  IS_LOGIN(state: IState, payload: boolean) {
    state.isLogin = payload
  },

  SET_SNACKBAR_OK(state: IState, payload: boolean) {
    state.snackbarOk = payload
  },

  SET_SNACKBAR_ERROR(state: IState, payload: boolean) {
    state.snackbarError = payload
  },

  SET_USER_UID(state: IState, payload: string) {
    state.userUid = payload
    console.log(state.userUid)
  },

  SET_LOGIN_DIALOG(state: IState, payload: boolean) {
    state.loginDialog = payload
  },

  SET_CHANGE_PASSWORD_DIALOG(state: IState, payload: boolean) {
    state.changePasswordDialog = payload
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
        dispatch.commit('SET_SNACKBAR_OK', true)
        dispatch.commit('SET_USER_UID', res.user.uid)
        dispatch.commit('SET_LOGIN_DIALOG', false)
      })
      .catch(() => {
        dispatch.commit('SET_LOADING', false)
        dispatch.commit('SET_SNACKBAR_ERROR', true)
      })
  },

  async loginTwitter(dispatch: ICommit) {
    await auth
      .signInWithPopup(twitterProvider)
      .then((res: any) => {
        console.log(res)
        dispatch.commit('IS_LOGIN', true)
        dispatch.commit('SET_SNACKBAR_OK', true)
        dispatch.commit('SET_USER_UID', res.user.uid)
        dispatch.commit('SET_LOGIN_DIALOG', false)
      })
      .catch(() => {
        dispatch.commit('SET_SNACKBAR_ERROR', true)
      })
  },

  async loginFacebook(dispatch: ICommit) {
    await auth
      .signInWithPopup(facebookProvider)
      .then((res: any) => {
        console.log(res)
        dispatch.commit('IS_LOGIN', true)
        dispatch.commit('SET_SNACKBAR_OK', true)
        dispatch.commit('SET_USER_UID', res.user.uid)
        dispatch.commit('SET_LOGIN_DIALOG', false)
      })
      .catch(() => {
        dispatch.commit('SET_SNACKBAR_ERROR', true)
      })
  },

  async changePassword(
    dispatch: ICommit,
    payload: { email: string; actionCodeSettings: { url: string } }
  ) {
    await auth
      .sendPasswordResetEmail(payload.email, payload.actionCodeSettings)
      .then(() => {
        console.log('OK')
        dispatch.commit('SET_CHANGE_PASSWORD_DIALOG', false)
        dispatch.commit('SET_LOADING_CHANGE_PASSWORD', false)
        dispatch.commit('SET_LOGIN_DIALOG', false)

        dispatch.commit('SET_SNACKBAR', true)
        dispatch.commit(
          'SET_SNACKBAR_TEXT',
          `${payload.email}宛ににメールを送信しました。`
        )
        dispatch.commit('SET_SNACKBAR_ICON', 'fas fa-check')
        dispatch.commit('SET_SNACKBAR_COLOR', 'success')
      })
      .catch((error) => {
        console.log(error)

        dispatch.commit('SET_LOADING_CHANGE_PASSWORD', false)

        dispatch.commit('SET_SNACKBAR', true)
        dispatch.commit(
          'SET_SNACKBAR_TEXT',
          '入力されたメールアドレスは登録されていないか、間違っている可能性があります。'
        )
        dispatch.commit('SET_SNACKBAR_ICON', 'fas fa-exclamation')
        dispatch.commit('SET_SNACKBAR_COLOR', 'error')
      })
  }
}
