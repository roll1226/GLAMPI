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

interface IUserInfo {
  userImg: string
  firstName: string
  lastName: string
  nickname: string
}

export interface IAvatar {
  userName: string
  img: string
}

interface IState {
  tabNumber: number
  userStates: userStates
  message: IMessage[]
  avatar: IAvatar[]
}

export const state = (): IState => ({
  tabNumber: 0,
  userStates: 'guest',
  message: [],
  avatar: []
})

export const mutations = {
  SET_TAB_NUMBER(state: IState, payload: number) {
    state.tabNumber = payload
  },

  SET_USER_STATES(state: IState, payload: { userStates: userStates }) {
    state.userStates = payload.userStates
  },

  SET_MESSAGE(
    state: IState,
    payload: {
      user: IUserInfo
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
  },

  RESET_AVATAR(state: IState) {
    state.avatar = []
  },

  SET_AVATAR(state: IState, payload: IUserInfo) {
    const user = {
      userName:
        payload.nickname !== ''
          ? payload.nickname
          : payload.lastName + payload.firstName,
      img: payload.userImg
    }

    state.avatar.push(user)
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
  },

  async getMember(dispatch: ICommit, payload: string) {
    const member = await firestore
      .collection('glammity')
      .doc(payload)
      .collection('member')
      .get()

    for (const user of member.docs) {
      const userInfo = await firestore
        .collection('users')
        .doc(user.id)
        .get()
      dispatch.commit('SET_AVATAR', userInfo.data())
    }
  }
}
