<template>
  <div>
    <v-btn block class="mb-3" @click="screen2 = 0">基本情報変更</v-btn>
    <v-btn class="mb-3" block @click="screen2 = 1">支払い方法変更</v-btn>
    <v-btn block @click="screen2 = 2">パスワード変更</v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
@Component
export default class ChangeInfoBtn extends Vue {}
</script>
