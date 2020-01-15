<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class ScheduleCreateGlammity extends Vue {
  get schedule(): string {
    return this.$store.state.registration.chedule
  }

  set schedule(value: string) {
    this.$store.commit('createGlammity/SET_SCHEDULE', value)
  }
}
</script>
