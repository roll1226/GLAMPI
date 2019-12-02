import * as Vuex from 'vuex'
import algoliasearch from 'algoliasearch'
import config from '@/plugins/algolia'

const client = algoliasearch(
  config.algolia_app_id as string,
  config.algolia_api_key as string
)

const index = client.initIndex('Facilities')

interface ICommit {
  commit: Vuex.Commit
}

interface IState {
  queryText: string
  searchList: []
}

export const state = (): IState => ({
  queryText: '',
  searchList: []
})

export const mutations = {
  SET_SEARCH_LIST(state: IState, payload: []) {
    state.searchList = payload
  },

  SET_QUERY_TEXT(state: IState, payload: string) {
    state.queryText = payload
  }
}

export const actions = {
  async SEARCH_ALGOLIA(dispatch: ICommit, payload: string) {
    const searchResult = await index.search({ query: payload })
    dispatch.commit('SET_SEARCH_LIST', searchResult.hits)
  }
}
