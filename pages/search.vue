<template>
  <div>
    <h1>
      Searchテスト
    </h1>

    <v-row>
      <v-col cols="7" class="pr-0">
        <div class="input-wrap">
          <v-text-field
            v-model="query"
            label="グランピング検索"
            hint="地域、施設名を入力して下さい。"
            outlined
            persistent-hint
            dense
            @blur="cloneInput"
          ></v-text-field>

          <v-card v-show="isSearch" class="card-wrap-wrap" max-width="500">
            <v-list>
              <v-list-item-group color="primary">
                <v-list-item
                  v-for="(item, i) in queryList"
                  :key="i"
                  @click="selected(item.name)"
                >
                  <v-list-item-content>
                    <v-list-item-title v-text="item.name"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </div>
      </v-col>

      <v-col class="pl-0" style="margin-top: 1px;">
        <v-btn color="success" @click="search">
          検索
        </v-btn>
      </v-col>
    </v-row>
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
  isSearch: boolean = false

  cloneInput() {
    this.isSearch = false
  }

  async search() {
    if (this.query === '') {
      this.queryList = []
      return
    }
    this.isSearch = true
    this.queryList = []
    const searchResult = await index.search({ query: this.query })
    this.queryList = searchResult.hits
  }

  selected(value: string) {
    console.log(value)
    this.query = value
    this.isSearch = false
    this.queryList = []
  }
}
</script>

<style lang="scss">
.input-wrap {
  position: relative;
  .card-wrap-wrap {
    position: absolute;
    bottom: -34%;
  }
}
</style>
