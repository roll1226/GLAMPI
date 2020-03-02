<template>
  <v-card>
    <v-card-text>
      予約管理
    </v-card-text>

    <v-row>
      <GlammityInfoCard :title="glammityName.title" :info="glammityName.info" />

      <GlammityInfoCard :title="facilityName.title" :info="facilityName.info" />

      <GlammityInfoCard :title="plan.title" :info="plan.info" />

      <GlammityInfoCard
        :title="estimatedAmount.title"
        :info="estimatedAmount.info"
      />

      <GlammityInfoCard :title="checkIn.title" :info="checkIn.info" />

      <GlammityInfoCard :title="checkOut.title" :info="checkOut.info" />
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import GlammityInfoCard from '@/components/Card/Glammity/Group/GlammityInfoCard.vue'
import { IGlammityInfoList } from '@/store/glammityInfo'

@Component({
  components: {
    GlammityInfoCard
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
