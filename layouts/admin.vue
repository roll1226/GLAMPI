<template>
  <v-app style="overflow: hidden;">
    <grampi-admin-head />
    <nuxt />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import GrampiAdminHead from '@/components/GlampiAdminHead.vue'

@Component({
  components: {
    GrampiAdminHead
  },
  middleware: 'adminAuth'
})
export default class adminLayout extends Vue {}
</script>

<style lang="scss">
.theme--light.v-application {
  background: #ffffff;
  background-image: initial;
  background-position-x: initial;
  background-position-y: initial;
  background-size: initial;
  background-attachment: initial;
  background-origin: initial;
  background-clip: initial;
  background-color: rgb(255, 255, 255);
}
</style>
