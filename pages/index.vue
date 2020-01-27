<template>
  <div>
    <v-img
      src="https://firebasestorage.googleapis.com/v0/b/j4k1-b789f.appspot.com/o/glampy%2Ftop.jpg?alt=media&token=01d75370-7f04-4932-b3dd-c9d286798a01"
      aspect-ratio="1"
      class="grey lighten-2"
      max-height="540"
      style="display: flex; flex-flow: row nowrap; justify-content: center; align-items: center;"
      gradient="rgba(255,255,255,.4), rgba(255,255,255,.4)"
    >
      <SearchInput
    /></v-img>

    <GlammityIndexWrap />

    <RecommendationIndexWrap />

    <NewArrivalIndexCard />

    <TagIndexWrap />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import SearchInput from '@/components/Input/Search/SearchInput.vue'
import GlammityIndexWrap from '@/components/IndexContentWrap/GlammityIndexWrap.vue'
import RecommendationIndexWrap from '@/components/IndexContentWrap/RecommendationIndexWrap.vue'
import NewArrivalIndexCard from '@/components/IndexContentWrap/NewArrivalIndexCard.vue'
import TagIndexWrap from '@/components/IndexContentWrap/TagIndexWrap.vue'

@Component({
  components: {
    SearchInput,
    GlammityIndexWrap,
    RecommendationIndexWrap,
    NewArrivalIndexCard,
    TagIndexWrap
  }
})
export default class IndexPage extends Vue {}
</script>

<style lang="scss">
.top-page-glammity-title {
  color: $site_color_2;
}
.top-page-introduction-wrap {
  margin-top: 18px;
  .top-page-introduction-lists {
    margin-left: 65px;
    margin-right: 65px;
  }
}
</style>
