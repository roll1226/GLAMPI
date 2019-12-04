<template>
  <div>
    <h2>
      ログイン
    </h2>

    <!-- rules -> もしuserに入ってなければエラーがでる -->
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
        ログイン中
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

import LoginModal from '@/components/Btn/LoginModal.vue'

@Component({
  components: {
    LoginModal
  },
  computed: {
    isLogin(): boolean {
      return this.$store.state.login.isLogin
    }
  }
})
export default class login extends Vue {
  async logout() {
    await auth.signOut().then(() => {
      this.$store.commit('login/IS_LOGIN', false)
    })
  }
}
</script>
