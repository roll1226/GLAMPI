<template>
  <div>
    <v-text-field
      v-model="sei"
      label="姓"
      placeholder="姓"
      :rules="rules.fname"
    ></v-text-field>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class seiUserRegistration extends Vue {
  // public sei: string = ''
  get sei(): string {
    return this.$store.state.registration.lastName
  }

  set sei(value: string) {
    this.$store.commit('registration/SET_LAST_NAME', value)
  }
  public rules: {} = {
    fname: [
      (v: string) => !!v || '姓・名は必ず入力してください',
      (v: string) =>
        (v && v.length <= 20) ||
        '姓・名はそれぞれ20文字以内にて入力してください。'
    ]
  }
}
</script>
