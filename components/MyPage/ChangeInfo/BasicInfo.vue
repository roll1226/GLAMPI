<template>
  <div>
    <v-card-title>基本情報変更</v-card-title>
    <!--基本情報変更ページは入力欄に初期値で現在の情報を表示する。-->
    <!--コンポーネントは登録の時のだけどどうするのか？-->
    <v-container>
      <v-row>
        <v-col>
          <seimei />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <seimeiKana />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <email />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <address1 />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <username></username>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field label="プロフィールコメント"></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import seimei from '@/components/mypage/Form/seimei.vue'
import seimeiKana from '@/components/mypage/Form/seimeiKana.vue'
import email from '@/components/mypage/Form/email.vue'
import address1 from '@/components/mypage/Form/address.vue'
import username from '@/components/mypage/Form/username.vue'

@Component({
  components: {
    seimei,
    seimeiKana,
    email,
    address1,
    username
  }
})
export default class BasicInfo extends Vue {}
</script>
