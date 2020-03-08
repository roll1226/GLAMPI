<template>
  <div class="py-10">
    <v-card outlined width="800" class="mx-auto mt-5">
      <v-card-title class="flex-column">
        <img
          src="@/assets/svg/logoBg.svg"
          width="200px"
          class="mx-auto d-block"
          alt="GLAMPI"
        />

        <h1 class="text-center display-1 mt-5 grey--text">
          施設登録
        </h1>
      </v-card-title>

      <v-card-text>
        <FacilityEmailRegistration />
        <FacilityPasswordRegistration />
        <FacilityRegistrationOfficerName />
        <FacilityTelRegistration />
        <FacilityFacilityNameRegistration />
        <FacilityAddressRegistration />
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn outlined color="grey darken-1" @click="regist">
          登録
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { auth, firestore } from '@/plugins/firebase'
import FacilityEmailRegistration from '@/components/FacilityRegistration/FacilityEmail.vue'
import FacilityPasswordRegistration from '@/components/FacilityRegistration/FacilityPassword.vue'
import FacilityRegistrationOfficerName from '@/components/FacilityRegistration/FacilityOfficerName.vue'
import FacilityTelRegistration from '@/components/FacilityRegistration/FacilityPhoneNumber.vue'
import FacilityFacilityNameRegistration from '@/components/FacilityRegistration/FacilityName.vue'
import FacilityAddressRegistration from '@/components/FacilityRegistration/FacilityAddress.vue'
const uuid = require('uuid/v4')

@Component({
  components: {
    FacilityEmailRegistration,
    FacilityPasswordRegistration,
    FacilityRegistrationOfficerName,
    FacilityTelRegistration,
    FacilityFacilityNameRegistration,
    FacilityAddressRegistration
  },
  layout: 'admin'
})
export default class facilityRegistration extends Vue {
  get prefectures(): string {
    return this.$store.state.facilityRegistration.prefectures
  }

  get municipality(): string {
    return this.$store.state.facilityRegistration.municipality
  }

  get address(): string {
    return this.$store.state.facilityRegistration.address
  }

  get email(): string {
    return this.$store.state.facilityRegistration.email
  }

  get password() {
    return this.$store.state.facilityRegistration.password
  }

  get phoneNumber(): string {
    return this.$store.state.facilityRegistration.phoneNumber
  }

  get facilityName(): string {
    return this.$store.state.facilityRegistration.facilityName
  }

  get facilityNameRuby(): string {
    return this.$store.state.facilityRegistration.facilityNameRuby
  }

  get officerName(): string {
    return this.$store.state.facilityRegistration.officerName
  }

  async regist() {
    await auth
      .createUserWithEmailAndPassword(this.email, this.password)
      .then(async () => {
        await firestore.collection('facilities').add({
          createdAt: new Date(),
          displayName: uuid()
            .split('-')
            .join('')
            .slice(0, -12),
          like: 0,
          pay: 0,
          info: '',
          email: this.email,
          name: this.facilityName,
          officerName: this.officerName,
          phoneNumber: this.phoneNumber,
          streetAddress: [this.prefectures, this.municipality, this.address],
          searchQuery: [
            this.prefectures,
            this.municipality,
            this.facilityName,
            this.facilityNameRuby
          ]
        })
        await auth.signOut().then(() => {
          this.$router.push('/officerAdminFacility')
        })
      })
  }
}
</script>
