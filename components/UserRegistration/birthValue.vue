<template>
  <div>
    <v-row class="align-end">
      <v-col cols="auto">
        <v-select
          v-model="birthValueYear"
          :items="dropdown"
          :rules="[rules.isYear]"
          label="年"
          color="rgb(87, 95, 69)"
          prepend-icon="mdi-folder-account"
        ></v-select>
      </v-col>
      <v-col cols="auto">
        <v-select
          v-model="birthValueMonth"
          :items="dropdown1"
          :rules="[rules.isMonth]"
          label="月"
          color="rgb(87, 95, 69)"
        ></v-select>
      </v-col>
      <v-col cols="auto">
        <v-select
          v-model="birthValueDay"
          :items="dropdown2"
          :rules="[rules.isDay]"
          label="日"
          color="rgb(87, 95, 69)"
        ></v-select>
      </v-col>
      <v-col cols="1">
        <p>
          生まれ
        </p>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class birthValueUserRegistration extends Vue {
  get birthValueYear(): string {
    return this.$store.state.registration.birthdayYear
  }

  set birthValueYear(value: string) {
    this.$store.commit('registration/SET_BIRTHDAY_YEAR', value)
  }

  get birthValueMonth(): string {
    return this.$store.state.registration.birthdayMonth
  }

  set birthValueMonth(value: string) {
    this.$store.commit('registration/SET_BIRTHDAY_MONTH', value)
  }

  get birthValueDay(): string {
    return this.$store.state.registration.birthdayDay
  }

  set birthValueDay(value: string) {
    this.$store.commit('registration/SET_BIRTHDAY_DAY', value)
  }

  dropdown: [...string[]] = []
  dropdown1: [...string[]] = []
  dropdown2: [...string[]] = []

  created() {
    for (let index = 0; index < 120; index++) {
      const year = 2019
      this.dropdown.push(String(year - index))

      for (let index1 = 0; index1 < 12; index1++) {
        const month = 1
        this.dropdown1.push(String(month + index1))

        for (let index2 = 0; index2 < 31; index2++) {
          const day = 1
          this.dropdown2.push(String(day + index2))
        }
      }
    }
  }
  public rules: {} = {
    isYear: (v: string) => !!v || '生年は必ず入力してください。',
    isMonth: (v: string) => !!v || '生月は必ず入力してください。',
    isDay: (v: string) => !!v || '生日は必ず入力してください。'
  }
}
</script>
