<template>
  <v-container>
    <v-row no-gutters>
      <v-col>
        <seimei />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col>
        <seimeiKana />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col>
        <email />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col>
        <address1 />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col>
        <username></username>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col>
        <v-text-field label="プロフィールコメント"></v-text-field>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col>
        <v-btn>退会</v-btn>
      </v-col>
      <v-col>
        <v-btn>変更</v-btn>
      </v-col>
    </v-row>
  </v-container>
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
