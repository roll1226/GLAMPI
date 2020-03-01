<script>
import { Component, Vue } from 'nuxt-property-decorator'
import { Bar } from 'vue-chartjs'

@Component({
  extends: Bar,
  name: 'chart',
  data() {
    return {
      data: {
        labels: [
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
        ],
        datasets: [
          // {
          //   label: 'Bar Dataset',
          //   data: [10, 20, 30, 40, 50, 30, 20, 90, 40, 70, 10, 80],
          //   backgroundColor: [
          //     'rgba(255, 99, 132, 0.2)',
          //     'rgba(54, 162, 235, 0.2)',
          //     'rgba(255, 206, 86, 0.2)',
          //     'rgba(75, 192, 192, 0.2)',
          //     'rgba(153, 102, 255, 0.2)',
          //     'rgba(255, 159, 64, 0.2)',
          //     'rgba(255, 99, 132, 0.2)',
          //     'rgba(54, 162, 235, 0.2)',
          //     'rgba(255, 206, 86, 0.2)',
          //     'rgba(75, 192, 192, 0.2)',
          //     'rgba(153, 102, 255, 0.2)',
          //     'rgba(255, 159, 64, 0.2)'
          //   ],
          //   borderColor: [
          //     'rgba(255, 99, 132, 1)',
          //     'rgba(54, 162, 235, 1)',
          //     'rgba(255, 206, 86, 1)',
          //     'rgba(75, 192, 192, 1)',
          //     'rgba(153, 102, 255, 1)',
          //     'rgba(255, 159, 64, 1)',
          //     'rgba(255, 99, 132, 1)',
          //     'rgba(54, 162, 235, 1)',
          //     'rgba(255, 206, 86, 1)',
          //     'rgba(75, 192, 192, 1)',
          //     'rgba(153, 102, 255, 1)',
          //     'rgba(255, 159, 64, 1)'
          //   ],
          //   borderWidth: 1
          // },
          {
            label: '収益',
            data: [
              230000,
              370000,
              320000,
              290000,
              400000,
              340000,
              210000,
              280000,
              350000,
              380000,
              520000,
              240000
            ],
            borderColor: '#ff4444',
            fill: false,
            type: 'line',
            lineTension: 0
          }
        ]
      },
      options: {
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
    }
  }
})
export default class chartRevenueFacility extends Vue {
  mounted() {
    this.renderChart(this.data, this.options)
  }
}
</script>
<style></style>
