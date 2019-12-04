<template>
  <div>
    <v-btn>
      {{ test }}
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class template extends Vue {
  @Prop({ type: String, required: true }) private test!: string
}
</script>
