<template>
  <div>
    <h1>
      検索後
    </h1>

    <v-row>
      <v-col lg="4" md="4" sm="4" xs="12">
        <v-card class="mx-auto" outlined>
          <v-card-actions>
            <v-btn text>Button</v-btn>
            <v-btn text>Button</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col lg="8" md="8" sm="8" xs="12">
        <SearchedFasility
          :fasility-name="'施設名'"
          :address="'東京都新宿区'"
          :plan-name="'何か良いプラン'"
          :plan-pay="25000"
          :introduction-url="'/'"
          :grammity-url="'/'"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import SearchedFasility from '@/components/Card/Search/SearchedFasility.vue'

@Component({
  components: {
    SearchedFasility
  }
})
export default class Searched extends Vue {}
</script>
