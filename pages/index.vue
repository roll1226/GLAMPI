<template>
  <div>
    <v-img
      src="https://images.unsplash.com/photo-1508974462591-3c124867fdf8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1952&q=80"
      aspect-ratio="1"
      class="grey lighten-2"
      max-height="750"
      style="display: flex; flex-flow: row nowrap; justify-content: center; align-items: center;"
      gradient="rgba(255,255,255,.4), rgba(255,255,255,.4)"
    >
      <SearchInput class="mx-3 px-2" style="margin-top: 10px;"
    /></v-img>

    <GlammityIndexWrap />

    <RecommendationIndexWrap />

    <NewArrivalIndexCard />

    <TagIndexWrap />

    <v-dialog v-model="isCardDialog" width="500">
      <reservationModal />
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import SearchInput from '@/components/Input/Search/SearchInput.vue'
import GlammityIndexWrap from '@/components/IndexContentWrap/GlammityIndexWrap.vue'
import RecommendationIndexWrap from '@/components/IndexContentWrap/RecommendationIndexWrap.vue'
import NewArrivalIndexCard from '@/components/IndexContentWrap/NewArrivalIndexCard.vue'
import TagIndexWrap from '@/components/IndexContentWrap/TagIndexWrap.vue'
import reservationModal from '@/components/Card/Reservation/ReservationDialog.vue'

@Component({
  layout: 'layoutIndex',
  components: {
    SearchInput,
    GlammityIndexWrap,
    RecommendationIndexWrap,
    NewArrivalIndexCard,
    TagIndexWrap,
    reservationModal
  }
})
export default class IndexPage extends Vue {
  get isCardDialog(): boolean {
    return this.$store.state.reservationModal.isCardDialog
  }
  set isCardDialog(value: boolean) {
    this.$store.commit('reservationModal/SET_ISCARDDIALOG', value)
  }
  created() {
    this.$store.commit('RESET_GLAMMITY_DATA')
    this.$store.dispatch('getGlammity')
    this.$store.dispatch('getFacility')
    this.isCardDialog = this.$store.state.reservationModal.isCardDialog
  }
}
</script>

<style lang="scss">
.top-page-introduction-wrap {
  margin: 100px 0 0 0;

  .top-page-titles {
    //background-color: bisque;
    color: $site_color_2;
    font-size: 24px;
    font-weight: bold;
    width: max-content;
    //top-page-titlesとtop-page-introduction-listsの間はここのmargin-bottomで指定
    margin: 0 auto 20px;
  }

  //スマホサイズの時のmargin(パソコンの時:65px)
  .top-page-cards {
    //background-color: bisque;
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
