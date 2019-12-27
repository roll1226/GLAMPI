import * as Vuex from 'vuex'
import { firestore } from '@/plugins/firebase'

interface ICommit {
  commit: Vuex.Commit
}

export interface IFacility {
  info: [...string[]]
  email: string
  phoneNumber: string
  facilityName: string
  slider: [...string[]]
  streetAddress: [...string[]]
}

export interface IPlan {
  details: [...string[]]
  pay: number
  planImage: string
  planTitle: string
}

export interface IComment {
  date: string
  star: number
  text: string
  userName: string
  userImg: string
}

interface IState {
  facility: IFacility
  plan: IPlan[]
  comments: IComment[]
}

export const state = (): IState => ({
  facility: {
    info: [],
    email: '',
    phoneNumber: '',
    facilityName: '',
    slider: [],
    streetAddress: []
  },

  plan: [],

  comments: []
})

export const mutations = {
  SET_FACILITY(state: IState, payload: IFacility) {
    state.facility = payload
  },

  SET_PLAN(state: IState, payload: IPlan) {
    state.plan.push(payload)
  },

  SET_COMMENT(state: IState, payload: IComment) {
    state.comments.push(payload)
  },

  SET_COMMENT_NEW(state: IState, payload: IComment) {
    state.comments.unshift(payload)
    state.comments.shift()
  },

  RESET_PlAN(state: IState) {
    state.plan = []
  },

  RESET_COMMENT(state: IState) {
    state.comments = []
  }
}

export const actions = {
  async catchFacility(
    dispatch: ICommit,
    payload: string
  ) {
    const facilityFirebase = firestore
    .collection('facilities')

    dispatch.commit('RESET_PlAN', [])
    await facilityFirebase
      .where('displayName', '==', payload)
      .get()
      .then((snapshot) => {
        if (!snapshot.empty) {
          snapshot.forEach(async (doc) => {
            dispatch.commit('SET_FACILITY', doc.data())
            const facilityId = doc.id

            await facilityFirebase
              .doc(facilityId)
              .collection('plans')
              .get()
              .then((planSnapshot) => {
                if (!planSnapshot.empty) {
                  planSnapshot.forEach((planDoc) => {
                    dispatch.commit('SET_PLAN', planDoc.data())
                  })
                }
              })
          })
        }
      })
  }
}
