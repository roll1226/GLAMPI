<template>
  <v-col cols="6">
    <v-card outlined>
      <v-card-text>
        <div class="d-flex justify-space-between">
          <div>
            {{ title }}
          </div>
          <v-btn small outlined>
            変更
          </v-btn>
        </div>

        <template v-if="isInput === 'input'">
          <v-text-field :label="info" single-line></v-text-field>
        </template>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class ChangeInfo extends Vue {
  @Prop({ required: true, default: '' })
  title!: string

  @Prop({ required: true, default: '' })
  info!: string

  @Prop({ required: true, default: '' })
  isInput!: 'input' | 'overflow' | 'date'
}
</script>
