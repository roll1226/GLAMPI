import * as Vuex from 'vuex'
import { firestore } from '@/plugins/firebase'

interface ICommit {
  commit: Vuex.Commit
}

export interface IGlammitys {
  facilityName: string
  facilityUrl: string
  organizer: string
  applicationPeriod: [...string[]]
  glammityId: string
  userImg: string
}

interface IState {
  glammitys: IGlammitys[]
}

export const state = (): IState => ({
  glammitys: []
})

export const mutations = {
  SET_GLAMMITYS(state: IState, payload: IGlammitys) {
    state.glammitys.push(payload)
  },

  RESET_CARD(state: IState) {
    state.glammitys = []
  }
}

export const actions = {
  async getGlammitys(dispatch: ICommit) {
    const glammitys = await firestore.collection('glammity').get()

    for (const glammity of glammitys.docs) {
      console.log(glammity.data())

      const facility = await firestore
        .collection('facilities')
        .where('displayName', '==', glammity.data().facilityUrl)
        .get()

      const userData = await firestore
        .collection('users')
        .doc(glammity.data().organizer)
        .get()
      const user: any = userData.data()

      const glammityList = {
        facilityName: facility.docs[0].data().name,
        facilityUrl: glammity.data().facilityUrl,
        organizer:
          user.nickname !== '' ? user.nickname : user.lastName + user.firstName,
        applicationPeriod: glammity.data().applicationPeriod,
        glammityId: glammity.id,
        userImg: user.userImg
      }
      dispatch.commit('SET_GLAMMITYS', glammityList)
    }
  }
}
