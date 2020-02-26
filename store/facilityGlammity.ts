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

export interface IState {
  pageSlice: number
  length: number
  page: number
  displayLists: IGlammity[]
  getGlammityList: IGlammity[]
}

export const state = (): IState => ({
  pageSlice: 0,
  length: 0,
  page: 1,
  getGlammityList: [],
  displayLists: []
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

  SET_PAGE_SLICE(state: IState, payload: number) {
    if (payload <= 420) {
      state.pageSlice = 1
    } else {
      state.pageSlice = 3
    }
  },

  ORGANIZING_GLAMMITY_DATA(state: IState) {
    state.length = Math.ceil(state.getGlammityList.length / state.pageSlice)
    state.displayLists = state.getGlammityList.slice(0, state.pageSlice)
  },

  CHANGE_PAGE(state: IState, payload: number) {
    state.displayLists = state.getGlammityList.slice(
      state.pageSlice * (payload - 1),
      state.pageSlice * payload
    )
  }
}

export const actions = {
  async getFaclity(dispatch: ICommit, payload: string) {
    const glammitys = await firestore
      .collection('glammity')
      .where('facilityUrl', '==', payload)
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
    const userImg = await firestore
      .collection('users')
      .doc(payload.id)
      .get()
    console.log('aaaaa')
    await dispatch.commit('SET_GLAMMITY_DATA', {
      data: payload.data,
      id: payload.id,
      userImg: userImg.data()
    })

    dispatch.commit('ORGANIZING_GLAMMITY_DATA')
  }
}

//   this.length = Math.ceil(this.list.length / this.pageSlice)
//   this.displayLists = this.list.slice(0, this.pageSlice)

// pageChange(pageNumber: number) {
//   this.displayLists = this.list.slice(
//     this.pageSlice * (pageNumber - 1),
//     this.pageSlice * pageNumber
//   )
// }

//   if (window.parent.screen.width <= 420) {
//     this.pageSlice = 1
//   } else {
//     this.pageSlice = 3
//   }
