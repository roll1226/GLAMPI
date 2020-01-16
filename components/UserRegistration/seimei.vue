<template>
  <div>
    <v-row>
      <v-col>
        <v-text-field
          v-model="sei"
          label="姓"
          :rules="[rules.seiFormat]"
          prepend-icon="mdi-pencil"
          counter="20"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          v-model="mei"
          label="名"
          :rules="[rules.meiFormat]"
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
    seiFormat: (v: string) => {
      const pattern = /^[亜-黑]{1,20}$/
      return pattern.test(v) || '姓は全角で20文字以内にて必ず入力してください。'
    },
    meiFormat: (v: string) => {
      const pattern = /^[亜-黑]{1,20}$/
      return pattern.test(v) || '名は全角で20文字以内にて必ず入力してください。'
    }
  }
}
</script>
