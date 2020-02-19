<template>
  <div>
    <v-row>
      <v-data-table
        :headers="headers"
        :items="list"
        :page.sync="page"
        hide-default-footer
        @page-count="pageCount = $event"
      ></v-data-table>
    </v-row>
    <v-row class="text-center pt-2">
      <v-pagination
        v-model="page"
        :length="pageCount"
        :value="itemsPerPage"
        @input="itemsPerPage = parseInt($event, 10)"
      ></v-pagination>
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
        { text: '施設名', value: 'facility' },
        { text: 'オプション', value: 'option' },
        { text: '状態', value: 'status' }
      ],
      list: [
        {
          id: '1',
          peopleNumber: '8',
          plan: 'プランC',
          facility: '施設名C',
          option: 'BBQ',
          status: '宿泊後'
        },
        {
          id: '2',
          peopleNumber: '7',
          plan: 'プランB',
          facility: '施設名C',
          option: 'BBQ',
          status: '宿泊後'
        },
        {
          id: '3',
          peopleNumber: '6',
          plan: 'プランA',
          facility: '施設名C',
          option: 'BBQ',
          status: 'キャンセル待ち'
        },
        {
          id: '4',
          peopleNumber: '5',
          plan: 'プランC',
          facility: '施設名C',
          option: 'なし',
          status: '予約申請中'
        },
        {
          id: '5',
          peopleNumber: '4',
          plan: 'プランB',
          facility: '施設名C',
          option: 'なし',
          status: '予約申請中'
        },
        {
          id: '6',
          peopleNumber: '3',
          plan: 'プランA',
          facility: '施設名C',
          option: 'なし',
          status: '予約申請中'
        },
        {
          id: '7',
          peopleNumber: '2',
          plan: 'プランC',
          facility: '施設名C',
          option: 'なし',
          status: 'キャンセル待ち'
        },
        {
          id: '8',
          peopleNumber: '1',
          plan: 'プランB',
          facility: '施設名C',
          option: 'なし',
          status: '予約申請中'
        },
        {
          id: '9',
          peopleNumber: '8',
          plan: 'プランA',
          facility: '施設名C',
          option: 'なし',
          status: '予約申請中'
        },
        {
          id: '10',
          peopleNumber: '7',
          plan: 'プランC',
          facility: '施設名C',
          option: 'なし',
          status: '予約申請中'
        },
        {
          id: '11',
          peopleNumber: '6',
          plan: 'プランB',
          facility: '施設名C',
          option: 'なし',
          status: '予約申請中'
        },
        {
          id: '12',
          peopleNumber: '5',
          plan: 'プランA',
          facility: '施設名C',
          option: 'なし',
          status: '予約申請中'
        },
        {
          id: '13',
          peopleNumber: '4',
          plan: 'プランC',
          facility: '施設名C',
          option: 'なし',
          status: 'キャンセル待ち'
        },
        {
          id: '14',
          peopleNumber: '3',
          plan: 'プランB',
          facility: '施設名C',
          option: 'なし',
          status: '予約申請中'
        },
        {
          id: '15',
          peopleNumber: '2',
          plan: 'プランA',
          facility: '施設名C',
          option: 'なし',
          status: '予約申請中'
        },
        {
          id: '16',
          peopleNumber: '1',
          plan: 'プランC',
          facility: '施設名C',
          option: 'なし',
          status: '予約申請中'
        },
        {
          id: '17',
          peopleNumber: '8',
          plan: 'プランB',
          facility: '施設名C',
          option: 'なし',
          status: 'キャンセル待ち'
        },
        {
          id: '18',
          peopleNumber: '7',
          plan: 'プランA',
          facility: '施設名C',
          option: 'なし',
          status: '予約申請中'
        },
        {
          id: '19',
          peopleNumber: '6',
          plan: 'プランC',
          facility: '施設名C',
          option: 'なし',
          status: '予約申請中'
        },
        {
          id: '20',
          peopleNumber: '5',
          plan: 'プランB',
          facility: '施設名C',
          option: 'なし',
          status: 'キャンセル待ち'
        },
        {
          id: '21',
          peopleNumber: '4',
          plan: 'プランA',
          facility: '施設名C',
          option: 'なし',
          status: '予約申請中'
        },
        {
          id: '22',
          peopleNumber: '3',
          plan: 'プランC',
          facility: '施設名C',
          option: 'なし',
          status: 'キャンセル待ち'
        },
        {
          id: '23',
          peopleNumber: '2',
          plan: 'プランB',
          facility: '施設名C',
          option: 'なし',
          status: '宿泊前'
        },
        {
          id: '24',
          peopleNumber: '1',
          plan: 'プランA',
          facility: '施設名C',
          option: 'なし',
          status: '宿泊前'
        },
        {
          id: '25',
          peopleNumber: '8',
          plan: 'プランC',
          facility: '施設名C',
          option: 'なし',
          status: '宿泊前'
        },
        {
          id: '26',
          peopleNumber: '7',
          plan: 'プランB',
          facility: '施設名C',
          option: 'なし',
          status: '宿泊前'
        },
        {
          id: '27',
          peopleNumber: '6',
          plan: 'プランA',
          facility: '施設名C',
          option: 'なし',
          status: '宿泊前'
        },
        {
          id: '28',
          peopleNumber: '5',
          plan: 'プランC',
          facility: '施設名C',
          option: 'なし',
          status: '宿泊前'
        },
        {
          id: '29',
          peopleNumber: '4',
          plan: 'プランB',
          facility: '施設名C',
          option: 'なし',
          status: '宿泊前'
        },
        {
          id: '30',
          peopleNumber: '3',
          plan: 'プランA',
          facility: '施設名C',
          option: 'なし',
          status: '宿泊前'
        }
      ]
    }
  }
})
export default class FacilityIndex extends Vue {}
</script>
