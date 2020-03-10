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
          date: '2020/1/15',
          Requirements: 'なぜ俺はこんなにも神なんすか？',
          user: 'iwaya'
        },
        {
          date: '2020/1/16',
          Requirements: 'もう身長伸びないの、どうして？',
          user: 'iwaya'
        },
        {
          date: '2020/1/18',
          Requirements: '昨日UFOを見ました。',
          user: 'iwaya'
        },
        {
          date: '2020/1/20',
          Requirements: '丸亀製麵はうまいす。',
          user: 'iwaya'
        },
        {
          date: '2020/1/21',
          Requirements: 'いーいーなーいーいーなー',
          user: 'くまのこ'
        },
        {
          date: '2020/1/21',
          Requirements: 'にーーーんげんっていーいーなー',
          user: 'くまのこ'
        },
        {
          date: '2020/1/21',
          Requirements: 'おいしいおやつに',
          user: 'くまのこ'
        },
        {
          date: '2020/1/21',
          Requirements: 'ほかほかおかゆ～～～～～',
          user: 'くまのこ'
        },
        {
          date: '2020/1/21',
          Requirements: 'あったかーいーふーとーんでー',
          user: 'くまのこ'
        },
        {
          date: '2020/2/29',
          Requirements: '昏睡状態。',
          user: 'くまのこ'
        },
        {
          date: '2020/3/1',
          Requirements: '見ましたね？',
          user: 'iwaya'
        },
        {
          date: '2020/3/1',
          Requirements: '見ましたね？',
          user: 'iwaya'
        },
        {
          date: '2020/3/1',
          Requirements: '見ましたね？',
          user: 'iwaya'
        },
        {
          date: '2020/3/1',
          Requirements: '見ましたね？',
          user: 'iwaya'
        },
        {
          date: '2020/3/1',
          Requirements: '見ましたね？',
          user: 'iwaya'
        },
        {
          date: '2020/3/1',
          Requirements: '見ましたね？',
          user: 'iwaya'
        },
        {
          date: '2020/3/1',
          Requirements: '見ましたね？',
          user: 'iwaya'
        },
        {
          date: '2020/3/1',
          Requirements: '見ましたね？',
          user: 'iwaya'
        },
        {
          date: '2020/3/1',
          Requirements: '見ましたね？',
          user: 'iwaya'
        },
        {
          date: '2020/3/1',
          Requirements: '見ましたね？',
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
          date: '2019/12/27',
          Requirements: 'オレハコノヒ、カミニナッタ',
          user: 'god'
        },
        {
          date: '2019/12/21',
          Requirements: 'いわや製麺',
          user: 'iwaya'
        },
        {
          date: '2019/12/14',
          Requirements: 'ワレコソガ、ユイイツシン',
          user: 'god'
        },
        {
          date: '2019/11/20',
          Requirements: 'ふ',
          user: 'iwaya'
        },
        {
          date: '2019/9/7',
          Requirements: 'かくれんぼなうw',
          user: 'くまのこ'
        }
      ]
    }
  }
}
</script>
