<template>
  <div>
    <h1>
      Searchテスト
    </h1>

    <div class="d-flex justify-center px-2">
      <div class="input-wrap" style="width: 600px;">
        <v-text-field
          v-model="query"
          label="グランピング検索"
          hint="地域、施設名を入力して下さい。"
          outlined
          persistent-hint
          dense
          @blur="cloneInput"
        ></v-text-field>

        <SerchList :query-list="queryList" />
      </div>

      <v-btn
        color="success"
        class="ml-1"
        style="margin-top: 1px;"
        @click="search"
      >
        検索
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import SerchList from '@/components/Card/Search/SearchList.vue'

@Component({
  components: {
    SerchList
  }
})
export default class algolie extends Vue {
  public queryList: object[] = []
  isSearch: boolean = false

  cloneInput() {
    this.isSearch = false
  }

  search() {
    this.queryList = []
    if (this.query === '') return
    this.isSearch = true
    this.$store.dispatch('search/SEARCH_ALGOLIA', this.query)
  }

  get query(): string {
    return this.$store.state.search.queryText
  }

  set query(val: string) {
    this.$store.commit('search/SET_QUERY_TEXT', val)
  }
}
</script>

<style lang="scss">
.input-wrap {
  position: relative;
}
</style>
