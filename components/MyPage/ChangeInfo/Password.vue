<template>
  <div>
    <v-card-title>パスワード変更</v-card-title>
    <v-form>
      <v-container>
        <v-row>
          <v-col><passwordBefore /></v-col>
        </v-row>
        <v-row>
          <v-col><passwordAfter /></v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import passwordBefore from '@/components/Mypage/Form/passwordBefore.vue'
import passwordAfter from '@/components/Mypage/Form/passwordAfter.vue'

@Component({
  components: {
    passwordBefore,
    passwordAfter
  }
})
export default class PasswordMypage extends Vue {}
</script>
