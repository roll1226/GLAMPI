<template>
  <div>
    <v-img
      src="https://firebasestorage.googleapis.com/v0/b/j4k1-b789f.appspot.com/o/glampy%2Ftop.jpg?alt=media&token=01d75370-7f04-4932-b3dd-c9d286798a01"
      aspect-ratio="1"
      class="grey lighten-2"
      max-height="540"
      style="display: flex; flex-flow: row nowrap; justify-content: center; align-items: center;"
      gradient="rgba(255,255,255,.4), rgba(255,255,255,.4)"
    >
      <SearchInput
    /></v-img>

    <v-row>
      <v-col>
        <h3 class="ml-10" style="color: #575f45;">
          GLAMMITY
        </h3>
      </v-col>
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
