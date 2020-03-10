<template>
  <div>
    <v-row class="pa-0 ma-0 mb-10 row1">
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
            stepSize: 50000,
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
