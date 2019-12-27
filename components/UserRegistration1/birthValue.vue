<template>
  <div>
    <v-row>
      <v-col cols="12" sm="4">
        <v-overflow-btn
          v-model="birthValue"
          :items="dropdown"
          label="西暦"
        ></v-overflow-btn>
      </v-col>
      <v-col cols="12" sm="4">
        <v-overflow-btn :items="dropdown1" label="月"></v-overflow-btn>
      </v-col>
      <v-col cols="12" sm="4">
        <v-overflow-btn :items="dropdown2" label="日"></v-overflow-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
@Component
export default class UserRegistration extends Vue {
  dropdown: [...string[]] = []
  dropdown1: [...string[]] = []
  dropdown2: [...string[]] = []

  created() {
    for (let index = 0; index < 120; index++) {
      const year = 1900
      this.dropdown.push(String(year + index))

      for (let index1 = 0; index1 < 12; index1++) {
        const month = 1
        this.dropdown1.push(String(month + index1))

        for (let index2 = 0; index2 < 31; index2++) {
          const day = 1
          this.dropdown2.push(String(day + index2))
        }
      }
    }
  }
}
</script>
