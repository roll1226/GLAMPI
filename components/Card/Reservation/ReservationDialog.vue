<template>
  <div>
    <v-card height="380" class="grey lighten-3 py-5">
      <v-row class="ma-0 pa-0" justify="center" fill-height>
        <v-icon size="120" color="rgb(87, 95, 69)"
          >mdi-check-circle-outline</v-icon
        >
      </v-row>
      <v-spacer></v-spacer>
      <v-row class="ma-0 pa-0" justify="space-around" align="center">
        <v-col cols="auto">
          <v-row class="ma-0 pa-0 headline" justify="center">
            お支払いが完了しました
          </v-row>
          <v-row class="ma-0 pa-0 subttitle-2 mt-4" justify="center">
            ご利用ありがとうございます
          </v-row>
        </v-col>
      </v-row>
      <v-row class="ma-0 pa-0 mt-6" justify="center">
        <v-col class="ma-0 pa-0" cols="10">
          <hr class="ma-0 pa-0" />
        </v-col>
      </v-row>
      <v-row class="ma-0 pa-0 mt-6" justify="center">
        <v-col cols="auto">
          <v-btn
            width="200"
            height="50"
            elevation="0"
            color="rgb(87, 95, 69)"
            class="white--text"
            @click="isCardtrue"
          >
            <h2>OK</h2>
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
@Component
export default class reservationComplete extends Vue {
  isCardtrue() {
    this.$store.commit('reservationModal/SET_ISCARDDIALOG', false)
  }
}
</script>
