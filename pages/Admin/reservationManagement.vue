<template>
  <div>
    <v-row justify="center">
      <v-col cols="auto" class="mt-12">
        <v-tabs
          active-class="font-weight-bold grey lighten-3"
          hide-slider="true"
          optional="true"
          vertical="true"
        >
          <!--optional:アクティブなアイテムなし
          初期状態では選択なし-->
          <v-tab class="black--text title">予約一覧</v-tab>
          <v-tab class="black--text title">収益</v-tab>
          <v-tab class="black--text title">情報登録</v-tab>
          <v-tab class="black--text title">お問い合わせ</v-tab>
        </v-tabs>
      </v-col>
      <v-col cols="7" class="mt-12">
        <!-- title -->
        <v-row class="pl-4 title">
          予約一覧
        </v-row>
        <!-- table -->
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-data-table
                hide-default-footer
                :headers="headers"
                :items="list"
              ></v-data-table>
            </v-card>
          </v-col>
        </v-row>
        <v-row class="mt-2">
          <v-pagination v-model="page" :length="6"></v-pagination>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  data() {
    return {
      search: '',
      page: 1,
      headers: [
        { text: 'ID', value: 'id' },
        { text: '人数', value: 'peopleNumber' },
        { text: 'プラン', value: 'plan' },
        { text: 'オプション', value: 'option' },
        { text: '状態', value: 'status' }
      ],
      list: [
        {
          id: '1',
          peopleNumber: '6',
          plan: 'プランA',
          option: 'BBQ',
          status: '宿泊後'
        },
        {
          id: '2',
          peopleNumber: '5',
          plan: 'プランB',
          option: 'BBQ',
          status: '宿泊後'
        },
        {
          id: '3',
          peopleNumber: '3',
          plan: 'プランA',
          option: 'BBQ',
          status: 'キャンセル待ち'
        },
        {
          id: '4',
          peopleNumber: '7',
          plan: 'プランB',
          option: 'なし',
          status: '予約申請中'
        },
        {
          id: '5',
          peopleNumber: '7',
          plan: 'プランB',
          option: 'なし',
          status: '予約申請中'
        },
        {
          id: '6',
          peopleNumber: '7',
          plan: 'プランB',
          option: 'なし',
          status: '予約申請中'
        },
        {
          id: '7',
          peopleNumber: '7',
          plan: 'プランB',
          option: 'なし',
          status: '予約申請中'
        },
        {
          id: '8',
          peopleNumber: '7',
          plan: 'プランB',
          option: 'なし',
          status: '予約申請中'
        },
        {
          id: '9',
          peopleNumber: '7',
          plan: 'プランB',
          option: 'なし',
          status: '予約申請中'
        },
        {
          id: '10',
          peopleNumber: '2',
          plan: 'プランA',
          option: 'BBQ',
          status: '宿泊前'
        }
      ]
    }
  }
})
export default class FacilityIndex extends Vue {}
</script>
