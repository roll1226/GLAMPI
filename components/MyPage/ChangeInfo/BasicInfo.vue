<template>
  <v-card width="850">
    <v-card-title>基本情報変更</v-card-title>
    <v-form>
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
            <v-text-field label="ユーザ名"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field label="プロフィールコメント"></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import email from '@/components/UserRegistration/email.vue'

@Component({
  components: {
    email
  }
})
export default class BasicInfo extends Vue {}
</script>
