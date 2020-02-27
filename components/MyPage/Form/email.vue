<template>
  <v-row no-gutters>
    <v-col cols="auto"> <v-icon>mdi-email</v-icon> </v-col>
    <v-col>
      <v-text-field
        v-model="email"
        label="E-mail"
        :counter="100"
        :rules="[rules.isEmail, rules.emailLength, rules.emailFormat]"
        hint="「XX@XX.XX」の形式で入力してください"
      ></v-text-field>
    </v-col>

    <v-col>
      <v-btn @click="sendTestMail">
        確認メールを送る
      </v-btn>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
const url = 'https://us-central1-j4k1-b789f.cloudfunctions.net/sendTextMail'
@Component
export default class emailMypageForm extends Vue {
  // public email: string = ''
  get email(): string {
    return this.$store.state.mypage.email
  }

  set email(value: string) {
    this.$store.commit('mypage/SET_EMAIL', value)
  }
  public rules: {} = {
    isEmail: (v: string) => !!v || 'メールアドレスは必ず入力してください。',
    emailLength: (v: string) =>
      (v && v.length <= 100) || 'メールアドレスが長すぎます。',
    emailFormat: (v: string) => {
      const pattern = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/
      return (
        pattern.test(v) ||
        'メールアドレスは半角英数字で「XX@XX.XX」の形式にて入力してください。'
      )
    }
  }

  async sendTestMail() {
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        email: this.email
      })
    }).then((result) => {
      console.log(result)
    })
  }
}
</script>
