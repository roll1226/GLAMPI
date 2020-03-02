<template>
  <v-col cols="6">
    <v-card outlined>
      <v-card-text>
        <div>
          {{ title }}
        </div>
        <p class="display-1 text--primary mb-0">
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
