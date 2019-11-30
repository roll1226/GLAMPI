<template>
  <div>
    <v-toolbar class="mb-5" dense>
      <v-toolbar-title>
        GLAMPI
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <LoginModal />

      <v-btn text small color="green">
        会員登録
      </v-btn>
    </v-toolbar>
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
    isLogin(): boolean {
      return this.$store.state.login.isLogin
    }
  }
})
export default class header extends Vue {}
</script>
