import * as Vuex from 'vuex'
import { firestore } from '@/plugins/firebase'

interface ICommit {
  commit: Vuex.Commit
  dispatch: Vuex.Dispatch
  state: IState
}

interface IState {}

export const state = (): IState => ({})

export const mutations = {}

export const actions = {}
