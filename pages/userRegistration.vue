<template>
  <div>
    <h1>会員登録</h1>
    <div class="mx-12">
      <seimei></seimei>
      <seimeiKana></seimeiKana>
      <sex></sex>
      <birthValue></birthValue>
      <address1></address1>
      <email></email>
      <password></password>
      <tel></tel>
      <username></username>
    </div>
    <v-btn @click="regist">
      会員登録
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { auth } from '@/plugins/firebase'
import seimei from '@/components/UserRegistration1/seimei.vue'
import seimeiKana from '@/components/UserRegistration1/seimeikana.vue'
import address1 from '@/components/UserRegistration1/address.vue'
import sex from '@/components/UserRegistration1/sex.vue'
import birthValue from '@/components/UserRegistration1/birthValue.vue'
import email from '@/components/UserRegistration/email.vue'
import password from '@/components/UserRegistration/password.vue'
import tel from '@/components/UserRegistration/tel.vue'
import username from '@/components/UserRegistration/username.vue'

@Component({
  components: {
    seimei,
    seimeiKana,
    sex,
    birthValue,
    address1,
    email,
    password,
    tel,
    username
  }
})
export default class UserRegistration extends Vue {
  get email() {
    return this.$store.state.registration.email
  }
  get password() {
    return this.$store.state.registration.password
  }
  regist() {
    auth.createUserWithEmailAndPassword(this.email, this.password).then(() => {
      console.log('ok')
    })
  }
}
</script>
