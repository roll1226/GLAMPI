import * as Vuex from 'vuex'
import { firestore } from '@/plugins/firebase'

interface ICommit {
  commit: Vuex.Commit
  dispatch: Vuex.Dispatch
}

export interface IUser {
  user: string
}
interface IUserDate {
  nickname: string
  firstName: string
  lastName: string
}

interface IState {
  users: IUser[]
}

export const state = (): IState => ({
  users: []
})

export const mutations = {
  CLEAR_INFO(state: IState) {
    state.users = []
  },
  SET_USERS(state: IState, payload: IUserDate) {
    const userList = {
      user:
        payload.nickname !== ''
          ? payload.nickname
          : payload.firstName + payload.lastName
    }

    state.users.push(userList)
  }
}

export const actions = {
  async getUsers(dispatch: ICommit) {
    const users = await firestore.collection('users').get()

    console.log(users.docs[0].data())

    for (let index = 0; index < users.size; index++) {
      dispatch.commit('SET_USERS', users.docs[index].data())
    }
  }
}
