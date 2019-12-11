<template>
  <div>
    <h1>
      予約
    </h1>

    <v-row dense>
      <v-col :cols="10" class="ma-auto">
        <Plan :pay-number="planPay" />
      </v-col>

      <v-col :cols="10" class="ma-auto">
        <v-card>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-1">
                日程
              </div>
              <v-list-item-title class="headline mb-1 text-center">
                <v-text-field
                  v-model="dateRangeText"
                  label="日程"
                  prepend-icon="mdi-calendar"
                  readonly
                ></v-text-field>
                <v-date-picker
                  v-model="dates"
                  locale="ja-jp"
                  :show-current="false"
                  range
                  :day-format="(date) => new Date(date).getDate()"
                  class="mb-2"
                ></v-date-picker>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>

      <v-col :cols="10" class="ma-auto">
        <v-card>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-1">
                オプション
              </div>

              <v-list-item-title class="headline mb-1">
                <v-row dense>
                  <v-col
                    v-for="(optionList, index) in displayLists"
                    :key="index"
                    lg="4"
                    md="4"
                    sm="4"
                    xs="6"
                  >
                    <Options
                      :plan-title="optionList.title"
                      :pay="optionList.pay.toLocaleString()"
                      :texts="optionList.text"
                      :image="optionList.image"
                      :display-name="optionList.displayName"
                    />
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

    <Stripe />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Stripe from '~/components/Btn/Stripe.vue'
import Plan from '~/components/Card/Reservation/Plan.vue'
import Options from '~/components/Card/Reservation/Options.vue'

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
    Stripe
  }
})
export default class reservation extends Vue {
  page: number = 1
  dates: [] = []
  length: number = 0
  pageSlice: number = 0
  payNum: number = 2000

  created() {
    if (window.parent.screen.width <= 420) {
      this.pageSlice = 1
    } else {
      this.pageSlice = 3
    }
  }

  list: options[] = [
    {
      title: 'バーベキュー',
      text: ['美味しい', '楽しい'],
      pay: 2000,
      image: '40',
      displayName: 'option1'
    },
    {
      title: '誕生日ケーキ',
      text: ['美味しい', '楽しい'],
      pay: 1500,
      image: '10',
      displayName: 'option2'
    },
    {
      title: '国産牛肉',
      text: ['高い', 'けど、うまい！'],
      pay: 20000,
      image: '16',
      displayName: 'option3'
    },
    {
      title: '誕生日ケーキ',
      text: ['美味しい', '楽しい'],
      pay: 1500,
      image: '17',
      displayName: 'option4'
    },
    {
      title: '国産牛肉',
      text: ['高い', 'けど、うまい！'],
      pay: 20000,
      image: '20',
      displayName: 'option5'
    },
    {
      title: 'バーベキュー',
      text: ['美味しい', '楽しい'],
      pay: 2000,
      image: '30',
      displayName: 'option6'
    }
  ]
  displayLists?: options[] = []

  public get dateRangeText(): string {
    return this.dates.join(' ~ ')
  }

  get planPay(): number {
    return this.$store.state.reservation.planPay
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
