<template>
  <v-card width="500">
    <v-card-text>
      <v-row>
        <v-col lg="6" md="6" sm="6" xs="12">
          <v-card>
            <v-card-title>基本情報</v-card-title>
            <v-card-text>
              <ul>
                <li>
                  性別: 女
                </li>
                <li>年齢</li>
                <li>
                  住所:あああああああああああああああああああああああああああああああああああああああああああああああああ
                </li>
              </ul>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col>
          <v-card>
            <v-card-title>コメント</v-card-title>
            <v-card-text>
              <p>abcdefg</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class MyTop extends Vue {}
</script>
