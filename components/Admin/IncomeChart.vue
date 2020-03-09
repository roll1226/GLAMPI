<script lang="ts">
import { mixins, Component, Prop } from 'nuxt-property-decorator'
import Chart from 'chart.js'
import { Bar } from 'vue-chartjs'
import moment from 'moment'

import { firestore } from '@/plugins/firebase'

const month = [
  '1月',
  '2月',
  '3月',
  '4月',
  '5月',
  '6月',
  '7月',
  '8月',
  '9月',
  '10月',
  '11月',
  '12月'
]

@Component
export default class IncomeChart extends mixins(Bar) {
  chartData: Chart.ChartData = {
    labels: month,
    datasets: [
      {
        label: '収益',
        data: [] as [...number[]],
        borderColor: '#ff4444',
        fill: false,
        type: 'line',
        lineTension: 0
      }
    ]
  }

  @Prop({ required: true })
  chartOptions!: Chart.ChartOptions

  async mounted() {
    this.renderChart(this.chartData, this.chartOptions)

    const facilities = firestore.collection('facilities')
    const year = moment(new Date()).format('YYYY')
    const month = Number(moment(new Date()).format('M'))

    const facility = await facilities
      .where('displayName', '==', this.$route.params.id)
      .get()

    console.log(facility)

    const getMonth = [
      'january',
      'february',
      'march',
      'april',
      'may',
      'june',
      'july',
      'august',
      'september',
      'october',
      'november',
      'december'
    ]

    for (let index = 0; index < month; index++) {
      const profitData = await facilities
        .doc(facility.docs[0].id)
        .collection('profit')
        .doc(year)
        .collection(getMonth[index])
        .get()

      if (profitData.empty) return
      console.log(profitData.docs[0].data().guests)

      if (this.chartData.datasets) {
        if (this.chartData.datasets[0].data) {
          await this.chartData.datasets[0].data.push(
            profitData.docs[0].data().pay
          )
        }
      }
    }

    this.renderChart(this.chartData, this.chartOptions)
  }
}
</script>
