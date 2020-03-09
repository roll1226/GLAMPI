<template>
  <v-card elevation="0" tile>
    <v-list-item three-line>
      <v-list-item-content>
        <div class="body-2 mb-1">
          宿泊人数
        </div>

        <v-list-item-title class="body-2 text-center">
          <v-overflow-btn
            v-model="selectGuest"
            :items="dropdownFont"
            class="ma-0 pa-0"
            label="宿泊人数"
            tile
            :dense="true"
            :filled="false"
            target="#dropdown-example-1"
          ></v-overflow-btn>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class GuestNumber extends Vue {
  get dropdownFont(): [...string[]] {
    const cnt = Number(this.maxGuests)
    const list = []
    for (let index = 1; index <= cnt; index++) {
      list.push(String(index))
    }

    return list
  }

  created() {
    this.$store.commit('reservation/SET_GUEST', '')
  }

  get maxGuests(): string {
    return this.$store.state.reservation.maxGuests
  }

  get selectGuest(): string {
    return this.$store.state.reservation.guest
  }

  set selectGuest(value: string) {
    this.$store.commit('reservation/SET_GUEST', value)
  }
}
</script>
