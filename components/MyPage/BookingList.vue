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
        :url="facility.url"
        :facility-img="facility.facilityImg"
        :status="facility.status"
      />
    </v-col>
  </v-row>
  <!--    <v-row>
      <v-pagination
        v-model="page"
        :length="length"
        @input="pageChange"
      ></v-pagination>
    </v-row>
    -->
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import BookingFacility from '@/components/Card/Mypage/BookingFacility.vue'
import { IFacility } from '@/store/facility'

@Component({
  components: {
    BookingFacility
  }
})
export default class BookingList extends Vue {
  get facilityList(): IFacility[] {
    return this.$store.state.mypage.reservation
  }
}
</script>
