import * as Vuex from 'vuex'
import { firestore } from '@/plugins/firebase'

export type userStates = 'host' | 'guest'

interface ICommit {
  commit: Vuex.Commit
  dispatch: Vuex.Dispatch
}

export interface IMessage {
  userName: string
  userImg: string
  message: string
}

interface IState {
  tabNumber: number
  userStates: userStates
  message: IMessage[]
}

export const state = (): IState => ({
  tabNumber: 0,
  userStates: 'host',
  message: []
})

export const mutations = {
  SET_TAB_NUMBER(state: IState, payload: number) {
    state.tabNumber = payload
  },

  SET_USER_STATES(state: IState, payload: userStates) {
    state.userStates = payload
  },

  SET_MESSAGE(
    state: IState,
    payload: {
      user: {
        userImg: string
        firstName: string
        lastName: string
        nickname: string
      }
      message: string
    }
  ) {
    const message = {
      userName:
        payload.user.nickname !== ''
          ? payload.user.nickname
          : payload.user.lastName + payload.user.firstName,
      userImg: payload.user.userImg,
      message: payload.message
    }
    state.message.push(message)
  },

  RESET_MESSAGE(state: IState) {
    state.message = []
  }
}

export const actions = {
  async getMessage(dispatch: ICommit, payload: string) {
    const messages = await firestore
      .collection('glammity')
      .doc(payload)
      .collection('messages')
      .orderBy('createdAt', 'asc')
      .get()

    // const items = message.docs.map((doc) => doc.data())
    // console.log(items)
    for (const message of messages.docs) {
      dispatch.dispatch('getUser', message.data())
    }
  },

  async getUser(
    dispatch: ICommit,
    payload: { message: string; userId: string }
  ) {
    const user = await firestore
      .collection('users')
      .doc(payload.userId)
      .get()

    dispatch.commit('SET_MESSAGE', {
      user: user.data(),
      message: payload.message
    })
  }
}
