<template>
  <div>
    <!--
      rules -> もしuserに入ってなければエラーがでる
     -->
    <div v-if="!test.data">
      <h2>
        ログインしていません
      </h2>
      <LoginModal />
    </div>
    <div v-else>
      <div v-if="test.data.status">
        <h2>
          ログインしています
        </h2>
        <v-btn color="red" @click="logout">
          ログアウト
        </v-btn>
      </div>

      <div v-else>
        <h2>
          ログインしていません
        </h2>
        <LoginModal />
        <p>
          ログイン失敗しました
        </p>
      </div>
      {{ test.data.status }}
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import LoginModal from '@/components/Btn/LoginModal.vue'
@Component({
  components: {
    LoginModal
  },
  computed: {
    isLogin(): any {
      return this.$store.state.login.isLogin
    },
    test(): boolean {
      return this.$store.state.login.test
    }
  }
})
export default class login extends Vue {
  public user: string = ''
  public password: string = ''
  public rules: {} = {
    required: (value: string) => !!value || 'Required.',
    min: (v: string) => v.length >= 8 || 'Min 8 characters'
  }

  logout() {
    this.$store.dispatch('login/loginOut')
  }
}
</script>
