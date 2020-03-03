import * as Vuex from 'vuex'
import { firestore } from '@/plugins/firebase'

interface ICommit {
  commit: Vuex.Commit
  dispatch: Vuex.Dispatch
  state: IState
}

export interface IList {
  id: string
  text: string
}

interface IState {
  glammityName: string
  facilityName: string
  facilityId: string
  planId: string
  planList: IList[]
  optionId: string
  optionList: IList[]
  guestNumber: number
}

export const state = (): IState => ({
  glammityName: '',
  facilityName: '',
  facilityId: '',
  planId: '',
  planList: [],
  optionId: '',
  optionList: [],
  guestNumber: 0
})

export const mutations = {
  SET_GLAMMITY_NAME(state: IState, payload: string) {
    state.glammityName = payload
  },

  SET_FACILITY_NAME(state: IState, payload: string) {
    state.facilityName = payload
  },

  SET_GUEST_NUMBER(state: IState, payload: string) {
    state.guestNumber = Number(payload)
  },

  SET_PLAN_ID(state: IState, payload: IList) {
    state.planId = payload.id
  },

  SET_OPTION_ID(state: IState, payload: IList) {
    state.optionId = payload.id
  },

  SET_FACILITY_ID(state: IState, payload: string) {
    state.facilityId = payload
  },

  SET_PLAN_LIST(state: IState, payload: IList) {
    state.planList.push(payload)
  },

  SET_OPTION_LIST(state: IState, payload: IList) {
    state.optionList.push(payload)
  }
}

export const actions = {
  async getPlan(dispatch: ICommit, payload: string) {
    const facility = await firestore
      .collection('facilities')
      .where('name', '==', payload)
      .get()
    if (facility.empty) return

    console.log(facility.docs[0].id)
    dispatch.commit('SET_FACILITY_NAME', payload)
    dispatch.commit('SET_FACILITY_ID', facility.docs[0].id)

    const plans = await firestore
      .collection('facilities')
      .doc(facility.docs[0].id)
      .collection('plans')
      .get()

    for (let index = 0; index < plans.size; index++) {
      dispatch.commit('SET_PLAN_LIST', {
        id: plans.docs[index].id,
        text: plans.docs[index].data().planTitle
      })
    }

    const options = await firestore
      .collection('facilities')
      .doc(facility.docs[0].id)
      .collection('options')
      .get()

    for (let index = 0; index < options.size; index++) {
      dispatch.commit('SET_OPTION_LIST', {
        id: options.docs[index].id,
        text: options.docs[index].data().title
      })
    }
  }
}
