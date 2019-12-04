<template>
  <v-card width="850">
    <v-card-title>基本情報変更</v-card-title>
    <v-form class="h-adr">
      <v-container>
        <v-row>
          <v-col cols="6">
            <v-text-field v-model="name" label="姓"></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="name" label="名"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-text-field v-model="name" label="セイ"></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="name" label="メイ"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="email" label="メールアドレス"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <!--郵便番号-->
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <!--住所-->
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field v-model="username" label="ユーザ名"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="plofile"
              label="プロフィールコメント"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class BasicInfo extends Vue {}
</script>
