<template>
  <div>
    <v-row class="pa-0 ma-0 mb-10 row1">
      <v-card tile elevation="0" color="grey lighten-4">
        <v-card-text class="black--text pa-0">
          <v-row class="ma-0 pa-0" justify="space-around">
            <v-col class="text-center pa-0">
              <p class="ma-0 title">
                今月<br /><span class="revenue"
                  >収益:{{ revenue.toLocaleString() }}円</span
                ><br /><span class="revenue">宿泊人数:{{ guests }}人</span>
              </p>
            </v-col>
            <v-col class="text-center pa-0">
              <p class="ma-0 title">
                先月<br /><span class="revenue"
                  >収益:{{ revenue2.toLocaleString() }}円</span
                ><br /><span class="revenue">宿泊人数:{{ guests2 }}人</span>
              </p>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-row>
        <v-col cols="auto">
          <Chart :height="500" :width="1000"></Chart>
        </v-col>
        <v-col cols="auto">
          <Chart :height="500" :width="1000"></Chart>
        </v-col>
      </v-row>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Chart from '@/components/Admin_/Chart.vue'

@Component({
  components: {
    Chart
  }
})
export default class RevenueAdmin extends Vue {
  public revenue: number = 240000
  public guests: number = 32
  public revenue2: number = 520000
  public guests2: number = 67
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
