<template>
  <div class="mytop-wrap">
    <v-row no-gutters>
      <v-col xs="12">
        <v-card-text class="pr-10">
          <v-card-title>基本情報</v-card-title>
          <ul>
            <li>性別: {{ sex }}</li>
            <li>年齢:{{ age }}</li>
            <li>住所:{{ address }}</li>
          </ul>
        </v-card-text>
      </v-col>

      <v-divider inset vertical></v-divider>
      <v-col xs="12">
        <v-card-text class="pl-10">
          <v-card-title>コメント</v-card-title>
          <p>
            {{ comment }}
          </p>
        </v-card-text>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class MyTop extends Vue {
  public sex: number = 1
  public age: number = 20
  public address: String =
    'あああああああああああああああああああああああああああああああああああああああああああああああああああああああ'
  public comment: String =
    'あああああああああああああああああああああああああああああああああああああああああああああああああああああああ'
}
</script>
