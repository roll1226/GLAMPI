<template>
  <v-card outlined>
    <v-container>
      <v-row justify="center" no-gutters>
        <v-col cols="auto" class="mx-auto">
          <v-img height="220" max-width="300" :src="glammityImg"></v-img>
        </v-col>

        <v-col class="ml-3" cols="12" sm="" md="" lg="">
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

          <v-row class="mt-12" no-gutters>
            <v-col>
              <v-btn v-if="status" outlined class="pa-0">
                参加中
              </v-btn>
              <v-btn v-else outlined class="pa-0">
                宿泊済み
              </v-btn></v-col
            ></v-row
          >
          <v-row class="mt-6" no-gutters>
            <v-card-actions class="pa-0">
              <v-col class="pa-0">
                <v-btn outlined @click="goGlammity">
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
  @Prop({ required: true, default: '' })
  glammityName!: string

  @Prop({ required: true, default: '' })
  glammityImg!: string

  @Prop({ required: true, default: '' })
  introduction!: string

  @Prop({ required: true, default: '' })
  url!: string

  @Prop({ required: true, default: '' })
  status!: boolean

  goGlammity() {
    this.$router.push(`/glammity/Group/${this.url}/glammityGroup`)
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
