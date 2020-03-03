<template>
  <div>
    <v-row>
      <v-col sm="2">
        <h2>
          オプション
        </h2>
      </v-col>
      <v-col sm="9">
        <v-overflow-btn
          v-model="option"
          label="オプション"
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
    return this.$store.state.glammityCreate.optionList
  }

  set option(value: string) {
    const target = this.dropdown.find((city: IList) => {
      return city.text === value
    })
    console.log(target)
    this.$store.commit('glammityCreate/SET_OPTION_ID', target)
  }

  public rules: {} = {
    isPlanName: (v: string) => !!v || 'プラン名は必ず選択してください。'
  }
}
</script>
