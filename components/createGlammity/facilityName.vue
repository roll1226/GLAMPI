<template>
  <div>
    <v-row>
      <v-col sm="2">
        <h2>施設名</h2>
      </v-col>
      <v-col sm="9" class="input-wrap">
        <v-text-field
          ref="searchInput"
          v-model="query"
          label="地域、施設名を入力して下さい。"
          single-line
          persistent-hint
          dense
          background-color="white"
          color="rgb(87, 95, 69)"
          @input="search"
        ></v-text-field>

        <SearchList @focus="focus" />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import SearchList from '@/components/Card/Search/SearchList.vue'

@Component({
  components: {
    SearchList
  }
})
export default class facilityNameCreateGlammity extends Vue {
  search() {
    if (this.query === '') {
      this.$store.commit('search/SET_SEARCH_LIST', [])
      return
    }

    this.$store.dispatch('search/SEARCH_ALGOLIA', this.query)
  }

  focus() {
    this.$store.dispatch('glammityCreate/getPlan', this.query)
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
