<template>
  <div>
    <v-radio-group v-model="row" row prepend-icon="mdi-human-male-female">
      <v-radio label="男性" value="M"></v-radio>
      <v-radio label="女性" value="F"></v-radio>
    </v-radio-group>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class sexUserRegistration extends Vue {
  public row: string = ''
}
</script>
