import * as Vuex from 'vuex'
import { firestore } from '@/plugins/firebase'

interface ICommit {
  commit: Vuex.Commit
  dispatch: Vuex.Dispatch
}

export interface IGlammityInfoList {
  title: string
  info: string
}

interface IGlammityData {
  name: string
  numberOfApplicants: number
}

interface IState {
  glammityName: IGlammityInfoList
  facilityName: IGlammityInfoList
  plan: IGlammityInfoList
  numberOfApplicants: IGlammityInfoList
  numberOfParticipants: IGlammityInfoList
  estimatedAmount: IGlammityInfoList
}

const initialList = {
  title: '',
  info: ''
}

export const state = (): IState => ({
  glammityName: initialList,
  facilityName: initialList,
  plan: initialList,
  numberOfApplicants: initialList,
  numberOfParticipants: initialList,
  estimatedAmount: initialList
})

export const mutations = {
  CLEAR_INFO(state: IState) {
    state.glammityName = initialList
    state.facilityName = initialList
    state.plan = initialList
    state.numberOfApplicants = initialList
    state.numberOfParticipants = initialList
    state.estimatedAmount = initialList
  },

  SET_GLAMMITY_INFO(state: IState, payload: IGlammityData) {
    const glammityName = {
      title: 'Glammity名',
      info: payload.name
    }

    const numberOfApplicants = {
      title: '募集人数',
      info: `${payload.numberOfApplicants}人`
    }

    state.glammityName = glammityName
    state.numberOfApplicants = numberOfApplicants
  },

  SET_FACILITY_NAME(state: IState, payload: { name: string }) {
    const facilityName = {
      title: '施設名',
      info: payload.name
    }
    state.facilityName = facilityName
  },

  SET_PLAN(state: IState, payload: { planTitle: string }) {
    const plan = {
      title: 'プラン名',
      info: payload.planTitle
    }
    state.plan = plan
  },

  SET_NUMBER_OF_PARTICIPANTS(state: IState, payload: IGlammityInfoList) {
    state.numberOfParticipants = payload
  },

  SET_ESTIMATED_AMOUNT(
    state: IState,
    payload: { numberOfPeople: number; allPay: { allPay: number } }
  ) {
    const estimatedAmount = {
      title: '一人当たりの金額',
      info: `${(
        payload.allPay.allPay / payload.numberOfPeople
      ).toLocaleString()}円`
    }
    state.estimatedAmount = estimatedAmount
  }
}

export const actions = {
  async getGlammityInfo(dispatch: ICommit, payload: string) {
    const glammityInfo = await firestore
      .collection('glammity')
      .doc(payload)
      .get()

    const member = await firestore
      .collection('glammity')
      .doc(payload)
      .collection('member')
      .get()

    dispatch.commit('SET_GLAMMITY_INFO', glammityInfo.data())

    const numberOfParticipants = {
      title: '参加人数',
      info: `${member.size}人`
    }
    dispatch.commit('SET_NUMBER_OF_PARTICIPANTS', numberOfParticipants)

    dispatch.commit('SET_ESTIMATED_AMOUNT', {
      numberOfPeople: member.size,
      allPay: glammityInfo.data()
    })

    dispatch.dispatch('getFacility', glammityInfo.data())
  },

  async getFacility(
    dispatch: ICommit,
    payload: { facilityUrl: string; plan: string }
  ) {
    const facility = await firestore
      .collection('facilities')
      .where('displayName', '==', payload.facilityUrl)
      .get()

    dispatch.commit('SET_FACILITY_NAME', facility.docs[0].data())

    dispatch.dispatch('getPlan', {
      facilityId: facility.docs[0].id,
      planId: payload.plan
    })
  },

  async getPlan(
    dispatch: ICommit,
    payload: { facilityId: string; planId: string }
  ) {
    const plan = await firestore
      .collection('facilities')
      .doc(payload.facilityId)
      .collection('plans')
      .doc(payload.planId)
      .get()

    dispatch.commit('SET_PLAN', plan.data())
  }
}
