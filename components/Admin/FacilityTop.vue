<template>
  <div>
    <v-row no-gutters class="mb-10 row1">
      <v-card tile elevation="0" color="grey lighten-4">
        <v-card-text class="black--text">
          <v-row class="ma-0" justify="space-around">
            <v-col class="text-center pa-0">
              <p class="ma-0 title">
                予約申請中<br /><span>{{ reservation }}件</span>
              </p>
            </v-col>
            <v-col class="text-center pa-0">
              <p class="ma-0 title">
                キャンセル申請中<br /><span>{{ cancel }}件</span>
              </p>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-row>
    <v-row class="pa-0 ma-0">
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
p span {
  display: inline-block;
  padding-top: 10px;
  font-size: 1.7em;
}
</style>
