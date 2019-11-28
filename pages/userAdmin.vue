<template>
  <div>
    <h1>
      会員登録
    </h1>
    <v-text-field
      name="mail"
      label="メールアドレス"
      hint="XX@XX.XX"
    ></v-text-field>

    <v-text-field
      v-model="password"
      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
      :type="show1 ? 'text' : 'password'"
      name="input-10-1"
      label="パスワード入力"
      hint="8文字以上のパスワードを入力してください。"
      :rules="[rules.required, rules.min]"
      counter
      @click:append="show1 = !show1"
    ></v-text-field>

    <v-text-field
      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
      :type="show1 ? 'text' : 'password'"
      name="input-10-1"
      label="パスワード確認"
      hint="もう一度入力してください。"
      counter
      @click:append="show1 = !show1"
    ></v-text-field>

    <v-card>
      <v-card-text>
        <v-text-field
          v-model="value"
          v-mask="tell"
          label="電話番号入力"
        ></v-text-field>
      </v-card-text>
    </v-card>

    <v-text-field name="user" label="ユーザ名入力"></v-text-field>

    <v-btn :loading="loading" color="promise" @click="login">
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
      tell: '###-####-####'
    }
  }
})
export default class login extends Vue {
  public user: string = ''
  public password: string = ''
  public show1: boolean = false
  public loading: boolean = false
  public sigin: boolean = false

  value: string = '00000000000'

  public rules: {} = {
    required: (value: string) => !!value || 'Required.',
    min: (v: string) => v.length >= 8 || 'Min 8 characters'
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
