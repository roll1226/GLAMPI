<template>
  <div>
    <h1>施設情報管理</h1>
    <v-row class="pa-0 ma-0 mb-10 row1">
      <v-card tile elevation="0" color="grey lighten-4">
        <v-card-text class="black--text">
          <v-row class="mb-6" no-gutters>
            <v-col cols="12" sm="4">
              <p class="ma-0 title">
                更新日:2019/7/23(火)
              </p>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="12" sm="4" class="text-right">
              <v-btn text large>プレビュー</v-btn>
            </v-col>
            <v-col cols="12" sm="1" class="text-right">
              <v-btn text large>Edit</v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card> </v-row
    ><v-col cols="12" sm="3"> </v-col>
    <v-col class="text-center pa-0 d-flex">
      <v-col class="pa-0">
        <v-btn text>
          <v-icon>mdi-chevron-triple-left</v-icon>
        </v-btn>
      </v-col>
      <p class="ma-3 title">2019年7月</p>
      <v-col class="pa-0">
        <v-btn text>
          <v-icon>mdi-chevron-triple-right</v-icon>
        </v-btn>
      </v-col>
    </v-col>
    <v-row class="pa-0 ma-0 mb-10 row1">
      <v-card tile elevation="0" color="grey lighten-4">
        <v-card-text class="black--text">
          <v-row class="ma-0" justify="space-around">
            <v-col class="text-center pa-0">
              <p class="ma-0 title">
                1日あたりの宿泊組数設定
              </p>
            </v-col>
            <v-col class="pa-0" sm="2">
              <v-overflow-btn
                v-model="peopleNumber"
                :items="dropdown"
              ></v-overflow-btn>
            </v-col>
            <v-col>
              <v-btn>保存</v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class reservationInfo extends Vue {
  dropdown: [...string[]] = []
  created() {
    for (let index1 = 0; index1 < 99; index1++) {
      const people = 0
      this.dropdown.push(String(people + index1))
    }
  }
}
</script>
