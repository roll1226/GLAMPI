<template>
  <div>
    <v-row no-gutters>
      <v-card elevation="0">
        <v-data-table
          :headers="headers"
          :items="list"
          :page.sync="page"
          height="527.5px"
          class="ma-0 pa-0"
          hide-default-footer
          @page-count="pageCount = $event"
        >
          <template v-slot:item.action>
            <v-btn small class="mr-2">
              詳細
            </v-btn>
          </template></v-data-table
        >
      </v-card>
    </v-row>
    <v-row class="text-center px-0 pt-6 pb-0">
      <v-pagination
        v-model="page"
        :length="pageCount"
        :value="itemsPerPage"
        @input="itemsPerPage = parseInt($event, 10)"
      ></v-pagination>
    </v-row>
  </div>
</template>

<style lang="scss">
// .v-data-table-header {
//   background-color: #e0e0e0;
// }
</style>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class ReserveManageFacility extends Vue {
  public page: number = 1
  public pageCount: number = 0
  public itemsPerPage: number = 10

  data() {
    return {
      headers: [
        { text: 'ID', value: 'id' },
        { text: '人数', value: 'peopleNumber' },
        { text: 'プラン', value: 'plan' },
        { text: 'オプション', value: 'option' },
        { text: '状態', value: 'status' },
        { text: '', value: 'action', sortable: false }
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
        }
      ]
    }
  }
}
</script>
