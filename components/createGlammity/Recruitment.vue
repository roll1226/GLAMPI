<template>
  <div class="body-2 mb-1">
    <h2>募集日程</h2>
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1 text-center">
          <v-text-field
            v-model="schedule"
            label="募集日程"
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
import { Component, Vue } from 'nuxt-property-decorator'
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
export default class RecruitmentCreateGlammity extends Vue {
  nowDate: string = ''

  created() {
    this.nowDate = moment(new Date()).format('YYYY-MM-DD')
  }

  public get schedule(): string {
    return this.dates.join(' ~ ')
  }

  get dates(): [...string[]] {
    return this.$store.state.glammityCreate.recruitmentDates
  }

  set dates(selectdates: [...string[]]) {
    this.$store.commit('glammityCreate/SET_RECRUITMENT_DATES', selectdates)
    if (selectdates[1]) {
      this.$store.commit('glammityCreate/SET_RECRUITMENT_DATES', selectdates)
      if (selectdates[0] > selectdates[1]) {
        const checkOut = selectdates[0]
        const checkIn = selectdates[1]

        this.$store.commit('glammityCreate/SET_RECRUITMENT_DATE_RE', {
          checkIn,
          checkOut
        })
      }
    }
  }
}
</script>
