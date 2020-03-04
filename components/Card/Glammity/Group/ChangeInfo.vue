<template>
  <v-col cols="6">
    <v-card outlined>
      <v-card-text>
        <div class="d-flex justify-space-between">
          <div>
            {{ title }}
          </div>
          <v-btn small outlined>
            変更
          </v-btn>
        </div>

        <template v-if="isInput === 'fields'">
          <v-text-field :label="info" single-line></v-text-field>
        </template>

        <template v-else-if="isInput === 'areas'">
          <v-textarea :label="info"></v-textarea>
        </template>

        <template v-else-if="isInput === 'overflow'">
          <v-overflow-btn></v-overflow-btn>
        </template>

        <template v-else-if="isInput === 'date'">
          <v-text-field
            label="募集日程"
            prepend-icon="mdi-calendar"
            readonly
          ></v-text-field>
          <div class="text-center">
            <v-date-picker
              locale="ja-jp"
              :show-current="false"
              :day-format="(date) => new Date(date).getDate()"
            ></v-date-picker>
          </div>
        </template>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import moment from 'moment'

@Component
export default class ChangeInfo extends Vue {
  @Prop({ required: true, default: '' })
  title!: string

  @Prop({ required: true, default: '' })
  info!: string

  @Prop({ required: true, default: '' })
  isInput!: 'fields' | 'areas' | 'overflow' | 'date'

  nowDate: string = ''

  created() {
    this.nowDate = moment(new Date()).format('YYYY-MM-DD')
  }
}
</script>
