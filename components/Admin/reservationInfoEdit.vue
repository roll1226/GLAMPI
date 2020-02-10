<template>
  <div>
    <v-card max-width="700" class="mx-auto">
      <v-container>
        情報登録
        <v-textarea label="施設紹介" name=""></v-textarea>
      </v-container>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class template extends Vue {}
</script>
