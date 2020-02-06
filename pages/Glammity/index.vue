<template>
  <div>
    <v-row>
      <v-col lg="3" md="3" sm="3" xs="12">
        <v-row>
          <v-col>
            <v-card>
              <v-card-title>
                aaaaa
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
                  <v-card-title
                    class="headline"
                    v-text="'タイトル'"
                  ></v-card-title>

                  <v-card-subtitle v-text="'サブタイトル'"></v-card-subtitle>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>
