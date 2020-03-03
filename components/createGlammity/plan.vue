<template>
  <div>
    <v-row>
      <v-col sm="2">
        <h2>プラン名</h2>
      </v-col>
      <v-col sm="9">
        <v-overflow-btn
          v-model="plan"
          label="プラン名"
          :items="dropdown"
          :rules="[rules.isPlanName]"
          item-value="text"
        ></v-overflow-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { IList } from '@/store/glammityCreate'

@Component
export default class PlanCreateGlammity extends Vue {
  get dropdown(): IList[] {
    return this.$store.state.glammityCreate.planList
  }

  get plan(): string {
    return this.$store.state.glammityCreate.planTitle
  }

  set plan(value: string) {
    const target = this.dropdown.find((city: IList) => {
      return city.text === value
    })
    this.$store.commit('glammityCreate/SET_PLAN_ID', target)
  }

  public rules: {} = {
    isPlanName: (v: string) => !!v || 'プラン名は必ず選択してください。'
  }
}
</script>
