<template>
  <div>
    <h1>
      Glammityグループ
    </h1>

    <v-row>
      <v-col cols="2">
        <GlammityTabsCard />
      </v-col>

      <v-col cols="10">
        <ChatCard v-if="tabNumber === 0" />

        <MemberCard v-else-if="tabNumber === 1" />

        <ReservationManagementCard v-else-if="tabNumber === 2" />

        <ApplicationConditionsChangeCard v-else-if="tabNumber === 3" />

        <DetailsCard v-else-if="tabNumber === 4" />

        <PaymentCard v-else-if="tabNumber === 5" />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import ChatCard from '@/components/Card/Glammity/Group/ChatCard.vue'
import MemberCard from '@/components/Card/Glammity/Group/MemberCard.vue'
import ReservationManagementCard from '@/components/Card/Glammity/Group/ReservationManagementCard.vue'
import ApplicationConditionsChangeCard from '@/components/Card/Glammity/Group/ApplicationConditionsChangeCard.vue'
import DetailsCard from '@/components/Card/Glammity/Group/DetailsCard.vue'
import PaymentCard from '@/components/Card/Glammity/Group/PaymentCard.vue'
import GlammityTabsCard from '@/components/Card/Glammity/Group/GlammityTabsCard.vue'

@Component({
  components: {
    GlammityTabsCard,
    ChatCard,
    MemberCard,
    ReservationManagementCard,
    ApplicationConditionsChangeCard,
    DetailsCard,
    PaymentCard
  },
  middleware: 'glammityAuth'
})
export default class glammityChat extends Vue {
  get tabNumber(): number {
    return this.$store.state.glammityGroup.tabNumber
  }
}
</script>
