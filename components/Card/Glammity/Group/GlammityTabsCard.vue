<template>
  <v-card>
    <v-btn block text class="black--text tab" @click="changeTab(0)">
      チャット
    </v-btn>
    <v-btn
      v-if="isUser === 'host'"
      block
      text
      class="black--text tab"
      @click="changeTab(1)"
    >
      メンバー
    </v-btn>
    <v-btn
      v-if="isUser === 'host'"
      text
      block
      class="black--text tab"
      @click="changeTab(2)"
    >
      予約管理
    </v-btn>
    <v-btn
      v-if="isUser === 'host'"
      text
      block
      class="black--text tab"
      @click="changeTab(3)"
    >
      募集条件変更
    </v-btn>
    <v-btn
      v-if="isUser === 'guest'"
      text
      block
      class="black--text tab"
      @click="changeTab(4)"
      >詳細</v-btn
    >
    <v-btn
      v-if="isUser === 'guest'"
      text
      block
      class="black--text tab"
      @click="changeTab(5)"
      >支払い</v-btn
    >
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { userStates } from '@/store/glammityGroup'

@Component
export default class GlammityTabsCard extends Vue {
  get isUser(): userStates {
    return this.$store.state.glammityGroup.userStates
  }

  changeTab(num: number) {
    this.$store.commit('glammityGroup/SET_TAB_NUMBER', num)
  }
}
</script>
