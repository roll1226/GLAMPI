<template>
  <v-row class="flex-column">
    <seimei />
    <seimeiKana />
    <email />
    <addressForm />
    <username />
    <comment />
    <v-row>
      <v-col>
        <v-btn>退会</v-btn>
      </v-col>
      <v-col>
        <v-btn>変更</v-btn>
      </v-col>
    </v-row>
  </v-row>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import seimei from '@/components/MyPage/Form/seimei.vue'
import seimeiKana from '@/components/MyPage/Form/seimeiKana.vue'
import email from '@/components/MyPage/Form/email.vue'
import addressForm from '@/components/MyPage/Form/address.vue'
import username from '@/components/MyPage/Form/username.vue'
import comment from '@/components/MyPage/Form/comment.vue'

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
