<template>
  <div class="glammity-group mt-10">
    <h1>
      Glammityグループ
    </h1>

    <v-row no-gutters>
      <v-col cols="auto">
        <GlammityTabsCard />
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col>
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
  }
  // middleware: 'glammityAuth'
})
export default class glammityChat extends Vue {
  get tabNumber(): number {
    return this.$store.state.glammityGroup.tabNumber
  }
}
</script>
<style lang="scss">
.glammity-group {
  width: 80%;
  margin: 0 auto;
}
@media screen and (max-width: 770px) {
  .glammity-group {
    width: 100%;
    padding: 0 10px;
  }
}
</style>
