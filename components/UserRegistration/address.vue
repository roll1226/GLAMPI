<template>
  <div>
    <v-row>
      <v-col sm="2">
        <v-text-field
          v-model="addres1"
          v-mask="POST"
          label="xxx"
          prepend-icon="mdi-home"
          :rules="[rules.post1]"
        ></v-text-field>
      </v-col>
      <div class="mt-10">
        ー
      </div>
      <v-col sm="2">
        <v-text-field
          v-model="addres2"
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
      v-model="address"
      label="住所"
      prepend-icon="mdi-"
      :rules="[
        rules.isAddress,
        rules.addressLength,
        rules.addressFormatSpace,
        rules.addressFormatFullwidth
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
  // public address: string = ''
  get address(): string {
    return this.$store.state.registration.address
  }

  set address(value: string) {
    this.$store.commit('registration/SET_ADDRESS', value)
  }
  loading: boolean = false
  code: object[] = []
  addres1: string = ''
  addres2: string = ''
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
    isAddress: (v: string) => !!v || '住所は必ず入力してください。',
    addressLength: (v: string) =>
      (v && v.length <= 50) || '住所は50字以内にて入力してください。',
    addressFormatSpace: (v: string) => {
      // eslint-disable-next-line no-irregular-whitespace
      const pattern = /^[^ 　]+$/
      return pattern.test(v) || 'スペースが入力されています。削除してください。'
    },
    addressFormatFullwidth: (v: string) => {
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
      .get(`https://api.zipaddress.net/?zipcode=${this.addres1}${this.addres2}`)
      .then((res) => {
        this.loading = false

        if (res.data.code === 200) {
          this.$store.commit(
            'registration/SET_POST_CODE',
            `${this.addres1}-${this.addres2}`
          )
          // push
          this.code.push(res.data)
          const pref = res.data.data.pref
          const city = res.data.data.city
          const town = res.data.data.town
          this.$store.commit('registration/SET_STREET_ADDRESS', {
            pref,
            city,
            town
          })
          this.address = res.data.data.fullAddress
        } else {
          this.address =
            '存在しない郵便番号です。正しい郵便番号を入力してください。'
        }
      })
    console.log(this.code)
  }
}
</script>
