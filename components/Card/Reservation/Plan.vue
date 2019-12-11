<template>
  <v-card>
    <v-list-item three-line>
      <v-list-item-content>
        <div class="body-2 mb-1">
          プラン
        </div>
        <v-list-item-title class="headline mb-1">
          プランA
        </v-list-item-title>
      </v-list-item-content>
      <v-spacer></v-spacer>
      <v-list-item-content>
        <div class="body-2 mb-1">
          値段
        </div>
        <v-list-item-title class="headline mb-1">
          {{ payNumber.toLocaleString() }}円
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class plan extends Vue {
  @Prop({ required: true, default: 0 })
  payNumber!: number
}
</script>
