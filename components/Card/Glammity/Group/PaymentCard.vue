<template>
  <v-card class="py-8 px-3 px-sm-8">
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
