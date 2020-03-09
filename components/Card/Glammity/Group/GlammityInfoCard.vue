<template>
  <v-col>
    <v-card elevation="0">
      <v-card-text>
        <div>
          {{ title }}
        </div>
        <p class="display-1 text--primary mb-0 ml-10">
          {{ info }}
        </p>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class GlammityInfoCard extends Vue {
  @Prop({ required: true, default: '' })
  title!: string

  @Prop({ required: true, default: '' })
  info!: string
}
</script>
