<template>
  <v-card>
    <v-card-text>
      支払い
    </v-card-text>

    <GlammityStripeBtn />
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import GlammityStripeBtn from '@/components/Btn/Glammity/Group/GlammityStripeBtn.vue'

@Component({
  components: {
    GlammityStripeBtn
  }
})
export default class PaymentCard extends Vue {}
</script>
