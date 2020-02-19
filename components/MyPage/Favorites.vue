<template>
  <div>
    <v-card-title>お気に入り</v-card-title>
    <v-row class="ma-3">
      <v-col
        v-for="(facility, facilityIndex) in facilityList"
        :key="facilityIndex"
        lg="4"
        md="4"
        sm="4"
        xs="4"
      >
        <FavoriteFacility
          :facility-name="facility.facilityName"
          :introduction="facility.introduction"
          :introduction-url="facility.introduction"
          :facility-img="facility.facilityImg"
        />
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import FavoriteFacility from '@/components/Card/Mypage/FavoriteFacility.vue'

interface FFacility {
  facilityName: string
  facilityImg: string
  introduction: string
}

@Component({
  components: {
    FavoriteFacility
  }
})
export default class Favorites extends Vue {
  facilityList: FFacility[] = [
    {
      facilityName: '施設名1',
      facilityImg: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
      introduction: '紹介文'
    },
    {
      facilityName: '施設名2',
      facilityImg: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
      introduction: '紹介文'
    },
    {
      facilityName: '施設名3',
      facilityImg: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
      introduction: '紹介文'
    }
  ]
}
</script>
