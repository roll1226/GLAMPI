<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  components: {
    GlammityName,
    facilityName,
    plan,
    recruitmentNumbers,
    schedule
  }
})
export default class template extends Vue {
  get a(): string {
    return this.$store.state.registration.GlammityName
  }

  set a(value: string) {
    this.$store.commit('createGlammity/SET_GLAMMITY_NAME', value)
  }

  get b(): string {
    return this.$store.state.registration.facilityName
  }

  set b(value: string) {
    this.$store.commit('createGlammity/SET_FACILITY_NAME', value)
  }

  get c(): string {
    return this.$store.state.registration.plan
  }

  set c(value: string) {
    this.$store.commit('createGlammity/SET_PLAN', value)
  }

  get d(): string {
    return this.$store.state.registration.recruitmentNumbers
  }

  set d(value: string) {
    this.$store.commit('createGlammity/SET_RECRUITMENT_NUMBERS', value)
  }

  get e(): string {
    return this.$store.state.registration.chedule
  }

  set e(value: string) {
    this.$store.commit('createGlammity/SET_SCHEDULE', value)
  }

  public rules: {} = {
    a1: (v:string)
    a2: (v: string) => {
      const pattern = /^[亜-黑]{1,20}$/
      return pattern.test(v) || '姓は必ず漢字で20文字以内にて入力してください。'
    }
  }
}
</script>
