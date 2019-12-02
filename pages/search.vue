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
          @input="search"
        ></v-text-field>

        <SerchList />
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
  search() {
    if (this.query === '') return

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
