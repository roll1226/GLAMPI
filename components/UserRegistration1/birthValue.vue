<template>
  <div>
    <v-row>
      <v-col cols="12" sm="4">
        <v-overflow-btn v-model="birthValue" :items="dropdown"></v-overflow-btn>
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
@Component
export default class virthValueUserRegistration extends Vue {
  public dropdown: string = ''
  data: {} = {
    dropdown: ['Arial', 'Calibri', 'Courier', 'Verdana']
  }
}
</script>
