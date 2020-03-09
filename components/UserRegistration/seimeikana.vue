<template>
  <div>
    <v-row>
      <v-col>
        <v-text-field
          v-model="seiKana"
          label="セイ"
          :rules="[rules.seiKanaFormat]"
          prepend-icon="mdi-"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          v-model="meiKana"
          label="メイ"
          :rules="[rules.meiKanaFormat]"
        ></v-text-field>

        <div class="text-right">
          <v-btn text target="_block" href="http://www.goo.ne.jp/">
            <img
              src="//u.xgoo.jp/img/sgoo.png"
              alt="supported by goo"
              title="supported by goo"
              width="100"
            />
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class seimeiKanaUserRegistration extends Vue {
  // public sei: string = ''
  get seiKana(): string {
    return this.$store.state.registration.firstNameKana
  }

  set seiKana(value: string) {
    this.$store.commit('registration/SET_FIRST_NAME_KANA', value)
  }
  // public mei: string = ''
  get meiKana(): string {
    return this.$store.state.registration.lastNameKana
  }

  set meiKana(value: string) {
    this.$store.commit('registration/SET_LAST_NAME_KANA', value)
  }
  public rules: {} = {
    seiKanaFormat: (v: string) => {
      const pattern = /^[ァ-ヶー]{1,20}$/
      return pattern.test(v) || 'セイは全角カタカナにて必ず入力してください。'
    },
    meiKanaFormat: (v: string) => {
      const pattern = /^[ァ-ヶー]{1,20}$/
      return pattern.test(v) || 'メイは全角カタカナにて必ず入力してください。'
    }
  }
}
</script>
