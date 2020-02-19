<template>
  <div class="body-2 mb-1">
    <h2>日程</h2>
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1 text-center">
          <v-text-field
            v-model="schedule"
            label="日程"
            prepend-icon="mdi-calendar"
            readonly
          ></v-text-field>
          <v-date-picker
            v-model="dates"
            locale="ja-jp"
            :show-current="false"
            range
            :min="nowDate"
            :day-format="(date) => new Date(date).getDate()"
            class="mb-2"
          ></v-date-picker>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import moment from 'moment'
import Options from '~/components/Card/Reservation/Options.vue'

interface options {
  title: string
  text: [...string[]]
  pay: number
  image: string
  displayName: string
}

@Component({
  components: {
    Options
  }
})
export default class ScheduleCreateGlammity extends Vue {
  page: number = 1

  // dates: [] = []
  length: number = 0
  pageSlice: number = 0
  payNum: number = 2000
  nowDate: string = ''
  isReservation: boolean = false

  created() {
    if (window.parent.screen.width <= 420) {
      this.pageSlice = 1
    } else {
      this.pageSlice = 3
    }
    this.nowDate = moment(new Date()).format('YYYY-MM-DD')
    console.log(moment(new Date()).format('YYYY-MM-DD'))
  }
  list: options[] = this.$store.state.facility.options
  displayLists?: options[] = []

  public get schedule(): string {
    if (this.dates[1]) {
      if (this.dates[0] > this.dates[1]) {
        const checkOut = this.dates[0]
        const checkIn = this.dates[1]

        this.$store.commit('reservation/SET_DATE_RE', { checkIn, checkOut })
      }
    }
    return this.dates.join(' ~ ')
  }
  get dates(): [...string[]] {
    return this.$store.state.reservation.dates
  }

  set dates(selectdates: [...string[]]) {
    this.$store.commit('reservation/SET_DATES', selectdates)
  }

  @Watch('dates')
  reservationIsValid() {
    this.isReservation =
      this.isDateInputed(this.dates[0]) &&
      this.isDateInputed(this.dates[1]) &&
      this.checkDateLength(this.dates)
  }

  private isDateInputed(date: string): boolean {
    if (date !== '') {
      return true
    } else {
      return false
    }
  }

  private checkDateLength(dates: [...string[]]): boolean {
    if (dates.length === 2) {
      return true
    } else {
      return false
    }
  }
}
</script>
