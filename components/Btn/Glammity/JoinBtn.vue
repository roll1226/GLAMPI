<template>
  <div class="text-center">
    <v-btn @click.stop="openModal">
      参加しろ
    </v-btn>

    <div justify="center">
      <v-dialog v-model="dialog" max-width="400">
        <v-card :loading="joinBtnLoading">
          <v-card-title class="headline">
            {{ glammityName }}に参加しますか？
          </v-card-title>

          <v-card-text>
            なんか文章入れたい
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <JoinedBtn :glammity-name="glammityName" />

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

  get joinBtnLoading(): boolean {
    return this.$store.state.glammityJoin.loading
  }

  get dialog(): boolean {
    return this.$store.state.glammityJoin.joinBtnDialog
  }

  set dialog(dialog: boolean) {
    this.$store.commit('glammityJoin/SET_JOIN_BTN_DIALOG', dialog)
  }

  openModal() {
    this.$store.commit('glammityJoin/SET_JOIN_BTN_DIALOG', true)
  }

  closeCard() {
    this.$store.commit('glammityJoin/SET_JOIN_BTN_DIALOG', false)
  }
}
</script>
