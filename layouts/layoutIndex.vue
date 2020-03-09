<template>
  <v-app style="position: relative;">
    <glampi-head
      :login-btn-class="'login-btn-index'"
      :elevation-head="0"
      style="position: absolute; top: 0; z-index: 5; width: 100%;"
    />
    <nuxt style="overflow: hidden;" />
    <glampi-foot />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import GlampiHead from '@/components/GlampiHead.vue'
import GlampiFoot from '@/components/GlampiFoot.vue'

@Component({
  components: {
    GlampiHead,
    GlampiFoot
  },
  middleware: 'auth'
})
export default class defaultLayout extends Vue {}
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
