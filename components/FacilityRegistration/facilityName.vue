<template>
  <div>
    <v-text-field
      v-model="facilityName"
      label="施設名"
      prepend-icon="fas fa-campground"
      :rules="[rules.isFacilityName]"
    ></v-text-field>

    <v-text-field
      v-model="facilityNameRuby"
      label="しせつめい"
      prepend-icon="mdi-"
    ></v-text-field>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
const apiKey = process.env.GOO_LABS_API_KEY
const BASE_URL = 'https://labs.goo.ne.jp/api/hiragana'
const OUTPU_TYPE = 'hiragana'
let rubySetTime: any

@Component
export default class FacilityFacilityNameRegistration extends Vue {
  // public sei: string = ''
  get facilityName(): string {
    return this.$store.state.facilityRegistration.facilityName
  }

  set facilityName(value: string) {
    this.$store.commit('facilityRegistration/SET_FACILITY_NAME', value)
    const options: any = {
      method: 'post',
      url: BASE_URL,
      headers: {
        'Content-Type': `application/json`
      },
      data: {
        app_id: apiKey,
        sentence: value,
        output_type: OUTPU_TYPE
      }
    }

    clearTimeout(rubySetTime)
    rubySetTime = setTimeout(() => {
      this.$axios(options).then((res) => {
        this.$store.commit(
          'facilityRegistration/SET_FACILITY_NAME_RUBY',
          res.data.converted
        )
      })
    }, 1000)
  }

  get facilityNameRuby(): string {
    return this.$store.state.facilityRegistration.facilityNameRuby
  }

  set facilityNameRuby(value: string) {
    this.$store.commit('facilityRegistration/SET_FACILITY_NAME_RUBY', value)
  }

  public rules: {} = {
    isFacilityName: (v: string) =>
      (v && v.length >= 1 && v.length <= 20) ||
      !!v ||
      '施設名は必ず入力してください。'
  }
}
</script>
