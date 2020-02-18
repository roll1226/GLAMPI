<template>
  <div>
    <v-card-title>パスワード変更</v-card-title>
    <v-form>
      <v-container>
        <v-row>
          <v-col><password></password></v-col>
        </v-row>
        <v-row>
          <v-col><password></password></v-col>
        </v-row>
        <v-row>
          <v-col><passwordCheck></passwordCheck></v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import password from '@/components/UserRegistration/password.vue'

@Component({
  components: {
    password
  }
})
export default class PasswordMypage extends Vue {}
</script>
