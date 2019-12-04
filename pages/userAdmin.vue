<template>
  <div>
    <h1>会員登録</h1>

    <v-text-fieldv-model="sei"
      label="姓"
      placeholder="姓"
      :rules="rules.fname"
    ></v-text-field>
    <v-text-field v-model="mei" label="名" placeholder="名"></v-text-field>

    <v-text-field v-model="sei" label="姓" placeholder="セイ"></v-text-field>
    <v-text-field v-model="mei"
    label="名" placeholder="メイ"></v-text-field>
    <input type="radio" id="M" value="M" v-model="picked" />
    <label for="M">男性</label>
    <br />
    <input type="radio" id="F" value="F" v-model="picked" />
    <label for="F">女性</label>
    <br />
    <!-- //生年月日 -->
    <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      full-width
      min-width="290px"
    >
      <template v-slot:activator="{ on }">
        <v-text-field
          v-model="date"
          label="生年月日"
          readonly
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        ref="picker"
        v-model="date"
        :max="new Date().toISOString().substr(0, 10)"
        min="1950-01-01"
        @change="save"
      ></v-date-picker>
    </v-menu>
    <!--郵便番号-->
    <v-card>
      <v-card-text>
        <v-text-field
          v-model="value"
          v-mask="address"
          label="郵便番号番号入力"
        ></v-text-field>
      </v-card-text>
    </v-card>
    <v-text-field v-model="sei" label="住所" placeholder="住所"></v-text-field>

    <!--出力-->
    <!--<span>Picked: {{ picked }}</span>-->
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
// 郵便番号
const { mask } = require('vue-the-mask')
// import axios from "axios";

// 生年月日
// export default {
//   data: () => ({
//     date: null,
//     menu: false
//   }),
//   watch: {
//     menu(val) {
//       val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
//     }
//   },
//   methods: {
//     save(date) {
//       this.$refs.menu.save(date)
//     }
//   }
// }

@Component({
  // 登録
  directives: {
    mask
  },
  data() {
    return {
      address: '###-####'
    }
  }
})
export default class admin extends Vue {

  public date: string = ''
  public menu: boolean = false
  public picked: string = ''

  public rules: {} ={
    fname: [ (v:string) => !!v || '姓・名は必ず入力してください',
    (v:string) => (v && v.length <=20) || '最大桁数以上の入力がされました',

    ]
  }
  @Watch('menu')
  seMenu(val: string) {
    val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
  }

  save(date: string) {
    this.$refs.menu.save(date)
    console.log(date)
  }
}
</script>
