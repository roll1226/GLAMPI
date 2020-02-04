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
                :headers="headers"
                :items="list"
                :page.sync="page"
                hide-default-footer
                class="elevation-1"
                @page-count="pageCount = $event"
              ></v-data-table>
            </v-card>
          </v-col>
        </v-row>
        <v-row class="text-center pt-2">
          <v-pagination
            v-model="page"
            :length="pageCount"
            :value="itemsPerPage"
            @input="itemsPerPage = parseInt($event, 10)"
          ></v-pagination>
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
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
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
          peopleNumber: '8',
          plan: 'プランC',
          option: 'BBQ',
          status: '宿泊後'
        },
        {
          id: '2',
          peopleNumber: '7',
          plan: 'プランB',
          option: 'BBQ',
          status: '宿泊後'
        },
        {
          id: '3',
          peopleNumber: '6',
          plan: 'プランA',
          option: 'BBQ',
          status: 'キャンセル待ち'
        },
        {
          id: '4',
          peopleNumber: '5',
          plan: 'プランC',
          option: 'なし',
          status: '予約申請中'
        },
        {
          id: '5',
          peopleNumber: '4',
          plan: 'プランB',
          option: 'なし',
          status: '予約申請中'
        },
        {
          id: '6',
          peopleNumber: '3',
          plan: 'プランA',
          option: 'なし',
          status: '予約申請中'
        },
        {
          id: '7',
          peopleNumber: '2',
          plan: 'プランC',
          option: 'なし',
          status: 'キャンセル待ち'
        },
        {
          id: '8',
          peopleNumber: '1',
          plan: 'プランB',
          option: 'なし',
          status: '予約申請中'
        },
        {
          id: '9',
          peopleNumber: '8',
          plan: 'プランA',
          option: 'なし',
          status: '予約申請中'
        },
        {
          id: '10',
          peopleNumber: '7',
          plan: 'プランC',
          option: 'なし',
          status: '予約申請中'
        },
        {
          id: '11',
          peopleNumber: '6',
          plan: 'プランB',
          option: 'なし',
          status: '予約申請中'
        },
        {
          id: '12',
          peopleNumber: '5',
          plan: 'プランA',
          option: 'なし',
          status: '予約申請中'
        },
        {
          id: '13',
          peopleNumber: '4',
          plan: 'プランC',
          option: 'なし',
          status: 'キャンセル待ち'
        },
        {
          id: '14',
          peopleNumber: '3',
          plan: 'プランB',
          option: 'なし',
          status: '予約申請中'
        },
        {
          id: '15',
          peopleNumber: '2',
          plan: 'プランA',
          option: 'なし',
          status: '予約申請中'
        },
        {
          id: '16',
          peopleNumber: '1',
          plan: 'プランC',
          option: 'なし',
          status: '予約申請中'
        },
        {
          id: '17',
          peopleNumber: '8',
          plan: 'プランB',
          option: 'なし',
          status: 'キャンセル待ち'
        },
        {
          id: '18',
          peopleNumber: '7',
          plan: 'プランA',
          option: 'なし',
          status: '予約申請中'
        },
        {
          id: '19',
          peopleNumber: '6',
          plan: 'プランC',
          option: 'なし',
          status: '予約申請中'
        },
        {
          id: '20',
          peopleNumber: '5',
          plan: 'プランB',
          option: 'なし',
          status: 'キャンセル待ち'
        },
        {
          id: '21',
          peopleNumber: '4',
          plan: 'プランA',
          option: 'なし',
          status: '予約申請中'
        },
        {
          id: '22',
          peopleNumber: '3',
          plan: 'プランC',
          option: 'なし',
          status: 'キャンセル待ち'
        },
        {
          id: '23',
          peopleNumber: '2',
          plan: 'プランB',
          option: 'なし',
          status: '宿泊前'
        },
        {
          id: '24',
          peopleNumber: '1',
          plan: 'プランA',
          option: 'なし',
          status: '宿泊前'
        },
        {
          id: '25',
          peopleNumber: '8',
          plan: 'プランC',
          option: 'なし',
          status: '宿泊前'
        },
        {
          id: '26',
          peopleNumber: '7',
          plan: 'プランB',
          option: 'なし',
          status: '宿泊前'
        },
        {
          id: '27',
          peopleNumber: '6',
          plan: 'プランA',
          option: 'なし',
          status: '宿泊前'
        },
        {
          id: '28',
          peopleNumber: '5',
          plan: 'プランC',
          option: 'なし',
          status: '宿泊前'
        },
        {
          id: '29',
          peopleNumber: '4',
          plan: 'プランB',
          option: 'なし',
          status: '宿泊前'
        },
        {
          id: '30',
          peopleNumber: '3',
          plan: 'プランA',
          option: 'なし',
          status: '宿泊前'
        }
      ]
    }
  }
})
export default class FacilityIndex extends Vue {}
</script>
