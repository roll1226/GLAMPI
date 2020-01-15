import * as Vuex from 'vuex'

interface ICommit {
  commit: Vuex.Commit
}

interface IState {
  GlammityName: string
  facilityName: string
  plan: string
  recruitmentNumbers: string
  schedule: string
}

export const state = (): IState => ({
  GlammityName: '',
  facilityName: '',
  plan: '',
  recruitmentNumbers: '',
  schedule: ''
})

export const mutations = {
  SET_GLAMMITY_NAME(state: IState, payload: string) {
    state.GlammityName = payload
  },

  SET_FACILITY_NAME(state: IState, payload: string) {
    state.facilityName = payload
  },

  SET_PLAN(state: IState, payload: string) {
    state.plan = payload
  },

  SET_RECRUITMENT_NUMBERS(state: IState, payload: string) {
    state.recruitmentNumbers = payload
  },

  SET_SCHEDULE(state: IState, payload: string) {
    state.schedule = payload
  }
}
