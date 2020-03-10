<template>
  <v-row>
    <v-col
      v-for="(facility, facilityIndex) in facilityList"
      :key="facilityIndex"
      lg="6"
      md="6"
      sm="12"
      xs="12"
    >
      <FavoriteFacility
        :facility-name="facility.facilityName"
        :introduction="facility.introduction"
        :url="facility.url"
        :facility-img="facility.facilityImg"
      />
    </v-col>
  </v-row>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import FavoriteFacility from '@/components/Card/Mypage/FavoriteFacility.vue'
import { IFacilityLike } from '@/store/mypage'

@Component({
  components: {
    FavoriteFacility
  }
})
export default class Favorites extends Vue {
  get facilityList(): IFacilityLike[] {
    return this.$store.state.mypage.likes
  }
}
</script>
