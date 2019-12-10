<template>
  <div>
    <h1>会員登録</h1>
    <v-text-field
      v-model="sei"
      label="姓"
      placeholder="姓"
      :rules="rules.fname"
    ></v-text-field>

    <v-text-field
      v-model="mei"
      placeholder="名"
      label="名"
      :rules="rules.lname"
    ></v-text-field>

    <v-text-field
      v-model="sei1"
      placeholder="セイ"
      label="セイ"
      :rules="rules.fname1"
    ></v-text-field>

    <v-text-field
      v-model="mei1"
      placeholder="メイ"
      label="メイ"
      :rules="rules.lname1"
    ></v-text-field>

    <v-radio-group v-model="row" row>
      <v-radio label="男性" value="M"></v-radio>
      <v-radio label="女性" value="F"></v-radio>
    </v-radio-group>

    <v-card>
      <v-card-text>
        <v-text-field
          v-model="birthValue"
          v-mask="birth"
          label="生年月日"
        ></v-text-field>
      </v-card-text>
    </v-card>

    <v-date-picker
      min="1900-01-01"
      max="2019-01-01"
      :allowed-dates="allowedDate"
    ></v-date-picker>

    <v-card>
      <v-card-text>
        <v-text-field
          v-model="addressValue"
          v-mask="address"
          label="郵便番号入力"
        ></v-text-field>
      </v-card-text>
    </v-card>
    <v-text-field v-model="address1" label="住所"></v-text-field>
    <v-text-field
      name="email"
      label="E-mail"
      :counter="100"
      :rules="rules.emailRules"
      hint="XX@XX.XX"
    ></v-text-field>

    <v-text-field
      v-model="password"
      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
      :type="show1 ? 'text' : 'password'"
      name="input-10-1"
      label="パスワード"
      :rules="[rules.required, rules.min]"
      counter
      @click:append="show1 = !show1"
    ></v-text-field>

    <v-text-field
      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
      :type="show1 ? 'text' : 'password'"
      name="input-10-2"
      label="パスワード確認"
      hint="パスワードをもう一度入力してください。"
      counter
      @click:append="show1 = !show1"
    ></v-text-field>

    <v-card>
      <v-card-text>
        <v-text-field
          v-model="telValue"
          v-mask="tel"
          label="電話番号"
        ></v-text-field>
      </v-card-text>
    </v-card>

    <v-text-field
      name="username"
      label="ユーザ名"
      :rules="rules.nameRules"
    ></v-text-field>

    <v-btn :loading="loading" color="promise" @click="regist">
      ログイン
    </v-btn>
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
      birth: '####/##/##',
      address: '###-####',
      tel: '###-####-####'
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
  addressValue: string = '0000000'
  telValue: string = '00000000000'

  public rules: {} = {
    fname: [
      (v: string) => !!v || '姓・名は必ず入力してください',
      (v: string) =>
        (v && v.length <= 20) ||
        '姓・名はそれぞれ20文字以内にて入力してください。'
    ],
    lname: [
      (v: string) => !!v || '姓・名は必ず入力してください',
      (v: string) =>
        (v && v.length <= 20) ||
        '姓・名はそれぞれ20文字以内にて入力してください。'
    ],
    fname1: [
      (v: string) => !!v || 'セイ・メイは必ず入力してください',
      (v: string) =>
        (v && v.length <= 20) ||
        'セイ・メイはそれぞれ20文字以内にて入力してください。'
    ],
    lname1: [
      (v: string) => !!v || 'セイ・メイは必ず入力してください',
      (v: string) =>
        (v && v.length <= 20) ||
        'セイ・メイはそれぞれ20文字以内にて入力してください。'
    ],

    emailRules: [
      (v: string) => !!v || 'メールアドレスは必ず入力してください。',
      (v: string) => (v && v.length <= 100) || 'メールアドレスが長すぎます。',
      (v: string) =>
        /.+@.+\..+/.test(v) ||
        'メールアドレスは「XX@XX.XX」の形式にて入力してください。'
    ],
    required: (value: string) =>
      !!value || 'パスワードは必ず入力してください。',
    min: (v: string) =>
      (v.length <= 20 && v.length >= 6) ||
      'パスワードは6桁以上20桁以内にて入力してください。',
    nameRules: [
      (v: string) =>
        (v && v.length <= 20) || 'ユーザ名は20字以内にて入力してください。'
    ]
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
