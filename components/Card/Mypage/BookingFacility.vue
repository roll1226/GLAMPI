<template>
  <v-card outlined>
    <v-container>
      <v-row justify="center" no-gutters>
        <v-col cols="auto" class="mx-auto">
          <v-img height="220" width="300" :src="facilityImg"></v-img>
        </v-col>

        <v-col cols="12" sm="" md="" lg="" class="facility-content">
          <v-row no-gutters class="flex-column">
            <v-col>
              <v-card-text class="pa-0">
                <v-card-title class="pl-0 pt-0" @click="goFacility">
                  {{ fasilityName }}
                </v-card-title>
                <v-card-subtitle class="pl-0">
                  {{ address }}
                </v-card-subtitle>
              </v-card-text>
            </v-col>
          </v-row>

          <v-row no-gutters>
            <v-col>
              {{ introduction }}
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col> 以前予約したプラン:{{ planName }} </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col> 合計金額:{{ planPay }} </v-col>
          </v-row>

          <v-row no-gutters>
            <v-card-actions class="pa-0">
              <v-col class="pa-0">
                <v-btn class="status">
                  {{ status }}
                </v-btn>
              </v-col>
              <v-col class="pa-0">
                <v-btn>
                  {{ cancel }}
                </v-btn>
              </v-col>
            </v-card-actions>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class BookingFasility extends Vue {
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
  url!: string

  @Prop({ required: true, default: '' })
  status!: string

  goFacility() {
    this.$router.push(`/facility/${this.url}/introduction`)
  }
}
</script>

<style lang="scss">
.v-card {
  .container {
    //各カード内余白
    padding: 40px 25px;
  }
}
@media screen and (max-width: 770px) {
  .v-card {
    .container {
      //各カード内余白
      padding: 30px 20px;
    }
  }
}
</style>
