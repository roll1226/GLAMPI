<template>
  <div>
    <Logo />
    <nuxt-link to="/login">
      ログイン
    </nuxt-link>
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
