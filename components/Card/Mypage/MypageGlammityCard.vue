<template>
  <div>
    <v-card class="mx-auto" outlined>
      <v-container>
        <v-row justify="space-between">
          <v-col cols="auto">
            <v-img height="200" max-width="340" :src="glammityImage"></v-img>
          </v-col>

          <v-col class="pb-0">
            <v-list-item-content>
              <v-list-item-title class="headline mb-1">
                {{ glammityName }}
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
                <v-btn outlined class="glammity-btn" :to="glammityUrl">
                  詳細
                </v-btn>
              </v-col>

              <v-spacer></v-spacer>
              <v-col>
                <!-- 参加中/宿泊済み -->
                <v-btn disabled>
                  {{ status }}
                </v-btn>
              </v-col>
              <v-spacer></v-spacer>
              <v-col>
                <!-- チャットルーム -->
                <v-btn outlined class="glammity-btn">
                  チャットルーム
                </v-btn>
              </v-col>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class MypageGlammityCard extends Vue {
  status: string = '参加中'

  @Prop({ required: true, default: '' })
  glammityImage!: string

  @Prop({ required: true, default: '' })
  glammityName!: string

  @Prop({ required: true, default: '' })
  introduction!: string

  @Prop({ required: true, default: '' })
  glammityUrl!: string
}
</script>

<style lang="scss">
.glammity-btn {
  &.theme--light.v-btn {
    color: $site_color_2;
    caret-color: $site_color_2;
  }
}
</style>
