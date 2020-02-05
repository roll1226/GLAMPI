<template>
  <v-card>
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
      <v-row>
        <v-btn outlined="black" @click.stop="dialog = true">
          保存
        </v-btn>
        <div justify="center">
          <v-dialog v-model="dialog" max-width="470">
            <v-card>
              <v-card-text><p>保存しました。</p></v-card-text>
            </v-card>
          </v-dialog>
        </div>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class BasicInfo extends Vue {
  dialog: boolean = false
}
</script>
