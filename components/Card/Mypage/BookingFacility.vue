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

          <v-card-text class="text--primary">
            <div>
              {{ introduction }}
              最安値のプラン
              <span class="font-weight-bold">
                {{ planName }}
              </span>
              {{ planPay }}
            </div>
          </v-card-text>
          <v-spacer></v-spacer>
          <v-card-actions class="pb-0">
            <v-col cols="5">
              <!--予約中の時と宿泊済みとでキャンセル/再予約を切替。それに伴ってクリック時の処理も分ける-->
              <v-btn block>
                {{ cancel }}
              </v-btn>
            </v-col>

            <v-spacer></v-spacer>
            <v-col>
              <!-- 参加する -->
              <v-btn disabled>
                {{ status }}
              </v-btn>
            </v-col>
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
