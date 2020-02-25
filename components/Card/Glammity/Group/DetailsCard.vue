<template>
  <v-card>
    <v-card-text>
      詳細
    </v-card-text>

    <v-row>
      <GlammityInfoCard :title="glammityName.title" :info="glammityName.info" />

      <GlammityInfoCard :title="facilityName.title" :info="facilityName.info" />

      <GlammityInfoCard :title="plan.title" :info="plan.info" />

      <GlammityInfoCard
        :title="numberOfApplicants.title"
        :info="numberOfApplicants.info"
      />

      <GlammityInfoCard
        :title="numberOfParticipants.title"
        :info="numberOfParticipants.info"
      />

      <GlammityInfoCard
        :title="estimatedAmount.title"
        :info="estimatedAmount.info"
      />
    </v-row>
    <MemberListCard />
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import MemberListCard from '@/components/Card/Glammity/Group/MemberListCard.vue'
import GlammityInfoCard from '@/components/Card/Glammity/Group/GlammityInfoCard.vue'
import { IGlammityInfoList } from '@/store/glammityInfo'

@Component({
  components: {
    MemberListCard,
    GlammityInfoCard
  }
})
export default class DetailsCard extends Vue {
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
}
</script>
