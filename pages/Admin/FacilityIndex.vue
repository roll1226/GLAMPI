<template>
  <div>
    <v-row>
      <v-col width="max-content">
        <v-tabs optional="true" vertical="true">
          <!--optional:アクティブなアイテムなし
          初期状態では選択なし-->
          <v-tab>予約一覧</v-tab>
          <v-tab>収益</v-tab>
          <v-tab>情報登録</v-tab>
          <v-tab>お問い合わせ</v-tab>
        </v-tabs>
      </v-col>
      <v-col>
        <v-row>
          <v-card>
            <v-row align="center" justify="space-around">
              <v-col cols="6">予約申請中</v-col>
              <v-col cols="6">キャンセル申請中</v-col>
            </v-row>
            <v-row align="center" justify="space-around">
              <v-col cols="4">{{ reservation }}件</v-col>
              <v-col cols="4">{{ cancel }}件</v-col>
            </v-row>
          </v-card>
        </v-row>
        <v-row>
          <v-card>
            <v-card-title>本日のお客様</v-card-title>
            <v-data-table :headers="headers" :items="guests"> </v-data-table>
          </v-card>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class FacilityIndex extends Vue {
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
