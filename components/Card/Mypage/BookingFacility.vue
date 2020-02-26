<template>
  <v-card outlined>
    <v-container>
      <v-row justify="space-between" no-gutters>
        <v-col cols="auto" class="image">
          <v-img height="200" max-width="340" :src="facilityImg"></v-img>
        </v-col>

        <v-col class="text">
          <v-row no-gutters>
            <v-col>
              <v-list-item-content class="pt-0 pb-5">
                <v-list-item-title class="headline">
                  {{ fasilityName }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ address }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-col>
          </v-row>

          <v-row no-gutters>
            <v-col>
              {{ introduction }}
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col>
              最安値のプラン
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col>
              {{ planName }}
            </v-col>
            <v-col>
              {{ planPay }}
            </v-col>
          </v-row>

          <v-card-actions class="pa-0">
            <v-row no-gutters>
              <v-col>
                <v-btn class="status">
                  {{ status }}
                </v-btn>
              </v-col>
              <v-col>
                <v-btn class="action-btn">
                  {{ cancel }}
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class BookingFasility extends Vue {
  status: string = '予約中'
  cancel: string = '予約キャンセル'

  @Prop({ required: true, default: '' })
  fasilityName!: string

  @Prop({ required: true, default: '' })
  facilityImg!: string

  @Prop({ required: true, default: '' })
  introduction!: string

  @Prop({ required: true, default: '' })
  address!: string

  @Prop({ required: true, default: '' })
  planName!: string

  @Prop({ required: true, default: 0 })
  planPay!: number

  @Prop({ required: true, default: '' })
  introductionUrl!: string
}
</script>

<style lang="scss">
.v-card {
  .container {
    padding: 40px 20px;
    .image {
    }
    .text {
      margin: 0 0 0 16px;
      //写真の右
      .v-listitem__content {
      }
      .v-btn {
        height: 46px;
        border-radius: 8px;
      }
      .status {
        width: 120px;
        background-color: $site_color_6;
      }
    }
  }
}
</style>
