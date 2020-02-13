<template>
  <div>
    <v-card-text>
      <v-row>
        <v-col lg="6" md="6" sm="6" xs="12">
          <v-card-title>基本情報</v-card-title>
          <v-card-text>
            <ul>
              <li>性別: {{ sex }}</li>
              <li>年齢:{{ age }}</li>
              <li>住所:{{ address }}</li>
            </ul>
          </v-card-text>
        </v-col>

        <v-col>
          <v-card-title>コメント</v-card-title>
          <v-card-text>
            <p>abcdefg</p>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card-text>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class MyTop extends Vue {
  public sex: number = 1
  public age: number = 20
  public address: String = '東京都'
}
</script>
