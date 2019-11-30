<template>
  <v-app>
    <Header />
    <nuxt />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Header from '@/components/Header.vue'

@Component({
  components: {
    Header
  }
})
export default class defaultLayout extends Vue {}
</script>
