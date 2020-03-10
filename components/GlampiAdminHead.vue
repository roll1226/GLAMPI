<template>
  <div>
    <v-toolbar dense width="100%" :elevation="0" color="grey lighten-2">
      <div width="132px">
        <v-img width="132px" :src="require('@/assets/svg/logo.svg')"></v-img>
      </div>

      <v-spacer></v-spacer>

      <template v-if="isLogin">
        <v-btn text small color="black" @click="logout">
          ログアウト
        </v-btn>
      </template>
    </v-toolbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class GlampiAdminHead extends Vue {
  get isLogin(): boolean {
    return this.$store.state.adminLogin.isLogin
  }

  logout() {
    this.$store.dispatch('adminLogin/logout')
    this.$router.push('/officerAdminFacility/login')
  }
}
</script>

<style lang="scss" scoped>
.logo {
  margin-left: 12px;
}
.theme--light.v-btn--active:hover::before,
.theme--light.v-btn--active::before {
  opacity: 0;
}

.theme--light.v-btn:hover::before {
  opacity: 0;
}

.mypage-btn {
  &.theme--light.v-btn {
    color: $site_color_2;
    caret-color: $site_color_2;
    background-color: rgba(255, 255, 255, 0.3);
  }
}
</style>
