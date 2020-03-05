<template>
  <v-card class="mx-auto" outlined>
    <v-container>
      <v-row justify="space-between" no-gutters>
        <v-col cols="auto">
          <v-img height="220" max-width="300" :src="facilityImg"> </v-img>
        </v-col>
      </v-row>

      <v-row no-gutters>
        <v-col>
          <v-card-text class="pa-0">
            <v-card-title class="pl-0 pt-sm-0">
              {{ facilityName }}
            </v-card-title>
          </v-card-text>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col>
          {{ introduction }}
        </v-col>
      </v-row>

      <v-row no-gutters>
        <v-card-actions class="pa-0">
          <v-col class="pa-0">
            <v-btn outlined @click="goFacility">
              詳細ページへ
            </v-btn>
          </v-col>
          <v-col class="pa-0">
            <v-btn outlined @click="like = !like">
              お気に入り解除
            </v-btn>
          </v-col>
        </v-card-actions>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class BookingFasility extends Vue {
  @Prop({ required: true, default: '' })
  facilityName!: string

  @Prop({ required: true, default: '' })
  facilityImg!: string

  @Prop({ required: true, default: '' })
  introduction!: string

  @Prop({ required: true, default: '' })
  url!: string

  goFacility() {
    this.$router.push(`/facility/${this.url}/introduction`)
  }
}
</script>
