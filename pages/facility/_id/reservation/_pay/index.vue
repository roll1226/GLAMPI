<template>
  <div>
    <v-card elevation="0" class="mt-2">
      <v-card-title class="display-1">
        <v-row justify="center">
          <v-col cols="auto">
            予約
          </v-col>
        </v-row>
      </v-card-title>
      <v-row justify="center">
        <v-col cols="8">
          <hr class="mt-n4" />
        </v-col>
      </v-row>
      <v-row dense>
        <v-col :cols="10" class="ma-auto">
          <Plan />
        </v-col>

        <v-col :cols="10" class="ma-auto">
          <GuestNumber />
        </v-col>

        <v-col :cols="10" class="ma-auto">
          <v-card elevation="0" tile>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="body-2 mb-1">
                  日程
                </div>
                <v-list-item-title class="headline mb-1 text-center">
                  <v-text-field
                    v-model="dateRangeText"
                    label="日程"
                    prepend-icon="mdi-calendar"
                    readonly
                  ></v-text-field>
                  <v-row dense justify="center">
                    <v-col cols="8">
                      <v-date-picker
                        v-model="dates"
                        :full-width="true"
                        locale="ja-jp"
                        :show-current="false"
                        range
                        :min="nowDate"
                        :day-format="(date) => new Date(date).getDate()"
                        class="mb-2"
                      ></v-date-picker>
                    </v-col>
                  </v-row>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>

        <v-col :cols="10" class="ma-auto">
          <v-card elevation="0" tile>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="body-2 mb-1">
                  オプション
                </div>

                <v-list-item-title class="headline mb-1">
                  <v-row class="ma-0 pa-0" justify="center">
                    <v-col class="ma-0 pa-0" cols="auto">
                      <v-row class="ma-0 pa-0">
                        <v-col
                          v-for="(optionList, index) in displayLists"
                          :key="index"
                        >
                          <Options
                            :option-title="optionList.title"
                            :pay="optionList.pay.toLocaleString()"
                            :texts="optionList.texts"
                            :image="optionList.src"
                            :display-name="optionList.displayName"
                          />
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                  <div class="text-center">
                    <v-pagination
                      v-model="page"
                      :length="length"
                      @input="pageChange"
                    ></v-pagination>
                  </div>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>

      <ReservationBtn />
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import moment from 'moment'
import Plan from '~/components/Card/Reservation/Plan.vue'
import Options from '~/components/Card/Reservation/Options.vue'
import ReservationBtn from '@/components/Btn/ReservationBtn.vue'
import GuestNumber from '@/components/Card/Reservation/GuestNumber.vue'

interface option {
  slidesPerView: number
  centeredSlides: boolean
  pagination: {
    el: string
    clickable: boolean
  }
}

interface options {
  title: string
  text: [...string[]]
  pay: number
  image: string
  displayName: string
}

@Component({
  components: {
    Plan,
    Options,
    ReservationBtn,
    GuestNumber
  }
})
export default class reservation extends Vue {
  page: number = 1
  // dates: [] = []
  length: number = 0
  pageSlice: number = 0
  payNum: number = 2000
  nowDate: string = ''

  created() {
    this.$store.commit('reservation/SET_DATES', [])
    if (window.parent.screen.width <= 420) {
      this.pageSlice = 1
    } else {
      this.pageSlice = 3
    }
    this.nowDate = moment(new Date()).format('YYYY-MM-DD')
  }

  list: options[] = this.$store.state.facility.options
  displayLists?: options[] = []

  get dateRangeText(): string {
    return this.dates.join(' ~ ')
  }

  get dates(): [...string[]] {
    return this.$store.state.reservation.dates
  }

  set dates(selectdates: [...string[]]) {
    this.$store.commit('reservation/SET_DATES', selectdates)
    if (selectdates[1]) {
      this.$store.commit('reservation/SET_DATES', selectdates)
      if (selectdates[0] > selectdates[1]) {
        const checkOut = selectdates[0]
        const checkIn = selectdates[1]

        this.$store.commit('reservation/SET_DATE_RE', { checkIn, checkOut })
      }
    }
  }

  mounted() {
    this.length = Math.ceil(this.list.length / this.pageSlice)
    this.displayLists = this.list.slice(0, this.pageSlice)
  }

  pageChange(pageNumber: number) {
    this.displayLists = this.list.slice(
      this.pageSlice * (pageNumber - 1),
      this.pageSlice * pageNumber
    )
  }
}
</script>
