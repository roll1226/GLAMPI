<template>
  <v-card class="mt-3 mb-8">
    <v-tabs show-arrows active-class="font-weight-bold" color="rgb(87,95,69)">
      <v-tab @click="changeTab(0)">チャット</v-tab>
      <v-divider v-if="isUser === 'host'" inset vertical></v-divider>
      <v-tab v-if="isUser === 'host'" @click="changeTab(1)">メンバー</v-tab>
      <v-divider v-if="isUser === 'host'" inset vertical></v-divider>
      <v-tab v-if="isUser === 'host'" @click="changeTab(2)">予約管理</v-tab>
      <v-divider v-if="isUser === 'host'" inset vertical></v-divider>
      <v-tab v-if="isUser === 'host'" @click="changeTab(3)">募集条件変更</v-tab>
      <v-divider v-if="isUser === 'guest'" inset vertical></v-divider>
      <v-tab v-if="isUser === 'guest'" @click="changeTab(4)">詳細</v-tab>
      <v-divider v-if="isUser === 'guest'" inset vertical></v-divider>
      <v-tab v-if="isUser === 'guest'" @click="changeTab(5)">支払い</v-tab>
    </v-tabs>
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

<style lang="scss">
.v-tabs {
  .v-tab {
    min-width: 130px;
  }
}
</style>
