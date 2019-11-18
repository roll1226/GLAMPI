<template>
  <div>
    <h1>
      ログイン
    </h1>
    ユーザ名<input v-model="user" type="text" />
    <br />
    パスワード<input v-model="pass" type="password" />
    <!--"v-vtn":ボタン-->
    <v-btn color="red" @click="look">
      みる
    </v-btn>
    <!--変数に入力値を格納-->
    {{ user }}
    <!--"v-show":trueの時見えて、falseの時見えないブロック-->
    <div v-show="bool">
      {{ pass }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class Login extends Vue {
  public user: string = '' // userの入力値string以外はダメ
  public pass: string = ''
  public bool: boolean = false

  look() {
    console.log('hoge1')
    if (this.pass === '') return
    console.log('hoge2')
    this.bool = true
  }
}
</script>
