<template>
  <div>
    <v-row align="center" justify="center">
      <v-img
        src="https://glmd.jp/wp-content/themes/glamd/img/test.jpg"
        aspect-ratio="1"
        class="grey lighten-2"
        max-height="640"
        style="display: flex; flex-flow: row nowrap; justify-content: center; align-items: center;"
      >
        <SearchInput
      /></v-img>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Logo from '@/components/Logo.vue'
import SearchInput from '@/components/Input/Search/SearchInput.vue'

@Component({
  components: {
    Logo,
    SearchInput
  }
})
export default class IndexPage extends Vue {}
</script>
