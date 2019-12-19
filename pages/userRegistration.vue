<template>
  <div>
    <h1>会員登録</h1>
    <!-- 姓(sei) -->
    <sei></sei>
    <!-- 名(mei) -->
    <mei></mei>
    <!-- セイ(seiKana) -->
    <seiKana></seiKana>
    <!-- メイ(meiKana) -->
    <meiKana></meiKana>
    <!--性別(row)-->
    <row></row>
    <!-- 生年月日(birthValue)-->
    <v-row>
      <v-col cols="12" sm="4">
        <v-overflow-btn :items="dropdown"></v-overflow-btn>
      </v-col>
    </v-row>
    <!-- 住所(address) -->
    <address1></address1>
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
import sei from '@/components/UserRegistration1/sei.vue'
import mei from '@/components/UserRegistration1/mei.vue'
import seiKana from '@/components/UserRegistration1/seikana.vue'
import meiKana from '@/components/UserRegistration1/meikana.vue'
import address1 from '@/components/UserRegistration1/address.vue'
import row from '@/components/UserRegistration1/sex.vue'
import email from '@/components/UserRegistration/email.vue'
import password from '@/components/UserRegistration/password.vue'
import passwordCheck from '@/components/UserRegistration/passwordCheck.vue'
import tel from '@/components/UserRegistration/tel.vue'
import username from '@/components/UserRegistration/username.vue'
import { auth } from '@/plugins/firebase'

@Component({
  components: {
    email,
    password,
    passwordCheck,
    tel,
    username,
    sei,
    mei,
    seiKana,
    meiKana,
    address1,
    row
  }
})
export default class UserRegistration extends Vue {
  public user: string = ''
  public password: string = ''
  public loading: boolean = false
  public sigin: boolean = false

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
