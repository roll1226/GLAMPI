<template>
  <div class="top-page-introduction-wrap index-wrap-tag">
    <v-row no-gutters>
      <v-col>
        <h3 class="top-page-titles">
          タグ検索
        </h3>
      </v-col>
    </v-row>

    <v-row class="top-page-cards">
      <v-col>
        <SearchedSideNavigationTags />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import SearchedSideNavigationTags from '@/components/Card/Search/SearchedSideNavigationTags.vue'

@Component({
  components: {
    SearchedSideNavigationTags
  }
})
export default class TagIndexWrap extends Vue {}
</script>

<style lang="scss">
// .index-tag-mobile {
//   display: block;

//   max-width: 300px;
//   margin: 0 auto;
// }

.index-tag-pc {
  display: none;
}

@media screen and (min-width: 770px) {
  // .index-wrap-tag {
  //   margin-left: 14px;
  //   margin-right: 14px;
  // }

  .index-tag-mobile {
    display: none;
  }

  .index-tag-pc {
    display: block;
  }
}
</style>
