<template>
  <div>
    <v-text-field
      v-model="tel"
      v-mask="telMask"
      label="電話番号"
      prepend-icon="mdi-phone"
      :rules="[rules.isTel, rules.telFormat]"
    ></v-text-field>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
const { mask } = require('vue-the-mask')

@Component({
  directives: {
    mask
  },
  data() {
    return {
      telMask: '###-####-####'
    }
  }
})
export default class telUserRegistration extends Vue {
  public tel: string = ''
  public telMask: string = ''
  public rules: {} = {
    isTel: (v: string) => !!v || '電話番号は必ず入力してください。',
    telFormat: (v: string) => {
      const pattern = /^0[9876]0[-]?\d{4}[-]?\d{4}$/
      return (
        pattern.test(v) ||
        '入力された携帯番号は使用されていません。正しい番号を入力してください。'
      )
    }
  }
}
</script>
