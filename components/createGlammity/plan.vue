<template>
  <div>
    <v-row>
      <v-col sm="2">
        <h2>プラン名</h2>
      </v-col>
      <v-col sm="5">
        <v-overflow-btn
          v-model="plan"
          label="プラン名"
          :items="dropdown"
          :rules="[rules.isPlanName]"
        ></v-overflow-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class PlanCreateGlammity extends Vue {
  get plan(): string {
    return this.$store.state.registration.plan
  }

  set plan(value: string) {
    this.$store.commit('createGlammity/SET_PLAN', value)
  }
  dropdown: [...string[]] = []
  created() {
    for (let index = 0; index < 10; index++) {
      const x = 0
      this.dropdown.push(String(x + index))
    }
  }
  public rules: {} = {
    isPlanName: (v: string) => !!v || 'プラン名は必ず選択してください。'
  }
}
</script>
