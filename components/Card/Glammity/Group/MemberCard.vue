<template>
  <v-card>
    <v-card-text>
      メンバー
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
export default class MemberCard extends Vue {
  created() {
    this.$store.commit('glammityGroup/RESET_AVATAR')
    const url = this.$route.params.Glammity

    this.$store.dispatch('glammityGroup/getMember', url)
  }
}
</script>
