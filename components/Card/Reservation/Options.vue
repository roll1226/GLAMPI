<template>
  <div>
    <v-card class="mx-auto mb-5" max-width="300">
      <v-img
        class="white--text align-end"
        max-height="200px"
        :src="'https://picsum.photos/500/300?image=' + image"
      >
        <v-card-title>
          {{ planTitle }}
        </v-card-title>
      </v-img>

      <v-card-subtitle class="pb-0">{{ pay }}円</v-card-subtitle>

      <v-card-text class="text--primary">
        <div v-for="(text, index) in texts" :key="index">
          {{ text }}
        </div>
      </v-card-text>

      <v-card-actions>
        <v-btn color="orange" text @click="selected(displayName)">
          選ぶ
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class reservation extends Vue {
  public selectedOption: string = ''
  @Prop({ required: true, default: '' })
  planTitle!: string

  @Prop({ required: true, default: '' })
  pay!: string

  @Prop({ default: [] })
  texts!: []

  @Prop({ required: true, default: '' })
  image!: string

  @Prop({ required: true, default: '' })
  displayName!: string

  selected(e: string) {
    this.selectedOption = e
    console.log(this.selectedOption)
  }
}
</script>
