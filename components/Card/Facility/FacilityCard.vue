<template>
  <v-card class="mx-auto" max-width="300" elevation="4">
    <v-img class="white--text align-end" height="200px" :src="facilityImage">
      <v-card-title>
        {{ facilityName }}
      </v-card-title>
    </v-img>

    <v-card-subtitle class="pb-0">
      施設紹介文
    </v-card-subtitle>

    <v-card-text
      class="text--primary"
      style="word-wrap: break-word; white-space: pre-wrap;"
      v-text="introduction"
    ></v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>

      <!-- 詳細飛ぶ -->
      <v-btn
        outlined
        class="facility-btn"
        @click="$router.push(`/facility/${url}/introduction`)"
      >
        詳細
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class FacilityCard extends Vue {
  @Prop({ required: true, default: '' })
  facilityImage!: string

  @Prop({ required: true, default: '' })
  facilityName!: string

  @Prop({ required: true, default: '' })
  introduction!: string

  @Prop({ required: true, default: '' })
  url!: string
}
</script>

<style lang="scss">
.facility-btn {
  &.theme--light.v-btn {
    color: $site_color_2;
    caret-color: $site_color_2;
  }
}
</style>
