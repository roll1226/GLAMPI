<template>
  <v-card outlined>
    <v-container>
      <v-row justify="center" no-gutters>
        <v-col cols="auto" class="mx-auto">
          <v-img height="220" max-width="300" :src="glammityImage"></v-img>
        </v-col>

        <v-col cols="12" sm="" md="" lg="">
          <v-row no-gutters>
            <v-card-title class="headline pl-0 pt-0">
              {{ glammityName }}
            </v-card-title>
          </v-row>

          <v-row no-gutters>
            <v-col>
              {{ introduction }}
            </v-col>
          </v-row>

          <v-row no-gutters>
            <v-col>
              <v-btn outlined class="pa-0">
                {{ status }}
              </v-btn></v-col
            ></v-row
          >
          <v-row no-gutters>
            <v-card-actions class="pa-0">
              <v-col class="pa-0">
                <v-btn outlined :to="glammityUrl">
                  詳細
                </v-btn>
              </v-col>
              <v-col class="pa-0">
                <v-btn outlined>
                  チャットルーム
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
// .glammity-btn {
//   &.theme--light.v-btn {
//     color: $site_color_2;
//     caret-color: $site_color_2;
//   }
// }
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
