<template>
  <v-card>
    <v-img
      :src="src"
      class="white--text align-end"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      height="200px"
    >
      <v-card-title v-text="planTitle"></v-card-title>
    </v-img>

    <v-card-subtitle class="pb-0">
      {{ pay.toLocaleString() }}円
    </v-card-subtitle>

    <v-card-text class="text--primary">
      <div v-for="(detail, index) in details" :key="index">
        {{ detail }}
      </div>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>

      <!-- 予約ページに遷移する -->
      <v-btn :to="`/facility/${$route.params.id}/reservation/${url}`">
        <v-icon class="mr-2">
          fas fa-campground
        </v-icon>
        予約
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class PlanCard extends Vue {
  @Prop({ required: true, default: '' })
  src!: string

  @Prop({ required: true, default: 0 })
  pay!: number

  @Prop({ required: true, default: '' })
  planTitle!: string

  @Prop({ required: true, default: '' })
  url!: string

  @Prop({ required: true, default: [] })
  details!: [...string[]]
}
</script>
