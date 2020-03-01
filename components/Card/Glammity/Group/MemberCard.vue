<template>
  <v-card>
    <v-card-text>
      メンバー
    </v-card-text>

    <MemberListCard />

    <v-row>
      <GlammityInfoCard
        :title="numberOfParticipants.title"
        :info="numberOfParticipants.info"
      />

      <GlammityInfoCard
        :title="numberOfApplicants.title"
        :info="numberOfApplicants.info"
      />
    </v-row>
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
export default class MemberCard extends Vue {
  created() {
    this.$store.commit('glammityInfo/CLEAR_INFO')
    const url = this.$route.params.Glammity
    this.$store.dispatch('glammityInfo/getGlammityInfo', url)
  }

  get numberOfApplicants(): IGlammityInfoList {
    return this.$store.state.glammityInfo.numberOfApplicants
  }

  get numberOfParticipants(): IGlammityInfoList {
    return this.$store.state.glammityInfo.numberOfParticipants
  }
}
</script>
