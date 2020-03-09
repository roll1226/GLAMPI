<template>
  <v-card class="px-sm-3  py-8">
    <v-card-text class="pl-8">
      <v-sheet height="400" class="overflow-auto overflow-x-hidden">
        <v-card
          v-for="(message, index) in glammityMessage"
          :key="index"
          elevation="0"
          class="mb-8"
        >
          <v-row no-gutters>
            <v-col cols="auto">
              <v-avatar
                max-width="50"
                width="50"
                height="50"
                color="grey darken-3"
              >
                <v-img class="elevation-1" :src="message.userImg"></v-img>
              </v-avatar>
            </v-col>
            <v-col class="pl-3">
              <p class="ma-0 my-1 subtitle-1 font-weight-black">
                {{ message.userName }}
              </p>
              <v-card-text
                class="pa-0 pr-10 body-2 text--grey darken-4"
                style="word-wrap: break-word; white-space: pre-wrap;"
                v-text="message.message"
              ></v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </v-sheet>
    </v-card-text>

    <v-card-text class="pb-0">
      <v-card
        :loading="chatSendLoading"
        outlined
        class="d-flex flex-row align-end px-4"
      >
        <v-card-text class="pa-0">
          <v-textarea
            v-model="message"
            clearable
            clear-icon="fas fa-times-circle"
            label="メッセージ"
          ></v-textarea>
        </v-card-text>

        <v-card-actions class="mb-3 pl-4 pr-0">
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
