<template>
  <v-card elevation="0" tile>
    <v-list-item three-line>
      <v-list-item-content>
        <div class="body-2 mb-1">
          プラン
        </div>
        <v-list-item-title class="headline mb-1">
          {{ planTitle }}
        </v-list-item-title>
      </v-list-item-content>
      <v-spacer></v-spacer>
      <v-list-item-content>
        <div class="body-2 mb-1">
          値段
        </div>
        <v-list-item-title class="headline mb-1">
          {{ planPay.toLocaleString() }}円
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class plan extends Vue {
  get planPay(): number {
    return this.$store.state.reservation.planPay
  }

  get planTitle(): string {
    return this.$store.state.reservation.planTitle
  }
}
</script>
