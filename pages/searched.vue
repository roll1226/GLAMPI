<template>
  <div>
    <h1>
      検索後
    </h1>

    <v-row>
      <v-col lg="4" md="4" sm="4" xs="12">
        <SearchedSideNavigation class="mobile-searched-side-navigation" />
        <SearchedSideNavigationTags />
      </v-col>

      <v-col lg="8" md="8" sm="8" xs="12" class="search-card">
        <SearchInput class="searched-input-components" />
        <SearchedFasility
          v-for="(facility, index) in facilityList"
          :key="index"
          :fasility-name="facility.facilityName"
          :address="facility.address"
          :plan-name="facility.planName"
          :plan-pay="facility.planPay"
          :introduction-url="facility.introduction"
          :glammity-url="facility.glammity"
          :facility-img="facility.facilityImg[0]"
          :facility-tags="facility.tagsList"
          class="mb-2"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import SearchedFasility from '@/components/Card/Search/SearchedFasility.vue'
import { IFacility } from '@/store/facility'
import SearchedSideNavigation from '@/components/Card/Search/SearchedSideNavigation.vue'
import SearchInput from '@/components/Input/Search/SearchInput.vue'
import SearchedSideNavigationTags from '@/components/Card/Search/SearchedSideNavigationTags.vue'

@Component({
  components: {
    SearchedFasility,
    SearchedSideNavigation,
    SearchInput,
    SearchedSideNavigationTags
  }
})
export default class Searched extends Vue {
  get facilityList(): IFacility[] {
    return this.$store.state.search.facilityList
  }

  get query(): string {
    return this.$store.state.search.queryText
  }

  @Watch('$route')
  SearchedSearcg() {
    if (
      this.$route.query.facilityKeyWord === '' &&
      this.$route.query.prefectures === '' &&
      this.$route.query.tag === ''
    ) {
      this.changeUrlFunc()
    } else if (
      this.$route.query.facilityKeyWord !== '' &&
      this.$route.query.prefectures === '' &&
      this.$route.query.tag === ''
    ) {
      this.changeUrlFunc()
    } else if (
      this.$route.query.facilityKeyWord === '' &&
      this.$route.query.prefectures !== '' &&
      this.$route.query.tag === ''
    ) {
      console.log(this.$route.query.prefectures)

      this.$store.commit('search/SET_SEARCH_LIST', [])
      this.$store.commit('search/CLEAR_QUERY')
      this.$store.commit('facility/RESET_FACILITY_INFO')
      this.$store.commit('search/RESET_FACILITY')

      const prefecture = decodeURI(this.$route.query.prefectures as string)
      this.$store.dispatch('search/CREATE_SEARCHED_FACILITY', prefecture)
    } else if (
      this.$route.query.facilityKeyWord === '' &&
      this.$route.query.prefectures === '' &&
      this.$route.query.tag !== ''
    ) {
      this.$store.commit('search/SET_SEARCH_LIST', [])
      this.$store.commit('search/CLEAR_QUERY')
      this.$store.commit('facility/RESET_FACILITY_INFO')
      this.$store.commit('search/RESET_FACILITY')

      const tag = decodeURI(this.$route.query.tag as string)
      this.$store.dispatch('search/SEARCH_FACILITY_TAG', tag)
    }
  }

  changeUrlFunc() {
    this.$router.push(
      `/searched?facilityKeyWord=${this.query}&prefectures=&tag=`
    )

    this.$store.commit('search/SET_SEARCH_LIST', [])
    this.$store.commit('search/CLEAR_QUERY')
    this.$store.commit('facility/RESET_FACILITY_INFO')
    this.$store.commit('search/RESET_FACILITY')

    const searchQuery = decodeURI(this.$route.query.facilityKeyWord as string)
    this.$store.dispatch('search/CREATE_SEARCHED_FACILITY', searchQuery)
  }

  created() {
    this.SearchedSearcg()
  }
}
</script>

<style lang="scss">
.search-card {
  .searched-input-components {
    .theme--light.v-card.v-card--outlined {
      border: none;
    }
  }
}
@media screen and(max-width: 770px) {
  .search-card {
    padding-left: 38px;
    padding-right: 38px;
  }

  .mobile-searched-side-navigation {
    display: none;
  }
}
</style>
