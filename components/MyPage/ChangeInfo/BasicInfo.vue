<template>
  <div>
    <v-card-title>基本情報変更</v-card-title>
    <!--基本情報変更ページは入力欄に初期値で現在の情報を表示する。-->
    <!--コンポーネントは登録の時のだけどどうするのか？-->
    <v-container>
      <v-row>
        <v-col cols="6">
          <v-text-field label="姓"></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field label="名"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-text-field label="セイ"></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field label="メイ"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12"><email></email></v-col>
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
          <username></username>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field label="プロフィールコメント"></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import email from '@/components/UserRegistration/email.vue'
import username from '@/components/UserRegistration/username.vue'

@Component({
  components: {
    email,
    username
  }
})
export default class BasicInfo extends Vue {}
</script>
