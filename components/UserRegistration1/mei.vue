<template>
  <div>
    <v-text-field
      v-model="mei"
      placeholder="名"
      label="名"
      :rules="rules.lname"
    ></v-text-field>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class meiUserRegistration extends Vue {
  public mei: string = ''
  public rules: {} = {
    lname: [
      (v: string) => !!v || '姓・名は必ず入力してください',
      (v: string) =>
        (v && v.length <= 20) ||
        '姓・名はそれぞれ20文字以内にて入力してください。'
    ]
  }
}
</script>
