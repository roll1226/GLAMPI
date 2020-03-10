<template>
  <div>
    <v-radio-group v-model="sex" prepend-icon="mdi-human-male-female" row>
      <v-radio color="rgb(87, 95, 69)" label="男性" value="M"></v-radio>
      <v-radio color="rgb(87, 95, 69)" label="女性" value="F"></v-radio>
    </v-radio-group>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  data() {
    return {
      // sex: 'M'
    }
  }
})
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
