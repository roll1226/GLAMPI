<template>
  <div class="d-flex justify-center mb-10">
    <v-card outlined class="input-wrap px-3 pt-1 pb-0" style="width: 600px;">
      <v-text-field
        ref="searchInput"
        v-model="query"
        append-icon="fas fa-search"
        label="地域、施設名を入力して下さい。"
        single-line
        persistent-hint
        dense
        background-color="white"
        @input="search"
        @click:append="facilitySearch"
        @keydown.enter="onKeydownEnter($event.keyCode)"
      ></v-text-field>

      <SearchList @focus="focus" />
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
// import VueRouter from 'vue-router'
import SearchList from '@/components/Card/Search/SearchList.vue'

@Component({
  components: {
    SearchList
  }
})
export default class algolie extends Vue {
  search() {
    if (this.query === '') {
      this.$store.commit('search/SET_SEARCH_LIST', [])
      return
    }

    this.$store.dispatch('search/SEARCH_ALGOLIA', this.query)
  }

  @Watch('$route')
  SearchedSearcg() {
    this.$router.push(`/searched?facilityKeyWord=${this.query}`)
    this.$store.commit('search/SET_SEARCH_LIST', [])
    this.$store.commit('search/CLEAR_QUERY')
    this.$store.commit('facility/RESET_FACILITY_INFO')
    this.$store.commit('search/RESET_FACILITY')
    const searchQuery = decodeURI(this.$route.query.facilityKeyWord as string)
    this.$store.dispatch('search/CREATE_SEARCHED_FACILITY', searchQuery)
  }

  facilitySearch() {
    this.$store.commit('search/SET_SEARCH_LIST', [])
    this.$router.push(`/searched?facilityKeyWord=${this.query}`)
  }

  onKeydownEnter(keyCode: number) {
    if (keyCode !== 13) return
    // 実行したい処理
    this.facilitySearch()
  }

  focus() {
    const searchInput: any = this.$refs.searchInput
    searchInput.focus()
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
