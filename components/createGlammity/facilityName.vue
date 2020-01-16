<template>
  <div>
    <v-overflow-btn
      v-model="facilityName"
      label="施設名"
      :items="dropdown"
    ></v-overflow-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class FacilityNameCreateGlammity extends Vue {
  get facilityName(): string {
    return this.$store.state.registration.facilityName
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
    isFacilityName: (v: string) => !!v || '施設名は必ず入力してください。'
  }
}
</script>
