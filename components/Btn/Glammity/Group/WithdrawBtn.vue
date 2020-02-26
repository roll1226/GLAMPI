<template>
  <div>
    <v-btn @click="dialog = true">
      退会
    </v-btn>

    <div justify="center">
      <v-dialog v-model="dialog" max-width="350">
        <v-card>
          <v-card-text class="pt-5">
            <div class="text-center headline">
              退会するノー?
            </div>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions class="d-flex justify-space-around pb-3">
            <v-btn color="green" class="white--text" @click="dialog = false">
              戻る
            </v-btn>

            <v-btn color="error" class="white--text" @click="withdraw">
              退会
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { firestore } from '@/plugins/firebase'

@Component({})
export default class WithdrawBtn extends Vue {
  dialog: boolean = false
  get userId(): string {
    return this.$store.state.login.userUid
  }

  async withdraw() {
    const url = this.$route.params.Glammity
    await firestore
      .collection('glammity')
      .doc(url)
      .collection('member')
      .doc(this.userId)
      .delete()
      .then(() => {
        this.$router.push('/')
      })
  }
}
</script>
