import * as Vuex from 'vuex'
import { firestore } from '@/plugins/firebase'

export type userStates = 'host' | 'guest'

interface ICommit {
  commit: Vuex.Commit
  dispatch: Vuex.Dispatch
  state: IState
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
  id: number
  boxId: [...number[]]
  message: IMessage[]
  avatar: IAvatar[]
}

export const state = (): IState => ({
  tabNumber: 0,
  userStates: 'guest',
  id: 0,
  message: [],
  boxId: [],
  avatar: []
})

export const mutations = {
  SET_TAB_NUMBER(state: IState, payload: number) {
    state.tabNumber = payload
  },

  SET_USER_STATES(state: IState, payload: { userStates: userStates }) {
    state.userStates = payload.userStates
  },

  SET_BOX_ID(state: IState, payload: number) {
    state.boxId.push(payload)
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

  RESET_BOX_ID(state: IState) {
    state.boxId = []
  },

  RESET_MESSAGE(state: IState) {
    state.message = []
  },

  RESET_AVATAR(state: IState) {
    state.avatar = []
  },

  SET_ID(state: IState, payload: number) {
    state.id = payload
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
    await firestore
      .collection('glammity')
      .doc(payload)
      .collection('messages')
      .orderBy('createdAt', 'asc')
      .onSnapshot(async (messages) => {
        console.log(messages.docs.length)
        dispatch.commit('SET_ID', messages.docs.length)

        for (const message of messages.docs) {
          await dispatch.dispatch('getUser', message.data())
        }
      })

    // const items = message.docs.map((doc) => doc.data())
    // console.log(items)
  },

  async getUser(
    dispatch: ICommit,
    payload: { message: string; userId: string; id: number }
  ) {
    const user = await firestore
      .collection('users')
      .doc(payload.userId)
      .get()

    if (dispatch.state.boxId.includes(payload.id)) return

    dispatch.commit('SET_BOX_ID', payload.id)

    dispatch.commit('SET_MESSAGE', {
      user: user.data(),
      message: payload.message,
      id: payload.id
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
