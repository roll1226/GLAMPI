<template>
  <div>
    <v-row>
      <v-col>
        <v-text-field
          v-model="sei"
          label="姓"
          :rules="[rules.isSeiLength, rules.seiFormat]"
          prepend-icon="mdi-pencil"
          counter="20"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          v-model="mei"
          label="名"
          :rules="[rules.isMeiLength, rules.meiFormat]"
          counter="20"
        ></v-text-field>
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class seimeiUserRegistration extends Vue {
  // public sei: string = ''
  get sei(): string {
    return this.$store.state.registration.firstName
  }

  set sei(value: string) {
    this.$store.commit('registration/SET_FIRST_NAME', value)
  }
  // public mei: string = ''
  get mei(): string {
    return this.$store.state.registration.lastName
  }

  set mei(value: string) {
    this.$store.commit('registration/SET_LAST_NAME', value)
  }
  public rules: {} = {
    isSeiLength: (v: string) =>
      (v.length >= 1 && v.length <= 20) ||
      '姓は20文字以内にて必ず入力してください。',
    seiFormat: (v: string) => {
      const pattern = /^[a-zA-Zａ-ｚＡ-Ｚぁ-んァ-ン一-龥]+$/
      return pattern.test(v) || '使用できない文字が含まれています。'
    },
    isMeiLength: (v: string) =>
      (v.length >= 1 && v.length <= 20) ||
      '名は20文字以内にて必ず入力してください。',
    meiFormat: (v: string) => {
      const pattern = /^[a-zA-Zａ-ｚＡ-Ｚぁ-んァ-ン一-龥]+$/
      return pattern.test(v) || '使用できない文字が含まれています。'
    }
  }
}
</script>
