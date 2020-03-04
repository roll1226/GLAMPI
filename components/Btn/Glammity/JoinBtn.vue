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
          <template v-if="isGroup === false">
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
          </template>

          <template v-else-if="isGroup === true">
            <v-card-title class="headline">
              {{ glammityName }}に戻るよね？
            </v-card-title>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="goGroup">
                戻る
              </v-btn>

              <v-btn color="error" text @click="closeCard">
                戻らん
              </v-btn>
            </v-card-actions>
          </template>

          <template v-else-if="isGroup == null">
            <v-card-text></v-card-text>
          </template>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import JoinedBtn from '@/components/Btn/Glammity/JoinedBtn.vue'
import { isGroupStates } from '@/store/glammityJoin'

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

  dialog: boolean = false

  get isLogin(): boolean {
    return this.$store.state.login.isLogin
  }

  get isGroup(): isGroupStates {
    return this.$store.state.glammityJoin.isGroup
  }

  get userId(): string {
    return this.$store.state.login.userUid
  }

  openModal() {
    if (this.isLogin === false) {
      this.$store.commit('login/SET_LOGIN_DIALOG', true)
      return
    }
    this.dialog = true
    this.$store.commit('glammityJoin/SET_LOADING', true)
    this.$store.dispatch('glammityJoin/searchUser', {
      id: this.glammityId,
      userId: this.userId
    })
  }

  closeCard() {
    this.dialog = false
  }

  goGroup() {
    this.$router.push(`/Glammity/Group/${this.glammityId}/glammityGroup`)
  }
}
</script>
