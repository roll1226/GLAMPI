<template>
  <div>
    <Logo />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Logo from '@/components/Logo.vue'

@Component({
  components: {
    Logo
  }
})
export default class IndexPage extends Vue {}
</script>
