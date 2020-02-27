<template>
  <v-row no-gutters class="mytop-wrap">
    <v-col xs="12">
      <v-card-text>
        <v-card-title>基本情報</v-card-title>
        <ul>
          <li>性別: {{ sex }}</li>
          <li>年齢:{{ age }}</li>
          <li>住所:{{ streetAddress }}</li>
        </ul>
      </v-card-text>
    </v-col>

    <v-divider class="mx-8" inset vertical></v-divider>
    <v-col xs="12">
      <v-card-text>
        <v-card-title>コメント</v-card-title>
        <p>
          {{ comment }}
        </p>
      </v-card-text>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class MyTop extends Vue {
  get sex(): string {
    return this.$store.state.mypage.sex === 'M' ? '男性' : '女性'
  }

  get age(): string {
    return this.$store.state.mypage.birthday
  }

  get streetAddress(): string {
    return this.$store.state.mypage.streetAddress
  }

  get comment(): string {
    return this.$store.state.mypage.comment
  }
}
</script>
