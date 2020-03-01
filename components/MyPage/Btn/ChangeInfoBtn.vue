<template>
  <v-btn-toggle mandatory class="change-info-btn">
    <!--v-model="toggle" data()toggle:undefined-->
    <v-container class="ma-0 pa-0">
      <v-row no-gutters>
        <v-col>
          <v-btn block @click="changeScreen(0)">基本情報変更</v-btn>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col>
          <v-btn block @click="changeScreen(1)">支払い方法変更</v-btn>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col>
          <v-btn block @click="changeScreen(2)">パスワード変更</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-btn-toggle>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
@Component
export default class ChangeInfoBtn extends Vue {
  changeScreen(number: number) {
    this.$store.commit('mypage/SET_SCREEN_NUMBER', number)
  }
}
</script>
