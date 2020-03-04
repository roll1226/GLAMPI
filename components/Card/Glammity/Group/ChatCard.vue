<template>
  <v-card>
    <v-card-title>
      チャット
    </v-card-title>

    <v-card-text>
      <v-sheet height="400" class="overflow-auto">
        <v-card
          v-for="(message, index) in glammityMessage"
          :key="index"
          class="mt-1"
          outlined
        >
          <v-card-actions class="pb-0">
            <v-list-item class="grow">
              <v-list-item-avatar
                max-width="50"
                width="50"
                height="50"
                color="grey darken-3"
              >
                <v-img class="elevation-1" :src="message.userImg"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title
                  style="color: rgba(0, 0, 0, 0.6);"
                  v-text="message.userName"
                ></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-card-actions>

          <v-card-text
            class="ml-3 body-1 text--grey darken-4"
            style="white-space: pre; color:rgba(0, 0, 0, 0.87);"
            v-text="message.message"
          ></v-card-text>
        </v-card>
      </v-sheet>
    </v-card-text>

    <v-card-text>
      <v-card :loading="chatSendLoading" outlined>
        <v-card outlined class="d-flex align-end">
          <v-card-text class="pb-0">
            <v-textarea
              v-model="message"
              clearable
              clear-icon="fas fa-times-circle"
              label="メッセージ"
            ></v-textarea>
          </v-card-text>

          <v-card-actions class="pb-5">
            <v-btn
              v-shortkey="{ mac: ['meta', 'enter'], win: ['ctrl', 'enter'] }"
              :disabled="!formIsValid"
              @click="createMessage"
              @shortkey="chooseMethod"
            >
              投稿
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { IMessage } from '@/store/glammityGroup'

@Component
export default class ChatCard extends Vue {
  created() {
    const url = this.$route.params.Glammity
    this.$store.dispatch('glammityGroup/getMessage', url)
  }

  get glammityMessage(): IMessage[] {
    return this.$store.state.glammityGroup.message
  }

  get userId(): string {
    return this.$store.state.login.userUid
  }

  get message(): string {
    return this.$store.state.glammityGroup.messageText
  }

  get chatSendLoading(): boolean {
    return this.$store.state.glammityGroup.loading
  }

  set message(text: string) {
    this.$store.commit('glammityGroup/SET_MESSAGE_TEXT', text)
  }

  get formIsValid(): string {
    return this.message
  }

  chooseMethod(event: any) {
    switch (event.srcKey) {
      case 'mac':
        this.createMessage()
        break
      case 'win':
        this.createMessage()
        break
    }
  }

  createMessage() {
    if (!this.formIsValid) return
    this.$store.commit('glammityGroup/SET_LOADING', true)
    const url = this.$route.params.Glammity
    this.$store.dispatch('glammityGroup/sendMessage', {
      url,
      userId: this.userId
    })
  }
}
</script>
