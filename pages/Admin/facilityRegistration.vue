<template>
  <div>
    <h1>施設登録</h1>
    <div class="mx-12">
      <email></email>
      <password></password>
      <resPerson></resPerson>
      <tel></tel>
      <facilityName></facilityName>
      <address1></address1>
      <v-row justify="end" class="mr-12 mt-6 mb-10">
        <v-btn
          color="success"
          width="200"
          height="60"
          class="title"
          @click="regist"
        >
          登録
        </v-btn>
      </v-row>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
// import { auth } from '@/plugins/firebase'
import email from '@/components/FacilityRegistration/facilityEmail.vue'
import password from '@/components/FacilityRegistration/facilityPassword.vue'
import resPerson from '@/components/FacilityRegistration/resPerson.vue'
import tel from '@/components/FacilityRegistration/facilityTel.vue'
import facilityName from '@/components/FacilityRegistration/facilityName.vue'
import address1 from '@/components/FacilityRegistration/facilityAddress.vue'
@Component({
  components: {
    email,
    password,
    resPerson,
    tel,
    facilityName,
    address1
  }
})
export default class facilityRegistration extends Vue {
  // public url = 'https://us-central1-j4k1-b789f.cloudfunctions.net/regist'
  // get email(): string {
  //   return this.$store.state.registration.email
  // }
  // get password(): string {
  //   return this.$store.state.registration.password
  // }
  // get lastName(): string {
  //   return this.$store.state.registration.lastName
  // }
  // get firstName(): string {
  //   return this.$store.state.registration.firstName
  // }
  // get lastNameKana(): string {
  //   return this.$store.state.registration.lastNameKana
  // }
  // get firstNameKana(): string {
  //   return this.$store.state.registration.firstNameKana
  // }
  // get sex(): string {
  //   return this.$store.state.registration.sex
  // }
  // get birthdayYear(): string {
  //   return this.$store.state.registration.birthdayYear
  // }
  // get birthdayMonth(): string {
  //   return this.$store.state.registration.birthdayMonth
  // }
  // get birthdayDay(): string {
  //   return this.$store.state.registration.birthdayDay
  // }
  // get address(): string {
  //   return this.$store.state.registration.address
  // }
  // get address2(): string {
  //   return this.$store.state.registration.address2
  // }
  // get streetAddress(): [...string[]] {
  //   return this.$store.state.registration.streetAddress
  // }
  // get phoneNumber(): string {
  //   return this.$store.state.registration.phoneNumber
  // }
  // get nickname(): string {
  //   return this.$store.state.registration.nickname
  // }
  // async regist() {
  //   await auth
  //     .createUserWithEmailAndPassword(this.email, this.password)
  //     .then(async (user: any) => {
  //       await fetch(this.url, {
  //         method: 'POST',
  //         headers: {
  //           'Content-type': 'application/json'
  //         },
  //         body: JSON.stringify({
  //           uid: user.user.uid,
  //           user: {
  //             lastName: this.lastName,
  //             firstName: this.firstName,
  //             lastNameKana: this.lastNameKana,
  //             firstNameKana: this.firstNameKana,
  //             sex: this.sex,
  //             birthday: `${this.birthdayYear}年${this.birthdayMonth}月${this.birthdayDay}日`,
  //             postalCode: `${this.address}-${this.address2}`,
  //             streetAddress: this.streetAddress,
  //             phoneNumber: this.phoneNumber,
  //             nickname: this.nickname,
  //             userImg:
  //               'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light'
  //           }
  //         })
  //       }).then((result) => {
  //         console.log(result)
  //       })
  //     })
  // }
}
</script>
