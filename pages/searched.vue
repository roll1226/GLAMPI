<template>
  <div>
    <h1>
      検索後
    </h1>

    <v-row>
      <v-col lg="4" md="4" sm="4" xs="12">
        <v-card class="mx-auto" outlined>
          <v-card-actions>
            <v-btn text>Button</v-btn>
            <v-btn text>Button</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col lg="8" md="8" sm="8" xs="12" class="search-card">
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
          class="mb-2"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import SearchedFasility from '@/components/Card/Search/SearchedFasility.vue'
import { IFacility } from '@/store/facility'

@Component({
  components: {
    SearchedFasility
  }
})
export default class Searched extends Vue {
  get facilityList(): IFacility[] {
    return this.$store.state.search.facilityList
  }

  async created() {
    this.$store.commit('search/CLEAR_QUERY')
    this.$store.commit('facility/RESET_FACILITY_INFO')
    this.$store.commit('search/RESET_FACILITY')
    const searchQuery = decodeURI(this.$route.query.facilityKeyWord as string)
    await this.$store.dispatch('search/CREATE_SEARCHED_FACILITY', searchQuery)
  }
}
</script>

<style lang="scss">
@media screen and(max-width: 770px) {
  .search-card {
    padding-left: 38px;
    padding-right: 38px;
  }
}
</style>
