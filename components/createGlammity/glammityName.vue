<template>
  <div>
    <v-text-field
      v-model="glammityName"
      label="glammity名"
      counter="20"
    ></v-text-field>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class template extends Vue {}
</script>
