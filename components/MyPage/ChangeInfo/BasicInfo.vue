<template>
  <v-row class="flex-column">
    <seimei />
    <seimeiKana />
    <email />
    <addressForm />
    <username />
    <comment />
    <v-row>
      <v-col>
        <v-btn outlined color="error" @click="dialogWithdraw = true"
          >退会</v-btn
        >
      </v-col>
      <v-col>
        <v-btn outlined color="primary" @click="dialogChange = true"
          >変更</v-btn
        >
      </v-col>
    </v-row>

    <!--モーダル-->
    <div justify="center">
      <v-dialog v-model="dialogWithdraw" max-width="470">
        <v-card>
          <v-card-text> ほんとうに退会してよろしいですか？</v-card-text>
          <v-card-actions>
            <v-btn @click="deleteUserData()">はい</v-btn>
            <v-btn @click="dialogWithdraw = false">いいえ</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <div justify="center">
      <v-dialog v-model="dialogChange" max-width="470">
        <v-card>
          <v-card-text> 会員情報を変更します。よろしいですか？</v-card-text>
          <v-card-actions>
            <v-btn @click="changeUserData()">はい</v-btn>
            <v-btn @click="dialogChange = false">いいえ</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-row>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import seimei from '@/components/MyPage/Form/seimei.vue'
import seimeiKana from '@/components/MyPage/Form/seimeiKana.vue'
import email from '@/components/MyPage/Form/email.vue'
import addressForm from '@/components/MyPage/Form/address.vue'
import username from '@/components/MyPage/Form/username.vue'
import comment from '@/components/MyPage/Form/comment.vue'
import { auth } from '@/plugins/firebase'

@Component({
  components: {
    seimei,
    seimeiKana,
    email,
    addressForm,
    username,
    comment
  }
})
export default class BasicInfo extends Vue {
  dialogWithdraw: boolean = false
  dialogChange: boolean = false

  async deleteUserData() {
    // userは消せる(ログインしてるuserが)
    const user: any = auth.currentUser
    await user.delete().then(() => {
      this.$store.commit('login/IS_LOGIN', false)
      this.$router.push('/')
    })
  }
}
</script>
