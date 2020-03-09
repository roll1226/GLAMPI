<template>
  <v-card class="py-8 px-3 px-sm-8">
    <v-row no-gutters>
      <GlammityInfoCard :title="glammityName.title" :info="glammityName.info" />
    </v-row>

    <v-row no-gutters class="flex-column flex-sm-row">
      <GlammityInfoCard :title="facilityName.title" :info="facilityName.info" />
      <GlammityInfoCard :title="plan.title" :info="plan.info" />
    </v-row>

    <v-row no-gutters class="flex-column flex-sm-row">
      <GlammityInfoCard :title="facilityName.title" :info="facilityName.info" />
      <GlammityInfoCard :title="plan.title" :info="plan.info" />
    </v-row>

    <v-row no-gutters>
      <GlammityInfoCard
        :title="estimatedAmount.title"
        :info="estimatedAmount.info"
      />
    </v-row>

    <v-row no-gutters class="flex-column flex-sm-row">
      <GlammityInfoCard :title="checkIn.title" :info="checkIn.info" />
      <GlammityInfoCard :title="checkOut.title" :info="checkOut.info" />
    </v-row>

    <v-row no-gutters class="justify-end mt-10 mr-10">
      <HostReservationBtn />
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import GlammityInfoCard from '@/components/Card/Glammity/Group/GlammityInfoCard.vue'
import { IGlammityInfoList } from '@/store/glammityInfo'
import HostReservationBtn from '@/components//Btn/Glammity/Group/HostReservationBtn.vue'

@Component({
  components: {
    GlammityInfoCard,
    HostReservationBtn
  }
})
export default class ReservationManagementCard extends Vue {
  created() {
    this.$store.commit('glammityInfo/CLEAR_INFO')
    const url = this.$route.params.Glammity
    this.$store.dispatch('glammityInfo/getGlammityInfo', url)
  }

  get glammityName(): IGlammityInfoList {
    return this.$store.state.glammityInfo.glammityName
  }

  get facilityName(): IGlammityInfoList {
    return this.$store.state.glammityInfo.facilityName
  }

  get plan(): IGlammityInfoList {
    return this.$store.state.glammityInfo.plan
  }

  get numberOfApplicants(): IGlammityInfoList {
    return this.$store.state.glammityInfo.numberOfApplicants
  }

  get numberOfParticipants(): IGlammityInfoList {
    return this.$store.state.glammityInfo.numberOfParticipants
  }

  get estimatedAmount(): IGlammityInfoList {
    return this.$store.state.glammityInfo.estimatedAmount
  }

  get checkIn(): IGlammityInfoList {
    return this.$store.state.glammityInfo.checkIn
  }

  get checkOut(): IGlammityInfoList {
    return this.$store.state.glammityInfo.checkOut
  }
}
</script>
<style lang="scss">
.v-card {
  .row {
    margin: 0 0 20px 0;
  }
}
</style>
