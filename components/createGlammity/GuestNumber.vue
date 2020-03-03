<template>
  <div>
    <v-row>
      <v-col sm="2">
        <h2>募集人数</h2>
      </v-col>
      <v-col sm="9">
        <v-overflow-btn
          v-model="guestNumber"
          label="募集人数"
          :items="dropdown"
          :rules="[rules.isPeople]"
        ></v-overflow-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class PeopleCreateGlammity extends Vue {
  get guestNumber(): string {
    return String(this.$store.state.glammityCreate.guestNumber)
  }

  set guestNumber(value: string) {
    this.$store.commit('glammityCreate/SET_GUEST_NUMBER', value)
  }

  dropdown: [...string[]] = []
  created() {
    for (let index = 0; index < 9; index++) {
      const x = 2
      this.dropdown.push(String(x + index))
    }
  }
  public rules: {} = {
    isPeople: (v: string) => !!v || '募集人数は必ず選択してください。'
  }
}
</script>
