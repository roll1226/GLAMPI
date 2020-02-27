<template>
  <div>
    <v-btn @click="openDialog">
      退会
    </v-btn>

    <div justify="center">
      <v-dialog
        v-model="verificationDialog"
        max-width="350"
        :persistent="withdrawLoading"
      >
        <v-card :loading="withdrawLoading">
          <v-card-text class="pt-5">
            <div class="text-center headline">
              退会するノー?
            </div>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions class="d-flex justify-space-around pb-3">
            <v-btn color="green" class="white--text" @click="closeDialog">
              戻る
            </v-btn>

            <WithdrawedBtn />
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import WithdrawedBtn from '@/components/Btn/Glammity/Group/WithdrawedBtn.vue'

@Component({
  components: {
    WithdrawedBtn
  }
})
export default class WithdrawBtn extends Vue {
  dialog: boolean = false

  get userId(): string {
    return this.$store.state.login.userUid
  }

  get withdrawLoading(): boolean {
    return this.$store.state.glammityGroup.loading
  }

  get verificationDialog(): boolean {
    return this.$store.state.glammityGroup.verificationDialog
  }

  set verificationDialog(value: boolean) {
    this.$store.commit('glammityGroup/SET_VERIFICATION_DIALOG', value)
  }

  openDialog() {
    this.$store.commit('glammityGroup/SET_VERIFICATION_DIALOG', true)
  }

  closeDialog() {
    this.$store.commit('glammityGroup/SET_VERIFICATION_DIALOG', false)
  }
}
</script>
