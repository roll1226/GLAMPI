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
      <v-row justify="end" class="mr-12 mt-6 mb-n10">
        <v-btn
          color="grey darken-3 white--text"
          width="200"
          height="60"
          class="title"
          @click="regist"
        >
          会員登録
        </v-btn>
      </v-row>
    </div>
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
  public url = 'https://us-central1-j4k1-b789f.cloudfunctions.net/regist'
  get email(): string {
    return this.$store.state.registration.email
  }
  get password(): string {
    return this.$store.state.registration.password
  }
  get lastName(): string {
    return this.$store.state.registration.lastName
  }
  get firstName(): string {
    return this.$store.state.registration.firstName
  }
  get lastNameKana(): string {
    return this.$store.state.registration.lastNameKana
  }
  get firstNameKana(): string {
    return this.$store.state.registration.firstNameKana
  }
  get sex(): string {
    return this.$store.state.registration.sex
  }
  get birthdayYear(): string {
    return this.$store.state.registration.birthdayYear
  }
  get birthdayMonth(): string {
    return this.$store.state.registration.birthdayMonth
  }
  get birthdayDay(): string {
    return this.$store.state.registration.birthdayDay
  }
  get address(): string {
    return this.$store.state.registration.address
  }
  get address2(): string {
    return this.$store.state.registration.address2
  }
  get streetAddress(): [...string[]] {
    return this.$store.state.registration.streetAddress
  }
  get phoneNumber(): string {
    return this.$store.state.registration.phoneNumber
  }
  get nickname(): string {
    return this.$store.state.registration.nickname
  }
  async regist() {
    await auth
      .createUserWithEmailAndPassword(this.email, this.password)
      .then(async (user: any) => {
        await fetch(this.url, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            uid: user.user.uid,
            user: {
              lastName: this.lastName,
              firstName: this.firstName,
              lastNameKana: this.lastNameKana,
              firstNameKana: this.firstNameKana,
              sex: this.sex,
              birthday: `${this.birthdayYear}年${this.birthdayMonth}月${this.birthdayDay}日`,
              postalCode: `${this.address}-${this.address2}`,
              streetAddress: this.streetAddress,
              phoneNumber: this.phoneNumber,
              nickname: this.nickname,
              userImg:
                'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light'
            }
          })
        }).then((result) => {
          console.log(result)
        })
      })
  }
}
</script>
