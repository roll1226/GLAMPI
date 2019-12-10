<template>
  <div>
    <h1>
      会員登録
    </h1>
    <!-- 姓(sei) -->
    <v-text-field
      v-model="sei"
      label="姓"
      prepend-icon="mdi-"
      :rules="[rules.isFname, rules.fnameLength]"
    ></v-text-field>
    <!-- 名(mei) -->
    <v-text-field
      v-model="mei"
      label="名"
      prepend-icon="mdi-"
      :rules="[rules.isLname, rules.lnameLength]"
    ></v-text-field>
    <!-- セイ(seiKana) -->
    <v-text-field
      v-model="seiKana"
      label="セイ"
      prepend-icon="mdi-"
      :rules="[rules.isFnameKana, rules.fnameKanaLength]"
    ></v-text-field>
    <!-- メイ(meiKana) -->
    <v-text-field
      v-model="meiKana"
      label="メイ"
      prepend-icon="mdi-"
      :rules="[rules.isLnameKana, rules.lnameKanaLength]"
    ></v-text-field>
    <!-- 性別(sex) -->
    <v-radio-group v-model="sex" prepend-icon="mdi-" row>
      <v-radio label="男性" value="M"></v-radio>
      <v-radio label="女性" value="F"></v-radio>
    </v-radio-group>
    <!-- 生年月日(date) -->
    <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      full-width
      min-width="290px"
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          v-model="date"
          label="生年月日"
          prepend-icon="mdi-"
          :rules="rules.isDate"
          readonly
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        ref="picker"
        v-model="date"
        :max="new Date().toISOString().substr(0, 10)"
        min="1950-01-01"
        @change="save"
      ></v-date-picker>
    </v-menu>
    <!-- 郵便番号(postal) -->
    <v-text-field
      v-model="postal"
      v-mask="postalMask"
      label="郵便番号"
      prepend-icon="mdi-"
      :rules="[rules.isPostal]"
    ></v-text-field>
    <!-- 住所(address) -->
    <v-text-field
      v-model="address"
      label="住所"
      prepend-icon="mdi-"
      :rules="[rules.isAddress]"
    ></v-text-field>
    <!-- メールアドレス(email) -->
    <v-text-field
      v-model="email"
      label="E-mail"
      prepend-icon="mdi-email"
      :counter="100"
      :rules="[rules.isEmail, rules.emailLength, rules.emailFormat]"
      hint="XX@XX.XX"
    ></v-text-field>
    <!-- パスワード(password) -->
    <v-text-field
      v-model="password"
      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
      :type="show1 ? 'text' : 'password'"
      name="input-10-1"
      label="パスワード"
      prepend-icon="mdi-lock"
      :rules="[rules.isPassword, rules.passwordLength, rules.passwordFormat]"
      counter
      @click:append="show1 = !show1"
    ></v-text-field>
    <!-- パスワード確認(passwordcheck) -->
    <v-text-field
      v-model="passwordCheck"
      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
      :type="show2 ? 'text' : 'password'"
      label="パスワード確認"
      prepend-icon="mdi-lock"
      hint="パスワードをもう一度入力してください。"
      counter
      @click:append="show2 = !show2"
    ></v-text-field>
    <!-- 電話番号(tel) -->
    <v-text-field
      v-model="tel"
      v-mask="telMask"
      label="電話番号"
      prepend-icon="mdi-phone"
      :rules="[rules.isTel, rules.telFormat]"
    ></v-text-field>
    <!-- ユーザ名(username) -->
    <v-text-field
      v-model="username"
      label="ユーザ名"
      prepend-icon="mdi-account-circle"
      :rules="rules.usernameLength"
    ></v-text-field>

    <!-- <v-btn :loading="loading" color="promise" @click="regist">
      会員登録
    </v-btn> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { auth } from '@/plugins/firebase'
const { mask } = require('vue-the-mask')

@Component({
  directives: {
    mask
  },
  data() {
    return {
      postalMask: '###-####',
      telMask: '###-####-####'
    }
  }
})
export default class login extends Vue {
  public date: string = ''
  public menu: boolean = false
  public picked: string = ''
  public user: string = ''
  public password: string = ''
  public show1: boolean = false
  public loading: boolean = false
  public sigin: boolean = false
  // postal: string = '0000000'
  // tel: string = '00000000000'

  public rules: {} = {
    isFname: (v: string) => !!v || '姓・名は必ず入力してください',
    fnameLength: (v: string) =>
      (v && v.length <= 20) ||
      '姓・名はそれぞれ20文字以内にて入力してください。',
    isLname: (v: string) => !!v || '姓・名は必ず入力してください',
    lnameLength: (v: string) =>
      (v && v.length <= 20) ||
      '姓・名はそれぞれ20文字以内にて入力してください。',
    isFnameKana: (v: string) => !!v || 'セイ・メイは必ず入力してください',
    fnameKanaLength: (v: string) =>
      (v && v.length <= 20) ||
      'セイ・メイはそれぞれ20文字以内にて入力してください。',
    isLnameKana: (v: string) => !!v || 'セイ・メイは必ず入力してください',
    lnameKanaLength: (v: string) =>
      (v && v.length <= 20) ||
      'セイ・メイはそれぞれ20文字以内にて入力してください。',
    isPostal: (v: string) => !!v || '郵便番号は必ず入力してください',
    isAddress: (v: string) => !!v || '住所は必ず入力してください',
    isEmail: (v: string) => !!v || 'メールアドレスは必ず入力してください。',
    emailLength: (v: string) =>
      (v && v.length <= 100) || 'メールアドレスが長すぎます。',
    emailFormat: (v: string) => {
      const pattern = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/
      return (
        pattern.test(v) ||
        'メールアドレスは半角英数字で「XX@XX.XX」の形式にて入力してください。'
      )
    },
    isPassword: (v: string) => !!v || 'パスワードは必ず入力してください。',
    passwordLength: (v: string) =>
      (v.length <= 20 && v.length >= 6) ||
      'パスワードは6桁以上20桁以内にて入力してください。',
    passwordFormat: (v: string) => {
      const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
      return (
        pattern.test(v) ||
        'パスワードは半角英字と、数字の両方を必ず入れてください。'
      )
    },
    isTel: (v: string) => !!v || '電話番号は必ず入力してください。',
    telFormat: (v: string) => {
      const pattern = /^0[9876]0[-]?\d{4}[-]?\d{4}$/
      return (
        pattern.test(v) ||
        '入力された携帯番号は使用されていません。正しい番号を入力してください。'
      )
    },
    usernameLength: (v: string) =>
      (v && v.length <= 20) || 'ユーザ名は20字以内にて入力してください。'
  }

  async login() {
    this.loading = true
    await auth
      .signInWithEmailAndPassword(this.user, this.password)
      .then(() => {
        this.loading = false
        this.sigin = true
      })
      .catch(() => {
        this.loading = false
      })
  }

  async logout() {
    await auth.signOut().then(() => {
      this.sigin = false
    })
  }
}
</script>
