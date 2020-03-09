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
          :loading="manageLoading"
          @page-count="pageCount = $event"
        >
          <template v-slot:item.status="{ item }">
            <v-chip :color="getColor(item.status)">{{ item.status }}</v-chip>
          </template>
        </v-data-table>
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

import { IReservation, userStates } from '@/store/adminReservation'

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
    { text: '名前', value: 'name', sortable: null },
    { text: '人数', value: 'peopleNumber', sortable: null },
    { text: 'プラン', value: 'plan', sortable: null },
    { text: 'オプション', value: 'option', sortable: null },
    { text: '状態', value: 'status', sortable: null }
  ]

  get list(): IReservation[] {
    return this.$store.state.adminReservation.reservations
  }

  get manageLoading(): boolean {
    return this.$store.state.adminReservation.loading
  }

  getColor(value: userStates): string {
    if (value === '宿泊前') return 'grey lighten-2'
    else if (value === '宿泊中') return 'success'
    else return 'error'
  }

  created() {
    this.$store.commit('adminReservation/SET_LOADING', true)
    const url = this.$route.params.id
    console.log(url)
    this.$store.commit('adminReservation/CLEAR_INFO')
    this.$store.dispatch('adminReservation/getReservations', url)
  }
}
</script>
