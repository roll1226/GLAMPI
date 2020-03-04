<template>
  <div>
    <v-container>
      <v-layout row>
        <v-flex xs4></v-flex>
        <v-flex xs8>
          <v-text-field
            name="input-1-3"
            label="Hint Text"
            single-line
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class ReservationPlan extends Vue {}
</script>
ve
