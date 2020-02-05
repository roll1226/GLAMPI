<template>
  <div>
    <v-row>
      <v-card width="800px" class="grey lighten-2">
        <v-card-text class="black--text">
          <v-row>
            <v-col class="cols" cols="6">予約申請中</v-col>
            <v-col class="cols" cols="6">キャンセル申請中</v-col>
          </v-row>
          <v-row>
            <v-col class="cols" cols="6">{{ reservation }}件</v-col>
            <v-col class="cols" cols="6">{{ cancel }}件</v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-row>
    <v-row>
      <v-card class="black--text">
        <v-card-title>本日のお客様</v-card-title>
        <v-data-table :headers="headers" :items="guests"> </v-data-table>
      </v-card>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class FacilityTop extends Vue {}
</script>
<style lang="scss">
.cols {
  text-align: center;
}
</style>
