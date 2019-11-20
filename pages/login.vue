<template>
  <div>
    <h2>
      ログイン
    </h2>

    <!--
      rules -> もしuserに入ってなければエラーがでる
     -->
    <div v-if="!sigin">
      <v-text-field
        ref="name"
        v-model="user"
        :rules="[() => !!user || '入力しろ']"
        label="ユーザ名"
      ></v-text-field>

      <v-text-field
        v-model="password"
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show1 ? 'text' : 'password'"
        :rules="[rules.required, rules.min]"
        name="input-10-1"
        label="パスワード入力"
        hint="8文字以上のパスワードを入力してください。"
        counter
        @click:append="show1 = !show1"
      ></v-text-field>

      <v-btn :loading="loading" color="promise" @click="login">
        ログイン
      </v-btn>
    </div>

    <div v-else>
      <h2>
        ログイン成功
      </h2>
      <v-btn @click="logout">
        ログアウト
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { auth } from '@/plugins/firebase'

@Component
export default class login extends Vue {
  public user: string = ''
  public password: string = ''
  public show1: boolean = false
  public loading: boolean = false
  public sigin: boolean = false

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
