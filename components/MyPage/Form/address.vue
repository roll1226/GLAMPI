<template>
  <div>
    <v-row no-gutters>
      <v-col cols="auto"> <v-icon>mdi-home</v-icon> </v-col>
      <v-col>
        <v-row no-gutters class="margin-delete postal">
          <v-col>
            <v-text-field
              v-model="postalCode1"
              v-mask="POST"
              class="postal-b"
              label="xxx"
              :rules="[rules.post1]"
            ></v-text-field>
          </v-col>
          <v-col><p>―</p></v-col>
          <v-col>
            <v-text-field
              v-model="postalCode2"
              v-mask="POST1"
              class="postal-a"
              label="xxxx"
              :rules="[rules.post2]"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-col>

      <v-col>
        <v-btn outlined class="kensaku" @click="checkCode()">検索</v-btn>
      </v-col>
    </v-row>
    <v-row no-gutters class="margin-delete">
      <v-col class="under">
        <v-text-field
          v-model="streetAddress"
          label="住所"
          :rules="[
            rules.isStreetAddress,
            rules.streetAddressLength,
            rules.streetAddressFormatSpace,
            rules.streetAddressFormatFullwidth
          ]"
          counter="50"
        ></v-text-field>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
const { mask } = require('vue-the-mask')
const uuidv1 = require('uuid/v4')

@Component({
  directives: {
    mask
  },
  data() {
    return {
      POST: '###',
      POST1: '####'
    }
  }
})
export default class addressMypageForm extends Vue {
  // public address: string = ''

  get postalCode1(): string {
    return this.$store.state.mypage.postalCode.split('-')[0]
  }

  set postalCode1(value: string) {
    this.$store.commit('mypage/SET_POSTAL_CODE', `${value}-${this.postalCode2}`)
  }

  get postalCode2(): string {
    return this.$store.state.mypage.postalCode.split('-')[1]
  }
  set postalCode2(value: string) {
    this.$store.commit('mypage/SET_POSTAL_CODE', `${this.postalCode1}-${value}`)
  }

  get streetAddress(): string {
    return this.$store.state.mypage.streetAddress
  }

  set streetAddress(value: string) {
    this.$store.commit('mypage/SET_STREETADDRESS', value)
  }

  code: object[] = []
  error?: string = ''
  uuid?: string = uuidv1()
    .split('-')
    .join('')
  public rules: {} = {
    post1: (v: string) => {
      const pattern = /^\d{3}$/
      return (
        pattern.test(v) || '郵便番号は半角数字3桁にて必ず入力してください。'
      )
    },
    post2: (v: string) => {
      const pattern = /^\d{4}$/
      return (
        pattern.test(v) || '郵便番号は半角数字4桁にて必ず入力してください。'
      )
    },

    isStreetAddress: (v: string) => !!v || '住所は必ず入力してください。',
    streetAddressLength: (v: string) =>
      (v && v.length <= 50) || '住所は50字以内にて入力してください。',
    streetAddressFormatSpace: (v: string) => {
      // eslint-disable-next-line no-irregular-whitespace
      const pattern = /^[^ 　]+$/
      return pattern.test(v) || 'スペースが入力されています。削除してください。'
    },

    streetAddressFormatFullwidth: (v: string) => {
      // eslint-disable-next-line no-control-regex
      const pattern = /^[^\x01-\x7E\xA1-\xDF]+$/
      return pattern.test(v) || '住所は全角にて入力してください。'
    }
  }
  async checkCode() {
    // 初期化
    this.code = []
    // axios
    await this.$axios
      .get(
        `https://api.zipaddress.net/?zipcode=${this.postalCode1}${this.postalCode2}`
      )
      .then((res) => {
        if (res.data.code === 200) {
          // push
          this.code.push(res.data)
          this.streetAddress = res.data.data.fullAddress
        } else {
          this.streetAddress =
            '存在しない郵便番号です。正しい郵便番号を入力してください。'
        }
      })
    console.log(this.code)
  }
}
</script>
