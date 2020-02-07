<template>
  <v-app style="position: relative;">
    <grampi-head
      :login-btn-class="'login-btn-index'"
      :elevation-head="0"
      style="position: absolute; top: 0; z-index: 5; width: 100%;"
    />
    <nuxt style="overflow: hidden;" />
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
