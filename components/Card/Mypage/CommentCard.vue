<template>
  <v-card>
    <v-row no-gutters>
      <v-col
        ><v-card-title>{{ facilityName }}</v-card-title>
        <v-card-actions>
          <v-rating
            :value="star"
            readonly
            color="indigo lighten-3"
            dense
            half-increments
            hover
            size="22"
          ></v-rating>
          <span class="grey--text text--lighten-2 caption mr-2">
            ({{ star }})
          </span>
        </v-card-actions>
        <v-card-text>
          {{ date }}
        </v-card-text>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card-text>
          {{ text }}
        </v-card-text>
      </v-col>
    </v-row>
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
