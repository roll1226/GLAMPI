<template>
  <div>
    <v-overflow-btn
      v-model="people"
      label="募集人数"
      :items="dropdown"
    ></v-overflow-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class PeopleCreateGlammity extends Vue {
  get people(): string {
    return this.$store.state.registration.recruitmentNumbers
  }

  set people(value: string) {
    this.$store.commit('createGlammity/SET_RECRUITMENT_NUMBERS', value)
  }
  dropdown: [...string[]] = []
  created() {
    for (let index = 0; index < 10; index++) {
      const x = 1
      this.dropdown.push(String(x + index))
    }
  }
}
</script>
