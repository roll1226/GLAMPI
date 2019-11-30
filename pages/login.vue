<template>
  <div>
    <!--
      rules -> もしuserに入ってなければエラーがでる
     -->
    <div v-if="!isLogin">
      <h2>
        ログイン前
      </h2>
      <LoginModal />
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
