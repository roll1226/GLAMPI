<template>
  <div>
    <v-row>
      <v-col>
        <v-text-field
          v-model="sei"
          label="姓"
          placeholder="姓"
          :rules="rules.fname"
          prepend-icon="mdi-pencil"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          v-model="mei"
          placeholder="名"
          label="名"
          :rules="rules.lname"
        ></v-text-field>
      </v-col>
    </v-row>
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
  // public mei: string = ''
  get mei(): string {
    return this.$store.state.registration.firstName
  }

  set mei(value: string) {
    this.$store.commit('registration/SET_FIRST_NAME', value)
  }
  public rules: {} = {
    fname: [
      (v: string) => !!v || '姓・名は必ず入力してください',
      (v: string) =>
        (v && v.length <= 20) ||
        '姓・名はそれぞれ20文字以内にて入力してください。'
    ],
    lname: [
      (v: string) => !!v || '姓・名は必ず入力してください',
      (v: string) =>
        (v && v.length <= 20) ||
        '姓・名はそれぞれ20文字以内にて入力してください。'
    ]
  }
}
</script>
