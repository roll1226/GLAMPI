<template>
  <div>
    <v-row class="ma-0 pa-0">
      <v-col class="ma-0 pa-0">
        <v-data-table
          :headers="headers"
          :items="list"
          :page.sync="page"
          height="500px"
          hide-default-footer
          class="ma-0 pa-0"
          @page-count="pageCount = $event"
        ></v-data-table>
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
      headers: [
        { text: 'ID', value: 'id' },
        { text: '人数', value: 'peopleNumber' },
        { text: 'プラン', value: 'plan' }
      ],
      list: [
        {
          id: '1',
          peopleNumber: '8',
          plan: 'プランC'
        },
        {
          id: '1',
          peopleNumber: '8',
          plan: 'プランC'
        },
        {
          id: '1',
          peopleNumber: '8',
          plan: 'プランC'
        },
        {
          id: '1',
          peopleNumber: '8',
          plan: 'プランC'
        },
        {
          id: '1',
          peopleNumber: '8',
          plan: 'プランC'
        }
      ]
    }
  }
})
export default class FacilityIndex extends Vue {}
</script>
