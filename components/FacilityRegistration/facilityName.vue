<template>
  <div>
    <v-text-field
      v-model="resPerson"
      label="施設名"
      prepend-icon="mdi-"
      :rules="[rules.isFacilityName]"
    ></v-text-field>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class facilityNameFacilityRegistration extends Vue {
  // public sei: string = ''
  get sei(): string {
    return this.$store.state.registration.firstName
  }

  set sei(value: string) {
    this.$store.commit('registration/SET_FIRST_NAME', value)
  }
  public rules: {} = {
    isFacilityName: (v: string) =>
      (v.length >= 1 && v.length <= 20) ||
      !!v ||
      '施設名は必ず入力してください。'
  }
}
</script>
