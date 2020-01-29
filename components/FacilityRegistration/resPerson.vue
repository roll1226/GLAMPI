<template>
  <div>
    <v-text-field
      v-model="resPerson"
      label="管理者名"
      prepend-icon="mdi-"
      :rules="[rules.isResPerson, rules.resPersonFormat]"
    ></v-text-field>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class resPersonFacilityRegistration extends Vue {
  // public sei: string = ''
  get sei(): string {
    return this.$store.state.registration.firstName
  }

  set sei(value: string) {
    this.$store.commit('registration/SET_FIRST_NAME', value)
  }
  public rules: {} = {
    isResPerson: (v: string) =>
      (v.length >= 1 && v.length <= 20) ||
      '姓は20文字以内にて必ず入力してください。',
    resPersonFormat: (v: string) => {
      const pattern = /^[a-zA-Zａ-ｚＡ-Ｚぁ-んァ-ン一-龥]+$/
      return pattern.test(v) || '使用できない文字が含まれています。'
    }
  }
}
</script>
