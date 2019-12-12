<template>
  <div>
    <v-card>
      <v-card-title>予約履歴</v-card-title>
      <v-card width="850" height="250">
        <v-container class="ma-3">
          <v-row>
            <v-col cols="4">
              <v-img
                width="280"
                height="200"
                :src="require('@/assets/rain.jpg')"
              ></v-img>
            </v-col>
            <v-col cols="8">
              <div>
                <v-card-title class="pt-0">{{ facility }}</v-card-title>
                <v-card-text>
                  <p>{{ plan }}</p>
                  <p>{{ option }}</p>
                  <p>{{ cost }}</p>
                  <p>{{ checkIn }} - {{ checkOut }}</p>
                </v-card-text>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-card>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class BookingList extends Vue {
  public facility: string = '施設名'
  public plan: string = 'プラン名'
  public option: string = 'オプション名' // ない場合もある
  public cost: string = '金額' // 実際はnumber?
  // 日付は色々不明
  public checkIn: string = 'チェックイン'
  public checkOut: string = 'チェックアウト'
}
</script>
