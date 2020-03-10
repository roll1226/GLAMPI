<template>
  <div>
    <h2 class="text-center mt-10" style="color: rgb(87, 95, 69);">
      ユーザ登録
    </h2>

    <v-divider
      width="600"
      class="mt-3 mb-4 mx-auto"
      color="rgb(87, 95, 69)"
    ></v-divider>

    <v-row justify="center">
      <v-col cols="7" class="mx-12">
        <v-form ref="form" v-model="valid" :lazy-validation="lazy">
          <seimei></seimei>
          <seimeiKana></seimeiKana>
          <sex></sex>
          <birthValue></birthValue>
          <address1></address1>
          <email></email>
          <password></password>
          <tel></tel>
          <username></username>
        </v-form>
        <v-row justify="end" class="my-4">
          <v-btn
            outlined
            color="rgb(87, 95, 69)"
            :disabled="!valid"
            :loading="loading"
            @click="regist"
          >
            会員登録
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { auth } from '@/plugins/firebase'
import seimei from '@/components/UserRegistration/seimei.vue'
import seimeiKana from '@/components/UserRegistration/seimeikana.vue'
import address1 from '@/components/UserRegistration/address.vue'
import sex from '@/components/UserRegistration/sex.vue'
import birthValue from '@/components/UserRegistration/birthValue.vue'
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
  loading: boolean = false
  public valid: boolean = true
  public lazy: boolean = false
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
  get streetAddress(): string {
    return this.$store.state.registration.streetAddress
  }
  get phoneNumber(): string {
    return this.$store.state.registration.phoneNumber
  }
  get nickname(): string {
    return this.$store.state.registration.nickname
  }
  get postCode(): string {
    return this.$store.state.registration.postCode
  }

  async regist() {
    this.loading = true
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
              email: this.email,
              lastName: this.lastName,
              firstName: this.firstName,
              lastNameKana: this.lastNameKana,
              firstNameKana: this.firstNameKana,
              sex: this.sex,
              birthday: `${this.birthdayYear}年${this.birthdayMonth}月${this.birthdayDay}日`,
              postalCode: `${this.postCode}`,
              streetAddress: this.streetAddress,
              phoneNumber: this.phoneNumber,
              nickname: this.nickname,
              userImg:
                'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light',
              comment: 'よろしくお願いします。'
            }
          })
        }).then((result) => {
          console.log(result)
          this.loading = false
          this.$router.push('/')
        })
      })
  }
}
</script>
