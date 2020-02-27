<template>
  <v-row no-gutters class="mytop-wrap">
    <v-col xs="12">
      <v-card-text>
        <v-card-title>基本情報</v-card-title>
        <ul>
          <li>性別: {{ sex }}</li>
          <li>年齢:{{ age }}歳</li>
          <li>住所:{{ streetAddress }}</li>
        </ul>
      </v-card-text>
    </v-col>

    <v-divider class="mx-8" inset vertical></v-divider>
    <v-col xs="12">
      <v-card-text>
        <v-card-title>コメント</v-card-title>
        <p>
          {{ comment }}
        </p>
      </v-card-text>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

// 誕生日から年齢を計算するgetAge
function getAge(year: number, month: number, day: number) {
  const birthday = new Date(year, month - 1, day)

  // 文字列に分解
  const yearBirth = birthday
    .getFullYear()
    .toString()
    .padStart(4, '0')
  const monthBirth = (birthday.getMonth() + 1).toString().padStart(2, '0')
  const dayBirth = birthday
    .getDate()
    .toString()
    .padStart(2, '0')

  // 今日の日付
  const today = new Date()
  const yearToday = today
    .getFullYear()
    .toString()
    .padStart(4, '0')
  const monthToday = (today.getMonth() + 1).toString().padStart(2, '0')
  const dayToday = today
    .getDate()
    .toString()
    .padStart(2, '0')

  const age = Math.floor(
    (Number(yearToday + monthToday + dayToday) -
      Number(yearBirth + monthBirth + dayBirth)) /
      10000
  )
  return age
}

@Component
export default class MyTop extends Vue {
  get sex(): string {
    return this.$store.state.mypage.sex === 'M' ? '男性' : '女性'
  }

  get age(): number {
    // 誕生日取得、年月日それぞれNumberでgetAgeに渡す
    const birthDayGet = this.$store.state.mypage.birthday
    const birthdayReplace = birthDayGet
      .replace('年', '-')
      .replace('月', '-')
      .replace('日', '-')
    const year = Number(birthdayReplace.split('-')[0])
    const month = Number(birthdayReplace.split('-')[1])
    const day = Number(birthdayReplace.split('-')[2])
    // console.log(getAge(year, month, day))
    return getAge(year, month, day)
  }

  get streetAddress(): string {
    return this.$store.state.mypage.streetAddress
  }

  get comment(): string {
    return this.$store.state.mypage.comment
  }
}
</script>
