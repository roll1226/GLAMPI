<template>
  <div>
    <v-img
      src="https://firebasestorage.googleapis.com/v0/b/j4k1-b789f.appspot.com/o/glampy%2Ftop.jpg?alt=media&token=01d75370-7f04-4932-b3dd-c9d286798a01"
      aspect-ratio="1"
      class="grey lighten-2"
      max-height="650"
      style="display: flex; flex-flow: row nowrap; justify-content: center; align-items: center;"
      gradient="rgba(255,255,255,.4), rgba(255,255,255,.4)"
    >
      <SearchInput class="mx-3 px-2" style="margin-top: 10px;"
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
  layout: 'layoutIndex',
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
.top-page-introduction-wrap {
  background-color: aquamarine;
  //各top-page-introduction-wrapのmargin
  margin: 50px 0 0 0;

  .top-page-titles {
    background-color: bisque;
    color: $site_color_2;
    font-size: 24px;
    font-weight: bold;
    width: max-content;
    //top-page-titlesとtop-page-introduction-listsの間はここのmargin-bottomで指定
    margin: 0 auto 20px;
  }

  //スマホサイズの時のmargin(パソコンの時:65px)
  .top-page-cards {
    background-color: bisque;
    margin-left: 15px;
    margin-right: 15px;
  }

  // .top-page-card {
  // }
}

//パソコンサイズのmargin
@media screen and (min-width: 770px) {
  .top-page-introduction-wrap {
    .top-page-cards {
      margin-left: 65px;
      margin-right: 65px;
    }
  }
}
</style>
