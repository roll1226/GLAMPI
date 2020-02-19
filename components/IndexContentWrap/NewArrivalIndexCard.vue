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
        v-for="(newFacility, newFacilityCard) in facilityCard"
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
        />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import FacilityCard from '@/components/Card/Facility/FacilityCard.vue'

interface ICard {
  title: string
  text: string
  src: string
}

@Component({
  components: {
    FacilityCard
  }
})
export default class NewArrivalIndexCard extends Vue {
  facilityCard: ICard[] = [
    {
      title: '施設1',
      text: '凄い',
      src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg'
    },
    {
      title: '施設2',
      text: 'やばい',
      src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg'
    },
    {
      title: '施設3',
      text: '博俊',
      src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg'
    },
    {
      title: '施設4',
      text: '優人',
      src: 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'
    }
  ]
}
</script>
