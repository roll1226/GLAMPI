<template>
  <div>
    <v-row>
      <v-col lg="3" md="3" sm="3" xs="12">
        <v-row>
          <v-col>
            <v-card>
              <v-card-title>
                glammity検索
              </v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col>
        <v-row>
          <v-col
            v-for="(inte, index) in 10"
            :key="index"
            lg="6"
            md="6"
            sm="6"
            xs="12"
          >
            <v-card>
              <div class="d-flex flex-no-wrap justify-start">
                <v-avatar class="ma-3" size="125" tile>
                  <v-img
                    src="https://pbs.twimg.com/profile_images/1063562329155989505/f3HAhG-8.jpg"
                  ></v-img>
                </v-avatar>
                <div>
                  <v-card-text>
                    <p>
                      施設名: hogehoge
                    </p>

                    <div>
                      主催者: 俺
                    </div>
                    <div>
                      募集期間: 2020/01/23~2020/02/10
                    </div>
                  </v-card-text>

                  <v-card-actions>
                    <v-row>
                      <v-col cols="6" class="pb-0">
                        <v-btn block text>
                          施設紹介
                        </v-btn>
                      </v-col>
                      <v-col cols="6" class="pb-0">
                        <v-btn block text>
                          紹介ページ
                        </v-btn>
                      </v-col>
                      <v-col cols="12" class="pb-1 pt-2">
                        <v-btn block text>
                          参加する
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card-actions>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>
