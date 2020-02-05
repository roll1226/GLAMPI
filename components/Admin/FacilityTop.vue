<template>
  <div>
    <!--sample-->
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
export default class FacilityTop extends Vue {
  public reservation: number = 5
  public cancel: number = 4
  data() {
    return {
      headers: [
        {
          text: 'お客様名',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: '部屋番号', value: 'rooms' }
      ],
      guests: [
        {
          name: 'Guest1',
          rooms: 1
        },
        {
          name: 'Guest2',
          rooms: 2
        },
        {
          name: 'Guest3',
          rooms: 3
        }
      ]
    }
  }
}
</script>
<style lang="scss">
.cols {
  text-align: center;
}
</style>
