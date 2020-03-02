<template>
  <div>
    <v-row class="ma-0 pa-0">
      <v-col cols="auto" class="ma-0 pa-0">
        <v-tabs
          class="pa-0 ma-0 tabs"
          background-color="rgb(244,244,244)"
          active-class="font-weight-bold grey lighten-2"
          hide-slider
        >
          <v-tab class="black--text" elevation="0" @click="tab = 0"
            >未送信</v-tab
          >
          <v-tab class="black--text" elevation="0" @click="tab = 1"
            >送信済</v-tab
          >
        </v-tabs>
      </v-col>
    </v-row>
    <v-row class="ma-0 pa-0">
      <v-card>
        <v-data-table
          v-if="tab == 0"
          class="ma-0 pa-0"
          height="527.5px"
          :headers="headers"
          :items="list"
          :page.sync="page"
          hide-default-footer
          @page-count="pageCount = $event"
          ><template v-slot:item.action>
            <v-btn elevation="1" small class="mr-2">
              詳細
            </v-btn>
          </template></v-data-table
        >
        <v-data-table
          v-else-if="tab == 1"
          class="ma-0 pa-0"
          height="527.5px"
          :headers="headers2"
          :items="list2"
          :page.sync="page2"
          hide-default-footer
          @page-count="pageCount2 = $event"
          ><template v-slot:item.action>
            <v-btn elevation="1" small class="mr-2">
              詳細
            </v-btn>
          </template></v-data-table
        >
      </v-card>
    </v-row>
    <v-row v-if="tab == 0" class="text-center px-0 pt-6 pb-0">
      <v-pagination
        v-model="page"
        :length="pageCount"
        :value="itemsPerPage"
        @input="itemsPerPage = parseInt($event, 10)"
      ></v-pagination>
    </v-row>
    <v-row v-else-if="tab == 1" class="text-center px-0 pt-6 pb-0">
      <v-pagination
        v-model="page2"
        :length="pageCount2"
        :value="itemsPerPage"
        @input="itemsPerPage = parseInt($event, 10)"
      ></v-pagination>
    </v-row>
  </div>
</template>

<style>
.v-data-table-header {
  background-color: #e0e0e0;
}
</style>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class InquiryFacility extends Vue {
  public tab: number = 0
  public page: number = 1
  public pageCount: number = 0
  public page2: number = 1
  public pageCount2: number = 0
  public itemsPerPage: number = 10

  data() {
    return {
      isColor: 'grey lighten-2',
      headers: [
        { text: '日付', value: 'date' },
        { text: '要件', value: 'Requirements' },
        { text: 'ユーザ名', value: 'user' },
        { text: '', value: 'action', sortable: false }
      ],
      list: [
        {
          date: '12/27',
          Requirements: 'あいうえおー！！',
          user: 'iwaya'
        },
        {
          date: '12/27',
          Requirements: 'あいうえおー！！',
          user: 'iwaya'
        },
        {
          date: '12/27',
          Requirements: 'あいうえおー！！',
          user: 'iwaya'
        },
        {
          date: '12/27',
          Requirements: 'あいうえおー！！',
          user: 'iwaya'
        },
        {
          date: '12/27',
          Requirements: 'あいうえおー！！',
          user: 'iwaya'
        },
        {
          date: '12/27',
          Requirements: 'あいうえおー！！',
          user: 'iwaya'
        },
        {
          date: '12/27',
          Requirements: 'あいうえおー！！',
          user: 'iwaya'
        },
        {
          date: '12/27',
          Requirements: 'あいうえおー！！',
          user: 'iwaya'
        },
        {
          date: '12/27',
          Requirements: 'あいうえおー！！',
          user: 'iwaya'
        },
        {
          date: '12/27',
          Requirements: 'あいうえおー！！',
          user: 'iwaya'
        },
        {
          date: '12/23',
          Requirements: 'かきくけこー！！',
          user: 'iwaya'
        },
        {
          date: '12/18',
          Requirements: 'さしすせそー！！',
          user: 'iwaya'
        },
        {
          date: '12/12',
          Requirements: 'たちつてとー！！',
          user: 'iwaya'
        },
        {
          date: '12/9',
          Requirements: 'なにぬねのー！！',
          user: 'iwaya'
        }
      ],
      headers2: [
        { text: '日付', value: 'date' },
        { text: '要件', value: 'Requirements' },
        { text: 'ユーザ名', value: 'user' },
        { text: '', value: 'action', sortable: false }
      ],
      list2: [
        {
          date: '11/27',
          Requirements: 'はひふへほー！！',
          user: 'god'
        },
        {
          date: '11/20',
          Requirements: 'まみむめもー！！',
          user: 'god'
        },
        {
          date: '11/8',
          Requirements: 'やゆよー！！',
          user: 'god'
        },
        {
          date: '10/25',
          Requirements: 'らりるれろー！！',
          user: 'god'
        },
        {
          date: '10/2',
          Requirements: 'わをんー！！',
          user: 'god'
        }
      ]
    }
  }
}
</script>
