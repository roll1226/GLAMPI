<template>
  <div>
    <v-row>
      <v-col>
        <v-text-field
          v-model="sei"
          label="姓"
          :rules="[rules.isSeiLength, rules.seiFormat]"
          prepend-icon="mdi-pencil"
          counter="20"
          color="rgb(87, 95, 69)"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          v-model="mei"
          label="名"
          :rules="[rules.isMeiLength, rules.meiFormat]"
          counter="20"
          color="rgb(87, 95, 69)"
        ></v-text-field>
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

const apiKey = process.env.GOO_LABS_API_KEY
const BASE_URL = 'https://labs.goo.ne.jp/api/hiragana'
const OUTPU_TYPE = 'katakana'
let surnameTime: any
let nameTime: any

@Component
export default class seimeiUserRegistration extends Vue {
  // public sei: string = ''
  get sei(): string {
    return this.$store.state.registration.firstName
  }

  set sei(value: string) {
    this.$store.commit('registration/SET_FIRST_NAME', value)

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

    clearTimeout(surnameTime)
    surnameTime = setTimeout(() => {
      this.$axios(options).then((res) => {
        this.$store.commit(
          'registration/SET_FIRST_NAME_KANA',
          res.data.converted
        )
      })
    }, 1000)
  }
  // public mei: string = ''
  get mei(): string {
    return this.$store.state.registration.lastName
  }

  set mei(value: string) {
    this.$store.commit('registration/SET_LAST_NAME', value)

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

    clearTimeout(nameTime)
    nameTime = setTimeout(() => {
      this.$axios(options).then((res) => {
        this.$store.commit(
          'registration/SET_LAST_NAME_KANA',
          res.data.converted
        )
      })
    }, 1000)
  }
  public rules: {} = {
    isSeiLength: (v: string) =>
      (v.length >= 1 && v.length <= 20) ||
      '姓は20文字以内にて必ず入力してください。',
    seiFormat: (v: string) => {
      const pattern = /^[a-zA-Zａ-ｚＡ-Ｚぁ-んァ-ン一-龥]+$/
      return pattern.test(v) || '使用できない文字が含まれています。'
    },
    isMeiLength: (v: string) =>
      (v.length >= 1 && v.length <= 20) ||
      '名は20文字以内にて必ず入力してください。',
    meiFormat: (v: string) => {
      const pattern = /^[a-zA-Zａ-ｚＡ-Ｚぁ-んァ-ン一-龥]+$/
      return pattern.test(v) || '使用できない文字が含まれています。'
    }
  }
}
</script>
