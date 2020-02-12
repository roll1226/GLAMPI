<template>
  <div class="top-page-introduction-wrap index-wrap-tag">
    <v-row no-gutters>
      <v-col>
        <h3 class="top-page-titles">
          タグ検索
        </h3>
      </v-col>
    </v-row>

    <div class="index-tag-mobile top-page-introduction-lists">
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header>
            タグ数 18個
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row>
              <v-col
                v-for="n of 18"
                :key="n"
                lg="2"
                md="2"
                sm="4"
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
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>

    <v-row class="top-page-cards">
      <v-col>
        <v-card class="index-tag-pc" elevation="0">
          <v-card-text>
            <v-row>
              <v-col
                v-for="n of 18"
                :key="n"
                lg="2"
                md="2"
                sm="4"
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
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class TagIndexWrap extends Vue {}
</script>

<style lang="scss">
// .index-tag-mobile {
//   display: block;

//   max-width: 300px;
//   margin: 0 auto;
// }

.index-tag-pc {
  display: none;
}

@media screen and (min-width: 770px) {
  // .index-wrap-tag {
  //   margin-left: 14px;
  //   margin-right: 14px;
  // }

  .index-tag-mobile {
    display: none;
  }

  .index-tag-pc {
    display: block;
  }
}
</style>
