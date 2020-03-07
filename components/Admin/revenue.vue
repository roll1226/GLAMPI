<template>
  <div>
    <v-row class="pa-0 ma-0 mb-10 row1">
      <v-card tile elevation="0" color="grey lighten-4">
        <v-card-text class="black--text pa-0">
          <v-row class="ma-0 pa-0" justify="space-around">
            <v-col class="text-center pa-0">
              <p class="ma-0 title">
                今月<br /><span class="revenue"
                  >収益:{{ berforIncomeNumber.toLocaleString() }}円</span
                ><br /><span class="revenue"
                  >宿泊人数:{{ berforGuestsNumber }}人</span
                ><br /><span class="revenue"
                  >仲介料:{{ berforBrokerageFee.toLocaleString() }}円</span
                >
              </p></v-col
            >

            <v-col class="text-center pa-0">
              <p class="ma-0 title">
                先月<br /><span class="revenue"
                  >収益:{{ toIncomeNumber.toLocaleString() }}円</span
                ><br /><span class="revenue"
                  >宿泊人数:{{ toGuestsNumber }}人</span
                ><br /><span class="revenue"
                  >仲介料:{{ toBrokerageFee.toLocaleString() }}円</span
                >
              </p>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-row justify="center">
        <v-col cols="auto">
          <IncomeChart
            :chart-options="incomeChartOption"
            :height="500"
            :width="1000"
          />
        </v-col>
        <v-col cols="auto">
          <GuestsNumberChard
            :chart-options="guestsNumberChartOption"
            :height="500"
            :width="1000"
          />
        </v-col>
      </v-row>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Chart from 'chart.js'
import IncomeChart from '@/components/Admin/IncomeChart.vue'
import GuestsNumberChard from '@/components/Admin/GuestsNumberChard.vue'

@Component({
  components: {
    IncomeChart,
    GuestsNumberChard
  }
})
export default class RevenueFacility extends Vue {
  berforIncomeNumber: number = 240000
  berforGuestsNumber: number = 32
  toIncomeNumber: number = 520000
  toGuestsNumber: number = 67
  berforBrokerageFee: number = this.berforIncomeNumber / 10
  toBrokerageFee: number = this.toIncomeNumber / 10

  incomeChartOption: Chart.ChartOptions = {
    scales: {
      xAxes: [
        {
          scaleLabel: {
            display: true
          },
          ticks: {
            beginAtZero: true,
            fontSize: 18
          }
        }
      ],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: '収益',
            fontSize: 24
          },
          ticks: {
            beginAtZero: true,
            min: 0,
            stepSize: 100000,
            fontSize: 18
          }
        }
      ]
    }
  }

  guestsNumberChartOption: Chart.ChartOptions = {
    scales: {
      xAxes: [
        {
          scaleLabel: {
            display: true
          },
          ticks: {
            beginAtZero: true,
            fontSize: 18
          }
        }
      ],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: '宿泊人数',
            fontSize: 24
          },
          ticks: {
            beginAtZero: true,
            min: 0,
            stepSize: 10,
            fontSize: 18
          }
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.v-card {
  width: 100%;
}

p .revenue {
  display: inline-block;
  padding-top: 10px;
  font-size: 0.9em;
}
</style>
