import * as Vuex from 'vuex'
import { firestore } from '@/plugins/firebase'

interface ICommit {
  commit: Vuex.Commit
  dispatch: Vuex.Dispatch
}

export interface IFacility {
  facility: string
}
interface IFacilityDate {
  name: string
}

interface IState {
  facilities: IFacility[]
}

export const state = (): IState => ({
  facilities: []
})

export const mutations = {
  CLEAR_INFO(state: IState) {
    state.facilities = []
  },
  SET_FACILITIES(state: IState, payload: IFacilityDate) {
    const facilityList = {
      facility: payload.name
    }

    state.facilities.push(facilityList)
  }
}

export const actions = {
  async getFacilities(dispatch: ICommit) {
    const facilities = await firestore.collection('facilities').get()

    console.log(facilities.docs[0].data())

    for (let index = 0; index < facilities.size; index++) {
      dispatch.commit('SET_FACILITIES', facilities.docs[index].data())
    }
  }
}
