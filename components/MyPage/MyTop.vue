<template>
  <div class="d-flex">
    <v-card width="350" height="200" class="mr-3">
      <v-card-title>基本情報</v-card-title>
      <v-card-text>
        <ul>
          <li>性別</li>
          <li>年齢</li>
          <li>住所</li>
        </ul>
      </v-card-text>
    </v-card>
    <v-card width="350" height="200">
      <v-card-title>コメント</v-card-title>
      <v-card-text>
        <p>abcdefg</p>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class MyTop extends Vue {}
</script>
