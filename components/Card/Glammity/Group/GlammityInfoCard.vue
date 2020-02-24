<template>
  <v-col cols="6">
    <v-card outlined>
      <v-card-text>
        <div>Word of the Day</div>
        <p class="display-1 text--primary mb-0">
          be•nev•o•lent
        </p>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class GlammityInfoCard extends Vue {}
</script>
