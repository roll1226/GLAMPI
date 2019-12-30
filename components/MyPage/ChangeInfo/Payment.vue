<template>
  <v-card width="850">
    <v-card-title>支払い方法変更</v-card-title>
    <!--基本情報変更ページは入力欄に初期値で現在の情報を表示する。-->
    <!--コンポーネントは登録の時のだけどどうするのか？-->
    <v-form>
      <v-container>
        <v-row>
          <v-col>
            <v-text-field
              v-model="paymentID"
              label="カード番号"
              :rules="[
                rules.isPaymentID,
                rules.paymentIDLength,
                rules.paymentIDFormat
              ]"
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
export default class Payment extends Vue {
  public paymentID: string = ''
  // public paymentID: string = ''
  // public paymentID: string = ''

  public rules: {} = {
    isPaymentID: (v: string) => !!v || 'カード番号は必ず入力してください。',
    paymentIDLength: (v: string) =>
      (v && v.length === 16) || 'カード番号は16桁で入力してください',
    paymentIDFormat: (v: string) => {
      const pattern = /^\d{16}$/
      return pattern.test(v) || 'カード番号は半角数字で入力してください。'
    }
  }
}
</script>
