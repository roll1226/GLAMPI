<template>
  <div>
    <v-btn
      :disabled="!formIsValid"
      outlined
      color="grey darken-1"
      @click="registCheck"
    >
      登録
    </v-btn>

    <v-dialog v-model="dialog" width="250">
      <v-card :loading="loading">
        <v-card-title>
          施設登録しますか？
        </v-card-title>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="primary" text @click="regist">
            登録する
          </v-btn>

          <v-btn color="error" text @click="dialog = false">
            入力し直す
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { auth, firestore } from '@/plugins/firebase'
const uuid = require('uuid/v4')

@Component
export default class FacilityRegistrationBtn extends Vue {
  dialog: boolean = false
  loading: boolean = false

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

  get formIsValid(): string {
    return (
      this.prefectures &&
      this.municipality &&
      this.address &&
      this.email &&
      this.password &&
      this.phoneNumber &&
      this.facilityName &&
      this.facilityNameRuby &&
      this.officerName
    )
  }

  registCheck() {
    this.dialog = true
  }

  async regist() {
    this.loading = true
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
    this.loading = false
  }
}
</script>
