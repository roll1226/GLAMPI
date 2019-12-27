<template>
  <div class="top-page-introduction-wrap">
    <v-row>
      <v-col>
        <h3 class="ml-10 top-page-glammity-title headline font-weight-bold">
          タグ検索
        </h3>
      </v-col>
    </v-row>

    <v-card class="top-page-introduction-lists">
      <v-card-text>
        <v-row>
          <v-col
            v-for="n of 18"
            :key="n"
            lg="2"
            md="2"
            sm="2"
            xs="12"
            class="text-center"
          >
            <v-btn rounded depressed>
              <v-icon class="mr-2">
                fas fa-train
              </v-icon>
              都心に近い
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class TagIndexWrap extends Vue {}
</script>
