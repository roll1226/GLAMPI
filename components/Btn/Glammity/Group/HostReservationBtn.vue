<template>
  <div>
    <v-btn width="120" height="40" outlined @click="openDialog">
      予約
    </v-btn>
    <HostReservationStripe />

    <div justify="center">
      <v-dialog v-model="chareDialog" max-width="400">
        <v-card>
          <v-card-text>
            <div class="text-center headline">
              予約しますか?
            </div>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions class="d-flex justify-space-around">
            <v-btn outlined color="primary" @click="openStripe">
              します
            </v-btn>

            <div>
              <v-btn outlined color="green" @click="dialog = false">
                戻る
              </v-btn>
            </div>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import HostReservationStripe from '@/components/Btn/Glammity/Group/HostReservationStripe.vue'

@Component({
  components: {
    HostReservationStripe
  }
})
export default class HostReservationBtn extends Vue {
  get chareDialog(): boolean {
    return this.$store.state.glammityStripe.dialog
  }

  set chareDialog(value: boolean) {
    this.$store.commit('glammityStripe/SET_DIALOG', value)
  }

  openDialog() {
    this.$store.commit('glammityStripe/SET_DIALOG', true)
  }

  openStripe() {
    this.$store.commit('glammityStripe/SET_DIALOG', false)
    this.$store.commit('glammityStripe/SET_HOST_DIALOG', true)
  }
}
</script>
