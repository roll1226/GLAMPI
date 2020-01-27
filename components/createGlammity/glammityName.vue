<template>
  <div>
    <v-row>
      <v-col sm="2">
        <h2>GLAMMITY名</h2>
      </v-col>
      <v-col sm="5">
        <v-text-field
          v-model="glammityName"
          label="GLAMMITY名"
          :rules="[rules.isGlammityName, rules.glammityNameLength]"
        ></v-text-field>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class GlammityNameCreateGlammity extends Vue {
  get glammityName(): string {
    return this.$store.state.registration.GlammityName
  }

  set glammityName(value: string) {
    this.$store.commit('/createGlammitySET_GLAMMITY_NAME', value)
  }

  public rules: {} = {
    isGlammityName: (v: string) => !!v || 'GLAMMITY名は必ず入力してください。',
    glammityNameLength: (v: string) =>
      (!!v && v.length <= 20) || 'GLAMMITY名は20文字以内にて入力してください。'
  }
}
</script>
