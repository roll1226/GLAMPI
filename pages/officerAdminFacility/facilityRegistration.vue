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

        <FacilityRegistrationBtn />
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import FacilityEmailRegistration from '@/components/FacilityRegistration/facilityEmail.vue'
import FacilityPasswordRegistration from '@/components/FacilityRegistration/facilityPassword.vue'
import FacilityRegistrationOfficerName from '@/components/FacilityRegistration/FacilityOfficerName.vue'
import FacilityTelRegistration from '@/components/FacilityRegistration/FacilityPhoneNumber.vue'
import FacilityFacilityNameRegistration from '@/components/facilityRegistration/facilityName.vue'
import FacilityAddressRegistration from '@/components/FacilityRegistration/facilityAddress.vue'
import FacilityRegistrationBtn from '@/components/Btn/Admin/FacilityregistrationBtn.vue'

@Component({
  components: {
    FacilityEmailRegistration,
    FacilityPasswordRegistration,
    FacilityRegistrationOfficerName,
    FacilityTelRegistration,
    FacilityFacilityNameRegistration,
    FacilityAddressRegistration,
    FacilityRegistrationBtn
  },
  layout: 'admin'
})
export default class facilityRegistration extends Vue {}
</script>
