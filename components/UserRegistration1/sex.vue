<template>
  <div>
    <v-radio-group v-model="sex" row prepend-icon="mdi-human-male-female">
      <v-radio label="男性" value="M"></v-radio>
      <v-radio label="女性" value="F"></v-radio>
    </v-radio-group>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class sexUserRegistration extends Vue {
  // public sex: string = ''
  get sex(): string {
    return this.$store.state.registration.sex
  }

  set sex(value: string) {
    this.$store.commit('registration/SET_SEX', value)
  }
}
</script>
