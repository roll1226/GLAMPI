<template>
  <div>
    <h1>
      予約
    </h1>

    <v-row dense>
      <v-col :cols="12">
        <v-card>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-1">
                プラン
              </div>
              <v-list-item-title class="headline mb-1">
                プランA
              </v-list-item-title>
            </v-list-item-content>
            <v-spacer></v-spacer>
            <v-list-item-content>
              <div class="overline mb-1">
                値段
              </div>
              <v-list-item-title class="headline mb-1">
                25,000円
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>

      <v-col :cols="12">
        <v-card>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-1">
                日程
              </div>
              <v-list-item-title class="headline mb-1 text-center">
                <v-date-picker
                  v-model="dates"
                  locale="ja-jp"
                  :show-current="false"
                  range
                  width="600px"
                  :day-format="(date) => new Date(date).getDate()"
                  class="mb-2"
                ></v-date-picker>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>

      <v-col :cols="12">
        <v-card>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-1">
                オプション
              </div>

              <v-list-item-title class="headline mb-1">
                <v-row dense>
                  <v-col v-for="(i, index) in 4" :key="index" :cols="3">
                    <v-card class="mx-auto mb-5" max-width="300">
                      <v-img
                        class="white--text align-end"
                        height="200px"
                        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                      >
                        <v-card-title>
                          バーベキュー
                        </v-card-title>
                      </v-img>

                      <v-card-subtitle class="pb-0">
                        2,000円
                      </v-card-subtitle>

                      <v-card-text class="text--primary">
                        <div>
                          美味しい
                        </div>

                        <div>
                          楽しい
                        </div>
                      </v-card-text>

                      <v-card-actions>
                        <v-btn color="orange" text>
                          選ぶ
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-col>
                </v-row>
                <div class="text-center">
                  <v-pagination v-model="page" :length="3"></v-pagination>
                </div>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

const end = new Date()
end.setDate(end.getDate() + 7)

interface option {
  slidesPerView: number
  centeredSlides: boolean
  pagination: {
    el: string
    clickable: boolean
  }
}

@Component
export default class reservation extends Vue {
  page: number = 1
  dates: [string, string] = ['', '']
}
</script>
