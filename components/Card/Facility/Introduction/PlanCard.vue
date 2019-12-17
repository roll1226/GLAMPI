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

    <v-card-actions>
      <v-spacer></v-spacer>

      <!-- モーダルで詳細を表示 -->
      <v-btn>
        <v-icon class="mr-2">
          fas fa-info-circle
        </v-icon>
        詳細
      </v-btn>

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

  @Prop({ required: true, default: '' })
  planTitle!: string

  @Prop({ required: true, default: '' })
  url!: string

  @Prop({ required: true, default: '' })
  facilityId!: string

  @Prop({ required: true, default: [] })
  details!: [...string[]]
}
</script>
