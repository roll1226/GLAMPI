<template>
  <div>
    <v-card>
      <v-card-title>予約履歴</v-card-title>
      <v-card width="800" height="250">
        <v-container>
          <v-row>
            <v-col :cols="4">
              <v-img
                width="280"
                height="200"
                :src="require('@/assets/rain.jpg')"
              ></v-img>
              <v-col :cols="8">
                <v-card-text>
                  <v-card-title>{{ facility }}</v-card-title>
                </v-card-text>
              </v-col>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-card>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class BookingList extends Vue {
  public facility: string = '施設名'
}
</script>
