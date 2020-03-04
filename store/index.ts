import * as Vuex from 'vuex'
import { firestore } from '@/plugins/firebase'

interface ICommit {
  commit: Vuex.Commit
  dispatch: Vuex.Dispatch
}

export interface IGlammityData {
  name: string
  comment: string
  organizer: string
}

export interface IGlammity {
  title: string
  text: string
  src: string
  url: string
}

export interface IFacility {
  src: string
  title: string
  text: string
  url: string
}

export interface IState {
  getGlammityList: IGlammity[]
  getFacilityList: IFacility[]
  getNewFacilityList: IFacility[]
}

export const state = (): IState => ({
  getGlammityList: [],
  getFacilityList: [],
  getNewFacilityList: []
})

export const mutations = {
  SET_GLAMMITY_DATA(
    state: IState,
    payload: {
      data: IGlammityData
      id: string
      userImg: { userImg: string }
    }
  ) {
    const list = {
      title: payload.data.name,
      text: payload.data.comment,
      src: payload.userImg.userImg,
      url: payload.id
    }

    state.getGlammityList.push(list)
  },

  SET_FACILITY_DATA(
    state: IState,
    payload: {
      displayName: string
      name: string
      slider: [...string[]]
      info: string
    }
  ) {
    const list = {
      src: payload.slider[0],
      title: payload.name,
      text: payload.info,
      url: payload.displayName
    }

    state.getFacilityList.push(list)
  },

  SET_NEW_FACILITY_DATA(
    state: IState,
    payload: {
      displayName: string
      name: string
      slider: [...string[]]
      info: string
    }
  ) {
    const list = {
      src: payload.slider[0],
      title: payload.name,
      text: payload.info,
      url: payload.displayName
    }

    state.getNewFacilityList.push(list)
  },

  RESET_GLAMMITY_DATA(state: IState) {
    state.getGlammityList = []
    state.getFacilityList = []
    state.getNewFacilityList = []
  }
}

export const actions = {
  async getGlammity(dispatch: ICommit) {
    const glammitys = await firestore
      .collection('glammity')
      .limit(4)
      .get()

    for (const glammity of glammitys.docs) {
      await dispatch.dispatch('getUserImg', {
        data: glammity.data(),
        id: glammity.id
      })
    }
  },

  async getUserImg(
    dispatch: ICommit,
    payload: { data: IGlammityData; id: string }
  ) {
    const user = await firestore
      .collection('users')
      .doc(payload.data.organizer)
      .get()

    await dispatch.commit('SET_GLAMMITY_DATA', {
      data: payload.data,
      id: payload.id,
      userImg: user.data()
    })
  },

  async getFacility(dispatch: ICommit) {
    const facility = await firestore
      .collection('facilities')
      .orderBy('like', 'asc')
      .limit(4)
      .get()

    for (let index = 0; index < facility.size; index++) {
      dispatch.commit('SET_FACILITY_DATA', facility.docs[index].data())
    }

    const newFacility = await firestore
      .collection('facilities')
      .orderBy('createdAt', 'asc')
      .limit(4)
      .get()

    for (let index = 0; index < newFacility.size; index++) {
      dispatch.commit('SET_NEW_FACILITY_DATA', newFacility.docs[index].data())
    }
  }
}
