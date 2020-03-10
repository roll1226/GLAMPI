<template>
  <div class="top-page-introduction-wrap">
    <v-row no-gutters>
      <v-col>
        <h3 class="top-page-titles">
          新着一覧
        </h3>
      </v-col>
    </v-row>
    <v-row class="top-page-cards">
      <v-col
        v-for="(newFacility, newFacilityCard) in facilities"
        :key="newFacilityCard"
        lg="3"
        md="3"
        sm="3"
        xs="6"
      >
        <FacilityCard
          :facility-image="newFacility.src"
          :facility-name="newFacility.title"
          :introduction="newFacility.text"
          :url="newFacility.url"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import FacilityCard from '@/components/Card/Facility/FacilityCard.vue'
import { IFacility } from '@/store'

@Component({
  components: {
    FacilityCard
  }
})
export default class NewArrivalIndexCard extends Vue {
  get facilities(): IFacility[] {
    return this.$store.state.getNewFacilityList
  }
}
</script>
