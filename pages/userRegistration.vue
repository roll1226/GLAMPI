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
    <email></email>
    <!-- パスワード(password) -->
    <password></password>
    <!-- パスワード確認(passwordcheck) -->
    <passwordCheck></passwordCheck>
    <!-- 電話番号(tel) -->
    <tel></tel>
    <!-- ユーザ名(username) -->
    <username></username>
    <!-- <v-btn :loading="loading" color="promise" @click="regist">
      会員登録
    </v-btn> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { auth } from '@/plugins/firebase'
import email from '@/components/UserRegistration/email.vue'
import password from '@/components/UserRegistration/password.vue'
import passwordCheck from '@/components/UserRegistration/passwordCheck.vue'
import tel from '@/components/UserRegistration/tel.vue'
import username from '@/components/UserRegistration/username.vue'
const { mask } = require('vue-the-mask')

@Component({
  directives: {
    mask
  },
  components: {
    email,
    password,
    passwordCheck,
    tel,
    username
  },
  data() {
    return {
      postalMask: '###-####',
      telMask: '###-####-####'
    }
  }
})
export default class UserRegistration extends Vue {
  public date: string = ''
  public menu: boolean = false
  public picked: string = ''
  public user: string = ''
  public password: string = ''
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
    isAddress: (v: string) => !!v || '住所は必ず入力してください'
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
