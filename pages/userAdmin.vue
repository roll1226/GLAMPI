<template>
  <div>
    <h1>
      会員登録
    </h1>
    <v-text-field
      v-model="name"
      label="氏名"
      placeholder="氏名を入力してね"
    ></v-text-field>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class admin extends Vue {}
</script>
