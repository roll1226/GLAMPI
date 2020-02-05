<template>
  <div>
    <v-card width="850">
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
      <v-btn outlined="black" @click.stop="dialog = true">
        変更
      </v-btn>
      <div justify="center">
        <v-dialog v-model="dialog" max-width="470">
          <v-card>
            <v-card-text><p>パスワードを変更しました。</p></v-card-text>
          </v-card>
        </v-dialog>
      </div>
    </v-card>
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
export default class PasswordMypage extends Vue {
  dialog: boolean = false
}
</script>
