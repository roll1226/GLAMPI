<template>
  <v-card>
    <v-card-text>
      詳細
    </v-card-text>

    <MemberListCard />
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import MemberListCard from '@/components/Card/Glammity/Group/MemberListCard.vue'

@Component({
  components: {
    MemberListCard
  }
})
export default class DetailsCard extends Vue {}
</script>
