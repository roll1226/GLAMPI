<template>
  <v-row>
    <v-col
      v-for="(glammity, index) in glammitys"
      :key="index"
      lg="6"
      md="6"
      sm="6"
      xs="12"
    >
      <v-card>
        <div class="d-flex justify-start">
          <v-avatar class="ma-3" size="125" tile>
            <v-img :src="glammity.userImg"></v-img>
          </v-avatar>
          <div>
            <v-card-text>
              <p>施設名: {{ glammity.facilityName }}</p>

              <div>主催者: {{ glammity.organizer }}</div>
              <div>
                募集期間: {{ glammity.applicationPeriod[0] }}~{{
                  glammity.applicationPeriod[1]
                }}
              </div>
            </v-card-text>
          </div>
        </div>

        <v-card-actions class="pt-0">
          <v-row>
            <v-col cols="6" class="py-0">
              <v-btn
                block
                text
                :to="`/facility/${glammity.facilityUrl}/introduction`"
              >
                施設紹介

                <v-icon class="ml-2">
                  fas fa-angle-right
                </v-icon>
              </v-btn>
            </v-col>
            <v-col cols="6" class="py-0">
              <v-btn
                block
                text
                :to="`${glammity.glammityId}/glammityIntroduction`"
              >
                紹介ページ

                <v-icon class="ml-2">
                  fas fa-angle-right
                </v-icon>
              </v-btn>
            </v-col>
            <v-col cols="12" class="pb-1 pt-2">
              <v-btn block text>
                <v-icon class="mr-2">
                  fas fa-campground
                </v-icon>

                参加する
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { IGlammitys } from '@/store/glammitySearched'

@Component
export default class GlammitySearchedCard extends Vue {
  get glammitys(): IGlammitys {
    return this.$store.state.glammitySearched.glammitys
  }
}
</script>
