<template>
  <div>
    <h1>
      Searchテスト
    </h1>

    <input v-model="query" type="text" />

    <button @click="search">
      検索
    </button>

    <div v-for="(query, index) in queryList" :key="index">
      {{ query.name }}
    </div>
  </div>
</template>

<script lang="ts">
import algoliasearch from 'algoliasearch'
import { Component, Vue } from 'nuxt-property-decorator'
import config from '@/plugins/algolia'

const client = algoliasearch(
  config.algolia_app_id as string,
  config.algolia_api_key as string
)

const index = client.initIndex('Facilities')

@Component
export default class algolie extends Vue {
  public query: string = ''
  public queryList: object[] = []

  async search() {
    this.queryList = []
    const searchResult = await index.search({ query: this.query })
    this.queryList = searchResult.hits
  }
}
</script>
