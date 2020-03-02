<template>
  <v-row no-gutters class="bList-wrap">
    <v-col
      v-for="(facility, facilityIndex) in facilityList"
      :key="facilityIndex"
      lg="12"
      md="12"
      sm="12"
      xs="12"
    >
      <BookingFacility
        :fasility-name="facility.facilityName"
        :address="facility.address"
        :plan-name="facility.planName"
        :plan-pay="facility.planPay"
        :introduction="facility.introduction"
        :introduction-url="facility.introduction"
        :facility-img="facility.facilityImg"
      />
    </v-col>
  </v-row>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import BookingFacility from '@/components/Card/Mypage/BookingFacility.vue'

interface IFacility {
  facilityName: string
  facilityImg: string
  address: string
  planName: string
  planPay: number
  introduction: string
}

@Component({
  components: {
    BookingFacility
  }
})
export default class BookingList extends Vue {
  facilityList: IFacility[] = [
    {
      facilityName: '施設名1',
      facilityImg: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
      address: '日本のどこか',
      planName: 'プラン名',
      planPay: 1200,
      introduction: '紹介文'
    },
    {
      facilityName: '施設名2',
      facilityImg: 'https://cdn.vuetifyjs.com/images/cards/road.jpg',
      address: '日本のどこか',
      planName: 'プラン名',
      planPay: 1200,
      introduction: '紹介文'
    }
  ]
}
</script>
