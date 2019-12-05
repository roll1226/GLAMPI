<template>
  <div>
    <h1>
      会員登録
    </h1>
    <!--姓-->
    <v-text-field
      v-model="sei"
      label="姓"
      placeholder="姓"
      :rules="rules.fname"
    ></v-text-field>
    <!--名-->
    <v-text-field
      v-model="mei"
      label="名"
      placeholder="名"
      :rules="rules.lname"
    ></v-text-field>
    <!--セイ-->
    <v-text-field
      v-model="sei"
      label="セイ"
      placeholder="セイ"
      :rules="rules.fname1"
    ></v-text-field>
    <v-text-field
      v-model="mei"
      label="メイ"
      placeholder="メイ"
      :rules="rules.lname1"
    ></v-text-field>
    <input id="M" v-model="picked" type="radio" value="M" />
    <label for="M">男性</label>
    <br />
    <input id="F" v-model="picked" type="radio" value="F" />
    <label for="F">女性</label>
    <br />
    <!-- //生年月日 -->
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
    <!--郵便番号-->
    <v-card>
      <v-card-text>
        <v-text-field
          v-model="addressValue"
          v-mask="address"
          label="郵便番号番号入力"
        ></v-text-field>
      </v-card-text>
    </v-card>
    <v-text-field v-model="sei" label="住所" placeholder="住所"></v-text-field>

    <v-text-field
      name="email"
      label="E-mail"
      :counter="100"
      :rules="[rules.isEmail, rules.emailLength, rules.emailFormat]"
      hint="XX@XX.XX"
    ></v-text-field>

    <v-text-field
      v-model="password"
      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
      :type="show1 ? 'text' : 'password'"
      name="input-10-1"
      label="パスワード"
      :rules="[rules.required, rules.min, rules.passwordFormat]"
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
          :rules="rules.telRules"
        ></v-text-field>
      </v-card-text>
    </v-card>

    <v-text-field
      name="username"
      label="ユーザ名"
      :rules="rules.nameRules"
    ></v-text-field>

    <!-- <v-btn :loading="loading" color="promise" @click="regist">
      ログイン
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
    required: (v: string) => !!v || 'パスワードは必ず入力してください。',
    min: (v: string) =>
      (v.length <= 20 && v.length >= 6) ||
      'パスワードは6桁以上20桁以内にて入力してください。',
    passwordFormat: (v: string) => {
      const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
      return (
        pattern.test(v) ||
        'パスワードは半角英字と、数字の両方を必ず入れてください。'
      )
    },
    nameRules: [
      (v: string) =>
        (v && v.length <= 20) || 'ユーザ名は20字以内にて入力してください。'
    ],
    telRules: [
      (v: string) => !!v || '電話番号は必ず入力してください。',
      (v: string) => {
        const pattern = /^0[9876]0[-]?\d{4}[-]?\d{4}$/
        return (
          pattern.test(v) ||
          '入力された携帯番号は使用されていません。正しい番号を入力してください。'
        )
      }
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
