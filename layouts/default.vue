<template>
  <v-app>
    <grampi-head />
    <nuxt />
    <grampi-foot />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import GrampiHead from '@/components/GrampiHead.vue'
import GrampiFoot from '@/components/GrampiFoot.vue'

@Component({
  components: {
    GrampiHead,
    GrampiFoot
  },
  middleware: 'auth'
})
export default class defaultLayout extends Vue {}
</script>
