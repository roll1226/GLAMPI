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
              :rules="[rules.isPaymentID, rules.paymentIDLength]"
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
      (v && v.length === 16) || 'カード番号は16桁で入力してください'
    // emailFormat: (v: string) => {
    //   const pattern = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/
    //   return (
    //     pattern.test(v) ||
    //     'メールアドレスは半角英数字で「XX@XX.XX」の形式にて入力してください。'
    //   )
    // }
  }
}
</script>
