<template>
  <v-card>
    <v-card-text>
      詳細
    </v-card-text>

    <v-row>
      <GlammityInfoCard v-for="(glammityInfo, index) in 6" :key="index" />
    </v-row>
    <MemberListCard />
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import MemberListCard from '@/components/Card/Glammity/Group/MemberListCard.vue'
import GlammityInfoCard from '@/components/Card/Glammity/Group/GlammityInfoCard.vue'

@Component({
  components: {
    MemberListCard,
    GlammityInfoCard
  }
})
export default class DetailsCard extends Vue {}
</script>
