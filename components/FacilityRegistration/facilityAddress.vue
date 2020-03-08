<template>
  <div>
    <v-row>
      <v-col sm="2">
        <v-text-field
          v-model="firstAddres"
          v-mask="firstPostMask"
          label="xxx"
          prepend-icon="fas fa-tenge"
          :rules="[rules.firstPost]"
        ></v-text-field>
      </v-col>
      <div class="mt-10">
        ー
      </div>
      <v-col sm="2">
        <v-text-field
          v-model="secondAddres"
          v-mask="secondPostMask"
          label="xxxx"
          :rules="[rules.secondPost]"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-btn class="mt-3" :loading="loading" outlined @click="checkCode()">
          検索
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-text-field
          v-model="prefectures"
          prepend-icon="mdi-"
          label="都道府県"
          readonly
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          v-model="municipality"
          label="市区町村"
          readonly
          hint="丁、番地やマンションなど"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          v-model="address"
          label="番地"
          hint="丁、番地やマンションなど"
          counter="50"
        ></v-text-field>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
const { mask } = require('vue-the-mask')

@Component({
  directives: {
    mask
  }
})
export default class FacilityAddressRegistration extends Vue {
  loading: boolean = false
  get prefectures(): string {
    return this.$store.state.facilityRegistration.prefectures
  }

  get municipality(): string {
    return this.$store.state.facilityRegistration.municipality
  }

  get address(): string {
    return this.$store.state.facilityRegistration.address
  }

  set address(value: string) {
    this.$store.commit('facilityRegistration/SET_ADDRESS', value)
  }

  firstPostMask: string = '###'
  secondPostMask: string = '####'

  firstAddres: string = ''
  secondAddres: string = ''
  error?: string = ''

  public rules: {} = {
    firstPost: (v: string) => {
      const pattern = /^\d{3}$/
      return (
        pattern.test(v) || '郵便番号は半角数字3桁にて必ず入力してください。'
      )
    },

    secondPost: (v: string) => {
      const pattern = /^\d{4}$/
      return (
        pattern.test(v) || '郵便番号は半角数字4桁にて必ず入力してください。'
      )
    }
  }

  async checkCode() {
    this.loading = true

    await this.$axios
      .get(
        `https://api.zipaddress.net/?zipcode=${this.firstAddres}${this.secondAddres}`
      )
      .then((res) => {
        if (res.data.code === 200) {
          // const pref = res.data.data.pref
          // const city = res.data.data.address

          this.$store.commit(
            'facilityRegistration/SET_PREFECTURES',
            res.data.data.pref
          )

          this.$store.commit(
            'facilityRegistration/SET_MUNICIPALITY',
            res.data.data.address
          )
        } else {
          this.$store.commit(
            'facilityRegistration/SET_PREFECTURES',
            '存在しない郵便番号です。正しい郵便番号を入力してください。'
          )
        }
      })

    this.loading = false
    this.$store.commit('facilityRegistration/SET_ADDRESS', '')
  }
}
</script>
