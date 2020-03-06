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
            <v-btn elevation="1" small class="mr-2">
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

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

import { IReservation } from '@/store/adminReservation'

interface IHeader {
  text: string
  value: string
  sortable: boolean | null
}

@Component
export default class ReserveManageFacility extends Vue {
  public page: number = 1
  public pageCount: number = 0
  public itemsPerPage: number = 10

  headers: IHeader[] = [
    { text: 'ID', value: 'id', sortable: null },
    { text: '人数', value: 'peopleNumber', sortable: null },
    { text: 'プラン', value: 'plan', sortable: null },
    { text: 'オプション', value: 'option', sortable: null },
    { text: '状態', value: 'status', sortable: null },
    { text: '', value: 'action', sortable: false }
  ]

  get list(): IReservation[] {
    return this.$store.state.adminReservation.reservations
  }
  created() {
    const url = this.$route.params.id
    console.log(url)
    this.$store.commit('adminReservation/CLEAR_INFO')
    this.$store.dispatch('adminReservation/getReservations', url)
  }
}
</script>
