<template>
  <div class="text-center">
    <v-btn :block="isBlock" :text="isBlock" @click.stop="openModal">
      <v-icon class="mr-2">
        fas fa-campground
      </v-icon>

      参加する
    </v-btn>

    <div justify="center">
      <v-dialog v-model="dialog" :persistent="joinBtnLoading" max-width="400">
        <v-card :loading="joinBtnLoading">
          <v-card-title class="headline">
            {{ glammityName }}に参加しますか？
          </v-card-title>

          <v-card-text>
            なんか文章入れたい
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <JoinedBtn
              :glammity-name="glammityName"
              :glammity-id="glammityId"
            />

            <v-btn color="error" text @click="closeCard">
              参加しない
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import JoinedBtn from '@/components/Btn/Glammity/JoinedBtn.vue'

@Component({
  components: {
    JoinedBtn
  }
})
export default class JoinBtn extends Vue {
  @Prop({ required: true, default: '' })
  glammityName!: string

  @Prop({ required: true, default: '' })
  glammityId!: string

  @Prop({ required: true, default: true })
  isBlock!: boolean

  get joinBtnLoading(): boolean {
    return this.$store.state.glammityJoin.loading
  }

  get dialog(): boolean {
    return this.$store.state.glammityJoin.joinBtnDialog
  }

  get isLogin(): boolean {
    return this.$store.state.login.isLogin
  }

  set dialog(dialog: boolean) {
    this.$store.commit('glammityJoin/SET_JOIN_BTN_DIALOG', dialog)
  }

  openModal() {
    if (this.isLogin === false) {
      this.$store.commit('login/SET_LOGIN_DIALOG', true)
      return
    }
    this.$store.commit('glammityJoin/SET_JOIN_BTN_DIALOG', true)
  }

  closeCard() {
    this.$store.commit('glammityJoin/SET_JOIN_BTN_DIALOG', false)
  }
}
</script>
