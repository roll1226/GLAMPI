<template>
  <div>
    <v-row>
      <v-col sm="2">
        <v-text-field
          v-model="postalCode1"
          v-mask="POST"
          label="xxx"
          prepend-icon="mdi-home"
          :rules="[rules.post1]"
        ></v-text-field>
      </v-col>
      <div class="mt-10">
        -
      </div>
      <v-col sm="2">
        <v-text-field
          v-model="postalCode2"
          v-mask="POST1"
          label="xxxx"
          :rules="[rules.post2]"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-btn class="mt-3" outlined :loading="loading" @click="checkCode()"
          >検索</v-btn
        >
      </v-col>
    </v-row>
    <v-text-field
      v-model="streetAddress"
      label="住所"
      prepend-icon="mdi-"
      :rules="[
        rules.isStreetAddress,
        rules.streetAddressLength,
        rules.streetAddressFormatSpace,
        rules.streetAddressFormatFullwidth
      ]"
      counter="50"
    ></v-text-field>
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
export default class addressUserRegistration extends Vue {
  get streetAddress(): string {
    return this.$store.state.registration.streetAddress
  }

  set streetAddress(value: string) {
    this.$store.commit('registration/SET_STREET_ADDRESS', value)
  }
  postalCode1: string = ''
  postalCode2: string = ''
  loading: boolean = false
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
    this.loading = true
    // 初期化
    this.code = []
    // axios
    await this.$axios
      .get(
        `https://api.zipaddress.net/?zipcode=${this.postalCode1}${this.postalCode2}`
      )
      .then((res) => {
        this.loading = false

        if (res.data.code === 200) {
          this.$store.commit(
            'registration/SET_POST_CODE',
            `${this.postalCode1}-${this.postalCode2}`
          )
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
