<template>
  <v-card class="mx-auto" max-width="300">
    <v-img class="white--text align-end" height="200px" :src="glammityImage">
      <v-card-title>
        {{ glammityName }}
      </v-card-title>
    </v-img>

    <v-card-subtitle class="pb-0">
      GLAMMITY紹介文
    </v-card-subtitle>

    <v-card-text class="text--primary">
      <div>
        {{ introduction }}
      </div>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>

      <!-- 詳細飛ぶ -->
      <v-btn outlined>
        詳細
      </v-btn>
      <!-- 参加する -->
      <v-btn outlined>
        参加
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class GlammityCard extends Vue {
  @Prop({ required: true, default: '' })
  glammityImage!: string

  @Prop({ required: true, default: '' })
  glammityName!: string

  @Prop({ required: true, default: '' })
  introduction!: string
}
</script>
