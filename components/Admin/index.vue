<template>
  <div>
    <h1>棒グラフと線グラフ</h1>
    <Chart></Chart>
  </div>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
import Chart from '@/components/Admin/sample.vue'

@Component({
  components: {
    Chart
  }
})
export default class iFacility extends Vue {
  // mounted() {
  //   this.renderChart(this.data, this.options)
  // }
}
</script>
