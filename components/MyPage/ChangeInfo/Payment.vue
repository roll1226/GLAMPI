<template>
  <v-container>
    <v-form>
      <v-row>
        <v-col>
          <v-text-field
            v-model="paymentCardID"
            label="カード番号"
            :rules="[
              rules.isPaymentCardID,
              rules.paymentCardIDLength,
              rules.paymentCardIDFormat
            ]"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="4">
          <v-overflow-btn
            v-model="paymentCardMonth"
            :items="dropdown"
            label="有効期限：月"
            :rules="[rules.isPaymentCardMonth]"
          ></v-overflow-btn>
        </v-col>
        <v-col cols="12" sm="4">
          <v-overflow-btn
            v-model="paymentCardYear"
            :items="dropdown1"
            label="有効期限：年"
            :rules="[rules.isPaymentCardYear]"
          ></v-overflow-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col sm="3">
          <v-text-field
            v-model="paymentCardSecurityNumber"
            label="セキュリティ番号"
            :rules="[
              rules.isPaymentCardSecurityNumber,
              rules.paymentCardSecurityNumberLength,
              rules.paymentCardSecurityNumberFormat
            ]"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class Payment extends Vue {
  public paymentCardID: string = ''
  public paymentCardMonth: string = ''
  public paymentCardYear: string = ''
  public paymentCardSecurityNumber: string = ''
  dropdown: [...string[]] = []
  dropdown1: [...string[]] = []

  public rules: {} = {
    isPaymentCardID: (v: string) => !!v || 'カード番号は必ず入力してください。',
    paymentCardIDLength: (v: string) =>
      (v && v.length === 16) || 'カード番号は16桁にて入力してください',
    paymentCardIDFormat: (v: string) => {
      const pattern = /^\d{16}$/
      return pattern.test(v) || 'カード番号は半角数字にて入力してください。'
    },
    isPaymentCardMonth: (v: string) =>
      !!v || '有効期限：月は必ず入力してください。',
    isPaymentCardYear: (v: string) =>
      !!v || '有効期限：年は必ず入力してください。',
    isPaymentCardSecuritynumber: (v: string) =>
      !!v || 'セキュリティ番号は必ず入力してください。',
    paymentCardSecurityNumberLength: (v: string) =>
      (v && v.length === 3) || 'セキュリティ番号は3桁にて入力してください',
    paymentCardSecurityNumberFormat: (v: string) => {
      const pattern = /^\d{3}$/
      return (
        pattern.test(v) || 'セキュリティ番号は半角数字にて入力してください。'
      )
    }
  }

  created() {
    for (let index = 0; index < 12; index++) {
      const month = 1
      this.dropdown.push(String(month + index))

      for (let index = 0; index < 101; index++) {
        const year = 2020
        this.dropdown1.push(String(year + index))
      }
    }
  }
}
</script>
