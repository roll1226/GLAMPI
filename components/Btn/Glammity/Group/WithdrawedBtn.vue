<template>
  <div>
    <v-btn outlined color="error" @click="withdraw">
      退会
    </v-btn>

    <div justify="center">
      <v-dialog v-model="withdrawDialog" max-width="500">
        <v-card>
          <v-card-text class="pt-5">
            <div class="text-center headline">
              退会しました。
            </div>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions class="d-flex justify-center pb-3">
            <v-btn color="green" class="white--text" @click="withdrawGroup">
              OK
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({})
export default class WithdrawedBtn extends Vue {
  dialog: boolean = false

  get userId(): string {
    return this.$store.state.login.userUid
  }

  get withdrawDialog(): boolean {
    return this.$store.state.glammityGroup.withdrawDialog
  }

  set withdrawDialog(value: boolean) {
    this.$store.commit('glammityGroup/SET_WITHDRAW_DIALOG', value)
  }

  withdraw() {
    this.$store.commit('glammityGroup/SET_LOADING', true)

    const url = this.$route.params.Glammity
    this.$store.dispatch('glammityGroup/withdraw', { userId: this.userId, url })
  }

  withdrawGroup() {
    this.$store.commit('glammityGroup/SET_LOADING', false)
    this.$store.commit('glammityGroup/SET_WITHDRAW_DIALOG', false)

    this.$router.push('/')
  }
}
</script>
