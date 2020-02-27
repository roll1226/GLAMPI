<template>
  <div>
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
        <addressForm />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col>
        <username></username>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col>
        <comment></comment>
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
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import seimei from '@/components/mypage/Form/seimei.vue'
import seimeiKana from '@/components/mypage/Form/seimeiKana.vue'
import email from '@/components/mypage/Form/email.vue'
import addressForm from '@/components/mypage/Form/address.vue'
import username from '@/components/mypage/Form/username.vue'
import comment from '@/components/mypage/Form/comment.vue'

@Component({
  components: {
    seimei,
    seimeiKana,
    email,
    addressForm,
    username,
    comment
  }
})
export default class BasicInfo extends Vue {}
</script>
