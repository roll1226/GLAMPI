<template>
  <div>
    <v-overflow-btn v-model="sisetuName" :items="dropdown"></v-overflow-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class template extends Vue {}
</script>
