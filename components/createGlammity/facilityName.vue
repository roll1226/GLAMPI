<template>
  <div>
    <v-row>
      <v-col sm="2">
        <h2>施設名</h2>
      </v-col>
      <v-col sm="9">
        <v-overflow-btn
          v-model="facilityName"
          label="施設名"
          :items="dropdown"
          :rules="[rules.isFacilityName]"
        ></v-overflow-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class facilityNameCreateGlammity extends Vue {
  get facilityName(): string {
    return this.$store.state.createGlammity.facilityName
  }

  set facilityName(value: string) {
    this.$store.commit('createGlammity/SET_FACILITY_NAME', value)
  }
  dropdown: [...string[]] = []
  created() {
    for (let index = 0; index < 1000; index++) {
      const x = 0
      this.dropdown.push(String(x + index))
    }
  }
  public rules: {} = {
    isFacilityName: (v: string) => !!v || '施設名は必ず選択してください。'
  }
}
</script>
