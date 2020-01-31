<template>
  <div>
    <v-card class="mx-auto mt-5" max-width="700">
      <v-img
        class="white--text align-end"
        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        height="300px"
      >
        <v-card-title>
          プランタイトル
        </v-card-title>
      </v-img>

      <v-card-text class="text--primary">
        <v-simple-table>
          <template v-slot:default>
            <tbody>
              <tr>
                <td>
                  チェックイン〜チェックアウト
                </td>
                <td>
                  2020年1月31日〜2020年2月3日
                </td>
              </tr>
              <tr>
                <td>
                  宿泊人数
                </td>
                <td>
                  3人
                </td>
              </tr>
              <tr>
                <td>
                  オプション
                </td>
                <td>
                  なんか凄いオプション
                </td>
              </tr>
              <tr>
                <td>
                  合計
                </td>
                <td>
                  20,000円
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>

      <!-- <v-card-actions>
        <v-btn color="orange" text>
          Share
        </v-btn>

        <v-btn color="orange" text>
          Explore
        </v-btn>
      </v-card-actions> -->
    </v-card>

    <Stripe class="mb-1" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Stripe from '~/components/Btn/Stripe.vue'

@Component({
  components: {
    Stripe
  }
})
export default class reservation extends Vue {}
</script>
