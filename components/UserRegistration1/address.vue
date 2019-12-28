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
          :rules="rules.post2"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-btn class="mt-3" outlined @click="checkCode()">検索</v-btn>
      </v-col>
    </v-row>
    <v-text-field
      v-model="address"
      label="住所"
      prepend-icon="mdi-"
      :rules="rules.post3"
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
    return this.$store.state.registration.postalCode
  }

  set address(value: string) {
    this.$store.commit('registration/SET_POSTAL_CODE', value)
  }
  code: object[] = []
  addres1: string = ''
  addres2: string = ''
  error?: string = ''
  uuid?: string = uuidv1()
    .split('-')
    .join('')
  public rules: {} = {
    post1: (v: string) => !!v || '郵便番号は半角数字で必ず入力してください'
  }
  async checkCode() {
    // 初期化
    this.code = []
    // axios
    await this.$axios
      .get(`https://api.zipaddress.net/?zipcode=${this.addres1}${this.addres2}`)
      .then((res) => {
        if (res.data.code === 200) {
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
          this.address = '存在しない郵便番号です。'
        }
      })
    console.log(this.code)
  }
}
</script>
