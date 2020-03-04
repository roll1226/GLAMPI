<template>
  <div>
    <v-btn color="green darken-1" text @click="Joining">
      参加する
    </v-btn>

    <div justify="center">
      <v-dialog v-model="dialog" max-width="500">
        <v-card>
          <v-card-title class="headline">
            {{ glammityName }}に参加しました。
          </v-card-title>

          <v-card-actions class="text-center">
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="closeAll">
              Yes, sir.
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { firestore } from '@/plugins/firebase'

@Component
export default class JoinedBtn extends Vue {
  @Prop({ required: true, default: '' })
  glammityName!: string

  @Prop({ required: true, default: '' })
  glammityId!: string

  get dialog(): boolean {
    return this.$store.state.glammityJoin.joinedBtnDialog
  }

  get userId(): string {
    return this.$store.state.login.userUid
  }

  set dialog(dialog: boolean) {
    this.$store.commit('glammityJoin/SET_JOINED_BTN_DIALOG', dialog)
    if (!dialog) {
      this.$store.commit('glammityJoin/SET_JOINED_BTN_DIALOG', false)
      this.$store.commit('glammityJoin/SET_JOIN_BTN_DIALOG', false)
    }
  }

  async Joining() {
    this.$store.commit('glammityJoin/SET_LOADING', true)
    await firestore
      .collection('glammity')
      .doc(this.glammityId)
      .collection('member')
      .doc(this.userId)
      .set({ userStates: 'guest' })

    this.$store.commit('glammityJoin/SET_LOADING', false)
    this.$store.commit('glammityJoin/SET_JOINED_BTN_DIALOG', true)
  }

  closeAll() {
    this.$store.commit('glammityJoin/SET_JOINED_BTN_DIALOG', false)
    this.$store.commit('glammityJoin/SET_JOIN_BTN_DIALOG', false)
    this.$router.push(`/glammity/Group/${this.glammityId}/glammityGroup`)
  }
}
</script>
