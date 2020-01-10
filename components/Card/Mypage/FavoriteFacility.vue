<template>
  <v-card class="mx-auto" outlined>
    <v-container>
      <v-row justify="space-between">
        <v-col cols="auto">
          <v-img height="200" max-width="340" :src="facilityImg"> </v-img>
        </v-col>

        <v-col class="pb-0">
          <v-list-item-content>
            <v-list-item-title class="headline mb-1">
              {{ facilityName }}
              <v-btn icon @click="like = !like">
                <v-icon v-if="!like">mdi-heart</v-icon>
                <v-icon v-else color="pink lighten-1">mdi-heart</v-icon>
              </v-btn>
            </v-list-item-title>
          </v-list-item-content>

          <v-card-text class="text--primary">
            <div>
              {{ introduction }}
            </div>
          </v-card-text>
          <v-spacer></v-spacer>
          <v-card-actions class="pb-0">
            <v-col>
              <!-- 詳細飛ぶ -->
              <v-btn outlined :to="introductionUrl">
                詳細
              </v-btn>
            </v-col>

            <v-spacer></v-spacer>
            <v-col>
              <!-- お気に入り解除 -->
              <!-- ハートアイコンクリックでも解除できるから重複ではあるけど一応 -->
              <v-btn outlined @click="like = !like">
                お気に入り解除
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
  // ハート
  like: boolean = true

  @Prop({ required: true, default: '' })
  facilityName!: string

  @Prop({ required: true, default: '' })
  facilityImg!: string

  @Prop({ required: true, default: '' })
  introductionUrl!: string

  @Prop({ required: true, default: '' })
  introduction!: string
}
</script>
