<template>
  <div class="mt-10 pt-3">
    <v-card width="700" class="mx-auto">
      <v-card-title class="flex-column pt-6">
        <h2 class="text-center" style="color: rgb(87, 95, 69);">
          お問い合わせ
        </h2>

        <v-divider
          width="600"
          class="mt-3 mb-4 mx-auto"
          color="rgb(87, 95, 69)"
        ></v-divider>
      </v-card-title>

      <v-card-text class="pb-0">
        <v-text-field
          label="お問い合わせタイトル"
          color="rgb(87, 95, 69)"
        ></v-text-field>

        <v-text-field
          prepend-inner-icon="far fa-envelope"
          label="メールアドレス"
          color="rgb(87, 95, 69)"
        ></v-text-field>

        <v-overflow-btn
          class="my-2"
          color="rgb(87, 95, 69)"
          :items="dropdown_font"
          label="施設選択"
          prepend-icon="fas fa-campground"
          target="#dropdown-example-1"
          no-data-text="選択出来る施設はありません。"
        ></v-overflow-btn>

        <v-textarea label="質問内容" color="rgb(87, 95, 69)"></v-textarea>

        <v-card-actions class="pb-3">
          <v-spacer></v-spacer>

          <v-btn outlined color="rgb(87, 95, 69)">
            送信
          </v-btn>
        </v-card-actions>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
@Component
export default class Support extends Vue {}
</script>
