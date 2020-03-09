<template>
  <v-card outlined>
    <v-container>
      <v-row no-gutters class="flex-column flex-sm-row">
        <v-col cols="auto">
          <v-card-title class="pa-0">{{ facilityName }} </v-card-title>
        </v-col>
        <v-col cols="auto">
          <v-card-actions class="pa-0">
            <v-rating
              :value="star"
              readonly
              color="indigo lighten-3"
              dense
              half-increments
              hover
              size="22"
            ></v-rating>
            <span class="grey--text body-2"> ({{ star }}) </span>
          </v-card-actions>
        </v-col>
        <v-col class="text-left text-sm-right">
          <v-card-text class="grey--text subtitle-1 pa-0">{{
            date
          }}</v-card-text>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col>
          <v-card-text class="pa-0 subtitle-1">
            {{ text }}
          </v-card-text>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class BookingFasility extends Vue {
  @Prop({ required: true, default: '' })
  facilityName!: string

  @Prop({ required: true, default: 0 })
  star!: number

  @Prop({ required: true, default: '' })
  date!: string

  @Prop({ required: true, default: '' })
  text!: string

  @Prop({ required: true, default: '' })
  url!: string
}
</script>
<style lang="scss">
.v-card {
  .container {
    //各カード内余白
    padding: 15px 10px;
  }
}
@media screen and (max-width: 770px) {
}
</style>
