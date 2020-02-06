import * as Vuex from 'vuex'
import algoliasearch from 'algoliasearch'
import config from '@/plugins/algolia'
import { firestore } from '@/plugins/firebase'

const client = algoliasearch(
  config.algolia_app_id as string,
  config.algolia_api_key as string
)

const index = client.initIndex('Facilities')

interface ICommit {
  commit: Vuex.Commit
}

export interface IFacility {
  facilityName: string
  facilityImg: string
  address: string
  planName: string
  planPay: number
  introduction: string
  glammity: string
  tags: [...string[]]
}

interface IState {
  queryText: string
  searchList: []
  facilityList: IFacility[]
}

export const state = (): IState => ({
  queryText: '',
  searchList: [],
  facilityList: []
})

export const mutations = {
  SET_SEARCH_LIST(state: IState, payload: []) {
    state.searchList = payload
  },

  SET_QUERY_TEXT(state: IState, payload: string) {
    state.queryText = payload
  },

  CLEAR_QUERY(state: IState) {
    state.queryText = ''
    state.facilityList = []
  },

  SET_FACILITY_LIST(state: IState, payload: IFacility) {
    state.facilityList.push(payload)
  },

  RESET_FACILITY(state: IState) {
    state.facilityList = []
  }
}

export const actions = {
  async SEARCH_FACILITY_TAG(dispatch: ICommit, payload: string) {
    try {
      const tag = await firestore
        .collection('facilities')
        .where('tags', 'array-contains', payload)
        .get()
      console.log(tag.docs.length)
      for (let index = 0; index < tag.docs.length; index++) {
        const facility = tag.docs[index].data()
        await firestore
          .collection('facilities')
          .doc(tag.docs[index].id)
          .collection('plans')
          .orderBy('pay', 'asc')
          .limit(1)
          .get()
          .then((queryPlan) => {
            if (!queryPlan.empty) {
              queryPlan.forEach(async (docPlan) => {
                const plan = docPlan.data()
                console.log('search!!!!')
                const facilityName = facility.name
                const address = `${facility.streetAddress[0]}${facility.streetAddress[1]}`
                const facilityImg = facility.slider
                const planName = plan.planTitle
                const planPay = plan.pay
                const introduction = facility.displayName
                const glammity = introduction
                const tagsList = []

                for (let index = 0; index < facility.tags.length; index++) {
                  const tag = await firestore
                    .collection('tags')
                    .where('tag', '==', facility.tags[index])
                    .get()

                  for (
                    let tagIndex = 0;
                    tagIndex < tag.docs.length;
                    tagIndex++
                  ) {
                    console.log(tag.docs[tagIndex].data())
                    tagsList.push(tag.docs[tagIndex].data())
                  }
                }

                const facilityArray = {
                  facilityName,
                  facilityImg,
                  address,
                  planName,
                  planPay,
                  introduction,
                  glammity,
                  tagsList
                }
                dispatch.commit('SET_FACILITY_LIST', facilityArray)
              })
            }
          })
      }
    } catch (error) {
      console.log(error)
    }
  },

  async SEARCH_ALGOLIA(dispatch: ICommit, payload: string) {
    const searchResult = await index.search({ query: payload })
    dispatch.commit('SET_SEARCH_LIST', searchResult.hits)
  },

  async CREATE_SEARCHED_FACILITY(dispatch: ICommit, payload: string) {
    if (payload === '') {
      await firestore
        .collection('facilities')
        .get()
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            querySnapshot.forEach(async (doc) => {
              console.log(doc.data())
              console.log(doc.id)
              const facility = await doc.data()

              await firestore
                .collection('facilities')
                .doc(doc.id)
                .collection('plans')
                .orderBy('pay', 'asc')
                .limit(1)
                .get()
                .then((queryPlan) => {
                  if (!queryPlan.empty) {
                    queryPlan.forEach(async (docPlan) => {
                      const plan = docPlan.data()

                      const facilityName = facility.name
                      const address = `${facility.streetAddress[0]}${facility.streetAddress[1]}`
                      const facilityImg = facility.slider
                      const planName = plan.planTitle
                      const planPay = plan.pay
                      const introduction = facility.displayName
                      const glammity = introduction
                      const tagsList = []

                      for (
                        let index = 0;
                        index < facility.tags.length;
                        index++
                      ) {
                        const tag = await firestore
                          .collection('tags')
                          .where('tag', '==', facility.tags[index])
                          .get()

                        for (
                          let tagIndex = 0;
                          tagIndex < tag.docs.length;
                          tagIndex++
                        ) {
                          console.log(tag.docs[tagIndex].data())
                          tagsList.push(tag.docs[tagIndex].data())
                        }
                      }

                      const facilityArray = {
                        facilityName,
                        facilityImg,
                        address,
                        planName,
                        planPay,
                        introduction,
                        glammity,
                        tagsList
                      }
                      dispatch.commit('SET_FACILITY_LIST', facilityArray)
                    })
                  }
                })
            })
          }
        })
    } else {
      await firestore
        .collection('facilities')
        .where('searchQuery', 'array-contains', payload)
        .get()
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            querySnapshot.forEach(async (doc) => {
              console.log(doc.data())
              console.log(doc.id)
              const facility = doc.data()

              await firestore
                .collection('facilities')
                .doc(doc.id)
                .collection('plans')
                .orderBy('pay', 'asc')
                .limit(1)
                .get()
                .then((queryPlan) => {
                  if (!queryPlan.empty) {
                    queryPlan.forEach(async (docPlan) => {
                      const plan = docPlan.data()
                      console.log('search!!!!')
                      const facilityName = facility.name
                      const address = `${facility.streetAddress[0]}${facility.streetAddress[1]}`
                      const facilityImg = facility.slider
                      const planName = plan.planTitle
                      const planPay = plan.pay
                      const introduction = facility.displayName
                      const glammity = introduction
                      const tagsList = []

                      for (
                        let index = 0;
                        index < facility.tags.length;
                        index++
                      ) {
                        const tag = await firestore
                          .collection('tags')
                          .where('tag', '==', facility.tags[index])
                          .get()

                        for (
                          let tagIndex = 0;
                          tagIndex < tag.docs.length;
                          tagIndex++
                        ) {
                          console.log(tag.docs[tagIndex].data())
                          tagsList.push(tag.docs[tagIndex].data())
                        }
                      }

                      const facilityArray = {
                        facilityName,
                        facilityImg,
                        address,
                        planName,
                        planPay,
                        introduction,
                        glammity,
                        tagsList
                      }
                      dispatch.commit('SET_FACILITY_LIST', facilityArray)
                    })
                  }
                })
            })
          }
        })
    }
  }
}
