<template>
  <div>
    <Stripe />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Stripe from '~/components/Btn/Stripe.vue'

@Component({
  components: {
    Stripe
  }
})
export default class reservation extends Vue {}
</script>
