<template>
  <v-card class="mx-auto" outlined>
    <v-container>
      <v-row justify="space-between">
        <v-col cols="auto">
          <v-img height="200" max-width="340" :src="facilityImg"></v-img>
        </v-col>

        <v-col class="pb-0">
          <v-list-item-content>
            <v-list-item-title class="headline mb-1">
              {{ fasilityName }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ address }}
            </v-list-item-subtitle>
          </v-list-item-content>

          <v-card outlined>
            <v-card-text class="body-2">
              最安値のプラン
              <span class="font-weight-bold">
                {{ planName }}
              </span>
              : {{ planPay.toLocaleString() }}円〜
            </v-card-text>
          </v-card>

          <v-card-actions class="pb-0">
            <v-row>
              <v-col cols="5">
                <v-btn block :to="`/facility/${introductionUrl}/introduction`">
                  詳細
                </v-btn>
              </v-col>

              <v-col cols="5">
                <v-btn block :to="glammityUrl">
                  GLAMMITY
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>

          <v-divider class="mt-4 mx-4"></v-divider>

          <v-card-text class="pb-3">
            <v-chip class="mx-1 mt-1">
              <v-icon left>mdi-brightness-5</v-icon>
              Turn on Lights
            </v-chip>
            <v-chip class="mx-1 mt-1">
              <v-icon left>mdi-alarm-check</v-icon>
              Set alarm
            </v-chip>
            <v-chip class="mx-1 mt-1">
              <v-icon left>mdi-blinds</v-icon>
              Close blinds
            </v-chip>
          </v-card-text>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class SearchedFasility extends Vue {
  @Prop({ required: true, default: '' })
  fasilityName!: string

  @Prop({ required: true, default: '' })
  facilityImg!: string

  @Prop({ required: true, default: '' })
  address!: string

  @Prop({ required: true, default: '' })
  planName!: string

  @Prop({ required: true, default: 0 })
  planPay!: number

  @Prop({ required: true, default: '' })
  introductionUrl!: string

  @Prop({ required: true, default: '' })
  glammityUrl!: string
}
</script>
