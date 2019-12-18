<template>
  <div>
    <div
      class="d-flex mx-3 justify-center mb-10 px-2"
      style="margin-top: -70px"
    >
      <v-card outlined class="input-wrap px-3 pt-1 pb-0" style="width: 600px;">
        <v-text-field
          v-model="query"
          append-icon="fas fa-search"
          label="地域、施設名を入力して下さい。"
          single-line
          persistent-hint
          dense
          background-color="white"
          @input="search"
          @click:append="algoliaSearch"
        ></v-text-field>

        <SerchList />
      </v-card>
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
  search() {
    if (this.query === '') return

    this.$store.dispatch('search/SEARCH_ALGOLIA', this.query)
  }

  algoliaSearch() {
    console.log('ok')
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
