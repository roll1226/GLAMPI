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
          <emailCom />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <addressCom />
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
import seimei from '@/components/Mypage/Form/seimei.vue'
import seimeiKana from '@/components/Mypage/Form/seimeiKana.vue'
import emailCom from '@/components/Mypage/Form/email.vue'
import addressCom from '@/components/Mypage/Form/address.vue'
import username from '@/components/Mypage/Form/username.vue'

@Component({
  components: {
    seimei,
    seimeiKana,
    emailCom,
    addressCom,
    username
  }
})
export default class BasicInfo extends Vue {}
</script>
