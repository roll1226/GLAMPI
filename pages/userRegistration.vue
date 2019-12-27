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
    <address1></address1>
    <div class="mx-12">
      <email></email>
      <password></password>
      <tel></tel>
      <username></username>
    </div>
    <v-btn :loading="loading" color="promise" justify="end" @click="regist">
      会員登録
    </v-btn>
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
import tel from '@/components/UserRegistration/tel.vue'
import username from '@/components/UserRegistration/username.vue'

@Component({
  components: {
    sei,
    mei,
    seiKana,
    meiKana,
    row,
    address1,
    email,
    password,
    tel,
    username
  }
})
export default class UserRegistration extends Vue {}
</script>
