<template>
  <div>
    <v-btn @click="dialog = true">
      予約
    </v-btn>

    <div justify="center">
      <v-dialog
        v-model="dialog"
        :persistent="HostReservationLoading"
        max-width="400"
      >
        <v-card :loading="HostReservationLoading">
          <v-card-text>
            <div class="text-center headline">
              予約しますか?
            </div>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions class="d-flex justify-space-around">
            <HostReservationStripe />

            <v-btn @click="dialog = false">
              しません
            </v-btn>
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
  dialog: boolean = false
  HostReservationLoading: boolean = false

  glammityReservation() {
    this.HostReservationLoading = true
    setTimeout(() => {
      // this.dialog = false
      this.HostReservationLoading = false
    }, 3000)
  }
}
</script>
