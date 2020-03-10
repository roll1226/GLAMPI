<template>
  <div>
    <v-row class="pa-0 ma-0">
      <v-card elevation="0" class="black--text">
        <v-card-title class="pt-0">本日のお客様</v-card-title>
        <v-data-table
          :headers="headers"
          :items="guests"
          :page.sync="page"
          height="527.5px"
          class="ma-0 pa-0"
          hide-default-footer
          :loading="dataTableLoading"
          no-data-text="本日の予約はありません。"
          @page-count="pageCount = $event"
        >
          <template v-slot:item.action="{ item }">
            <div class="text-right">
              <v-btn
                outlined
                small
                class="mr-2"
                @click="openDetailReservation(item)"
              >
                詳細
              </v-btn>
            </div>
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

    <div justify="center">
      <v-dialog v-model="dialog" max-width="350">
        <v-card>
          <v-card-title>{{ userName }}</v-card-title>

          <v-card-text class="pb-2">
            <div class="my-4 subtitle-1">
              宿泊人数: <span class="title">{{ guestNumber }}人</span>
            </div>

            <div class="my-4 subtitle-1">
              プラン: <span class="title">{{ plan }}</span>
            </div>

            <div class="my-4 subtitle-1">
              オプション: <span class="title">{{ option }}</span>
            </div>
          </v-card-text>

          <v-divider class="mx-4 pb-6"></v-divider>

          <v-card-text>
            <v-chip color="success"
              >チェックイン: {{ checkIn.replace(/-/g, '/') }}</v-chip
            >
          </v-card-text>

          <v-card-text class="pb-0">
            <v-chip color="error"
              >チェックアウト: {{ checkOut.replace(/-/g, '/') }}</v-chip
            >
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              color="deep-purple lighten-2"
              text
              @click="closeDetailReservation"
            >
              閉じる
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import moment from 'moment'
import { IGuests } from '@/store/facilityAdmin'

interface IHeader {
  text: string
  align: string | null
  sortable: boolean | null
  value: string | null
}

@Component
export default class FacilityTop extends Vue {
  public page: number = 1
  public pageCount: number = 0
  public itemsPerPage: number = 10

  dialog: boolean = false
  userName: string = ''
  plan: string = ''
  option: string = ''
  checkIn: string = ''
  checkOut: string = ''
  guestNumber: string = ''

  headers: IHeader[] = [
    {
      text: 'お客様名',
      align: 'left',
      sortable: false,
      value: 'name'
    },
    {
      text: '部屋番号',
      value: 'rooms',
      align: null,
      sortable: null
    },
    {
      text: 'チェックイン',
      value: 'checkIn',
      align: null,
      sortable: false
    },
    {
      text: 'チェックアウト',
      value: 'checkOut',
      align: null,
      sortable: false
    },
    {
      text: '',
      value: 'action',
      sortable: false,
      align: null
    }
  ]

  created() {
    this.$store.commit('facilityAdmin/RESET_DATA')
    this.$store.commit('facilityAdmin/SET_TABLE_LOADING', true)
    const nowDate = moment(new Date()).format('YYYY-MM-DD')
    console.log(nowDate)
    this.$store.dispatch('facilityAdmin/getReservation', {
      facilityId: this.$route.params.id,
      toDate: nowDate
    })
  }

  openDetailReservation(guestDate: IGuests) {
    this.dialog = true
    this.userName = guestDate.name
    this.plan = guestDate.planName
    this.option =
      guestDate.optionName === ''
        ? '選択されていません。'
        : guestDate.optionName
    this.checkIn = guestDate.checkIn
    this.checkOut = guestDate.checkOut
    this.guestNumber = guestDate.guestNumber
  }

  closeDetailReservation() {
    this.dialog = false
    this.userName = ''
    this.plan = ''
    this.option = ''
    this.checkIn = ''
    this.checkOut = ''
    this.guestNumber = ''
  }

  get guests(): IGuests[] {
    return this.$store.state.facilityAdmin.toDateGuests
  }

  get dataTableLoading(): boolean {
    return this.$store.state.facilityAdmin.tableLoading
  }
}
</script>

<style lang="scss">
p span {
  display: inline-block;
  padding-top: 10px;
  font-size: 1.7em;
}
</style>
