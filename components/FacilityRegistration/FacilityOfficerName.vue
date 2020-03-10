<template>
  <div>
    <v-text-field
      v-model="officerName"
      label="管理者名"
      prepend-icon="fas fa-user-cog"
      :rules="[rules.isOfficerName, rules.officerNameFormat]"
    ></v-text-field>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class FacilityRegistrationOfficerName extends Vue {
  // public sei: string = ''
  get officerName(): string {
    return this.$store.state.facilityRegistration.officerName
  }

  set officerName(value: string) {
    this.$store.commit('facilityRegistration/SET_OFFICER_NAME', value)
  }
  public rules: {} = {
    isOfficerName: (v: string) =>
      (v && v.length >= 1 && v.length <= 20) ||
      '姓は20文字以内にて必ず入力してください。',

    officerNameFormat: (v: string) => {
      const pattern = /^[a-zA-Zａ-ｚＡ-Ｚぁ-んァ-ン一-龥]+$/
      return pattern.test(v) || '使用できない文字が含まれています。'
    }
  }
}
</script>
