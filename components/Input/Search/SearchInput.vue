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
        color="rgb(87, 95, 69)"
        @input="search"
        @click:append="facilitySearch"
        @keydown.enter="onKeydownEnter($event.keyCode)"
      ></v-text-field>

      <SearchList @focus="focus" />
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
// import VueRouter from 'vue-router'
import SearchList from '@/components/Card/Search/SearchList.vue'

@Component({
  components: {
    SearchList
  }
})
export default class algolie extends Vue {
  created() {
    this.$store.commit('search/RESET_FACILITY_QUERY')
  }

  search() {
    if (this.query === '') {
      this.$store.commit('search/SET_SEARCH_LIST', [])
      return
    }

    this.$store.dispatch('search/SEARCH_ALGOLIA', this.query)
  }

  facilitySearch() {
    this.$store.commit('search/SET_SEARCH_LIST', [])
    this.$router.push(
      `/searched?facilityKeyWord=${this.query}&prefectures=&tag=`
    )
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
