<template>
  <div>
    <v-btn color="green darken-1" text @click="Joining">
      参加する
    </v-btn>

    <div justify="center">
      <v-dialog v-model="joinedDialog" max-width="500">
        <v-card>
          <v-card-title class="headline">
            {{ glammityName }}に参加しました。
          </v-card-title>

          <v-card-actions class="text-center">
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="closeAll">
              閉じる
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

  joinedDialog: boolean = false

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

    await firestore
      .collection('users')
      .doc(this.userId)
      .collection('glammity')
      .doc(this.glammityId)
      .set({})

    this.$store.commit('glammityJoin/SET_LOADING', false)
    this.joinedDialog = true
  }

  closeAll() {
    this.$router.push(`/glammity/Group/${this.glammityId}/glammityGroup`)
  }
}
</script>
