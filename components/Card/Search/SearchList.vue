<template>
  <v-card class="card-wrap-wrap" max-width="500">
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
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'nuxt-property-decorator'

@Component
export default class reservation extends Vue {
  get isSearch(): boolean {
    return this.$store.state.search.isSearch
  }

  get queryList(): [] {
    return this.$store.state.search.searchList
  }

  @Emit('focus')
  selected(value: string) {
    this.$store.commit('search/SET_QUERY_TEXT', value)
    this.$store.commit('search/SET_SEARCH_LIST', [])
  }
}
</script>

<style lang="scss">
.card-wrap-wrap {
  position: absolute;
  z-index: 5;
  top: 45px;
}
</style>
