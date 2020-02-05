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
      <v-col class="ma-0 pa-0">
        <v-tabs-items class="item">
          <div v-if="tab == 0">
            <v-data-table
              class="ma-0 pa-0"
              height="521.875px"
              :headers="headers"
              :items="list"
              :page.sync="page"
              hide-default-footer
              @page-count="pageCount = $event"
            ></v-data-table>
          </div>
          <div v-else-if="tab == 1">
            <v-data-table
              class="ma-0 pa-0"
              height="521.875px"
              :headers="headers2"
              :items="list2"
              :page.sync="page"
              hide-default-footer
              @page-count="pageCount = $event"
            ></v-data-table>
          </div>
        </v-tabs-items>
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
  </div>
</template>

<style>
.v-data-table-header {
  background-color: #e0e0e0;
}
</style>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  data() {
    return {
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      isColor: 'grey lighten-2',
      headers: [
        { text: 'ID', value: 'id' },
        { text: '人数', value: 'peopleNumber' },
        { text: 'プラン', value: 'plan' }
      ],
      list: [
        {
          id: '1',
          peopleNumber: '3',
          plan: 'プランA'
        },
        {
          id: '2',
          peopleNumber: '6',
          plan: 'プランB'
        },
        {
          id: '3',
          peopleNumber: '9',
          plan: 'プランC'
        },
        {
          id: '4',
          peopleNumber: '12',
          plan: 'プランD'
        },
        {
          id: '5',
          peopleNumber: '15',
          plan: 'プランE'
        }
      ],
      headers2: [
        { text: 'ID', value: 'id' },
        { text: '人数', value: 'peopleNumber' },
        { text: 'プラン', value: 'plan' }
      ],
      list2: [
        {
          id: '6',
          peopleNumber: '4',
          plan: 'プランXX'
        },
        {
          id: '7',
          peopleNumber: '8',
          plan: 'プランXP'
        },
        {
          id: '8',
          peopleNumber: '12',
          plan: 'プランDX'
        },
        {
          id: '9',
          peopleNumber: '16',
          plan: 'プランSX'
        },
        {
          id: '10',
          peopleNumber: '20',
          plan: 'プランCV'
        }
      ]
    }
  }
})
export default class FacilityIndex extends Vue {
  public tab: number = 0
}
</script>
