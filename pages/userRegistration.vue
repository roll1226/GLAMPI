<template>
  <div>
    <h1>会員登録</h1>
    <!-- 姓(sei),名(mei) -->
    <div class="mx-12">
      <seimei></seimei>
      <!-- セイ(seiKana),メイ(meiKana) -->
      <seimeiKana></seimeiKana>
      <!--性別(row)-->
      <row></row>
      <!-- 生年月日(birthValue)-->
      <birthValue></birthValue>
      <!-- 住所(address1)-->
      <address1></address1>
    </div>
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
import seimei from '@/components/UserRegistration1/seimei.vue'
import seimeiKana from '@/components/UserRegistration1/seimeiKana.vue'
import address1 from '@/components/UserRegistration1/address.vue'
import row from '@/components/UserRegistration1/sex.vue'
import birthValue from '@/components/UserRegistration1/birthValue.vue'
import email from '@/components/UserRegistration/email.vue'
import password from '@/components/UserRegistration/password.vue'
import tel from '@/components/UserRegistration/tel.vue'
import username from '@/components/UserRegistration/username.vue'

@Component({
  components: {
    seimei,
    seimeiKana,
    row,
    birthValue,
    address1,
    email,
    password,
    tel,
    username
  }
})
export default class UserRegistration extends Vue {
  dropdown: [...string[]] = []
  dropdown1: [...string[]] = []
  dropdown2: [...string[]] = []

  created() {
    for (let index = 0; index < 120; index++) {
      const year = 1900
      this.dropdown.push(String(year + index))

      for (let index1 = 0; index1 < 12; index1++) {
        const month = 1
        this.dropdown1.push(String(month + index1))

        for (let index2 = 0; index2 < 31; index2++) {
          const day = 1
          this.dropdown2.push(String(day + index2))
        }
      }
    }
  }
}
</script>
